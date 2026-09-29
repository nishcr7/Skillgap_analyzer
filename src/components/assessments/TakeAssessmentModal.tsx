import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ClipboardCheck, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TakeAssessmentModal: React.FC = () => {
  const {
    isTakeAssessmentOpen,
    setIsTakeAssessmentOpen,
    assessmentToTake,
    selectedEmployeeId,
    recordAssessmentResult,
  } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);

  if (!isTakeAssessmentOpen || !assessmentToTake) return null;

  const currentQuestion = assessmentToTake.questions[currentQuestionIndex];
  const totalQuestions = assessmentToTake.questions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    assessmentToTake.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    setScorePercentage(calculatedScore);
    setIsSubmitted(true);

    // Trigger celebration
    if (calculatedScore >= 75) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Record result for Nishanth or active employee
    recordAssessmentResult(selectedEmployeeId || 'emp-1', assessmentToTake.title, calculatedScore);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{assessmentToTake.title}</h3>
              <p className="text-[11px] text-slate-500">
                Evaluation for Nishanth B · {assessmentToTake.category} · {totalQuestions} questions
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTakeAssessmentOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Question</span>
            <span className="font-semibold text-slate-900">
              {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <div className="w-48 bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Scenario Context Box */}
          {currentQuestion.scenario && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900 block mb-1">Scenario Context:</span>
              {currentQuestion.scenario}
            </div>
          )}

          {/* Question Text */}
          <h4 className="text-sm font-semibold text-slate-900 leading-snug">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h4>

          {/* Options */}
          <div className="space-y-2.5 pt-1">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
              const isCorrect = currentQuestion.correctIndex === optIdx;

              let itemStyle = 'border-slate-200 hover:border-slate-300 bg-white';
              if (isSubmitted) {
                if (isCorrect) {
                  itemStyle = 'border-emerald-500 bg-emerald-50/50 text-emerald-950 ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  itemStyle = 'border-rose-500 bg-rose-50/50 text-rose-950 ring-1 ring-rose-500';
                }
              } else if (isSelected) {
                itemStyle = 'border-indigo-600 bg-indigo-50/40 text-slate-900 ring-1 ring-indigo-600';
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${itemStyle}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${
                      isSelected
                        ? isSubmitted && !isCorrect
                          ? 'border-rose-600 bg-rose-600 text-white'
                          : 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <div className="flex-1 leading-relaxed">{opt}</div>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-200/80 rounded-xl text-xs text-indigo-900 animate-in fade-in duration-200">
              <span className="font-semibold block mb-1">Architecture Explanation:</span>
              <p className="text-[11px] leading-relaxed text-indigo-950/90">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Final Score Banner if submitted */}
          {isSubmitted && currentQuestionIndex === totalQuestions - 1 && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 text-center animate-in zoom-in-95 duration-200">
              <div className="text-2xl font-black tabular-nums">{scorePercentage}% Score</div>
              <p className="text-xs mt-1 text-emerald-800">
                {scorePercentage >= 75
                  ? 'Benchmark Passed! Competency evidence score updated in Nishanth B profile.'
                  : 'Needs improvement. Personalized learning plan adjusted for weak domains.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg disabled:opacity-40 transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {isSubmitted ? (
              <>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsTakeAssessmentOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Close & View Updated Profile
                </button>
              </>
            ) : currentQuestionIndex === totalQuestions - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
              >
                <span>Submit Assessment</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
