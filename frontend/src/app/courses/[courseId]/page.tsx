'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Lock,
  PlayCircle,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import LessonCard from '@/components/academy/LessonCard';
import { cn, getCategoryBadgeColor } from '@/lib/utils';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { courses, getCourseProgress, isLessonCompleted, isCourseCompleted, enrollInCourse } = useAcademy();

  const courseId = params.courseId as string;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Course Not Found</h2>
        <p className="text-xs text-slate-500">The requested course does not exist or has been moved.</p>
        <Link href="/courses" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Auto-enroll on view
  enrollInCourse(course.id);

  const progress = getCourseProgress(course.id);
  const isCompleted = isCourseCompleted(course.id);
  const categoryBadge = getCategoryBadgeColor(course.category);

  // Check if all lessons are completed
  const allLessonsDone = course.lessons.every((l) => isLessonCompleted(l.id));

  // Determine current active lesson
  const currentLessonIndex = course.lessons.findIndex((l) => !isLessonCompleted(l.id));
  const activeLessonId = currentLessonIndex !== -1 ? course.lessons[currentLessonIndex].id : course.lessons[course.lessons.length - 1].id;

  return (
    <div className="space-y-8 pb-12">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </button>

      {/* Course Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={cn('text-[11px] font-extrabold px-2.5 py-1 rounded-lg border uppercase tracking-wider', categoryBadge)}>
                {course.category}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {course.level}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {course.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex-shrink-0">
            {allLessonsDone ? (
              <Link
                href={`/courses/${course.id}/test`}
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Take Final Test</span>
              </Link>
            ) : (
              <Link
                href={`/courses/${course.id}/lessons/${activeLessonId}`}
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                <span>{progress > 0 ? 'Continue Next Lesson' : 'Start First Lesson'}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">Course Completion Roadmap</span>
            <span className="font-mono text-indigo-700">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-300',
                isCompleted ? 'bg-emerald-600' : 'bg-indigo-600'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson Roadmap List */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Step-by-Step Lesson Roadmap
        </h2>

        <div className="space-y-3">
          {course.lessons.map((lesson, idx) => {
            const completed = isLessonCompleted(lesson.id);
            const isPrevCompleted = idx === 0 || isLessonCompleted(course.lessons[idx - 1].id);
            const isCurrent = !completed && isPrevCompleted;
            const isLocked = !completed && !isPrevCompleted;

            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                courseId={course.id}
                isCompleted={completed}
                isCurrent={isCurrent}
                isLocked={isLocked}
              />
            );
          })}
        </div>
      </div>

      {/* Final Test Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-lg space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Award className="w-3.5 h-3.5" />
              Final Evaluation
            </div>
            <h3 className="text-lg font-extrabold text-white">Course Final Assessment Test</h3>
            <p className="text-xs text-indigo-200 font-medium max-w-md">
              Complete all lessons to unlock the final test. Score 70% or higher to automatically earn your verified certificate.
            </p>
          </div>

          <div>
            {allLessonsDone ? (
              <Link
                href={`/courses/${course.id}/test`}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Unlock Final Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Complete Lessons to Unlock</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
