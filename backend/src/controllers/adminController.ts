import { Response } from 'express';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Certificate } from '../models/Certificate';
import { TestResult } from '../models/TestResult';
import { AuthRequest } from '../middleware/auth';

export const getAdminStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalCertificates = await Certificate.countDocuments();
    const totalCompletedTests = await TestResult.countDocuments({ passed: true });

    res.status(200).json({
      totalStudents,
      totalCourses,
      totalCertificates,
      totalCompletedTests,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
};

export const getStudentRoster = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });

    const studentData = await Promise.all(
      students.map(async (st) => {
        const certCount = await Certificate.countDocuments({ studentId: st._id });
        return {
          id: st._id,
          name: st.name,
          email: st.email,
          joinedDate: st.joinedDate,
          enrolledCount: st.enrolledCourses.length,
          completedCount: st.completedCourses.length,
          certificatesCount: certCount,
          xp: st.xp,
          level: st.level,
        };
      })
    );

    res.status(200).json(studentData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student roster' });
  }
};
