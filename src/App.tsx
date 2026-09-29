import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DemoFlowBanner } from './components/common/DemoFlowBanner';
import { ToastContainer } from './components/common/Toast';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { EmployeesPage } from './components/employees/EmployeesPage';
import { TeamsPage } from './components/teams/TeamsPage';
import { RolesPage } from './components/roles/RolesPage';
import { SkillsIntelligence } from './components/skills/SkillsIntelligence';
import { AssessmentsPage } from './components/assessments/AssessmentsPage';
import { LearningPage } from './components/learning/LearningPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { SkillGapAI } from './components/copilot/SkillGapAI';
import { WorkforceForecast } from './components/workforce/WorkforceForecast';
import { WhatIfSimulator } from './components/workforce/WhatIfSimulator';
import { SettingsPage } from './components/settings/SettingsPage';
import { SearchModal } from './components/modals/SearchModal';
import { AddEmployeeModal } from './components/modals/AddEmployeeModal';
import { AssignTrainingModal } from './components/modals/AssignTrainingModal';
import { EditRoleModal } from './components/modals/EditRoleModal';
import { TakeAssessmentModal } from './components/assessments/TakeAssessmentModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />

      {/* Main Viewport Container */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <Header onToggleMobileNav={() => setMobileNavOpen((prev) => !prev)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Guided Interactive Demo Banner */}
          <DemoFlowBanner />

          {/* Active View Router */}
          {activeTab === 'overview' && <OverviewDashboard />}
          {activeTab === 'employees' && <EmployeesPage />}
          {activeTab === 'teams' && <TeamsPage />}
          {activeTab === 'roles' && <RolesPage />}
          {activeTab === 'skills' && <SkillsIntelligence />}
          {activeTab === 'assessments' && <AssessmentsPage />}
          {activeTab === 'learning' && <LearningPage />}
          {activeTab === 'reports' && <ReportsPage />}
          {activeTab === 'copilot' && <SkillGapAI />}
          {activeTab === 'workforce' && <WorkforceForecast />}
          {activeTab === 'simulator' && <WhatIfSimulator />}
          {activeTab === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <SearchModal />
      <AddEmployeeModal />
      <AssignTrainingModal />
      <EditRoleModal />
      <TakeAssessmentModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
