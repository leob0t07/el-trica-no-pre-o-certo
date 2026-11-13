import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Mic, FileText, Send } from 'lucide-react';

interface InteractiveDemoStepProps {
  onNext: () => void;
}

const DEMO_ITEMS = [
  { name: 'Cabo Flexível 2,5mm (100m)', qty: '1 rolo', price: 'R$ 240,00' },
  { name: 'Disjuntor Bipolar 32A + Barramento', qty: '3 unid.', price: 'R$ 190,00' },
  { name: 'Mão de Obra Técnica Especializada', qty: 'Instalação', price: 'R$ 460,00' },
];

export const InteractiveDemoStep: React.FC<InteractiveDemoStepProps> = ({ onNext }) => {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const durations = [2600, 2600, 3200];
    const timer = window.setTimeout(() => {
      setPhase((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, durations[phase]);
    return () => window.clearTimeout(timer);
  }, [phase, paused]);

  const selectPhase = (target: 0 | 1 | 2) => {
    setPaused(true);
    setPhase(target);
  };

  return (
    <section id="orcamento-detalhado" className="step-enter px-4 pt-5 pb-8 space-y-5">
      <div className="text-center">
        <h2 className="font-display text-[22px] sm:text-[24px] leading-[1.25] font-extrabold tracking-tight text-slate-900">
          Seu orçamento precisa mostrar o <span className="hl">trabalho técnico</span> que está por trás do preço.
        </h2>
      </div>

      {/* Mockup Interativo em Moldura de Celular */}
      <div className="rounded-[24px] bg-slate-900 p-2.5 shadow-lg max-w-[340px] mx-auto border border-slate-800">
        {/* Phone speaker notch */}
        <div className="flex items-center justify-center pb-2">
          <div className="w-16 h-1.5 rounded-full bg-slate-700" />
        </div>

        {/* Phone Screen */}
        <div className="rounded-[18px] bg-white overflow-hidden border border-slate-800/40">
          {/* App Top Bar */}
          <div className="bg-[#0B4FC0] text-white px-3.5 py-2.5 flex items-center justify-between">
            <span className="text-xs font-bold tracking-tight">Elétrica no Preço Certo</span>
            <span className="font-mono-num text-[10px] text-blue-100">Simulação</span>
          </div>

          {/* Interactive Phase Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1.5 bg-slate-100 border-b border-slate-200">
            {[
              { id: 0 as const, label: '1. Áudio' },
              { id: 1 as const, label: '2. Itens' },
              { id: 2 as const, label: '3. PDF' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => selectPhase(tab.id)}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  phase === tab.id
                    ? 'bg-white text-[#0B4FC0] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Screen Body */}
          <div className="p-3.5 min-h-[235px] flex flex-col justify-between bg-slate-50/60">
            {/* Phase 0: Recording audio */}
            {phase === 0 && (
              <div className="step-enter flex-1 flex flex-col items-center justify-center text-center space-y-3 py-2">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-[#0B4FC0] flex items-center justify-center ring-4 ring-blue-50">
                  <Mic className="w-7 h-7" />
                </div>

                {/* Audio Waveform Bars */}
                <div className="flex items-center justify-center gap-1 h-7" aria-hidden="true">
                  {[0.4, 0.85, 0.6, 1, 0.5, 0.9, 0.7, 0.45, 0.95, 0.6, 0.8, 0.5].map((h, i) => (
                    <span
                      key={i}
                      className="wave-bar w-1 rounded-full bg-[#2563EB]"
                      style={{
                        height: `${Math.round(h * 24)}px`,
                        animationDelay: `${i * 75}ms`,
                      }}
                    />
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-2.5 text-left shadow-xs w-full">
                  <p className="text-[11px] font-semibold text-[#0B4FC0] mb-0.5">
                    Transcrevendo áudio...
                  </p>
                  <p className="text-xs text-slate-700 leading-snug italic">
                    “Instalação de quadro 12 disjuntores, 4 tomadas e chuveiro 220v...”
                  </p>
                </div>
              </div>
            )}

            {/* Phase 1: Items appearing */}
            {phase === 1 && (
              <div className="step-enter space-y-2">
                <p className="text-[11px] font-bold text-slate-500">
                  Materiais e mão de obra calculados:
                </p>
                <div className="space-y-1.5">
                  {DEMO_ITEMS.map((item, idx) => (
                    <div
                      key={item.name}
                      style={{ animationDelay: `${idx * 120}ms` }}
                      className="step-enter bg-white rounded-xl border border-slate-200 px-3 py-2 flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-500">{item.qty}</p>
                      </div>
                      <span className="font-mono-num text-xs font-bold text-slate-900 shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Phase 2: Total + WhatsApp PDF */}
            {phase === 2 && (
              <div className="step-enter flex-1 flex flex-col justify-between space-y-3">
                <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0B4FC0] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        Orcamento-Eletrica.pdf
                      </p>
                      <p className="text-[10px] text-slate-500">Quadro 12 disj. + 4 tomadas + 220v</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-600">
                    <div className="flex justify-between">
                      <span>Cabo Flexível 2,5mm</span>
                      <span className="font-mono-num font-medium">R$ 240,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disjuntor Bipolar</span>
                      <span className="font-mono-num font-medium">R$ 190,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mão de Obra</span>
                      <span className="font-mono-num font-medium">R$ 460,00</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Total do Orçamento</span>
                    <span className="font-mono-num text-base font-extrabold text-[#0B4FC0]">
                      R$ 890,00
                    </span>
                  </div>
                </div>

                <div className="w-full py-2.5 px-3 rounded-xl bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar PDF no WhatsApp</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lista de Checkmarks Verdes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <p className="text-xs font-bold text-slate-500">Assim, tudo fica mais claro:</p>
        <ul className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>
              <strong className="text-slate-900">Material separado:</strong> Cada metro de cabo, disjuntor, conduíte e tomada com seu preço, sem valor escondido.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>
              <strong className="text-slate-900">Serviços detalhados:</strong> O cliente vê exatamente tudo o que vai ser feito na rede elétrica.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>
              <strong className="text-slate-900">Mão de obra visível:</strong> O seu trabalho técnico aparece no orçamento e tem valor.
            </span>
          </li>
        </ul>
      </div>

      <p className="text-center text-[15px] text-slate-800 font-medium px-2">
        O cliente entende o que está pagando e{' '}
        <strong className="text-[#0B4FC0] font-extrabold">não pechincha!</strong>
      </p>

      <button
        type="button"
        onClick={onNext}
        className="btn--pulse w-full min-h-[56px] px-6 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-bold text-[17px] flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <span>Continuar</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </section>
  );
};
