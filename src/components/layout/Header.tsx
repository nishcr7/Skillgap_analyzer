import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  ChevronDown,
  Building,
  Menu,
  Check,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  User,
  LogOut,
  Sliders,
} from 'lucide-react';

export const Header: React.FC<{ onToggleMobileNav: () => void }> = ({ onToggleMobileNav }) => {
  const {
    setIsSearchModalOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    setActiveTab,
    advanceDemoFlow,
    demoStep,
  } = useApp();

  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState('NexaTech Global');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const orgs = ['NexaTech Global', 'NexaTech Engineering Labs', 'NexaTech Cloud EMEA'];

  const notifications = [
    {
      id: 1,
      title: 'Critical Competency Gap Detected',
      time: '12m ago',
      desc: 'Kubernetes readiness dropped below 50% for 12 Core Platform engineers.',
      unread: true,
      type: 'alert',
    },
    {
      id: 2,
      title: 'Assessment Completed',
      time: '1h ago',
      desc: 'Nishanth B completed AWS & Microservices Benchmark with a 68% score.',
      unread: true,
      type: 'assessment',
    },
    {
      id: 3,
      title: 'Learning Milestone Reached',
      time: '3h ago',
      desc: 'Priya S completed Week 2 of CKA Production Masterclass.',
      unread: false,
      type: 'learning',
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left zone: Mobile toggle + Breadcrumb / Org Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileNav}
          className="md:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Organization Selector */}
        <div className="relative">
          <button
            onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
          >
            <Building className="w-3.5 h-3.5 text-indigo-600" />
            <span className="truncate max-w-[130px] sm:max-w-none">{selectedOrg}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isOrgDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Organization
              </div>
              {orgs.map((org) => (
                <button
                  key={org}
                  onClick={() => {
                    setSelectedOrg(org);
                    setIsOrgDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg text-left"
                >
                  <span className="font-medium">{org}</span>
                  {selectedOrg === org && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Tour Indicator */}
        <button
          onClick={advanceDemoFlow}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-200/70 hover:bg-indigo-100/80 rounded-md text-[11px] font-medium text-indigo-700 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          <span>Demo Tour: Step {demoStep}/7</span>
        </button>
      </div>

      {/* Middle zone: Instant Search Input */}
      <div className="flex-1 max-w-md mx-2 hidden sm:block">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-slate-50 border border-slate-200/80 rounded-lg hover:border-slate-300 hover:bg-white transition-all shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search employees, skills, roles, assessments...</span>
          </div>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-100 rounded border border-slate-200">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right zone: Actions + Notifications + Profile */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="sm:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* AI Copilot Quick Jump Button */}
        <button
          onClick={() => setActiveTab('copilot')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>SkillGap AI</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-900">Workforce Notifications</span>
                <span className="text-[10px] font-medium text-indigo-600 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg text-xs transition-colors ${
                      n.unread ? 'bg-indigo-50/50 border border-indigo-100/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {n.type === 'alert' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-semibold text-slate-900 truncate">{n.title}</span>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-semibold text-xs flex items-center justify-center ring-2 ring-indigo-100">
              SC
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-900 leading-none">Sarah Chen</div>
              <div className="text-[10px] text-slate-500 mt-0.5 leading-none">Head of People</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2.5 py-2 border-b border-slate-100">
                <div className="text-xs font-semibold text-slate-900">Sarah Chen</div>
                <div className="text-[11px] text-slate-500 truncate">sarah.chen@nexatech.internal</div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg text-left"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Org Preferences</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('overview');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg text-left"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Talent Lead View</span>
                </button>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
