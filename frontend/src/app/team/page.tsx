'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Mail, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';

export default function TeamPage() {
  const { users, tasks } = useProject();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Engineering Team & Capacity</h2>
          <p className="text-xs text-slate-400">Current workload allocation and member availability</p>
        </div>
        <button className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20">
          + Invite Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((user) => {
          const userTasks = tasks.filter((t) => t.assignee.id === user.id);
          const completedTasks = userTasks.filter((t) => t.status === 'done').length;
          const capacityPercent = Math.min(Math.round((userTasks.length / 5) * 100), 100);

          return (
            <div
              key={user.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-4 hover:border-slate-700 transition-all"
            >
              {/* Profile Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-indigo-500/30">
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {user.name}
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </h3>
                    <p className="text-xs text-slate-400">{user.role}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {user.status}
                </span>
              </div>

              {/* Workload Capacity Meter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Sprint Workload Capacity</span>
                  <span className="font-mono text-indigo-400 font-semibold">{capacityPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>
              </div>

              {/* Tasks Summary */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{userTasks.length} Assigned Tasks</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{completedTasks} Done</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
