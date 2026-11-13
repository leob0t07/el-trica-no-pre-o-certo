import React from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, X } from 'lucide-react';

interface PainAgitatorStepProps {
  onNext: () => void;
}

const NEGATIVE_ITEMS = [
  'Não calcula todo o material miúdo (fitas, bornes, buchas)',
  'Não coloca margem de lucro real',
  'Faz tudo de cabeça na correria',
  'Demora horas para enviar o orçamento',
  'Acaba perdendo o serviço para quem passa mais confiança',
];

export const PainAgitatorStep: React.FC<PainAgitatorStepProps> = ({ onNext }) => {
  return (
    <section id="perdendo-dinheiro" className="step-enter px-4 pt-5 pb-8 space-y-5">
      <div className="text-center">
        <h2 className="font-display text-[23px] sm:text-[25px] leading-[1.22] font-extrabold tracking-tight text-slate-900">
          Você pode estar <span className="warn">perdendo dinheiro</span> hoje...
        </h2>
      </div>

      {/* Box de Alerta */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
        <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </span>
        <p className="text-sm leading-relaxed text-slate-800">
          <strong className="font-bold text-red-700">Veja só...</strong> Você provavelmente está cobrando errado nas suas instalações e isso pode estar te fazendo perder muito dinheiro ao longo do ano.
        </p>
      </div>

      {/* Lista Negativa */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-xs">
        <p className="text-xs font-bold text-slate-500">A maioria dos eletricistas:</p>
        <ul className="space-y-2.5">
          {NEGATIVE_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
              <span className="w-5 h-5 rounded-full bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3.5 h-3.5 stroke-[2.75]" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Box de Solução */}
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
        <span className="w-9 h-9 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </span>
        <p className="text-sm leading-relaxed text-slate-800">
          <strong className="font-bold text-emerald-800">Agora existe um jeito fácil:</strong> Um aplicativo que faz o orçamento completo da instalação elétrica de forma profissional em poucos segundos.
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="btn--pulse w-full min-h-[56px] px-6 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-bold text-[17px] flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <span>Quero usar o aplicativo</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </section>
  );
};
