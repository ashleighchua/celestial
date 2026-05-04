import { getDateParts } from '@/lib/utils';

// ============================================================
// Interfaces
// ============================================================

export interface BaZiPillar {
  heavenlyStem: string;
  earthlyBranch: string;
  stemElement: string;
  branchElement: string;
  stemChinese: string;
  branchChinese: string;
}

export interface BaZiProfile {
  yearPillar: BaZiPillar;
  monthPillar: BaZiPillar;
  dayPillar: BaZiPillar;
  hourPillar: BaZiPillar;
  dayMaster: string;
  dayMasterElement: string;
  dayMasterYinYang: 'Yin' | 'Yang';
  fiveElements: { wood: number; fire: number; earth: number; metal: number; water: number };
  dominantElement: string;
  weakestElement: string;
  favorableElements: string[];
  luckyColors: string[];
  luckyDirections: string[];
  luckyNumbers: number[];
  strength: 'Extremely Strong' | 'Strong' | 'Balanced' | 'Weak' | 'Extremely Weak';
  pattern: string;
}

// ============================================================
// Heavenly Stems (10)
// ============================================================

const HEAVENLY_STEMS = [
  'Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui',
] as const;

const STEM_CHINESE = [
  '\u7532', '\u4E59', '\u4E19', '\u4E01', '\u620A', '\u5DF1', '\u5E9A', '\u8F9B', '\u58EC', '\u7678',
] as const;

const STEM_ELEMENTS: Record<string, string> = {
  Jia: 'Wood', Yi: 'Wood',
  Bing: 'Fire', Ding: 'Fire',
  Wu: 'Earth', Ji: 'Earth',
  Geng: 'Metal', Xin: 'Metal',
  Ren: 'Water', Gui: 'Water',
};

const STEM_YIN_YANG: Record<string, 'Yin' | 'Yang'> = {
  Jia: 'Yang', Yi: 'Yin',
  Bing: 'Yang', Ding: 'Yin',
  Wu: 'Yang', Ji: 'Yin',
  Geng: 'Yang', Xin: 'Yin',
  Ren: 'Yang', Gui: 'Yin',
};

// ============================================================
// Earthly Branches (12)
// ============================================================

const EARTHLY_BRANCHES = [
  'Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si',
  'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai',
] as const;

const BRANCH_CHINESE = [
  '\u5B50', '\u4E11', '\u5BC5', '\u536F', '\u8FB0', '\u5DF3',
  '\u5348', '\u672A', '\u7533', '\u9149', '\u620C', '\u4EA5',
] as const;

const BRANCH_ANIMALS = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
] as const;

const BRANCH_ELEMENTS: Record<string, string> = {
  Zi: 'Water', Chou: 'Earth', Yin: 'Wood', Mao: 'Wood',
  Chen: 'Earth', Si: 'Fire', Wu: 'Fire', Wei: 'Earth',
  Shen: 'Metal', You: 'Metal', Xu: 'Earth', Hai: 'Water',
};

// ============================================================
// Solar term boundaries for month determination
// Month 1 starts around February 4, Month 2 around March 6, etc.
// ============================================================

const SOLAR_MONTH_STARTS = [
  { month: 1, startMonth: 2, startDay: 4 },   // Yin  (Tiger)
  { month: 2, startMonth: 3, startDay: 6 },   // Mao  (Rabbit)
  { month: 3, startMonth: 4, startDay: 5 },   // Chen (Dragon)
  { month: 4, startMonth: 5, startDay: 6 },   // Si   (Snake)
  { month: 5, startMonth: 6, startDay: 6 },   // Wu   (Horse)
  { month: 6, startMonth: 7, startDay: 7 },   // Wei  (Goat)
  { month: 7, startMonth: 8, startDay: 7 },   // Shen (Monkey)
  { month: 8, startMonth: 9, startDay: 8 },   // You  (Rooster)
  { month: 9, startMonth: 10, startDay: 8 },  // Xu   (Dog)
  { month: 10, startMonth: 11, startDay: 7 }, // Hai  (Pig)
  { month: 11, startMonth: 12, startDay: 7 }, // Zi   (Rat)
  { month: 12, startMonth: 1, startDay: 6 },  // Chou (Ox)
] as const;

// ============================================================
// Element lucky associations
// ============================================================

