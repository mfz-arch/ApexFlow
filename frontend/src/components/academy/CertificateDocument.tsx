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
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF (A4 Landscape)</span>
        </button>
      </div>

      {/* Printable High-Resolution Educational Certificate Frame */}
      <div className="printable-certificate-container bg-white p-8 sm:p-12 rounded-3xl border-8 border-indigo-100 shadow-xl relative overflow-hidden text-center flex flex-col justify-between space-y-6 print:shadow-none print:border-0 print:p-8">
        {/* Decorative Corner Accents (Visible in Print & Screen) */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-indigo-600/60 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-indigo-600/60 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-indigo-600/60 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-indigo-600/60 rounded-br-xl" />

        {/* Certificate Branding Header */}
        <div className="flex flex-col items-center justify-center space-y-2 pt-2">
          <div className="h-14 w-auto bg-white rounded-2xl p-2 shadow-sm flex items-center justify-center border border-slate-100">
            <Image
              src="/logo.png"
              alt="Apex Flow Logo"
              width={52}
              height={52}
              className="h-10 w-auto object-contain"
            />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Apex Flow Online Learning Academy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif pt-1">
            Certificate of Completion
          </h1>
        </div>

        {/* Presentation Statement */}
        <div className="space-y-3 max-w-2xl mx-auto w-full">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            This certificate is proudly presented to
          </p>

          {/* Student Registered Name */}
          <div className="py-2 border-b-2 border-indigo-600/30 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-indigo-950 font-serif tracking-tight capitalize">
              {certificate.studentName}
            </h2>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1 max-w-lg mx-auto">
            for successfully completing the required learning roadmap, interactive exercises, and final academic assessment for
          </p>

          <h3 className="text-xl sm:text-2xl font-extrabold text-indigo-700 font-sans tracking-tight">
            {certificate.courseTitle}
          </h3>
        </div>

        {/* Bottom Section: Metadata & Signature Seal */}
        <div className="w-full space-y-4 max-w-2xl mx-auto">
          {/* Certificate Metadata Grid */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 text-center text-xs">
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
          <div className="pt-4 flex items-center justify-between border-t border-slate-100 gap-4 text-left">
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

            <div className="text-[10px] text-slate-400 font-medium text-right">
              <span>Verified by Apex Flow Academic Engine • Unique Digital Credential</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
