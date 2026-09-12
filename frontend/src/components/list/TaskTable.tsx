'use client';

import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { TaskStatus, TaskPriority } from '@/lib/types';
import { getPriorityBadge, getStatusDetails, formatDate } from '@/lib/utils';

export default function TaskTable() {
  const { filteredTasks, setSelectedTask, updateTaskStatus, updateTaskPriority, projects, setIsCreateTaskOpen } =
    useProject();

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="p-3.5 pl-5">Code & Title</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Priority</th>
              <th className="p-3.5">Project</th>
              <th className="p-3.5">Assignee</th>
              <th className="p-3.5">Due Date</th>
              <th className="p-3.5 text-right pr-5">Logged Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredTasks.map((task) => {
              const priorityBadge = getPriorityBadge(task.priority);
              const statusDetails = getStatusDetails(task.status);
              const project = projects.find((p) => p.id === task.projectId);

              return (
                <tr
                  key={task.id}
                  className="hover:bg-slate-50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  {/* Code & Title */}
                  <td className="p-3.5 pl-5 max-w-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {task.code}
                      </span>
                      <span className="font-bold text-slate-900 group-hover:text-indigo-700 truncate">
                        {task.title}
                      </span>
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                      className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
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
                      className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2 py-1 capitalize focus:outline-none focus:border-indigo-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </td>

                  {/* Project */}
                  <td className="p-3.5">
                    <span className="text-slate-700 font-semibold">
                      {project?.name || 'Core Workspace'}
                    </span>
                  </td>

                  {/* Assignee */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-300">
                        <Image
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-slate-700 font-medium">{task.assignee.name}</span>
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="p-3.5 text-slate-500 font-mono font-medium">
                    {formatDate(task.dueDate)}
                  </td>

                  {/* Time Logged */}
                  <td className="p-3.5 text-right pr-5 font-mono text-indigo-700 font-bold">
                    {task.timeLoggedHours}h / {task.estimatedHours}h
                  </td>
                </tr>
              );
            })}

            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={7} className="p-10 text-center">
                  <div className="max-w-xs mx-auto space-y-2">
                    <p className="text-xs font-bold text-slate-800">No tasks created yet</p>
                    <p className="text-[11px] text-slate-500">Your task directory is clear. Click below to add your first project task.</p>
                    <button
                      onClick={() => setIsCreateTaskOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs mt-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Task</span>
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
