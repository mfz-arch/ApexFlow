'use client';

import React from 'react';
import { BarChart3, TrendingDown, Zap, Target, Award, PieChart } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { mockAnalytics } from '@/lib/mockData';

export default function AnalyticsPage() {
  const { tasks, projects } = useProject();

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const urgentTasks = tasks.filter((t) => t.priority === 'urgent').length;

  return (
    <div className="space-y-6 pb-8">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Sprint Completion Rate</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0}%
          </div>
          <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <span>+8.4% compared to Sprint 41</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Logged Engineering Hours</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white">312 Hours</div>
          <p className="text-xs text-cyan-400 font-medium">94.2 Story points delivered</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Critical Blocker Velocity</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">1.2 Days</div>
          <p className="text-xs text-amber-400 font-medium">Average turnaround time</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sprint Burndown Visualizer */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-indigo-400" />
                Sprint 42 Burndown Chart
              </h3>
              <p className="text-xs text-slate-400">Ideal guideline vs actual remaining tasks</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
              On Schedule
            </span>
          </div>

          <div className="h-56 relative flex items-end justify-between pt-8 pb-4 px-4 border border-slate-800/80 rounded-xl bg-slate-950/40">
            {/* SVG Guideline */}
            <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none overflow-visible">
              <path
                d="M 20 20 L 500 180"
                stroke="rgba(148, 163, 184, 0.3)"
                strokeDasharray="4 4"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 20 20 Q 150 40 250 110 T 500 170"
                stroke="#6366f1"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div className="flex-1 flex justify-between text-[10px] font-mono text-slate-500 z-10 w-full">
              <span>Day 1</span>
              <span>Day 3</span>
              <span>Day 5</span>
              <span>Day 7</span>
              <span>Day 10 (Target)</span>
            </div>
          </div>
        </div>

        {/* Project Task Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-cyan-400" />
                Project Task Workload Breakdown
              </h3>
              <p className="text-xs text-slate-400">Task volume across active repositories</p>
            </div>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => {
              const projTasks = tasks.filter((t) => t.projectId === proj.id);
              const percentage =
                tasks.length > 0 ? Math.round((projTasks.length / tasks.length) * 100) : 0;

              return (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{proj.name}</span>
                    <span className="font-mono text-slate-400">
                      {projTasks.length} tasks ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${proj.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
