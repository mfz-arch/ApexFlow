'use client';

import React from 'react';
import Image from 'next/image';
import { Certificate } from '@/lib/types';
import { Award, Printer, ShieldCheck } from 'lucide-react';

export default function CertificateDocument({ certificate }: { certificate: Certificate }) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Print Trigger Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            Verified Professional Certificate
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Certificate ID: <span className="font-mono text-indigo-700 font-bold">{certificate.id}</span>
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Printable High-Resolution Educational Certificate Frame */}
      <div className="bg-white p-8 sm:p-14 rounded-3xl border-8 border-indigo-50 shadow-xl relative overflow-hidden text-center space-y-8 print:shadow-none print:border-4 print:p-8">
        {/* Decorative Corner Accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-indigo-600/40 rounded-tl-xl print:hidden" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-indigo-600/40 rounded-tr-xl print:hidden" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-indigo-600/40 rounded-bl-xl print:hidden" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-indigo-600/40 rounded-br-xl print:hidden" />

        {/* Certificate Branding Header */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="h-16 w-auto bg-white rounded-2xl p-2 shadow-md flex items-center justify-center border border-slate-100 mb-1">
            <Image
              src="/logo.png"
              alt="Apex Flow Logo"
              width={56}
              height={56}
              className="h-12 w-auto object-contain"
            />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Apex Flow Online Learning Academy
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif pt-2">
            Certificate of Completion
          </h1>
        </div>

        {/* Presentation Statement */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-500">
            This certificate is proudly presented to
          </p>

          {/* Student Registered Name - Main Focus */}
          <div className="py-2 border-b-2 border-indigo-600/30 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-indigo-950 font-serif tracking-tight capitalize">
              {certificate.studentName}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-2">
            for successfully completing the required learning roadmap, interactive exercises, and final academic assessment for
          </p>

          <h3 className="text-xl sm:text-2xl font-extrabold text-indigo-700 font-sans tracking-tight">
            {certificate.courseTitle}
          </h3>
        </div>

        {/* Certificate Metadata Grid */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-left sm:text-center text-xs">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Final Test Score
            </span>
            <span className="font-bold text-slate-900 text-sm">{certificate.scorePercent}% Passed</span>
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Issue Date
            </span>
            <span className="font-bold text-slate-900 text-sm">{certificate.issueDate}</span>
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Certificate ID
            </span>
            <span className="font-mono font-bold text-indigo-700 text-sm">{certificate.id}</span>
          </div>
        </div>

        {/* Professional Footer Seal & Founder Verification Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 max-w-2xl mx-auto gap-4 text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px]">
                Verified by the Founder
              </span>
              <span className="font-extrabold text-slate-900 text-xs tracking-tight">
                AIM&apos;FIZ AHMED IBRAHIM
              </span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-medium text-center sm:text-right">
            <span>Verified by Apex Flow Academic Engine • Unique Digital Credential</span>
          </div>
        </div>
      </div>
    </div>
  );
}
