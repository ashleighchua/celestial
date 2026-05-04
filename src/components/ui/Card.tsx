'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white shadow-sm border border-gray-100 p-5',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function GlassCard({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl backdrop-blur-md bg-white/70 shadow-lg border border-white/50 p-5',
        className
      )}
    >
      {children}
    </div>
  );
}
