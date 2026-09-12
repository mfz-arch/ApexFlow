'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  BookOpen,
  Award,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import { useAuth } from '@/context/AuthContext';
import CourseCard from '@/components/academy/CourseCard';

export default function LandingPage() {
  const { courses } = useAcademy();
  const { currentUser } = useAuth();

  return (
    <div className="space-y-20 pb-16 font-sans">
      {/* Hero Section (Matching Screenshot 3) */}
      <section className="pt-4 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold shadow-2xs">
            <span>Learn. Practice. Progress.</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Build Your Skills <br />
            <span className="text-indigo-600">for a Brighter Future</span>
          </h1>

          <p className="text-base text-slate-600 font-medium leading-relaxed max-w-xl">
            Apex Flow is a modern online learning academy. Gain in-demand skills, follow structured learning paths, and achieve your goals with hands-on practice and real progress.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href="/courses"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {!currentUser && (
              <Link
                href="/auth/register"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 font-bold text-sm transition-all flex items-center justify-center gap-2 border border-indigo-100"
              >
                <span>Create Free Account</span>
              </Link>
            )}
          </div>

          {/* 3 Quick Features Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span>Expert Designed Courses</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Track Your Progress</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <Award className="w-4 h-4" />
              </div>
              <span>Get Certified & Grow</span>
            </div>
          </div>
        </div>

        {/* Right Hero Image (Laptop Desk Illustration matching Screenshot 3) */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white group">
            <Image
              src="/hero-laptop.png"
              alt="Apex Flow Platform Laptop Setup"
              width={800}
              height={600}
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>
      </section>

      {/* Our Courses Section (Matching Screenshot 3) */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Courses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Explore a variety of courses designed to help you learn, practice and grow.
            </p>
          </div>

          <Link
            href="/courses"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 shrink-0"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Academic Roadmap Section */}
      <section id="services" className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
            Structured Academy Path
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How You Learn With Apex Flow
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-base flex items-center justify-center mx-auto shadow-md shadow-indigo-600/20">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">Choose a Course</h3>
            <p className="text-xs text-slate-500 font-medium">Select from Programming, English, Math, Databases, Networking, or AI.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-base flex items-center justify-center mx-auto shadow-md shadow-indigo-600/20">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">Study Lessons</h3>
            <p className="text-xs text-slate-500 font-medium">Step-by-step interactive lessons with code samples and key takeaways.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-base flex items-center justify-center mx-auto shadow-md shadow-indigo-600/20">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">Pass Assessment</h3>
            <p className="text-xs text-slate-500 font-medium">Take multiple-choice and true/false assessment questions to test your knowledge.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-base flex items-center justify-center mx-auto shadow-md shadow-indigo-600/20">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900">Get Certified</h3>
            <p className="text-xs text-slate-500 font-medium">Receive a verifiable digital certificate with your full legal name.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

