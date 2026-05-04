'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { calculateChineseAstro, ChineseAstroProfile } from '@/lib/calculators/chinese-astro';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Card } from '@/components/ui/Card';
import { SectionCard } from '@/components/ui/SectionCard';

const THEME_COLOR = '#D4A535';

const ELEMENT_COLORS: Record<string, string> = {
  Wood: '#22C55E',
  Fire: '#EF4444',
  Earth: '#EAB308',
  Metal: '#E5E7EB',
  Water: '#3B82F6',
};

const ELEMENT_STROKE_COLORS: Record<string, string> = {
  Wood: '#16A34A',
  Fire: '#DC2626',
  Earth: '#CA8A04',
  Metal: '#9CA3AF',
  Water: '#2563EB',
};

const ELEMENT_EMOJIS: Record<string, string> = {
  Wood: '\uD83C\uDF3F',
  Fire: '\uD83D\uDD25',
  Earth: '\u26F0\uFE0F',
  Metal: '\u2699\uFE0F',
  Water: '\uD83C\uDF0A',
};

const ROLE_EMOJIS: Record<string, string> = {
  'Life Master': '\u2B50',
  'Grace Star': '\uD83D\uDE4F',
  'Use Star': '\uD83D\uDD27',
  'Difficulty Star': '\u26A1',
  'Wealth Star': '\uD83D\uDCB0',
  'Servant Star': '\uD83E\uDD1D',
};

// ============================================================
// Circular Cycle Chart SVG Component
// ============================================================

function CycleChart({ profile }: { profile: ChineseAstroProfile }) {
  const stars = profile.stars;
  const cx = 160;
  const cy = 160;
  const outerRadius = 130;
  const innerRadius = 70;
  const labelRadius = 105;
  const segmentCount = stars.length;
  const angleStep = (2 * Math.PI) / segmentCount;
  const startOffset = -Math.PI / 2; // Start from top

  // Build arc paths for each segment
  const segments = stars.map((star, i) => {
    const startAngle = startOffset + i * angleStep;
    const endAngle = startAngle + angleStep;

    const outerX1 = cx + outerRadius * Math.cos(startAngle);
    const outerY1 = cy + outerRadius * Math.sin(startAngle);
    const outerX2 = cx + outerRadius * Math.cos(endAngle);
    const outerY2 = cy + outerRadius * Math.sin(endAngle);

    const innerX1 = cx + innerRadius * Math.cos(endAngle);
    const innerY1 = cy + innerRadius * Math.sin(endAngle);
    const innerX2 = cx + innerRadius * Math.cos(startAngle);
    const innerY2 = cy + innerRadius * Math.sin(startAngle);

    const largeArc = angleStep > Math.PI ? 1 : 0;

    const path = [
      `M ${outerX1} ${outerY1}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerX2} ${outerY2}`,
      `L ${innerX1} ${innerY1}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerX2} ${innerY2}`,
      'Z',
    ].join(' ');

    // Label position (midpoint of the segment)
    const midAngle = startAngle + angleStep / 2;
    const labelX = cx + labelRadius * Math.cos(midAngle);
    const labelY = cy + labelRadius * Math.sin(midAngle);

    return { path, labelX, labelY, star, midAngle, startAngle, endAngle };
  });

  // Arrow connections: Life Master -> Grace -> Use -> Wealth -> Servant -> Difficulty -> back
  const connectionOrder = [0, 1, 2, 4, 5, 3]; // indices in stars array
  const arrowRadius = (outerRadius + innerRadius) / 2;

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-[320px] mx-auto">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill={THEME_COLOR} opacity="0.5" />
        </marker>
      </defs>

      {/* Segments */}
      {segments.map(({ path, star }, i) => (
        <path
          key={i}
          d={path}
          fill={ELEMENT_COLORS[star.element]}
          stroke={ELEMENT_STROKE_COLORS[star.element]}
          strokeWidth="1.5"
          opacity="0.75"
        />
      ))}

      {/* Connection arrows */}
      {connectionOrder.map((fromIdx, i) => {
        const toIdx = connectionOrder[(i + 1) % connectionOrder.length];
        const fromAngle = startOffset + fromIdx * angleStep + angleStep / 2;
        const toAngle = startOffset + toIdx * angleStep + angleStep / 2;
        const fx = cx + arrowRadius * Math.cos(fromAngle);
        const fy = cy + arrowRadius * Math.sin(fromAngle);
        const tx = cx + arrowRadius * Math.cos(toAngle);
        const ty = cy + arrowRadius * Math.sin(toAngle);
        // Shorten the line slightly so arrow doesn't overlap label
        const dx = tx - fx;
        const dy = ty - fy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const shortenBy = 12;
        const sx = tx - (dx / len) * shortenBy;
        const sy = ty - (dy / len) * shortenBy;

        return (
          <line
            key={`arrow-${i}`}
            x1={fx}
            y1={fy}
            x2={sx}
            y2={sy}
            stroke={THEME_COLOR}
            strokeWidth="1"
            opacity="0.35"
            markerEnd="url(#arrowhead)"
          />
        );
      })}

      {/* Labels */}
      {segments.map(({ labelX, labelY, star }, i) => (
        <g key={`label-${i}`}>
          <text
            x={labelX}
            y={labelY - 6}
            textAnchor="middle"
            fill="#1F2937"
            fontSize="8"
            fontWeight="700"
          >
            {star.role.split(' ').slice(0, 2).join(' ')}
          </text>
          <text
            x={labelX}
            y={labelY + 5}
            textAnchor="middle"
            fill="#6B7280"
            fontSize="7"
          >
            {star.palace}
          </text>
        </g>
      ))}

      {/* Center label */}
      <circle cx={cx} cy={cy} r={innerRadius - 4} fill="white" opacity="0.9" />
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fill={THEME_COLOR}
        fontSize="10"
        fontWeight="700"
      >
        Six Star
      </text>
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fill={THEME_COLOR}
        fontSize="10"
        fontWeight="700"
      >
        Cycle
      </text>
      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="8"
      >
        {'\u653F\u4F59 System'}
      </text>
    </svg>
  );
}