const ELEMENT_COLORS: Record<string, string[]> = {
  Wood: ['Green', 'Teal'],
  Fire: ['Red', 'Pink', 'Orange'],
  Earth: ['Yellow', 'Brown', 'Beige'],
  Metal: ['White', 'Gold', 'Silver'],
  Water: ['Black', 'Blue', 'Navy'],
};

const ELEMENT_DIRECTIONS: Record<string, string[]> = {
  Wood: ['East', 'Southeast'],
  Fire: ['South'],
  Earth: ['Center', 'Northeast', 'Southwest'],
  Metal: ['West', 'Northwest'],
  Water: ['North'],
};

const ELEMENT_NUMBERS: Record<string, number[]> = {
  Wood: [3, 8],
  Fire: [2, 7],
  Earth: [5, 0],
  Metal: [4, 9],
  Water: [1, 6],
};

// ============================================================
// The generating (productive) and controlling (destructive) cycles
// ============================================================

const GENERATING_CYCLE: Record<string, string> = {
  Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood',
};

const CONTROLLING_CYCLE: Record<string, string> = {
  Wood: 'Earth', Fire: 'Metal', Earth: 'Water', Metal: 'Wood', Water: 'Fire',
};

// What generates a given element (reverse of GENERATING_CYCLE)
const GENERATED_BY: Record<string, string> = {
  Wood: 'Water', Fire: 'Wood', Earth: 'Fire', Metal: 'Earth', Water: 'Metal',
};

// ============================================================
// Five Tigers Escape (Month stem from year stem)
// ============================================================

/**
 * Given the year stem index (0-9), returns the stem index for month 1 (Tiger month).
 * Jia/Ji year -> month 1 stem = Bing (index 2)
 * Yi/Geng    -> Wu  (index 4)
 * Bing/Xin   -> Geng (index 6)
 * Ding/Ren   -> Ren  (index 8)
 * Wu/Gui     -> Jia  (index 0)
 */
function getMonth1StemIndex(yearStemIndex: number): number {
  const base = yearStemIndex % 5;
  const mapping = [2, 4, 6, 8, 0]; // Jia/Ji=2, Yi/Geng=4, Bing/Xin=6, Ding/Ren=8, Wu/Gui=0
  return mapping[base];
}

// ============================================================
// Five Rats Escape (Hour stem from day stem)
// ============================================================

/**
 * Given the day stem index (0-9), returns the stem index for hour Zi (23:00-01:00).
 * Jia/Ji day  -> Zi stem = Jia  (index 0)
 * Yi/Geng     -> Bing (index 2)
 * Bing/Xin    -> Wu   (index 4)
 * Ding/Ren    -> Geng (index 6)
 * Wu/Gui      -> Ren  (index 8)
 */
function getHour0StemIndex(dayStemIndex: number): number {
  const base = dayStemIndex % 5;
  const mapping = [0, 2, 4, 6, 8]; // Jia/Ji=0, Yi/Geng=2, Bing/Xin=4, Ding/Ren=6, Wu/Gui=8
  return mapping[base];
}

// ============================================================
// Determine the Chinese solar month from a Gregorian date
// ============================================================

/**
 * Returns the Chinese solar month (1-12) for a given Gregorian date.
 * Also adjusts the "BaZi year" — before Lichun (Feb 4) the year is considered
 * the previous year in the Chinese calendar.
 */
function getSolarMonth(year: number, month: number, day: number): { baziYear: number; solarMonth: number } {
  let baziYear = year;

  // Check if before Lichun (approx Feb 4). If so, still in previous year.
  if (month < 2 || (month === 2 && day < 4)) {
    baziYear = year - 1;
  }

  // Determine which solar month we're in
  let solarMonth = 12; // default: month 12 (Chou / Ox), Jan 6 - Feb 3
  for (let i = SOLAR_MONTH_STARTS.length - 1; i >= 0; i--) {
    const sm = SOLAR_MONTH_STARTS[i];
    if (month > sm.startMonth || (month === sm.startMonth && day >= sm.startDay)) {
      solarMonth = sm.month;
      break;
    }
  }

  // Special handling: December month start (month 12 = Chou starts Jan 6)
  // If Gregorian month is January and day < 6, it's still month 11 (Zi)
  if (month === 1 && day < 6) {
    solarMonth = 11;
  }

  return { baziYear, solarMonth };
}

// ============================================================
// Hour branch index from time
// ============================================================

