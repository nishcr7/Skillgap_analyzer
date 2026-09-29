export type Department = 'Engineering' | 'Cloud' | 'Data' | 'AI/ML' | 'DevOps' | 'Security';

export type SkillProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillScore {
  skillId: string;
  name: string;
  category: 'Software Engineering' | 'Cloud' | 'AI & Machine Learning' | 'Data' | 'Cybersecurity' | 'Leadership' | 'DevOps';
  current: number; // e.g. 2.7
  required: number; // e.g. 4.0
  gap: number; // required - current
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | 'Strength';
  isStrength: boolean;
}

export interface SkillEvidence {
  assessmentScore: number; // e.g. 62%
  assessmentName: string;
  managerRating: number; // e.g. 4.2 / 5
  managerName: string;
  projectEvidence: string;
  certifications: Array<{
    name: string;
    issuer: string;
    status: 'Active' | 'Expiring' | 'Missing';
    date?: string;
  }>;
  confidenceScore: number; // e.g. 88%
}

export interface LearningWeek {
  week: number;
  title: string;
  description: string;
  completed: boolean;
  duration: string;
}

export interface DevelopmentPlan {
  targetSkill: string;
  current: number;
  required: number;
  gap: number;
  priority: 'Critical' | 'High' | 'Medium';
  progressPercentage: number;
  weeks: LearningWeek[];
}

export interface CareerPathLevel {
  title: string;
  isCurrent: boolean;
  isNext: boolean;
  readinessPercentage?: number;
  missingCompetencies?: Array<{
    name: string;
    severity: 'Critical' | 'Moderate' | 'Low';
    description: string;
  }>;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: Department;
  email: string;
  avatarColor: string;
  avatarInitials: string;
  readiness: number; // percentage, e.g. 78
  criticalGapsCount: number;
  criticalGaps: string[];
  learningProgress: number; // percentage, e.g. 45
  activeCourse: string;
  status: 'Active' | 'In Assessment' | 'In Training';
  skills: SkillScore[];
  evidence: SkillEvidence;
  developmentPlan: DevelopmentPlan;
  careerPath: {
    targetRole: string;
    readinessScore: number;
    ladder: CareerPathLevel[];
  };
}

export interface RoleSkillRequirement {
  skillName: string;
  requiredLevel: number; // 1-5
  weight: number; // percentage, e.g. 20
  category: string;
}

export interface Role {
  id: string;
  title: string;
  department: Department;
  level: string;
  headcount: number;
  readinessAvg: number;
  description: string;
  skills: RoleSkillRequirement[];
}

export interface SkillTaxonomyNode {
  id: string;
  name: string;
  category: string;
  averageProficiency: number;
  requiredProficiency: number;
  coveragePercentage: number;
  criticalGapsCount: number;
  totalEmployeesCount: number;
  relatedSkills: string[];
  description: string;
  subskills?: string[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  title: string;
  category: string;
  participants: number;
  completionRate: number; // percentage
  averageScore: number; // percentage
  skillImpact: string;
  durationMinutes: number;
  questionsCount: number;
  questions: AssessmentQuestion[];
}

export interface LearningProgram {
  id: string;
  title: string;
  provider: string;
  duration: string;
  recommendedForCount: number;
  expectedImprovement: string;
  targetSkill: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolledEmployees: string[];
  modulesCount: number;
  rating: number;
}

export interface Team {
  id: string;
  name: string;
  department: Department;
  lead: string;
  headcount: number;
  readiness: number;
  topGaps: string[];
  openPositions: number;
}

export interface TopGapItem {
  skill: string;
  severity: 'Critical' | 'High' | 'Medium';
  department: string;
  employeesImpacted: number;
  gapDelta: number;
}

export interface DepartmentReadiness {
  department: Department;
  readiness: number;
  headcount: number;
  criticalGaps: number;
}
