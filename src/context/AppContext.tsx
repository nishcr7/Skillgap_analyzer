import React, { createContext, useContext, useState } from 'react';
import {
  Employee,
  Role,
  SkillTaxonomyNode,
  Assessment,
  LearningProgram,
  Team,
  DepartmentReadiness,
  TopGapItem,
} from '../types';
import {
  INITIAL_EMPLOYEES,
  INITIAL_ROLES,
  INITIAL_SKILLS_TAXONOMY,
  INITIAL_ASSESSMENTS,
  INITIAL_LEARNING_PROGRAMS,
  INITIAL_TEAMS,
  INITIAL_DEPARTMENT_READINESS,
  INITIAL_TOP_GAPS,
} from '../data/mockData';

export type NavTab =
  | 'overview'
  | 'employees'
  | 'teams'
  | 'roles'
  | 'skills'
  | 'assessments'
  | 'learning'
  | 'reports'
  | 'copilot'
  | 'workforce'
  | 'simulator'
  | 'settings';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: (id: string | null) => void;
  selectedRoleId: string | null;
  setSelectedRoleId: (id: string | null) => void;
  selectedSkillId: string | null;
  setSelectedSkillId: (id: string | null) => void;
  employees: Employee[];
  roles: Role[];
  skillsTaxonomy: SkillTaxonomyNode[];
  assessments: Assessment[];
  learningPrograms: LearningProgram[];
  teams: Team[];
  departmentReadiness: DepartmentReadiness[];
  topGaps: TopGapItem[];
  workforceReadiness: number;
  criticalGapsCount: number;
  activeLearningPlansCount: number;
  totalEmployeesCount: number;
  assessmentsCompletedPct: number;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  isAddEmployeeOpen: boolean;
  setIsAddEmployeeOpen: (open: boolean) => void;
  isAssignTrainingOpen: boolean;
  setIsAssignTrainingOpen: (open: boolean) => void;
  isEditRoleOpen: boolean;
  setIsEditRoleOpen: (open: boolean) => void;
  isTakeAssessmentOpen: boolean;
  setIsTakeAssessmentOpen: (open: boolean) => void;
  assessmentToTake: Assessment | null;
  setAssessmentToTake: (assessment: Assessment | null) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  // Demo flow helper
  demoStep: number;
  setDemoStep: (step: number) => void;
  advanceDemoFlow: () => void;
  resetDemoFlow: () => void;
  assignTrainingToEmployee: (employeeId: string, skillName: string, programTitle: string) => void;
  updateRoleRequirements: (roleId: string, updatedSkills: Role['skills']) => void;
  recordAssessmentResult: (employeeId: string, assessmentTitle: string, scorePct: number) => void;
  simulateWorkforceInitiative: (trainedCount: number, skillName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>('role-backend');
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>('tax-k8s');

  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [skillsTaxonomy] = useState<SkillTaxonomyNode[]>(INITIAL_SKILLS_TAXONOMY);
  const [assessments, setAssessments] = useState<Assessment[]>(INITIAL_ASSESSMENTS);
  const [learningPrograms, setLearningPrograms] = useState<LearningProgram[]>(INITIAL_LEARNING_PROGRAMS);
  const [teams] = useState<Team[]>(INITIAL_TEAMS);
  const [departmentReadiness, setDepartmentReadiness] = useState<DepartmentReadiness[]>(INITIAL_DEPARTMENT_READINESS);
  const [topGaps, setTopGaps] = useState<TopGapItem[]>(INITIAL_TOP_GAPS);

  const [workforceReadiness, setWorkforceReadiness] = useState<number>(76);
  const [criticalGapsCount, setCriticalGapsCount] = useState<number>(17);
  const [activeLearningPlansCount, setActiveLearningPlansCount] = useState<number>(326);
  const totalEmployeesCount = 1842;
  const [assessmentsCompletedPct, setAssessmentsCompletedPct] = useState<number>(89);

  // Modals
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isAssignTrainingOpen, setIsAssignTrainingOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [isTakeAssessmentOpen, setIsTakeAssessmentOpen] = useState(false);
  const [assessmentToTake, setAssessmentToTake] = useState<Assessment | null>(INITIAL_ASSESSMENTS[0]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Demo step 1 to 7
  const [demoStep, setDemoStep] = useState<number>(1);

  // Toast system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Demo flow orchestration
  const advanceDemoFlow = () => {
    if (demoStep === 1) {
      // Step 1 -> Step 2: Open Engineering team or Employees page
      setActiveTab('employees');
      setDemoStep(2);
      addToast({
        title: 'Demo Step 2: Employee Inspection',
        description: 'Viewing engineering workforce. Select Nishanth B to inspect individual competency gaps.',
        type: 'info',
      });
    } else if (demoStep === 2) {
      // Step 2 -> Step 3: Open Nishanth's profile
      setSelectedEmployeeId('emp-1');
      setDemoStep(3);
      addToast({
        title: 'Demo Step 3: Nishanth B Profile',
        description: 'Inspecting Nishanth’s 78% readiness, radar chart, and AWS/Kubernetes critical gaps.',
        type: 'info',
      });
    } else if (demoStep === 3) {
      // Step 3 -> Step 4: Scroll/highlight Development plan & Generate Plan
      setDemoStep(4);
      addToast({
        title: 'Demo Step 4: Personalized Plan',
        description: 'AI Generated 6-week curriculum for AWS Architecture. Ready to assign targeted training.',
        type: 'success',
      });
    } else if (demoStep === 4) {
      // Step 4 -> Step 5: Assign Training
      setIsAssignTrainingOpen(true);
      setDemoStep(5);
    } else if (demoStep === 5) {
      // Step 5 -> Step 6: Trigger assignment & show boost
      assignTrainingToEmployee('emp-1', 'AWS Architecture', 'AWS Enterprise Cloud Architecture');
      setDemoStep(6);
    } else if (demoStep === 6) {
      // Step 6 -> Step 7: Open Workforce Intelligence / What-If Simulator
      setActiveTab('simulator');
      setDemoStep(7);
      addToast({
        title: 'Demo Step 7: What-If Simulation',
        description: 'Simulate scaling Kubernetes training across 50 engineers to project ROI & org readiness.',
        type: 'info',
      });
    } else {
      setDemoStep(1);
      setActiveTab('overview');
      setSelectedEmployeeId(null);
      addToast({
        title: 'Demo Reset',
        description: 'Returned to executive overview dashboard.',
        type: 'info',
      });
    }
  };

  const resetDemoFlow = () => {
    setDemoStep(1);
    setActiveTab('overview');
    setSelectedEmployeeId(null);
  };

  const assignTrainingToEmployee = (employeeId: string, skillName: string, programTitle: string) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== employeeId) return emp;
        const updatedSkills = emp.skills.map((sk) => {
          if (sk.name === skillName || sk.name.includes(skillName)) {
            const newScore = Math.min(sk.required, Number((sk.current + 1.1).toFixed(1)));
            return {
              ...sk,
              current: newScore,
              gap: Number((sk.required - newScore).toFixed(1)),
              priority: (sk.required - newScore <= 0 ? 'Strength' : 'Medium') as any,
              isStrength: sk.required - newScore <= 0,
            };
          }
          return sk;
        });

        const newReadiness = Math.min(94, emp.readiness + 14);
        const newCriticalGaps = emp.criticalGaps.filter((g) => !g.includes(skillName) && !skillName.includes(g));

        return {
          ...emp,
          readiness: newReadiness,
          criticalGaps: newCriticalGaps,
          criticalGapsCount: newCriticalGaps.length,
          learningProgress: Math.min(100, emp.learningProgress + 35),
          activeCourse: programTitle,
          status: 'In Training',
          skills: updatedSkills,
          careerPath: {
            ...emp.careerPath,
            readinessScore: Math.min(92, emp.careerPath.readinessScore + 12),
          },
        };
      })
    );

    // Update global stats
    setWorkforceReadiness((prev) => Math.min(84, prev + 2));
    setCriticalGapsCount((prev) => Math.max(12, prev - 2));
    setActiveLearningPlansCount((prev) => prev + 1);

    // Update Engineering department readiness
    setDepartmentReadiness((prev) =>
      prev.map((d) => (d.department === 'Engineering' ? { ...d, readiness: Math.min(92, d.readiness + 3) } : d))
    );

    addToast({
      title: 'Training Successfully Assigned',
      description: `Enrolled employee in "${programTitle}". Projected readiness improved to 92%.`,
      type: 'success',
    });
  };

  const updateRoleRequirements = (roleId: string, updatedSkills: Role['skills']) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === roleId ? { ...r, skills: updatedSkills } : r))
    );
    addToast({
      title: 'Role Competency Updated',
      description: 'Requirements saved. Employee readiness recalculations will take effect immediately.',
      type: 'success',
    });
  };

  const recordAssessmentResult = (employeeId: string, assessmentTitle: string, scorePct: number) => {
    setAssessments((prev) =>
      prev.map((a) =>
        a.title === assessmentTitle
          ? {
              ...a,
              participants: a.participants + 1,
              averageScore: Math.round((a.averageScore * a.participants + scorePct) / (a.participants + 1)),
            }
          : a
      )
    );

    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            readiness: Math.min(95, emp.readiness + (scorePct >= 75 ? 6 : 2)),
            evidence: {
              ...emp.evidence,
              assessmentScore: scorePct,
              assessmentName: assessmentTitle,
              confidenceScore: Math.min(99, emp.evidence.confidenceScore + 4),
            },
          };
        }
        return emp;
      })
    );

    setAssessmentsCompletedPct((prev) => Math.min(95, prev + 1));

    addToast({
      title: 'Assessment Evaluated',
      description: `Recorded score of ${scorePct}% for ${assessmentTitle}. Updated employee evidence matrix.`,
      type: 'success',
    });
  };

  const simulateWorkforceInitiative = (trainedCount: number, skillName: string) => {
    const boost = Math.min(12, Math.round((trainedCount / 50) * 8));
    setWorkforceReadiness((prev) => Math.min(92, 76 + boost));
    setCriticalGapsCount((prev) => Math.max(7, 17 - Math.round((trainedCount / 50) * 6)));
    setActiveLearningPlansCount((prev) => 326 + trainedCount);

    addToast({
      title: 'Initiative Applied to Workforce Model',
      description: `Committed program for ${trainedCount} engineers in ${skillName}. Projected org readiness: ${Math.min(92, 76 + boost)}%.`,
      type: 'success',
    });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedEmployeeId,
        setSelectedEmployeeId,
        selectedRoleId,
        setSelectedRoleId,
        selectedSkillId,
        setSelectedSkillId,
        employees,
        roles,
        skillsTaxonomy,
        assessments,
        learningPrograms,
        teams,
        departmentReadiness,
        topGaps,
        workforceReadiness,
        criticalGapsCount,
        activeLearningPlansCount,
        totalEmployeesCount,
        assessmentsCompletedPct,
        toasts,
        addToast,
        removeToast,
        isAddEmployeeOpen,
        setIsAddEmployeeOpen,
        isAssignTrainingOpen,
        setIsAssignTrainingOpen,
        isEditRoleOpen,
        setIsEditRoleOpen,
        isTakeAssessmentOpen,
        setIsTakeAssessmentOpen,
        assessmentToTake,
        setAssessmentToTake,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        demoStep,
        setDemoStep,
        advanceDemoFlow,
        resetDemoFlow,
        assignTrainingToEmployee,
        updateRoleRequirements,
        recordAssessmentResult,
        simulateWorkforceInitiative,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
