'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { getAstrologyProfile, AstrologyProfile } from '@/lib/calculators/astrology';
import { signContent, getBigThreeTitle } from '@/lib/data/astrology-content';
import { ModuleHeader, TabBar } from '@/components/ui/ModuleHeader';
import { Card } from '@/components/ui/Card';
import { SectionCard } from '@/components/ui/SectionCard';
import { ExpandableText } from '@/components/ui/ExpandableText';

const THEME = '#4A9EF5';
const THEME_LIGHT = '#E8F2FF';

// ---------------------------------------------------------------------------
// Helper: deterministic "daily advice" based on sun sign + date
// ---------------------------------------------------------------------------
function getDailyAdvice(sunSign: string): string {
  const advicePool: Record<string, string[]> = {
    Aries: [
      'Channel your fiery energy into a creative project today. Your enthusiasm will inspire others.',
      'Take a bold step toward a goal you have been putting off. The stars favor decisive action.',
      'Your leadership is needed today. Step up and guide those around you with confidence.',
    ],
    Taurus: [
      'Slow down and savor the small pleasures today. A mindful approach will bring unexpected rewards.',
      'Trust your instincts about a financial decision. Your practical wisdom is your greatest asset.',
      'Nurture your body today with good food and gentle movement. Stability starts from within.',
    ],
    Gemini: [
      'A conversation today could open a surprising door. Stay curious and ask the right questions.',
      'Your versatility is your strength today. Juggle your interests without guilt.',
      'Write down the ideas flowing through your mind. One of them holds real potential.',
    ],
    Cancer: [
      'Honor your emotions today. What you feel is a compass pointing toward your truth.',
      'Reach out to someone from your past. A nostalgic connection brings warmth and insight.',
      'Create a cozy sanctuary at home tonight. Your inner world needs gentle care.',
    ],
    Leo: [
      'Let your light shine today without apology. Your confidence inspires those around you.',
      'A creative breakthrough is on the horizon. Follow your passion and the rest will follow.',
      'Generosity returns to you tenfold today. Share your gifts freely.',
    ],
    Virgo: [
      'Your attention to detail saves the day today. Trust your analytical mind.',
      'Take time for self-care. You give so much to others; remember to fill your own cup.',
      'An organizational win awaits. Tidy your space and watch clarity flow in.',
    ],
    Libra: [
      'Seek beauty in unexpected places today. Aesthetic inspiration leads to inner harmony.',
      'A diplomatic conversation resolves a lingering tension. Your grace under pressure shines.',
      'Balance work and pleasure today. Both deserve your full attention.',
    ],
    Scorpio: [
      'Trust your intuition today. The deeper truth is closer than you think.',
      'Let go of something that no longer serves you. Transformation awaits on the other side.',
      'A moment of vulnerability strengthens a bond. Depth is your superpower.',
    ],
    Sagittarius: [
      'Adventure calls today, even in small ways. Explore a new route, book, or idea.',
      'Share your optimism with someone who needs it. Your positivity is contagious.',
      'A philosophical insight shifts your perspective. Keep your mind open and expansive.',
    ],
    Capricorn: [
      'Your disciplined focus pays off today. Stay the course and results will follow.',
      'Allow yourself a moment of celebration. You have earned it through hard work.',
      'A strategic decision made now has long-term benefits. Trust your experience.',
    ],
    Aquarius: [
      'An unconventional idea proves its worth today. Trust your unique perspective.',
      'Connect with your community. Your humanitarian spirit creates meaningful change.',
      'Innovation is your ally today. Break free from routines that limit your potential.',
    ],
    Pisces: [
      'Your creativity flows freely today. Use art, music, or writing as your outlet.',
      'Trust the dream or vision that came to you recently. Your intuition is speaking.',
      'Practice compassion for yourself today. Your sensitivity is a gift, not a burden.',
    ],
  };

  const today = new Date();
  const dayIndex =
    (today.getFullYear() * 366 + (today.getMonth() + 1) * 31 + today.getDate()) % 3;
  const pool = advicePool[sunSign] || advicePool.Aries;
  return pool[dayIndex];
}

