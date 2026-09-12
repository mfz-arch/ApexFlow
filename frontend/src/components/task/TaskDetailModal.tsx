'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  CheckSquare,
  Square,
  MessageSquare,
  Clock,
  Trash2,
  Send,
} from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { TaskStatus, TaskPriority } from '@/lib/types';
import { cn, getPriorityBadge, formatDate } from '@/lib/utils';

export default function TaskDetailModal() {
  const {
    selectedTask,
    setSelectedTask,
    updateTaskStatus,
    updateTaskPriority,
    toggleSubtask,
    addComment,
    deleteTask,
    projects,
  } = useProject();

  const [newComment, setNewComment] = useState('');

  if (!selectedTask) return null;

  const project = projects.find((p) => p.id === selectedTask.projectId);
  const priorityBadge = getPriorityBadge(selectedTask.priority);

  const completedSubtasks = selectedTask.subtasks.filter((st) => st.completed).length;
  const subtaskProgress =
    selectedTask.subtasks.length > 0
      ? Math.round((completedSubtasks / selectedTask.subtasks.length) * 100)
      : 0;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(selectedTask.id, newComment);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-end p-0 md:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl h-full md:h-[92vh] rounded-none md:rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
              {selectedTask.code}
            </span>
            <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
              {project?.name || 'Core Workspace'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => deleteTask(selectedTask.id)}
              title="Delete Task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedTask(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Description */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">{selectedTask.title}</h2>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-medium">
              {selectedTask.description || 'No detailed description provided.'}
            </p>
          </div>

          {/* Quick Controls Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            {/* Status Selector */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Status
              </span>
              <select
                value={selectedTask.status}
                onChange={(e) => updateTaskStatus(selectedTask.id, e.target.value as TaskStatus)}
                className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg p-1.5 focus:outline-none"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">In Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Priority
              </span>
              <select
                value={selectedTask.priority}
                onChange={(e) => updateTaskPriority(selectedTask.id, e.target.value as TaskPriority)}
                className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg p-1.5 capitalize focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Assignee */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Assignee
              </span>
              <div className="flex items-center gap-1.5 pt-0.5">
                <div className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-300">
                  <Image src={selectedTask.assignee.avatar} alt="" fill className="object-cover" />
                </div>
                <span className="text-xs font-semibold text-slate-800 truncate">{selectedTask.assignee.name}</span>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Due Date
              </span>
              <span className="text-xs font-semibold text-slate-800">{formatDate(selectedTask.dueDate)}</span>
            </div>
          </div>

          {/* Subtasks Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-600" />
                Subtasks Checklist ({completedSubtasks}/{selectedTask.subtasks.length})
              </span>
              <span className="text-xs text-indigo-700 font-mono font-bold">
                {subtaskProgress}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${subtaskProgress}%` }}
              />
            </div>
            <div className="space-y-1.5">
              {selectedTask.subtasks.map((st) => (
                <button
                  key={st.id}
                  onClick={() => toggleSubtask(selectedTask.id, st.id)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-left transition-colors font-medium"
                >
                  {st.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                  <span
                    className={cn(
                      'text-xs',
                      st.completed ? 'text-slate-400 line-through' : 'text-slate-800'
                    )}
                  >
                    {st.title}
                  </span>
                </button>
              ))}
              {selectedTask.subtasks.length === 0 && (
                <p className="text-xs text-slate-400 italic">No subtasks created.</p>
              )}
            </div>
          </div>

          {/* Time Tracking */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Time Logging</div>
                <div className="text-[11px] text-slate-500">
                  {selectedTask.timeLoggedHours}h logged of {selectedTask.estimatedHours}h estimated
                </div>
              </div>
            </div>
            <div className="text-xs font-mono text-indigo-700 font-bold px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100">
              {Math.round((selectedTask.timeLoggedHours / selectedTask.estimatedHours) * 100)}%
            </div>
          </div>

          {/* Comments Stream */}
          <div>
            <span className="text-xs font-bold text-slate-900 flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              Activity & Comments ({selectedTask.comments.length})
            </span>
            <div className="space-y-3 mb-4">
              {selectedTask.comments.map((cm) => (
                <div key={cm.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden">
                        <Image src={cm.userAvatar} alt="" fill className="object-cover" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">{cm.userName}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {new Date(cm.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 pl-7 font-medium">{cm.content}</p>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment or update..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
