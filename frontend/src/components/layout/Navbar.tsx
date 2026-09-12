'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  Award,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  LogOut,
  ChevronDown,
  UserPlus,
  LogIn,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, role, isLoggedIn, logout } = useAuth();
  const [userDropdown, setUserDropdown] = useState(false);

  const isStudent = role === 'student';
  const isAdmin = role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* MindEN Labs Style Top Announcement Bar */}
      <div className="bg-slate-950 text-slate-200 text-xs py-1.5 px-4 text-center font-medium overflow-hidden border-b border-slate-800 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="truncate">
          Welcome to ApexFlow Academy! Get instant access to online tech courses & verified certificates. Upgrade your IT skills today!
        </span>
      </div>

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
            <span className="block text-[10px] font-bold tracking-wider uppercase text-indigo-600 -mt-1">
              Online Academy
            </span>
          </div>
        </Link>

        {/* Center Main Nav Links (Home, About, Services, Products/Courses, Contact) */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600">
          <Link
            href="/"
            className={cn(
              'px-3 py-2 rounded-xl transition-colors hover:text-slate-900 hover:bg-slate-50',
              pathname === '/' && 'text-indigo-600 bg-indigo-50/70 font-extrabold'
            )}
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="px-3 py-2 rounded-xl transition-colors hover:text-slate-900 hover:bg-slate-50"
          >
            About
          </Link>
          <Link
            href="/#services"
            className="px-3 py-2 rounded-xl transition-colors hover:text-slate-900 hover:bg-slate-50"
          >
            Services
          </Link>
          <Link
            href="/courses"
            className={cn(
              'px-3 py-2 rounded-xl transition-colors hover:text-slate-900 hover:bg-slate-50',
              pathname.startsWith('/courses') && 'text-indigo-600 bg-indigo-50/70 font-extrabold'
            )}
          >
            Products
          </Link>
          <Link
            href="/#contact"
            className="px-3 py-2 rounded-xl transition-colors hover:text-slate-900 hover:bg-slate-50"
          >
            Contact
          </Link>
        </nav>

        {/* Right Portal Shortcuts (Apex Academy & Management) + User Menu */}
        <div className="flex items-center gap-2.5">
          {/* Portal Links (Inspired by Studio, MIA Academy & Management from reference) */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-200">
            {/* Apex Academy Portal Link */}
            <Link
              href={isLoggedIn ? '/dashboard' : '/auth/login'}
              className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-indigo-600 hover:bg-indigo-50 border border-indigo-100 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Apex Academy</span>
            </Link>

            {/* Management Portal Link */}
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-emerald-600 hover:bg-emerald-50 border border-emerald-100 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Management</span>
            </Link>
          </div>

          {/* XP Badge for Logged In Students */}
          {isStudent && currentUser && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-extrabold shadow-2xs">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{currentUser.xp} XP</span>
            </div>
          )}

          {/* User Profile Dropdown or Auth Actions */}
          {isLoggedIn && currentUser ? (
            <div className="relative ml-1">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg text-white flex items-center justify-center font-bold text-xs shadow-2xs',
                    isAdmin ? 'bg-emerald-600' : 'bg-indigo-600'
                  )}
                >
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
                    <span
                      className={cn(
                        'inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mt-1 rounded',
                        isAdmin
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      )}
                    >
                      {isAdmin ? 'Administrator' : 'Student'}
                    </span>
                  </div>

                  <Link
                    href={isAdmin ? '/admin' : '/dashboard'}
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    <span>{isAdmin ? 'Admin Control Center' : 'Student Dashboard'}</span>
                  </Link>

                  {isStudent && (
                    <Link
                      href="/certificates"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>My Certificates</span>
                    </Link>
                  )}

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
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </Link>
              <Link
                href="/auth/register"
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

