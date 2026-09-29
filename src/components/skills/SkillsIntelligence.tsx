import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Layers,
  Users,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  GitBranch,
  Network,
  Plus,
} from 'lucide-react';

export const SkillsIntelligence: React.FC = () => {
  const {
    skillsTaxonomy,
    selectedSkillId,
    setSelectedSkillId,
    employees,
    setSelectedEmployeeId,
    setActiveTab,
    setIsAssignTrainingOpen,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Cloud',
    'AI & Machine Learning',
    'Software Engineering',
    'Data',
    'Cybersecurity',
    'Leadership',
  ];

  const currentSkill =
    skillsTaxonomy.find((s) => s.id === (selectedSkillId || 'tax-k8s')) || skillsTaxonomy[0];

  const filteredTaxonomy = skillsTaxonomy.filter(
    (s) => activeCategory === 'All' || s.category === activeCategory
  );

  // Employees with critical gap in current skill
  const employeesWithGap = employees.filter((emp) =>
    emp.skills.some(
      (sk) =>
        (sk.name.toLowerCase().includes(currentSkill.name.toLowerCase()) ||
          currentSkill.name.toLowerCase().includes(sk.name.toLowerCase())) &&
        sk.gap > 0.5
    )
  );

  // Employees with high proficiency in current skill
  const employeesWithProficiency = employees.filter((emp) =>
    emp.skills.some(
      (sk) =>
        (sk.name.toLowerCase().includes(currentSkill.name.toLowerCase()) ||
          currentSkill.name.toLowerCase().includes(sk.name.toLowerCase())) &&
        sk.current >= 3.5
    )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Skills Intelligence & Taxonomy Graph</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise skill ontology, proficiency thresholds, organizational coverage, and dependency trees.
          </p>
        </div>

        <button
          onClick={() => setIsAssignTrainingOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
        >
          <span>Upskill Deficient Cohort</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Taxonomy Tree + Deep-Dive Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Skill Nodes */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Skill Taxonomy Hierarchy ({filteredTaxonomy.length} nodes)
          </div>

          {filteredTaxonomy.map((node) => {
            const isSelected = node.id === currentSkill.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedSkillId(node.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-semibold opacity-70 block">
                      {node.category}
                    </span>
                    <h3 className="text-sm font-bold">{node.name}</h3>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-slate-800 text-indigo-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Avg {node.averageProficiency}/5.0
                  </span>
                </div>

                <p className="text-[11px] opacity-80 mt-1.5 line-clamp-1">{node.description}</p>

                {/* Subskills Preview */}
                {node.subskills && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {node.subskills.slice(0, 4).map((sub, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-1.5 py-0.2 rounded ${
                          isSelected
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {sub}
                      </span>
                    ))}
                    {node.subskills.length > 4 && (
                      <span className="text-[10px] opacity-70">+{node.subskills.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Skill Intelligence Inspector */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-indigo-600">{currentSkill.category}</span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">{currentSkill.name}</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{currentSkill.description}</p>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-xs text-slate-500 block">Critical Gaps</span>
              <span className="text-2xl font-black text-rose-600 font-mono tabular-nums">
                {currentSkill.criticalGapsCount}
              </span>
              <span className="text-[11px] text-slate-400 block">engineers below benchmark</span>
            </div>
          </div>

          {/* Metric Quad */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">Average Proficiency</span>
              <strong className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {currentSkill.averageProficiency}
              </strong>
              <span className="text-slate-400 text-xs">/5.0</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">Required Benchmark</span>
              <strong className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {currentSkill.requiredProficiency}
              </strong>
              <span className="text-slate-400 text-xs">/5.0</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">Org Coverage</span>
              <strong className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {currentSkill.coveragePercentage}%
              </strong>
              <span className="text-slate-400 text-xs"> verified</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">Total Headcount</span>
              <strong className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {currentSkill.totalEmployeesCount}
              </strong>
              <span className="text-slate-400 text-xs"> engineers</span>
            </div>
          </div>

          {/* Subskill Relationship Ontology */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-indigo-600" />
              <span>Skill Hierarchy & Relationship Tree</span>
            </h3>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-semibold">
                <span>{currentSkill.category}</span>
                <span className="text-slate-400">→</span>
                <span>{currentSkill.name}</span>
              </div>

              {currentSkill.subskills && (
                <div className="pl-4 border-l-2 border-indigo-200 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-600 mb-1">
                    Child Competencies & Primitives:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSkill.subskills.map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-800 shadow-2xs font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                <span>Adjacent Domain Nodes:</span>
                {currentSkill.relatedSkills.map((rel, i) => (
                  <span key={i} className="text-slate-700 font-medium">
                    {rel}
                    {i < currentSkill.relatedSkills.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Employees with Critical Gaps */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Employees with Critical Gaps in {currentSkill.name}</span>
            </h3>

            <div className="space-y-2">
              {employeesWithGap.length > 0 ? (
                employeesWithGap.map((emp) => (
                  <div
                    key={emp.id}
                    onClick={() => {
                      setSelectedEmployeeId(emp.id);
                      setActiveTab('employees');
                    }}
                    className="p-3 bg-rose-50/30 border border-rose-200/80 rounded-xl flex items-center justify-between cursor-pointer hover:bg-rose-50/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                        {emp.avatarInitials}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-900 block">{emp.name}</span>
                        <span className="text-[11px] text-slate-500">{emp.role} · {emp.department}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-mono text-rose-700 font-bold">Deficit: -1.3 lvl</span>
                      <span className="text-indigo-600 font-semibold text-[11px]">Remediate →</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                  No individual deficits detected in selected sample.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
