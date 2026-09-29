import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  ShieldAlert,
  GraduationCap,
  ClipboardCheck,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { WORKFORCE_TREND_DATA } from '../../data/mockData';

export const OverviewDashboard: React.FC = () => {
  const {
    employees,
    departmentReadiness,
    topGaps,
    workforceReadiness,
    criticalGapsCount,
    activeLearningPlansCount,
    totalEmployeesCount,
    assessmentsCompletedPct,
    setSelectedEmployeeId,
    setActiveTab,
    advanceDemoFlow,
  } = useApp();

  const kpis = [
    {
      label: 'Total Employees',
      value: totalEmployeesCount.toLocaleString(),
      sub: '+48 hired this quarter',
      trend: '+2.6%',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Workforce Readiness',
      value: `${workforceReadiness}%`,
      sub: 'Benchmark target: 85%',
      trend: '+4.0%',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Critical Skill Gaps',
      value: criticalGapsCount.toString(),
      sub: 'Action required across 3 teams',
      trend: '-12%',
      trendGood: true,
      icon: ShieldAlert,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      label: 'Active Learning Plans',
      value: activeLearningPlansCount.toString(),
      sub: 'Across 6 technical tracks',
      trend: '+18%',
      icon: GraduationCap,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Assessments Completed',
      value: `${assessmentsCompletedPct}%`,
      sub: 'Q3 evaluation cycle',
      trend: '+9%',
      icon: ClipboardCheck,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
  ];

  // Heatmap skills
  const heatmapSkills = [
    'Python',
    'SQL',
    'REST APIs',
    'AWS',
    'Kubernetes',
    'System Design',
    'Generative AI',
    'Terraform',
    'Cybersecurity',
  ];

  const getHeatmapScore = (empName: string, skill: string) => {
    if (empName === 'Nishanth B') {
      if (skill === 'Python') return { score: 4.5, state: 'strong' };
      if (skill === 'SQL') return { score: 4.1, state: 'strong' };
      if (skill === 'REST APIs') return { score: 4.3, state: 'strong' };
      if (skill === 'AWS') return { score: 2.7, state: 'critical', req: 4.0 };
      if (skill === 'Kubernetes') return { score: 2.1, state: 'critical', req: 3.5 };
      if (skill === 'System Design') return { score: 2.8, state: 'moderate', req: 3.5 };
      if (skill === 'Generative AI') return { score: 2.0, state: 'critical', req: 3.0 };
      if (skill === 'Terraform') return { score: 2.9, state: 'moderate', req: 3.0 };
      return { score: 3.2, state: 'moderate' };
    }
    if (empName === 'Priya S') {
      if (skill === 'AWS') return { score: 4.6, state: 'strong' };
      if (skill === 'Terraform') return { score: 4.4, state: 'strong' };
      if (skill === 'Kubernetes') return { score: 2.8, state: 'critical', req: 4.0 };
      if (skill === 'Cybersecurity') return { score: 3.8, state: 'moderate' };
      return { score: 3.9, state: 'strong' };
    }
    if (empName === 'Arjun K') {
      if (skill === 'SQL') return { score: 4.8, state: 'strong' };
      if (skill === 'Python') return { score: 3.9, state: 'strong' };
      if (skill === 'AWS') return { score: 3.1, state: 'moderate' };
      if (skill === 'Kubernetes') return { score: 2.3, state: 'critical', req: 3.5 };
      return { score: 3.4, state: 'moderate' };
    }
    if (empName === 'Meera R') {
      if (skill === 'Python') return { score: 4.4, state: 'strong' };
      if (skill === 'Generative AI') return { score: 2.6, state: 'critical', req: 4.5 };
      if (skill === 'Kubernetes') return { score: 2.4, state: 'critical', req: 3.5 };
      return { score: 3.8, state: 'moderate' };
    }
    if (empName === 'Rahul V') {
      if (skill === 'Terraform') return { score: 4.1, state: 'strong' };
      if (skill === 'Kubernetes') return { score: 2.9, state: 'critical', req: 4.5 };
      if (skill === 'AWS') return { score: 3.7, state: 'moderate' };
      return { score: 4.0, state: 'strong' };
    }
    if (empName === 'David K') {
      if (skill === 'Cybersecurity') return { score: 4.6, state: 'strong' };
      if (skill === 'Kubernetes') return { score: 2.7, state: 'critical', req: 4.0 };
      return { score: 3.8, state: 'moderate' };
    }
    if (empName === 'Anya T') {
      if (skill === 'REST APIs') return { score: 4.4, state: 'strong' };
      if (skill === 'System Design') return { score: 3.8, state: 'moderate' };
      return { score: 4.5, state: 'strong' };
    }
    return { score: 3.5, state: 'moderate' };
  };

  const getHeatmapColor = (state: string) => {
    switch (state) {
      case 'strong':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/60 font-semibold';
      case 'moderate':
        return 'bg-amber-50 text-amber-800 border-amber-200/60 font-medium';
      case 'critical':
        return 'bg-rose-50 text-rose-800 border-rose-200/80 font-bold';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/60';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Workforce Intelligence Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time competency diagnostics, critical vulnerability mapping, and workforce readiness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('simulator')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Simulate Upskilling</span>
          </button>
          <button
            onClick={advanceDemoFlow}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            <span>Demo: Inspect Gaps</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-4 bg-white border border-slate-200/80 rounded-xl hover:border-slate-300 transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">{kpi.label}</span>
                <div className={`w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <Icon className={`w-3.5 h-3.5 ${kpi.color}`} />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
                  {kpi.value}
                </span>
                <span
                  className={`text-[11px] font-semibold ${
                    kpi.trendGood || kpi.trend.startsWith('+') ? 'text-emerald-600' : 'text-slate-500'
                  }`}
                >
                  {kpi.trend}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 truncate">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid: Readiness Trend + Top Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Workforce Readiness Trend Chart */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Workforce Readiness Trend</h2>
              <p className="text-[11px] text-slate-500">
                Quarterly trajectory based on competency assessments and learning completions.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                Readiness %
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WORKFORCE_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="readinessGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[50, 100]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Readiness']}
                />
                <Area
                  type="monotone"
                  dataKey="readiness"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#readinessGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Top Skill Gaps List */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Top Organizational Skill Gaps</h2>
              <p className="text-[11px] text-slate-500">Skills posing highest project delivery risk</p>
            </div>
            <button
              onClick={() => setActiveTab('skills')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              <span>Explore Taxonomy</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5 flex-1 justify-center flex flex-col">
            {topGaps.map((item, idx) => {
              const isCrit = item.severity === 'Critical';
              const isHigh = item.severity === 'High';
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (item.skill === 'Kubernetes' || item.skill === 'AWS Architecture') {
                      setSelectedEmployeeId('emp-1');
                      setActiveTab('employees');
                    } else {
                      setActiveTab('skills');
                    }
                  }}
                  className="p-2.5 bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/70 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.skill}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          isCrit
                            ? 'bg-rose-100 text-rose-700'
                            : isHigh
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {item.department} · {item.employeesImpacted} engineers impacted
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-rose-600 tabular-nums">
                      -{item.gapDelta.toFixed(1)} lvl
                    </span>
                    <span className="block text-[10px] text-slate-400">Target 4.0</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Department Readiness Bar Chart */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Department Readiness Breakdown</h2>
            <p className="text-[11px] text-slate-500">
              Cross-department comparison: Engineering (82%), Cloud (61%), AI/ML (42%), DevOps (55%).
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Target benchmark: <span className="font-semibold text-slate-700">75% readiness</span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentReadiness}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              barSize={38}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                unit="%"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: any, name: any, item: any) => [
                  `${val}% (Headcount: ${item.payload.headcount})`,
                  'Readiness',
                ]}
              />
              <Bar dataKey="readiness" radius={[6, 6, 0, 0]}>
                {departmentReadiness.map((entry, index) => {
                  const color =
                    entry.readiness >= 75
                      ? '#10b981'
                      : entry.readiness >= 60
                      ? '#f59e0b'
                      : '#f43f5e';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill-Gap Heatmap */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Workforce Skill-Gap Heatmap</h2>
            <p className="text-[11px] text-slate-500">
              Individual capability matrix against role requirements. Click any employee row to open their profile.
            </p>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
              <span className="text-slate-600 text-[11px]">Strong (≥4.0)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300" />
              <span className="text-slate-600 text-[11px]">Moderate (3.0-3.9)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-100 border border-rose-300" />
              <span className="text-slate-600 text-[11px]">Critical Gap (&lt;3.0)</span>
            </span>
          </div>
        </div>

        {/* Heatmap Table */}
        <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80">
                <th className="py-2.5 px-3 font-semibold text-slate-700 min-w-[170px] sticky left-0 bg-slate-50 z-10">
                  Employee
                </th>
                <th className="py-2.5 px-2 font-semibold text-slate-700 min-w-[130px]">Role</th>
                {heatmapSkills.map((sk) => (
                  <th key={sk} className="py-2.5 px-2 font-semibold text-slate-700 text-center min-w-[90px]">
                    {sk}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.slice(0, 7).map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => {
                    setSelectedEmployeeId(emp.id);
                    setActiveTab('employees');
                  }}
                  className={`hover:bg-slate-50/80 cursor-pointer transition-colors group ${
                    emp.id === 'emp-1' ? 'bg-indigo-50/20' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 sticky left-0 bg-white group-hover:bg-slate-50/80 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                        {emp.avatarInitials}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-900 block truncate group-hover:text-indigo-600">
                          {emp.name}
                        </span>
                        <span className="text-[10px] text-slate-400">{emp.department}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-slate-600 text-[11px] truncate">{emp.role}</td>
                  {heatmapSkills.map((sk) => {
                    const data = getHeatmapScore(emp.name, sk);
                    const colorClass = getHeatmapColor(data.state);
                    return (
                      <td key={sk} className="py-2 px-1 text-center">
                        <div
                          className={`py-1 px-1.5 rounded-lg border text-xs font-mono tabular-nums ${colorClass}`}
                          title={`${emp.name} · ${sk}: ${data.score}/5`}
                        >
                          {data.score.toFixed(1)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>Displaying 7 of 1,842 total employees in sample cluster</span>
          <button
            onClick={() => setActiveTab('employees')}
            className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
          >
            <span>View All Employees & Filters</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
