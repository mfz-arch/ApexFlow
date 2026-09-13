'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-auto print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-auto flex items-center justify-center rounded-lg bg-white border border-slate-200 p-0.5 shadow-2xs">
                <Image
                  src="/logo.png"
                  alt="Apex Flow Logo"
                  width={30}
                  height={30}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">Apex Flow</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Modern online learning academy providing structured free educational courses, step-by-step interactive lessons, and verifiable certificates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Academy</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>
                <Link href="/courses" className="hover:text-indigo-600 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-indigo-600 transition-colors">
                  My Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Subjects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Subjects</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>Programming Fundamentals</li>
              <li>English Beginner</li>
              <li>Mathematics Fundamentals</li>
              <li>Database Fundamentals</li>
            </ul>
          </div>

          {/* Platform Trust */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Certification</h4>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Award className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Verifiable Certificates</p>
                <p className="text-[11px] text-slate-500">Unique Certificate ID format (`AF-2026-XXXXX`)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Apex Flow Academy. All courses free.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>Learn</span>
            <span>•</span>
            <span>Practice</span>
            <span>•</span>
            <span>Progress</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
