'use client';

import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';

export default function VelocityChart() {
  const sprintData = [
    { sprint: 'Sprint 38', committed: 20, completed: 18 },
    { sprint: 'Sprint 39', committed: 25, completed: 24 },
    { sprint: 'Sprint 40', committed: 30, completed: 30 },
    { sprint: 'Sprint 41', committed: 32, completed: 31 },
    { sprint: 'Sprint 42', committed: 35, completed: 34 },
  ];

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-600" />
            Sprint Velocity & Output
          </h3>
          <p className="text-xs text-slate-500">Story points committed vs completed</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-indigo-600" />
            <span className="text-slate-700">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-300" />
            <span className="text-slate-500">Committed</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 px-2 border-b border-slate-100">
        {sprintData.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end gap-2 group">
            <div className="w-full max-w-[40px] flex items-end justify-center gap-1 h-full">
              {/* Committed Bar */}
              <div
                className="w-1/2 bg-slate-200 rounded-t-md transition-all group-hover:bg-slate-300"
                style={{ height: `${(d.committed / 40) * 100}%` }}
                title={`Committed: ${d.committed} pts`}
              />
              {/* Completed Bar */}
              <div
                className="w-1/2 bg-gradient-to-t from-indigo-700 to-indigo-500 rounded-t-md transition-all group-hover:from-indigo-600 group-hover:to-indigo-400 shadow-xs"
                style={{ height: `${(d.completed / 40) * 100}%` }}
                title={`Completed: ${d.completed} pts`}
              />
            </div>
            <span className="text-[10px] font-mono font-medium text-slate-500 group-hover:text-slate-800">
              {d.sprint}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div className="flex items-center gap-1.5 text-indigo-700 font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Average velocity: 27.4 pts/sprint</span>
        </div>
        <span>Target: 35 pts</span>
      </div>
    </div>
  );
}
