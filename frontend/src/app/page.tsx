'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Award,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import { useAuth } from '@/context/AuthContext';
import CourseCard from '@/components/academy/CourseCard';

export default function LandingPage() {
  const { courses } = useAcademy();
  const { currentUser } = useAuth();

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Free Interactive Learning Academy</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Apex Flow
          <span className="block text-indigo-600 font-serif">Learn. Practice. Progress.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Master programming, mathematics, databases, networking, and machine learning through step-by-step interactive lessons and earn verifiable professional certificates.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/courses"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {!currentUser && (
            <Link
              href="/auth/register"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              <span>Create Free Account</span>
            </Link>
          )}
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200 text-xs font-semibold text-slate-600 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Interactive Practice Questions</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Verified Digital Certificates</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>XP & Level Rewards</span>
          </div>
        </div>
      </section>

      {/* Featured Courses Catalog Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Available Courses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Start learning immediately — all courses are pre-configured and completely free.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All ({courses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Simple Academic Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Apex Flow Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-extrabold text-base flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">Choose a Course</h3>
            <p className="text-xs text-slate-500 font-medium">Select from Programming, English, Math, Databases, Networking, or AI.</p>
          </div>

          <div className="p-4 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-extrabold text-base flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">Study Lessons</h3>
            <p className="text-xs text-slate-500 font-medium">Step-by-step structured lessons with key points and practice checks.</p>
          </div>

          <div className="p-4 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-extrabold text-base flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">Take Final Test</h3>
            <p className="text-xs text-slate-500 font-medium">Complete interactive Multiple Choice and True/False assessment questions.</p>
          </div>

          <div className="p-4 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-extrabold text-base flex items-center justify-center mx-auto">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900">Earn Certificate</h3>
            <p className="text-xs text-slate-500 font-medium">Receive an automatically generated, printable certificate with your real name.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
