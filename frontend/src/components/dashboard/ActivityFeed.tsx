'use client';

import React from 'react';
import Image from 'next/image';
import { Activity as ActivityIcon, Clock, Plus } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';

export default function ActivityFeed() {
  const { activities, setIsCreateTaskOpen } = useProject();

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ActivityIcon className="w-4 h-4 text-indigo-600" />
          Live Team Activity Stream
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
          Live
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 mt-0.5">
              <Image src={act.userAvatar} alt={act.userName} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-700">
                <span className="font-bold text-slate-900">{act.userName}</span>{' '}
                <span className="text-slate-500">{act.action}</span>{' '}
                <span className="font-mono text-indigo-700 font-semibold truncate">{act.target}</span>
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                <Clock className="w-3 h-3" />
                <span>{act.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-2">
            <p className="text-xs font-semibold text-slate-700">No activity logged yet</p>
            <p className="text-[11px] text-slate-500">Actions will stream here live as you create and complete tasks.</p>
            <button
              onClick={() => setIsCreateTaskOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs mt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Task</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
