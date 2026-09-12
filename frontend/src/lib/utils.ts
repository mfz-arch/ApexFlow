import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique Certificate ID format: AF-2026-XXXXX
 */
export function generateCertificateId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `AF-2026-${randomNum}`;
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getCategoryBadgeColor(category: string): string {
  switch (category.toLowerCase()) {
    case 'programming':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'languages':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'mathematics':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'databases':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'networking':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'ai & data science':
      return 'bg-teal-50 text-teal-700 border-teal-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
}
