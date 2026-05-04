import { getDateParts } from '@/lib/utils';

// ===== Interfaces =====

export interface ZiWeiStar {
  name: string;
  chineseName: string;
  nature: 'Auspicious' | 'Inauspicious' | 'Neutral';
  element: string;
}

export interface ZiWeiPalace {
  name: string;
  chineseName: string;
  position: number; // 0-11
  stars: ZiWeiStar[];
  description: string;
}

export interface ZiWeiProfile {
  lifePalaceIndex: number;
  bodyPalaceIndex: number;
  palaces: ZiWeiPalace[];
  mainPattern: string;
  patternDescription: string;
  mainStar: string;
  lifePalace: ZiWeiPalace;
  careerPalace: ZiWeiPalace;
  wealthPalace: ZiWeiPalace;
  migrationPalace: ZiWeiPalace;
}

// ===== Constants =====

const PALACE_NAMES: { name: string; chineseName: string }[] = [
  { name: 'Life Palace', chineseName: '命宫' },
  { name: 'Siblings Palace', chineseName: '兄弟宫' },
  { name: 'Spouse Palace', chineseName: '夫妻宫' },
  { name: 'Children Palace', chineseName: '子女宫' },
  { name: 'Wealth Palace', chineseName: '财帛宫' },
  { name: 'Health Palace', chineseName: '疾厄宫' },
  { name: 'Migration Palace', chineseName: '迁移宫' },
  { name: 'Friends Palace', chineseName: '交友宫' },
  { name: 'Career Palace', chineseName: '事业宫' },
  { name: 'Property Palace', chineseName: '田宅宫' },
  { name: 'Fortune Palace', chineseName: '福德宫' },
  { name: 'Parents Palace', chineseName: '父母宫' },
];

const MAJOR_STARS: ZiWeiStar[] = [
  { name: 'Zi Wei', chineseName: '紫微', nature: 'Auspicious', element: 'Earth' },
  { name: 'Tian Ji', chineseName: '天机', nature: 'Auspicious', element: 'Wood' },
  { name: 'Tai Yang', chineseName: '太阳', nature: 'Auspicious', element: 'Fire' },
  { name: 'Wu Qu', chineseName: '武曲', nature: 'Auspicious', element: 'Metal' },
  { name: 'Tian Tong', chineseName: '天同', nature: 'Auspicious', element: 'Water' },
  { name: 'Lian Zhen', chineseName: '廉贞', nature: 'Neutral', element: 'Fire' },
  { name: 'Tian Fu', chineseName: '天府', nature: 'Auspicious', element: 'Earth' },
  { name: 'Tai Yin', chineseName: '太阴', nature: 'Auspicious', element: 'Water' },
  { name: 'Tan Lang', chineseName: '贪狼', nature: 'Neutral', element: 'Wood' },
  { name: 'Ju Men', chineseName: '巨门', nature: 'Inauspicious', element: 'Water' },
  { name: 'Tian Xiang', chineseName: '天相', nature: 'Auspicious', element: 'Water' },
  { name: 'Tian Liang', chineseName: '天梁', nature: 'Auspicious', element: 'Earth' },
  { name: 'Qi Sha', chineseName: '七杀', nature: 'Inauspicious', element: 'Metal' },
  { name: 'Po Jun', chineseName: '破军', nature: 'Inauspicious', element: 'Water' },
];

/**
 * Zi Wei star placement offsets relative to the Zi Wei star position.
 * In classical Zi Wei Dou Shu, each of the 14 major stars has a fixed
 * positional relationship to Zi Wei. These offsets are simplified but
 * follow the general traditional pattern.
 */
const ZI_WEI_GROUP_OFFSETS: Record<string, number> = {
  'Zi Wei': 0,
  'Tian Ji': -1,
  'Tai Yang': -3,
  'Wu Qu': -4,
  'Tian Tong': -5,
  'Lian Zhen': -8,
};

const TIAN_FU_GROUP_OFFSETS: Record<string, number> = {
  'Tian Fu': 0,
  'Tai Yin': 1,
  'Tan Lang': 2,
  'Ju Men': 3,
  'Tian Xiang': 4,
  'Tian Liang': 5,
  'Qi Sha': 6,
  'Po Jun': 10,
};

// ===== Patterns =====

interface PatternDef {
  name: string;
  chineseName: string;
  description: string;
  check: (palaces: ZiWeiPalace[]) => boolean;
}

