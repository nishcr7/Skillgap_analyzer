import React from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Award,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  Settings,
  Layers,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<{ isOpen: boolean; onCloseMobile: () => void }> = ({
  isOpen,
  onCloseMobile,
}) => {
  const {
    activeTab,
    setActiveTab,
    setSelectedEmployeeId,
    criticalGapsCount,
    workforceReadiness,
    advanceDemoFlow,
    demoStep,
  } = useApp();

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users, badge: '1,842' },
    { id: 'teams', label: 'Teams', icon: Building2 },
    { id: 'roles', label: 'Roles', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'assessments', label: 'Assessments', icon: ClipboardCheck, badge: '89%' },
    { id: 'learning', label: 'Learning', icon: GraduationCap, badge: '326 active' },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'copilot', label: 'AI Copilot', icon: Sparkles, badge: 'AI' },
    { id: 'workforce', label: 'Workforce Forecast', icon: TrendingUp },
    { id: 'simulator', label: 'What-If Simulator', icon: SlidersHorizontal },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab !== 'employees') {
      setSelectedEmployeeId(null);
    }
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Workspace Brand / Lockup */}
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
              <Layers className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900 tracking-tight">SkillGap</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 tracking-wider">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">NexaTech Intelligence</p>
            </div>
          </div>
        </div>

        {/* Live Organization Health Widget */}
        <div className="p-3 mx-3 mt-3 bg-slate-50 rounded-xl border border-slate-200/70">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-600 font-medium">Workforce Readiness</span>
            <span className="font-bold text-slate-900 tabular-nums">{workforceReadiness}%</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${workforceReadiness}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
            <span>Critical Gaps</span>
            <span className="font-semibold text-rose-600 tabular-nums">{criticalGapsCount} active</span>
          </div>
        </div>

        {/* Main Navigation List */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Workforce Platform
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium tabular-nums ${
                      isActive ? 'bg-slate-800 text-indigo-300' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Interactive Guided Demo Trigger */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60">
          <button
            onClick={advanceDemoFlow}
            className="w-full group p-2.5 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/60 rounded-xl text-left transition-all"
          >
            <div className="flex items-center justify-between text-indigo-900 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                Interactive Demo
              </span>
              <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded text-indigo-600 border border-indigo-100">
                {demoStep}/7
              </span>
            </div>
            <p className="text-[11px] text-indigo-700/80 mt-1 line-clamp-1">
              {demoStep === 1 && '1. Spot AWS/K8s gap'}
              {demoStep === 2 && '2. Inspect Engineering'}
              {demoStep === 3 && '3. Nishanth B Profile'}
              {demoStep === 4 && '4. Generate AI Plan'}
              {demoStep === 5 && '5. Assign Training'}
              {demoStep === 6 && '6. Verify Impact (92%)'}
              {demoStep === 7 && '7. What-If Simulation'}
            </p>
            <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 mt-1.5 group-hover:translate-x-0.5 transition-transform">
              <span>Next Demo Action</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>NexaTech Enterprise v2.4</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected to Talent Graph" />
        </div>
      </aside>
    </>
  );
};
