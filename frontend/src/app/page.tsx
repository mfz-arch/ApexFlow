'use client';

import React from 'react';
import StatCards from '@/components/dashboard/StatCards';
import VelocityChart from '@/components/dashboard/VelocityChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import TaskTable from '@/components/list/TaskTable';
import { useProject } from '@/context/ProjectContext';
import { ArrowRight, Sparkles, Kanban } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { filteredTasks } = useProject();

  return (
    <div className="space-y-6 pb-8">
      {/* Executive Stat Cards */}
      <StatCards />

      {/* Main Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VelocityChart />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* Active Tasks Directory Highlight */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Kanban className="w-4 h-4 text-indigo-400" />
              Active Sprint Tasks
            </h3>
            <p className="text-xs text-slate-400">High-priority items requiring team focus</p>
          </div>
          <Link
            href="/board"
            className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
          >
            <span>Open Kanban Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <TaskTable />
      </div>
    </div>
  );
}
