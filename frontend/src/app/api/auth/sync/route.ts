import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { email, name, xp, level, enrolledCourses, completedLessons, completedCourses } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: cleanEmail });

    if (!user) {
      user = new User({
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        password: 'ApexFlowStudent2026!',
        role: 'student',
        xp: xp || 0,
        level: level || 1,
        joinedDate: new Date().toISOString().split('T')[0],
        enrolledCourses: enrolledCourses || [],
        completedLessons: completedLessons || [],
        completedCourses: completedCourses || [],
      });
    } else {
      if (name && name.trim()) user.name = name.trim();
      if (typeof xp === 'number' && xp > user.xp) {
        user.xp = xp;
        user.level = Math.floor(xp / 100) + 1;
      }
      if (Array.isArray(enrolledCourses)) {
        enrolledCourses.forEach((c: string) => {
          if (!user!.enrolledCourses.includes(c)) user!.enrolledCourses.push(c);
        });
      }
      if (Array.isArray(completedLessons)) {
        completedLessons.forEach((l: string) => {
          if (!user!.completedLessons.includes(l)) user!.completedLessons.push(l);
        });
      }
      if (Array.isArray(completedCourses)) {
        completedCourses.forEach((c: string) => {
          if (!user!.completedCourses.includes(c)) user!.completedCourses.push(c);
        });
      }
    }

    await user.save();

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level,
        joinedDate: user.joinedDate,
        enrolledCourses: user.enrolledCourses,
        completedLessons: user.completedLessons,
        completedCourses: user.completedCourses,
      },
    });
  } catch (error: any) {
    console.error('User Sync API Error:', error);
    return NextResponse.json({ error: 'Failed to sync user stats' }, { status: 500 });
  }
}
