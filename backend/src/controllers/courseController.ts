import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { User } from '../models/User';
import { Certificate } from '../models/Certificate';
import { TestResult } from '../models/TestResult';
import { AuthRequest } from '../middleware/auth';

const generateCertificateId = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AF-2026-${randomPart}`;
};

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find().sort({ createdAt: 1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const getCourseBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;
    const course = await Course.findOne({ slug });
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

export const enrollInCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const slug = req.params.slug as string;
    const course = await Course.findOne({ slug });
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    if (!req.user.enrolledCourses.includes(course.id)) {
      req.user.enrolledCourses.push(course.id);
      await req.user.save();
    }

    res.status(200).json({
      message: `Enrolled successfully in ${course.title}`,
      enrolledCourses: req.user.enrolledCourses,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
};

export const completeLesson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const lessonId = req.params.lessonId as string;
    const xpReward = req.body.xpReward || 50;

    if (!req.user.completedLessons.includes(lessonId)) {
      req.user.completedLessons.push(lessonId);
      req.user.xp += xpReward;
      req.user.level = Math.floor(req.user.xp / 100) + 1;
      await req.user.save();
    }

    res.status(200).json({
      message: 'Lesson completed successfully',
      completedLessons: req.user.completedLessons,
      xp: req.user.xp,
      level: req.user.level,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete lesson' });
  }
};

export const submitFinalTest = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const slug = req.params.slug as string;
    const { userAnswers, timeSpentSeconds } = req.body;

    const course = await Course.findOne({ slug });
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    let correctCount = 0;
    course.questions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx];
      if (userAnswer === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / course.questions.length) * 100);
    const passed = scorePercent >= course.passingScorePercent;
    const xpEarned = passed ? 100 : 25;

    let certificateId: string | undefined;

    if (passed) {
      if (!req.user.completedCourses.includes(course.id)) {
        req.user.completedCourses.push(course.id);
      }

      const existingCert = await Certificate.findOne({
        courseId: course.id,
        studentId: req.user._id,
      });

      if (existingCert) {
        certificateId = existingCert.id;
      } else {
        certificateId = generateCertificateId();
        const newCert = new Certificate({
          id: certificateId,
          studentId: req.user._id,
          studentName: req.user.name,
          courseId: course.id,
          courseTitle: course.title,
          issueDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          scorePercent,
        });
        await newCert.save();
      }
    }

    req.user.xp += xpEarned;
    req.user.level = Math.floor(req.user.xp / 100) + 1;
    await req.user.save();

    const testResult = new TestResult({
      studentId: req.user._id,
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

    res.status(200).json({
      courseId: course.id,
      scorePercent,
      totalQuestions: course.questions.length,
      correctAnswers: correctCount,
      timeSpentSeconds: timeSpentSeconds || 0,
      passed,
      xpEarned,
      certificateId,
    });
  } catch (error) {
    console.error('Final Test Error:', error);
    res.status(500).json({ error: 'Failed to submit final test' });
  }
};
