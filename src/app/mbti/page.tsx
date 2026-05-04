'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getMBTIFromType } from '@/lib/calculators/mbti';
import { mbtiContent } from '@/lib/data/mbti-content';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Card } from '@/components/ui/Card';
import { SectionCard } from '@/components/ui/SectionCard';
import { TraitSlider } from '@/components/ui/ScoreBar';
import { ExpandableText } from '@/components/ui/ExpandableText';

const PURPLE = '#8B5CF6';

export default function MBTIPage() {
  const router = useRouter();
  const { profile } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!profile) {
    router.push('/profile');
    return <div className="min-h-screen bg-white" />;
  }

  const hasMBTI = !!profile.mbtiType;
  const result = hasMBTI ? getMBTIFromType(profile.mbtiType!) : null;
  const content = hasMBTI && profile.mbtiType ? mbtiContent[profile.mbtiType.toUpperCase()] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-8">
      <ModuleHeader title="MBTI Personality" color={PURPLE} />

      {/* No MBTI type - invite to take quiz */}
      {!hasMBTI && (
        <div className="px-5 pt-8">
          <Card className="text-center !bg-gradient-to-br !from-purple-50 !to-white !border-purple-100">
            <div className="py-4">
              <div className="text-5xl mb-4">{'\uD83E\uDDE0'}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Discover Your Personality Type
              </h2>
              <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                Answer 20 questions to uncover your MBTI personality type and learn about your unique strengths,
                relationships, and ideal career paths.
              </p>
              <Link
                href="/mbti/quiz"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                style={{ backgroundColor: PURPLE }}
              >
                Take the Quiz
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* Has MBTI type - show results */}
      {hasMBTI && result && content && (
        <div className="px-5 pt-6 space-y-5">
          {/* Type hero card */}
          <Card className="text-center !bg-gradient-to-br !from-purple-500 !via-purple-600 !to-indigo-600 !border-0 !text-white">
            <div className="py-3">
              <div className="text-5xl mb-3">{result.emoji}</div>
              <div className="text-4xl font-black tracking-wider mb-1">
                {result.type}
              </div>
              <div className="text-lg font-semibold text-white/90 mb-2">
                {result.title}
              </div>
              <p className="text-sm text-white/70 italic">
                &ldquo;{content.motto}&rdquo;
              </p>
            </div>
          </Card>

          {/* Trait sliders */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4" style={{ color: PURPLE }}>
              Your Personality Dimensions
            </h3>
            <div className="space-y-5">
              {result.letters.map((letter) => (
                <div key={letter.dimension}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      {getDimensionLabel(letter.dimension)}
                    </span>
                    <span className="text-xs font-medium" style={{ color: PURPLE }}>
                      {letter.value < 50
                        ? `${100 - letter.value}% ${letter.left}`
                        : `${letter.value}% ${letter.right}`}
                    </span>
                  </div>
                  <TraitSlider
                    leftLabel={letter.left}
                    rightLabel={letter.right}
                    value={letter.value}
                    leftColor={PURPLE}
                    rightColor="#14B8A6"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Overview */}
          <SectionCard icon={'\uD83D\uDCD6'} title="Overview" color={PURPLE}>
            <ExpandableText text={content.overview} maxLength={200} color={PURPLE} />
          </SectionCard>

          {/* Strengths */}
          <SectionCard icon={'\uD83D\uDCAA'} title="Strengths" color={PURPLE}>
            <ExpandableText text={content.strengths} maxLength={150} color={PURPLE} />
          </SectionCard>

          {/* Weaknesses */}
          <SectionCard icon={'\u26A0\uFE0F'} title="Weaknesses" color={PURPLE}>
            <ExpandableText text={content.weaknesses} maxLength={150} color={PURPLE} />
          </SectionCard>

          {/* Career */}
          <SectionCard icon={'\uD83D\uDCBC'} title="Career" color={PURPLE}>
            <ExpandableText text={content.career} maxLength={150} color={PURPLE} />
          </SectionCard>

          {/* Relationships */}
          <SectionCard icon={'\u2764\uFE0F'} title="Relationships" color={PURPLE}>
            <ExpandableText text={content.relationships} maxLength={150} color={PURPLE} />
          </SectionCard>

          {/* Social Style */}
          <SectionCard icon={'\uD83D\uDDE3\uFE0F'} title="Social Style" color={PURPLE}>
            <ExpandableText text={content.socialStyle} maxLength={150} color={PURPLE} />
          </SectionCard>

          {/* Famous People */}
          <SectionCard icon={'\u2B50'} title="Famous People" color={PURPLE}>
            <div className="flex flex-wrap gap-2">
              {content.famousPeople.map((person) => (
                <span
                  key={person}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#F3E8FF', color: PURPLE }}
                >
                  {person}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Retake Quiz button */}
          <div className="pt-2 pb-4">
            <Link
              href="/mbti/quiz"
              className="block w-full text-center py-3.5 rounded-xl font-bold text-sm border-2 transition-all hover:shadow-md active:scale-[0.98]"
              style={{ borderColor: PURPLE, color: PURPLE }}
            >
              Retake Quiz
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function getDimensionLabel(dimension: string): string {
  switch (dimension) {
    case 'EI':
      return 'Energy';
    case 'SN':
      return 'Information';
    case 'TF':
      return 'Decisions';
    case 'JP':
      return 'Lifestyle';
    default:
      return dimension;
  }
}
