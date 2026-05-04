'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { calculateZiWei, ZiWeiPalace } from '@/lib/calculators/ziwei';
import { starContent, palaceContent, patternContent } from '@/lib/data/ziwei-content';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Card } from '@/components/ui/Card';
import { SectionCard } from '@/components/ui/SectionCard';
import { ExpandableText } from '@/components/ui/ExpandableText';

const THEME_COLOR = '#8B5CF6';

const PALACE_ICONS: Record<string, string> = {
  'Life Palace': '\u2B50',
  'Siblings Palace': '\uD83D\uDC65',
  'Spouse Palace': '\uD83D\uDC9E',
  'Children Palace': '\uD83D\uDC76',
  'Wealth Palace': '\uD83D\uDCB0',
  'Health Palace': '\uD83C\uDFE5',
  'Migration Palace': '\u2708\uFE0F',
  'Friends Palace': '\uD83E\uDD1D',
  'Career Palace': '\uD83D\uDCBC',
  'Property Palace': '\uD83C\uDFE0',
  'Fortune Palace': '\uD83C\uDF1F',
  'Parents Palace': '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67',
};

/**
 * Traditional Zi Wei Dou Shu chart layout.
 * The 12 palaces are arranged around the edges of a 4x4 grid,
 * forming a rectangle border (the center is empty).
 *
 * Layout positions (row, col) mapping to palace indices:
 *   Row 0: [4] [5] [6] [7]
 *   Row 1: [3]         [8]
 *   Row 2: [2]         [9]
 *   Row 3: [1] [0] [11][10]
 *
 * The palace index refers to the position in the palaces array.
 */
const GRID_LAYOUT: { row: number; col: number; palaceIndex: number }[] = [
  // Bottom row (right to left visually, but we render left to right)
  { row: 3, col: 1, palaceIndex: 0 },
  { row: 3, col: 0, palaceIndex: 1 },
  { row: 2, col: 0, palaceIndex: 2 },
  { row: 1, col: 0, palaceIndex: 3 },
  // Top row (left to right)
  { row: 0, col: 0, palaceIndex: 4 },
  { row: 0, col: 1, palaceIndex: 5 },
  { row: 0, col: 2, palaceIndex: 6 },
  { row: 0, col: 3, palaceIndex: 7 },
  // Right column (top to bottom)
  { row: 1, col: 3, palaceIndex: 8 },
  { row: 2, col: 3, palaceIndex: 9 },
  // Bottom row (right side)
  { row: 3, col: 3, palaceIndex: 10 },
  { row: 3, col: 2, palaceIndex: 11 },
];

function PalaceCell({ palace, isLifePalace }: { palace: ZiWeiPalace; isLifePalace: boolean }) {
  return (
    <div
      className={`border border-gray-200 rounded-lg p-1.5 text-center min-h-[72px] flex flex-col justify-center ${
        isLifePalace ? 'bg-purple-50 border-purple-300 ring-1 ring-purple-200' : 'bg-white'
      }`}
    >
      <div className="text-[10px] font-bold text-gray-900 truncate">{palace.chineseName}</div>
      <div className="text-[8px] text-gray-500 truncate">{palace.name}</div>
      {palace.stars.length > 0 && (
        <div className="mt-0.5 space-y-0">
          {palace.stars.slice(0, 3).map((star) => (
            <div
              key={star.name}
              className={`text-[8px] leading-tight truncate ${
                star.nature === 'Auspicious'
                  ? 'text-purple-600 font-medium'
                  : star.nature === 'Inauspicious'
                  ? 'text-red-500'
                  : 'text-gray-600'
              }`}
            >
              {star.chineseName}
            </div>
          ))}
          {palace.stars.length > 3 && (
            <div className="text-[7px] text-gray-400">+{palace.stars.length - 3} more</div>
          )}
        </div>
      )}
    </div>
  );
}

