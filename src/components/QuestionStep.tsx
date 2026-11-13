import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { QuestionConfig } from '../data/quizData';

interface QuestionStepProps {
  question: QuestionConfig;
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  selectedAnswer,
  onSelect,
}) => {
  const [pickedOption, setPickedOption] = useState<string | null>(null);

  useEffect(() => {
    setPickedOption(null);
  }, [question.id]);

  const handlePick = (label: string) => {
    if (pickedOption) return;
    setPickedOption(label);
    window.setTimeout(() => {
      onSelect(label);
    }, 380);
  };

  return (
    <section id={question.id} className="step-enter px-4 pt-6 pb-8">
      <div className="mb-5">
        <p className="text-xs font-semibold text-[#0B4FC0] mb-1.5">
          Pergunta {question.stepNumber} de {question.totalQuestions}
        </p>
        <h2 className="font-display text-[21px] sm:text-[23px] leading-[1.28] font-bold tracking-tight text-slate-900">
          {question.title}
        </h2>
      </div>

      <div className="space-y-3" role="radiogroup" aria-label={question.title}>
        {question.options.map((opt) => {
          const isPicked = pickedOption === opt.label;
          const wasSaved = !pickedOption && selectedAnswer === opt.label;
          const isActive = isPicked || wasSaved;

          return (
            <button
              key={opt.label}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => handlePick(opt.label)}
              className={`quiz-option w-full min-h-[60px] px-4 py-3.5 rounded-2xl border text-left flex items-center justify-between gap-3.5 cursor-pointer ${
                isPicked
                  ? 'is-picked border-[#0B4FC0] bg-blue-50/90'
                  : wasSaved
                  ? 'border-blue-300 bg-blue-50/50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/80 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="text-2xl leading-none shrink-0 select-none" aria-hidden="true">
                  {opt.emoji}
                </span>
                <span className="text-[15px] leading-snug font-semibold text-slate-800">
                  {opt.label}
                </span>
              </div>

              <span
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isActive
                    ? 'border-[#0B4FC0] bg-[#0B4FC0] text-white'
                    : 'border-slate-300 bg-white text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
