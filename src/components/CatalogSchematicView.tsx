import React from 'react';
import { CatalogProduct } from '../data/catalogTypes';

interface CatalogSchematicViewProps {
  product: CatalogProduct;
  className?: string;
  showCardStyle?: boolean;
}

export const CatalogSchematicView: React.FC<CatalogSchematicViewProps> = ({
  product,
  className = '',
  showCardStyle = true,
}) => {
  const { dimensions, layoutShape, sku } = product;
  const isChaise = layoutShape === 'chaise-l';
  const isUShape = layoutShape === 'u-shape';
  const isCurved = layoutShape === 'curved';
  const isSuite = layoutShape === 'suite-321';
  const isCinema = layoutShape === 'cinema-row';

  return (
    <div
      className={`relative select-none overflow-hidden ${
        showCardStyle
          ? 'bg-[#F0F9FF]/80 border border-[#BAE6FD] rounded-xs p-3.5 shadow-xs font-mono text-[10px]'
          : ''
      } ${className}`}
    >
      {/* Top Header Badge */}
      <div className="flex items-center justify-between border-b border-[#BAE6FD]/80 pb-2 mb-3">
        <div className="flex items-center gap-1.5 font-bold text-[#0369A1] tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
          <span>Esquema Técnico CAD · Modelo {sku}</span>
        </div>
        <span className="text-[9px] bg-[#E0F2FE] text-[#0284C7] px-2 py-0.5 rounded-xs font-semibold">
          Escala 1:25
        </span>
      </div>

      {/* Blueprint SVG Canvas */}
      <div className="w-full flex justify-center py-2">
        <svg
          viewBox="0 0 440 220"
          className="w-full h-auto max-h-[180px] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blueprint Grid Lines Subtle Background */}
          <pattern id={`grid-${product.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E0F2FE" strokeWidth="0.5" />
          </pattern>
          <rect width="440" height="220" fill={`url(#grid-${product.id})`} rx="4" />

          {/* Dimension Arrow Definition */}
          <defs>
            <marker id="arrow-start" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M6,0 L0,3 L6,6 Z" fill="#0284C7" />
            </marker>
            <marker id="arrow-end" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0284C7" />
            </marker>
          </defs>

          {/* DYNAMIC SOFA DRAWING BASED ON LAYOUT SHAPE */}
          {isUShape ? (
            /* U-Shaped Grand Sectional Blueprint */
            <g transform="translate(60, 45)">
              {/* Backrest continuous frame */}
              <path
                d="M 20 120 L 20 20 L 300 20 L 300 120 L 250 120 L 250 50 L 70 50 L 70 120 Z"
                fill="#FFFFFF"
                stroke="#0C4A6E"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Seat subdivisions */}
              <line x1="120" y1="20" x2="120" y2="50" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="160" y1="20" x2="160" y2="50" stroke="#0369A1" strokeWidth="2" />
              <line x1="200" y1="20" x2="200" y2="50" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="20" y1="70" x2="70" y2="70" stroke="#0284C7" strokeWidth="1.5" />
              <line x1="250" y1="70" x2="300" y2="70" stroke="#0284C7" strokeWidth="1.5" />
              {/* Center coffee table outline */}
              <rect x="110" y="70" width="100" height="50" rx="3" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="160" y="100" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="bold">MESA DE CENTRO</text>
            </g>
          ) : isChaise ? (
            /* L-Shaped Chaise Sectional Blueprint */
            <g transform="translate(70, 45)">
              {/* L-Shape Main Sofa + Chaise */}
              <path
                d="M 20 120 L 20 20 L 280 20 L 280 60 L 90 60 L 90 120 Z"
                fill="#FFFFFF"
                stroke="#0C4A6E"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Seat segments */}
              <line x1="90" y1="20" x2="90" y2="60" stroke="#0284C7" strokeWidth="2" />
              <line x1="150" y1="20" x2="150" y2="60" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="210" y1="20" x2="210" y2="60" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Chaise cushion line */}
              <line x1="20" y1="70" x2="90" y2="70" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Recliner indicator mark on right seat */}
              <path d="M 230 40 L 260 40 M 245 25 L 245 55" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />
              <text x="55" y="100" textAnchor="middle" fill="#0369A1" fontSize="9" fontWeight="bold">CHAISE</text>
            </g>
          ) : isCurved ? (
            /* Curved Organic Crescent Blueprint */
            <g transform="translate(70, 45)">
              <path
                d="M 20 100 Q 150 10 280 100 L 260 120 Q 150 45 40 120 Z"
                fill="#FFFFFF"
                stroke="#0C4A6E"
                strokeWidth="2.5"
              />
              <line x1="100" y1="52" x2="115" y2="82" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="150" y1="38" x2="150" y2="70" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="200" y1="52" x2="185" y2="82" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="150" cy="115" r="24" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
              <text x="150" y="118" textAnchor="middle" fill="#0284C7" fontSize="8" fontWeight="bold">PUFE CIRCULAR</text>
            </g>
          ) : isSuite ? (
            /* 3+2+1 Suite Blueprint */
            <g transform="translate(60, 40)">
              {/* 3-Seater (Center) */}
              <rect x="70" y="20" width="160" height="50" rx="3" fill="#FFFFFF" stroke="#0C4A6E" strokeWidth="2" />
              <line x1="123" y1="20" x2="123" y2="70" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="176" y1="20" x2="176" y2="70" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="150" y="48" textAnchor="middle" fill="#0C4A6E" fontSize="9" fontWeight="bold">3 LUGARES</text>

              {/* 2-Seater (Left) */}
              <rect x="0" y="90" width="110" height="45" rx="3" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2" />
              <line x1="55" y1="90" x2="55" y2="135" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="55" y="116" textAnchor="middle" fill="#0369A1" fontSize="8" fontWeight="bold">2 LUGARES</text>

              {/* 1-Seater (Right) */}
              <rect x="190" y="90" width="80" height="45" rx="3" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2" />
              <text x="230" y="116" textAnchor="middle" fill="#0369A1" fontSize="8" fontWeight="bold">1 LUGAR</text>
            </g>
          ) : (
            /* Linear 3/4-Seat Power Recliner Blueprint */
            <g transform="translate(70, 50)">
              {/* Outer frame */}
              <rect x="20" y="20" width="260" height="65" rx="4" fill="#FFFFFF" stroke="#0C4A6E" strokeWidth="2.5" />
              {/* Armrests */}
              <rect x="20" y="20" width="22" height="65" fill="#F0F9FF" stroke="#0C4A6E" strokeWidth="1.5" />
              <rect x="258" y="20" width="22" height="65" fill="#F0F9FF" stroke="#0C4A6E" strokeWidth="1.5" />
              {/* Seats */}
              <line x1="115" y1="20" x2="115" y2="85" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="185" y1="20" x2="185" y2="85" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Recliner footrest extended dashed zone */}
              <rect x="187" y="86" width="69" height="35" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="221" y="108" textAnchor="middle" fill="#0284C7" fontSize="8" fontWeight="bold">RECLINER</text>
            </g>
          )}

          {/* Top Dimension Line (Width) */}
          <line x1="80" y1="20" x2="350" y2="20" stroke="#0284C7" strokeWidth="1.5" markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
          <rect x="180" y="10" width="70" height="18" rx="2" fill="#0284C7" />
          <text x="215" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
            {dimensions.totalWidthCm} cm
          </text>

          {/* Side Dimension Line (Depth / Chaise) */}
          <line x1="390" y1="45" x2="390" y2="175" stroke="#0284C7" strokeWidth="1.5" markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
          <text x="405" y="115" fill="#0C4A6E" fontSize="9" fontWeight="bold" transform="rotate(90 405 115)">
            {dimensions.chaiseDepthCm ? `Chaise ${dimensions.chaiseDepthCm} cm` : `${dimensions.depthCm} cm`}
          </text>
        </svg>
      </div>

      {/* Technical Summary Line */}
      <div className="pt-2 border-t border-[#BAE6FD]/80 text-[#0C4A6E] space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Comprimento Total:</span>
          <span className="font-bold text-[#0284C7]">{dimensions.totalWidthCm} cm</span>
        </div>
        {dimensions.chaiseDepthCm && (
          <div className="flex items-center justify-between">
            <span className="text-[#64748B]">Profundidade da Chaise:</span>
            <span className="font-bold text-[#0369A1]">{dimensions.chaiseDepthCm} cm</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Profundidade / Altura:</span>
          <span>{dimensions.depthCm} cm (Prof.) × {dimensions.heightCm} cm (Alt.)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Altura do Assento:</span>
          <span>{dimensions.seatHeightCm} cm</span>
        </div>
        {dimensions.breakdownText && (
          <div className="text-[9px] text-[#0369A1] font-semibold bg-[#E0F2FE]/60 p-1.5 rounded-xs mt-1 border border-[#BAE6FD]/50">
            Fórmula de Módulos: {dimensions.breakdownText}
          </div>
        )}
      </div>
    </div>
  );
};