// ============================================================
// Element Badge Component
// ============================================================

function ElementBadge({ element }: { element: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: ELEMENT_COLORS[element] + '20',
        color: ELEMENT_STROKE_COLORS[element],
        border: `1px solid ${ELEMENT_COLORS[element]}40`,
      }}
    >
      {ELEMENT_EMOJIS[element]} {element}
    </span>
  );
}

// ============================================================
// Main Page Component
// ============================================================

export default function ChineseAstrologyPage() {
  const router = useRouter();
  const { profile } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [astroProfile, setAstroProfile] = useState<ChineseAstroProfile | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && profile) {
      const result = calculateChineseAstro(
        profile.birthDate,
        profile.birthTime,
        profile.gender
      );
      setAstroProfile(result);
    }
  }, [mounted, profile]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!profile) {
    router.push('/profile');
    return <div className="min-h-screen bg-white" />;
  }

  if (!astroProfile) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white pb-10">
      <ModuleHeader
        title="Chinese Astrology Plus"
        subtitle={'\u653F\u4F59 Life Star System'}
        color={THEME_COLOR}
      />

      <div className="px-5 pt-5 space-y-5">
        {/* Overall Pattern */}
        <Card className="!bg-gradient-to-br !from-amber-50 !via-yellow-50 !to-orange-50 !border-amber-200">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: THEME_COLOR }}>
              Overall Life Pattern
            </p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {astroProfile.overallPattern.split(' - ')[0]}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {astroProfile.overallPattern.split(' - ')[1]}
            </p>
          </div>
        </Card>

        {/* Circular Cycle Chart */}
        <Card>
          <h3 className="font-bold text-center mb-3" style={{ color: THEME_COLOR }}>
            Six Star Cycle
          </h3>
          <CycleChart profile={astroProfile} />
          <p className="text-xs text-gray-400 text-center mt-2">
            Arrows show the flow of energy between your life stars
          </p>
        </Card>

        {/* Suitable Industries */}
        <SectionCard
          icon={'\uD83C\uDFAF'}
          title="Suitable Industries"
          description="Fields aligned with your favorable elements where you are most likely to thrive"
          color={THEME_COLOR}
        >
          <div className="flex flex-wrap gap-2">
            {astroProfile.suitableIndustries.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: THEME_COLOR + '15', color: THEME_COLOR }}
              >
                {industry}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* Compatible Partner Element */}
        <Card className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: THEME_COLOR }}>
            Ideal Partner Element
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{ELEMENT_EMOJIS[astroProfile.compatiblePartnerElement]}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{astroProfile.compatiblePartnerElement}</h3>
              <p className="text-xs text-gray-500">
                Partners with strong {astroProfile.compatiblePartnerElement} energy complement your day master
              </p>
            </div>
          </div>
        </Card>

        {/* Individual Star Cards */}
        {astroProfile.stars.map((star) => (
          <SectionCard
            key={star.role}
            icon={ROLE_EMOJIS[star.role]}
            title={`${star.role}: ${star.name}`}
            description={`${star.chineseName} \u2014 ${star.role} in the ${star.palace} Palace`}
            color={THEME_COLOR}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ElementBadge element={star.element} />
                <span className="text-xs text-gray-500">
                  {star.palace} Palace
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {star.description}
              </p>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
