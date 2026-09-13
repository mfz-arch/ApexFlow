'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, BookOpen, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import { useAuth } from '@/context/AuthContext';

export default function CertificatesListPage() {
  const { certificates } = useAcademy();
  const { currentUser } = useAuth();

  const studentName = currentUser?.name || 'Student';
  const myCertificates = certificates.filter(
    (c) =>
      (c.studentName && studentName && c.studentName.toLowerCase() === studentName.toLowerCase()) ||
      (c.studentId && currentUser?.id && c.studentId === currentUser.id)
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="w-7 h-7 text-indigo-600" />
          My Official Certificates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Digital credentials issued upon course completion and administrator verification.
        </p>
      </div>

      {myCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myCertificates.map((cert) => {
            const isVerified = cert.status === 'verified';
            const isPending = cert.status === 'pending' || !cert.status;
            const isRejected = cert.status === 'rejected';

            return (
              <div
                key={cert.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      {cert.id}
                    </span>

                    {isVerified && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}

                    {isPending && (
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Request Sent • Waiting for Verification
                      </span>
                    )}

                    {isRejected && (
                      <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Request Rejected
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{cert.courseTitle}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Issued to <span className="font-bold text-slate-800">{cert.studentName}</span>
                    </p>
                  </div>

                  {isPending && (
                    <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-800 font-medium">
                      Your test score ({cert.scorePercent}%) was submitted successfully. The administrator will review and verify your official credential shortly.
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cert.issueDate}</span>
                  </div>

                  {isVerified ? (
                    <Link
                      href={`/certificates/${cert.id}`}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                    >
                      <span>View / Print</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed flex items-center gap-1.5 border border-slate-200"
                    >
                      <span>{isRejected ? 'Verification Declined' : 'Pending Verification'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 shadow-2xs max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No Certificates Earned Yet</h3>
            <p className="text-xs text-slate-500 font-medium">
              Complete all lessons in a course and score ≥70% on the final assessment test to submit your credential request for verification.
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
