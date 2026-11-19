import React, { useRef, useState } from 'react';
import {
  ArrowDown,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  FileText,
  X,
  ZoomIn,
} from 'lucide-react';
import obraChuveiroImg from '../assets/images/obra_chuveiro_disjuntor_1795111467035.jpg';
import quadroCampoImg from '../assets/images/eletricista_quadro_campo_1795111467710.jpg';
import dep01eImg from '../images/dep01e.jpg';
import dep02eImg from '../images/dep02e.jpg';
import dep03eImg from '../images/dep03e.jpg';
import dep04eImg from '../images/dep04e.jpg';

export interface PrintSlotItem {
  id: number;
  slotLabel: string;
  contactName: string;
  serviceContext: string;
  photoSrc: string;
  photoAlt: string;
  pdfName: string;
  pdfMeta: string;
  sentTime: string;
  clientReply: string;
  replyTime: string;
  /**
   * Opcional: se quiser substituir o card escuro simulado por uma imagem de print pronto,
   * basta importar a imagem e passar aqui (ex: customPrintImage: meuPrint1).
   */
  customPrintImage?: string;
}

const PRINT_SLOTS: PrintSlotItem[] = [
  {
    id: 1,
    slotLabel: '[INSERIR IMAGEM DO PRINT 1]',
    contactName: 'Eletricista · Obra Residencial',
    serviceContext: 'Quadro de Distribuição · Áudio na Obra',
    photoSrc: quadroCampoImg,
    photoAlt: 'Print de conversa no WhatsApp mostrando quadro elétrico e envio de orçamento por áudio na obra',
    pdfName: 'Orcamento-Eletrica-Obra.pdf',
    pdfMeta: '1 página · 184 kB',
    sentTime: '08:20',
    clientReply: 'Falei o serviço num áudio e o app montou o PDF. Já mandei no zap na hora.',
    replyTime: '08:21',
    customPrintImage: dep01eImg,
  },
  {
    id: 2,
    slotLabel: '[INSERIR IMAGEM DO PRINT 2]',
    contactName: 'Eletricista · Reforma Elétrica',
    serviceContext: 'Disjuntor DR, Cabo e Mão de Obra',
    photoSrc: quadroCampoImg,
    photoAlt: 'Print de conversa no WhatsApp sobre conferência de disjuntor DR, cabo e mão de obra no app',
    pdfName: 'Orcamento-Eletrica-DR.pdf',
    pdfMeta: '1 página · 182 kB',
    sentTime: '13:29',
    clientReply: 'No app apareceu disjuntor DR, cabo e mão de obra. Agora eu confiro tudo antes de enviar.',
    replyTime: '13:30',
    customPrintImage: dep02eImg,
  },
  {
    id: 3,
    slotLabel: '[INSERIR IMAGEM DO PRINT 3]',
    contactName: 'Eletricista · Quadro Novo',
    serviceContext: 'Troca de Quadro · Fechou na Hora',
    photoSrc: quadroCampoImg,
    photoAlt: 'Print de conversa no WhatsApp mostrando quadro finalizado após orçamento gravado na obra',
    pdfName: 'Orcamento-Quadro-Eletrica.pdf',
    pdfMeta: '1 página · 195 kB',
    sentTime: '18:11',
    clientReply: 'Gravei o áudio na obra e saiu certinho. Cliente fechou na hora e já me indicou.',
    replyTime: '18:12',
    customPrintImage: dep03eImg,
  },
  {
    id: 4,
    slotLabel: '[INSERIR IMAGEM DO PRINT 4]',
    contactName: 'Eletricista · Infraestrutura',
    serviceContext: 'PDF Separado · Sem Choro de Desconto',
    photoSrc: obraChuveiroImg,
    photoAlt: 'Print de conversa no WhatsApp mostrando instalação em eletrocalha e Pix recebido sem choro',
    pdfName: 'Orcamento-Instalacao-PDF.pdf',
    pdfMeta: '1 página · 210 kB',
    sentTime: '16:55',
    clientReply: 'O cliente abriu o PDF e viu tudo separado. Sem choro de desconto e o Pix já foi com o valor certo.',
    replyTime: '16:57',
    customPrintImage: dep04eImg,
  },
];

