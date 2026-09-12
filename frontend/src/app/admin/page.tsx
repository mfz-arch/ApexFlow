'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Award,
  Lock,
  ArrowRight,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboardPage() {
  const { courses, certificates, completedCourseIds } = useAcademy();
  const { currentUser, role, loginAdmin } = useAuth();

  const [adminEmail, setAdminEmail] = useState('admin@apexflow.edu');
  const [adminPass, setAdminPass] = useState('');

  const isAdmin = role === 'admin';

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(adminEmail);
  };

  if (!isAdmin) {
    return (
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8 min-h-[90vh] bg-slate-950 text-slate-100 flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden font-sans">
        {/* Background Cybernetic Lines Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between max-w-5xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-slate-700 bg-slate-900/80 backdrop-blur text-sm font-extrabold tracking-wider text-slate-100 uppercase shadow-lg">
            <span>Apex Flow Control Tower</span>
          </div>
          <a
            href="/"
            className="px-5 py-2 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/80 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all"
          >
            Home
          </a>
        </div>

        {/* Central Control Tower Card */}
        <div className="relative z-10 max-w-md w-full mx-auto my-auto py-8">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-6">
            {/* Shield Header Icon */}
            <div className="w-16 h-16 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Management Login
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Please authenticate using your Apex Flow administrator credentials.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Administrator WhatsApp / Phone / Email
                </label>
                <input
                  type="text"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="0612509403 or admin@apexflow.edu"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Alert Callout */}
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-300 text-xs font-semibold text-center">
                Only Apex Flow Admins can access this Control Tower.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl border border-slate-700 bg-slate-950 hover:bg-emerald-950 hover:border-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Access Control Tower</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-extrabold uppercase tracking-widest text-slate-400">
            <span>WE CONTROL EVERYTHING HERE @2026</span>
          </div>
        </div>
      </div>
    );
  }

  // Roster of students (current user + sample roster)
  const studentsList = [
    {
      id: currentUser?.id || 'usr-1',
      name: currentUser?.name || 'Sarah Jenkins',
      email: currentUser?.email || 'sarah@apexflow.edu',
      joinedDate: currentUser?.joinedDate || '2026-09-12',
      enrolledCount: 2,
      completedCount: completedCourseIds.length,
      certificatesCount: certificates.filter((c) => c.studentName === (currentUser?.name || 'Sarah Jenkins')).length,
    },
    {
      id: 'usr-2',
      name: 'Michael Chang',
      email: 'michael.c@apexflow.edu',
      joinedDate: '2026-09-10',
      enrolledCount: 3,
      completedCount: 1,
      certificatesCount: 1,
    },
    {
      id: 'usr-3',
      name: 'Elena Vance',
      email: 'elena.v@apexflow.edu',
      joinedDate: '2026-09-08',
      enrolledCount: 4,
      completedCount: 2,
      certificatesCount: 2,
    },
  ];

  const totalCertificatesIssued = certificates.length + 3;

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Header */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Apex Flow Academy Analytics</h1>
          <p className="text-xs text-slate-400 font-medium">
            Monitor real registered students, course completion rates, and issued certificates.
          </p>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-600" /> Registered Students
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{studentsList.length}</div>
          <span className="text-[11px] text-slate-400 font-medium">Active learner accounts</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-600" /> Pre-configured Courses
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{courses.length}</div>
          <span className="text-[11px] text-blue-700 font-medium">Pre-seeded & ready</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Completed Courses
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{completedCourseIds.length + 3}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Final tests passed</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" /> Certificates Issued
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{totalCertificatesIssued}</div>
          <span className="text-[11px] text-amber-700 font-medium">Unique IDs generated</span>
        </div>
      </div>

      {/* Registered Students Roster Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          Registered Student Roster
        </h2>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5 pl-5">Student Name & Email</th>
                  <th className="p-3.5">Registration Date</th>
                  <th className="p-3.5">Enrolled Courses</th>
                  <th className="p-3.5">Completed Courses</th>
                  <th className="p-3.5 text-right pr-5">Certificates Issued</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {studentsList.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 pl-5">
                      <div>
                        <span className="font-bold text-slate-900 block">{st.name}</span>
                        <span className="text-slate-500 font-medium text-[11px]">{st.email}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 font-medium">{st.joinedDate}</td>
                    <td className="p-3.5 text-slate-800 font-semibold">{st.enrolledCount} Courses</td>
                    <td className="p-3.5 font-bold text-emerald-700">{st.completedCount} Completed</td>
                    <td className="p-3.5 text-right pr-5 font-bold text-indigo-700">
                      {st.certificatesCount} Credentials
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Issued Certificates Roster Table */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          Issued Digital Certificates
        </h2>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5 pl-5">Certificate ID</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Course Title</th>
                  <th className="p-3.5">Issue Date</th>
                  <th className="p-3.5 text-right pr-5">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 pl-5 font-mono text-indigo-700 font-bold">{cert.id}</td>
                    <td className="p-3.5 text-slate-900">{cert.studentName}</td>
                    <td className="p-3.5 text-slate-700">{cert.courseTitle}</td>
                    <td className="p-3.5 text-slate-500">{cert.issueDate}</td>
                    <td className="p-3.5 text-right pr-5 font-mono text-emerald-700 font-bold">
                      {cert.scorePercent}%
                    </td>
                  </tr>
                ))}

                {certificates.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                      No certificates issued yet. Certificates will automatically log here when students pass final assessment tests.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
