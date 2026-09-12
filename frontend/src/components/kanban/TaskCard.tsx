'use client';

import React from 'react';
import Image from 'next/image';
import { MessageSquare, CheckSquare } from 'lucide-react';
import { Task } from '@/lib/types';
import { useProject } from '@/context/ProjectContext';
import { cn, getPriorityBadge } from '@/lib/utils';

export default function TaskCard({ task }: { task: Task }) {
  const { setSelectedTask } = useProject();
  const priority = getPriorityBadge(task.priority);

  const completedSubtasks = task.subtasks.filter((st) => st.completed).length;

  return (
    <div
      onClick={() => setSelectedTask(task)}
      className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all duration-200 shadow-2xs group relative flex flex-col justify-between space-y-3"
    >
      {/* Top Code & Priority */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-bold text-indigo-700 group-hover:text-indigo-600">
          {task.code}
        </span>
        <span
          className={cn(
            'text-[10px] font-bold px-2 py-0.5 rounded-md border capitalize flex items-center gap-1',
            priority.bg
          )}
        >
          <span className={cn('w-1.5 h-1.5 rounded-full', priority.dot)} />
          {priority.label}
        </span>
      </div>

      {/* Task Title */}
      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-900 transition-colors line-clamp-2">
        {task.title}
      </h4>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer Meta */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-3">
          {/* Subtasks Count */}
          {task.subtasks.length > 0 && (
            <div
              className={cn(
                'flex items-center gap-1 font-mono text-[10px]',
                completedSubtasks === task.subtasks.length ? 'text-emerald-600 font-bold' : 'text-slate-500'
              )}
            >
              <CheckSquare className="w-3 h-3" />
              <span>
                {completedSubtasks}/{task.subtasks.length}
              </span>
            </div>
          )}

          {/* Comments Count */}
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
              <MessageSquare className="w-3 h-3" />
              <span>{task.comments.length}</span>
            </div>
          )}
        </div>

        {/* Assignee Avatar */}
        <div className="flex items-center gap-2">
          <div
            className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-300"
            title={`Assigned to ${task.assignee.name}`}
          >
            <Image src={task.assignee.avatar} alt={task.assignee.name} fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