interface SocialProofSectionProps {
  onScrollToOffer: () => void;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({
  onScrollToOffer,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomedItem, setZoomedItem] = useState<PrintSlotItem | null>(null);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;

    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  };

  const scrollToSlide = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(PRINT_SLOTS.length - 1, idx));
    const target = el.children[clamped] as HTMLElement | undefined;
    if (target) {
      el.scrollTo({
        left: target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2,
        behavior: 'smooth',
      });
      setActiveIndex(clamped);
    }
  };

  const renderChatCard = (item: PrintSlotItem, isZoomed = false) => {
    if (item.customPrintImage) {
      return (
        <div className="rounded-2xl bg-[#0B141A] border border-slate-700/80 shadow-lg overflow-hidden flex flex-col h-full">
          <button
            type="button"
            onClick={() => !isZoomed && setZoomedItem(item)}
            aria-label={`Ampliar ${item.contactName}`}
            className={`relative group block w-full bg-[#0B141A] ${
              isZoomed ? 'cursor-default' : 'cursor-pointer flex-1'
            }`}
          >
            <img
              src={item.customPrintImage}
              alt={item.photoAlt}
              referrerPolicy="no-referrer"
              className={`w-full block bg-[#0B141A] ${
                isZoomed
                  ? 'max-h-[82vh] object-contain'
                  : 'h-[430px] object-contain'
              }`}
            />
            {!isZoomed && (
              <span className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-slate-950/75 text-white flex items-center justify-center">
                <ZoomIn className="w-4 h-4" />
              </span>
            )}
          </button>
          <div className="px-3 py-2 bg-[#111B21] border-t border-slate-800 flex items-center justify-between gap-2 text-[11px]">
            <span className="font-semibold text-slate-200 truncate">{item.serviceContext}</span>
            <span className="text-[10px] font-bold text-emerald-400 shrink-0">Aprovado ✓</span>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-2xl bg-[#0B141A] border border-slate-700/80 shadow-lg overflow-hidden flex flex-col h-full text-left">
        {/* Top Bar Escura estilo WhatsApp */}
        <div className="bg-[#202C33] px-3.5 py-2.5 flex items-center justify-between gap-2 border-b border-slate-700/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#00A884]/20 border border-[#00A884]/40 text-[#00A884] font-display text-xs font-extrabold flex items-center justify-center shrink-0">
              {item.contactName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-100 truncate">{item.contactName}</p>
              <p className="text-[10px] text-emerald-400/90 truncate">{item.serviceContext}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setZoomedItem(item)}
            aria-label={`Ampliar conversa de ${item.contactName}`}
            className="w-7 h-7 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Corpo do Chat Escuro */}
        <div className="p-3 space-y-2.5 flex-1 flex flex-col justify-between bg-[#0B141A]">
          <div className="space-y-2.5">
            {/* Foto da obra dentro da conversa */}
            <div className="self-end ml-auto max-w-[88%] rounded-xl rounded-tr-xs bg-[#005C4B] p-1 shadow-sm">
              <div className="rounded-lg overflow-hidden bg-slate-900">
                <img
                  src={item.photoSrc}
                  alt={item.photoAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover block"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-1.5 pt-1 text-[9px] text-emerald-100/80">
                <span className="truncate font-mono-num">{item.slotLabel}</span>
                <span className="inline-flex items-center gap-0.5 shrink-0 font-mono-num">
                  {item.sentTime}
                  <CheckCheck className="w-3 h-3 text-sky-400" />
                </span>
              </div>
            </div>

            {/* Envio do PDF */}
            <div className="ml-auto max-w-[92%] rounded-xl rounded-tr-xs bg-[#005C4B] p-2 shadow-sm">
              <div className="bg-[#025144] rounded-lg p-2 flex items-center gap-2 border border-white/10">
                <span className="w-7 h-7 rounded-md bg-red-500/90 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white truncate">{item.pdfName}</p>
                  <p className="text-[9px] text-emerald-100/75">{item.pdfMeta}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-emerald-100/80 font-mono-num">
                <span>{item.sentTime}</span>
                <CheckCheck className="w-3 h-3 text-sky-400" />
              </div>
            </div>

            {/* Resposta natural do cliente */}
            <div className="mr-auto max-w-[92%] rounded-xl rounded-tl-xs bg-[#202C33] px-3 py-2 shadow-sm border border-white/5">
              <p className="text-xs leading-relaxed text-slate-100">{item.clientReply}</p>
              <div className="flex items-center justify-end mt-1 text-[9px] text-slate-400 font-mono-num">
                <span>{item.replyTime}</span>
              </div>
            </div>
          </div>

          {/* Rodapé de status do slot */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 font-medium">Orçamento em PDF enviado</span>
            <span className="text-emerald-400 font-bold">Fechado ✓</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      aria-labelledby="prova-social-titulo"
      className="rounded-3xl bg-slate-100 border border-slate-200/90 px-4 py-7 sm:px-6 space-y-6 shadow-xs"
    >
      {/* Cabeçalho da Seção */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2
          id="prova-social-titulo"
          className="font-display text-[21px] sm:text-[26px] leading-[1.22] font-extrabold tracking-tight text-slate-900"
        >
          O que acontece quando o orçamento chega organizado no WhatsApp
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
          Prints reais de usuários que já estão fechando serviços direto pelo WhatsApp, sem choro de desconto.
        </p>
      </div>

      {/* MOBILE: Carrossel horizontal com setas laterais + bolinhas */}
      <div className="md:hidden space-y-3">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 -mx-1 px-1"
        >
          {PRINT_SLOTS.map((item) => (
            <div key={item.id} className="w-[84%] shrink-0 snap-center">
              {renderChatCard(item)}
            </div>
          ))}
        </div>

        {/* Setas laterais + bolinhas */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={() => scrollToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Print anterior"
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-35 hover:bg-slate-50 cursor-pointer disabled:cursor-default transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
            {PRINT_SLOTS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === idx}
                aria-label={`Ver print ${idx + 1}`}
                onClick={() => scrollToSlide(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'w-6 bg-[#0B4FC0]'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSlide(activeIndex + 1)}
            disabled={activeIndex === PRINT_SLOTS.length - 1}
            aria-label="Próximo print"
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-35 hover:bg-slate-50 cursor-pointer disabled:cursor-default transition-colors shadow-2xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* DESKTOP: Grade responsiva para os 4 prints */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRINT_SLOTS.map((item) => (
          <div key={item.id}>{renderChatCard(item)}</div>
        ))}
      </div>

      {/* Elemento de Fechamento da Seção */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 text-center space-y-3 shadow-2xs max-w-xl mx-auto">
        <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
          ⭐ Mais de 500 orçamentos profissionais gerados e aprovados nas primeiras semanas de teste.
        </p>

        <button
          type="button"
          onClick={onScrollToOffer}
          className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-xl border border-[#0B4FC0]/30 bg-blue-50/70 hover:bg-blue-100/80 text-[#0B4FC0] font-display font-bold text-sm inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Quero começar a usar agora</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* Lightbox para leitura ampliada */}
      {zoomedItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={zoomedItem.contactName}
          onClick={() => setZoomedItem(null)}
        >
          <div
            className="relative w-full max-w-[380px] rounded-2xl overflow-hidden shadow-2xl step-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomedItem(null)}
              aria-label="Fechar visualização ampliada"
              className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {renderChatCard(zoomedItem, true)}
          </div>
        </div>
      )}
    </section>
  );
};