function getHourBranchIndex(hour: number, minute: number): number {
  const totalMinutes = hour * 60 + minute;
  // Zi: 23:00-00:59 (1380-1439 or 0-59)
  if (totalMinutes >= 1380 || totalMinutes < 60) return 0;
  // Chou: 01:00-02:59
  if (totalMinutes < 180) return 1;
  // Yin: 03:00-04:59
  if (totalMinutes < 300) return 2;
  // Mao: 05:00-06:59
  if (totalMinutes < 420) return 3;
  // Chen: 07:00-08:59
  if (totalMinutes < 540) return 4;
  // Si: 09:00-10:59
  if (totalMinutes < 660) return 5;
  // Wu: 11:00-12:59
  if (totalMinutes < 780) return 6;
  // Wei: 13:00-14:59
  if (totalMinutes < 900) return 7;
  // Shen: 15:00-16:59
  if (totalMinutes < 1020) return 8;
  // You: 17:00-18:59
  if (totalMinutes < 1140) return 9;
  // Xu: 19:00-20:59
  if (totalMinutes < 1260) return 10;
  // Hai: 21:00-22:59
  return 11;
}

// ============================================================
// Day pillar calculation using a reference date
// ============================================================

/**
 * Reference: January 1, 2000 has day stem index 6 (Geng) and branch index 8 (Shen).
 * Calculate the number of days from January 1, 2000 to the target date,
 * then compute stem and branch indices.
 */
function getDayPillarIndices(year: number, month: number, day: number): { stemIndex: number; branchIndex: number } {
  const refDate = Date.UTC(2000, 0, 1); // Jan 1, 2000
  const targetDate = Date.UTC(year, month - 1, day);
  const daysDiff = Math.round((targetDate - refDate) / 86400000);

  // Reference offsets: Jan 1, 2000 -> stem=6, branch=8
  let stemIndex = ((daysDiff + 6) % 10);
  if (stemIndex < 0) stemIndex += 10;

  let branchIndex = ((daysDiff + 8) % 12);
  if (branchIndex < 0) branchIndex += 12;

  return { stemIndex, branchIndex };
}

// ============================================================
// Build a pillar from stem and branch indices
// ============================================================

function buildPillar(stemIndex: number, branchIndex: number): BaZiPillar {
  const si = ((stemIndex % 10) + 10) % 10;
  const bi = ((branchIndex % 12) + 12) % 12;

  const heavenlyStem = HEAVENLY_STEMS[si];
  const earthlyBranch = EARTHLY_BRANCHES[bi];

  return {
    heavenlyStem,
    earthlyBranch,
    stemElement: STEM_ELEMENTS[heavenlyStem],
    branchElement: BRANCH_ELEMENTS[earthlyBranch],
    stemChinese: STEM_CHINESE[si],
    branchChinese: BRANCH_CHINESE[bi],
  };
}

// ============================================================
// Five Elements percentage calculation
// ============================================================

