'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { getStarMansion } from '@/lib/calculators/star-mansions';
import { mansionContent } from '@/lib/data/mansion-content';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Card } from '@/components/ui/Card';
import { SectionCard } from '@/components/ui/SectionCard';
import { ExpandableText } from '@/components/ui/ExpandableText';

const THEME_COLOR = '#4A9EF5';

const DIRECTION_COLORS: Record<string, string> = {
  'East Azure Dragon': '#3B82F6',
  'North Black Tortoise': '#1E293B',
  'West White Tiger': '#F5F5F5',
  'South Vermilion Bird': '#EF4444',
};

const DIRECTION_TEXT_COLORS: Record<string, string> = {
  'East Azure Dragon': '#FFFFFF',
  'North Black Tortoise': '#FFFFFF',
  'West White Tiger': '#1E293B',
  'South Vermilion Bird': '#FFFFFF',
};

const RELATIONSHIP_COLORS: Record<string, string> = {
  Prosper: '#22C55E',
  Harmony: '#3B82F6',
  Danger: '#EF4444',
  Destruction: '#F97316',
};

const RELATIONSHIP_LABELS: Record<string, string> = {
  Prosper: 'Prosper',
  Harmony: 'Harmony',
  Danger: 'Danger',
  Destruction: 'Destruction',
};

function MansionWheel({
  userMansion,
  relationships,
}: {
  userMansion: number;
  relationships: Record<string, string>;
}) {
  const size = 360;
  const center = size / 2;
  const outerRadius = 155;
  const labelRadius = 140;
  const dotRadius = 120;
  const innerCircleRadius = 100;

  const mansionNames = useMemo(() => {
    const names: string[] = [];
    for (let i = 1; i <= 28; i++) {
      const content = mansionContent[i];
      names.push(content ? content.chineseName : `M${i}`);
    }
    return names;
  }, []);

  const points = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const angle = (i / 28) * Math.PI * 2 - Math.PI / 2;
      return {
        x: center + Math.cos(angle) * dotRadius,
        y: center + Math.sin(angle) * dotRadius,
        labelX: center + Math.cos(angle) * labelRadius,
        labelY: center + Math.sin(angle) * labelRadius,
        angle,
      };
    });
  }, [center]);

  const getRelColor = (mansionNum: number): string | null => {
    const key = String(mansionNum);
    if (relationships[key]) {
      return RELATIONSHIP_COLORS[relationships[key]] || null;
    }
    return null;
  };

  return (
    <div className="flex justify-center my-6">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="max-w-full h-auto"
      >
        {/* Background circles */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <circle
          cx={center}
          cy={center}
          r={innerCircleRadius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Direction arcs */}
        {[
          { label: 'East', start: 0, count: 7, color: '#3B82F620' },
          { label: 'North', start: 7, count: 7, color: '#1E293B15' },
          { label: 'West', start: 14, count: 7, color: '#F59E0B15' },
          { label: 'South', start: 21, count: 7, color: '#EF444420' },
        ].map((sector) => {
          const startAngle = (sector.start / 28) * Math.PI * 2 - Math.PI / 2;
          const endAngle =
            ((sector.start + sector.count) / 28) * Math.PI * 2 - Math.PI / 2;
          const x1 = center + Math.cos(startAngle) * outerRadius;
          const y1 = center + Math.sin(startAngle) * outerRadius;
          const x2 = center + Math.cos(endAngle) * outerRadius;
          const y2 = center + Math.sin(endAngle) * outerRadius;
          return (
            <path
              key={sector.label}
              d={`M ${center} ${center} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} Z`}
              fill={sector.color}
              stroke="none"
            />
          );
        })}

        {/* Connection lines from user mansion to related mansions */}
        {Object.entries(relationships).map(([key, relType]) => {
          const targetIdx = parseInt(key) - 1;
          const userIdx = userMansion - 1;
          if (targetIdx < 0 || targetIdx >= 28) return null;
          const color = RELATIONSHIP_COLORS[relType] || '#CBD5E1';
          return (
            <line
              key={key}
              x1={points[userIdx].x}
              y1={points[userIdx].y}
              x2={points[targetIdx].x}
              y2={points[targetIdx].y}
              stroke={color}
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
          );
        })}

        {/* Mansion dots and labels */}
        {points.map((pt, i) => {
          const mansionNum = i + 1;
          const isUser = mansionNum === userMansion;
          const relColor = getRelColor(mansionNum);
          const dotColor = isUser
            ? THEME_COLOR
            : relColor || '#94A3B8';
          const dotSize = isUser ? 8 : relColor ? 5 : 3.5;

          const angle = pt.angle * (180 / Math.PI);
          const textAnchor =
            angle > 80 && angle < 100
              ? 'middle'
              : angle > -100 && angle < -80
              ? 'middle'
              : angle > 90 || angle < -90
              ? 'end'
              : 'start';

          return (
            <g key={i}>
              {/* Dot */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={dotSize}
                fill={dotColor}
                stroke={isUser ? '#FFFFFF' : 'none'}
                strokeWidth={isUser ? 2 : 0}
              />
              {isUser && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={12}
                  fill="none"
                  stroke={THEME_COLOR}
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
              )}
              {/* Label */}
              <text
                x={pt.labelX}
                y={pt.labelY}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fontSize={isUser ? '9' : '7'}
                fontWeight={isUser ? 'bold' : 'normal'}
                fill={isUser ? THEME_COLOR : '#64748B'}
              >
                {mansionNames[i]}
              </text>
            </g>
          );
        })}

        {/* Center label */}
        <text
          x={center}
          y={center - 8}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="11"
          fontWeight="bold"
          fill={THEME_COLOR}
        >
          28 Mansions
        </text>
        <text
          x={center}
          y={center + 8}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="9"
          fill="#94A3B8"
        >
          Lunar Wheel
        </text>
      </svg>
    </div>
  );
}

function RelationshipLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-3">
      {Object.entries(RELATIONSHIP_LABELS).map(([key, label]) => (
        <div key={key} className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ backgroundColor: RELATIONSHIP_COLORS[key] }}
          />
          <span className="text-xs text-gray-500">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function StarMansionsPage() {
  const router = useRouter();
  const { profile } = useAppStore();

  useEffect(() => {
    if (!profile) {
      router.replace('/profile');
    }
  }, [profile, router]);

  const mansion = useMemo(() => {
    if (!profile) return null;
    return getStarMansion(profile.birthDate);
  }, [profile]);

  const content = useMemo(() => {
    if (!mansion) return null;
    return mansionContent[mansion.mansionNumber] || null;
  }, [mansion]);

  if (!profile || !mansion || !content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/30">
      <ModuleHeader title="Star Mansions" subtitle="28 Lunar Mansions" color={THEME_COLOR} />

      <div className="px-4 py-6 space-y-5 max-w-lg mx-auto">
        {/* Main display card */}
        <Card className="text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${THEME_COLOR}, transparent 70%)`,
            }}
          />
          <div className="relative z-10">
            <p className="text-6xl mb-3">{content.symbol}</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {content.name}
            </h2>
            <p className="text-lg text-gray-500 mt-1">{content.chineseName}</p>
            <p
              className="text-sm font-semibold mt-2"
              style={{ color: THEME_COLOR }}
            >
              Mansion #{mansion.mansionNumber} of 28
            </p>
            <p className="text-base font-medium text-gray-700 mt-3 italic">
              &ldquo;{content.personality}&rdquo;
            </p>

            {/* Direction badge */}
            <div className="mt-4 inline-block">
              <span
                className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide"
                style={{
                  backgroundColor: DIRECTION_COLORS[mansion.direction] || '#E2E8F0',
                  color: DIRECTION_TEXT_COLORS[mansion.direction] || '#1E293B',
                  border:
                    mansion.direction === 'West White Tiger'
                      ? '1px solid #CBD5E1'
                      : 'none',
                }}
              >
                {mansion.direction}
              </span>
            </div>

            {/* Animal and element */}
            <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
              <span>
                Animal: <strong className="text-gray-700">{content.animal}</strong>
              </span>
              <span>
                Element: <strong className="text-gray-700">{content.element}</strong>
              </span>
            </div>

            {/* Auspicious indicator */}
            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  mansion.auspicious
                    ? 'bg-green-50 text-green-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {mansion.auspicious ? 'Auspicious' : 'Challenging'}
              </span>
            </div>
          </div>
        </Card>

        {/* Relationship wheel */}
        <Card>
          <h3
            className="text-center font-bold mb-1"
            style={{ color: THEME_COLOR }}
          >
            Lunar Mansion Wheel
          </h3>
          <p className="text-center text-xs text-gray-400 mb-2">
            Your mansion highlighted with relationship connections
          </p>
          <MansionWheel
            userMansion={mansion.mansionNumber}
            relationships={content.relationships}
          />
          <RelationshipLegend />
        </Card>

        {/* Overview */}
        <SectionCard title="Overview" color={THEME_COLOR}>
          <ExpandableText text={content.overview} maxLength={250} color={THEME_COLOR} />
        </SectionCard>

        {/* Career */}
        <SectionCard title="Career" icon="\uD83D\uDCBC" color={THEME_COLOR}>
          <ExpandableText text={content.career} maxLength={200} color={THEME_COLOR} />
        </SectionCard>

        {/* Wealth */}
        <SectionCard title="Wealth" icon="\uD83D\uDCB0" color={THEME_COLOR}>
          <ExpandableText text={content.wealth} maxLength={200} color={THEME_COLOR} />
        </SectionCard>

        {/* Love */}
        <SectionCard title="Love" icon="\u2764\uFE0F" color={THEME_COLOR}>
          <ExpandableText text={content.love} maxLength={200} color={THEME_COLOR} />
        </SectionCard>

        {/* Compatibility section */}
        <Card>
          <h3
            className="font-bold mb-4"
            style={{ color: THEME_COLOR }}
          >
            Mansion Compatibility
          </h3>
          <div className="space-y-3">
            {Object.entries(content.relationships).map(([key, relType]) => {
              const targetNum = parseInt(key);
              const targetContent = mansionContent[targetNum];
              if (!targetContent) return null;
              const color = RELATIONSHIP_COLORS[relType] || '#94A3B8';

              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{targetContent.symbol}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        #{targetNum} {targetContent.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {targetContent.chineseName}
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${color}15`,
                      color,
                    }}
                  >
                    {relType}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
