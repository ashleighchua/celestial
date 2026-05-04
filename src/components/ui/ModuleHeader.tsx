'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ModuleHeaderProps {
  title: string;
  subtitle?: string;
  color: string;
  backHref?: string;
}

export function ModuleHeader({ title, subtitle, color, backHref = '/' }: ModuleHeaderProps) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-gray-100">
      <div className="flex items-center px-4 py-3">
        <Link href={backHref} className="mr-3 text-gray-600 hover:text-gray-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold" style={{ color }}>{title}</h1>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className="w-6" />
      </div>
    </div>
  );
}

interface TabBarProps {
  tabs: string[];
  active: string;
  onTabChange: (tab: string) => void;
  color: string;
}

export function TabBar({ tabs, active, onTabChange, color }: TabBarProps) {
  return (
    <div className="flex gap-1 px-4 py-2 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
            active === tab
              ? 'text-white shadow-md'
              : 'text-gray-500 hover:text-gray-700 bg-gray-50'
          )}
          style={active === tab ? { backgroundColor: color } : undefined}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
