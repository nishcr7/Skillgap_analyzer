import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, User, Award, Briefcase, ClipboardCheck, ArrowRight, X } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    employees,
    roles,
    skillsTaxonomy,
    assessments,
    setSelectedEmployeeId,
    setSelectedRoleId,
    setSelectedSkillId,
    setAssessmentToTake,
    setIsTakeAssessmentOpen,
    setActiveTab,
  } = useApp();

  const [query, setQuery] = useState('');

  // Global keydown for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.role.toLowerCase().includes(query.toLowerCase()) ||
      e.department.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSkills = skillsTaxonomy.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRoles = roles.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.department.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAssessments = assessments.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employees, skills, roles, assessments..."
            autoFocus
            className="w-full px-3 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="ml-2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick jump suggestions if query empty */}
          {!query && (
            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
                Quick Shortcuts
              </div>
              <button
                onClick={() => {
                  setSelectedEmployeeId('emp-1');
                  setActiveTab('employees');
                  setIsSearchModalOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-xs">
                    NB
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Nishanth B</div>
                    <div className="text-[11px] text-slate-500">Backend Engineer · Engineering · Demo Hero</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
              <button
                onClick={() => {
                  setSelectedSkillId('tax-k8s');
                  setActiveTab('skills');
                  setIsSearchModalOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Kubernetes (Critical Gap)</div>
                    <div className="text-[11px] text-slate-500">124 employees impacted · Cloud Infrastructure</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          )}

          {/* Filtered Employees */}
          {filteredEmployees.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Employees ({filteredEmployees.length})
              </div>
              <div className="space-y-1">
                {filteredEmployees.slice(0, 4).map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => {
                      setSelectedEmployeeId(emp.id);
                      setActiveTab('employees');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-semibold">
                        {emp.avatarInitials}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{emp.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {emp.role} · {emp.department} · {emp.readiness}% readiness
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">View Profile →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Skills */}
          {filteredSkills.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Skills Intelligence ({filteredSkills.length})
              </div>
              <div className="space-y-1">
                {filteredSkills.slice(0, 3).map((sk) => (
                  <button
                    key={sk.id}
                    onClick={() => {
                      setSelectedSkillId(sk.id);
                      setActiveTab('skills');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{sk.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {sk.category} · Avg {sk.averageProficiency}/5 · {sk.criticalGapsCount} gaps
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">Explore →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Roles */}
          {filteredRoles.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Roles ({filteredRoles.length})
              </div>
              <div className="space-y-1">
                {filteredRoles.slice(0, 3).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedRoleId(r.id);
                      setActiveTab('roles');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{r.title}</div>
                        <div className="text-[11px] text-slate-500">
                          {r.department} · {r.headcount} employees
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">Competencies →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Assessments */}
          {filteredAssessments.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Assessments ({filteredAssessments.length})
              </div>
              <div className="space-y-1">
                {filteredAssessments.slice(0, 2).map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setAssessmentToTake(a);
                      setIsTakeAssessmentOpen(true);
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <ClipboardCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{a.title}</div>
                        <div className="text-[11px] text-slate-500">
                          {a.questionsCount} questions · {a.durationMinutes} min · Launch test
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">Take Test →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query &&
            filteredEmployees.length === 0 &&
            filteredSkills.length === 0 &&
            filteredRoles.length === 0 &&
            filteredAssessments.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-xs">
                No matching results found for "{query}".
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search index updated live</span>
          <div className="flex items-center gap-2">
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