const PATTERNS: PatternDef[] = [
  {
    name: 'Ke Quan Lu',
    chineseName: '科权禄',
    description: 'The Triple Excellence pattern indicates scholarly achievement, authoritative presence, and material prosperity working in harmony. Those with this pattern attract success through both intellect and social influence.',
    check: (palaces) => {
      const lifeStars = palaces[0].stars.map(s => s.name);
      return lifeStars.includes('Zi Wei') || (lifeStars.includes('Tian Ji') && lifeStars.includes('Tian Liang'));
    },
  },
  {
    name: 'Zi Wei Sitting Life',
    chineseName: '紫微坐命',
    description: 'The Emperor Star sits in the Life Palace, bestowing natural leadership qualities, noble bearing, and the ability to command respect. You are destined to take charge and guide others.',
    check: (palaces) => palaces[0].stars.some(s => s.name === 'Zi Wei'),
  },
  {
    name: 'Sun Moon Together',
    chineseName: '日月同宫',
    description: 'When the Sun (Tai Yang) and Moon (Tai Yin) appear in the same or opposing palaces, it creates a powerful balance of active and receptive energies. This pattern grants emotional depth alongside outward brilliance.',
    check: (palaces) => {
      for (const p of palaces) {
        const names = p.stars.map(s => s.name);
        if (names.includes('Tai Yang') && names.includes('Tai Yin')) return true;
      }
      return false;
    },
  },
  {
    name: 'Fu Xing Gong Zhao',
    chineseName: '福星拱照',
    description: 'Blessing Stars illuminate your chart from supporting positions, indicating that you will receive help and good fortune from unexpected quarters throughout life. Benefactors appear at crucial moments.',
    check: (palaces) => {
      const fortuneStars = palaces[10].stars.map(s => s.name);
      return fortuneStars.includes('Tian Tong') || fortuneStars.includes('Tian Liang');
    },
  },
  {
    name: 'Wu Qu Sitting Wealth',
    chineseName: '武曲坐财',
    description: 'The Wealth Warrior star sits directly in the Wealth Palace, an exceptionally strong indicator of financial acumen and the ability to accumulate wealth through disciplined effort and strategic thinking.',
    check: (palaces) => palaces[4].stars.some(s => s.name === 'Wu Qu'),
  },
  {
    name: 'Qi Sha Facing Life',
    chineseName: '七杀朝斗',
    description: 'The Seven Killings star energizes your chart with fierce determination and an indomitable spirit. While challenging, this pattern produces individuals who overcome great obstacles and achieve through sheer willpower.',
    check: (palaces) => palaces[0].stars.some(s => s.name === 'Qi Sha') || palaces[8].stars.some(s => s.name === 'Qi Sha'),
  },
  {
    name: 'Tian Fu Sitting Life',
    chineseName: '天府坐命',
    description: 'The Celestial Treasury star in the Life Palace indicates a stable, prosperous life with natural talent for resource management. You possess an innate sense of security that attracts abundance.',
    check: (palaces) => palaces[0].stars.some(s => s.name === 'Tian Fu'),
  },
  {
    name: 'Ji Xing Jia Ge',
    chineseName: '吉星夹格',
    description: 'Auspicious stars bracket key palaces in your chart, creating a protective formation. This pattern indicates that positive influences surround your core destiny, smoothing difficulties and amplifying good fortune.',
    check: (palaces) => {
      const lifePrev = palaces[11].stars.filter(s => s.nature === 'Auspicious').length;
      const lifeNext = palaces[1].stars.filter(s => s.nature === 'Auspicious').length;
      return lifePrev >= 1 && lifeNext >= 1;
    },
  },
  {
    name: 'Tan Lang Facing Peach Blossom',
    chineseName: '贪狼桃花',
    description: 'Tan Lang in key positions activates strong romantic charisma and social magnetism. This pattern brings popularity, artistic talent, and a vibrant social life, though it may also bring complex emotional entanglements.',
    check: (palaces) => {
      return palaces[0].stars.some(s => s.name === 'Tan Lang') || palaces[2].stars.some(s => s.name === 'Tan Lang');
    },
  },
  {
    name: 'Ming Li Shuang Shou',
    chineseName: '名利双收',
    description: 'The Fame and Fortune Together pattern appears when beneficial stars align across the Life, Career, and Wealth palaces simultaneously. It heralds both recognition and material reward coming hand in hand.',
    check: (palaces) => {
      const lifeAusp = palaces[0].stars.filter(s => s.nature === 'Auspicious').length;
      const careerAusp = palaces[8].stars.filter(s => s.nature === 'Auspicious').length;
      const wealthAusp = palaces[4].stars.filter(s => s.nature === 'Auspicious').length;
      return lifeAusp >= 1 && careerAusp >= 1 && wealthAusp >= 1;
    },
  },
];

