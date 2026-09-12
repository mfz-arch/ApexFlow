import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TaskPriority, TaskStatus } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPriorityBadge(priority: TaskPriority) {
  switch (priority) {
    case 'urgent':
      return {
        label: 'Urgent',
        bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        dot: 'bg-rose-500',
      };
    case 'high':
      return {
        label: 'High',
        bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        dot: 'bg-amber-500',
      };
    case 'medium':
      return {
        label: 'Medium',
        bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        dot: 'bg-blue-500',
      };
    case 'low':
    default:
      return {
        label: 'Low',
        bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        dot: 'bg-slate-400',
      };
  }
}

export function getStatusDetails(status: TaskStatus) {
  switch (status) {
    case 'backlog':
      return { label: 'Backlog', color: 'text-slate-400', bg: 'bg-slate-500/10' };
    case 'todo':
      return { label: 'To Do', color: 'text-indigo-400', bg: 'bg-indigo-500/10' };
    case 'in_progress':
      return { label: 'In Progress', color: 'text-amber-400', bg: 'bg-amber-500/10' };
    case 'in_review':
      return { label: 'In Review', color: 'text-purple-400', bg: 'bg-purple-500/10' };
    case 'done':
      return { label: 'Done', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
  }
}

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
