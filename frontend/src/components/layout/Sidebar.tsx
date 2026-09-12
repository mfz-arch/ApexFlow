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
    <aside className="w-64 h-screen bg-[#0b0f19] border-r border-slate-800/60 flex flex-col flex-shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-800/60">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-indigo-500/30 group-hover:border-indigo-500/60 transition-colors shadow-lg shadow-indigo-500/10">
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
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                ApexFlow
              </span>
              <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400">Enterprise SaaS</p>
          </div>
        </Link>
      </div>

      {/* Workspace Switcher */}
      <div className="p-3">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800/80 text-slate-300 hover:text-white hover:border-slate-700 transition-all text-xs font-medium">
          <div className="flex items-center gap-2 truncate">
            <div className="w-5 h-5 rounded bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">
              A
            </div>
            <span className="truncate">Acme Engineering</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

      {/* Quick Action & Search Trigger */}
      <div className="px-3 pb-3 flex items-center gap-2">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/60 text-slate-400 text-xs hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
          </div>
          <kbd className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
            ⌘K
          </kbd>
        </button>
        <button
          onClick={() => setIsCreateTaskOpen(true)}
          title="Quick New Task"
          className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
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
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/20 to-indigo-600/5 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
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
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Active Projects
            </span>
            <FolderKanban className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedProjectId('all')}
              className={cn(
                'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors',
                selectedProjectId === 'all'
                  ? 'text-white font-medium bg-slate-800/80'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              )}
            >
              <span>All Workspace Projects</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
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
                    'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors group',
                    isSelected
                      ? 'text-indigo-300 font-medium bg-indigo-500/10 border border-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
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
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400">
                    {proj.key}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Copilot Badge Footer */}
      <div className="p-3 border-t border-slate-800/60">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">AI Flow Engine</div>
            <div className="text-[10px] text-slate-400">Predictive Velocity Active</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
