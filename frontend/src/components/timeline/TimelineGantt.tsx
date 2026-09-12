'use client';

import React from 'react';
import Image from 'next/image';
import { GanttChart, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { cn, getPriorityBadge } from '@/lib/utils';

export default function TimelineGantt() {
  const { filteredTasks, setSelectedTask, setIsCreateTaskOpen } = useProject();

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
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Timeline Controls Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <GanttChart className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-slate-900">Sprint Schedule Timeline</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-800">September 2026</span>
          <button className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto flex-1">
        <div className="min-w-[900px]">
          {/* Day Headers */}
          <div className="grid grid-cols-12 border-b border-slate-200 text-center py-2.5 text-[11px] bg-slate-50">
            <div className="col-span-3 text-left pl-4 font-bold text-slate-600">
              Task Item
            </div>
            {days.map((d, i) => (
              <div
                key={i}
                className={cn(
                  'col-span-1 border-l border-slate-200 font-mono font-medium',
                  d.isToday ? 'text-indigo-700 font-bold bg-indigo-50' : 'text-slate-600'
                )}
              >
                <div>{d.day}</div>
                <div className="text-[10px] text-slate-400">{d.label}</div>
              </div>
            ))}
          </div>

          {/* Task Rows */}
          <div className="divide-y divide-slate-100 text-xs">
            {filteredTasks.map((task, idx) => {
              const priority = getPriorityBadge(task.priority);
              const startOffset = (idx % 4) + 1;
              const spanWidth = (idx % 3) + 3;

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="grid grid-cols-12 items-center py-3 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  {/* Task Name Column */}
                  <div className="col-span-3 pl-4 pr-2 truncate flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-indigo-700">
                      {task.code}
                    </span>
                    <span className="text-slate-800 font-semibold truncate group-hover:text-indigo-700">
                      {task.title}
                    </span>
                  </div>

                  {/* Timeline Bar Area */}
                  <div className="col-span-9 grid grid-cols-9 h-full items-center relative pr-2">
                    {/* Grid Background lines */}
                    <div className="absolute inset-0 grid grid-cols-9 pointer-events-none">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border-l border-slate-100 h-full" />
                      ))}
                    </div>

                    {/* Timeline Pill */}
                    <div
                      className={cn(
                        'h-7 rounded-xl p-1 flex items-center justify-between text-[10px] font-bold text-white shadow-xs relative z-10 transition-all group-hover:scale-[1.01]',
                        task.priority === 'urgent'
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                          : task.priority === 'high'
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600'
                          : 'bg-gradient-to-r from-slate-600 to-slate-700'
                      )}
                      style={{
                        gridColumnStart: startOffset,
                        gridColumnEnd: `span ${spanWidth}`,
                      }}
                    >
                      <span className="truncate px-1.5">{task.title}</span>
                      <div className="relative w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-white/40">
                        <Image src={task.assignee.avatar} alt="" fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredTasks.length === 0 && (
              <div className="p-10 text-center text-slate-500 space-y-2">
                <p className="text-xs font-bold text-slate-800">Timeline is currently empty</p>
                <p className="text-[11px]">Tasks will automatically align on the timeline view once created.</p>
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
      </div>
    </div>
  );
}
