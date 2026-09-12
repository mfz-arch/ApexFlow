'use client';

import React from 'react';
import Image from 'next/image';
import {
  MoreVertical,
  CheckSquare,
  Clock,
  ArrowUpDown,
  Flag,
} from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { TaskStatus, TaskPriority } from '@/lib/types';
import { cn, getPriorityBadge, getStatusDetails, formatDate } from '@/lib/utils';

export default function TaskTable() {
  const { filteredTasks, setSelectedTask, updateTaskStatus, updateTaskPriority, projects } =
    useProject();

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="p-3.5 pl-5">Code & Title</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Priority</th>
              <th className="p-3.5">Project</th>
              <th className="p-3.5">Assignee</th>
              <th className="p-3.5">Due Date</th>
              <th className="p-3.5 text-right pr-5">Logged Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {filteredTasks.map((task) => {
              const priorityBadge = getPriorityBadge(task.priority);
              const statusDetails = getStatusDetails(task.status);
              const project = projects.find((p) => p.id === task.projectId);

              return (
                <tr
                  key={task.id}
                  className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  {/* Code & Title */}
                  <td className="p-3.5 pl-5 max-w-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {task.code}
                      </span>
                      <span className="font-semibold text-white group-hover:text-indigo-200 truncate">
                        {task.title}
                      </span>
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="backlog">Backlog</option>
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="in_review">In Review</option>
                      <option value="done">Done</option>
                    </select>
                  </td>

                  {/* Priority */}
                  <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={task.priority}
                      onChange={(e) => updateTaskPriority(task.id, e.target.value as TaskPriority)}
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2 py-1 capitalize focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </td>

                  {/* Project */}
                  <td className="p-3.5">
                    <span className="text-slate-300 font-medium">
                      {project?.name || 'Apex Core'}
                    </span>
                  </td>

                  {/* Assignee */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-700">
                        <Image
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-slate-300">{task.assignee.name}</span>
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="p-3.5 text-slate-400 font-mono">
                    {formatDate(task.dueDate)}
                  </td>

                  {/* Time Logged */}
                  <td className="p-3.5 text-right pr-5 font-mono text-cyan-400">
                    {task.timeLoggedHours}h / {task.estimatedHours}h
                  </td>
                </tr>
              );
            })}

            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No tasks match your current filter parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
