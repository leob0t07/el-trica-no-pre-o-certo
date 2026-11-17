import React, { useState } from 'react';
import {
  Zap,
  RotateCcw,
  FileText,
  Send,
  Mic,
  Check,
  X,
  ChevronDown,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { SERVICE_CHIPS, SEM_LIST, COM_LIST, FAQ_ITEMS } from '../data/quizData';
import { WhatsAppComparison } from './WhatsAppComparison';
import { GuaranteeSealSvg } from './GuaranteeSealSvg';

const CHECKOUT_URL = 'https://pay.cakto.com.br/vfmiza6_1320431';

interface SalesPageProps {
  onRestartQuiz: () => void;
}

export const SalesPage: React.FC<SalesPageProps> = ({ onRestartQuiz }) => {
  const [pdfToast, setPdfToast] = useState(false);

  const trackInitiateCheckout = () => {
    window.dispatchEvent(
      new CustomEvent('InitiateCheckout', {
        detail: { value: 29.9, currency: 'BRL', product: 'Elétrica no Preço Certo' },
      })
    );
    const w = window as unknown as {
      fbq?: (action: string, event: string, data?: Record<string, unknown>) => void;
    };
    if (typeof w.fbq === 'function') {
      w.fbq('track', 'InitiateCheckout', { value: 29.9, currency: 'BRL' });
    }
  };

  const scrollToOfferBox = () => {
    const el = document.getElementById('checkout-box');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div id="oferta" className="step-enter pb-12">
      {/* Barra Superior */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onRestartQuiz}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refazer quiz</span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-lg bg-[#0B4FC0] text-white flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4 fill-current" />
          </span>
          <span className="font-display font-bold text-sm tracking-tight text-slate-900 whitespace-nowrap">
            Elétrica no Preço Certo
          </span>
        </div>
      </header>

      <div className="px-4 space-y-10 pt-6">
        {/* SEÇÃO 1: Hero da Oferta */}
        <section className="space-y-4">
          <div className="text-center space-y-2.5">
            <h1 className="font-display text-[25px] sm:text-[28px] leading-[1.2] font-extrabold tracking-tight text-slate-900">
              Faça <strong className="text-[#0B4FC0]">orçamentos profissionais de elétrica</strong> em{' '}
              <mark className="bg-amber-200/80 text-slate-900 px-1.5 py-0.5 rounded-md">
                1 minuto
              </mark>
              , só mandando um áudio
            </h1>
            <p className="text-xs font-semibold text-[#16A34A]">
              Acesso na hora · direto no seu WhatsApp
            </p>
          </div>

          {/* Card Hero Visual (Mockup do PDF Gerado) */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden">
            {/* Cabeçalho do PDF */}
            <div className="bg-[#0B4FC0] text-white px-4 py-3.5 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display text-sm font-extrabold truncate">
                  Elétrica no Preço Certo
                </p>
                <p className="text-xs text-blue-100 truncate">
                  Carlos Silva · Eletricista
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono-num text-xs font-semibold text-white">
                  (11) 98497-5100
                </p>
                <p className="text-[10px] text-blue-200">Orçamento #0428</p>
              </div>
            </div>

            {/* Itens do PDF */}
            <div className="p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                <span>Descrição do serviço e materiais</span>
                <span>Valor</span>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-800 font-medium">
                    Quadro de distribuição 12 disjuntores
                  </span>
                  <span className="font-mono-num font-bold text-slate-900 shrink-0">
                    R$ 380,00
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-800 font-medium">
                    Cabo flexível 2,5mm e 4mm (rolo/metros)
                  </span>
                  <span className="font-mono-num font-bold text-slate-900 shrink-0">
                    R$ 290,00
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-800 font-medium">
                    Disjuntores, DR e barramentos
                  </span>
                  <span className="font-mono-num font-bold text-slate-900 shrink-0">
                    R$ 210,00
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-800 font-medium">
                    Instalação de 6 pontos de tomada/luz
                  </span>
                  <span className="font-mono-num font-bold text-slate-900 shrink-0">
                    R$ 270,00
                  </span>
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="font-display text-sm font-extrabold text-slate-900">
                  Total
                </span>
                <span className="font-mono-num text-xl font-extrabold text-[#0B4FC0]">
                  R$ 1.150,00
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPdfToast(true);
                  window.setTimeout(() => setPdfToast(false), 2600);
                }}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Enviar por WhatsApp</span>
              </button>

              {pdfToast && (
                <p className="text-center text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg py-1.5 px-2 step-enter">
                  Simulação: PDF pronto e enviado em 1 toque no WhatsApp do cliente!
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToOfferBox}
            className="btn--pulse w-full min-h-[56px] px-6 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-bold text-[17px] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Garantir meu acesso</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>

        {/* SEÇÃO 2: Benefícios Diretos (3 Cards) */}
        <section className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-blue-50 text-[#0B4FC0] flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </span>
              <h2 className="font-display text-base font-extrabold text-slate-900">
                Orçamento automático por áudio
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              Você só precisa gravar um áudio falando a instalação e pronto! Acabou a conta de cabeça e o caderno. Enquanto o concorrente ainda está somando fio, você já mandou o orçamento pro cliente.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </span>
              <h2 className="font-display text-base font-extrabold text-slate-900">
                Envio direto no WhatsApp
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              Com um toque o orçamento vai pro cliente no WhatsApp. É tão rápido quanto mandar um áudio. O cliente recebe um orçamento detalhado em PDF e confia mais no seu serviço.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </span>
              <h2 className="font-display text-base font-extrabold text-slate-900">
                Todos os serviços de elétrica em um lugar só
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-slate-700 font-medium">
              {SERVICE_CHIPS.join(' · ')} e muito mais.
            </p>
          </div>
        </section>

        {/* SEÇÃO 3: Simulação Animada de Conversa no WhatsApp */}
        <section>
          <WhatsAppComparison />
        </section>

        {/* SEÇÃO 4: Contraste de Rotina (SEM vs. COM) */}
        <section className="space-y-4">
          {/* SEM */}
          <div className="rounded-2xl bg-red-50/70 border border-red-200 p-4 space-y-3">
            <h3 className="font-display text-sm font-extrabold text-red-800">
              Sua vida SEM O ELÉTRICA NO PREÇO CERTO
            </h3>
            <ul className="space-y-2">
              {SEM_LIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-800 leading-snug">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[2.75]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* COM */}
          <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200 p-4 space-y-3">
            <h3 className="font-display text-sm font-extrabold text-emerald-900">
              Sua vida COM O ELÉTRICA NO PREÇO CERTO
            </h3>
            <ul className="space-y-2">
              {COM_LIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-800 leading-snug">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SEÇÃO 5: Agitação Final e Apresentação da Solução */}
        <section className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-xs">
            <h2 className="font-display text-xl font-extrabold text-slate-900 leading-snug">
              Se você é eletricista, provavelmente já passou por isso…
            </h2>
            <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Já teve prejuízo porque calculou metragem de cabo errado;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Já demorou horas em casa montando lista de material;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Já perdeu serviço porque mandou preço solto no WhatsApp;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Já trabalhou o dia inteiro no sol ou no forro quente e no final sobrou pouco dinheiro.</span>
              </li>
            </ul>

            <p className="pt-2 border-t border-slate-100 text-sm text-slate-700 leading-relaxed">
              O problema não é falta de serviço…{' '}
              <strong className="text-slate-900">
                O problema é não saber calcular e apresentar o orçamento certo.
              </strong>
            </p>
          </div>

          {/* Card de Apresentação */}
          <div className="rounded-2xl bg-blue-50/80 border border-blue-200 p-4 space-y-3">
            <h3 className="font-display text-base font-extrabold text-[#0B4FC0]">
              Conheça o Elétrica no Preço Certo
            </h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="bg-white rounded-xl border border-blue-100 px-3.5 py-2.5 font-semibold text-slate-800">
                1. Grave o áudio
              </div>
              <div className="bg-white rounded-xl border border-blue-100 px-3.5 py-2.5 font-semibold text-slate-800">
                2. Confira os materiais e valores
              </div>
              <div className="bg-white rounded-xl border border-blue-100 px-3.5 py-2.5 font-semibold text-slate-800">
                3. O orçamento em PDF fica pronto
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 6: Ancoragem e Box de Oferta Irresistível */}
        <section id="checkout-box" className="space-y-4 scroll-mt-20">
          <div className="rounded-2xl bg-[#0B4FC0] text-white p-4 text-center space-y-1 shadow-sm">
            <p className="text-xs font-extrabold tracking-wide uppercase text-amber-300">
              Pagamento único · SEM MENSALIDADE · SEM TAXAS
            </p>
            <p className="font-display text-base font-bold">
              Você paga UMA vez e o app é seu para sempre!
            </p>
          </div>

          <div className="rounded-2xl bg-white border-2 border-[#0B4FC0] p-5 space-y-5 shadow-lg relative">
            <div className="space-y-2.5">
              <p className="font-display text-sm font-extrabold text-slate-900">
                O que você vai receber no seu WhatsApp:
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                {[
                  'Aplicativo de orçamento por áudio',
                  'Criador de orçamento profissional em PDF',
                  'Calculadora automática de materiais elétricos (cabos, disjuntores, conduítes)',
                  'Atualizações gratuitas',
                  'Suporte técnico direto',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] stroke-[3] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 text-center space-y-2">
              <div className="inline-block bg-emerald-100 text-emerald-800 font-mono-num text-xs font-extrabold px-3 py-1 rounded-lg">
                85% OFF
              </div>
              <p className="text-sm text-slate-600">
                Tudo isso de <span className="line-through text-slate-400 font-semibold">R$ 197,00</span> por apenas
              </p>
              <p className="font-mono-num text-[44px] leading-none font-extrabold text-[#16A34A] tracking-tight">
                R$ 29,90
              </p>
              <p className="text-xs font-semibold text-slate-600">
                Pagamento único · sem mensalidade · sem surpresa
              </p>
              <p className="text-xs font-bold text-[#0B4FC0]">
                Você economiza R$ 167,10
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackInitiateCheckout}
                className="btn--pulse w-full min-h-[58px] px-6 py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-extrabold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Garantir meu acesso</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-center text-xs font-semibold text-slate-500 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>🔒 Compra segura · Garantia de 7 dias</span>
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO 7: Garantia Incondicional de 7 Dias (Fundo Escuro #011D52) */}
        <section className="rounded-3xl bg-[#011D52] text-white p-6 space-y-4 text-center shadow-lg">
          <GuaranteeSealSvg />
          <h2 className="font-display text-xl font-extrabold tracking-wide text-white">
            Garantia Incondicional de 7 Dias
          </h2>
          <p className="text-sm leading-relaxed text-slate-200">
            Você acessa o Elétrica no Preço Certo agora, usa por 7 dias, faz orçamentos na obra, manda PDF pro cliente, testa tudo à vontade. Se nesses 7 dias você achar que o app não valeu cada centavo que pagou (por qualquer motivo, sem precisar explicar nada), é só mandar uma mensagem e a gente devolve 100% do seu dinheiro.{' '}
            <strong className="text-amber-300 font-bold">
              Sem pergunta, sem burocracia, sem encheção de saco.
            </strong>
          </p>
        </section>

        {/* SEÇÃO 8: Perguntas Frequentes (Accordion <details>/<summary>) */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-extrabold text-slate-900 text-center">
            Perguntas Frequentes
          </h2>

          <div className="space-y-2.5">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden"
              >
                <summary className="list-none px-4 py-3.5 flex items-center justify-between gap-3 cursor-pointer font-display text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                  <span>{item.q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 pt-1 text-sm leading-relaxed text-slate-600 border-t border-slate-100">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          {/* Fechamento + CTA Final */}
          <div className="pt-3 space-y-3">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackInitiateCheckout}
              className="btn--pulse w-full min-h-[58px] px-6 py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-extrabold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Garantir meu acesso</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-center text-xs text-slate-500">
              Elétrica no Preço Certo · Acesso vitalício por R$ 29,90
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