// ---------------------------------------------------------------------------
// Helper: descriptive label for a sign placement
// ---------------------------------------------------------------------------
function getPlacementTitle(sign: string, placement: 'Sun' | 'Moon' | 'Rising'): string {
  const titles: Record<string, Record<string, string>> = {
    Aries: { Sun: 'Fearless Pioneer', Moon: 'Instinctive Warrior', Rising: 'Bold Presence' },
    Taurus: { Sun: 'Steadfast Creator', Moon: 'Sensory Soul', Rising: 'Grounded Elegance' },
    Gemini: { Sun: 'Curious Communicator', Moon: 'Restless Thinker', Rising: 'Quick-Witted Charm' },
    Cancer: { Sun: 'Chosen Healer', Moon: 'Emotional Anchor', Rising: 'Gentle Warmth' },
    Leo: { Sun: 'Radiant Leader', Moon: 'Dramatic Heart', Rising: 'Regal Aura' },
    Virgo: { Sun: 'Analytical Sage', Moon: 'Quiet Perfectionist', Rising: 'Composed Grace' },
    Libra: { Sun: 'Harmonious Diplomat', Moon: 'Aesthetic Heart', Rising: 'Elegant Charm' },
    Scorpio: { Sun: 'Magnetic Transformer', Moon: 'Intense Depths', Rising: 'Mysterious Power' },
    Sagittarius: { Sun: 'Philosophical Explorer', Moon: 'Adventurous Spirit', Rising: 'Expansive Energy' },
    Capricorn: { Sun: 'Ambitious Strategist', Moon: 'Resilient Core', Rising: 'Commanding Authority' },
    Aquarius: { Sun: 'Revolutionary Pioneer', Moon: 'Unconventional Heart', Rising: 'Original Thinker' },
    Pisces: { Sun: 'Dreaming Mystic', Moon: 'Boundless Empath', Rising: 'Ethereal Presence' },
  };
  return titles[sign]?.[placement] || sign;
}

