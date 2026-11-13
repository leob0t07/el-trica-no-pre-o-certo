import React, { useState, useEffect, useRef } from 'react';
import { Check, CheckCheck, FileText, RotateCcw, X } from 'lucide-react';

export const WhatsAppComparison: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleStep, setVisibleStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const runSequence = () => {
    setVisibleStep(0);
    setHasStarted(true);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    if (visibleStep >= 4) return;

    const timer = window.setTimeout(() => {
      setVisibleStep((s) => s + 1);
    }, visibleStep === 0 ? 180 : 650);

    return () => window.clearTimeout(timer);
  }, [hasStarted, visibleStep]);

  return (
    <div ref={containerRef} className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-lg font-extrabold text-slate-900">
          Veja na prática no WhatsApp
        </h3>
        <button
          type="button"
          onClick={runSequence}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4FC0] hover:text-blue-800 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Ver de novo</span>
        </button>
      </div>

      {/* Duas colunas responsivas: em mobile empilha ou fica lado a lado com largura legível */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* COLUNA 1: ANTES */}
        <div className="rounded-2xl border border-red-200 bg-white overflow-hidden shadow-sm flex flex-col">
          {/* Header status */}
          <div className="bg-red-50 border-b border-red-200 px-3 py-2 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-red-700">
              <X className="w-3.5 h-3.5 stroke-[3]" />
              ANTES
            </span>
            <span className="text-[11px] font-medium text-red-600">Texto solto</span>
          </div>

          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white px-3 py-2 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-200/30 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
              DM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">Dona Márcia</p>
              <p className="text-[10px] text-emerald-100/80">visto por último hoje</p>
            </div>
          </div>

          {/* Chat body */}
          <div className="wa-wallpaper p-2.5 space-y-2 flex-1 min-h-[260px] flex flex-col justify-start">
            {visibleStep >= 1 && (
              <div className="step-enter self-end max-w-[92%] bg-[#D9FDD3] rounded-xl rounded-tr-xs px-2.5 py-1.5 shadow-2xs text-[11px] text-slate-800">
                <p>oi dona marcia segue o orçamento</p>
                <div className="flex items-center justify-end gap-1 mt-0.5 text-[9px] text-slate-500">
                  <span className="font-mono-num">17:06</span>
                  <CheckCheck className="w-3 h-3 text-sky-500" />
                </div>
              </div>
            )}

            {visibleStep >= 2 && (
              <div className="step-enter self-end max-w-[92%] bg-[#D9FDD3] rounded-xl rounded-tr-xs px-2.5 py-1.5 shadow-2xs text-[11px] text-slate-800">
                <p>troca do quadro e tomadas fica 680 / fio e disjuntor uns 320 / acabamento 150</p>
                <div className="flex items-center justify-end gap-1 mt-0.5 text-[9px] text-slate-500">
                  <span className="font-mono-num">17:06</span>
                  <CheckCheck className="w-3 h-3 text-sky-500" />
                </div>
              </div>
            )}

            {visibleStep >= 3 && (
              <div className="step-enter self-end max-w-[92%] bg-[#D9FDD3] rounded-xl rounded-tr-xs px-2.5 py-1.5 shadow-2xs text-[11px] text-slate-800">
                <p>total 1150 qualquer coisa me chama</p>
                <div className="flex items-center justify-end gap-1 mt-0.5 text-[9px] text-slate-500">
                  <span className="font-mono-num">17:06</span>
                  <CheckCheck className="w-3 h-3 text-sky-500" />
                </div>
              </div>
            )}

            {visibleStep >= 4 && (
              <div className="step-enter pt-1 space-y-1.5">
                <div className="mx-auto w-fit px-2 py-0.5 rounded-md bg-white/80 text-[9px] font-medium text-slate-500 shadow-2xs">
                  Dia seguinte
                </div>
                <div className="self-start max-w-[88%] bg-white rounded-xl rounded-tl-xs px-2.5 py-1.5 shadow-2xs text-[11px] text-slate-800">
                  <p>Vou ver e te aviso</p>
                  <div className="flex items-center justify-end mt-0.5 text-[9px] text-slate-400">
                    <span className="font-mono-num">09:12</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-red-50 border-t border-red-200 px-3 py-2.5 text-center">
            <p className="text-xs font-bold text-red-700">O cliente sumiu. 😔</p>
          </div>
        </div>

        {/* COLUNA 2: DEPOIS */}
        <div className="rounded-2xl border border-emerald-300 bg-white overflow-hidden shadow-sm flex flex-col">
          {/* Header status */}
          <div className="bg-emerald-50 border-b border-emerald-200 px-3 py-2 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              DEPOIS
            </span>
            <span className="text-[11px] font-medium text-emerald-700">PDF Profissional</span>
          </div>

          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white px-3 py-2 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-200/30 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
              DM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">Dona Márcia</p>
              <p className="text-[10px] text-emerald-100/80">online</p>
            </div>
          </div>

          {/* Chat body */}
          <div className="wa-wallpaper p-2.5 space-y-2 flex-1 min-h-[260px] flex flex-col justify-start">
            {visibleStep >= 1 && (
              <div className="step-enter self-end max-w-[94%] bg-[#D9FDD3] rounded-xl rounded-tr-xs p-1.5 shadow-2xs">
                <div className="bg-white/80 rounded-lg p-2 flex items-center gap-2 border border-emerald-200/60">
                  <span className="w-7 h-7 rounded-md bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-900 truncate">
                      Orcamento-Eletrica-0428.pdf
                    </p>
                    <p className="text-[9px] text-slate-500">1 página · 84 kB</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-500 px-1">
                  <span className="font-mono-num">17:30</span>
                  <CheckCheck className="w-3 h-3 text-sky-500" />
                </div>
              </div>
            )}

            {visibleStep >= 2 && (
              <div className="step-enter self-end max-w-[92%] bg-[#D9FDD3] rounded-xl rounded-tr-xs px-2.5 py-1.5 shadow-2xs text-[11px] text-slate-800">
                <p>Boa tarde, Dona Márcia! Segue o orçamento detalhado 🙂</p>
                <div className="flex items-center justify-end gap-1 mt-0.5 text-[9px] text-slate-500">
                  <span className="font-mono-num">17:30</span>
                  <CheckCheck className="w-3 h-3 text-sky-500" />
                </div>
              </div>
            )}

            {visibleStep >= 3 && (
              <div className="step-enter self-start max-w-[90%] bg-white rounded-xl rounded-tl-xs px-2.5 py-1.5 shadow-2xs text-[11px] text-slate-800">
                <p>Nossa, ficou muito profissional! 😍</p>
                <div className="flex items-center justify-end mt-0.5 text-[9px] text-slate-400">
                  <span className="font-mono-num">17:31</span>
                </div>
              </div>
            )}

            {visibleStep >= 4 && (
              <div className="step-enter self-start max-w-[90%] bg-white rounded-xl rounded-tl-xs px-2.5 py-1.5 shadow-2xs text-[11px] text-slate-800">
                <p>Pode vir instalar, qual dia você tem livre?</p>
                <div className="flex items-center justify-end mt-0.5 text-[9px] text-slate-400">
                  <span className="font-mono-num">17:31</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-emerald-50 border-t border-emerald-200 px-3 py-2.5 text-center">
            <p className="text-xs font-bold text-emerald-800">O cliente fechou na hora. 🤝</p>
          </div>
        </div>
      </div>

      {/* Faixa de Destaque */}
      <div className="rounded-2xl bg-[#0B4FC0] text-white px-4 py-3 text-center shadow-sm">
        <p className="font-display text-sm font-bold tracking-tight">
          A diferença entre perder e fechar o serviço
        </p>
      </div>
    </div>
  );
};
