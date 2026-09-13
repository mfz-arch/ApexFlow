import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { Certificate } from '@/models/Certificate';

export async function GET() {
  try {
    await connectToDatabase();
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });

    const studentData = await Promise.all(
      students.map(async (st) => {
        const certCount = await Certificate.countDocuments({
          $or: [{ studentId: st._id.toString() }, { studentName: st.name }],
          status: 'verified',
        });
        return {
          id: st._id.toString(),
          name: st.name,
          email: st.email,
          joinedDate: st.joinedDate || ((st as any).createdAt ? new Date((st as any).createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
          enrolledCount: st.enrolledCourses?.length || 0,
          completedCount: st.completedCourses?.length || 0,
          certificatesCount: certCount,
          xp: st.xp,
          level: st.level,
        };
      })
    );

    return NextResponse.json(studentData);
  } catch (error: any) {
    console.error('Fetch Students Roster API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch student roster' }, { status: 500 });
  }
}
