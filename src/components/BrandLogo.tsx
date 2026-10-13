import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'white';
  size?: 'sm' | 'md' | 'lg';
  isFooter?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  isFooter = false,
  className = '',
}) => {
  const isLight = variant === 'light' || variant === 'white' || isFooter;

  // Header: desktop between 48px and 64px, mobile 40px
  // Footer: max height 80px
  const heightClass = isFooter
    ? 'h-[64px] sm:h-[72px] max-h-[80px]'
    : size === 'sm'
    ? 'h-[36px] md:h-[48px]'
    : size === 'lg'
    ? 'h-[44px] md:h-[64px]'
    : 'h-[40px] md:h-[56px]';

  return (
    <div
      className={`inline-flex items-center p-2 select-none ${
        isLight ? 'bg-white rounded-xs shadow-xs' : ''
      } ${className}`}
    >
      <img
        src="/sarvic-logo-transparente.png"
        alt="Sarvic Móveis"
        className={`${heightClass} w-auto max-w-full object-contain block`}
        style={{
          aspectRatio: '1268 / 948',
        }}
      />
    </div>
  );
};

export default BrandLogo;
