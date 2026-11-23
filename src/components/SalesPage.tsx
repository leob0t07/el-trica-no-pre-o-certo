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
  ShieldAlert,
} from 'lucide-react';
import { SERVICE_CHIPS, SEM_LIST, COM_LIST, FAQ_ITEMS } from '../data/quizData';
import { WhatsAppComparison } from './WhatsAppComparison';
import { GuaranteeSealSvg } from './GuaranteeSealSvg';
import { SocialProofSection } from './SocialProofSection';
import antesImg from '../assets/optimized/antes.webp';
import depoisImg from '../assets/optimized/depois.webp';
import quadroCampoImg from '../assets/optimized/eletricista_quadro_campo.webp';
import celularObraImg from '../assets/optimized/eletricista_celular_obra.webp';

const CHECKOUT_URL = 'https://pay.kiwify.com.br/3RYjUgj';

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
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
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

      <div className="px-4 sm:px-6 space-y-10 pt-5">
        {/* BLOCO 1 (FUNDO CLARO): Alerta de Dor + Hero da Oferta */}
        <section className="space-y-6">
          {/* Alerta compacto em vermelho/âmbar suave */}
          <div className="rounded-2xl bg-gradient-to-br from-red-50 to-amber-50/90 border border-red-200/90 p-4 sm:p-5 space-y-3 shadow-xs max-w-2xl mx-auto">
            <div className="flex items-start gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <h3 className="font-display text-[15px] sm:text-base leading-snug font-extrabold text-red-900 pt-0.5">
                ⚠️ Atenção, Eletricista: Você pode estar perdendo dinheiro agora...
              </h3>
            </div>

            <ul className="space-y-2 text-[13px] sm:text-sm leading-snug text-slate-800">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 stroke-[2.75]" />
                </span>
                <span>
                  Não calcula todo o material miúdo (fitas, bornes, buchas) e toma prejuízo na compra.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 stroke-[2.75]" />
                </span>
                <span>
                  Faz contas de cabeça ou no caderno e demora horas para enviar o orçamento.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 stroke-[2.75]" />
                </span>
                <span>
                  Perde o serviço porque o cliente acha o preço confuso ou some no WhatsApp.
                </span>
              </li>
            </ul>
          </div>

          {/* Hero Split no Desktop / Empilhado no Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 space-y-4 text-center md:text-left">
              <h1 className="font-display text-[26px] sm:text-[32px] leading-[1.18] font-extrabold tracking-tight text-slate-900">
                Faça <strong className="text-[#0B4FC0]">orçamentos profissionais de elétrica</strong> em{' '}
                <mark className="bg-amber-200/80 text-slate-900 px-1.5 py-0.5 rounded-md">
                  1 minuto
                </mark>
                , só mandando um áudio
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#16A34A]">
                Acesso na hora · direto no seu WhatsApp (Sem mensalidade)
              </p>

              <div className="hidden md:block pt-2">
                <button
                  type="button"
                  onClick={scrollToOfferBox}
                  className="btn--pulse w-full sm:w-auto min-h-[56px] px-8 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-bold text-[17px] inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Garantir meu acesso</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mockup do PDF Gerado */}
            <div className="md:col-span-6 space-y-4">
              <div className="rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden">
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
                className="md:hidden btn--pulse w-full min-h-[56px] px-6 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.985] text-white font-display font-bold text-[17px] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Garantir meu acesso</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* BLOCO 2 (FAIXA AZUL MARINHO ESCURO): Comparação Visual Lado a Lado SEM O APP vs COM O APP */}
        <section className="rounded-3xl bg-[#011D52] text-white p-5 sm:p-6 space-y-5 shadow-lg">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Chega de perder dinheiro na ponta do lápis
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Veja a diferença entre improvisar no caderno e mandar um orçamento técnico gerado por áudio.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 items-stretch max-w-2xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-red-400/50 bg-slate-900 flex flex-col">
              <div className="bg-red-600/90 px-3 py-1.5 text-center">
                <span className="text-[11px] sm:text-xs font-extrabold tracking-wide text-white">
                  ✕ SEM O APP
                </span>
              </div>
              <img
                src={antesImg}
                alt="Sem o app: eletricista tomando prejuízo fazendo contas confusas no caderno"
                width={520}
                height={696}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover aspect-[3/4] block"
              />
            </div>

            <div className="rounded-2xl overflow-hidden border border-emerald-400/60 bg-slate-900 flex flex-col">
              <div className="bg-[#16A34A] px-3 py-1.5 text-center">
                <span className="text-[11px] sm:text-xs font-extrabold tracking-wide text-white">
                  ✓ COM O APP
                </span>
              </div>
              <img
                src={depoisImg}
                alt="Com o app: eletricista gravando áudio e fechando orçamento de R$ 1.150,00"
                width={520}
                height={696}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover aspect-[3/4] block"
              />
            </div>
          </div>
        </section>

        {/* BLOCO 3 (FUNDO CLARO): Foto de Campo (Inspecionando Quadro) + Benefícios Diretos */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Foto do eletricista inspecionando quadro/fiação */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col">
              <img
                src={quadroCampoImg}
                alt="Eletricista inspecionando quadro de distribuição com multímetro"
                width={800}
                height={597}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-56 md:h-full object-cover block"
              />
              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-xs font-semibold text-slate-700">
                Seu conhecimento técnico valorizado em cada item do orçamento.
              </div>
            </div>

            {/* 3 Cards de Benefícios */}
            <div className="md:col-span-7 space-y-3.5 flex flex-col justify-between">
              <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-1.5 shadow-xs">
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

              <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </span>
                  <h2 className="font-display text-base font-extrabold text-slate-900">
                    Envio direto no WhatsApp
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  Com um toque o orçamento vai pro cliente no WhatsApp. O cliente recebe um documento detalhado em PDF com seus dados e confia muito mais no seu serviço.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2 shadow-xs">
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
            </div>
          </div>

          {/* Simulação Animada WhatsApp Antes vs Depois */}
          <WhatsAppComparison />
        </section>

        {/* BLOCO 4 (FAIXA AZUL MARINHO ESCURO): Foto em Campo com Celular + Demonstração em 3 Passos */}
        <section className="rounded-3xl bg-[#0F172A] text-white p-5 sm:p-6 space-y-6 shadow-lg">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Veja como funciona na prática dentro da obra
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Feito para usar com uma mão só, entre uma medição e outra, sem perder tempo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Foto do eletricista usando o celular em campo */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-md">
              <img
                src={celularObraImg}
                alt="Eletricista na obra gravando áudio no celular para gerar orçamento"
                width={800}
                height={597}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-60 md:h-72 object-cover block"
              />
              <div className="px-3.5 py-2.5 bg-slate-800/90 border-t border-slate-700 text-xs font-semibold text-blue-200">
                Você fala o serviço no celular e o sistema faz o cálculo na hora.
              </div>
            </div>

            {/* Demonstração em 3 Passos */}
            <div className="md:col-span-7 space-y-3">
              <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-4 flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#0B4FC0] text-white font-display font-extrabold text-sm flex items-center justify-center shrink-0">
                  1
                </span>
                <div className="space-y-0.5">
                  <h3 className="font-display text-sm sm:text-base font-bold text-white">
                    1. Fale o áudio
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Aperte o microfone e diga o nome do cliente, os pontos, quadros, cabos e disjuntores que vai instalar.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-4 flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#2563EB] text-white font-display font-extrabold text-sm flex items-center justify-center shrink-0">
                  2
                </span>
                <div className="space-y-0.5">
                  <h3 className="font-display text-sm sm:text-base font-bold text-white">
                    2. Confira materiais, mão de obra e margem
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    O app separa fios, disjuntores, conduítes, acessórios miúdos, sua mão de obra e margem de lucro — tudo editável com um toque.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800/80 border border-emerald-500/40 p-4 flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#16A34A] text-white font-display font-extrabold text-sm flex items-center justify-center shrink-0">
                  3
                </span>
                <div className="space-y-0.5">
                  <h3 className="font-display text-sm sm:text-base font-bold text-white">
                    3. Envie o PDF no WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Gere o PDF timbrado com seu nome e telefone e envie direto no WhatsApp do cliente em menos de 1 minuto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCO 5 (FUNDO CLARO): Contraste de Rotina (Vermelho Dor vs Verde Solução) */}
        <section className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* SEM */}
            <div className="rounded-2xl bg-red-50/80 border border-red-200 p-4 sm:p-5 space-y-3">
              <h3 className="font-display text-sm sm:text-base font-extrabold text-red-800">
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
            <div className="rounded-2xl bg-emerald-50/85 border border-emerald-200 p-4 sm:p-5 space-y-3">
              <h3 className="font-display text-sm sm:text-base font-extrabold text-emerald-900">
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
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs text-center max-w-2xl mx-auto">
            <h3 className="font-display text-lg font-extrabold text-slate-900">
              O problema não é falta de serviço…
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Trabalhar o dia inteiro no sol ou no forro quente e sobrar pouco dinheiro acontece porque{' '}
              <strong className="text-slate-900">
                sem cálculo detalhado você esquece material e perde autoridade na hora de cobrar.
              </strong>
            </p>
          </div>
        </section>

        {/* BLOCO 6: Nova Seção de Depoimentos (Estilo Print Escuro + Foto da Obra) */}
        <SocialProofSection onScrollToOffer={scrollToOfferBox} />

        {/* BLOCO 7: Ancoragem e Box de Oferta Irresistível */}
        <section id="checkout-box" className="space-y-4 scroll-mt-20 max-w-xl mx-auto">
          <div className="rounded-2xl bg-[#0B4FC0] text-white p-4 text-center space-y-1 shadow-sm">
            <p className="text-xs font-extrabold tracking-wide uppercase text-amber-300">
              Pagamento único · SEM MENSALIDADE · SEM TAXAS
            </p>
            <p className="font-display text-base font-bold">
              Você paga UMA vez e o app é seu para sempre!
            </p>
          </div>

          <div className="rounded-2xl bg-white border-2 border-[#0B4FC0] p-5 sm:p-6 space-y-5 shadow-lg relative">
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

        {/* BLOCO 8: Garantia Incondicional de 7 Dias (Fundo Escuro #011D52) */}
        <section className="rounded-3xl bg-[#011D52] text-white p-6 sm:p-8 space-y-4 text-center shadow-lg">
          <GuaranteeSealSvg />
          <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-wide text-white">
            Garantia Incondicional de 7 Dias
          </h2>
          <p className="text-sm leading-relaxed text-slate-200 max-w-2xl mx-auto">
            Você acessa o Elétrica no Preço Certo agora, usa por 7 dias, faz orçamentos na obra, manda PDF pro cliente, testa tudo à vontade. Se nesses 7 dias você achar que o app não valeu cada centavo que pagou (por qualquer motivo, sem precisar explicar nada), é só mandar uma mensagem e a gente devolve 100% do seu dinheiro.{' '}
            <strong className="text-amber-300 font-bold">
              Sem pergunta, sem burocracia, sem encheção de saco.
            </strong>
          </p>
        </section>

        {/* BLOCO 9: Perguntas Frequentes (Accordion <details>/<summary>) */}
        <section className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 text-center">
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
