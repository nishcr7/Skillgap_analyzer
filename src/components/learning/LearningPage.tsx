import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Star,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const LearningPage: React.FC = () => {
  const { learningPrograms, employees, setIsAssignTrainingOpen, activeLearningPlansCount } = useApp();

  const [activeSection, setActiveSection] = useState<'recommended' | 'active' | 'completed' | 'impact'>(
    'recommended'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Learning & Development Programs</h1>
          <p className="text-xs text-slate-500 mt-1">
            Curated upskilling pathways, enterprise cohorts, and real-time competency ROI tracking.
          </p>
        </div>

        <button
          onClick={() => setIsAssignTrainingOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Assign Training Cohort</span>
        </button>
      </div>

      {/* Tabs / Segmented Controls */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl max-w-fit">
        <button
          onClick={() => setActiveSection('recommended')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeSection === 'recommended'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Recommended Programs
        </button>
        <button
          onClick={() => setActiveSection('active')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeSection === 'active'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Plans ({activeLearningPlansCount})
        </button>
        <button
          onClick={() => setActiveSection('completed')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeSection === 'completed'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Completed Tracks (148)
        </button>
        <button
          onClick={() => setActiveSection('impact')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeSection === 'impact'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Learning Impact & ROI
        </button>
      </div>

      {/* Section 1: Recommended Programs */}
      {activeSection === 'recommended' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningPrograms.map((prog) => {
            const isK8s = prog.id === 'prog-k8s';
            return (
              <div
                key={prog.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isK8s
                    ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-200/60'
                    : 'bg-white border-slate-200/80 shadow-2xs hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          {prog.level} Track
                        </span>
                        {isK8s && (
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-indigo-100 text-indigo-700">
                            Highest Org Impact
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{prog.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{prog.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-1">Provided by {prog.provider}</p>

                  <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Recommended</span>
                      <strong className="text-slate-900 font-mono text-sm tabular-nums">
                        {prog.recommendedForCount}
                      </strong>
                      <span className="text-slate-400 text-[10px] block">engineers</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">Duration</span>
                      <strong className="text-slate-900 font-mono text-sm">{prog.duration}</strong>
                      <span className="text-slate-400 text-[10px] block">{prog.modulesCount} modules</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">Expected Gain</span>
                      <strong className="text-emerald-600 font-mono text-sm">{prog.expectedImprovement}</strong>
                      <span className="text-slate-400 text-[10px] block">proficiency</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-800">Target Skill:</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">
                      {prog.targetSkill}
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    Enrolled: {prog.enrolledEmployees.slice(0, 2).join(', ')} +{prog.enrolledEmployees.length}
                  </div>
                  <button
                    onClick={() => setIsAssignTrainingOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors"
                  >
                    <span>Assign Training</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Section 2: Active Plans */}
      {activeSection === 'active' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Active Employee Sprints ({employees.length})</h2>
            <span className="text-xs text-slate-500">Live syllabus tracking</span>
          </div>

          <div className="space-y-3">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className="p-4 bg-slate-50/70 border border-slate-200/70 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {emp.avatarInitials}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{emp.name}</span>
                    <span className="text-[11px] text-slate-500">
                      {emp.role} · {emp.activeCourse}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 min-w-[240px]">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-mono font-bold text-indigo-600">{emp.learningProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{ width: `${emp.learningProgress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 shrink-0">
                    On Schedule
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Completed Programs */}
      {activeSection === 'completed' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Completed Upskilling Cohorts</h2>
          <div className="space-y-3">
            {[
              {
                title: 'Python Core & Asyncio Microservices',
                graduates: 48,
                date: 'Completed Jan 2026',
                avgImprovement: '+0.9 levels',
              },
              {
                title: 'Data Lakehouse Modeling with dbt',
                graduates: 32,
                date: 'Completed Dec 2025',
                avgImprovement: '+1.1 levels',
              },
              {
                title: 'AWS Certified Cloud Practitioner Cohort',
                graduates: 68,
                date: 'Completed Nov 2025',
                avgImprovement: '+1.4 levels',
              },
            ].map((cohort, idx) => (
              <div
                key={idx}
                className="p-4 border border-slate-200 rounded-xl flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{cohort.title}</h4>
                  <span className="text-[11px] text-slate-500">
                    {cohort.graduates} engineers graduated · {cohort.date}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200">
                  {cohort.avgImprovement}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Learning Impact & ROI */}
      {activeSection === 'impact' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Workforce Upskilling Return on Investment (ROI)</h2>
            <p className="text-xs text-slate-500 mt-1">
              Quantifiable velocity increase, external recruitment cost avoidance, and incident reduction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
              <span className="text-xs text-slate-500 block mb-1">Recruitment Cost Avoided</span>
              <strong className="text-2xl font-black text-emerald-600 font-mono tabular-nums">
                ₹34.5 Lakhs
              </strong>
              <p className="text-[11px] text-slate-500 mt-1">
                By upskilling internal engineers to Senior roles vs agency hiring.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
              <span className="text-xs text-slate-500 block mb-1">Time to Productivity</span>
              <strong className="text-2xl font-black text-indigo-600 font-mono tabular-nums">
                3.2 Weeks
              </strong>
              <p className="text-[11px] text-slate-500 mt-1">
                64% faster than onboarding external engineering hires.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
              <span className="text-xs text-slate-500 block mb-1">Production Defect Reduction</span>
              <strong className="text-2xl font-black text-violet-600 font-mono tabular-nums">
                -38% Sev-1s
              </strong>
              <p className="text-[11px] text-slate-500 mt-1">
                Measured post-completion of Cloud Architecture and K8s tracks.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