const PALACE_DESCRIPTIONS: Record<string, string> = {
  'Life Palace': 'Defines your core character, innate personality, and how you approach life.',
  'Siblings Palace': 'Reveals relationships with siblings, close peers, and cooperation style.',
  'Spouse Palace': 'Governs romantic partnerships, marriage dynamics, and relationship patterns.',
  'Children Palace': 'Indicates relationships with children and creative endeavors.',
  'Wealth Palace': 'Determines financial capacity, earning potential, and attitude toward money.',
  'Health Palace': 'Shows health tendencies, vulnerabilities, and physical constitution.',
  'Migration Palace': 'Reflects social image, travel fortune, and external circumstances.',
  'Friends Palace': 'Governs friendships, social circles, and support from others.',
  'Career Palace': 'Indicates career direction, professional success, and work style.',
  'Property Palace': 'Relates to real estate, family inheritance, and living environment.',
  'Fortune Palace': 'Reveals spiritual wellbeing, inner happiness, and mental peace.',
  'Parents Palace': 'Shows parental relationships, upbringing influence, and ancestral blessings.',
};

// ===== Utility functions =====

/**
 * Convert a time string (HH:MM) to a Chinese hour branch index (0-11).
 * Zi (子) = 23:00-01:00 = 0
 * Chou (丑) = 01:00-03:00 = 1
 * ...
 * Hai (亥) = 21:00-23:00 = 11
 */
function getHourBranch(timeStr: string): number {
  const [hourStr] = timeStr.split(':');
  const hour = parseInt(hourStr, 10);

  if (hour === 23 || hour === 0) return 0;  // Zi
  return Math.floor((hour + 1) / 2);
}

/**
 * Deterministic hash function for seeded randomness.
 * Returns a float between 0 and 1.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Approximate lunar month from a solar date.
 * This is a simplified approximation using the relationship between
 * solar and lunar calendars. In production, a full lunar calendar
 * library should be used.
 */
function approximateLunarMonth(year: number, month: number, day: number): number {
  // Approximate: lunar month lags solar by ~21 days at start of year
  // and the offset varies. For simplicity, shift month by ~1 and adjust by day.
  const dayOfYear = (month - 1) * 30 + day;
  // Lunar new year is approximately day 30-50 of the solar year
  const lunarDayOfYear = dayOfYear - 30;
  const adjustedDay = lunarDayOfYear > 0 ? lunarDayOfYear : lunarDayOfYear + 354;
  const lunarMonth = Math.ceil(adjustedDay / 29.5);
  return ((lunarMonth - 1) % 12) + 1; // 1-12
}

/**
 * Approximate lunar day from a solar date.
 */
function approximateLunarDay(year: number, month: number, day: number): number {
  // Use a reference new moon and lunar cycle
  const REFERENCE = new Date(2000, 0, 6).getTime(); // Jan 6, 2000 approx new moon
  const SYNODIC = 29.53059;
  const birthMs = new Date(year, month - 1, day).getTime();
  const diffDays = (birthMs - REFERENCE) / (1000 * 60 * 60 * 24);
  let lunarDay = Math.round((diffDays % SYNODIC) + 1);
  if (lunarDay <= 0) lunarDay += 30;
  if (lunarDay > 30) lunarDay = 30;
  return lunarDay;
}

// ===== Main calculation =====

/**
 * Calculate a Zi Wei Dou Shu (Purple Star Astrology) profile.
 *
 * This is a simplified implementation that follows the general principles
 * of Zi Wei Dou Shu calculation:
 * 1. Determine the Life Palace position from birth month and hour
 * 2. Determine the Zi Wei star position from the lunar day
 * 3. Place all 14 major stars using fixed offsets from Zi Wei
 * 4. Identify chart patterns
 *
 * @param dateStr - Birth date in YYYY-MM-DD format
 * @param timeStr - Birth time in HH:MM (24h) format
 * @param gender  - 'male', 'female', or 'other'
 */
