'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { calculateMayanKin, MayanProfile } from '@/lib/calculators/mayan';
import { sealContent, toneContent } from '@/lib/data/mayan-content';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Card } from '@/components/ui/Card';
import { SectionCard } from '@/components/ui/SectionCard';
import { ExpandableText } from '@/components/ui/ExpandableText';

const THEME_COLOR = '#D4A535';
const THEME_COLOR_LIGHT = '#D4A53520';

function getSealEmoji(sealName: string): string {
  return sealContent[sealName]?.emoji || '\u2600\uFE0F';
}

function getSealArchetype(sealName: string): string {
  return sealContent[sealName]?.archetype || '';
}

function getSealKeywords(sealName: string): string[] {
  return sealContent[sealName]?.keywords || [];
}

export default function MayanPage() {
  const router = useRouter();
  const { profile } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [mayanProfile, setMayanProfile] = useState<MayanProfile | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && profile) {
      const result = calculateMayanKin(profile.birthDate);
      setMayanProfile(result);
    }
  }, [mounted, profile]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!profile) {
    router.push('/profile');
    return <div className="min-h-screen bg-white" />;
  }

  if (!mayanProfile) return <div className="min-h-screen bg-white" />;

  const mainSeal = sealContent[mayanProfile.sealName];
  const mainTone = toneContent[mayanProfile.toneNumber];
  const guideSeal = sealContent[mayanProfile.guideSeal];
  const challengeSeal = sealContent[mayanProfile.challengeSeal];
  const supportSeal = sealContent[mayanProfile.supportSeal];
  const pushSeal = sealContent[mayanProfile.pushSeal];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white pb-10">
      <ModuleHeader
        title="Mayan Dreamspell"
        subtitle="Galactic Signature"
        color={THEME_COLOR}
      />

      <div className="px-5 pt-5 space-y-5">
        {/* Main Kin Display */}
        <Card className="!bg-gradient-to-br !from-amber-500 !via-amber-600 !to-yellow-700 !border-0 text-white text-center">
          <div className="py-3">
            <p className="text-amber-100 text-sm font-medium tracking-wide uppercase mb-1">
              Your Galactic Signature
            </p>
            <div className="text-4xl mb-3">{getSealEmoji(mayanProfile.sealName)}</div>
            <h2 className="text-3xl font-bold mb-1">Kin {mayanProfile.kinNumber}</h2>
            <h3 className="text-xl font-semibold text-amber-100">
              {mayanProfile.fullName}
            </h3>
            <p className="text-amber-200 text-sm mt-2">
              {mainSeal?.archetype} &middot; Tone {mayanProfile.toneNumber} {mayanProfile.toneName}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {getSealKeywords(mayanProfile.sealName).map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white"
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-amber-200/80 text-xs mt-3">
              Wavespell of {mayanProfile.wavespell}
            </p>
          </div>
        </Card>

        {/* Cross / Diamond Layout - 5 Totems */}
        <div className="relative">
          <h3
            className="text-lg font-bold mb-4"
            style={{ color: THEME_COLOR }}
          >
            Destiny Oracle
          </h3>

          <div className="relative flex flex-col items-center gap-3">
            {/* Guide (Top) */}
            <div
              className="w-full max-w-[200px] rounded-2xl p-4 text-center"
              style={{ backgroundColor: THEME_COLOR_LIGHT }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-1">
                Guide
              </p>
              <div className="text-2xl mb-1">{getSealEmoji(mayanProfile.guideSeal)}</div>
              <p className="text-sm font-bold text-gray-900">{mayanProfile.guideSeal}</p>
              <p className="text-xs text-gray-500">{getSealArchetype(mayanProfile.guideSeal)}</p>
            </div>

            {/* Middle Row: Challenge (Left) - Main (Center) - Support (Right) */}
            <div className="flex items-center gap-3 w-full justify-center">
              {/* Challenge (Left) */}
              <div
                className="flex-1 max-w-[140px] rounded-2xl p-3 text-center"
                style={{ backgroundColor: THEME_COLOR_LIGHT }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-1">
                  Challenge
                </p>
                <div className="text-xl mb-1">{getSealEmoji(mayanProfile.challengeSeal)}</div>
                <p className="text-xs font-bold text-gray-900">{mayanProfile.challengeSeal}</p>
                <p className="text-[10px] text-gray-500">
                  {getSealArchetype(mayanProfile.challengeSeal)}
                </p>
              </div>

              {/* Main Totem (Center, Larger) */}
              <div
                className="w-[150px] rounded-2xl p-4 text-center border-2"
                style={{ backgroundColor: THEME_COLOR_LIGHT, borderColor: THEME_COLOR }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-1">
                  Destiny
                </p>
                <div className="text-3xl mb-1">{getSealEmoji(mayanProfile.sealName)}</div>
                <p className="text-sm font-bold text-gray-900">{mayanProfile.sealName}</p>
                <p className="text-xs text-gray-500">{getSealArchetype(mayanProfile.sealName)}</p>
              </div>

              {/* Support (Right) */}
              <div
                className="flex-1 max-w-[140px] rounded-2xl p-3 text-center"
                style={{ backgroundColor: THEME_COLOR_LIGHT }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-1">
                  Support
                </p>
                <div className="text-xl mb-1">{getSealEmoji(mayanProfile.supportSeal)}</div>
                <p className="text-xs font-bold text-gray-900">{mayanProfile.supportSeal}</p>
                <p className="text-[10px] text-gray-500">
                  {getSealArchetype(mayanProfile.supportSeal)}
                </p>
              </div>
            </div>

            {/* Push / Occult (Bottom) */}
            <div
              className="w-full max-w-[200px] rounded-2xl p-4 text-center"
              style={{ backgroundColor: THEME_COLOR_LIGHT }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-1">
                Hidden Power
              </p>
              <div className="text-2xl mb-1">{getSealEmoji(mayanProfile.pushSeal)}</div>
              <p className="text-sm font-bold text-gray-900">{mayanProfile.pushSeal}</p>
              <p className="text-xs text-gray-500">{getSealArchetype(mayanProfile.pushSeal)}</p>
            </div>
          </div>
        </div>

        {/* Main Seal Description */}
        {mainSeal && (
          <SectionCard
            icon={mainSeal.emoji}
            title={mayanProfile.sealName}
            description={`${mainSeal.archetype} \u2014 Power: ${mainSeal.power} \u00b7 Action: ${mainSeal.action} \u00b7 Essence: ${mainSeal.essence}`}
            color={THEME_COLOR}
          >
            <ExpandableText
              text={mainSeal.description}
              maxLength={200}
              color={THEME_COLOR}
            />
          </SectionCard>
        )}

        {/* Tone Description */}
        {mainTone && (
          <SectionCard
            icon={`\uD83D\uDD14`}
            title={`Tone ${mainTone.number}: ${mainTone.name}`}
            description={`Keyword: ${mainTone.keyword} \u00b7 Power: ${mainTone.power}`}
            color={THEME_COLOR}
          >
            <ExpandableText
              text={mainTone.description}
              maxLength={200}
              color={THEME_COLOR}
            />
          </SectionCard>
        )}

        {/* Guide Seal Card */}
        {guideSeal && (
          <SectionCard
            icon={guideSeal.emoji}
            title={`Guide: ${mayanProfile.guideSeal}`}
            description={`${guideSeal.archetype} \u2014 The energy that guides and inspires your path`}
            color={THEME_COLOR}
          >
            <ExpandableText
              text={guideSeal.description}
              maxLength={200}
              color={THEME_COLOR}
            />
          </SectionCard>
        )}

        {/* Challenge Seal Card */}
        {challengeSeal && (
          <SectionCard
            icon={challengeSeal.emoji}
            title={`Challenge: ${mayanProfile.challengeSeal}`}
            description={`${challengeSeal.archetype} \u2014 The energy that strengthens you through opposition`}
            color={THEME_COLOR}
          >
            <ExpandableText
              text={challengeSeal.description}
              maxLength={200}
              color={THEME_COLOR}
            />
          </SectionCard>
        )}

        {/* Support Seal Card */}
        {supportSeal && (
          <SectionCard
            icon={supportSeal.emoji}
            title={`Support: ${mayanProfile.supportSeal}`}
            description={`${supportSeal.archetype} \u2014 The energy that assists and empowers you`}
            color={THEME_COLOR}
          >
            <ExpandableText
              text={supportSeal.description}
              maxLength={200}
              color={THEME_COLOR}
            />
          </SectionCard>
        )}

        {/* Push / Occult Seal Card */}
        {pushSeal && (
          <SectionCard
            icon={pushSeal.emoji}
            title={`Hidden Power: ${mayanProfile.pushSeal}`}
            description={`${pushSeal.archetype} \u2014 Your secret strength and hidden potential`}
            color={THEME_COLOR}
          >
            <ExpandableText
              text={pushSeal.description}
              maxLength={200}
              color={THEME_COLOR}
            />
          </SectionCard>
        )}
      </div>
    </div>
  );
}
