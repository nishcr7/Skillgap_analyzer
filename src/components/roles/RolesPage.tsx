import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Users,
  TrendingUp,
  Settings,
  Plus,
  ArrowRight,
  Layers,
  Award,
} from 'lucide-react';

export const RolesPage: React.FC = () => {
  const {
    roles,
    selectedRoleId,
    setSelectedRoleId,
    setIsEditRoleOpen,
    employees,
    setSelectedEmployeeId,
    setActiveTab,
  } = useApp();

  const currentRole = roles.find((r) => r.id === (selectedRoleId || 'role-backend')) || roles[0];

  // Employees in current role
  const employeesInRole = employees.filter((e) => e.role === currentRole.title);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Engineering Roles & Competency Standards</h1>
          <p className="text-xs text-slate-500 mt-1">
            Standardized competency expectations, target proficiency benchmarks, and role weightings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditRoleOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Edit Role Requirements</span>
          </button>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {roles.map((role) => {
          const isSelected = role.id === currentRole.id;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              className={`p-3.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <div className="text-[10px] uppercase font-semibold tracking-wider opacity-70 mb-1">
                {role.department}
              </div>
              <h3 className="text-xs font-bold truncate leading-snug">{role.title}</h3>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="opacity-80">{role.headcount} engineers</span>
                <span
                  className={`font-mono font-bold ${
                    isSelected ? 'text-indigo-300' : 'text-slate-900'
                  }`}
                >
                  {role.readinessAvg}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Competency Profile for Selected Role (e.g. Backend Engineer) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">{currentRole.title} Competency Profile</h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {currentRole.level}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">{currentRole.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Average Cohort Readiness</span>
              <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                {currentRole.readinessAvg}%
              </span>
            </div>
            <button
              onClick={() => setIsEditRoleOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors"
            >
              Adjust Weights & Levels
            </button>
          </div>
        </div>

        {/* Required Skills Grid */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Core Competency Requirements ({currentRole.skills.length} Evaluated Dimensions)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentRole.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50/70 border border-slate-200/70 rounded-xl hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{skill.skillName}</h4>
                    <span className="text-[11px] text-slate-500">{skill.category}</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-100 shadow-2xs">
                    Level {skill.requiredLevel}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Evaluation Weight</span>
                  <span className="font-mono font-bold text-slate-900">{skill.weight}%</span>
                </div>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-slate-900 h-full rounded-full" style={{ width: `${skill.weight * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Assigned to this Role */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Assigned Talent in {currentRole.title} ({employeesInRole.length} indexed)
            </h3>
            <button
              onClick={() => setActiveTab('employees')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Filter in Directory →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {employeesInRole.map((emp) => (
              <div
                key={emp.id}
                onClick={() => {
                  setSelectedEmployeeId(emp.id);
                  setActiveTab('employees');
                }}
                className="p-3 border border-slate-200/80 rounded-xl hover:border-indigo-300 cursor-pointer transition-all flex items-center justify-between gap-3 group bg-white"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {emp.avatarInitials}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 block">
                      {emp.name}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{emp.readiness}% readiness</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
