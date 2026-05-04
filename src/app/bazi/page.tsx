'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { calculateBaZi, BaZiProfile, BaZiPillar } from '@/lib/calculators/bazi';
import { dayMasterContent, elementContent, patternDescriptions } from '@/lib/data/bazi-content';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { ExpandableText } from '@/components/ui/ExpandableText';

const THEME = '#D4A535';

// ============================================================
// Element color mapping for display
// ============================================================

const ELEMENT_DISPLAY_COLORS: Record<string, string> = {
  Wood: '#22C55E',
  Fire: '#EF4444',
  Earth: '#EAB308',
  Metal: '#94A3B8',
  Water: '#3B82F6',
};

// ============================================================
// Five Elements Chart (SVG)
// ============================================================

function FiveElementsChart({ fiveElements, dayMasterElement }: {
  fiveElements: { wood: number; fire: number; earth: number; metal: number; water: number };
  dayMasterElement: string;
}) {
  const cx = 150;
  const cy = 150;
  const radius = 100;

  // Pentagon vertices (starting from top, going clockwise):
  // Fire (top), Earth (top-right), Metal (bottom-right), Water (bottom-left), Wood (top-left)
  const elements = [
    { name: 'Fire', angle: -90 },
    { name: 'Earth', angle: -90 + 72 },
    { name: 'Metal', angle: -90 + 144 },
    { name: 'Water', angle: -90 + 216 },
    { name: 'Wood', angle: -90 + 288 },
  ];

  const points = elements.map(el => {
    const rad = (el.angle * Math.PI) / 180;
    return {
      name: el.name,
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
      pct: fiveElements[el.name.toLowerCase() as keyof typeof fiveElements],
      color: ELEMENT_DISPLAY_COLORS[el.name],
      isDayMaster: el.name === dayMasterElement,
      emoji: elementContent[el.name]?.emoji || '',
    };
  });

  // Generating cycle arrows: Wood->Fire->Earth->Metal->Water->Wood
  const generatingOrder = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  const generatingPairs: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const fromIdx = points.findIndex(p => p.name === generatingOrder[i]);
    const toIdx = points.findIndex(p => p.name === generatingOrder[(i + 1) % 5]);
    generatingPairs.push([fromIdx, toIdx]);
  }

  // Controlling cycle arrows: Wood->Earth, Earth->Water, Water->Fire, Fire->Metal, Metal->Wood
  const controllingOrder = [
    ['Wood', 'Earth'],
    ['Earth', 'Water'],
    ['Water', 'Fire'],
    ['Fire', 'Metal'],
    ['Metal', 'Wood'],
  ];
  const controllingPairs: [number, number][] = controllingOrder.map(([from, to]) => [
    points.findIndex(p => p.name === from),
    points.findIndex(p => p.name === to),
  ]);

  function arrowPath(fromX: number, fromY: number, toX: number, toY: number, curvature: number = 0) {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const len = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / len;
    const unitY = dy / len;

    // Shorten the line at both ends
    const startX = fromX + unitX * 20;
    const startY = fromY + unitY * 20;
    const endX = toX - unitX * 20;
    const endY = toY - unitY * 20;

    if (curvature === 0) {
      return `M ${startX} ${startY} L ${endX} ${endY}`;
    }

    // Curved path
    const midX = (startX + endX) / 2 + curvature * (-(endY - startY) / len);
    const midY = (startY + endY) / 2 + curvature * ((endX - startX) / len);
    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  }

  return (
    <div className="flex justify-center">
      <svg width="300" height="300" viewBox="0 0 300 300">
        <defs>
          <marker id="arrowGen" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#A3A3A3" />
          </marker>
          <marker id="arrowCtrl" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#D4A53580" />
          </marker>
        </defs>

        {/* Pentagon outline */}
        <polygon
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="1"
        />

        {/* Generating cycle (outer, curved) */}
        {generatingPairs.map(([fi, ti], idx) => (
          <path
            key={`gen-${idx}`}
            d={arrowPath(points[fi].x, points[fi].y, points[ti].x, points[ti].y, 15)}
            fill="none"
            stroke="#A3A3A3"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            markerEnd="url(#arrowGen)"
          />
        ))}

        {/* Controlling cycle (inner, dashed) */}
        {controllingPairs.map(([fi, ti], idx) => (
          <path
            key={`ctrl-${idx}`}
            d={arrowPath(points[fi].x, points[fi].y, points[ti].x, points[ti].y)}
            fill="none"
            stroke="#D4A53560"
            strokeWidth="1"
            strokeDasharray="3 3"
            markerEnd="url(#arrowCtrl)"
          />
        ))}

        {/* Element nodes */}
        {points.map((p) => (
          <g key={p.name}>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.isDayMaster ? 28 : 24}
              fill={p.isDayMaster ? p.color + '30' : '#F9FAFB'}
              stroke={p.color}
              strokeWidth={p.isDayMaster ? 2.5 : 1.5}
            />
            <text
              x={p.x}
              y={p.y - 6}
              textAnchor="middle"
              fontSize="12"
              fill={p.color}
              fontWeight="bold"
            >
              {p.emoji}
            </text>
            <text
              x={p.x}
              y={p.y + 8}
              textAnchor="middle"
              fontSize="9"
              fill="#374151"
              fontWeight="600"
            >
              {p.pct}%
            </text>
            <text
              x={p.x}
              y={p.y + (p.isDayMaster ? 46 : 42)}
              textAnchor="middle"
              fontSize="10"
              fill="#6B7280"
            >
              {p.name}
            </text>
            {p.isDayMaster && (
              <text
                x={p.x}
                y={p.y + (p.isDayMaster ? 56 : 52)}
                textAnchor="middle"
                fontSize="8"
                fill={THEME}
                fontWeight="bold"
              >
                Day Master
              </text>
            )}
          </g>
        ))}

        {/* Legend */}
        <g>
          <line x1="20" y1="285" x2="40" y2="285" stroke="#A3A3A3" strokeWidth="1.2" strokeDasharray="4 2" />
          <text x="44" y="288" fontSize="8" fill="#9CA3AF">Generates</text>
          <line x1="100" y1="285" x2="120" y2="285" stroke="#D4A53560" strokeWidth="1" strokeDasharray="3 3" />
          <text x="124" y="288" fontSize="8" fill="#9CA3AF">Controls</text>
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// Pillar Column Component
// ============================================================

