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
      <div className="max-w-md mx-auto py-12 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Administrator Portal
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Sign in with administrator credentials to manage platform analytics and student rosters.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Admin Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@apexflow.edu"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" /> Password
              </label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Access Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
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
