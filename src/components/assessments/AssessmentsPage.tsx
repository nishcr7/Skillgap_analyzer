import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ClipboardCheck,
  Users,
  Play,
  CheckCircle2,
  TrendingUp,
  Plus,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Assessment } from '../../types';

export const AssessmentsPage: React.FC = () => {
  const {
    assessments,
    setIsTakeAssessmentOpen,
    setAssessmentToTake,
    addToast,
  } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Cloud');

  const handleLaunchAssessment = (assessment: Assessment) => {
    setAssessmentToTake(assessment);
    setIsTakeAssessmentOpen(true);
  };

  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addToast({
      title: 'Assessment Created',
      description: `Created "${newTitle}" under ${newCategory}. Generated 5 adaptive questions.`,
      type: 'success',
    });
    setIsCreateModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Technical Assessments & Benchmarking</h1>
          <p className="text-xs text-slate-500 mt-1">
            Standardized technical evaluations, scenario simulations, and automated skill scoring.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Assessment</span>
        </button>
      </div>

      {/* Assessment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assessments.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 shrink-0">
                  {item.skillImpact}
                </span>
              </div>

              {/* Assessment Stats */}
              <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Participants</span>
                  <strong className="text-slate-900 font-mono text-sm tabular-nums">
                    {item.participants}
                  </strong>
                  <span className="text-slate-400 text-[10px] block">evaluated</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Completion</span>
                  <strong className="text-slate-900 font-mono text-sm tabular-nums">
                    {item.completionRate}%
                  </strong>
                  <span className="text-slate-400 text-[10px] block">cohort rate</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Avg Score</span>
                  <strong className="text-indigo-600 font-mono text-sm tabular-nums">
                    {item.averageScore}%
                  </strong>
                  <span className="text-slate-400 text-[10px] block">mean result</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {item.durationMinutes} min runtime
                </span>
                <span>·</span>
                <span>{item.questionsCount} scenario questions</span>
              </div>
            </div>

            {/* Launch button */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Next cycle: Automatic</span>
              <button
                onClick={() => handleLaunchAssessment(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Take Sample Test</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Assessment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-semibold text-slate-900">Create Adaptive Assessment</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateAssessment} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assessment Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Caching & Redis Benchmark"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Domain Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Cloud">Cloud Infrastructure</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Data">Data Architecture</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900">
                <span className="font-semibold block mb-0.5">AI Test Generation:</span>
                Synthesizes realistic code scenarios, architectural edge-cases, and evaluation rubrics.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Generate & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
