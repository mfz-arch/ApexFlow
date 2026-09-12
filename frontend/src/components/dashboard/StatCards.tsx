'use client';

import React from 'react';
import { CheckCircle2, Clock, Flame, Zap, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { mockAnalytics } from '@/lib/mockData';

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
      change: '+14% vs last sprint',
      icon: CheckCircle2,
      color: 'from-indigo-500 to-cyan-500',
      textColor: 'text-indigo-400',
    },
    {
      title: 'In Progress Velocity',
      value: `${inProgress} Tasks`,
      change: '16 story points active',
      icon: Zap,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-400',
    },
    {
      title: 'Sprint Completion Rate',
      value: `${completionRate}%`,
      change: '+4.2% velocity increase',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
    },
    {
      title: 'Urgent Blockers',
      value: `${urgent} Critical`,
      change: 'Requires immediate review',
      icon: Flame,
      color: 'from-rose-500 to-pink-500',
      textColor: 'text-rose-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 relative overflow-hidden group shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400">{stat.title}</span>
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 shadow-md`}
              >
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${stat.textColor}`} />
                </div>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
              <div className="flex items-center text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