export function calculateZiWei(dateStr: string, timeStr: string, gender: string): ZiWeiProfile {
  const { year, month, day } = getDateParts(dateStr);
  const hourBranch = getHourBranch(timeStr);

  // Step 1: Calculate Life Palace index
  // Traditional formula: Start from Yin (index 2), add month, subtract hour
  const lunarMonth = approximateLunarMonth(year, month, day);
  const lifePalaceIndex = ((lunarMonth + 1 - hourBranch + 24) % 12);

  // Step 2: Calculate Body Palace index
  // Body Palace = (month + hour branch) % 12 (simplified)
  const bodyPalaceIndex = ((lunarMonth + 1 + hourBranch) % 12);

  // Step 3: Determine Zi Wei star position based on lunar day
  // In classical ZWDS, the Zi Wei position depends on the Wu Xing Ju (Five Elements Group)
  // and the lunar day number. This is a simplified lookup.
  const lunarDay = approximateLunarDay(year, month, day);
  const ziWeiPosition = getZiWeiPosition(lunarDay, year);

  // Step 4: Calculate Tian Fu position (mirrors Zi Wei across a fixed axis)
  const tianFuPosition = (12 - ziWeiPosition + 8) % 12;

  // Step 5: Place all 14 major stars
  const starPlacements: Map<number, ZiWeiStar[]> = new Map();
  for (let i = 0; i < 12; i++) {
    starPlacements.set(i, []);
  }

  // Place Zi Wei group
  for (const [starName, offset] of Object.entries(ZI_WEI_GROUP_OFFSETS)) {
    const pos = ((ziWeiPosition + offset) % 12 + 12) % 12;
    const star = MAJOR_STARS.find(s => s.name === starName)!;
    starPlacements.get(pos)!.push(star);
  }

  // Place Tian Fu group
  for (const [starName, offset] of Object.entries(TIAN_FU_GROUP_OFFSETS)) {
    const pos = ((tianFuPosition + offset) % 12 + 12) % 12;
    const star = MAJOR_STARS.find(s => s.name === starName)!;
    starPlacements.get(pos)!.push(star);
  }

  // Step 6: Ensure Life Palace has at least one star
  // If the Life Palace ended up empty (rare edge case), use seeded placement
  if (starPlacements.get(lifePalaceIndex)!.length === 0) {
    const seed = year * 10000 + month * 100 + day;
    const starIndex = Math.floor(seededRandom(seed) * MAJOR_STARS.length);
    const fallbackStar = MAJOR_STARS[starIndex];
    starPlacements.get(lifePalaceIndex)!.push(fallbackStar);
  }

  // Step 7: Build palace objects
  const palaces: ZiWeiPalace[] = PALACE_NAMES.map((palaceDef, index) => {
    // Remap: the palace at position (lifePalaceIndex + i) % 12 is palace i
    const actualPosition = (lifePalaceIndex + index) % 12;
    return {
      name: palaceDef.name,
      chineseName: palaceDef.chineseName,
      position: actualPosition,
      stars: starPlacements.get(actualPosition) || [],
      description: PALACE_DESCRIPTIONS[palaceDef.name] || '',
    };
  });

  // Step 8: Identify the main pattern
  let mainPattern = 'Ming Li Shuang Shou';
  let patternDescription = PATTERNS.find(p => p.name === 'Ming Li Shuang Shou')!.description;

  for (const pattern of PATTERNS) {
    if (pattern.check(palaces)) {
      mainPattern = pattern.name;
      patternDescription = pattern.description;
      break;
    }
  }

  // Step 9: Determine main star (first star in Life Palace)
  const lifePalace = palaces[0]; // index 0 is always Life Palace in our array
  const mainStar = lifePalace.stars.length > 0 ? lifePalace.stars[0].name : 'Tian Ji';

  // Career Palace is index 8, Wealth Palace is index 4, Migration Palace is index 6
  const careerPalace = palaces[8];
  const wealthPalace = palaces[4];
  const migrationPalace = palaces[6];

  return {
    lifePalaceIndex,
    bodyPalaceIndex,
    palaces,
    mainPattern,
    patternDescription,
    mainStar,
    lifePalace,
    careerPalace,
    wealthPalace,
    migrationPalace,
  };
}

/**
 * Determine Zi Wei star position from lunar day and year.
 *
 * In classical ZWDS, the Zi Wei position depends on the Wu Xing Ju
 * (Five Elements Group Number, derived from the Heavenly Stem and
 * Earthly Branch of the birth year) and the lunar day. This simplified
 * version uses a lookup approach.
 *
 * The Wu Xing Ju can be 2 (Water), 3 (Wood), 4 (Metal), 5 (Earth), or 6 (Fire).
 * Each group maps lunar days 1-30 to one of the 12 positions (0-11).
 */
function getZiWeiPosition(lunarDay: number, year: number): number {
  // Simplified Wu Xing Ju derivation
  const heavenlyStemIndex = (year - 4) % 10;
  const earthlyBranchIndex = (year - 4) % 12;
  // Traditional formula: wuXingJu = ((heavenlyStem + earthlyBranch) % 5) + 2
  const wuXingJu = ((heavenlyStemIndex + earthlyBranchIndex) % 5) + 2;

  // Simplified position mapping: position shifts with lunarDay / wuXingJu
  // In proper ZWDS, there is a large lookup table per Wu Xing Ju
  const basePosition = Math.floor((lunarDay - 1) / wuXingJu);
  return basePosition % 12;
}
