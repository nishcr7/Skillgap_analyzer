import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Users, AlertTriangle, ArrowRight, ShieldCheck, Plus } from 'lucide-react';

export const TeamsPage: React.FC = () => {
  const { teams, setActiveTab, setSelectedEmployeeId, advanceDemoFlow, demoStep } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Engineering Teams & Squads</h1>
          <p className="text-xs text-slate-500 mt-1">
            Departmental squads, team readiness benchmarks, and vulnerable competency areas.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedEmployeeId('emp-1');
            setActiveTab('employees');
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
        >
          <span>Inspect Core Engineering Squad</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => {
          const isEngineering = team.department === 'Engineering';
          return (
            <div
              key={team.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isEngineering
                  ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-200/60'
                  : 'bg-white border-slate-200/80 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                      {team.department}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{team.name}</h3>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      team.readiness >= 75
                        ? 'bg-emerald-50 text-emerald-700'
                        : team.readiness >= 60
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {team.readiness}%
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 my-3">
                  <span>Lead: <strong className="text-slate-700">{team.lead}</strong></span>
                  <span>·</span>
                  <span>{team.headcount} engineers</span>
                  <span>·</span>
                  <span>{team.openPositions} open reqs</span>
                </div>

                {/* Readiness Bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full rounded-full ${
                      team.readiness >= 75
                        ? 'bg-emerald-500'
                        : team.readiness >= 60
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${team.readiness}%` }}
                  />
                </div>

                {/* Top Gaps */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-500" />
                    <span>Priority Competency Deficits:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {team.topGaps.map((gap, gi) => (
                      <span
                        key={gi}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/60"
                      >
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Quarterly Assessment: Verified</span>
                <button
                  onClick={() => {
                    if (isEngineering && demoStep === 1) {
                      advanceDemoFlow();
                    } else if (isEngineering) {
                      setSelectedEmployeeId('emp-1');
                      setActiveTab('employees');
                    } else {
                      setActiveTab('employees');
                    }
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>View Roster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
