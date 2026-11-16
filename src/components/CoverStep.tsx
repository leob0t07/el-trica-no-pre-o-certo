import React from 'react';
import { ArrowRight, Check, X, FileText } from 'lucide-react';

interface CoverStepProps {
  onStart: () => void;
}

export const CoverStep: React.FC<CoverStepProps> = ({ onStart }) => {
  return (
    <section id="capa" className="step-enter px-4 pt-5 pb-8 flex flex-col gap-5">
      <div className="text-center space-y-3">
        <h1 className="font-display text-[24px] sm:text-[26px] leading-[1.2] font-extrabold tracking-tight text-slate-900">
          Grave um áudio e mande um <span className="hl">orçamento profissional</span> na hora.
        </h1>
        <p className="text-[15px] leading-relaxed text-slate-600 max-w-[400px] mx-auto">
          Nunca mais tome prejuízo por esquecer de somar materiais. Orçamento em menos de um minuto o cliente responde na hora!
        </p>
      </div>

      {/* Visual Comparativo Antes vs. Depois em CSS/SVG */}
      <div className="grid grid-cols-2 gap-3 items-stretch">
        {/* Lado Esquerdo: Antes (Caderno rabiscado) */}
        <div className="rounded-2xl bg-red-50/90 border border-red-200/90 p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700">
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
              Antes
            </span>
            <span className="text-[10px] font-medium text-red-500">Caderno</span>
          </div>

          {/* Paper notepad CSS/SVG illustration */}
          <div className="bg-white rounded-xl border border-red-100 p-2.5 shadow-inner relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Spiral rings SVG */}
            <svg
              aria-hidden="true"
              className="w-full h-2.5 text-slate-300 mb-1.5"
              viewBox="0 0 140 12"
              fill="none"
            >
              <circle cx="14" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="38" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="62" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="86" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="110" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="132" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>

            <div className="space-y-1.5 text-[11px] leading-snug text-slate-700 font-medium">
              <div className="border-b border-blue-100 pb-1 -rotate-1">
                <span className="line-through text-slate-400">Cabo 2.5</span>{' '}
                <span className="text-slate-800">Fio 2.5mm... R$ 180?</span>
              </div>
              <div className="border-b border-blue-100 pb-1 rotate-1">
                <span>Disjuntor... </span>
                <span className="text-red-600 font-semibold italic">esqueci de somar</span>
              </div>
              <div className="border-b border-blue-100 pb-1 -rotate-1 text-slate-500">
                <span>Fita + bucha + mão obra??</span>
              </div>
            </div>

            <div className="mt-2.5 pt-1.5 border-t border-dashed border-red-200 flex items-center justify-between">
              <span className="text-[10px] font-bold text-red-600">Prejuízo oculto</span>
              <span className="font-mono-num text-[11px] font-bold text-red-600">???</span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Depois (Tela do App gerando PDF limpo) */}
        <div className="rounded-2xl bg-emerald-50/90 border border-emerald-200/90 p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              Depois
            </span>
            <span className="text-[10px] font-medium text-emerald-600">No App</span>
          </div>

          {/* Mini Smartphone Mockup */}
          <div className="bg-white rounded-xl border border-emerald-200 p-2.5 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-100">
                <span className="w-5 h-5 rounded-md bg-[#0B4FC0] text-white flex items-center justify-center shrink-0">
                  <FileText className="w-3 h-3" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-900 truncate">
                    Orçamento PDF
                  </p>
                  <p className="text-[9px] text-slate-400 truncate">Pronto em 45s</p>
                </div>
              </div>

              <div className="mt-2 space-y-1 text-[10px] text-slate-600">
                <div className="flex justify-between gap-1">
                  <span className="truncate">Materiais</span>
                  <span className="font-mono-num font-semibold text-slate-800">R$ 610</span>
                </div>
                <div className="flex justify-between gap-1">
                  <span className="truncate">Mão de obra</span>
                  <span className="font-mono-num font-semibold text-slate-800">R$ 540</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-700">Total</span>
              <span className="font-mono-num text-xs font-extrabold text-emerald-700">
                R$ 1.150,00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botão CTA */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onStart}
          className="btn--pulse w-full min-h-[56px] px-6 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-bold text-[17px] flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Continuar</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center text-xs text-slate-500 mt-2.5">
          Diagnóstico rápido · leva menos de 1 minuto
        </p>
      </div>
    </section>
  );
};
