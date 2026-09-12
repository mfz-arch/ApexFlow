'use client';

import React, { useState } from 'react';
import { Sliders, Key, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('Core Workspace');
  const [apiKey, setApiKey] = useState('af_live_99a8b7c6d5e4f3a2b1c0d9e8');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6 pb-8">
      <div>
        <h2 className="text-base font-bold text-slate-900">Workspace & SaaS Settings</h2>
        <p className="text-xs text-slate-500">Manage security tokens, API keys, and workspace preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Workspace Info */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            General Configuration
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Workspace Name
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        {/* API Credentials */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-600" />
            API Keys & Integrations
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Live REST/GraphQL Secret Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-semibold text-indigo-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              Use this key to authorize external webhook triggers and microservice integrations.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-200" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Changes Saved' : 'Save Preferences'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
