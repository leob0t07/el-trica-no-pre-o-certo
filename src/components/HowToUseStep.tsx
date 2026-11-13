import React, { useState } from 'react';
import { ArrowRight, Mic, FileText, Send, Plus, Minus } from 'lucide-react';

interface HowToUseStepProps {
  onNext: () => void;
}

export const HowToUseStep: React.FC<HowToUseStepProps> = ({ onNext }) => {
  const [isRecording, setIsRecording] = useState(true);
  const [cableMeters, setCableMeters] = useState(50);

  const cablePrice = cableMeters * 3.8;
  const breakerPrice = 180;
  const laborPrice = 420;
  const total = cablePrice + breakerPrice + laborPrice;

  const formatBRL = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <section id="como-usar" className="step-enter px-4 pt-5 pb-8 space-y-5">
      <div className="text-center">
        <h2 className="font-display text-[22px] sm:text-[24px] leading-[1.25] font-extrabold tracking-tight text-slate-900">
          Veja como é fácil usar o aplicativo <span className="hl">Elétrica no Preço Certo</span>
        </h2>
      </div>

      <div className="space-y-4">
        {/* Passo 1 de 3 */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-xs">
          <div className="space-y-1">
            <p className="text-xs font-bold text-[#0B4FC0]">Passo 1 de 3 — Fale o serviço</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Grave um áudio falando o cliente, o tipo de instalação e os materiais. O app entende tudo e monta o orçamento.
            </p>
          </div>

          {/* Visual interativo: Microfone + Waveform */}
          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsRecording((v) => !v)}
              aria-label={isRecording ? 'Pausar simulação de gravação' : 'Testar gravação de áudio'}
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                isRecording
                  ? 'bg-[#0B4FC0] text-white shadow-sm'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 h-5 mb-1" aria-hidden="true">
                {[0.35, 0.75, 1, 0.55, 0.9, 0.6, 0.85, 0.4, 0.95, 0.7, 0.5, 0.8].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-[#2563EB] ${isRecording ? 'wave-bar' : ''}`}
                    style={{
                      height: `${Math.round(h * 18)}px`,
                      animationDelay: `${i * 70}ms`,
                    }}
                  />
                ))}
              </div>
              <p className="text-[11px] text-slate-600 truncate">
                {isRecording ? 'Gravando: “Dona Márcia, quadro + 50m cabo...”' : 'Toque no microfone para simular'}
              </p>
            </div>
          </div>
        </div>

        {/* Passo 2 de 3 */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-xs">
          <div className="space-y-1">
            <p className="text-xs font-bold text-[#0B4FC0]">Passo 2 de 3 — Confira o orçamento</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Cabos, disjuntores, mão de obra e margem de lucro já prontos. Toque em qualquer item se quiser ajustar.
            </p>
          </div>

          {/* Visual interativo: Card editável */}
          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 truncate">Cabo Flexível 2,5mm</p>
                <p className="text-[11px] text-slate-500">Toque para testar ajuste ({cableMeters}m)</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setCableMeters((m) => Math.max(10, m - 10))}
                  aria-label="Diminuir metros de cabo"
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono-num text-xs font-bold text-slate-900 w-16 text-right">
                  {formatBRL(cablePrice)}
                </span>
                <button
                  type="button"
                  onClick={() => setCableMeters((m) => Math.min(200, m + 10))}
                  aria-label="Aumentar metros de cabo"
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Disjuntores + Barramento</span>
              <span className="font-mono-num font-semibold text-slate-800">{formatBRL(breakerPrice)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Mão de obra + Lucro</span>
              <span className="font-mono-num font-semibold text-slate-800">{formatBRL(laborPrice)}</span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Total calculado</span>
              <span className="font-mono-num text-sm font-extrabold text-[#0B4FC0]">
                {formatBRL(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Passo 3 de 3 */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-xs">
          <div className="space-y-1">
            <p className="text-xs font-bold text-[#0B4FC0]">Passo 3 de 3 — Envie no WhatsApp</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              O cliente recebe o orçamento em PDF timbrado com seu nome e aprova respondendo a mensagem.
            </p>
          </div>

          {/* Visual: PDF + Botão verde WhatsApp */}
          <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">Orcamento-PDF.pdf</p>
                <p className="text-[11px] text-slate-500">Timbrado com seu nome</p>
              </div>
            </div>
            <span className="px-3 py-2 rounded-xl bg-[#16A34A] text-white text-xs font-bold inline-flex items-center gap-1.5 shrink-0">
              <Send className="w-3.5 h-3.5" />
              WhatsApp
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="btn--pulse w-full min-h-[56px] px-6 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-bold text-[17px] flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <span>Quero o aplicativo</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </section>
  );
};
