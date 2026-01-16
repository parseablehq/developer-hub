import React from 'react';

interface BadgeProps {
  className?: string;
}

export function OSSBadge({ className = '' }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ${className}`}
    >
      OSS
    </span>
  );
}

export function ProBadge({ className = '' }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 ${className}`}
    >
      Pro
    </span>
  );
}

export function EnterpriseBadge({ className = '' }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 ${className}`}
    >
      Enterprise
    </span>
  );
}

// Combined component showing all supported offerings
interface OfferingPillsProps {
  oss?: boolean;
  pro?: boolean;
  enterprise?: boolean;
  className?: string;
}

export function OfferingPills({ oss = false, pro = false, enterprise = false, className = '' }: OfferingPillsProps) {
  return (
    <div className={`inline-flex gap-1.5 ${className}`}>
      {oss && <OSSBadge />}
      {pro && <ProBadge />}
      {enterprise && <EnterpriseBadge />}
    </div>
  );
}
