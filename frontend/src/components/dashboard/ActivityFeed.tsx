'use client';

import React from 'react';
import Image from 'next/image';
import { Activity as ActivityIcon, Clock } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';

export default function ActivityFeed() {
  const { activities } = useProject();

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ActivityIcon className="w-4 h-4 text-cyan-400" />
          Live Team Activity Stream
        </h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Realtime
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/60 transition-colors"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-700 flex-shrink-0 mt-0.5">
              <Image src={act.userAvatar} alt={act.userName} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-300">
                <span className="font-semibold text-white">{act.userName}</span>{' '}
                <span className="text-slate-400">{act.action}</span>{' '}
                <span className="font-mono text-indigo-300 truncate">{act.target}</span>
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                <Clock className="w-3 h-3" />
                <span>{act.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
