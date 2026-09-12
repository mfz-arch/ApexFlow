'use client';

import React from 'react';
import { CheckCircle2, Clock, Flame, Zap, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';

export default function StatCards() {
  const { tasks } = useProject();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const urgent = tasks.filter((t) => t.priority === 'urgent').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      title: 'Total Active Tasks',
      value: total.toString(),
      change: 'Active in sprint',
      icon: CheckCircle2,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      title: 'In Progress Velocity',
      value: `${inProgress} Tasks`,
      change: 'In active review',
      icon: Zap,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Sprint Completion',
      value: `${completionRate}%`,
      change: 'Target rate',
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Urgent Items',
      value: `${urgent} Critical`,
      change: 'Requires attention',
      icon: Flame,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">{stat.title}</span>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${stat.color}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</span>
              <div className="flex items-center text-[10px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
