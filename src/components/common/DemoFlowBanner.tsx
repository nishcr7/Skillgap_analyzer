import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, RotateCcw, Compass, CheckCircle } from 'lucide-react';

const STEPS = [
  { step: 1, label: 'Overview', desc: 'Notice critical AWS & Kubernetes gaps' },
  { step: 2, label: 'Engineering Team', desc: 'Identify affected engineers' },
  { step: 3, label: 'Nishanth B Profile', desc: 'Inspect competency gaps & radar chart' },
  { step: 4, label: 'AI Plan Generated', desc: 'Personalized 6-week curriculum' },
  { step: 5, label: 'Assign Training', desc: 'Enroll in AWS Architecture Mastery' },
  { step: 6, label: 'Impact Verified', desc: 'Readiness jumps 78% → 92%' },
  { step: 7, label: 'What-If Forecast', desc: 'Model org-wide scaling to 50 engineers' },
];

export const DemoFlowBanner: React.FC = () => {
  const { demoStep, setDemoStep, advanceDemoFlow, resetDemoFlow, setActiveTab, setSelectedEmployeeId } = useApp();

  const handleJumpToStep = (targetStep: number) => {
    setDemoStep(targetStep);
    if (targetStep === 1) {
      setActiveTab('overview');
      setSelectedEmployeeId(null);
    } else if (targetStep === 2) {
      setActiveTab('employees');
      setSelectedEmployeeId(null);
    } else if (targetStep === 3 || targetStep === 4 || targetStep === 5 || targetStep === 6) {
      setActiveTab('employees');
      setSelectedEmployeeId('emp-1');
    } else if (targetStep === 7) {
      setActiveTab('simulator');
      setSelectedEmployeeId(null);
    }
  };

  const currentStepInfo = STEPS.find((s) => s.step === demoStep) || STEPS[0];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-3.5 mb-6 border border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
          <Compass className="w-4 h-4 text-indigo-300" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            <span>Executive Demo Tour</span>
            <span className="text-slate-400">·</span>
            <span>Step {demoStep} of 7</span>
          </div>
          <p className="text-sm font-medium text-slate-100 truncate">
            {currentStepInfo.label}: <span className="text-slate-300 font-normal">{currentStepInfo.desc}</span>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-1">
        {STEPS.map((s) => {
          const isDone = s.step < demoStep;
          const isCurrent = s.step === demoStep;
          return (
            <button
              key={s.step}
              onClick={() => handleJumpToStep(s.step)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                isCurrent
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isDone
                  ? 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {isDone ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <span>{s.step}.</span>}
              <span className="truncate max-w-[100px]">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
        <button
          onClick={resetDemoFlow}
          title="Reset Demo Flow"
          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg text-xs flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          onClick={advanceDemoFlow}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-semibold text-xs rounded-lg transition-all shadow-xs shrink-0"
        >
          <span>{demoStep === 7 ? 'Restart Tour' : 'Next Step'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
