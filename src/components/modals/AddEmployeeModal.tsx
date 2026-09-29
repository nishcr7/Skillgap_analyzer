import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus } from 'lucide-react';
import { Department, Employee } from '../../types';

export const AddEmployeeModal: React.FC = () => {
  const { isAddEmployeeOpen, setIsAddEmployeeOpen, employees, addToast } = useApp();

  const [name, setName] = useState('');
  const [role, setRole] = useState('Backend Engineer');
  const [department, setDepartment] = useState<Department>('Engineering');
  const [email, setEmail] = useState('');

  if (!isAddEmployeeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      name,
      role,
      department,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@nexatech.internal`,
      avatarColor: 'from-blue-600 to-indigo-700',
      avatarInitials: initials || 'EX',
      readiness: 65,
      criticalGapsCount: 2,
      criticalGaps: ['Kubernetes', 'AWS Architecture'],
      learningProgress: 0,
      activeCourse: 'Onboarding Track: Cloud Primitives',
      status: 'In Assessment',
      skills: [
        { skillId: 'sk-1', name: 'Python', category: 'Software Engineering', current: 3.5, required: 4.0, gap: 0.5, priority: 'Medium', isStrength: false },
        { skillId: 'sk-4', name: 'AWS Architecture', category: 'Cloud', current: 2.2, required: 4.0, gap: 1.8, priority: 'Critical', isStrength: false },
        { skillId: 'sk-5', name: 'Kubernetes', category: 'Cloud', current: 1.8, required: 3.5, gap: 1.7, priority: 'Critical', isStrength: false },
      ],
      evidence: {
        assessmentScore: 60,
        assessmentName: 'Initial Onboarding Baseline',
        managerRating: 3.8,
        managerName: 'Sarah Chen (Head of People)',
        projectEvidence: 'New hire onboarding portfolio reviewed.',
        certifications: [],
        confidenceScore: 70,
      },
      developmentPlan: {
        targetSkill: 'AWS Architecture',
        current: 2.2,
        required: 4.0,
        gap: 1.8,
        priority: 'Critical',
        progressPercentage: 0,
        weeks: [
          { week: 1, title: 'AWS Cloud Fundamentals', description: 'Core VPC, IAM & Networking.', completed: false, duration: '6 hrs' },
          { week: 2, title: 'Compute & Storage Primitives', description: 'EC2, S3, Aurora PostgreSQL.', completed: false, duration: '8 hrs' },
        ],
      },
      careerPath: {
        targetRole: `Senior ${role}`,
        readinessScore: 58,
        ladder: [
          { title: role, isCurrent: true, isNext: false, readinessPercentage: 100 },
          { title: `Senior ${role}`, isCurrent: false, isNext: true, readinessPercentage: 58 },
        ],
      },
    };

    employees.unshift(newEmp);
    setIsAddEmployeeOpen(false);
    addToast({
      title: 'Employee Added',
      description: `Added ${name} as ${role} in ${department}. Baseline assessment initialized.`,
      type: 'success',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-slate-900">Add New Employee</h3>
          </div>
          <button
            onClick={() => setIsAddEmployeeOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Malhotra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-white"
              >
                <option value="Backend Engineer">Backend Engineer</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Cloud Engineer">Cloud Engineer</option>
                <option value="Data Engineer">Data Engineer</option>
                <option value="ML Engineer">ML Engineer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 bg-white"
              >
                <option value="Engineering">Engineering</option>
                <option value="Cloud">Cloud</option>
                <option value="Data">Data</option>
                <option value="AI/ML">AI/ML</option>
                <option value="DevOps">DevOps</option>
                <option value="Security">Security</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
            <input
              type="email"
              placeholder="e.g. name@nexatech.internal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddEmployeeOpen(false)}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Add & Analyze Gaps
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
