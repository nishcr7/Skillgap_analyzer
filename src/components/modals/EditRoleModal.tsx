import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Briefcase, Plus, Trash2, Check } from 'lucide-react';
import { RoleSkillRequirement } from '../../types';

export const EditRoleModal: React.FC = () => {
  const { isEditRoleOpen, setIsEditRoleOpen, roles, selectedRoleId, updateRoleRequirements } = useApp();

  const currentRole = roles.find((r) => r.id === (selectedRoleId || 'role-backend')) || roles[0];

  const [skillsList, setSkillsList] = useState<RoleSkillRequirement[]>([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(3);
  const [newSkillWeight, setNewSkillWeight] = useState(10);

  useEffect(() => {
    if (currentRole) {
      setSkillsList([...currentRole.skills]);
    }
  }, [currentRole, isEditRoleOpen]);

  if (!isEditRoleOpen || !currentRole) return null;

  const totalWeight = skillsList.reduce((acc, s) => acc + s.weight, 0);

  const handleLevelChange = (index: number, newLevel: number) => {
    const updated = [...skillsList];
    updated[index] = { ...updated[index], requiredLevel: newLevel };
    setSkillsList(updated);
  };

  const handleWeightChange = (index: number, newWeight: number) => {
    const updated = [...skillsList];
    updated[index] = { ...updated[index], weight: Math.max(1, newWeight) };
    setSkillsList(updated);
  };

  const handleDeleteSkill = (index: number) => {
    setSkillsList(skillsList.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setSkillsList([
      ...skillsList,
      {
        skillName: newSkillName.trim(),
        requiredLevel: newSkillLevel,
        weight: newSkillWeight,
        category: 'Software Engineering',
      },
    ]);
    setNewSkillName('');
  };

  const handleSave = () => {
    updateRoleRequirements(currentRole.id, skillsList);
    setIsEditRoleOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Edit Role Requirements — {currentRole.title}
              </h3>
              <p className="text-[11px] text-slate-500">
                Define required proficiency levels (1-5) and weighting for {currentRole.department}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditRoleOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Weight Total Bar */}
        <div className="px-6 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">Total Competency Weight:</span>
            <span
              className={`font-mono font-bold tabular-nums ${
                totalWeight === 100 ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {totalWeight}%
            </span>
            {totalWeight !== 100 && (
              <span className="text-[11px] text-amber-600">(Recommended total: 100%)</span>
            )}
          </div>
          <div className="text-[11px] text-slate-500">Level Scale: 1 (Novice) to 5 (Principal Expert)</div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {skillsList.map((skill, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 p-3 bg-white border border-slate-200/80 rounded-xl hover:border-slate-300 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-900">{skill.skillName}</div>
                <div className="text-[11px] text-slate-500">{skill.category}</div>
              </div>

              {/* Level Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Target Level:</span>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleLevelChange(idx, lvl)}
                      className={`w-6 h-6 rounded text-xs font-bold transition-all ${
                        skill.requiredLevel === lvl
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight input */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500">Weight:</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={skill.weight}
                    onChange={(e) => handleWeightChange(idx, parseInt(e.target.value) || 0)}
                    className="w-14 px-2 py-1 text-xs border border-slate-200 rounded-lg text-right font-mono"
                  />
                  <span className="text-xs text-slate-400">%</span>
                </div>
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() => handleDeleteSkill(idx)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                title="Remove requirement"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add skill input row */}
          <div className="pt-3 border-t border-dashed border-slate-200 flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Add skill requirement (e.g. Go, GraphQL, Terraform)"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="flex-1 min-w-[200px] px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
            />
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-500">Level:</span>
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                className="px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-500">Weight:</span>
              <input
                type="number"
                min="5"
                max="50"
                value={newSkillWeight}
                onChange={(e) => setNewSkillWeight(parseInt(e.target.value) || 10)}
                className="w-14 px-2 py-1 text-xs border border-slate-200 rounded-lg font-mono"
              />
              <span className="text-xs text-slate-400">%</span>
            </div>
            <button
              type="button"
              onClick={handleAddSkill}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsEditRoleOpen(false)}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>Save Role Requirements</span>
          </button>
        </div>
      </div>
    </div>
  );
};
