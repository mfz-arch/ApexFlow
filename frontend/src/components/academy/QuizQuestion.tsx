'use client';

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Question } from '@/lib/types';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | boolean | null;
  onSelectAnswer: (answerIndex: number) => void;
}

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
}: QuizQuestionProps) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
          Question {questionIndex + 1} of {totalQuestions}
        </span>
        <span className="text-xs font-semibold text-slate-500 capitalize">
          {question.type === 'multiple_choice' ? 'Multiple Choice' : 'True / False'}
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-base font-bold text-slate-900 leading-snug">
        {question.questionText}
      </h3>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((optionText, optionIdx) => {
          const isSelected = selectedAnswer === optionIdx;

          return (
            <button
              key={optionIdx}
              type="button"
              onClick={() => onSelectAnswer(optionIdx)}
              className={cn(
                'w-full p-4 rounded-xl border text-left transition-all duration-150 flex items-center justify-between gap-3 group font-medium text-xs sm:text-sm',
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-500 text-indigo-900 font-bold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors',
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 text-slate-500 group-hover:border-slate-400'
                  )}
                >
                  {String.fromCharCode(65 + optionIdx)}
                </div>
                <span>{optionText}</span>
              </div>

              {isSelected ? (
                <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 group-hover:text-slate-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
