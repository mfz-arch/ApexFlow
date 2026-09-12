'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  BookOpen,
  CheckCircle2,
  Zap,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Code,
} from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import { cn } from '@/lib/utils';

export default function LessonViewPage() {
  const params = useParams();
  const router = useRouter();
  const { courses, completeLesson, isLessonCompleted } = useAcademy();

  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const course = courses.find((c) => c.id === courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId);

  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [lessonFinished, setLessonFinished] = useState(false);

  if (!course || !lesson) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Lesson Not Found</h2>
        <p className="text-xs text-slate-500">The requested lesson does not exist.</p>
        <Link href="/courses" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isCompletedAlready = isLessonCompleted(lesson.id);
  const currentLessonIndex = course.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = course.lessons[currentLessonIndex + 1];

  const handleCompleteLesson = () => {
    completeLesson(lesson.id, lesson.xpReward);
    setLessonFinished(true);
  };

  const handleNextAction = () => {
    if (nextLesson) {
      router.push(`/courses/${course.id}/lessons/${nextLesson.id}`);
    } else {
      router.push(`/courses/${course.id}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={() => router.push(`/courses/${course.id}`)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to {course.title}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Lesson {lesson.order} of {course.lessons.length}
          </span>
          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
            <Zap className="w-3 h-3 fill-amber-400 text-amber-500" />
            +{lesson.xpReward} XP
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
        {/* Title */}
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            {lesson.summary}
          </p>
        </div>

        {/* Detailed Explanation */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Core Concepts
          </h3>
          <p className="text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {lesson.explanation}
          </p>
        </div>

        {/* Key Points */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Key Takeaways
          </h3>
          <div className="space-y-2">
            {lesson.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code / Text Example */}
        {lesson.exampleCode && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-600" />
              Interactive Example
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
              <pre>{lesson.exampleCode}</pre>
            </div>
          </div>
        )}

        {/* Practice Question */}
        {lesson.practiceQuestion && (
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Practice Check</span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-900">
              {lesson.practiceQuestion.question}
            </p>

            <div className="space-y-2">
              {lesson.practiceQuestion.options.map((option, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => {
                    setSelectedPracticeOption(optIdx);
                    setPracticeSubmitted(true);
                  }}
                  className={cn(
                    'w-full p-3 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between',
                    selectedPracticeOption === optIdx
                      ? optIdx === lesson.practiceQuestion?.correctAnswer
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  )}
                >
                  <span>{option}</span>
                  {selectedPracticeOption === optIdx && (
                    <span className="font-mono text-[10px]">
                      {optIdx === lesson.practiceQuestion?.correctAnswer ? 'Correct ✓' : 'Incorrect ✗'}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {practiceSubmitted && (
              <p className="text-xs font-medium text-slate-700 bg-white/80 p-3 rounded-xl border border-indigo-100">
                {lesson.practiceQuestion.explanation}
              </p>
            )}
          </div>
        )}

        {/* Completion Action Footer */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          {lessonFinished || isCompletedAlready ? (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200 w-full sm:w-auto justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Lesson Completed! (+{lesson.xpReward} XP)</span>
            </div>
          ) : (
            <button
              onClick={handleCompleteLesson}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Lesson & Earn +{lesson.xpReward} XP</span>
            </button>
          )}

          {(lessonFinished || isCompletedAlready) && (
            <button
              onClick={handleNextAction}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{nextLesson ? 'Continue to Next Lesson' : 'Return to Course Roadmap'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
