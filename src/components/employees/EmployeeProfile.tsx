import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Award,
  Sparkles,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertTriangle,
  Play,
  Share2,
  Calendar,
  Check,
  Zap,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export const EmployeeProfile: React.FC = () => {
  const {
    employees,
    selectedEmployeeId,
    setSelectedEmployeeId,
    setIsAssignTrainingOpen,
    setIsTakeAssessmentOpen,
    setAssessmentToTake,
    assessments,
    addToast,
    advanceDemoFlow,
    demoStep,
  } = useApp();

  const employee = employees.find((e) => e.id === (selectedEmployeeId || 'emp-1')) || employees[0];

  const [devPlanWeeks, setDevPlanWeeks] = useState(employee.developmentPlan.weeks);
  const [isGeneratingAiPlan, setIsGeneratingAiPlan] = useState(false);
  const [careerPathModalOpen, setCareerPathModalOpen] = useState(false);

  // Radar data
  const radarData = employee.skills.map((sk) => ({
    subject: sk.name,
    current: sk.current,
    required: sk.required,
    fullMark: 5.0,
  }));

  const handleToggleWeek = (weekNum: number) => {
    setDevPlanWeeks((prev) =>
      prev.map((w) => (w.week === weekNum ? { ...w, completed: !w.completed } : w))
    );
    addToast({
      title: 'Milestone Updated',
      description: `Week ${weekNum} status changed for ${employee.name}.`,
      type: 'info',
    });
  };

  const handleGenerateAiPlan = () => {
    setIsGeneratingAiPlan(true);
    setTimeout(() => {
      setIsGeneratingAiPlan(false);
      addToast({
        title: 'AI Curriculum Optimized',
        description: `Regenerated 6-week targeted sprint for ${employee.name} focused on AWS Architecture & EKS Kubernetes microservices.`,
        type: 'success',
      });
      if (demoStep === 3) {
        advanceDemoFlow();
      }
    }, 1000);
  };

  const completedWeeksCount = devPlanWeeks.filter((w) => w.completed).length;
  const progressPercent = Math.round((completedWeeksCount / devPlanWeeks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={() => setSelectedEmployeeId(null)}
            className="flex items-center gap-1.5 font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Employees</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{employee.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const awsAssess = assessments.find((a) => a.id === 'assess-aws') || assessments[0];
              setAssessmentToTake(awsAssess);
              setIsTakeAssessmentOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Play className="w-3.5 h-3.5 text-emerald-600" />
            <span>Launch Benchmark Assessment</span>
          </button>

          <button
            onClick={() => setIsAssignTrainingOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Assign Training</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Avatar & Identification */}
          <div className="flex items-start sm:items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${employee.avatarColor} text-white font-bold text-xl flex items-center justify-center shadow-md ring-4 ring-slate-100 shrink-0`}
            >
              {employee.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{employee.name}</h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {employee.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="font-semibold text-slate-800">{employee.role}</span>
                <span>·</span>
                <span>{employee.department}</span>
                <span>·</span>
                <span className="text-slate-500">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span>Active Track: <strong className="text-slate-800">{employee.activeCourse}</strong></span>
              </div>
            </div>
          </div>

          {/* Readiness Score Box */}
          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
            <div>
              <span className="text-xs font-medium text-slate-500 block mb-1">Overall Role Readiness</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                  {employee.readiness}%
                </span>
                <span
                  className={`text-xs font-semibold ${
                    employee.readiness >= 80 ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {employee.readiness >= 80 ? 'Role Ready' : 'Development Required'}
                </span>
              </div>
              <div className="w-44 bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    employee.readiness >= 80 ? 'bg-emerald-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${employee.readiness}%` }}
                />
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-medium text-slate-500 block mb-1">Critical Gaps</span>
              <span className="text-2xl font-bold text-rose-600 tabular-nums">
                {employee.criticalGapsCount}
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">Requires action</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Skill Cards + Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Individual Skill Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Competency Breakdown & Evaluation</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Strengths (≥ 4.0)
              </span>
              <span className="flex items-center gap-1.5 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Skill Gaps (&lt; 3.0)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {employee.skills.map((skill) => {
              const isGap = skill.gap > 0;
              const isCritical = skill.priority === 'Critical';

              return (
                <div
                  key={skill.skillId}
                  className={`p-4 rounded-xl border transition-all ${
                    skill.isStrength
                      ? 'bg-emerald-50/30 border-emerald-200/70 hover:border-emerald-300'
                      : isCritical
                      ? 'bg-rose-50/30 border-rose-200/80 hover:border-rose-300'
                      : 'bg-amber-50/20 border-amber-200/70 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{skill.name}</span>
                      <span className="text-[11px] text-slate-500">{skill.category}</span>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        skill.isStrength
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCritical
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {skill.priority}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-3 text-xs">
                    <div>
                      <span className="text-slate-500 text-[11px]">Current:</span>{' '}
                      <strong className="text-slate-900 font-mono text-sm tabular-nums">
                        {skill.current.toFixed(1)}
                      </strong>
                      <span className="text-slate-400 text-[11px]">/5.0</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px]">Target:</span>{' '}
                      <span className="text-slate-700 font-mono tabular-nums">{skill.required.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full ${
                        skill.isStrength
                          ? 'bg-emerald-500'
                          : isCritical
                          ? 'bg-rose-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${(skill.current / 5.0) * 100}%` }}
                    />
                  </div>

                  {isGap && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-rose-600 font-medium flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Deficit: -{skill.gap.toFixed(1)} level
                      </span>
                      <button
                        onClick={() => setIsAssignTrainingOpen(true)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Bridge Gap →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Radar Chart: Current Skills vs Role Requirements */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Competency Radar Comparison</h2>
              <p className="text-[11px] text-slate-500">Current Competencies vs Backend Engineer Standard</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs py-1">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              Current Skills
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              Role Benchmark
            </span>
          </div>

          <div className="h-72 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any, name: any) => [`${val}/5.0`, name === 'current' ? 'Current Skill' : 'Role Required']}
                />
                <Radar
                  name="Role Benchmark"
                  dataKey="required"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.2}
                />
                <Radar
                  name="Current Skills"
                  dataKey="current"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Skill Evidence Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Skill Evidence & Validation Matrix</h2>
            <p className="text-[11px] text-slate-500">
              Multi-signal confidence score based on automated assessments, project deliverables, and manager ratings.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-semibold text-indigo-700">
            <span>Model Confidence:</span>
            <span className="font-mono tabular-nums">{employee.evidence.confidenceScore}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Assessment Score */}
          <div className="p-4 bg-slate-50/70 border border-slate-200/70 rounded-xl">
            <span className="text-xs font-medium text-slate-500 block mb-1">Assessment Score</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                {employee.evidence.assessmentScore}%
              </span>
              <span className="text-[11px] text-slate-400">benchmark</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-2 truncate">{employee.evidence.assessmentName}</p>
          </div>

          {/* Manager Rating */}
          <div className="p-4 bg-slate-50/70 border border-slate-200/70 rounded-xl">
            <span className="text-xs font-medium text-slate-500 block mb-1">Manager Rating</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                {employee.evidence.managerRating}
              </span>
              <span className="text-slate-400 text-xs">/5.0</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-2 truncate">Evaluated by {employee.evidence.managerName}</p>
          </div>

          {/* Project Evidence */}
          <div className="p-4 bg-slate-50/70 border border-slate-200/70 rounded-xl md:col-span-2">
            <span className="text-xs font-medium text-slate-500 block mb-1">Project Evidence & Deliverables</span>
            <p className="text-xs text-slate-700 leading-relaxed mt-1">{employee.evidence.projectEvidence}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {employee.evidence.certifications.map((c, i) => (
                <span
                  key={i}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border flex items-center gap-1 ${
                    c.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : c.status === 'Expiring'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-slate-400">({c.status})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Development Plan Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Personalized Development Plan</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                Target: {employee.developmentPlan.targetSkill}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Current: <strong className="text-slate-700">{employee.developmentPlan.current}</strong> · Required:{' '}
              <strong className="text-slate-700">{employee.developmentPlan.required}</strong> · Gap:{' '}
              <strong className="text-rose-600">-{employee.developmentPlan.gap}</strong> · Priority:{' '}
              <strong className="text-slate-700">{employee.developmentPlan.priority}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateAiPlan}
              disabled={isGeneratingAiPlan}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingAiPlan ? 'AI Curating...' : 'Regenerate AI Plan'}</span>
            </button>
            <button
              onClick={() => setIsAssignTrainingOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Assign Course</span>
            </button>
          </div>
        </div>

        {/* Development Progress Bar */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 mb-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-800">
              Curriculum Progress ({completedWeeksCount} of {devPlanWeeks.length} weeks completed)
            </span>
            <span className="font-bold text-indigo-600 font-mono tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Week by Week Syllabus */}
        <div className="space-y-2.5">
          {devPlanWeeks.map((week) => (
            <div
              key={week.week}
              onClick={() => handleToggleWeek(week.week)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                week.completed
                  ? 'bg-emerald-50/30 border-emerald-200/80 hover:bg-emerald-50/50'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors ${
                  week.completed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 border border-slate-300'
                }`}
              >
                {week.completed ? <Check className="w-3.5 h-3.5" /> : week.week}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-bold ${
                      week.completed ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'
                    }`}
                  >
                    Week {week.week} — {week.title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono shrink-0">{week.duration}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{week.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Path Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Career Progression & Ladder Readiness</h2>
            <p className="text-xs text-slate-500 mt-1">
              Simulated pathway from {employee.role} to Principal Engineer.
            </p>
          </div>
          <button
            onClick={() => setCareerPathModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>View Development Path</span>
          </button>
        </div>

        {/* Ladder progression steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {employee.careerPath.ladder.map((level, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border relative transition-all ${
                level.isCurrent
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : level.isNext
                  ? 'bg-indigo-50/50 border-indigo-200 text-slate-900 ring-1 ring-indigo-200'
                  : 'bg-slate-50/60 border-slate-200/70 text-slate-700'
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider mb-1 opacity-70">
                {level.isCurrent ? 'Current Role' : level.isNext ? 'Target Role' : `Tier ${idx + 1}`}
              </div>
              <h3 className="text-xs font-bold truncate">{level.title}</h3>

              <div className="mt-3 flex items-baseline justify-between text-xs">
                <span className="text-[11px] opacity-80">Readiness</span>
                <span className="font-mono font-bold tabular-nums">
                  {level.readinessPercentage || (level.isCurrent ? 100 : 0)}%
                </span>
              </div>
              <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className={`h-full rounded-full ${
                    level.isCurrent ? 'bg-emerald-400' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${level.readinessPercentage || (level.isCurrent ? 100 : 0)}%` }}
                />
              </div>

              {level.missingCompetencies && level.missingCompetencies.length > 0 && (
                <div className="mt-3 pt-2 border-t border-indigo-100 text-[11px] space-y-1">
                  <span className="text-slate-500 font-semibold block">Missing for promotion:</span>
                  {level.missingCompetencies.map((mc, mci) => (
                    <div key={mci} className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-700 truncate">{mc.name}</span>
                      <span
                        className={`font-semibold px-1 rounded ${
                          mc.severity === 'Critical' ? 'text-rose-600 bg-rose-50' : 'text-amber-600 bg-amber-50'
                        }`}
                      >
                        {mc.severity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Career Path Modal */}
      {careerPathModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Career Ladder Progression — {employee.name}
                </h3>
              </div>
              <button
                onClick={() => setCareerPathModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-indigo-50 border border-indigo-200/80 rounded-xl text-xs">
                <span className="font-bold text-indigo-950 block mb-1">
                  Next Milestone: Senior Backend Engineer ({employee.careerPath.readinessScore}% ready)
                </span>
                <p className="text-indigo-900 text-[11px] leading-relaxed">
                  Nishanth satisfies IC3 requirements with distinction in Python and REST APIs. To qualify for Senior
                  Backend Engineer (IC4), resolution of Kubernetes and System Design gaps is mandatory.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">Target Competencies for Promotion:</div>
                <div className="p-3 border border-slate-200 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">System Design (Target: Level 4)</span>
                    <span className="text-rose-600 font-semibold text-[11px]">Critical Deficit (-0.7)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Must independently design distributed caches, event-driven topologies with Kafka, and partition tolerance models.
                  </p>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Kubernetes (Target: Level 4)</span>
                    <span className="text-rose-600 font-semibold text-[11px]">Critical Deficit (-1.4)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Must manage Helm deployments, write custom CRDs, and handle production cluster node rollouts.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setCareerPathModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                Close Pathway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
