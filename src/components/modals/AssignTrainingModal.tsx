import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, GraduationCap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const AssignTrainingModal: React.FC = () => {
  const {
    isAssignTrainingOpen,
    setIsAssignTrainingOpen,
    employees,
    selectedEmployeeId,
    learningPrograms,
    assignTrainingToEmployee,
  } = useApp();

  const [selectedEmpId, setSelectedEmpId] = useState(selectedEmployeeId || 'emp-1');
  const [selectedProgramId, setSelectedProgramId] = useState('prog-aws');
  const [isAiCurated, setIsAiCurated] = useState(true);

  if (!isAssignTrainingOpen) return null;

  const currentEmp = employees.find((e) => e.id === selectedEmpId) || employees[0];
  const currentProg = learningPrograms.find((p) => p.id === selectedProgramId) || learningPrograms[0];

  const handleAssign = () => {
    assignTrainingToEmployee(currentEmp.id, currentProg.targetSkill, currentProg.title);
    setIsAssignTrainingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Assign Training Initiative</h3>
              <p className="text-[11px] text-slate-500">Bridge high-priority competency gaps with structured curriculum</p>
            </div>
          </div>
          <button
            onClick={() => setIsAssignTrainingOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Target Employee */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Employee</label>
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-white"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} — {emp.role} ({emp.department}) · {emp.readiness}% readiness
                </option>
              ))}
            </select>
          </div>

          {/* Current Skill Gap Insight */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs">
            <div className="flex items-center justify-between font-semibold text-amber-900 mb-1">
              <span>Target Gap Analysis for {currentEmp.name}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                {currentEmp.criticalGapsCount} Critical Gaps
              </span>
            </div>
            <p className="text-amber-800/90 text-[11px] leading-relaxed">
              Prioritized skills requiring remediation: {currentEmp.criticalGaps.join(', ') || 'AWS Architecture & Kubernetes'}.
              Target proficiency is 4.0/5 to meet {currentEmp.role} benchmarks.
            </p>
          </div>

          {/* Select Learning Program */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Learning Program</label>
            <div className="space-y-2">
              {learningPrograms.map((prog) => {
                const isSelected = prog.id === selectedProgramId;
                return (
                  <div
                    key={prog.id}
                    onClick={() => setSelectedProgramId(prog.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <span>{prog.title}</span>
                          {prog.id === 'prog-aws' && (
                            <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-medium">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                          <span>{prog.provider}</span>
                          <span>·</span>
                          <span>{prog.duration}</span>
                          <span>·</span>
                          <span className="font-semibold text-emerald-600">{prog.expectedImprovement}</span>
                        </div>
                      </div>
                      <div className="shrink-0 mt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI personalization toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <div>
                <div className="text-xs font-semibold text-slate-900">AI Adaptive Pacing</div>
                <div className="text-[11px] text-slate-500">Auto-adjust modules based on weekly quiz scores</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAiCurated(!isAiCurated)}
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                isAiCurated ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          {/* Projected Impact Preview */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-900 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Projected Impact on Completion:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] mt-1.5">
              <div>
                <span className="text-emerald-700">Role Readiness:</span>{' '}
                <strong className="text-emerald-950 tabular-nums">78% → 92% (+14%)</strong>
              </div>
              <div>
                <span className="text-emerald-700">Remaining Gaps:</span>{' '}
                <strong className="text-emerald-950 tabular-nums">2 → 0 critical</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsAssignTrainingOpen(false)}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAssign}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <span>Assign & Enroll {currentEmp.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