function PillarColumn({ pillar, label }: { pillar: BaZiPillar; label: string }) {
  const stemColor = ELEMENT_DISPLAY_COLORS[pillar.stemElement] || '#6B7280';
  const branchColor = ELEMENT_DISPLAY_COLORS[pillar.branchElement] || '#6B7280';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      {/* Heavenly Stem */}
      <div
        className="w-14 h-14 rounded-xl flex flex-col items-center justify-center"
        style={{ backgroundColor: stemColor + '15', border: `1.5px solid ${stemColor}40` }}
      >
        <span className="text-lg font-bold" style={{ color: stemColor }}>{pillar.stemChinese}</span>
        <span className="text-[8px] text-gray-500">{pillar.heavenlyStem}</span>
      </div>
      {/* Earthly Branch */}
      <div
        className="w-14 h-14 rounded-xl flex flex-col items-center justify-center"
        style={{ backgroundColor: branchColor + '15', border: `1.5px solid ${branchColor}40` }}
      >
        <span className="text-lg font-bold" style={{ color: branchColor }}>{pillar.branchChinese}</span>
        <span className="text-[8px] text-gray-500">{pillar.earthlyBranch}</span>
      </div>
      {/* Elements */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[9px] font-medium" style={{ color: stemColor }}>{pillar.stemElement}</span>
        <span className="text-[9px] font-medium" style={{ color: branchColor }}>{pillar.branchElement}</span>
      </div>
    </div>
  );
}

// ============================================================
// Strength Indicator Component
// ============================================================