function KeyPalaceCard({ palace, icon }: { palace: ZiWeiPalace; icon: string }) {
  return (
    <Card className="!p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <div>
          <div className="text-sm font-bold text-gray-900">{palace.chineseName}</div>
          <div className="text-xs text-gray-500">{palace.name}</div>
        </div>
      </div>
      {palace.stars.length > 0 ? (
        <div className="space-y-1">
          {palace.stars.map((star) => (
            <div key={star.name} className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  star.nature === 'Auspicious'
                    ? 'bg-purple-500'
                    : star.nature === 'Inauspicious'
                    ? 'bg-red-400'
                    : 'bg-gray-400'
                }`}
              />
              <span className="text-xs text-gray-800">{star.chineseName} {star.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  star.nature === 'Auspicious'
                    ? 'bg-purple-50 text-purple-600'
                    : star.nature === 'Inauspicious'
                    ? 'bg-red-50 text-red-500'
                    : 'bg-gray-50 text-gray-500'
                }`}
              >
                {star.nature}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic">No major stars in this palace</p>
      )}
    </Card>
  );
}

export default function ZiWeiPage() {
  const router = useRouter();
  const { profile } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ziWeiProfile = useMemo(() => {
    if (!profile) return null;
    return calculateZiWei(profile.birthDate, profile.birthTime, profile.gender);
  }, [profile]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!profile) {
    router.push('/profile');
    return <div className="min-h-screen bg-white" />;
  }

  if (!ziWeiProfile) return <div className="min-h-screen bg-white" />;

  const pattern = patternContent[ziWeiProfile.mainPattern];
  const mainStarContent = starContent[ziWeiProfile.mainStar];

  // Build grid data for traditional layout
  const gridData: (ZiWeiPalace | null)[][] = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => null)
  );
  for (const cell of GRID_LAYOUT) {
    if (cell.palaceIndex < ziWeiProfile.palaces.length) {
      gridData[cell.row][cell.col] = ziWeiProfile.palaces[cell.palaceIndex];
    }
  }

  // Collect stars from key palaces for the detailed descriptions section
  const keyPalaces = [
    { label: 'Life Palace', palace: ziWeiProfile.lifePalace },
    { label: 'Career Palace', palace: ziWeiProfile.careerPalace },
    { label: 'Wealth Palace', palace: ziWeiProfile.wealthPalace },
    { label: 'Migration Palace', palace: ziWeiProfile.migrationPalace },
  ];

  const starDescriptions: { starName: string; palaceLabel: string; text: string }[] = [];
  for (const kp of keyPalaces) {
    for (const star of kp.palace.stars) {
      const content = starContent[star.name];
      if (!content) continue;
      let text = '';
      if (kp.label === 'Life Palace') text = content.inLifePalace;
      else if (kp.label === 'Career Palace') text = content.inCareerPalace;
      else if (kp.label === 'Wealth Palace') text = content.inWealthPalace;
      else text = content.general;
      starDescriptions.push({
        starName: `${star.chineseName} ${star.name}`,
        palaceLabel: kp.label,
        text,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-8">
      <ModuleHeader title="Purple Star Astrology" subtitle="Zi Wei Dou Shu" color={THEME_COLOR} />

      <div className="px-4 pt-4 space-y-4">
        {/* Main Pattern Display */}
        <Card className="!bg-gradient-to-br !from-purple-500 !via-violet-500 !to-indigo-500 !border-0 text-white">
          <div className="text-center">
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Chart Pattern</p>
            <h2 className="text-2xl font-bold mb-1">
              {pattern ? pattern.chineseName : ziWeiProfile.mainPattern}
            </h2>
            <p className="text-white/90 text-sm font-medium mb-3">
              {pattern ? pattern.name : ziWeiProfile.mainPattern}
            </p>
            <p className="text-white/70 text-xs leading-relaxed">
              {ziWeiProfile.patternDescription}
            </p>
          </div>
        </Card>

        {/* Tagline */}
        <div className="text-center px-2">
          <p className="text-sm text-gray-600 italic">
            {mainStarContent
              ? `"${mainStarContent.keywords.join(' \u00B7 ')}"`
              : '"Easy to receive help from those around you"'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Main Star: {ziWeiProfile.mainStar} in your Life Palace
          </p>
        </div>

        {/* Four Key Palaces - 2x2 Grid */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-3">Key Palaces</h3>
          <div className="grid grid-cols-2 gap-3">
            <KeyPalaceCard
              palace={ziWeiProfile.lifePalace}
              icon={PALACE_ICONS['Life Palace']}
            />
            <KeyPalaceCard
              palace={ziWeiProfile.migrationPalace}
              icon={PALACE_ICONS['Migration Palace']}
            />
            <KeyPalaceCard
              palace={ziWeiProfile.careerPalace}
              icon={PALACE_ICONS['Career Palace']}
            />
            <KeyPalaceCard
              palace={ziWeiProfile.wealthPalace}
              icon={PALACE_ICONS['Wealth Palace']}
            />
          </div>
        </div>

        {/* Full 12-Palace Grid Visualization */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-3">Complete Chart</h3>
          <Card className="!p-3">
            <div className="grid grid-cols-4 gap-1.5">
              {gridData.map((row, rowIndex) =>
                row.map((palace, colIndex) => {
                  if (palace) {
                    const isLife = palace.name === 'Life Palace';
                    return (
                      <PalaceCell
                        key={`${rowIndex}-${colIndex}`}
                        palace={palace}
                        isLifePalace={isLife}
                      />
                    );
                  }
                  // Empty center cells
                  if (
                    (rowIndex === 1 || rowIndex === 2) &&
                    (colIndex === 1 || colIndex === 2)
                  ) {
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className="border border-dashed border-gray-100 rounded-lg min-h-[72px] flex items-center justify-center"
                      >
                        {rowIndex === 1 && colIndex === 1 && (
                          <div className="text-center">
                            <div className="text-lg" style={{ color: THEME_COLOR }}>
                              {'\u2726'}
                            </div>
                            <div className="text-[8px] text-gray-400 mt-0.5">Zi Wei</div>
                            <div className="text-[8px] text-gray-400">Dou Shu</div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return <div key={`${rowIndex}-${colIndex}`} className="min-h-[72px]" />;
                })
              )}
            </div>
          </Card>
        </div>

        {/* Star Descriptions in Key Palaces */}
        {starDescriptions.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Star Readings</h3>
            <div className="space-y-3">
              {starDescriptions.map((desc, i) => (
                <SectionCard
                  key={`${desc.starName}-${i}`}
                  icon={'\u2733\uFE0F'}
                  title={desc.starName}
                  description={`In your ${desc.palaceLabel}`}
                  color={THEME_COLOR}
                >
                  <ExpandableText text={desc.text} maxLength={180} color={THEME_COLOR} />
                </SectionCard>
              ))}
            </div>
          </div>
        )}

        {/* Pattern Explanation */}
        {pattern && (
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Pattern Analysis</h3>
            <SectionCard
              icon={'\uD83C\uDF1F'}
              title={`${pattern.chineseName} - ${pattern.name}`}
              color={THEME_COLOR}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-700 leading-relaxed">{pattern.description}</p>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-purple-700 mb-1">What This Means For You</p>
                  <ExpandableText text={pattern.meaning} maxLength={200} color={THEME_COLOR} />
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* Palace Themes Overview */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-3">Palace Themes</h3>
          <Card>
            <div className="space-y-3">
              {ziWeiProfile.palaces.map((palace) => {
                const content = palaceContent[palace.name];
                return (
                  <div key={palace.name} className="flex items-start gap-2.5">
                    <span className="text-sm mt-0.5">{PALACE_ICONS[palace.name] || '\u2B1C'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900">{palace.chineseName}</span>
                        <span className="text-[10px] text-gray-500">{palace.name}</span>
                        {palace.stars.length > 0 && (
                          <span className="text-[10px] text-purple-600">
                            ({palace.stars.map((s) => s.chineseName).join(', ')})
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {content ? content.theme : palace.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
