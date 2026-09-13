'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Plus,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAcademy } from '@/context/AcademyContext';
import CourseCard from '@/components/academy/CourseCard';

export default function DashboardPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const { courses, certificates, enrolledCourseIds, completedLessonIds, completedCourseIds } = useAcademy();

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Student Account Required</h2>
            <p className="text-xs text-slate-500 font-medium">
              Please sign in or register a student account to view your personal dashboard, track lesson progress, and earn certificates.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/auth/login"
              className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/auth/register"
              className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Free</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const studentName = currentUser.name;
  const xp = currentUser.xp || 0;
  const level = Math.floor(xp / 100) + 1;

  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const earnedCertificates = certificates.filter(
    (cert) =>
      (cert.studentName && studentName && cert.studentName.toLowerCase() === studentName.toLowerCase()) ||
      (cert.studentId && currentUser.id && cert.studentId === currentUser.id)
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 to-indigo-700 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-100 text-xs font-extrabold backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Learning Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {studentName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 font-medium max-w-xl">
            Track your course roadmap, complete interactive lessons, pass final tests, and view your verified certificates.
          </p>
        </div>

        {/* Level & XP Box */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 z-10 flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold text-lg shadow-md">
            Lvl {level}
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-100">Total Experience</div>
            <div className="text-xl font-extrabold text-white flex items-center gap-1">
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>{xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Statistics Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-600" /> Enrolled Courses
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{enrolledCourses.length}</div>
          <span className="text-[11px] text-slate-400 font-medium">Active in academy</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Lessons Completed
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{completedLessonIds.length}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Step-by-step progress</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-purple-600" /> Courses Completed
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{completedCourseIds.length}</div>
          <span className="text-[11px] text-purple-700 font-medium">Final tests passed</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" /> Certificates Earned
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{earnedCertificates.length}</div>
          <span className="text-[11px] text-amber-700 font-medium">Verified credentials</span>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">My Learning Roadmap</h2>
            <p className="text-xs text-slate-500 font-medium">Courses you are currently enrolled in</p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">No courses started yet</h3>
              <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                Explore our catalog of free courses in Programming, English, Math, Databases, Networking, and AI to start learning.
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Explore All Courses</span>
            </Link>
          </div>
        )}
      </section>

      {/* Earned Certificates Gallery */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">My Certificates</h2>
            <p className="text-xs text-slate-500 font-medium">Verified credentials issued automatically upon passing final tests</p>
          </div>
          <Link
            href="/certificates"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {earnedCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earnedCertificates.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{cert.courseTitle}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Issued: {cert.issueDate} • ID: <span className="font-mono text-indigo-700 font-bold">{cert.id}</span>
                    </p>
                  </div>
                </div>

                <Link
                  href={`/certificates/${cert.id}`}
                  className="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 font-bold text-xs flex-shrink-0 transition-colors"
                >
                  View Certificate
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <p className="text-xs font-bold text-slate-700">No certificates earned yet</p>
            <p className="text-[11px] text-slate-500 font-medium">
              Complete all lessons in a course and score ≥70% on the final test to receive your certificate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
