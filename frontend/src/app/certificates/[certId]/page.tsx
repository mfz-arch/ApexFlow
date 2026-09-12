'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, Clock, ShieldAlert } from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import CertificateDocument from '@/components/academy/CertificateDocument';

export default function CertificateDetailPage() {
  const params = useParams();
  const { getCertificateById } = useAcademy();

  const certId = params.certId as string;
  const certificate = getCertificateById(certId);

  if (!certificate) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-slate-900">Certificate Not Found</h2>
        <p className="text-xs text-slate-500">The requested certificate ID (`{certId}`) could not be located.</p>
        <Link href="/certificates" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          View All Certificates
        </Link>
      </div>
    );
  }

  if (certificate.status === 'pending') {
    return (
      <div className="max-w-xl mx-auto space-y-6 py-12 text-center">
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-amber-200 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <Clock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Verification Pending</h2>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Your certificate request (<span className="font-mono text-indigo-700 font-bold">{certificate.id}</span>) for <span className="font-bold text-slate-800">{certificate.courseTitle}</span> has been submitted to the academy administration.
            Once an administrator reviews and approves your request, your official printable credential will be unlocked here.
          </p>
          <div className="pt-2">
            <Link
              href="/certificates"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to My Certificates</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <Link
        href="/certificates"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors print:hidden"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to My Certificates</span>
      </Link>

      <CertificateDocument certificate={certificate} />
    </div>
  );
}
