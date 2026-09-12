'use client';

import React from 'react';
import Image from 'next/image';
import { GanttChart, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { cn, getPriorityBadge } from '@/lib/utils';

export default function TimelineGantt() {
  const { filteredTasks, setSelectedTask } = useProject();

  const days = [
    { label: 'Sep 10', day: 'Wed' },
    { label: 'Sep 11', day: 'Thu' },
    { label: 'Sep 12', day: 'Fri', isToday: true },
    { label: 'Sep 13', day: 'Sat' },
    { label: 'Sep 14', day: 'Sun' },
    { label: 'Sep 15', day: 'Mon' },
    { label: 'Sep 16', day: 'Tue' },
    { label: 'Sep 17', day: 'Wed' },
    { label: 'Sep 18', day: 'Thu' },
    { label: 'Sep 19', day: 'Fri' },
    { label: 'Sep 20', day: 'Sat' },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl overflow-hidden flex flex-col h-full">
      {/* Timeline Controls Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-2">
          <GanttChart className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-white">Sprint Schedule Timeline</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-300">September 2026</span>
          <button className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto flex-1">
        <div className="min-w-[900px]">
          {/* Day Headers */}
          <div className="grid grid-cols-12 border-b border-slate-800 text-center py-2.5 text-[11px] bg-slate-950/20">
            <div className="col-span-3 text-left pl-4 font-semibold text-slate-400">
              Task Item
            </div>
            {days.map((d, i) => (
              <div
                key={i}
                className={cn(
                  'col-span-1 border-l border-slate-800/60 font-mono',
                  d.isToday ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-slate-400'
                )}
              >
                <div>{d.day}</div>
                <div className="text-[10px] text-slate-500">{d.label}</div>
              </div>
            ))}
          </div>

          {/* Task Rows */}
          <div className="divide-y divide-slate-800/50 text-xs">
            {filteredTasks.map((task, idx) => {
              const priority = getPriorityBadge(task.priority);
              // Calculate offset span for demo timeline layout
              const startOffset = (idx % 4) + 1;
              const spanWidth = (idx % 3) + 3;

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="grid grid-cols-12 items-center py-3 hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  {/* Task Name Column */}
                  <div className="col-span-3 pl-4 pr-2 truncate flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-indigo-400">
                      {task.code}
                    </span>
                    <span className="text-slate-200 font-medium truncate group-hover:text-indigo-300">
                      {task.title}
                    </span>
                  </div>

                  {/* Timeline Bar Area */}
                  <div className="col-span-9 grid grid-cols-9 h-full items-center relative pr-2">
                    {/* Grid Background lines */}
                    <div className="absolute inset-0 grid grid-cols-9 pointer-events-none">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border-l border-slate-800/40 h-full" />
                      ))}
                    </div>

                    {/* Timeline Pill */}
                    <div
                      className={cn(
                        'h-7 rounded-xl p-1 flex items-center justify-between text-[10px] font-semibold text-white shadow-lg relative z-10 transition-all group-hover:scale-[1.01]',
                        task.priority === 'urgent'
                          ? 'bg-gradient-to-r from-rose-600 to-amber-600'
                          : task.priority === 'high'
                          ? 'bg-gradient-to-r from-indigo-600 to-cyan-600'
                          : 'bg-gradient-to-r from-slate-700 to-slate-800'
                      )}
                      style={{
                        gridColumnStart: startOffset,
                        gridColumnEnd: `span ${spanWidth}`,
                      }}
                    >
                      <span className="truncate px-1.5 font-medium">{task.title}</span>
                      <div className="relative w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-white/30">
                        <Image src={task.assignee.avatar} alt="" fill className="object-cover" />
                      </div>
                    </div>
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
