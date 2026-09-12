'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Award,
  CheckCircle2,
  XCircle,
  Zap,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import { useAuth } from '@/context/AuthContext';

export default function TestResultsPage() {
  const params = useParams();
  const { courses, lastTestResult } = useAcademy();
  const { currentUser } = useAuth();

  const courseId = params.courseId as string;
  const course = courses.find((c) => c.id === courseId);

  if (!course || !lastTestResult) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-slate-900">No Test Result Found</h2>
        <p className="text-xs text-slate-500">Please complete the final test to view your scores.</p>
        <Link href={`/courses/${courseId}`} className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          Return to Course
        </Link>
      </div>
    );
  }

  const passed = lastTestResult.passed;
  const studentName = currentUser?.name || 'Student';

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    if (mins === 0) return `${remainder} sec`;
    return `${mins} min ${remainder} sec`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* Header Result Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-lg text-center space-y-6">
        <div className="space-y-3">
          <div
            className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-white shadow-lg ${
              passed ? 'bg-emerald-600 shadow-emerald-600/30' : 'bg-rose-600 shadow-rose-600/30'
            }`}
          >
            {passed ? <Award className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {passed ? 'Assessment Passed' : 'Assessment Attempted'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {passed ? '🎉 Congratulations!' : 'Good Effort!'}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-md mx-auto">
              {passed
                ? `Great job, ${studentName}! You successfully passed the final assessment for ${course.title}.`
                : `You scored below the ${course.passingScorePercent}% required threshold. Review the lessons and try again.`}
            </p>
          </div>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <div className="p-2 space-y-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Final Score
            </span>
            <span
              className={`text-2xl font-extrabold font-mono ${
                passed ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {lastTestResult.scorePercent}%
            </span>
          </div>

          <div className="p-2 space-y-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Accuracy
            </span>
            <span className="text-2xl font-extrabold font-mono text-slate-900">
              {lastTestResult.correctAnswers}/{lastTestResult.totalQuestions}
            </span>
          </div>

          <div className="p-2 space-y-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Time Used
            </span>
            <span className="text-xl font-extrabold font-mono text-slate-900">
              {formatTime(lastTestResult.timeSpentSeconds)}
            </span>
          </div>

          <div className="p-2 space-y-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              XP Earned
            </span>
            <span className="text-xl font-extrabold font-mono text-amber-600 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
              +{lastTestResult.xpEarned}
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          {passed && (
            <Link
              href="/certificates"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Send Certificate Request</span>
            </Link>
          )}

          <Link
            href={`/courses/${course.id}/test`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Test</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
