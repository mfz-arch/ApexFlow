'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code,
  BookOpen,
  Calculator,
  Database,
  Network,
  Cpu,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Course } from '@/lib/types';
import { useAcademy } from '@/context/AcademyContext';
import { cn, getCategoryBadgeColor } from '@/lib/utils';

export default function CourseCard({ course }: { course: Course }) {
  const { getCourseProgress, isCourseCompleted } = useAcademy();
  const progress = getCourseProgress(course.id);
  const isCompleted = isCourseCompleted(course.id);

  const getIcon = () => {
    switch (course.iconName) {
      case 'Code':
        return Code;
      case 'BookOpen':
        return BookOpen;
      case 'Calculator':
        return Calculator;
      case 'Database':
        return Database;
      case 'Network':
        return Network;
      case 'Cpu':
        return Cpu;
      default:
        return BookOpen;
    }
  };

  const IconComponent = getIcon();
  const categoryBadge = getCategoryBadgeColor(course.category);

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 p-6 flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        {/* Category & Level Badges */}
        <div className="flex items-center justify-between">
          <span className={cn('text-[11px] font-extrabold px-2.5 py-1 rounded-lg border uppercase tracking-wider', categoryBadge)}>
            {course.category}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            {course.level}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-2xs">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {course.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {/* Meta Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.lessons.length} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.estimatedHours}</span>
          </div>
        </div>

        {/* Progress Bar (If started) */}
        {progress > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="text-slate-600">Course Progress</span>
              <span className="font-mono text-indigo-700 font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all duration-300',
                  isCompleted ? 'bg-emerald-600' : 'bg-indigo-600'
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Link
          href={`/courses/${course.id}`}
          className={cn(
            'w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs',
            isCompleted
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              : progress > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          )}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Completed (View Certificate)</span>
            </>
          ) : progress > 0 ? (
            <>
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Start Course</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
