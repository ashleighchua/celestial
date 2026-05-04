'use client';

import { cn } from '@/lib/utils';

interface SectionCardProps {
  icon?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function SectionCard({ icon, title, description, children, className, color }: SectionCardProps) {
  return (
    <div className={cn('bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden', className)}>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="font-bold text-gray-900" style={color ? { color } : undefined}>{title}</h3>
        </div>
        {description && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        )}
        <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
