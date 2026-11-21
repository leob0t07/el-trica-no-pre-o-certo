import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import antesImg from '../assets/optimized/antes.webp';
import depoisImg from '../assets/optimized/depois.webp';

interface CoverStepProps {
  onStart: () => void;
}

export const CoverStep: React.FC<CoverStepProps> = ({ onStart }) => {
  const [antesError, setAntesError] = useState(false);
  const [depoisError, setDepoisError] = useState(false);

  return (
    <section id="capa" className="step-enter px-4 pt-5 pb-8 flex flex-col gap-5">
      <div className="text-center space-y-3">
        <h1 className="font-display text-[24px] sm:text-[26px] leading-[1.2] font-extrabold tracking-tight text-slate-900">
          Eletricista que cobra <span className="hl">preço de cabeça</span> está{' '}
          <span className="warn">tomando prejuízo</span> ou deixando lucro escapar
        </h1>
        <p className="text-[15px] leading-relaxed text-slate-600 max-w-[400px] mx-auto">
          Faça orçamentos profissionais com áudio em{' '}
          <strong className="text-slate-900 font-bold">menos de 1 minuto</strong> pra lucrar mais.
        </p>
      </div>

      {/* Visual Comparativo Antes vs. Depois */}
      <div className="grid grid-cols-2 gap-3 items-stretch">
        <div className="rounded-2xl overflow-hidden shadow-sm border border-red-200 bg-red-50">
          {!antesError ? (
            <img
              src={antesImg}
              alt="Antes: eletricista quebrando a cabeça com contas confusas no caderno"
              width={520}
              height={696}
              decoding="async"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              onError={() => setAntesError(true)}
              className="w-full h-full object-cover block aspect-[3/4]"
            />
          ) : (
            <div className="aspect-[3/4] flex flex-col items-center justify-center p-3 text-center bg-red-50 text-red-700 text-xs font-bold">
              Antes: Orçamento no caderno
            </div>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden shadow-sm border border-emerald-200 bg-emerald-50">
          {!depoisError ? (
            <img
              src={depoisImg}
              alt="Depois: eletricista sorrindo gravando áudio e gerando orçamento de R$ 1.150,00"
              width={520}
              height={696}
              decoding="async"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              onError={() => setDepoisError(true)}
              className="w-full h-full object-cover block aspect-[3/4]"
            />
          ) : (
            <div className="aspect-[3/4] flex flex-col items-center justify-center p-3 text-center bg-emerald-50 text-emerald-700 text-xs font-bold">
              Depois: Orçamento por áudio
            </div>
          )}
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
