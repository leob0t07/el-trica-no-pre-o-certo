import React, { useRef, useState } from 'react';
import { ArrowDown, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import dep01 from '../images/dep 01.jpg';
import dep02 from '../images/dep 02.jpg';
import dep03 from '../images/dep 03.jpg';
import dep04 from '../images/dep 04.jpg';

interface TestimonialPrint {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const PRINTS: TestimonialPrint[] = [
  {
    id: 1,
    src: dep01,
    alt: 'Print de WhatsApp com cliente elogiando orçamento em PDF e indicando para o cunhado',
    caption: 'Roberto Vizinho · Indicação na hora',
  },
  {
    id: 2,
    src: dep02,
    alt: 'Print de WhatsApp confirmando instalação elétrica residencial após envio do orçamento em PDF',
    caption: 'Julio Reforma · Confirmado pra segunda',
  },
  {
    id: 3,
    src: dep03,
    alt: 'Print de WhatsApp de cliente fechando troca de quadro elétrico sem pedir desconto',
    caption: 'Marcos · Fechou sem pedir desconto',
  },
  {
    id: 4,
    src: dep04,
    alt: 'Print de WhatsApp de engenheiro aprovando orçamento de instalação industrial sem choro',
    caption: 'Eng. Carlos · Valores aprovados na hora',
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
  const [zoomedPrint, setZoomedPrint] = useState<TestimonialPrint | null>(null);
  const [failedIds, setFailedIds] = useState<Record<number, boolean>>({});

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
    const clamped = Math.max(0, Math.min(PRINTS.length - 1, idx));
    const target = el.children[clamped] as HTMLElement | undefined;
    if (target) {
      el.scrollTo({
        left: target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2,
        behavior: 'smooth',
      });
      setActiveIndex(clamped);
    }
  };

  return (
    <section
      aria-labelledby="prova-social-titulo"
      className="rounded-3xl bg-slate-100/95 border border-slate-200/90 px-4 py-6 space-y-5 shadow-xs"
    >
      {/* Cabeçalho da Seção */}
      <div className="text-center space-y-2">
        <h2
          id="prova-social-titulo"
          className="font-display text-[20px] sm:text-[22px] leading-[1.24] font-extrabold tracking-tight text-slate-900"
        >
          Veja o que acontece quando o orçamento chega limpo e profissional...
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600">
          Prints reais de usuários que já estão fechando serviços direto pelo WhatsApp, sem choro de desconto.
        </p>
      </div>

      {/* Carrossel Responsivo Fluido com Snap e Indicadores */}
      <div className="relative space-y-3">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 -mx-1 px-1"
        >
          {PRINTS.map((item) => (
            <div
              key={item.id}
              className="w-[76%] sm:w-[70%] shrink-0 snap-center rounded-2xl bg-white border border-slate-200/90 shadow-md overflow-hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => setZoomedPrint(item)}
                aria-label={`Ampliar print: ${item.caption}`}
                className="relative group block w-full text-left cursor-pointer focus:outline-none"
              >
                {!failedIds[item.id] ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedIds((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className="w-full h-[360px] object-cover object-top block bg-slate-900"
                  />
                ) : (
                  <div className="w-full h-[360px] bg-slate-200 flex items-center justify-center p-4 text-center text-xs font-semibold text-slate-600">
                    {item.caption}
                  </div>
                )}

                <span className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-slate-950/65 text-white flex items-center justify-center backdrop-blur-xs opacity-90 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </button>

              <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-800 truncate">
                  {item.caption}
                </span>
                <span className="text-[10px] font-semibold text-[#16A34A] shrink-0">
                  Aprovado ✓
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Controles e Dots */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={() => scrollToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Print anterior"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-35 hover:bg-slate-50 cursor-pointer disabled:cursor-default transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
            {PRINTS.map((item, idx) => (
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
            disabled={activeIndex === PRINTS.length - 1}
            aria-label="Próximo print"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-35 hover:bg-slate-50 cursor-pointer disabled:cursor-default transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Elemento de Fechamento da Seção */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center space-y-3 shadow-2xs">
        <p className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug">
          ⭐ Mais de 500 orçamentos profissionais gerados e aprovados nas primeiras semanas de teste.
        </p>

        <button
          type="button"
          onClick={onScrollToOffer}
          className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-[#0B4FC0]/30 bg-blue-50/70 hover:bg-blue-100/80 text-[#0B4FC0] font-display font-bold text-sm inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Quero começar a usar agora</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* Lightbox para leitura ampliada do print */}
      {zoomedPrint && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={zoomedPrint.caption}
          onClick={() => setZoomedPrint(null)}
        >
          <div
            className="relative w-full max-w-[380px] rounded-2xl overflow-hidden bg-white shadow-2xl step-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomedPrint(null)}
              aria-label="Fechar imagem ampliada"
              className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={zoomedPrint.src}
              alt={zoomedPrint.alt}
              referrerPolicy="no-referrer"
              className="w-full max-h-[82vh] object-contain bg-slate-900 block"
            />
          </div>
        </div>
      )}
    </section>
  );
};
