'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import { useAuth } from '@/context/AuthContext';

export default function CertificatesListPage() {
  const { certificates } = useAcademy();
  const { currentUser } = useAuth();

  const studentName = currentUser?.name || 'Student';
  const myCertificates = certificates.filter(
    (c) => c.studentName === studentName || c.studentId === currentUser?.id
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="w-7 h-7 text-indigo-600" />
          My Verified Certificates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Official digital credentials issued automatically upon course completion.
        </p>
      </div>

      {myCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myCertificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                    {cert.id}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Verified
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{cert.courseTitle}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Issued to <span className="font-bold text-slate-800">{cert.studentName}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{cert.issueDate}</span>
                </div>

                <Link
                  href={`/certificates/${cert.id}`}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                >
                  <span>View / Print</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 shadow-2xs max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No Certificates Earned Yet</h3>
            <p className="text-xs text-slate-500 font-medium">
              Complete all lessons in a course and score ≥70% on the final assessment test to automatically earn your credential.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all mt-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Start a Course</span>
          </Link>
        </div>
      )}
    </div>
  );
}
