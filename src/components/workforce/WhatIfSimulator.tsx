import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  IndianRupee,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Users,
} from 'lucide-react';

export const WhatIfSimulator: React.FC = () => {
  const {
    simulateWorkforceInitiative,
    advanceDemoFlow,
    demoStep,
  } = useApp();

  const [engineerCount, setEngineerCount] = useState<number>(50);
  const [selectedSkill, setSelectedSkill] = useState<string>('Kubernetes');
  const [durationWeeks, setDurationWeeks] = useState<number>(6);
  const [isCommitted, setIsCommitted] = useState<boolean>(false);

  // Dynamic formula
  const currentReadiness = 64;
  const readinessGain = Math.round((engineerCount / 50) * 9 * (durationWeeks / 6));
  const projectedReadiness = Math.min(94, currentReadiness + readinessGain);

  const criticalGapsBefore = 8;
  const gapsResolved = Math.min(6, Math.round((engineerCount / 50) * 3));
  const criticalGapsAfter = Math.max(1, criticalGapsBefore - gapsResolved);

  // Cost calculation in ₹ Lakhs (e.g. ₹4.8L for 50 engineers)
  const estimatedCostLakhs = Number(((engineerCount * 9600) / 100000).toFixed(1));
  // Recruitment cost avoided
  const recruitmentAvoidedLakhs = Number(((engineerCount * 38000) / 100000).toFixed(1));
  const netRoiMultiplier = Number((recruitmentAvoidedLakhs / estimatedCostLakhs).toFixed(1));

  const handleApplySimulation = () => {
    simulateWorkforceInitiative(engineerCount, selectedSkill);
    setIsCommitted(true);
    if (demoStep === 7) {
      advanceDemoFlow();
    }
  };

  const handleReset = () => {
    setEngineerCount(50);
    setSelectedSkill('Kubernetes');
    setDurationWeeks(6);
    setIsCommitted(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">What-If Workforce Upskilling Simulator</h1>
          <p className="text-xs text-slate-500 mt-1">
            Model the systemic organizational impact of training cohorts on readiness, gap closure, and budget ROI.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* Main Interactive Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Scenario Configuration Parameters</h2>
            <p className="text-[11px] text-slate-500">
              Adjust cohort volume, target competency, and duration to model projected workforce transformations.
            </p>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target Skill Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Target Competency</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:border-indigo-600 font-medium"
            >
              <option value="Kubernetes">Kubernetes (Critical Gap)</option>
              <option value="AWS Architecture">AWS Architecture (High Gap)</option>
              <option value="Generative AI">Generative AI & LLMs (Critical Gap)</option>
              <option value="System Design">System Design & Kafka (Medium Gap)</option>
              <option value="Cybersecurity">Cybersecurity & Zero-Trust</option>
            </select>
            <span className="text-[11px] text-slate-500 mt-1 block">
              124 platform engineers currently deficient in this domain.
            </span>
          </div>

          {/* Engineer Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label className="font-semibold text-slate-700">Cohort Size (Engineers)</label>
              <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {engineerCount} engineers
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={engineerCount}
              onChange={(e) => setEngineerCount(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10 engineers</span>
              <span>75</span>
              <span>150 engineers</span>
            </div>
          </div>

          {/* Duration Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label className="font-semibold text-slate-700">Sprint Duration</label>
              <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                {durationWeeks} weeks
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              step="1"
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>2 weeks (Crash)</span>
              <span>6 weeks</span>
              <span>12 weeks (Deep)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Simulation Result Card */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Simulation Projection: "Train {engineerCount} engineers in {selectedSkill}"
              </h3>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              High Confidence (94%)
            </span>
          </div>

          {/* Metric Quad Comparison */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Readiness */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-500 block mb-1">Role Readiness</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-400 line-through tabular-nums">
                  {currentReadiness}%
                </span>
                <span className="text-2xl font-black text-indigo-600 tabular-nums">
                  {projectedReadiness}%
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 block mt-1">
                +{readinessGain}% overall boost
              </span>
            </div>

            {/* Critical Gaps */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-500 block mb-1">Critical Skill Gaps</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-rose-400 line-through tabular-nums">
                  {criticalGapsBefore}
                </span>
                <span className="text-2xl font-black text-emerald-600 tabular-nums">
                  {criticalGapsAfter}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block mt-1">
                {gapsResolved} team deficits eliminated
              </span>
            </div>

            {/* Training Cost */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-500 block mb-1">Estimated Training Cost</span>
              <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                ₹{estimatedCostLakhs}L
              </div>
              <span className="text-[11px] text-slate-500 block mt-1">
                ₹{Math.round((estimatedCostLakhs * 100000) / engineerCount).toLocaleString()} per engineer
              </span>
            </div>

            {/* Net ROI */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-500 block mb-1">Projected ROI Multiple</span>
              <div className="text-2xl font-black text-emerald-600 font-mono tabular-nums">
                {netRoiMultiplier}x
              </div>
              <span className="text-[11px] text-slate-500 block mt-1">
                ₹{recruitmentAvoidedLakhs}L hiring cost avoided
              </span>
            </div>
          </div>

          {/* Visual progress bar comparison */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Workforce Competency Projection Bar</span>
              <span className="text-indigo-600 font-mono">
                {currentReadiness}% → {projectedReadiness}% Target
              </span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
              <div
                className="bg-slate-400 h-full absolute left-0 top-0 transition-all duration-300"
                style={{ width: `${currentReadiness}%` }}
              />
              <div
                className="bg-indigo-600 h-full absolute left-0 top-0 opacity-80 transition-all duration-300"
                style={{ width: `${projectedReadiness}%` }}
              />
            </div>
          </div>

          {/* Action to commit */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-slate-500">
              {isCommitted ? (
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Initiative successfully locked into talent development pipeline!
                </span>
              ) : (
                <span>Locking this initiative will update organizational forecast models and enroll cohort.</span>
              )}
            </div>

            <button
              onClick={handleApplySimulation}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all"
            >
              <span>Commit Initiative & Update Workforce Model</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
