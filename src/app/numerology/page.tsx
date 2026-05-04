'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { getNumerologyProfile } from '@/lib/calculators/numerology';
import { numberMeanings } from '@/lib/data/numerology-content';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Card } from '@/components/ui/Card';
import { SectionCard } from '@/components/ui/SectionCard';
import { ExpandableText } from '@/components/ui/ExpandableText';

const TEAL = '#14B8A6';
const TEAL_LIGHT = '#CCFBF1';

/** Grid positions for numbers 1-9 in a 3x3 layout */
const GRID_POSITIONS: Record<number, { row: number; col: number }> = {
  1: { row: 0, col: 0 },
  2: { row: 0, col: 1 },
  3: { row: 0, col: 2 },
  4: { row: 1, col: 0 },
  5: { row: 1, col: 1 },
  6: { row: 1, col: 2 },
  7: { row: 2, col: 0 },
  8: { row: 2, col: 1 },
  9: { row: 2, col: 2 },
};

function EnergyGrid({ energyGrid, missingNumbers }: { energyGrid: Record<number, number>; missingNumbers: number[] }) {
  const missingSet = new Set(missingNumbers);
  const maxCount = Math.max(...Object.values(energyGrid), 1);

  const cellSize = 72;
  const gap = 16;
  const gridWidth = cellSize * 3 + gap * 2;
  const gridHeight = cellSize * 3 + gap * 2;
  const svgPadding = 8;

  const getCenterX = (col: number) => svgPadding + col * (cellSize + gap) + cellSize / 2;
  const getCenterY = (row: number) => svgPadding + row * (cellSize + gap) + cellSize / 2;

  /** Generate lines connecting present (non-missing) numbers in same row/col/diagonal */
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const presentNumbers = Object.keys(energyGrid)
    .map(Number)
    .filter((n) => !missingSet.has(n) && energyGrid[n] > 0);

  // Connect numbers in the same row
  for (let row = 0; row < 3; row++) {
    const inRow = presentNumbers.filter((n) => GRID_POSITIONS[n].row === row).sort((a, b) => GRID_POSITIONS[a].col - GRID_POSITIONS[b].col);
    for (let i = 0; i < inRow.length - 1; i++) {
      const a = GRID_POSITIONS[inRow[i]];
      const b = GRID_POSITIONS[inRow[i + 1]];
      lines.push({ x1: getCenterX(a.col), y1: getCenterY(a.row), x2: getCenterX(b.col), y2: getCenterY(b.row) });
    }
  }

  // Connect numbers in the same column
  for (let col = 0; col < 3; col++) {
    const inCol = presentNumbers.filter((n) => GRID_POSITIONS[n].col === col).sort((a, b) => GRID_POSITIONS[a].row - GRID_POSITIONS[b].row);
    for (let i = 0; i < inCol.length - 1; i++) {
      const a = GRID_POSITIONS[inCol[i]];
      const b = GRID_POSITIONS[inCol[i + 1]];
      lines.push({ x1: getCenterX(a.col), y1: getCenterY(a.row), x2: getCenterX(b.col), y2: getCenterY(b.row) });
    }
  }

  // Diagonals: 1-5-9 and 3-5-7
  const diag1 = [1, 5, 9].filter((n) => presentNumbers.includes(n));
  for (let i = 0; i < diag1.length - 1; i++) {
    const a = GRID_POSITIONS[diag1[i]];
    const b = GRID_POSITIONS[diag1[i + 1]];
    lines.push({ x1: getCenterX(a.col), y1: getCenterY(a.row), x2: getCenterX(b.col), y2: getCenterY(b.row) });
  }
  const diag2 = [3, 5, 7].filter((n) => presentNumbers.includes(n));
  for (let i = 0; i < diag2.length - 1; i++) {
    const a = GRID_POSITIONS[diag2[i]];
    const b = GRID_POSITIONS[diag2[i + 1]];
    lines.push({ x1: getCenterX(a.col), y1: getCenterY(a.row), x2: getCenterX(b.col), y2: getCenterY(b.row) });
  }

  return (
    <div className="flex justify-center my-4">
      <svg
        width={gridWidth + svgPadding * 2}
        height={gridHeight + svgPadding * 2}
        viewBox={`0 0 ${gridWidth + svgPadding * 2} ${gridHeight + svgPadding * 2}`}
      >
        {/* Connection lines */}
        {lines.map((line, i) => (
          <line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={TEAL}
            strokeWidth={2}
            strokeOpacity={0.25}
          />
        ))}

        {/* Number circles */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          const pos = GRID_POSITIONS[num];
          const cx = getCenterX(pos.col);
          const cy = getCenterY(pos.row);
          const count = energyGrid[num] || 0;
          const isMissing = missingSet.has(num);
          const sizeScale = isMissing ? 0.6 : 0.6 + (count / maxCount) * 0.4;
          const radius = (cellSize / 2 - 4) * sizeScale;
          const opacity = isMissing ? 0.2 : 0.3 + (count / maxCount) * 0.7;

          return (
            <g key={num}>
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={isMissing ? '#E5E7EB' : TEAL}
                fillOpacity={opacity}
                stroke={isMissing ? '#D1D5DB' : TEAL}
                strokeWidth={isMissing ? 1 : 2}
                strokeOpacity={isMissing ? 0.5 : opacity}
              />
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isMissing ? 14 : 16 + count * 2}
                fontWeight={isMissing ? 400 : 700}
                fill={isMissing ? '#9CA3AF' : '#FFFFFF'}
              >
                {num}
              </text>
              {/* Show count badge for numbers appearing more than once */}
              {count > 1 && !isMissing && (
                <>
                  <circle
                    cx={cx + radius * 0.7}
                    cy={cy - radius * 0.7}
                    r={8}
                    fill="#FFFFFF"
                    stroke={TEAL}
                    strokeWidth={1.5}
                  />
                  <text
                    x={cx + radius * 0.7}
                    y={cy - radius * 0.7}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={9}
                    fontWeight={700}
                    fill={TEAL}
                  >
                    {count}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function NumberBadge({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-bold" style={{ color }}>
        {Array.isArray(value) ? value.join(', ') : String(value)}
      </span>
    </div>
  );
}

function ExpandableSection({
  title,
  icon,
  content,
  color,
}: {
  title: string;
  icon: string;
  content: string;
  color: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 animate-fade-in-up">
          <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
}

export default function NumerologyPage() {
  const router = useRouter();
  const { profile } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const numerology = useMemo(() => {
    if (!profile) return null;
    return getNumerologyProfile(profile.birthDate);
  }, [profile]);

  const meaning = useMemo(() => {
    if (!numerology) return null;
    return numberMeanings[numerology.lifePathNumber] || numberMeanings[reduceForLookup(numerology.lifePathNumber)];
  }, [numerology]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!profile) {
    router.push('/profile');
    return <div className="min-h-screen bg-white" />;
  }

  if (!numerology || !meaning) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white pb-8">
      <ModuleHeader title="Numerology" subtitle="Your life through numbers" color={TEAL} />

      {/* Hero Section */}
      <div className="px-5 pt-6 pb-2">
        <div
          className="rounded-3xl p-6 text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${TEAL}, #0D9488)` }}
        >
          {/* Decorative circles */}
          <div
            className="absolute top-[-20px] right-[-20px] w-40 h-40 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <div
            className="absolute bottom-[-30px] left-[-10px] w-32 h-32 rounded-full"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          />

          <p className="text-white/70 text-sm font-medium mb-2">Life Path Number</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold text-white"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '3px solid rgba(255,255,255,0.4)',
              }}
            >
              {numerology.lifePathNumber}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{meaning.title}</h2>
          <p className="text-white/80 text-sm">{profile.name}&apos;s Numerological Archetype</p>

          {/* Keyword Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {meaning.keywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 mt-4">
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: TEAL_LIGHT }}
            >
              <span className="text-sm" style={{ color: TEAL }}>&#9733;</span>
            </div>
            <h3 className="font-bold text-gray-900">Personality Overview</h3>
          </div>
          <ExpandableText text={meaning.description} maxLength={200} color={TEAL} />
        </Card>
      </div>

      {/* Energy Grid */}
      <div className="px-5 mt-4">
        <SectionCard
          icon="&#9672;"
          title="Energy Number Grid"
          description="The size and intensity of each circle shows how strongly that number's energy appears in your birth date. Faded circles represent missing energies."
          color={TEAL}
        >
          <EnergyGrid energyGrid={numerology.energyGrid} missingNumbers={numerology.missingNumbers} />
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: TEAL, opacity: 0.7 }} />
              <span>Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span>Missing</span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Number Classifications */}
      <div className="px-5 mt-4">
        <SectionCard icon="&#128290;" title="Number Classifications" color={TEAL}>
          <NumberBadge label="Life Path Number" value={numerology.lifePathNumber} color={TEAL} />
          <NumberBadge label="Birthday Number" value={numerology.birthdayNumber} color={TEAL} />
          <NumberBadge
            label="Innate Numbers"
            value={numerology.innateNumbers.join(', ')}
            color={TEAL}
          />
          <NumberBadge label="Talent Number" value={numerology.talentNumber} color={TEAL} />
          <NumberBadge label="Life Number" value={numerology.lifeNumber} color={TEAL} />
          <NumberBadge label="Zodiac Number" value={numerology.zodiacNumber} color={TEAL} />
          <NumberBadge label="Year Number" value={numerology.yearNumber} color={TEAL} />
          <NumberBadge
            label="Missing Numbers"
            value={numerology.missingNumbers.length > 0 ? numerology.missingNumbers.join(', ') : 'None'}
            color={numerology.missingNumbers.length > 0 ? '#EF4444' : TEAL}
          />
        </SectionCard>
      </div>

      {/* Expandable Insight Sections */}
      <div className="px-5 mt-4 space-y-3">
        <h3 className="font-bold text-gray-900 text-base mb-1">Detailed Insights</h3>
        <ExpandableSection title="Strengths" icon="&#128170;" content={meaning.strengths} color={TEAL} />
        <ExpandableSection title="Challenges" icon="&#9888;&#65039;" content={meaning.challenges} color={TEAL} />
        <ExpandableSection title="Career" icon="&#128188;" content={meaning.career} color={TEAL} />
        <ExpandableSection title="Relationships" icon="&#128149;" content={meaning.relationships} color={TEAL} />
      </div>

      {/* Footer spacer */}
      <div className="h-8" />
    </div>
  );
}

/** Fallback: reduce a master number to its base for content lookup */
function reduceForLookup(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9) {
    num = String(num)
      .split('')
      .reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
}
