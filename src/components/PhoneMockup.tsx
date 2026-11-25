import React from 'react';
import { ResilientImage } from './ResilientImage';

interface PhoneMockupProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  screenOverlay?: React.ReactNode;
}

const SIZE_CLASSES: Record<NonNullable<PhoneMockupProps['size']>, string> = {
  xs: 'w-[126px] sm:w-[140px] rounded-[1.55rem] p-[5px]',
  sm: 'w-[164px] sm:w-[180px] rounded-[1.85rem] p-[6px]',
  md: 'w-[196px] sm:w-[216px] rounded-[2.1rem] p-[7px]',
  lg: 'w-[210px] sm:w-[238px] rounded-[2.25rem] p-[8px]'
};

const SCREEN_RADIUS_CLASSES: Record<NonNullable<PhoneMockupProps['size']>, string> = {
  xs: 'rounded-[1.25rem]',
  sm: 'rounded-[1.45rem]',
  md: 'rounded-[1.65rem]',
  lg: 'rounded-[1.75rem]'
};

export function PhoneMockup({
  src,
  alt,
  size = 'md',
  className = '',
  screenOverlay
}: PhoneMockupProps) {
  return (
    <div
      className={`relative select-none bg-gradient-to-b from-[#2A3241] via-[#171C26] to-[#10141C] shadow-[0_24px_55px_-14px_rgba(3,9,20,0.75)] ring-1 ring-white/20 ${SIZE_CLASSES[size]} ${className}`}
    >
      {/* Subtle metallic side buttons */}
      <span
        aria-hidden="true"
        className="absolute -right-[2px] top-20 h-9 w-[2px] rounded-r bg-white/20"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[2px] top-16 h-6 w-[2px] rounded-l bg-white/15"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[2px] top-24 h-6 w-[2px] rounded-l bg-white/15"
      />

      {/* Inner Display Bezel */}
      <div
        className={`relative overflow-hidden bg-[#0A0F1A] aspect-[9/19.2] ring-1 ring-black/60 ${SCREEN_RADIUS_CLASSES[size]}`}
      >
        {/* Front camera punch-hole */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1.5 left-1/2 -translate-x-1/2 z-30 w-2 h-2 rounded-full bg-[#060910] ring-1 ring-white/15"
        />

        <ResilientImage
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top"
        />

        {screenOverlay}

        {/* Subtle glass sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]"
        />
      </div>
    </div>
  );
}
