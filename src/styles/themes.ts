export const themes = {
  dashboard: {
    primary: '#6366F1',
    secondary: '#E0E7FF',
    bg: 'from-indigo-50 to-white',
    accent: '#818CF8',
  },
  astrology: {
    primary: '#4A9EF5',
    secondary: '#E8F2FF',
    bg: 'from-blue-50 to-white',
    accent: '#7CB9F8',
  },
  mbti: {
    primary: '#8B5CF6',
    secondary: '#F3E8FF',
    bg: 'from-purple-50 to-white',
    accent: '#A78BFA',
  },
  numerology: {
    primary: '#14B8A6',
    secondary: '#E0FAF5',
    bg: 'from-teal-50 to-white',
    accent: '#5EEAD4',
  },
  chineseZodiac: {
    primary: '#D4A535',
    secondary: '#FFF8E7',
    bg: 'from-amber-50 to-white',
    accent: '#FBBF24',
  },
  humanDesign: {
    primary: '#E07A4F',
    secondary: '#FFF0E8',
    bg: 'from-orange-50 to-white',
    accent: '#FB923C',
  },
  mayan: {
    primary: '#D4A535',
    secondary: '#FFF8E7',
    bg: 'from-amber-50 to-white',
    accent: '#FBBF24',
  },
  bazi: {
    primary: '#D4A535',
    secondary: '#FFF8E7',
    bg: 'from-amber-50 to-white',
    accent: '#FBBF24',
  },
  ziwei: {
    primary: '#8B5CF6',
    secondary: '#F3E8FF',
    bg: 'from-purple-50 to-white',
    accent: '#A78BFA',
  },
  starMansions: {
    primary: '#4A9EF5',
    secondary: '#E8F2FF',
    bg: 'from-blue-50 to-white',
    accent: '#7CB9F8',
  },
  chineseAstrology: {
    primary: '#D4A535',
    secondary: '#FFF8E7',
    bg: 'from-amber-50 to-white',
    accent: '#FBBF24',
  },
} as const;

export type ThemeName = keyof typeof themes;
