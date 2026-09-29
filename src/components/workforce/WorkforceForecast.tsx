import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  BrainCircuit,
  Cloud,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const WorkforceForecast: React.FC = () => {
  const { setActiveTab } = useApp();

  const forecastData = [
    { skill: 'Generative AI & LLMs', currentCoverage: 31, futureDemand: 68, gap: 37, engineersNeeded: 214 },
    { skill: 'Kubernetes Platform', currentCoverage: 48, futureDemand: 82, gap: 34, engineersNeeded: 156 },
    { skill: 'Cloud Architecture (AWS)', currentCoverage: 58, futureDemand: 86, gap: 28, engineersNeeded: 128 },
    { skill: 'Cloud Security (CSPM)', currentCoverage: 42, futureDemand: 76, gap: 34, engineersNeeded: 98 },
    { skill: 'Event Streaming (Kafka/Flink)', currentCoverage: 52, futureDemand: 78, gap: 26, engineersNeeded: 84 },
    { skill: 'System Design & Scalability', currentCoverage: 64, futureDemand: 88, gap: 24, engineersNeeded: 72 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Workforce Intelligence & 2027 Strategic Forecast</h1>
          <p className="text-xs text-slate-500 mt-1">
            Predictive modeling comparing current talent capability with 12-month engineering project roadmap demand.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('simulator')}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Launch What-If Simulator</span>
        </button>
      </div>

      {/* Spotlight Card: Generative AI Forecast */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-indigo-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
              <BrainCircuit className="w-4 h-4" />
              <span>Highest Strategic Exposure</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Generative AI & Foundation Model Engineering
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              With 8 new internal AI platform initiatives scheduled for rollout in Q4 2026, the demand for production
              fine-tuning, token-efficient inference (vLLM), and RAG architecture exceeds current bench capability.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-xs">
            <div>
              <span className="text-[11px] text-slate-400 block">Current Coverage</span>
              <strong className="text-2xl font-black text-white font-mono tabular-nums">31%</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">verified skills</span>
            </div>

            <div>
              <span className="text-[11px] text-indigo-300 block">Expected 2027</span>
              <strong className="text-2xl font-black text-indigo-300 font-mono tabular-nums">68%</strong>
              <span className="text-[10px] text-indigo-200/80 block mt-0.5">target roadmap</span>
            </div>

            <div>
              <span className="text-[11px] text-rose-400 block">Capability Gap</span>
              <strong className="text-2xl font-black text-rose-400 font-mono tabular-nums">37%</strong>
              <span className="text-[10px] text-rose-300/80 block mt-0.5">net deficit</span>
            </div>

            <div>
              <span className="text-[11px] text-amber-300 block">Requiring Dev</span>
              <strong className="text-2xl font-black text-amber-300 font-mono tabular-nums">214</strong>
              <span className="text-[10px] text-amber-200/80 block mt-0.5">engineers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart: Current Capability vs Future Demand */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Current Capability vs Future Demand by Domain</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Percentage of engineering workforce proficient today vs projected 12-month requirements.
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecastData} margin={{ top: 15, right: 15, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="skill"
                tick={{ fontSize: 11, fill: '#64748b' }}
                interval={0}
                angle={-15}
                textAnchor="end"
                axisLine={false}
                tickLine={false}
              />
              <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: any, name: any) => [
                  `${val}%`,
                  name === 'currentCoverage' ? 'Current Capability' : 'Projected 2027 Demand',
                ]}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
              />
              <Bar name="Current Capability" dataKey="currentCoverage" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar name="Projected 2027 Demand" dataKey="futureDemand" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strategic Initiatives Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">Recommended Strategic Interventions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">Strategy 1</span>
            <h3 className="text-xs font-bold text-slate-900">Accelerated LLM Guild Cohort</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Transition 60 Python backend engineers to foundation model serving through an 8-week intensive bootcamp.
            </p>
            <div className="text-[11px] font-semibold text-emerald-600 pt-1">
              Projected Coverage Impact: +14%
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">Strategy 2</span>
            <h3 className="text-xs font-bold text-slate-900">Kubernetes Production Enablement</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Target 50 Core Platform engineers for mandatory CKA certification to eliminate container rollout stalls.
            </p>
            <div className="text-[11px] font-semibold text-emerald-600 pt-1">
              Projected Coverage Impact: +18%
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">Strategy 3</span>
            <h3 className="text-xs font-bold text-slate-900">Zero-Trust Cloud Governance</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Automate CSPM and policy-as-code learning tracks to preempt compliance audit findings in Q1 2027.
            </p>
            <div className="text-[11px] font-semibold text-emerald-600 pt-1">
              Projected Coverage Impact: +22%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
