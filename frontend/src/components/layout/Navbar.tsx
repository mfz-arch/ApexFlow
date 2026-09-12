'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  Award,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  UserCheck,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, role, setRole, logout } = useAuth();
  const [userDropdown, setUserDropdown] = React.useState(false);

  const isStudent = role === 'student';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:bg-indigo-700 transition-colors">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Apex Flow
            </span>
            <span className="block text-[10px] font-semibold tracking-wider uppercase text-indigo-600 -mt-1">
              Online Academy
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/courses"
            className={cn(
              'px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
              pathname.startsWith('/courses')
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            )}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses</span>
          </Link>

          {isStudent && (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
                  pathname === '/dashboard'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>My Dashboard</span>
              </Link>

              <Link
                href="/certificates"
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
                  pathname.startsWith('/certificates')
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                )}
              >
                <Award className="w-4 h-4" />
                <span>Certificates</span>
              </Link>
            </>
          )}

          {!isStudent && (
            <Link
              href="/admin"
              className={cn(
                'px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
                pathname === '/admin'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Admin Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Right Actions & User Menu */}
        <div className="flex items-center gap-3">
          {/* Role Switcher Button for Testing */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setRole('student')}
              className={cn(
                'px-2.5 py-1 rounded-lg transition-colors',
                role === 'student' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              )}
            >
              Student
            </button>
            <button
              onClick={() => setRole('admin')}
              className={cn(
                'px-2.5 py-1 rounded-lg transition-colors',
                role === 'admin' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              )}
            >
              Admin
            </button>
          </div>

          {/* XP Badge */}
          {currentUser && role === 'student' && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-extrabold shadow-2xs">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{currentUser.xp} XP</span>
            </div>
          )}

          {/* User Profile */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-xs font-bold text-slate-800 truncate max-w-[120px]">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 space-y-1">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 mt-1 rounded bg-indigo-50 text-indigo-700">
                      {role}
                    </span>
                  </div>

                  <Link
                    href={role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    <span>{role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}</span>
                  </Link>

                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
