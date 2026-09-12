'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Award, ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import QuizQuestion from '@/components/academy/QuizQuestion';

export default function FinalTestPage() {
  const params = useParams();
  const router = useRouter();
  const { courses, submitFinalTest } = useAcademy();

  const courseId = params.courseId as string;
  const course = courses.find((c) => c.id === courseId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | boolean)[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  if (!course) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Course Not Found</h2>
      </div>
    );
  }

  const currentQuestion = course.questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / course.questions.length) * 100);

  const handleSelectOption = (optionIdx: number) => {
    const updated = [...userAnswers];
    updated[currentIndex] = optionIdx;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < course.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const result = submitFinalTest(course.id, userAnswers, elapsedSeconds);
    router.push(`/courses/${course.id}/test/results`);
  };

  const isCurrentAnswered = userAnswers[currentIndex] !== undefined && userAnswers[currentIndex] !== null;
  const allAnswered = userAnswers.length === course.questions.length && userAnswers.every((a) => a !== undefined && a !== null);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* Test Banner Header */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-extrabold tracking-tight">{course.title} — Final Test</h1>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-indigo-300 bg-white/10 px-3 py-1 rounded-xl">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
            <span>Assessment Progress</span>
            <span className="font-mono text-indigo-300">
              {currentIndex + 1} of {course.questions.length} Questions
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card Component */}
      <QuizQuestion
        question={currentQuestion}
        questionIndex={currentIndex}
        totalQuestions={course.questions.length}
        selectedAnswer={userAnswers[currentIndex] ?? null}
        onSelectAnswer={handleSelectOption}
      />

      {/* Navigation & Submit Toolbar */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 disabled:opacity-40 transition-colors flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {currentIndex < course.questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all flex items-center gap-1.5"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 disabled:opacity-50 transition-all flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Submit Final Test</span>
          </button>
        )}
      </div>
    </div>
  );
}
