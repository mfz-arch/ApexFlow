'use client';

import React from 'react';
import { BarChart3, TrendingDown, Zap, Target, Award, PieChart, Plus } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';

export default function AnalyticsPage() {
  const { tasks, projects, setIsCreateTaskOpen } = useProject();

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const urgentTasks = tasks.filter((t) => t.priority === 'urgent').length;

  return (
    <div className="space-y-6 pb-8">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Sprint Completion Rate</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0}%
          </div>
          <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
            <span>{doneTasks} of {totalTasks} tasks completed</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>In Progress Workload</span>
            <Zap className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{inProgressTasks} Tasks</div>
          <p className="text-xs text-indigo-700 font-bold">Active in sprint</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Urgent Items</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{urgentTasks} Critical</div>
          <p className="text-xs text-amber-700 font-bold">Priority items</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sprint Burndown Visualizer */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-indigo-600" />
                Sprint Trajectory Chart
              </h3>
              <p className="text-xs text-slate-500">Ideal burn guideline vs actual remaining tasks</p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              Active
            </span>
          </div>

          <div className="h-56 relative flex items-end justify-between pt-8 pb-4 px-4 border border-slate-200 rounded-xl bg-slate-50/50">
            {/* SVG Guideline */}
            <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none overflow-visible">
              <path
                d="M 20 20 L 500 180"
                stroke="#cbd5e1"
                strokeDasharray="4 4"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 20 20 Q 150 40 250 110 T 500 170"
                stroke="#4f46e5"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div className="flex-1 flex justify-between text-[10px] font-mono text-slate-400 font-bold z-10 w-full">
              <span>Day 1</span>
              <span>Day 3</span>
              <span>Day 5</span>
              <span>Day 7</span>
              <span>Target</span>
            </div>
          </div>
        </div>

        {/* Project Task Distribution */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-600" />
                Project Task Workload Breakdown
              </h3>
              <p className="text-xs text-slate-500">Task volume across active repositories</p>
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
                    <span className="font-bold text-slate-800">{proj.name}</span>
                    <span className="font-mono text-slate-500 font-semibold">
                      {projTasks.length} tasks ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