interface ElementWeights {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

function calculateElementWeights(pillars: BaZiPillar[]): ElementWeights {
  const weights: ElementWeights = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  const STEM_WEIGHT = 1.0;
  const BRANCH_WEIGHT = 0.8;

  for (const pillar of pillars) {
    const stemEl = pillar.stemElement.toLowerCase() as keyof ElementWeights;
    const branchEl = pillar.branchElement.toLowerCase() as keyof ElementWeights;
    weights[stemEl] += STEM_WEIGHT;
    weights[branchEl] += BRANCH_WEIGHT;
  }

  // Convert to percentages
  const total = weights.wood + weights.fire + weights.earth + weights.metal + weights.water;
  if (total > 0) {
    weights.wood = Math.round((weights.wood / total) * 100);
    weights.fire = Math.round((weights.fire / total) * 100);
    weights.earth = Math.round((weights.earth / total) * 100);
    weights.metal = Math.round((weights.metal / total) * 100);
    weights.water = Math.round((weights.water / total) * 100);

    // Adjust rounding so total = 100
    const sum = weights.wood + weights.fire + weights.earth + weights.metal + weights.water;
    if (sum !== 100) {
      const diff = 100 - sum;
      // Add/subtract from the largest element
      const entries = Object.entries(weights) as [keyof ElementWeights, number][];
      entries.sort((a, b) => b[1] - a[1]);
      weights[entries[0][0]] += diff;
    }
  }

  return weights;
}

// ============================================================
// Day Master strength assessment
// ============================================================

function assessStrength(
  dayMasterElement: string,
  fiveElements: ElementWeights
): 'Extremely Strong' | 'Strong' | 'Balanced' | 'Weak' | 'Extremely Weak' {
  const el = dayMasterElement.toLowerCase() as keyof ElementWeights;
  const selfStrength = fiveElements[el];
  const generatorEl = GENERATED_BY[dayMasterElement].toLowerCase() as keyof ElementWeights;
  const supportStrength = selfStrength + fiveElements[generatorEl];

  if (supportStrength >= 65) return 'Extremely Strong';
  if (supportStrength >= 50) return 'Strong';
  if (supportStrength >= 35) return 'Balanced';
  if (supportStrength >= 20) return 'Weak';
  return 'Extremely Weak';
}

// ============================================================
// Favorable elements
// ============================================================

function getFavorableElements(
  dayMasterElement: string,
  strength: string
): string[] {
  if (strength === 'Extremely Weak' || strength === 'Weak') {
    // Needs strengthening: same element + element that generates it
    const generator = GENERATED_BY[dayMasterElement];
    return [dayMasterElement, generator];
  }
  if (strength === 'Extremely Strong' || strength === 'Strong') {
    // Needs weakening: element it generates (exhausts) + element that controls it
    const exhausts = GENERATING_CYCLE[dayMasterElement];
    const controller = Object.entries(CONTROLLING_CYCLE).find(
      ([, v]) => v === dayMasterElement
    )?.[0] || '';
    return [exhausts, controller].filter(Boolean);
  }
  // Balanced: the controlling element and the element it generates
  const exhausts = GENERATING_CYCLE[dayMasterElement];
  const controller = Object.entries(CONTROLLING_CYCLE).find(
    ([, v]) => v === dayMasterElement
  )?.[0] || '';
  return [exhausts, controller].filter(Boolean);
}

// ============================================================
// Pattern determination
// ============================================================

function determinePattern(
  dayMasterElement: string,
  fiveElements: ElementWeights,
  strength: string
): string {
  const el = dayMasterElement.toLowerCase() as keyof ElementWeights;
  const generatesEl = GENERATING_CYCLE[dayMasterElement].toLowerCase() as keyof ElementWeights;
  const controlsEl = CONTROLLING_CYCLE[dayMasterElement].toLowerCase() as keyof ElementWeights;
  const generatedByEl = GENERATED_BY[dayMasterElement].toLowerCase() as keyof ElementWeights;
  const controlledByKey = Object.entries(CONTROLLING_CYCLE).find(
    ([, v]) => v === dayMasterElement
  )?.[0] || '';
  const controlledByEl = controlledByKey.toLowerCase() as keyof ElementWeights;

  // Output / Talent: the element the day master generates
  const outputPct = fiveElements[generatesEl] || 0;
  // Wealth: the element the day master controls
  const wealthPct = fiveElements[controlsEl] || 0;
  // Resource / Support: the element that generates the day master
  const resourcePct = fiveElements[generatedByEl] || 0;
  // Power / Authority: the element that controls the day master
  const powerPct = controlledByEl ? (fiveElements[controlledByEl] || 0) : 0;
  // Companion: same element
  const companionPct = fiveElements[el] || 0;

  // Determine dominant interaction
  const scores = [
    { name: 'Scholarly Pattern', score: outputPct },
    { name: 'Wealth Pattern', score: wealthPct },
    { name: 'Resource Pattern', score: resourcePct },
    { name: 'Authority Pattern', score: powerPct },
    { name: 'Companion Pattern', score: companionPct },
  ];

  scores.sort((a, b) => b.score - a.score);

  // Refinements based on strength
  if (strength === 'Extremely Strong' && companionPct >= 30) {
    return 'Dominant Pattern';
  }
  if (strength === 'Extremely Weak' && companionPct <= 5) {
    return 'Follow Pattern';
  }
  if (outputPct >= 30 && (strength === 'Strong' || strength === 'Extremely Strong')) {
    return 'Scholarly Pattern';
  }
  if (wealthPct >= 30 && (strength === 'Strong' || strength === 'Balanced')) {
    return 'Wealth Pattern';
  }
  if (powerPct >= 25 && (strength === 'Weak' || strength === 'Balanced')) {
    return 'Authority Pattern';
  }
  if (resourcePct >= 30 && (strength === 'Weak' || strength === 'Extremely Weak')) {
    return 'Resource Pattern';
  }

  return scores[0].name;
}

// ============================================================
// Main calculation function
// ============================================================

export function calculateBaZi(dateStr: string, timeStr: string, gender: string): BaZiProfile {
  const { year, month, day } = getDateParts(dateStr);
  const [hourStr, minuteStr] = timeStr.split(':');
  const hour = parseInt(hourStr, 10) || 12;
  const minute = parseInt(minuteStr, 10) || 0;

  // --- Year Pillar ---
  const { baziYear, solarMonth } = getSolarMonth(year, month, day);
  const yearStemIndex = ((baziYear - 4) % 10 + 10) % 10;
  const yearBranchIndex = ((baziYear - 4) % 12 + 12) % 12;
  const yearPillar = buildPillar(yearStemIndex, yearBranchIndex);

  // --- Month Pillar ---
  // Branch: solarMonth 1 = Tiger (index 2), solarMonth 2 = Rabbit (index 3), etc.
  const monthBranchIndex = (solarMonth + 1) % 12; // month 1 -> index 2 (Yin/Tiger)
  const month1StemIndex = getMonth1StemIndex(yearStemIndex);
  const monthStemIndex = (month1StemIndex + (solarMonth - 1)) % 10;
  const monthPillar = buildPillar(monthStemIndex, monthBranchIndex);

  // --- Day Pillar ---
  // For late-night Zi hour (23:00-23:59), some practitioners advance the day.
  // We use the "early Zi" convention: 23:00-00:59 belongs to the NEXT day's Zi hour.
  let adjustedDay = day;
  let adjustedMonth = month;
  let adjustedYear = year;
  if (hour >= 23) {
    const d = new Date(year, month - 1, day + 1);
    adjustedDay = d.getDate();
    adjustedMonth = d.getMonth() + 1;
    adjustedYear = d.getFullYear();
  }
  const dayIndices = getDayPillarIndices(adjustedYear, adjustedMonth, adjustedDay);
  const dayPillar = buildPillar(dayIndices.stemIndex, dayIndices.branchIndex);

  // --- Hour Pillar ---
  const hourBranchIndex = getHourBranchIndex(hour, minute);
  const hour0StemIndex = getHour0StemIndex(dayIndices.stemIndex);
  const hourStemIndex = (hour0StemIndex + hourBranchIndex) % 10;
  const hourPillar = buildPillar(hourStemIndex, hourBranchIndex);

  // --- Day Master ---
  const dayMaster = dayPillar.heavenlyStem;
  const dayMasterElement = STEM_ELEMENTS[dayMaster];
  const dayMasterYinYang = STEM_YIN_YANG[dayMaster];

  // --- Five Elements ---
  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const fiveElements = calculateElementWeights(pillars);

  // --- Dominant & Weakest ---
  const elementEntries = Object.entries(fiveElements) as [keyof ElementWeights, number][];
  elementEntries.sort((a, b) => b[1] - a[1]);
  const dominantElement = elementEntries[0][0].charAt(0).toUpperCase() + elementEntries[0][0].slice(1);
  const weakestElement = elementEntries[elementEntries.length - 1][0].charAt(0).toUpperCase() +
    elementEntries[elementEntries.length - 1][0].slice(1);

  // --- Strength ---
  const strength = assessStrength(dayMasterElement, fiveElements);

  // --- Favorable Elements ---
  const favorableElements = getFavorableElements(dayMasterElement, strength);

  // --- Lucky Colors, Directions, Numbers ---
  const luckyColors = favorableElements.flatMap(el => ELEMENT_COLORS[el] || []);
  const luckyDirections = favorableElements.flatMap(el => ELEMENT_DIRECTIONS[el] || []);
  const luckyNumbers = favorableElements.flatMap(el => ELEMENT_NUMBERS[el] || []);

  // --- Pattern ---
  const pattern = determinePattern(dayMasterElement, fiveElements, strength);

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster,
    dayMasterElement,
    dayMasterYinYang,
    fiveElements,
    dominantElement,
    weakestElement,
    favorableElements,
    luckyColors,
    luckyDirections,
    luckyNumbers,
    strength,
    pattern,
  };
}
