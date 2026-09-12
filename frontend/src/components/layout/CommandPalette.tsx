'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  CheckSquare,
  FolderKanban,
  User,
  Plus,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { cn, getPriorityBadge } from '@/lib/utils';

export default function CommandPalette() {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    tasks,
    projects,
    users,
    setSelectedTask,
    setIsCreateTaskOpen,
  } = useProject();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.code.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-start justify-center pt-24 p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search tasks (APEX-101), or find team members..."
            className="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-3 max-h-[420px] overflow-y-auto space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Quick Actions
            </div>
            <button
              onClick={() => {
                setIsCommandPaletteOpen(false);
                setIsCreateTaskOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-indigo-300 hover:bg-indigo-500/10 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4 text-indigo-400" />
                <span>Create New Task</span>
              </div>
              <span className="text-[10px] text-slate-500">Action</span>
            </button>
          </div>

          {/* Tasks Results */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Tasks ({filteredTasks.length})
              </div>
              <div className="space-y-1">
                {filteredTasks.map((t) => {
                  const badge = getPriorityBadge(t.priority);
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setIsCommandPaletteOpen(false);
                        setSelectedTask(t);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800/60 transition-colors group"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <CheckSquare className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                        <span className="font-mono text-[11px] text-indigo-400 font-medium">
                          {t.code}
                        </span>
                        <span className="truncate">{t.title}</span>
                      </div>
                      <span className={cn('text-[10px] px-2 py-0.5 rounded border', badge.bg)}>
                        {badge.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Projects Results */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Projects
              </div>
              <div className="space-y-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      router.push('/board');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderKanban className="w-4 h-4 text-cyan-400" />
                      <span>{p.name}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Team Members */}
          {filteredUsers.length > 0 && (
            <div>
              <div className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Team
              </div>
              <div className="space-y-1">
                {filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>{u.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{u.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>ApexFlow Smart Command Palette</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
