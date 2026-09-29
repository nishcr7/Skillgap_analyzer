import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  TrendingUp,
  ShieldAlert,
  GraduationCap,
  Users,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export const ReportsPage: React.FC = () => {
  const { addToast, departmentReadiness, topGaps } = useApp();

  const [activeReport, setActiveReport] = useState<string>('capability');

  const handleExport = (reportName: string, format: 'PDF' | 'CSV') => {
    addToast({
      title: `Export Initialized`,
      description: `Generating ${reportName} in ${format} format. Download will start automatically.`,
      type: 'success',
    });
  };

  const reportsList = [
    {
      id: 'capability',
      title: 'Workforce Capability Report',
      desc: 'Executive summary of organization competencies, distribution, and maturity.',
      icon: Users,
    },
    {
      id: 'department',
      title: 'Department Skill Report',
      desc: 'Comparative benchmark of Engineering, Cloud, Data, AI/ML, DevOps, and Security.',
      icon: BarChart3,
    },
    {
      id: 'gaps',
      title: 'Critical Gap Report',
      desc: 'Identification of 17 vulnerability clusters posing delivery bottlenecks.',
      icon: ShieldAlert,
    },
    {
      id: 'roi',
      title: 'Learning ROI Report',
      desc: 'Cost vs benefit analysis of internal upskilling vs external talent recruitment.',
      icon: TrendingUp,
    },
    {
      id: 'progress',
      title: 'Employee Progress Report',
      desc: 'Quarterly milestone velocity across 326 active individual learning plans.',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Workforce Analytics & Executive Reports</h1>
          <p className="text-xs text-slate-500 mt-1">
            Export audit-ready talent intelligence reports, competency distributions, and compliance data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('Complete Workforce Audit', 'CSV')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('Executive Board Deck', 'PDF')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export Board PDF</span>
          </button>
        </div>
      </div>

      {/* Report Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {reportsList.map((rep) => {
          const Icon = rep.icon;
          const isSelected = activeReport === rep.id;
          return (
            <button
              key={rep.id}
              onClick={() => setActiveReport(rep.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
              <h3 className="text-xs font-bold leading-snug">{rep.title}</h3>
              <p className="text-[10px] opacity-70 mt-1 line-clamp-2">{rep.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Main Selected Report View */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
              Selected Audit View
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {reportsList.find((r) => r.id === activeReport)?.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Generated as of September 2026 for NexaTech Talent Leadership.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport(activeReport, 'CSV')}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              Raw Data (.csv)
            </button>
            <button
              onClick={() => handleExport(activeReport, 'PDF')}
              className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Visual report body depending on tab */}
        {activeReport === 'capability' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-xs text-slate-500 block">Organization Readiness</span>
                <strong className="text-2xl font-black text-slate-900 font-mono">76%</strong>
                <span className="text-[11px] text-emerald-600 block mt-1">+4% vs last quarter</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-xs text-slate-500 block">Critical Gaps</span>
                <strong className="text-2xl font-black text-rose-600 font-mono">17</strong>
                <span className="text-[11px] text-slate-500 block mt-1">12 in Cloud / DevOps</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-xs text-slate-500 block">Competency Breadth</span>
                <strong className="text-2xl font-black text-slate-900 font-mono">82 Skills</strong>
                <span className="text-[11px] text-slate-500 block mt-1">across 6 departments</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-xs text-slate-500 block">Upskilling Participation</span>
                <strong className="text-2xl font-black text-indigo-600 font-mono">84%</strong>
                <span className="text-[11px] text-slate-500 block mt-1">high learner engagement</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/70">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Executive Synthesis
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                NexaTech software engineering capability remains exceptional in core application development (Python,
                SQL, RESTful APIs, and React/TypeScript). However, infrastructure evolution toward modern container
                orchestration (Kubernetes, AWS architecture) and Generative AI foundation modeling represents a
                critical competency chasm. Target remediation programs currently cover 326 engineers with projected
                stabilization by Q4 2026.
              </p>
            </div>
          </div>
        )}

        {activeReport === 'department' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Department Performance Matrix
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Headcount</th>
                    <th className="py-2.5 px-3">Readiness</th>
                    <th className="py-2.5 px-3">Critical Gaps</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {departmentReadiness.map((d) => (
                    <tr key={d.department} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{d.department}</td>
                      <td className="py-2.5 px-3 font-mono">{d.headcount}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-600">{d.readiness}%</td>
                      <td className="py-2.5 px-3 font-mono text-rose-600">{d.criticalGaps}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            d.readiness >= 75
                              ? 'bg-emerald-50 text-emerald-700'
                              : d.readiness >= 60
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {d.readiness >= 75 ? 'Healthy' : d.readiness >= 60 ? 'Warning' : 'Critical Action'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeReport === 'gaps' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Prioritized Gap Remediation Plan
            </h3>
            <div className="space-y-2">
              {topGaps.map((gap, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{gap.skill}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                        {gap.severity}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Impacts {gap.employeesImpacted} engineers in {gap.department}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-600">
                    Deficit: -{gap.gapDelta} levels
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeReport === 'roi' && (
          <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-xl text-xs space-y-3">
            <h3 className="font-bold text-emerald-950">Learning Program Economic Value Added</h3>
            <p className="text-emerald-900/90 leading-relaxed">
              Every ₹1 invested in NexaTech targeted upskilling returns ₹3.82 in avoided headhunter fees and faster
              delivery cycles. The projected annual savings from internal promotion of 50 Cloud & Backend engineers
              stands at ₹1.2 Crores.
            </p>
          </div>
        )}

        {activeReport === 'progress' && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-3">
            <h3 className="font-bold text-slate-900">Individual Learning Pace Metrics</h3>
            <p className="text-slate-600 leading-relaxed">
              91% of engineers actively submit weekly assignments on schedule. The median module completion time is 4.8
              hours per week, with highest engagement observed on hands-on container labs and real-world system design
              challenges.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
