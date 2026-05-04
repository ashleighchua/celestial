'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { getChineseZodiac, ChineseZodiacProfile } from '@/lib/calculators/chinese-zodiac';
import { zodiacContent, ZodiacAnimalContent } from '@/lib/data/zodiac-content';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Card } from '@/components/ui/Card';
import { SectionCard } from '@/components/ui/SectionCard';
import { ExpandableText } from '@/components/ui/ExpandableText';

const THEME_COLOR = '#D4A535';
const THEME_BG = 'from-amber-50 to-white';

const ANIMAL_EMOJIS: Record<string, string> = {
  Rat: '\uD83D\uDC00',
  Ox: '\uD83D\uDC02',
  Tiger: '\uD83D\uDC05',
  Rabbit: '\uD83D\uDC07',
  Dragon: '\uD83D\uDC09',
  Snake: '\uD83D\uDC0D',
  Horse: '\uD83D\uDC0E',
  Goat: '\uD83D\uDC10',
  Monkey: '\uD83D\uDC12',
  Rooster: '\uD83D\uDC13',
  Dog: '\uD83D\uDC15',
  Pig: '\uD83D\uDC16',
};

export default function ChineseZodiacPage() {
  const router = useRouter();
  const { profile } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [zodiac, setZodiac] = useState<ChineseZodiacProfile | null>(null);
  const [content, setContent] = useState<ZodiacAnimalContent | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && profile) {
      const z = getChineseZodiac(profile.birthDate);
      setZodiac(z);
      setContent(zodiacContent[z.animal] || null);
    }
  }, [mounted, profile]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!profile) {
    router.push('/profile');
    return <div className="min-h-screen bg-white" />;
  }

  if (!zodiac || !content) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${THEME_BG} pb-10`}>
      <ModuleHeader title="Chinese Zodiac" subtitle={`Year of the ${zodiac.animal}`} color={THEME_COLOR} />

      {/* Main Animal Display */}
      <div className="px-5 pt-6 pb-2">
        <Card className="!bg-gradient-to-br !from-amber-50 !via-yellow-50 !to-orange-50 !border-amber-200 text-center">
          <div className="text-7xl mb-3">{content.emoji}</div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: THEME_COLOR }}>
            {content.title}
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Born {zodiac.year} &middot; Year of the {zodiac.animal}
          </p>

          {/* Element & Yin/Yang Badges */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: THEME_COLOR + '20', color: THEME_COLOR }}
            >
              {zodiac.elementEmoji} {zodiac.element}
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: THEME_COLOR + '20', color: THEME_COLOR }}
            >
              {zodiac.yinYang === 'Yang' ? '\u2600\uFE0F' : '\uD83C\uDF19'} {zodiac.yinYang}
            </span>
          </div>

          {/* Lucky Info */}
          <div className="flex justify-center gap-6 text-xs text-gray-500 mt-2">
            <div>
              <span className="font-medium text-gray-700">Lucky Numbers:</span>{' '}
              {zodiac.luckyNumbers.join(', ')}
            </div>
            <div>
              <span className="font-medium text-gray-700">Lucky Colors:</span>{' '}
              {zodiac.luckyColors.join(', ')}
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4 italic">
            Note: Dates before early February may belong to the previous year&apos;s animal in the traditional Chinese calendar.
          </p>
        </Card>
      </div>

      {/* Compatibility Section */}
      <div className="px-5 mt-4">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4 text-center" style={{ color: THEME_COLOR }}>
            Compatibility
          </h3>

          {/* Harmonious */}
          <div className="mb-4">
            <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-2 text-center">
              Harmonious Matches
            </p>
            <div className="flex justify-center gap-4">
              {zodiac.compatible.map((animal) => (
                <div key={animal} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center text-2xl">
                    {ANIMAL_EMOJIS[animal]}
                  </div>
                  <span className="text-xs font-medium text-green-700">{animal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenging */}
          <div>
            <p className="text-xs font-medium text-red-500 uppercase tracking-wider mb-2 text-center">
              Challenging Matches
            </p>
            <div className="flex justify-center gap-4">
              {zodiac.challenging.map((animal) => (
                <div key={animal} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-2xl">
                    {ANIMAL_EMOJIS[animal]}
                  </div>
                  <span className="text-xs font-medium text-red-600">{animal}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Overview */}
      <div className="px-5 mt-4">
        <SectionCard icon={content.emoji} title="Overview" color={THEME_COLOR}>
          <ExpandableText text={content.overview} maxLength={200} color={THEME_COLOR} />
        </SectionCard>
      </div>

      {/* Section Cards Grid */}
      <div className="px-5 mt-4 space-y-4">
        <SectionCard icon="\uD83C\uDF1F" title="Strengths" color={THEME_COLOR}>
          <ExpandableText text={content.strengths} maxLength={200} color={THEME_COLOR} />
        </SectionCard>

        <SectionCard icon="\u26A0\uFE0F" title="Weaknesses" color={THEME_COLOR}>
          <ExpandableText text={content.weaknesses} maxLength={200} color={THEME_COLOR} />
        </SectionCard>

        <SectionCard icon="\uD83D\uDCBC" title="Career" color={THEME_COLOR}>
          <ExpandableText text={content.career} maxLength={200} color={THEME_COLOR} />
        </SectionCard>

        <SectionCard icon="\uD83D\uDCB0" title="Wealth" color={THEME_COLOR}>
          <ExpandableText text={content.wealth} maxLength={200} color={THEME_COLOR} />
        </SectionCard>

        <SectionCard icon="\u2764\uFE0F" title="Love" color={THEME_COLOR}>
          <ExpandableText text={content.love} maxLength={200} color={THEME_COLOR} />
        </SectionCard>

        <SectionCard icon="\uD83C\uDFE5" title="Health" color={THEME_COLOR}>
          <ExpandableText text={content.health} maxLength={200} color={THEME_COLOR} />
        </SectionCard>
      </div>

      {/* Famous People */}
      <div className="px-5 mt-4">
        <SectionCard icon="\u2B50" title={`Famous ${zodiac.animal}s`} color={THEME_COLOR}>
          <div className="flex flex-wrap gap-2">
            {content.famous.map((person) => (
              <span
                key={person}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: THEME_COLOR + '15', color: THEME_COLOR }}
              >
                {person}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
