'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Filter,
  Plus,
  SlidersHorizontal,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { TaskPriority } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function TopHeader() {
  const pathname = usePathname();
  const {
    priorityFilter,
    setPriorityFilter,
    assigneeFilter,
    setAssigneeFilter,
    users,
    setIsCreateTaskOpen,
    filteredTasks,
  } = useProject();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Dynamic Page Title
  const getPageTitle = () => {
    switch (pathname) {
      case '/':
        return { title: 'Executive Overview', subtitle: 'Real-time project health & velocity metrics' };
      case '/board':
        return { title: 'Kanban Workflow', subtitle: 'Interactive sprint board & task management' };
      case '/list':
        return { title: 'Task Directory', subtitle: 'Sortable multi-project task repository' };
      case '/timeline':
        return { title: 'Project Timeline', subtitle: 'Visual roadmap & milestone delivery schedule' };
      case '/analytics':
        return { title: 'Sprint Analytics', subtitle: 'Burndown charts, capacity & performance insights' };
      case '/team':
        return { title: 'Team Workload', subtitle: 'Capacity planning & member allocation' };
      default:
        return { title: 'ApexFlow Workspace', subtitle: 'High-performance project management' };
    }
  };

  const pageInfo = getPageTitle();

  return (
    <header className="h-16 border-b border-slate-800/60 bg-[#0b0f19]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Page Title & Breadcrumbs */}
      <div>
        <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          {pageInfo.title}
          <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {filteredTasks.length} tasks
          </span>
        </h1>
        <p className="text-xs text-slate-400">{pageInfo.subtitle}</p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Filters Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
              priorityFilter !== 'all' || assigneeFilter !== 'all'
                ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            {(priorityFilter !== 'all' || assigneeFilter !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
            )}
          </button>

          {/* Filter Popover */}
          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-64 p-4 rounded-xl bg-[#0f172a] border border-slate-800 shadow-2xl z-50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-semibold text-white">Filter Tasks</span>
                <button
                  onClick={() => setShowFilterDropdown(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
                  Priority
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['all', 'urgent', 'high', 'medium', 'low'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriorityFilter(p as TaskPriority | 'all')}
                      className={cn(
                        'px-2 py-1 rounded text-[11px] capitalize border text-left transition-colors',
                        priorityFilter === p
                          ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assignee Filter */}
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
                  Assignee
                </label>
                <select
                  value={assigneeFilter}
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Team Members</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#0b0f19]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 p-4 rounded-xl bg-[#0f172a] border border-slate-800 shadow-2xl z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-white">Notifications</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  2 Unread
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="flex gap-2.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-200 font-medium">Sprint 42 Target Met</p>
                    <p className="text-[11px] text-slate-400">16 tasks completed on schedule.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-200 font-medium">APEX-101 Needs Review</p>
                    <p className="text-[11px] text-slate-400">Marcus Chen requested design audit.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Primary New Task CTA */}
        <button
          onClick={() => setIsCreateTaskOpen(true)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>

        {/* User Profile */}
        <div className="pl-2 border-l border-slate-800 flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-indigo-500/40">
            <Image
              src={users[0].avatar}
              alt={users[0].name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
