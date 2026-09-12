'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Plus,
  SlidersHorizontal,
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
    <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* Page Title & Breadcrumbs */}
      <div>
        <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {pageInfo.title}
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {filteredTasks.length} tasks
          </span>
        </h1>
        <p className="text-xs text-slate-500">{pageInfo.subtitle}</p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Filters Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors shadow-2xs',
              priorityFilter !== 'all' || assigneeFilter !== 'all'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            {(priorityFilter !== 'all' || assigneeFilter !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
            )}
          </button>

          {/* Filter Popover */}
          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-64 p-4 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">Filter Tasks</span>
                <button
                  onClick={() => setShowFilterDropdown(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Priority
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['all', 'urgent', 'high', 'medium', 'low'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriorityFilter(p as TaskPriority | 'all')}
                      className={cn(
                        'px-2 py-1 rounded-lg text-[11px] capitalize border text-left font-medium transition-colors',
                        priorityFilter === p
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assignee Filter */}
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Assignee
                </label>
                <select
                  value={assigneeFilter}
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="all">All Members</option>
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
            className="relative p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-2xs"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 p-4 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Ready
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-900 font-bold">ApexFlow Workspace Active</p>
                    <p className="text-[11px] text-slate-500">Add tasks and start tracking velocity.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Primary New Task CTA */}
        <button
          onClick={() => setIsCreateTaskOpen(true)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>

        {/* User Profile */}
        <div className="pl-2 border-l border-slate-200 flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-300 shadow-2xs">
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
