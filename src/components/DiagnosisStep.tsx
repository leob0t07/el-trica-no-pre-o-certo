import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Clock, AlertCircle, Sparkles } from 'lucide-react';
import {
  QuizAnswers,
  getRiskResult,
  FINDING_BY_P2,
  FINDING_BY_P3,
  FINDING_BY_P5,
} from '../data/quizData';

interface DiagnosisStepProps {
  answers: QuizAnswers;
  onNext: () => void;
}

export const DiagnosisStep: React.FC<DiagnosisStepProps> = ({ answers, onNext }) => {
  const [percent, setPercent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setPercent(0);
    setIsComplete(false);

    const startTime = performance.now();
    const duration = 5000;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const current = Math.round(ratio * 100);
      setPercent(current);

      if (ratio < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setIsComplete(true);
        }, 250);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const p2 = answers['como-orca'] || 'Faço de cabeça na obra mesmo';
  const p3 = answers['base-mao-de-obra'] || 'No que costumo cobrar por um serviço parecido';
  const p4 = answers['cobrou-pouco'] || 'Sim, já aconteceu várias vezes';
  const p5 = answers['reacao-preco'] || 'Ele pede desconto e eu acabo baixando o valor';
  const p6 = answers['tempo-orcamento'] || 'Mais de 1 hora';

  const checklistItems = [
    {
      threshold: 16,
      title: 'Analisando como você faz seus orçamentos',
      detail: p2,
    },
    {
      threshold: 34,
      title: 'Calculando como você define a mão de obra',
      detail: p3,
    },
    {
      threshold: 54,
      title: 'Verificando o que acontece quando você passa o preço',
      detail: p5,
    },
    {
      threshold: 74,
      title: 'Medindo o tempo gasto em cada orçamento',
      detail: p6,
    },
    {
      threshold: 92,
      title: 'Preparando o aplicativo para as suas instalações elétricas',
      detail: null,
    },
  ];

  // Circle SVG math
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percent / 100) * circumference;

  const risk = getRiskResult(p4);
  const findingP2 = FINDING_BY_P2[p2] || FINDING_BY_P2['Faço de cabeça na obra mesmo'];
  const findingP3 = FINDING_BY_P3[p3] || FINDING_BY_P3['No que costumo cobrar por um serviço parecido'];
  const findingP5 = FINDING_BY_P5[p5] || FINDING_BY_P5['Ele pede desconto e eu acabo baixando o valor'];

  if (!isComplete) {
    return (
      <section id="diagnostico" className="step-enter px-4 pt-8 pb-10 space-y-6">
        {/* Círculo de Progresso Animado */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 112 112" aria-hidden="true">
              <circle
                cx="56"
                cy="56"
                r={radius}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="8"
              />
              <circle
                cx="56"
                cy="56"
                r={radius}
                fill="none"
                stroke="#0B4FC0"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono-num text-2xl font-extrabold text-slate-900">
                {percent}%
              </span>
            </div>
          </div>

          <h2 className="font-display text-xl font-bold text-slate-900">
            Analisando suas respostas...
          </h2>
        </div>

        {/* Checklist progressivo */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3.5 shadow-xs">
          {checklistItems.map((item, idx) => {
            const done = percent >= item.threshold;
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 transition-opacity duration-300 ${
                  done ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    done
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {item.title}
                  </p>
                  {item.detail ? (
                    <p className="text-xs text-[#0B4FC0] font-medium mt-0.5 truncate">
                      {item.detail}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section id="diagnostico" className="step-enter px-4 pt-5 pb-8 space-y-5">
      {/* Tag + Title */}
      <div className="space-y-1.5 text-center">
        <p className="text-xs font-bold tracking-wide text-[#0B4FC0] uppercase">
          Seu diagnóstico
        </p>
        <h2 className="font-display text-[22px] sm:text-[24px] leading-[1.24] font-extrabold tracking-tight text-slate-900">
          Suas instalações estão deixando dinheiro na mesa
        </h2>
      </div>

      {/* Medidor de Risco */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-600" />
            Risco de prejuízo nos orçamentos
          </span>
          <span
            className={`font-mono-num text-xs font-extrabold px-2.5 py-1 rounded-lg border ${risk.colorClass}`}
          >
            {risk.level} {risk.percent}%
          </span>
        </div>

        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${risk.barClass}`}
            style={{ width: `${risk.percent}%` }}
          />
        </div>

        <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>⏱️ {p6} por orçamento</span>
        </div>
      </div>

      {/* Bloco "O que encontramos:" */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-xs">
        <h3 className="font-display text-sm font-bold text-slate-900">
          O que encontramos:
        </h3>
        <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
          <li className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
            <span>{findingP2}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>{findingP3}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#0B4FC0] mt-2 shrink-0" />
            <span>{findingP5}</span>
          </li>
        </ul>
      </div>

      {/* Box Verde "A boa notícia" */}
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 space-y-1.5">
        <p className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#16A34A]" />
          A boa notícia
        </p>
        <p className="text-sm leading-relaxed text-slate-800">
          Tudo isso se resolve com um orçamento profissional: material, mão de obra e total certinhos, feitos em{' '}
          <strong className="text-slate-900">menos de 1 minuto</strong> e enviados direto no WhatsApp do cliente.
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="btn--pulse w-full min-h-[56px] px-6 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-bold text-[17px] flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <span>Ver como resolver</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </section>
  );
};
