'use client';

import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

interface BadgeProps {
  className?: string;
}

interface TooltipPosition {
  top: number;
  left: number;
}

function Tooltip({ text, position }: { text: string; position: TooltipPosition }) {
  if (typeof window === 'undefined') return null;
  
  return createPortal(
    <div 
      className="fixed whitespace-nowrap rounded bg-gray-900 dark:bg-gray-700 px-2 py-1 text-xs text-white pointer-events-none"
      style={{ 
        top: position.top + 4,
        left: position.left,
        transform: 'translateX(-50%)',
        zIndex: 99999 
      }}
    >
      {text}
    </div>,
    document.body
  );
}

export function ProBadge({ className = '' }: BadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({ top: 0, left: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left + rect.width / 2 });
      setShowTooltip(true);
    }
  };

  return (
    <>
      <Link 
        ref={ref}
        href="https://www.parseable.com/pricing"
        target="_blank"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F3E8FF] text-[#7E22CE] dark:bg-[#1F162A] dark:text-[#C084FC] hover:bg-[#E9D5FF] dark:hover:bg-[#2A1E3A] transition-colors cursor-pointer no-underline ${className}`}
      >
        Pro
      </Link>
      {showTooltip && <Tooltip text="Available in Parseable Pro plan" position={position} />}
    </>
  );
}

export function EnterpriseBadge({ className = '' }: BadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({ top: 0, left: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left + rect.width / 2 });
      setShowTooltip(true);
    }
  };

  return (
    <>
      <Link 
        ref={ref}
        href="https://www.parseable.com/pricing"
        target="_blank"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EAF2FF] text-[#1D4ED8] dark:bg-[#141C2A] dark:text-[#60A5FA] hover:bg-[#DBEAFE] dark:hover:bg-[#1C2A44] transition-colors cursor-pointer no-underline ${className}`}
      >
        Enterprise
      </Link>
      {showTooltip && <Tooltip text="Available in Parseable Enterprise plan" position={position} />}
    </>
  );
}

interface OfferingPillsProps {
  pro?: boolean;
  enterprise?: boolean;
  className?: string;
}

export function OfferingPills({ pro = false, enterprise = false, className = '' }: OfferingPillsProps) {
  return (
    <div className={`inline-flex gap-1.5 ${className}`}>
      {pro && <ProBadge />}
      {enterprise && <EnterpriseBadge />}
    </div>
  );
}
