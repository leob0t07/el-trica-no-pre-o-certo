import React from 'react';
import { ChevronLeft, Zap } from 'lucide-react';

interface QuizHeaderProps {
  canGoBack: boolean;
  onBack: () => void;
  progress?: {
    current: number;
    total: number;
    percent: number;
  };
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  canGoBack,
  onBack,
  progress,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="w-11 flex items-center justify-start">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Voltar para etapa anterior"
              className="min-h-[40px] min-w-[40px] -ml-1.5 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-lg bg-[#0B4FC0] text-white flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4 fill-current" />
          </span>
          <span className="font-display font-bold text-sm tracking-tight text-slate-900 whitespace-nowrap">
            Elétrica no Preço Certo
          </span>
        </div>

        <div className="w-11 flex items-center justify-end">
          {progress ? (
            <span className="font-mono-num text-xs font-semibold text-[#0B4FC0] whitespace-nowrap">
              {progress.current}/{progress.total}
            </span>
          ) : null}
        </div>
      </div>

      {progress ? (
        <div className="mt-2.5 flex items-center gap-2.5">
          <div
            className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progresso do quiz: ${progress.current} de ${progress.total}`}
          >
            <div
              className="h-full bg-gradient-to-r from-[#0B4FC0] to-[#2563EB] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <span className="font-mono-num text-[11px] font-medium text-slate-500 whitespace-nowrap">
            {progress.percent}%
          </span>
        </div>
      ) : null}
    </header>
  );
};