// ---------------------------------------------------------------------------
// Helper: element description for Hidden Talent
// ---------------------------------------------------------------------------
function getElementTalent(element: string): string {
  switch (element) {
    case 'Fire':
      return 'Inspiring leadership and the courage to take initiative when others hesitate.';
    case 'Earth':
      return 'Building lasting structures and turning abstract ideas into tangible results.';
    case 'Air':
      return 'Connecting people through ideas and seeing patterns others miss.';
    case 'Water':
      return 'Deep emotional intelligence and the ability to heal through empathy.';
    default:
      return '';
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BigThreeVisualization({
  profile,
  bigThree,
}: {
  profile: AstrologyProfile;
  bigThree: { title: string; tagline: string; description: string };
}) {
  return (
    <div
      className="mx-4 mt-4 rounded-2xl p-5 text-white relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${THEME}, #2D7CD6)` }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
        style={{ background: 'white' }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
        style={{ background: 'white' }}
      />

      <div className="text-center relative z-10">
        <h2 className="text-xl font-bold mb-1">{bigThree.title}</h2>
        <p className="text-white/80 text-sm mb-5">{bigThree.tagline}</p>

        {/* Mountain / peak visualization */}
        <div className="flex items-end justify-center gap-4 mb-4">
          {/* Moon (left, shorter) */}
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-1">{profile.moonEmoji}</span>
            <div
              className="w-20 rounded-t-2xl flex flex-col items-center justify-end pb-3"
              style={{ height: 80, background: 'rgba(255,255,255,0.15)' }}
            >
              <span className="text-xs font-semibold text-white/90">Moon</span>
              <span className="text-[11px] text-white/70">{profile.moonSign}</span>
            </div>
          </div>

          {/* Sun (center, tallest) */}
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-1">{profile.sunEmoji}</span>
            <div
              className="w-24 rounded-t-2xl flex flex-col items-center justify-end pb-3"
              style={{ height: 110, background: 'rgba(255,255,255,0.2)' }}
            >
              <span className="text-xs font-semibold text-white/90">Sun</span>
              <span className="text-[11px] text-white/70">{profile.sunSign}</span>
            </div>
          </div>

          {/* Rising (right, medium) */}
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-1">{profile.risingEmoji}</span>
            <div
              className="w-20 rounded-t-2xl flex flex-col items-center justify-end pb-3"
              style={{ height: 90, background: 'rgba(255,255,255,0.15)' }}
            >
              <span className="text-xs font-semibold text-white/90">Rising</span>
              <span className="text-[11px] text-white/70">{profile.risingSign}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlacementTagCards({ profile }: { profile: AstrologyProfile }) {
  const placements = [
    {
      emoji: profile.sunEmoji,
      label: 'Sun',
      sign: profile.sunSign,
      title: getPlacementTitle(profile.sunSign, 'Sun'),
      subtitle: `Sun in ${profile.sunSign}`,
    },
    {
      emoji: profile.moonEmoji,
      label: 'Moon',
      sign: profile.moonSign,
      title: getPlacementTitle(profile.moonSign, 'Moon'),
      subtitle: `Moon in ${profile.moonSign}`,
    },
    {
      emoji: profile.risingEmoji,
      label: 'Rising',
      sign: profile.risingSign,
      title: getPlacementTitle(profile.risingSign, 'Rising'),
      subtitle: `Rising in ${profile.risingSign}`,
    },
  ];

  return (
    <div className="px-4 mt-4 space-y-3">
      {placements.map((p) => (
        <Card key={p.label}>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: THEME_LIGHT }}
            >
              {p.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                  style={{ background: THEME }}
                >
                  {p.label}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mt-1">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.subtitle}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function StarCodeSection({ profile }: { profile: AstrologyProfile }) {
  const sunContent = signContent[profile.sunSign];
  const items = [
    {
      icon: '\uD83C\uDF1F',
      label: 'Surface Self',
      sublabel: `${profile.risingSign} Rising`,
      value: signContent[profile.risingSign]?.asRising?.split('.')[0] + '.' || '',
    },
    {
      icon: '\uD83C\uDF19',
      label: 'True Self',
      sublabel: `${profile.moonSign} Moon`,
      value: signContent[profile.moonSign]?.asMoon?.split('.')[0] + '.' || '',
    },
    {
      icon: '\u2728',
      label: 'Hidden Talent',
      sublabel: `${profile.sunElement} Element`,
      value: getElementTalent(profile.sunElement),
    },
    {
      icon: '\u2764\uFE0F',
      label: 'Most Compatible',
      sublabel: 'Best matches',
      value: sunContent?.compatibility?.join(', ') || '',
    },
  ];

  return (
    <SectionCard icon="\u2B50" title="Star Code" color={THEME} className="mx-4 mt-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: THEME_LIGHT }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm">{item.label}</span>
                <span className="text-[10px] text-gray-400">{item.sublabel}</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SignsTab({ profile }: { profile: AstrologyProfile }) {
  const sun = signContent[profile.sunSign];
  const moon = signContent[profile.moonSign];
  const rising = signContent[profile.risingSign];

  return (
    <div className="px-4 space-y-4 mt-4">
      {/* Sun Sign */}
      <SectionCard
        icon={profile.sunEmoji}
        title={`Sun in ${profile.sunSign}`}
        description={`${sun?.symbol} | ${sun?.dateRange} | ${sun?.element} | ${sun?.rulingPlanet}`}
        color={THEME}
      >
        <ExpandableText text={sun?.overview || ''} maxLength={200} color={THEME} />
      </SectionCard>

      {/* Moon Sign */}
      <SectionCard
        icon={profile.moonEmoji}
        title={`Moon in ${profile.moonSign}`}
        description={`Your emotional inner world as a ${profile.moonSign} Moon`}
        color={THEME}
      >
        <ExpandableText text={moon?.asMoon || ''} maxLength={200} color={THEME} />
      </SectionCard>

      {/* Rising Sign */}
      <SectionCard
        icon={profile.risingEmoji}
        title={`Rising in ${profile.risingSign}`}
        description={`How the world sees you with ${profile.risingSign} on the Ascendant`}
        color={THEME}
      >
        <ExpandableText text={rising?.asRising || ''} maxLength={200} color={THEME} />
      </SectionCard>
    </div>
  );
}

function ElementsTab({ profile }: { profile: AstrologyProfile }) {
  const elements = [
    { name: profile.sunElement, placement: 'Sun', sign: profile.sunSign },
    { name: profile.moonElement, placement: 'Moon', sign: profile.moonSign },
    { name: profile.risingElement, placement: 'Rising', sign: profile.risingSign },
  ];

  const elementEmojis: Record<string, string> = {
    Fire: '\uD83D\uDD25',
    Earth: '\uD83C\uDF3F',
    Air: '\uD83D\uDCA8',
    Water: '\uD83C\uDF0A',
  };

  const elementDescriptions: Record<string, string> = {
    Fire: 'Fire signs are passionate, dynamic, and temperamental. They get inspired quickly and act on their impulses. Fire brings warmth, energy, and the courage to pursue bold visions.',
    Earth: 'Earth signs are grounded, practical, and reliable. They build tangible results through patience and discipline. Earth energy provides the foundation upon which lasting achievements are built.',
    Air: 'Air signs are intellectual, communicative, and social. They thrive on ideas, connections, and mental stimulation. Air energy brings clarity of thought and the power to connect diverse perspectives.',
    Water: 'Water signs are intuitive, emotional, and deeply perceptive. They navigate life through feeling and instinct. Water energy provides empathy, creativity, and the ability to heal and transform.',
  };

  // Count occurrences
  const counts: Record<string, number> = {};
  for (const el of elements) {
    counts[el.name] = (counts[el.name] || 0) + 1;
  }

  const allElements = ['Fire', 'Earth', 'Air', 'Water'];

  return (
    <div className="px-4 space-y-4 mt-4">
      {/* Element breakdown bars */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-3" style={{ color: THEME }}>
          Your Element Balance
        </h3>
        <div className="space-y-3">
          {allElements.map((el) => {
            const count = counts[el] || 0;
            const percentage = Math.round((count / 3) * 100);
            return (
              <div key={el}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {elementEmojis[el]} {el}
                  </span>
                  <span className="text-xs text-gray-400">
                    {count}/3 placements
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      background: THEME,
                      opacity: count === 0 ? 0.2 : 0.4 + count * 0.2,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Placement breakdown */}
      <SectionCard icon="\uD83C\uDF0D" title="Elemental Placements" color={THEME}>
        <div className="space-y-3">
          {elements.map((el) => (
            <div key={el.placement} className="flex items-center gap-3">
              <span className="text-xl">{elementEmojis[el.name]}</span>
              <div>
                <span className="font-medium text-gray-900 text-sm">
                  {el.placement}: {el.sign}
                </span>
                <span className="text-xs text-gray-500 ml-2">{el.name}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Element descriptions for present elements */}
      {Object.entries(counts)
        .filter(([, count]) => count > 0)
        .map(([el]) => (
          <SectionCard
            key={el}
            icon={elementEmojis[el]}
            title={`${el} Energy`}
            color={THEME}
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              {elementDescriptions[el]}
            </p>
          </SectionCard>
        ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function AstrologyPage() {
  const router = useRouter();
  const { profile: userProfile } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('Signs');

  useEffect(() => {
    setMounted(true);
  }, []);

  const astroProfile = useMemo(() => {
    if (!userProfile) return null;
    return getAstrologyProfile(userProfile.birthDate, userProfile.birthTime);
  }, [userProfile]);

  const bigThree = useMemo(() => {
    if (!astroProfile) return null;
    return getBigThreeTitle(astroProfile.sunSign, astroProfile.moonSign, astroProfile.risingSign);
  }, [astroProfile]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!userProfile) {
    router.push('/profile');
    return <div className="min-h-screen bg-white" />;
  }

  if (!astroProfile || !bigThree) return <div className="min-h-screen bg-white" />;

  const sunContent_ = signContent[astroProfile.sunSign];
  const advice = getDailyAdvice(astroProfile.sunSign);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-12">
      <ModuleHeader title="Western Astrology" subtitle={userProfile.name} color={THEME} />

      {/* Big Three Visualization */}
      <BigThreeVisualization profile={astroProfile} bigThree={bigThree} />

      {/* Big Three Description */}
      <div className="px-4 mt-4">
        <Card>
          <ExpandableText text={bigThree.description} maxLength={180} color={THEME} />
        </Card>
      </div>

      {/* Placement Tag Cards */}
      <PlacementTagCards profile={astroProfile} />

      {/* Star Code Section */}
      <StarCodeSection profile={astroProfile} />

      {/* Tabs: Signs & Elements */}
      <div className="mt-6">
        <TabBar
          tabs={['Signs', 'Elements']}
          active={activeTab}
          onTabChange={setActiveTab}
          color={THEME}
        />
        {activeTab === 'Signs' && <SignsTab profile={astroProfile} />}
        {activeTab === 'Elements' && <ElementsTab profile={astroProfile} />}
      </div>

      {/* Career Section */}
      <div className="mt-6 px-4">
        <SectionCard
          icon="\uD83D\uDCBC"
          title="Career Path"
          description={`Career insights for ${astroProfile.sunSign}`}
          color={THEME}
        >
          <ExpandableText text={sunContent_?.career || ''} maxLength={180} color={THEME} />
        </SectionCard>
      </div>

      {/* Love Section */}
      <div className="mt-4 px-4">
        <SectionCard
          icon="\u2764\uFE0F"
          title="Love & Relationships"
          description={`Romantic profile for ${astroProfile.sunSign}`}
          color={THEME}
        >
          <ExpandableText text={sunContent_?.love || ''} maxLength={180} color={THEME} />
        </SectionCard>
      </div>

      {/* Today's Advice */}
      <div className="mt-4 px-4">
        <Card>
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: THEME_LIGHT }}
            >
              {'\uD83D\uDD2E'}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm" style={{ color: THEME }}>
                Today&apos;s Advice
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{advice}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
