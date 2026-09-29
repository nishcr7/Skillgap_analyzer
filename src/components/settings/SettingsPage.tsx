import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Building,
  Sliders,
  Shield,
  Bell,
  Database,
  Check,
  RotateCcw,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { addToast } = useApp();

  const [orgName, setOrgName] = useState('NexaTech');
  const [minPassScore, setMinPassScore] = useState(75);
  const [readinessBenchmark, setReadinessBenchmark] = useState(85);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Settings Saved',
      description: 'Workforce governance thresholds and organizational parameters updated.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Organization Settings & Governance</h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure workforce readiness benchmarks, automated AI competency synthesis, and connected integrations.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Organization Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Organization Display Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Talent Domain
              </label>
              <input
                type="text"
                disabled
                value="Enterprise Cloud & Software Engineering"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Readiness Benchmarks */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Competency Thresholds & Scoring Rubrics</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Target Role Readiness Benchmark</span>
                <span className="font-mono font-bold text-indigo-600">{readinessBenchmark}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                value={readinessBenchmark}
                onChange={(e) => setReadinessBenchmark(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Employees below this threshold are flagged for proactive upskilling plans.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Assessment Passing Threshold</span>
                <span className="font-mono font-bold text-indigo-600">{minPassScore}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={minPassScore}
                onChange={(e) => setMinPassScore(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Benchmark exam cutoff required for automated skill level validation.
              </span>
            </div>
          </div>
        </div>

        {/* Intelligence Automation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Shield className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Intelligence Automation & Alerts</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  Automated AI Gap Synthesis
                </span>
                <span className="text-[11px] text-slate-500">
                  Continuously ingest commit activity, PR reviews, and assessment results into skill models.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAiAnalysisEnabled(!aiAnalysisEnabled)}
                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                  aiAnalysisEnabled ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  Real-time Slack / Email Notifications
                </span>
                <span className="text-[11px] text-slate-500">
                  Notify engineering leads when team competency drops below threshold.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSlackAlerts(!slackAlerts)}
                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                  slackAlerts ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
