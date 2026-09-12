'use client';

import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { TaskStatus } from '@/lib/types';
import TaskCard from './TaskCard';
import { getStatusDetails } from '@/lib/utils';

export default function KanbanBoard() {
  const { filteredTasks, setIsCreateTaskOpen, updateTaskStatus } = useProject();

  const columns: { id: TaskStatus; label: string; dot: string }[] = [
    { id: 'backlog', label: 'Backlog', dot: 'bg-slate-400' },
    { id: 'todo', label: 'To Do', dot: 'bg-indigo-400' },
    { id: 'in_progress', label: 'In Progress', dot: 'bg-amber-400' },
    { id: 'in_review', label: 'In Review', dot: 'bg-purple-400' },
    { id: 'done', label: 'Done', dot: 'bg-emerald-400' },
  ];

  return (
    <div className="h-full overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-[1200px] h-full items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="flex-1 bg-[#0f172a]/60 rounded-2xl border border-slate-800/80 p-3.5 flex flex-col max-h-full min-w-[240px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                  <h3 className="text-xs font-bold text-white tracking-wide">{col.label}</h3>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => setIsCreateTaskOpen(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
                  <div className="p-6 text-center border-2 border-dashed border-slate-800/60 rounded-xl">
                    <p className="text-xs text-slate-500">No tasks in {col.label}</p>
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
