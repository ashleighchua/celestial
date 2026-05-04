'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/Card';
import { ScoreBar } from '@/components/ui/ScoreBar';

const modules = [
  { name: 'Astrology', icon: '\u2606', href: '/astrology', color: '#4A9EF5' },
  { name: 'MBTI', icon: '\uD83E\uDDE0', href: '/mbti', color: '#8B5CF6' },
  { name: 'Numerology', icon: '\uD83D\uDD22', href: '/numerology', color: '#14B8A6' },
  { name: 'Zodiac', icon: '\uD83D\uDC09', href: '/chinese-zodiac', color: '#D4A535' },
  { name: 'Human\nDesign', icon: '\u269B', href: '/human-design', color: '#E07A4F' },
  { name: 'Mayan', icon: '\u2600', href: '/mayan', color: '#D4A535' },
  { name: 'BaZi', icon: '\uD83C\uDF31', href: '/bazi', color: '#D4A535' },
  { name: 'Zi Wei', icon: '\uD83D\uDC9C', href: '/ziwei', color: '#8B5CF6' },
  { name: 'Mansions', icon: '\uD83C\uDF19', href: '/star-mansions', color: '#4A9EF5' },
  { name: 'BaZi+', icon: '\uD83D\uDCC8', href: '/chinese-astrology', color: '#D4A535' },
];

function getDailyScores(birthDate: string) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const birthSeed = parseInt(birthDate.replace(/-/g, ''));
  const combined = birthSeed + seed;

  const hash = (n: number, offset: number) => {
    const x = Math.sin(n + offset) * 10000;
    return Math.floor((x - Math.floor(x)) * 40) + 55;
  };

  return {
    overall: hash(combined, 1),
    love: hash(combined, 2),
    wealth: hash(combined, 3),
    career: hash(combined, 4),
    study: hash(combined, 5),
    social: hash(combined, 6),
  };
}

export default function HomePage() {
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

  const scores = getDailyScores(profile.birthDate);

  const quickLinks = [
    { name: 'Western Astrology', desc: 'Sun, Moon & Rising signs', href: '/astrology', icon: '\u2606', gradient: 'from-blue-50 to-blue-100/50', border: 'border-blue-100' },
    { name: 'MBTI Personality', desc: profile.mbtiType ? `Your type: ${profile.mbtiType}` : 'Take the quiz to find your type', href: '/mbti', icon: '\uD83E\uDDE0', gradient: 'from-purple-50 to-purple-100/50', border: 'border-purple-100' },
    { name: 'Numerology', desc: 'Uncover your life path through numbers', href: '/numerology', icon: '\uD83D\uDD22', gradient: 'from-teal-50 to-teal-100/50', border: 'border-teal-100' },
    { name: 'Chinese Zodiac', desc: 'Your animal sign and element', href: '/chinese-zodiac', icon: '\uD83D\uDC09', gradient: 'from-amber-50 to-amber-100/50', border: 'border-amber-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white pb-8">
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Celestial</h1>
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm"
        >
          {profile.name.charAt(0).toUpperCase()}
        </Link>
      </div>

      <div className="px-5 mb-5">
        <Card className="!bg-gradient-to-br !from-indigo-500 !via-purple-500 !to-pink-500 !border-0 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm">Today&apos;s Energy</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-bold">{scores.overall}</span>
                <span className="text-white/70 text-sm">/100</span>
              </div>
              <p className="text-white/70 text-xs mt-2 max-w-[180px]">
                {scores.overall >= 80
                  ? 'Exceptional day for bold moves!'
                  : scores.overall >= 60
                  ? 'Balanced energy. Trust your instincts.'
                  : 'Take it easy. Focus on self-care.'}
              </p>
            </div>
            <div className="flex gap-2.5">
              <ScoreBar label="Love" score={scores.love} color="rgba(255,255,255,0.9)" size="sm" />
              <ScoreBar label="Money" score={scores.wealth} color="rgba(255,255,255,0.9)" size="sm" />
              <ScoreBar label="Career" score={scores.career} color="rgba(255,255,255,0.9)" size="sm" />
              <ScoreBar label="Study" score={scores.study} color="rgba(255,255,255,0.9)" size="sm" />
              <ScoreBar label="Social" score={scores.social} color="rgba(255,255,255,0.9)" size="sm" />
            </div>
          </div>
        </Card>
      </div>

      <div className="px-5">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Explore Your Profile</h2>
        <div className="grid grid-cols-5 gap-3">
          {modules.map((mod) => (
            <Link key={mod.name} href={mod.href} className="flex flex-col items-center gap-1.5 group">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:shadow-md transition-all group-active:scale-95"
                style={{ backgroundColor: mod.color + '15' }}
              >
                {mod.icon}
              </div>
              <span className="text-[10px] font-medium text-gray-700 text-center leading-tight whitespace-pre-line">
                {mod.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-5 mt-6 space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Quick Insights</h2>
        {quickLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <Card className={`!bg-gradient-to-r !${link.gradient} !${link.border} hover:shadow-md transition-shadow mt-3`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center text-lg">{link.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">{link.name}</h3>
                  <p className="text-xs text-gray-500">{link.desc}</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
