'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, PlayCircle, Lock, Zap } from 'lucide-react';
import { Lesson } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  lesson: Lesson;
  courseId: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
}

export default function LessonCard({
  lesson,
  courseId,
  isCompleted,
  isCurrent,
  isLocked,
}: LessonCardProps) {
  const content = (
    <div
      className={cn(
        'p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4',
        isCompleted
          ? 'bg-emerald-50/50 border-emerald-200 text-slate-900'
          : isCurrent
          ? 'bg-indigo-50/70 border-indigo-300 text-slate-900 shadow-xs'
          : 'bg-white border-slate-200 text-slate-500 opacity-80'
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Status Indicator Icon */}
        <div
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0',
            isCompleted
              ? 'bg-emerald-600 text-white'
              : isCurrent
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-400 border border-slate-200'
          )}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : isCurrent ? (
            <PlayCircle className="w-5 h-5" />
          ) : (
            <Lock className="w-4 h-4" />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Lesson {lesson.order}
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              <Zap className="w-3 h-3 fill-amber-400 text-amber-500" />
              +{lesson.xpReward} XP
            </span>
          </div>
          <h4
            className={cn(
              'text-sm font-bold truncate mt-0.5',
              isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-500'
            )}
          >
            {lesson.title}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
            {lesson.summary}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0">
        {isCompleted ? (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
            Completed
          </span>
        ) : isCurrent ? (
          <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-xl">
            Start Lesson →
          </span>
        ) : (
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-xl">
            Locked
          </span>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return content;
  }

  return (
    <Link href={`/courses/${courseId}/lessons/${lesson.id}`} className="block">
      {content}
    </Link>
  );
}