function StrengthIndicator({ strength }: { strength: string }) {
  const levels = ['Extremely Weak', 'Weak', 'Balanced', 'Strong', 'Extremely Strong'];
  const activeIndex = levels.indexOf(strength);

  return (
    <div className="flex items-center gap-2">
      {levels.map((level, idx) => (
        <div key={level} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full h-2 rounded-full transition-all"
            style={{
              backgroundColor: idx <= activeIndex ? THEME : '#E5E7EB',
              opacity: idx <= activeIndex ? 0.4 + (idx / levels.length) * 0.6 : 0.3,
            }}
          />
          <span
            className="text-[8px] text-center leading-tight"
            style={{
              color: idx === activeIndex ? THEME : '#9CA3AF',
              fontWeight: idx === activeIndex ? 700 : 400,
            }}
          >
            {level}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Main Page Component
// ============================================================

export default function BaZiPage() {
  const router = useRouter();
  const { profile } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [baziProfile, setBaziProfile] = useState<BaZiProfile | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !profile) {
      router.push('/profile');
      return;
    }
    if (mounted && profile) {
      const result = calculateBaZi(
        profile.birthDate,
        profile.birthTime || '12:00',
        profile.gender
      );
      setBaziProfile(result);
    }
  }, [mounted, profile, router]);

  if (!mounted) return <div className="min-h-screen bg-white" />;
  if (!profile || !baziProfile) return <div className="min-h-screen bg-white" />;

  const dmContent = dayMasterContent[baziProfile.dayMaster];
  const dmElementInfo = elementContent[baziProfile.dayMasterElement];
  const patternDesc = patternDescriptions[baziProfile.pattern] || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white pb-10">
      <ModuleHeader
        title="Four Pillars of Destiny"
        subtitle="\u56DB\u67F1\u63A8\u547D (BaZi)"
        color={THEME}
      />

      <div className="px-4 space-y-4 mt-2">
        {/* Day Master Hero */}
        <div
          className="rounded-2xl p-5 text-center animate-fade-in-up"
          style={{
            background: `linear-gradient(135deg, ${THEME}15, ${dmElementInfo?.color || THEME}15)`,
            border: `1px solid ${THEME}30`,
          }}
        >
          <div className="text-3xl mb-2">{dmElementInfo?.emoji}</div>
          <h2 className="text-xl font-bold text-gray-900">
            Born on a{' '}
            <span style={{ color: ELEMENT_DISPLAY_COLORS[baziProfile.dayMasterElement] }}>
              {baziProfile.dayMaster}
            </span>
            {' '}Day
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {baziProfile.dayMasterYinYang} {baziProfile.dayMasterElement} Day Master
          </p>
          {dmContent && (
            <p className="text-sm italic mt-3" style={{ color: THEME }}>
              &ldquo;{dmContent.metaphor}&rdquo;
            </p>
          )}
        </div>

        {/* Pattern Badge & Strength */}
        <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div
            className="flex-1 rounded-xl p-4"
            style={{ backgroundColor: THEME + '10', border: `1px solid ${THEME}25` }}
          >
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Pattern</span>
            <p className="font-bold text-sm mt-1" style={{ color: THEME }}>{baziProfile.pattern}</p>
          </div>
          <div
            className="flex-1 rounded-xl p-4"
            style={{ backgroundColor: THEME + '10', border: `1px solid ${THEME}25` }}
          >
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Day Master Strength</span>
            <p className="font-bold text-sm mt-1" style={{ color: THEME }}>{baziProfile.strength}</p>
          </div>
        </div>

        {/* Pattern Description */}
        {patternDesc && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <SectionCard icon="\uD83C\uDFAD" title="Your Pattern" color={THEME}>
              <ExpandableText text={patternDesc} maxLength={120} color={THEME} />
            </SectionCard>
          </div>
        )}

        {/* Strength Indicator */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <SectionCard icon="\uD83D\uDCAA" title="Day Master Strength" color={THEME}>
            <StrengthIndicator strength={baziProfile.strength} />
            <p className="text-xs text-gray-500 mt-3">
              {baziProfile.strength === 'Balanced'
                ? 'Your Day Master is well-balanced. You can adapt to various circumstances with relative ease.'
                : baziProfile.strength.includes('Strong')
                ? 'Your Day Master is strong. You have abundant personal energy and self-reliance. Focus on channeling it outward through output and service.'
                : 'Your Day Master needs support. You benefit from the nurturing influence of your favorable elements and supportive relationships.'}
            </p>
          </SectionCard>
        </div>

        {/* Five Elements Chart */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <SectionCard icon="\u2B50" title="Five Elements Balance" color={THEME}>
            <FiveElementsChart
              fiveElements={baziProfile.fiveElements}
              dayMasterElement={baziProfile.dayMasterElement}
            />
            <div className="mt-3 grid grid-cols-5 gap-1">
              {(['Wood', 'Fire', 'Earth', 'Metal', 'Water'] as const).map(el => (
                <div key={el} className="text-center">
                  <div
                    className="w-full h-1.5 rounded-full mb-1"
                    style={{
                      backgroundColor: ELEMENT_DISPLAY_COLORS[el],
                      opacity: 0.6,
                    }}
                  />
                  <span className="text-[10px] font-medium text-gray-500">{el}</span>
                  <p className="text-xs font-bold" style={{ color: ELEMENT_DISPLAY_COLORS[el] }}>
                    {baziProfile.fiveElements[el.toLowerCase() as keyof typeof baziProfile.fiveElements]}%
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-xs text-gray-400">
              <span>
                Dominant:{' '}
                <span
                  className="font-semibold"
                  style={{ color: ELEMENT_DISPLAY_COLORS[baziProfile.dominantElement] }}
                >
                  {baziProfile.dominantElement}
                </span>
              </span>
              <span>
                Weakest:{' '}
                <span
                  className="font-semibold"
                  style={{ color: ELEMENT_DISPLAY_COLORS[baziProfile.weakestElement] }}
                >
                  {baziProfile.weakestElement}
                </span>
              </span>
            </div>
          </SectionCard>
        </div>

        {/* Four Pillars Display */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <SectionCard icon="\uD83C\uDFDB\uFE0F" title="Your Four Pillars" color={THEME}>
            <div className="flex justify-around">
              <PillarColumn pillar={baziProfile.yearPillar} label="Year" />
              <PillarColumn pillar={baziProfile.monthPillar} label="Month" />
              <PillarColumn pillar={baziProfile.dayPillar} label="Day" />
              <PillarColumn pillar={baziProfile.hourPillar} label="Hour" />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME }} />
              <span className="text-[10px] text-gray-400">
                Heavenly Stems (top) represent outward energy. Earthly Branches (bottom) represent hidden roots.
              </span>
            </div>
          </SectionCard>
        </div>

        {/* Favorable Elements & Lucky Info */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          <SectionCard icon="\uD83C\uDF40" title="Favorable Elements" color={THEME}>
            <div className="flex gap-2 mb-4">
              {baziProfile.favorableElements.map(el => (
                <div
                  key={el}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: ELEMENT_DISPLAY_COLORS[el] + '15',
                    border: `1px solid ${ELEMENT_DISPLAY_COLORS[el]}40`,
                  }}
                >
                  <span className="text-sm">{elementContent[el]?.emoji}</span>
                  <span className="text-xs font-medium" style={{ color: ELEMENT_DISPLAY_COLORS[el] }}>
                    {el}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg p-3 bg-gray-50">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">
                  Lucky Colors
                </span>
                <div className="flex flex-wrap gap-1">
                  {baziProfile.luckyColors.slice(0, 4).map(c => (
                    <span key={c} className="text-xs text-gray-700">{c}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg p-3 bg-gray-50">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">
                  Directions
                </span>
                <div className="flex flex-wrap gap-1">
                  {baziProfile.luckyDirections.slice(0, 3).map(d => (
                    <span key={d} className="text-xs text-gray-700">{d}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg p-3 bg-gray-50">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">
                  Numbers
                </span>
                <div className="flex gap-1.5">
                  {baziProfile.luckyNumbers.map(n => (
                    <span
                      key={n}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: THEME }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Day Master Overview */}
        {dmContent && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <SectionCard icon={dmElementInfo?.emoji || '\u2728'} title="About Your Day Master" color={THEME}>
              <ExpandableText text={dmContent.overview} maxLength={180} color={THEME} />
            </SectionCard>
          </div>
        )}

        {/* Personality */}
        {dmContent && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <SectionCard icon="\uD83E\uDDE0" title="Personality" color={THEME}>
              <ExpandableText text={dmContent.personality} maxLength={180} color={THEME} />
            </SectionCard>
          </div>
        )}

        {/* Career */}
        {dmContent && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <SectionCard icon="\uD83D\uDCBC" title="Career & Work" color={THEME}>
              <ExpandableText text={dmContent.career} maxLength={180} color={THEME} />
            </SectionCard>
          </div>
        )}

        {/* Relationships */}
        {dmContent && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
            <SectionCard icon="\u2764\uFE0F" title="Relationships & Love" color={THEME}>
              <ExpandableText text={dmContent.relationships} maxLength={180} color={THEME} />
            </SectionCard>
          </div>
        )}
      </div>
    </div>
  );
}
