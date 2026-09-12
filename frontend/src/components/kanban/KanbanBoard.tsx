'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { TaskStatus } from '@/lib/types';
import TaskCard from './TaskCard';

export default function KanbanBoard() {
  const { filteredTasks, setIsCreateTaskOpen } = useProject();

  const columns: { id: TaskStatus; label: string; dot: string }[] = [
    { id: 'backlog', label: 'Backlog', dot: 'bg-slate-400' },
    { id: 'todo', label: 'To Do', dot: 'bg-indigo-600' },
    { id: 'in_progress', label: 'In Progress', dot: 'bg-amber-500' },
    { id: 'in_review', label: 'In Review', dot: 'bg-purple-600' },
    { id: 'done', label: 'Done', dot: 'bg-emerald-600' },
  ];

  return (
    <div className="h-full overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-[1200px] h-full items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="flex-1 bg-slate-100/70 rounded-2xl border border-slate-200/80 p-3.5 flex flex-col max-h-full min-w-[240px] shadow-2xs"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                  <h3 className="text-xs font-bold text-slate-900 tracking-wide">{col.label}</h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => setIsCreateTaskOpen(true)}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Task Cards Container */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}

                {colTasks.length === 0 && (
                  <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                    <p className="text-xs font-medium text-slate-500">No tasks in {col.label}</p>
                    <button
                      onClick={() => setIsCreateTaskOpen(true)}
                      className="mt-2 text-[11px] font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      + Add Task
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
