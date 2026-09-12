'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
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
