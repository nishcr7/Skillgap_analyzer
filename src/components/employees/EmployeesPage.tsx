import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmployeeProfile } from './EmployeeProfile';
import {
  Search,
  Filter,
  UserPlus,
  ArrowUpDown,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Department } from '../../types';

export const EmployeesPage: React.FC = () => {
  const {
    employees,
    selectedEmployeeId,
    setSelectedEmployeeId,
    setIsAddEmployeeOpen,
    setIsAssignTrainingOpen,
    advanceDemoFlow,
    demoStep,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // If an employee is selected, render their individual profile
  if (selectedEmployeeId) {
    return <EmployeeProfile />;
  }

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Workforce Competency Directory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse employee talent profiles, monitor live role readiness, and bridge priority skill gaps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddEmployeeOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, role, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-slate-50/50"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Cloud">Cloud</option>
            <option value="Data">Data</option>
            <option value="AI/ML">AI/ML</option>
            <option value="DevOps">DevOps</option>
            <option value="Security">Security</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="In Training">In Training</option>
            <option value="Active">Active</option>
            <option value="In Assessment">In Assessment</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-semibold">
                <th className="py-3 px-4 min-w-[200px]">Employee</th>
                <th className="py-3 px-3 min-w-[140px]">Role</th>
                <th className="py-3 px-3 min-w-[110px]">Department</th>
                <th className="py-3 px-3 min-w-[130px]">Readiness</th>
                <th className="py-3 px-3 min-w-[150px]">Critical Gaps</th>
                <th className="py-3 px-3 min-w-[150px]">Learning Progress</th>
                <th className="py-3 px-3 min-w-[100px]">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => {
                const isNishanth = emp.id === 'emp-1';
                return (
                  <tr
                    key={emp.id}
                    onClick={() => {
                      setSelectedEmployeeId(emp.id);
                      if (isNishanth && demoStep === 2) {
                        advanceDemoFlow();
                      }
                    }}
                    className={`hover:bg-slate-50/80 cursor-pointer transition-colors group ${
                      isNishanth ? 'bg-indigo-50/20 ring-1 ring-inset ring-indigo-200/50' : ''
                    }`}
                  >
                    {/* Employee */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${emp.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}
                        >
                          {emp.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5 truncate">
                            <span>{emp.name}</span>
                            {isNishanth && (
                              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
                                Demo Focus
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{emp.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-3 font-medium text-slate-800">{emp.role}</td>

                    {/* Department */}
                    <td className="py-3 px-3 text-slate-600">{emp.department}</td>

                    {/* Readiness */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 tabular-nums font-mono">
                          {emp.readiness}%
                        </span>
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              emp.readiness >= 80 ? 'bg-emerald-500' : 'bg-indigo-600'
                            }`}
                            style={{ width: `${emp.readiness}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Critical Gaps */}
                    <td className="py-3 px-3">
                      {emp.criticalGapsCount > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {emp.criticalGaps.slice(0, 2).map((gap, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200/80"
                            >
                              {gap}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-medium">None detected</span>
                      )}
                    </td>

                    {/* Learning Progress */}
                    <td className="py-3 px-3">
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-slate-600 truncate max-w-[120px]" title={emp.activeCourse}>
                            {emp.activeCourse}
                          </span>
                          <span className="font-mono text-slate-800 font-semibold">{emp.learningProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full rounded-full"
                            style={{ width: `${emp.learningProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          emp.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : emp.status === 'In Training'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-400 group-hover:text-indigo-600">
                        <span className="text-[11px] font-medium hidden sm:inline">Profile</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            Showing {filteredEmployees.length} of {employees.length} indexed employees
          </span>
          <span className="font-mono">Sync: 99.8% precision</span>
        </div>
      </div>
    </div>
  );
};
