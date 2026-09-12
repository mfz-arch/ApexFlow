'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Certificate, TestResult } from '@/lib/types';
import { preconfiguredCourses } from '@/lib/coursesData';
import { generateCertificateId, formatDate } from '@/lib/utils';
import { useAuth } from './AuthContext';

interface AcademyContextType {
  courses: Course[];
  certificates: Certificate[];
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  completedCourseIds: string[];
  enrollInCourse: (courseId: string) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  submitFinalTest: (courseId: string, userAnswers: (number | boolean)[], timeSpentSeconds: number) => TestResult;
  getCourseProgress: (courseId: string) => number; // 0 to 100%
  isLessonCompleted: (lessonId: string) => boolean;
  isCourseCompleted: (courseId: string) => boolean;
  getCertificateByCourse: (courseId: string) => Certificate | undefined;
  getCertificateById: (certId: string) => Certificate | undefined;
  lastTestResult: TestResult | null;
  setLastTestResult: (result: TestResult | null) => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export function AcademyProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, updateUserStats } = useAuth();
  const [courses] = useState<Course[]>(preconfiguredCourses);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>([]);
  const [lastTestResult, setLastTestResult] = useState<TestResult | null>(null);

  // Sync state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCerts = localStorage.getItem('apexflow_certificates');
      if (savedCerts) setCertificates(JSON.parse(savedCerts));

      const savedEnrolled = localStorage.getItem('apexflow_enrolled');
      if (savedEnrolled) setEnrolledCourseIds(JSON.parse(savedEnrolled));

      const savedLessons = localStorage.getItem('apexflow_completed_lessons');
      if (savedLessons) setCompletedLessonIds(JSON.parse(savedLessons));

      const savedCourses = localStorage.getItem('apexflow_completed_courses');
      if (savedCourses) setCompletedCourseIds(JSON.parse(savedCourses));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('apexflow_certificates', JSON.stringify(certificates));
      localStorage.setItem('apexflow_enrolled', JSON.stringify(enrolledCourseIds));
      localStorage.setItem('apexflow_completed_lessons', JSON.stringify(completedLessonIds));
      localStorage.setItem('apexflow_completed_courses', JSON.stringify(completedCourseIds));
    } catch (e) {
      console.error(e);
    }
  }, [certificates, enrolledCourseIds, completedLessonIds, completedCourseIds]);

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds((prev) => [...prev, courseId]);
    }
  };

  const completeLesson = (lessonId: string, xpReward: number) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      updateUserStats(xpReward, lessonId);
    }
  };

  const isLessonCompleted = (lessonId: string) => completedLessonIds.includes(lessonId);
  const isCourseCompleted = (courseId: string) => completedCourseIds.includes(courseId);

  const getCourseProgress = (courseId: string): number => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || course.lessons.length === 0) return 0;

    const completedInCourse = course.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
    const isFinished = completedCourseIds.includes(courseId);

    if (isFinished) return 100;
    return Math.round((completedInCourse / (course.lessons.length + 1)) * 100);
  };

  const submitFinalTest = (
    courseId: string,
    userAnswers: (number | boolean)[],
    timeSpentSeconds: number
  ): TestResult => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) throw new Error('Course not found');

    let correctCount = 0;
    course.questions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx];
      if (typeof q.correctAnswer === 'number') {
        if (userAnswer === q.correctAnswer) correctCount++;
      } else if (typeof q.correctAnswer === 'boolean') {
        if (userAnswer === q.correctAnswer) correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / course.questions.length) * 100);
    const passed = scorePercent >= course.passingScorePercent;
    const xpEarned = passed ? 100 : 25;

    let newCertId: string | undefined;

    if (passed) {
      if (!completedCourseIds.includes(courseId)) {
        setCompletedCourseIds((prev) => [...prev, courseId]);
      }

      // Check if certificate already issued
      const existingCert = certificates.find(
        (c) => c.courseId === courseId && c.studentName === (currentUser?.name || 'Student')
      );

      if (existingCert) {
        newCertId = existingCert.id;
      } else {
        newCertId = generateCertificateId();
        const newCertificate: Certificate = {
          id: newCertId,
          studentId: currentUser?.id || 'usr-student',
          studentName: currentUser?.name || 'Student User',
          courseId: course.id,
          courseTitle: course.title,
          issueDate: formatDate(new Date().toISOString()),
          scorePercent,
        };
        setCertificates((prev) => [newCertificate, ...prev]);
      }

      updateUserStats(xpEarned, undefined, courseId);
    } else {
      updateUserStats(xpEarned);
    }

    const result: TestResult = {
      courseId,
      scorePercent,
      totalQuestions: course.questions.length,
      correctAnswers: correctCount,
      timeSpentSeconds,
      passed,
      xpEarned,
      certificateId: newCertId,
    };

    setLastTestResult(result);
    return result;
  };

  const getCertificateByCourse = (courseId: string) => {
    return certificates.find(
      (c) => c.courseId === courseId && c.studentName === (currentUser?.name || 'Student')
    );
  };

  const getCertificateById = (certId: string) => {
    return certificates.find((c) => c.id === certId);
  };

  return (
    <AcademyContext.Provider
      value={{
        courses,
        certificates,
        enrolledCourseIds,
        completedLessonIds,
        completedCourseIds,
        enrollInCourse,
        completeLesson,
        submitFinalTest,
        getCourseProgress,
        isLessonCompleted,
        isCourseCompleted,
        getCertificateByCourse,
        getCertificateById,
        lastTestResult,
        setLastTestResult,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
}

export function useAcademy() {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
}
