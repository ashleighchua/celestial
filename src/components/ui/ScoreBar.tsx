'use client';

import { cn } from '@/lib/utils';

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreBar({ label, score, maxScore = 100, color = '#6366F1', size = 'md' }: ScoreBarProps) {
  const pct = Math.min((score / maxScore) * 100, 100);
  const heights = { sm: 'h-12', md: 'h-20', lg: 'h-28' };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn('w-8 rounded-full bg-gray-100 relative overflow-hidden', heights[size])}>
        <div
          className="absolute bottom-0 w-full rounded-full transition-all duration-700 ease-out"
          style={{ height: `${pct}%`, backgroundColor: color, opacity: 0.7 }}
        />
      </div>
      <span className="text-xs font-bold" style={{ color }}>{score}</span>
      <span className="text-[10px] text-gray-500">{label}</span>
    </div>
  );
}

interface TraitSliderProps {
  leftLabel: string;
  rightLabel: string;
  value: number; // 0-100, 50 is center
  leftColor?: string;
  rightColor?: string;
}

export function TraitSlider({ leftLabel, rightLabel, value, leftColor = '#8B5CF6', rightColor = '#14B8A6' }: TraitSliderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn('text-xs font-medium w-8 text-right')} style={{ color: value < 50 ? leftColor : '#9CA3AF' }}>
        {leftLabel}
      </span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full relative">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-md transition-all"
          style={{
            left: `${value}%`,
            backgroundColor: value < 50 ? leftColor : rightColor,
            transform: `translate(-50%, -50%)`,
          }}
        />
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${value}%`,
            backgroundColor: value < 50 ? leftColor : rightColor,
            opacity: 0.3,
          }}
        />
      </div>
      <span className={cn('text-xs font-medium w-8')} style={{ color: value >= 50 ? rightColor : '#9CA3AF' }}>
        {rightLabel}
      </span>
    </div>
  );
}
