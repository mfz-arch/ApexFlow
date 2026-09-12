'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Kanban,
  ListTodo,
  GanttChart,
  BarChart3,
  Users,
  FolderKanban,
  Plus,
  ChevronDown,
  Sparkles,
  Search,
} from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();
  const { projects, selectedProjectId, setSelectedProjectId, setIsCreateTaskOpen, setIsCommandPaletteOpen } = useProject();

  const navItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Kanban Board', href: '/board', icon: Kanban },
    { name: 'Task List', href: '/list', icon: ListTodo },
    { name: 'Timeline', href: '/timeline', icon: GanttChart },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Team Workload', href: '/team', icon: Users },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col flex-shrink-0 select-none z-30 shadow-sm">
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-100">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-indigo-100 group-hover:border-indigo-300 transition-colors shadow-sm">
            <Image
              src="/logo.png"
              alt="ApexFlow Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                ApexFlow
              </span>
              <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500">Enterprise SaaS</p>
          </div>
        </Link>
      </div>

      {/* Workspace Switcher */}
      <div className="p-3">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-all text-xs font-medium shadow-2xs">
          <div className="flex items-center gap-2 truncate">
            <div className="w-5 h-5 rounded bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
              A
            </div>
            <span className="truncate font-semibold">Workspace Core</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Quick Action & Search Trigger */}
      <div className="px-3 pb-3 flex items-center gap-2">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
          </div>
          <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded text-slate-500 border border-slate-200 shadow-2xs">
            ⌘K
          </kbd>
        </button>
        <button
          onClick={() => setIsCreateTaskOpen(true)}
          title="Quick New Task"
          className="p-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Projects Workspace Filter */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Projects
            </span>
            <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedProjectId('all')}
              className={cn(
                'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors',
                selectedProjectId === 'all'
                  ? 'text-slate-900 font-bold bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              <span>All Projects</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                {projects.length}
              </span>
            </button>

            {projects.map((proj) => {
              const isSelected = selectedProjectId === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors group',
                    isSelected
                      ? 'text-indigo-700 font-bold bg-indigo-50 border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full bg-gradient-to-r',
                        proj.color
                      )}
                    />
                    <span className="truncate">{proj.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600">
                    {proj.key}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Flow Footer */}
      <div className="p-3 border-t border-slate-100">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Apex Engine</div>
            <div className="text-[10px] text-slate-500">Live Workspace Ready</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
