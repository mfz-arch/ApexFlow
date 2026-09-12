'use client';

import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';

export default function VelocityChart() {
  const sprintData = [
    { sprint: 'Sprint 38', committed: 45, completed: 42 },
    { sprint: 'Sprint 39', committed: 50, completed: 48 },
    { sprint: 'Sprint 40', committed: 52, completed: 51 },
    { sprint: 'Sprint 41', committed: 55, completed: 54 },
    { sprint: 'Sprint 42', committed: 60, completed: 58 },
  ];

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-400" />
            Sprint Velocity & Output
          </h3>
          <p className="text-xs text-slate-400">Story points committed vs completed</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-indigo-500" />
            <span className="text-slate-300">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-700" />
            <span className="text-slate-400">Committed</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 px-2 border-b border-slate-800/80">
        {sprintData.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end gap-2 group">
            <div className="w-full max-w-[40px] flex items-end justify-center gap-1 h-full">
              {/* Committed Bar */}
              <div
                className="w-1/2 bg-slate-800 rounded-t-md transition-all group-hover:bg-slate-700"
                style={{ height: `${(d.committed / 65) * 100}%` }}
                title={`Committed: ${d.committed} pts`}
              />
              {/* Completed Bar */}
              <div
                className="w-1/2 bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-md transition-all group-hover:from-indigo-500 group-hover:to-cyan-300 shadow-lg shadow-indigo-500/20"
                style={{ height: `${(d.completed / 65) * 100}%` }}
                title={`Completed: ${d.completed} pts`}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-200">
              {d.sprint}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Average velocity: 50.6 pts/sprint</span>
        </div>
        <span>Target: 55 pts</span>
      </div>
    </div>
  );
}
