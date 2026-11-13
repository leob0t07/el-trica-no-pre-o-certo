import React from 'react';

export const GuaranteeSealSvg: React.FC = () => {
  return (
    <div className="w-36 h-36 mx-auto flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg" role="img" aria-label="Selo de 7 dias de garantia incondicional">
        <defs>
          <linearGradient id="sealGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="sealInner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B4FC0" />
            <stop offset="100%" stopColor="#011D52" />
          </linearGradient>
          <path
            id="sealTextTop"
            d="M 28,100 A 72,72 0 1,1 172,100"
          />
          <path
            id="sealTextBottom"
            d="M 174,104 A 74,74 0 1,1 26,104"
          />
        </defs>

        {/* Outer ring */}
        <circle cx="100" cy="100" r="94" fill="url(#sealGold)" />
        <circle cx="100" cy="100" r="88" fill="#011D52" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="url(#sealGold)" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Inner shield circle */}
        <circle cx="100" cy="100" r="56" fill="url(#sealInner)" stroke="url(#sealGold)" strokeWidth="2.5" />

        {/* Circular text */}
        <text fill="#FDE047" fontSize="9.5" fontWeight="800" letterSpacing="1.6">
          <textPath href="#sealTextTop" startOffset="50%" textAnchor="middle">
            ELÉTRICA NO PREÇO CERTO •
          </textPath>
        </text>
        <text fill="#FDE047" fontSize="8.8" fontWeight="800" letterSpacing="1.3">
          <textPath href="#sealTextBottom" startOffset="50%" textAnchor="middle">
            SEU DINHEIRO DE VOLTA •
          </textPath>
        </text>

        {/* Center text */}
        <text x="100" y="96" textAnchor="middle" fill="#FFFFFF" fontSize="36" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif">
          7
        </text>
        <text x="100" y="114" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="800" letterSpacing="1.5">
          DIAS
        </text>
        <text x="100" y="128" textAnchor="middle" fill="#E2E8F0" fontSize="7.5" fontWeight="700" letterSpacing="1">
          GARANTIA TOTAL
        </text>
      </svg>
    </div>
  );
};
