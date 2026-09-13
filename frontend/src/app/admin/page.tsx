'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Award,
  Lock,
  ArrowRight,
  Mail,
  CheckCircle2,
  BarChart3,
  Eye,
  EyeOff,
  User,
  Clock,
  Check,
  XCircle,
} from 'lucide-react';
import { useAcademy } from '@/context/AcademyContext';
import { useAuth } from '@/context/AuthContext';
import { getApiBaseUrl } from '@/lib/apiClient';

export default function AdminDashboardPage() {
  const { courses, certificates, completedCourseIds, approveCertificate, rejectCertificate } = useAcademy();
  const { currentUser, role, loginAdmin } = useAuth();

  const [adminName, setAdminName] = useState("AIM'FIZ AHMED IBRAHIM");
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState<any[]>([]);

  useEffect(() => {
    let localStudents: any[] = [];
    try {
      const dbStr = localStorage.getItem('apexflow_users_db');
      if (dbStr) {
        const usersDb: Record<string, any> = JSON.parse(dbStr);
        localStudents = Object.values(usersDb).filter((u) => u && u.role === 'student');
      }
    } catch (e) {
      console.error('Failed to parse apexflow_users_db:', e);
    }

    const apiUrl = getApiBaseUrl();
    const token = typeof window !== 'undefined' ? localStorage.getItem('apexflow_token') || localStorage.getItem('token') : null;

    fetch(`${apiUrl}/admin/students`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((remoteStudents) => {
        if (remoteStudents && Array.isArray(remoteStudents)) {
          const mergedMap = new Map();
          localStudents.forEach((st) => {
            if (st.email) mergedMap.set(st.email.toLowerCase(), st);
          });
          remoteStudents.forEach((st) => {
            if (st.email) mergedMap.set(st.email.toLowerCase(), st);
          });
          setRegisteredStudents(Array.from(mergedMap.values()));
        } else {
          setRegisteredStudents(localStudents);
        }
      })
      .catch(() => {
        setRegisteredStudents(localStudents);
      });
  }, [certificates, currentUser]);

  const isAdmin = role === 'admin';

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(adminEmail, adminName);
  };

  const handleApprove = async (certId: string) => {
    approveCertificate(certId);
    const token = typeof window !== 'undefined' ? localStorage.getItem('apexflow_token') || localStorage.getItem('token') : null;
    const apiUrl = getApiBaseUrl();
    try {
      await fetch(`${apiUrl}/admin/certificates/${certId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    } catch (err) {
      console.error('Failed to sync approval to backend:', err);
    }
  };

  const handleReject = async (certId: string) => {
    rejectCertificate(certId);
    const token = typeof window !== 'undefined' ? localStorage.getItem('apexflow_token') || localStorage.getItem('token') : null;
    const apiUrl = getApiBaseUrl();
    try {
      await fetch(`${apiUrl}/admin/certificates/${certId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    } catch (err) {
      console.error('Failed to sync rejection to backend:', err);
    }
  };

  if (!isAdmin) {
    return (
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8 min-h-[92vh] flex flex-col lg:flex-row font-sans bg-[#0B101D] text-slate-100 relative overflow-hidden">
        {/* Decorative Background Swoosh Effect */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 via-indigo-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-900/30 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Left Column - Admin Welcome & Stats Highlights */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10">
          <div className="space-y-12">
            {/* Top Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-auto bg-white rounded-xl p-1 shadow-lg flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Apex Flow Logo"
                  width={36}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block leading-tight">
                  Apex Flow
                </span>
                <span className="block text-[10px] font-bold tracking-widest uppercase text-blue-400">
                  Online Academy
                </span>
              </div>
            </Link>

            {/* Headline & Description */}
            <div className="space-y-4 max-w-md">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Welcome to <br />
                <span className="text-blue-400">Admin Portal</span>
              </h1>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                Manage your platform, verify student certificates, and keep everything running smoothly.
              </p>
            </div>

            {/* 3 Admin Badges */}
            <div className="space-y-4 max-w-sm pt-4">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-200">View platform statistics</span>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-200">Manage real registered students</span>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-200">Approve & verify student certificates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - White Admin Login/Setup Form Card */}
        <div className="w-full lg:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10">
          {/* Top Right Logo */}
          <div className="hidden lg:flex justify-end">
            <div className="flex items-center gap-2">
              <div className="h-8 w-auto bg-white rounded-lg p-0.5 shadow-2xs flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Apex Flow Logo"
                  width={28}
                  height={28}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <span className="text-xs font-extrabold text-slate-300">Apex Flow</span>
            </div>
          </div>

          {/* Centered White Card */}
          <div className="max-w-md w-full mx-auto my-auto py-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 text-slate-900 shadow-2xl space-y-6">
              {/* Shield Icon Top */}
              <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div className="text-center space-y-1">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Admin Sign In
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Secure access for platform administrators.
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4 pt-1">

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="aimfizahmed7@gmail.com"
                      className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showAdminPass ? 'text' : 'password'}
                      required
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-10 py-3 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPass(!showAdminPass)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center pt-2">
                <Link
                  href="/"
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                >
                  <span>← Back to home</span>
                </Link>
              </div>
            </div>
          </div>

          <div />
        </div>
      </div>
    );
  }

  // Filter pending vs verified certificates
  const pendingCertificates = certificates.filter((c) => c.status === 'pending');
  const verifiedCertificates = certificates.filter((c) => c.status === 'verified');

  // Real roster of registered students
  const studentsList = registeredStudents.map((st) => {
    const certsCount = verifiedCertificates.filter(
      (c) => (c.studentId && c.studentId === st.id) || (c.studentName && st.name && c.studentName.toLowerCase() === st.name.toLowerCase())
    ).length;
    return {
      id: st.id || st._id || st.email,
      name: st.name || st.email?.split('@')[0] || 'Registered Student',
      email: st.email || 'N/A',
      joinedDate: st.joinedDate || new Date().toISOString().split('T')[0],
      enrolledCount: st.enrolledCourses?.length || st.enrolledCount || 0,
      completedCount: st.completedCourses?.length || st.completedCount || 0,
      certificatesCount: certsCount,
    };
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Header */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrator Control Tower</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Apex Flow Academy Analytics</h1>
          <p className="text-xs text-slate-400 font-medium">
            Monitor real registered students, verify certificate completion requests, and manage academy activity.
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
          <span className="text-[11px] text-slate-400 font-medium">Active registered accounts</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-600" /> Pre-configured Courses
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{courses.length}</div>
          <span className="text-[11px] text-blue-700 font-medium">Pre-seeded & ready</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" /> Pending Requests
          </span>
          <div className="text-2xl font-extrabold text-amber-600">{pendingCertificates.length}</div>
          <span className="text-[11px] text-amber-700 font-medium">Waiting for verification</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" /> Verified Certificates
          </span>
          <div className="text-2xl font-extrabold text-slate-900">{verifiedCertificates.length}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Approved & issued credentials</span>
        </div>
      </div>

      {/* PENDING CERTIFICATE VERIFICATION REQUESTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Pending Certificate Verification Requests
          </h2>
          {pendingCertificates.length > 0 && (
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              {pendingCertificates.length} Pending Approval
            </span>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5 pl-5">Certificate ID</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Course Completed</th>
                  <th className="p-3.5">Final Score</th>
                  <th className="p-3.5">Date Requested</th>
                  <th className="p-3.5 text-right pr-5">Admin Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                {pendingCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-amber-50/50 transition-colors">
                    <td className="p-3.5 pl-5 font-mono text-indigo-700 font-bold">{cert.id}</td>
                    <td className="p-3.5 text-slate-900 font-bold">{cert.studentName}</td>
                    <td className="p-3.5 text-slate-700">{cert.courseTitle}</td>
                    <td className="p-3.5 font-mono text-emerald-700 font-bold">{cert.scorePercent}%</td>
                    <td className="p-3.5 text-slate-500">{cert.issueDate}</td>
                    <td className="p-3.5 text-right pr-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(cert.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Issue</span>
                        </button>
                        <button
                          onClick={() => handleReject(cert.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold border border-rose-200 transition-all flex items-center gap-1.5"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pendingCertificates.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">
                      No pending certificate requests right now. When a student completes a course, their verification request will show up here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Registered Students Roster Table */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
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
                  <th className="p-3.5 text-right pr-5">Verified Credentials</th>
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

                {studentsList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                      No active registered student accounts found. Real users will appear here upon registration.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Issued Digital Certificates Table */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          Verified Issued Digital Certificates
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
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right pr-5">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                {verifiedCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 pl-5 font-mono text-indigo-700 font-bold">{cert.id}</td>
                    <td className="p-3.5 text-slate-900">{cert.studentName}</td>
                    <td className="p-3.5 text-slate-700">{cert.courseTitle}</td>
                    <td className="p-3.5 text-slate-500">{cert.issueDate}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-5 font-mono text-emerald-700 font-bold">
                      {cert.scorePercent}%
                    </td>
                  </tr>
                ))}

                {verifiedCertificates.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">
                      No verified certificates issued yet. When you approve pending student requests, they will log here.
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
