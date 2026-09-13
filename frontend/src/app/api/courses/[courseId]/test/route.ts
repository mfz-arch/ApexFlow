import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { Certificate } from '@/models/Certificate';
import { TestResult } from '@/models/TestResult';
import { preconfiguredCourses } from '@/lib/coursesData';

const generateCertificateId = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AF-2026-${randomPart}`;
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await connectToDatabase();
    const { courseId } = await params;
    const body = await req.json();
    const { userAnswers, timeSpentSeconds, email, name } = body;

    const course = preconfiguredCourses.find((c) => c.id === courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    let correctCount = 0;
    course.questions.forEach((q, idx) => {
      const userAnswer = userAnswers ? userAnswers[idx] : undefined;
      if (typeof q.correctAnswer === 'number') {
        if (userAnswer === q.correctAnswer) correctCount++;
      } else if (typeof q.correctAnswer === 'boolean') {
        if (userAnswer === q.correctAnswer) correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / course.questions.length) * 100);
    const passed = scorePercent >= course.passingScorePercent;
    const xpEarned = passed ? 100 : 25;

    let certificateId: string | undefined;

    // Find student if email or name passed
    let studentObj = email ? await User.findOne({ email: email.trim().toLowerCase() }) : null;
    if (!studentObj && name) {
      studentObj = await User.findOne({ name: name.trim() });
    }

    const studentIdStr = studentObj ? studentObj._id.toString() : `usr-${Date.now()}`;
    const studentNameStr = studentObj ? studentObj.name : name || 'Student Learner';

    if (passed) {
      if (studentObj && !studentObj.completedCourses.includes(course.id)) {
        studentObj.completedCourses.push(course.id);
      }

      const existingCert = await Certificate.findOne({
        courseId: course.id,
        $or: [{ studentId: studentIdStr }, { studentName: studentNameStr }],
      });

      if (existingCert) {
        certificateId = existingCert.id;
      } else {
        certificateId = generateCertificateId();
        const newCert = new Certificate({
          id: certificateId,
          studentId: studentIdStr,
          studentName: studentNameStr,
          courseId: course.id,
          courseTitle: course.title,
          issueDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          scorePercent,
          status: 'pending',
        });
        await newCert.save();
      }
    }

    if (studentObj) {
      studentObj.xp += xpEarned;
      studentObj.level = Math.floor(studentObj.xp / 100) + 1;
      await studentObj.save();
    }

    const testResult = new TestResult({
      studentId: studentIdStr,
      courseId: course.id,
      scorePercent,
      totalQuestions: course.questions.length,
      correctAnswers: correctCount,
      timeSpentSeconds: timeSpentSeconds || 0,
      passed,
      xpEarned,
      certificateId,
    });
    await testResult.save();

    return NextResponse.json({
      courseId: course.id,
      scorePercent,
      totalQuestions: course.questions.length,
      correctAnswers: correctCount,
      timeSpentSeconds: timeSpentSeconds || 0,
      passed,
      xpEarned,
      certificateId,
    });
  } catch (error: any) {
    console.error('Final Test API Error:', error);
    return NextResponse.json({ error: 'Failed to submit final test' }, { status: 500 });
  }
}
