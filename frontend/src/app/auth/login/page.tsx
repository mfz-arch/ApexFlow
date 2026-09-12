'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginStudent, loginAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdminLogin || email.toLowerCase().includes('admin')) {
      loginAdmin(email || 'admin@apexflow.edu');
      router.push('/admin');
    } else {
      loginStudent(email || 'student@apexflow.edu');
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12 space-y-6">
      <div className="text-center space-y-2">
        <div
          className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center mx-auto shadow-lg ${
            isAdminLogin ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-indigo-600 shadow-indigo-600/20'
          }`}
        >
          {isAdminLogin ? <ShieldCheck className="w-7 h-7" /> : <GraduationCap className="w-7 h-7" />}
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {isAdminLogin ? 'Admin Sign In' : 'Student Sign In'}
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {isAdminLogin
            ? 'Access the Academy administrator control panel.'
            : 'Access your learning roadmap, dashboard, and verified certificates.'}
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isAdminLogin ? 'admin@apexflow.edu' : 'student@example.com'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
              isAdminLogin
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
            }`}
          >
            <span>{isAdminLogin ? 'Access Admin Dashboard' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
          <button
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            {isAdminLogin ? '← Switch to Student Sign In' : 'Sign In as Administrator →'}
          </button>

          <Link href="/auth/register" className="text-indigo-600 hover:underline">
            Register Student Account
          </Link>
        </div>
      </div>
    </div>
  );
}
