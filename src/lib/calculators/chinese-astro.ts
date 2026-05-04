import { getDateParts } from '@/lib/utils';

// ============================================================
// Interfaces
// ============================================================

export interface LifeStar {
  name: string;
  chineseName: string;
  palace: string;
  role: string; // "Life Master", "Grace Star", "Use Star", "Difficulty Star", "Wealth Star", "Servant Star"
  element: string;
  description: string;
}

export interface ChineseAstroProfile {
  stars: LifeStar[];
  lifeMaster: LifeStar; // 命主 - most important
  graceStar: LifeStar; // 恩星 - benefactor
  useStar: LifeStar; // 用星 - utility
  difficultyStar: LifeStar; // 难星 - challenges
  wealthStar: LifeStar; // 财星 - wealth
  servantStar: LifeStar; // 余奴 - support
  overallPattern: string;
  suitableIndustries: string[];
  compatiblePartnerElement: string;
}

// ============================================================
// Heavenly Stems & Earthly Branches (shared with BaZi)
// ============================================================

const HEAVENLY_STEMS = [
  'Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui',
] as const;

const EARTHLY_BRANCHES = [
  'Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si',
  'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai',
] as const;

const STEM_ELEMENTS: Record<string, string> = {
  Jia: 'Wood', Yi: 'Wood',
  Bing: 'Fire', Ding: 'Fire',
  Wu: 'Earth', Ji: 'Earth',
  Geng: 'Metal', Xin: 'Metal',
  Ren: 'Water', Gui: 'Water',
};

const BRANCH_ELEMENTS: Record<string, string> = {
  Zi: 'Water', Chou: 'Earth', Yin: 'Wood', Mao: 'Wood',
  Chen: 'Earth', Si: 'Fire', Wu: 'Fire', Wei: 'Earth',
  Shen: 'Metal', You: 'Metal', Xu: 'Earth', Hai: 'Water',
};

// ============================================================
// 12 Palaces (similar to Zi Wei Dou Shu)
// ============================================================

const PALACES = [
  'Life', 'Siblings', 'Spouse', 'Children', 'Wealth', 'Health',
  'Migration', 'Friends', 'Career', 'Property', 'Fortune', 'Parents',
] as const;

// ============================================================
// Five Element Cycles
// ============================================================

const GENERATING_CYCLE: Record<string, string> = {
  Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood',
};

const CONTROLLING_CYCLE: Record<string, string> = {
  Wood: 'Earth', Fire: 'Metal', Earth: 'Water', Metal: 'Wood', Water: 'Fire',
};

const GENERATED_BY: Record<string, string> = {
  Wood: 'Water', Fire: 'Wood', Earth: 'Fire', Metal: 'Earth', Water: 'Metal',
};

// What element is controlled by the given element (reverse lookup)
const CONTROLLED_BY: Record<string, string> = {
  Wood: 'Metal', Fire: 'Water', Earth: 'Wood', Metal: 'Fire', Water: 'Earth',
};

// Complementary element for partner compatibility (element that generates day master)
const COMPLEMENTARY_ELEMENT: Record<string, string> = {
  Wood: 'Water', Fire: 'Wood', Earth: 'Fire', Metal: 'Earth', Water: 'Metal',
};

// ============================================================
// Industry mappings by element
// ============================================================

const ELEMENT_INDUSTRIES: Record<string, string[]> = {
  Wood: ['Education', 'Publishing', 'Agriculture', 'Fashion', 'Herbal medicine', 'Furniture'],
  Fire: ['Technology', 'Entertainment', 'Media', 'Restaurants', 'Energy', 'Marketing'],
  Earth: ['Real estate', 'Construction', 'Ceramics', 'Agriculture', 'Mining', 'Insurance'],
  Metal: ['Finance', 'Engineering', 'Automotive', 'Jewelry', 'Banking', 'Law enforcement'],
  Water: ['Shipping', 'Beverages', 'Travel', 'Fishing', 'Import/Export', 'Logistics'],
};

// ============================================================
// Star description templates
// ============================================================

const STAR_DESCRIPTIONS: Record<string, Record<string, string>> = {
  'Life Master': {
    Wood: 'Your life force is rooted in growth and expansion. Like a mighty tree, you thrive when reaching upward and outward. Your natural tendency is toward creativity, compassion, and visionary thinking. You excel in environments that allow you to nurture and cultivate both ideas and relationships.',
    Fire: 'Your life force burns with passion and intensity. You are a natural leader with magnetic charisma, drawn to self-expression and bold action. Your warmth and enthusiasm inspire those around you, and you excel when given a stage or platform.',
    Earth: 'Your life force is grounded and enduring. You possess a natural stability that others rely upon. Practical and methodical, you build lasting foundations in everything you do. Your trustworthiness and patience are your greatest strengths.',
    Metal: 'Your life force is sharp and refined. You have an innate sense of justice and precision, with an analytical mind that cuts through complexity. You value structure, discipline, and excellence, and you hold yourself to the highest standards.',
    Water: 'Your life force flows with wisdom and adaptability. Like water, you navigate around obstacles with grace and find the path of least resistance. Your intuition is powerful, and you have a deep capacity for understanding human nature.',
  },
  'Grace Star': {
    Wood: 'Your benefactor energy comes through mentorship and education. Teachers, counselors, and creative guides naturally enter your life to support your journey. Cultural and artistic endeavors open doors of grace for you.',
    Fire: 'Your benefactor energy arrives through passionate connections and public recognition. Charismatic leaders and influential figures become your allies. Opportunities come through visibility and bold initiatives.',
    Earth: 'Your benefactor energy manifests through reliable partnerships and grounded support. Established institutions and trustworthy mentors provide your foundation. Patience and loyalty attract your greatest allies.',
    Metal: 'Your benefactor energy comes through structured networks and professional connections. Financial advisors, engineers, and strategic thinkers support your path. Precision and discipline attract your greatest allies.',
    Water: 'Your benefactor energy flows through intuitive connections and wisdom traditions. Spiritual teachers, healers, and creative souls support your journey. Your empathy and insight attract deep, meaningful alliances.',
  },
  'Use Star': {
    Wood: 'Your practical talent lies in growth and development. You excel at nurturing projects from seed to fruition. Teaching, counseling, and any field requiring patient cultivation suit you well.',
    Fire: 'Your practical talent lies in leadership and inspiration. You excel at motivating teams, creating spectacles, and driving ambitious projects forward. Performance, marketing, and executive roles suit you well.',
    Earth: 'Your practical talent lies in management and stability. You excel at organizing resources, building systems, and creating lasting value. Administrative roles, real estate, and consulting suit you well.',
    Metal: 'Your practical talent lies in analysis and refinement. You excel at improving systems, cutting waste, and achieving precision. Finance, engineering, and quality control suit you well.',
    Water: 'Your practical talent lies in communication and strategy. You excel at reading situations, negotiating, and adapting to changing conditions. Trade, diplomacy, and creative fields suit you well.',
  },
  'Difficulty Star': {
    Wood: 'Your challenges come through excess ambition and scattered energy. The tendency to overextend or grow in too many directions simultaneously can lead to burnout. Learning focus and saying no is essential for your development.',
    Fire: 'Your challenges come through impulsiveness and ego struggles. The intensity of your passions can burn bridges and create conflicts. Learning patience, diplomacy, and emotional regulation is essential for your development.',
    Earth: 'Your challenges come through stubbornness and resistance to change. Your desire for stability can become rigidity, blocking necessary transformation. Learning flexibility and openness to new approaches is essential for your development.',
    Metal: 'Your challenges come through perfectionism and harsh self-criticism. Your high standards can become isolating when applied too rigidly to yourself and others. Learning self-compassion and acceptance of imperfection is essential for your development.',
    Water: 'Your challenges come through indecision and emotional overwhelm. Your sensitivity and adaptability can lead to passivity or being swept along by others. Learning to set boundaries and trust your own direction is essential for your development.',
  },
  'Wealth Star': {
    Wood: 'Your wealth potential grows organically through long-term investments and patient cultivation. Education, intellectual property, and sustainable ventures are your paths to prosperity. Wealth comes through planting seeds today for future harvests.',
    Fire: 'Your wealth potential ignites through bold ventures and public-facing enterprises. Branding, entertainment, and technology are your paths to prosperity. Wealth comes through charisma, timing, and decisive action.',
    Earth: 'Your wealth potential builds through steady accumulation and property. Real estate, tangible assets, and conservative investments are your paths to prosperity. Wealth comes through patience, consistency, and practical wisdom.',
    Metal: 'Your wealth potential sharpens through precision and strategic positioning. Financial markets, precious materials, and high-value services are your paths to prosperity. Wealth comes through discipline, quality, and calculated risk.',
    Water: 'Your wealth potential flows through trade, movement, and fluid enterprises. Import/export, travel, beverages, and adaptive businesses are your paths to prosperity. Wealth comes through flexibility, timing, and reading market currents.',
  },
  'Servant Star': {
    Wood: 'Your support network is built through shared learning and mutual growth. Younger mentees, students, and creative collaborators form your base of support. You inspire loyalty through your generosity and vision.',
    Fire: 'Your support network is built through shared passion and exciting ventures. Enthusiastic followers, loyal fans, and energized teams form your base of support. You inspire loyalty through your warmth and boldness.',
    Earth: 'Your support network is built through reliability and steady care. Dependable assistants, long-term employees, and community members form your base of support. You inspire loyalty through your consistency and fairness.',
    Metal: 'Your support network is built through professional respect and structured relationships. Skilled specialists, disciplined workers, and precise collaborators form your base of support. You inspire loyalty through your standards and integrity.',
    Water: 'Your support network is built through emotional intelligence and adaptability. Intuitive helpers, creative souls, and empathetic allies form your base of support. You inspire loyalty through your understanding and flexibility.',
  },
};

// ============================================================
// Solar month determination (same as BaZi)
// ============================================================

const SOLAR_MONTH_STARTS = [
  { month: 1, startMonth: 2, startDay: 4 },
  { month: 2, startMonth: 3, startDay: 6 },
  { month: 3, startMonth: 4, startDay: 5 },
  { month: 4, startMonth: 5, startDay: 6 },
  { month: 5, startMonth: 6, startDay: 6 },
  { month: 6, startMonth: 7, startDay: 7 },
  { month: 7, startMonth: 8, startDay: 7 },
  { month: 8, startMonth: 9, startDay: 8 },
  { month: 9, startMonth: 10, startDay: 8 },
  { month: 10, startMonth: 11, startDay: 7 },
  { month: 11, startMonth: 12, startDay: 7 },
  { month: 12, startMonth: 1, startDay: 6 },
] as const;

function getSolarMonth(year: number, month: number, day: number): { baziYear: number; solarMonth: number } {
  let baziYear = year;
  if (month < 2 || (month === 2 && day < 4)) {
    baziYear = year - 1;
  }

  let solarMonth = 12;
  for (let i = SOLAR_MONTH_STARTS.length - 1; i >= 0; i--) {
    const sm = SOLAR_MONTH_STARTS[i];
    if (month > sm.startMonth || (month === sm.startMonth && day >= sm.startDay)) {
      solarMonth = sm.month;
      break;
    }
  }

  if (month === 1 && day < 6) {
    solarMonth = 11;
  }

  return { baziYear, solarMonth };
}

// ============================================================
// Pillar calculation helpers (mirrored from BaZi)
// ============================================================

function getMonth1StemIndex(yearStemIndex: number): number {
  const base = yearStemIndex % 5;
  const mapping = [2, 4, 6, 8, 0];
  return mapping[base];
}

function getHour0StemIndex(dayStemIndex: number): number {
  const base = dayStemIndex % 5;
  const mapping = [0, 2, 4, 6, 8];
  return mapping[base];
}

function getHourBranchIndex(hour: number, minute: number): number {
  const totalMinutes = hour * 60 + minute;
  if (totalMinutes >= 1380 || totalMinutes < 60) return 0;
  if (totalMinutes < 180) return 1;
  if (totalMinutes < 300) return 2;
  if (totalMinutes < 420) return 3;
  if (totalMinutes < 540) return 4;
  if (totalMinutes < 660) return 5;
  if (totalMinutes < 780) return 6;
  if (totalMinutes < 900) return 7;
  if (totalMinutes < 1020) return 8;
  if (totalMinutes < 1140) return 9;
  if (totalMinutes < 1260) return 10;
  return 11;
}

function getDayPillarIndices(year: number, month: number, day: number): { stemIndex: number; branchIndex: number } {
  const refDate = Date.UTC(2000, 0, 1);
  const targetDate = Date.UTC(year, month - 1, day);
  const daysDiff = Math.round((targetDate - refDate) / 86400000);

  let stemIndex = ((daysDiff + 6) % 10);
  if (stemIndex < 0) stemIndex += 10;

  let branchIndex = ((daysDiff + 8) % 12);
  if (branchIndex < 0) branchIndex += 12;

  return { stemIndex, branchIndex };
}

// ============================================================
// Derive star from an element
// ============================================================

function getStarNameForElement(element: string, role: string): { name: string; chineseName: string } {
  const starMap: Record<string, Record<string, { name: string; chineseName: string }>> = {
    'Life Master': {
      Wood: { name: 'Tan Lang', chineseName: '贪狼' },
      Fire: { name: 'Lian Zhen', chineseName: '廉贞' },
      Earth: { name: 'Zi Wei', chineseName: '紫微' },
      Metal: { name: 'Wu Qu', chineseName: '武曲' },
      Water: { name: 'Po Jun', chineseName: '破军' },
    },
    'Grace Star': {
      Wood: { name: 'Tian Ji', chineseName: '天机' },
      Fire: { name: 'Tai Yang', chineseName: '太阳' },
      Earth: { name: 'Tian Fu', chineseName: '天府' },
      Metal: { name: 'Tian Xiang', chineseName: '天相' },
      Water: { name: 'Tian Liang', chineseName: '天梁' },
    },
    'Use Star': {
      Wood: { name: 'Wen Chang', chineseName: '文昌' },
      Fire: { name: 'Huo Xing', chineseName: '火星' },
      Earth: { name: 'Tian Kui', chineseName: '天魁' },
      Metal: { name: 'Zuo Fu', chineseName: '左辅' },
      Water: { name: 'Wen Qu', chineseName: '文曲' },
    },
    'Difficulty Star': {
      Wood: { name: 'Qing Yang', chineseName: '擎羊' },
      Fire: { name: 'Ling Xing', chineseName: '铃星' },
      Earth: { name: 'Tuo Luo', chineseName: '陀罗' },
      Metal: { name: 'Qi Sha', chineseName: '七杀' },
      Water: { name: 'Ju Men', chineseName: '巨门' },
    },
    'Wealth Star': {
      Wood: { name: 'Tian Tong', chineseName: '天同' },
      Fire: { name: 'Tai Yin', chineseName: '太阴' },
      Earth: { name: 'Wu Qu', chineseName: '武曲' },
      Metal: { name: 'Tai Yang', chineseName: '太阳' },
      Water: { name: 'Tian Fu', chineseName: '天府' },
    },
    'Servant Star': {
      Wood: { name: 'You Bi', chineseName: '右弼' },
      Fire: { name: 'Tian Yue', chineseName: '天钺' },
      Earth: { name: 'Tian Liang', chineseName: '天梁' },
      Metal: { name: 'Wen Chang', chineseName: '文昌' },
      Water: { name: 'Tian Ji', chineseName: '天机' },
    },
  };

  return starMap[role]?.[element] || { name: 'Zi Wei', chineseName: '紫微' };
}

// ============================================================
// Palace assignment based on role and branch
// ============================================================

function getPalaceForRole(role: string, branchIndex: number): string {
  const roleOffsets: Record<string, number> = {
    'Life Master': 0,
    'Grace Star': 4,
    'Use Star': 8,
    'Difficulty Star': 6,
    'Wealth Star': 2,
    'Servant Star': 10,
  };
  const offset = roleOffsets[role] ?? 0;
  const palaceIndex = (branchIndex + offset) % 12;
  return PALACES[palaceIndex];
}

// ============================================================
// Overall pattern determination
// ============================================================

function determineOverallPattern(
  lifeMasterElement: string,
  graceElement: string,
  difficultyElement: string,
): string {
  // If grace element generates life master element, very favorable
  if (GENERATING_CYCLE[graceElement] === lifeMasterElement) {
    return 'Prosperous Growth Pattern - Your benefactor star directly nourishes your life force, indicating strong support from mentors and favorable circumstances throughout life.';
  }
  // If difficulty element controls life master, challenging but character-building
  if (CONTROLLING_CYCLE[difficultyElement] === lifeMasterElement) {
    return 'Tempering Steel Pattern - Your challenges directly confront your core nature, forging extraordinary resilience and depth of character through adversity.';
  }
  // If life master controls difficulty element, ability to overcome
  if (CONTROLLING_CYCLE[lifeMasterElement] === difficultyElement) {
    return 'Commanding Tiger Pattern - You have a natural ability to overcome your challenges, wielding authority and turning obstacles into stepping stones.';
  }
  // If grace and difficulty share same element, complex fate
  if (graceElement === difficultyElement) {
    return 'Double-Edged Sword Pattern - Your greatest blessings and challenges come from the same source, requiring wisdom to navigate the duality.';
  }
  // If wealth element generates life master
  if (GENERATING_CYCLE[lifeMasterElement] === graceElement) {
    return 'Golden Bridge Pattern - Your talents naturally generate benefactors, creating a virtuous cycle of achievement and support.';
  }
  // Default balanced pattern
  return 'Balanced Harmony Pattern - Your stars are distributed across complementary elements, indicating a well-rounded life with steady progress across all areas.';
}

// ============================================================
// Main Calculation Function
// ============================================================

export function calculateChineseAstro(dateStr: string, timeStr: string, gender: string): ChineseAstroProfile {
  const { year, month, day } = getDateParts(dateStr);
  const [hourStr, minuteStr] = timeStr.split(':');
  const hour = parseInt(hourStr, 10) || 12;
  const minute = parseInt(minuteStr, 10) || 0;

  // --- Calculate pillar indices ---
  const { baziYear, solarMonth } = getSolarMonth(year, month, day);
  const yearStemIndex = ((baziYear - 4) % 10 + 10) % 10;
  const yearBranchIndex = ((baziYear - 4) % 12 + 12) % 12;

  const monthBranchIndex = (solarMonth + 1) % 12;
  const month1StemIndex = getMonth1StemIndex(yearStemIndex);
  const monthStemIndex = (month1StemIndex + (solarMonth - 1)) % 10;

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
  const dayStemIndex = dayIndices.stemIndex;

  const hourBranchIndex = getHourBranchIndex(hour, minute);
  const hour0StemIndex = getHour0StemIndex(dayStemIndex);
  const hourStemIndex = (hour0StemIndex + hourBranchIndex) % 10;

  // --- Derive elements for each pillar ---
  const yearBranch = EARTHLY_BRANCHES[yearBranchIndex];
  const dayMasterStem = HEAVENLY_STEMS[dayStemIndex];
  const dayMasterElement = STEM_ELEMENTS[dayMasterStem];
  const monthStem = HEAVENLY_STEMS[monthStemIndex];
  const monthElement = STEM_ELEMENTS[monthStem];
  const hourStem = HEAVENLY_STEMS[hourStemIndex];
  const hourElement = STEM_ELEMENTS[hourStem];
  const yearBranchElement = BRANCH_ELEMENTS[yearBranch];

  // --- Determine elements for each star role ---

  // Life Master (命主): Based on year branch element
  const lifeMasterElement = yearBranchElement;

  // Grace Star (恩星): Based on day stem's favorable element (what generates day master)
  const graceElement = GENERATED_BY[dayMasterElement];

  // Use Star (用星): Based on month pillar element
  const useElement = monthElement;

  // Difficulty Star (难星): Based on clashing/controlling element (what controls day master)
  const difficultyElement = CONTROLLED_BY[dayMasterElement];

  // Wealth Star (财星): Element controlled by day master
  const wealthElement = CONTROLLING_CYCLE[dayMasterElement];

  // Servant Star (余奴): Based on hour pillar element
  const servantElement = hourElement;

  // --- Build the 6 stars ---
  const roles: { role: string; element: string; branchIndex: number }[] = [
    { role: 'Life Master', element: lifeMasterElement, branchIndex: yearBranchIndex },
    { role: 'Grace Star', element: graceElement, branchIndex: (yearBranchIndex + 4) % 12 },
    { role: 'Use Star', element: useElement, branchIndex: monthBranchIndex },
    { role: 'Difficulty Star', element: difficultyElement, branchIndex: (yearBranchIndex + 6) % 12 },
    { role: 'Wealth Star', element: wealthElement, branchIndex: (dayStemIndex + 2) % 12 },
    { role: 'Servant Star', element: servantElement, branchIndex: hourBranchIndex },
  ];

  // Apply gender-based adjustment (Yang male / Yin female get clockwise progression)
  const genderModifier = gender === 'female' ? 1 : 0;

  const stars: LifeStar[] = roles.map(({ role, element, branchIndex }) => {
    const adjustedBranchIndex = (branchIndex + genderModifier) % 12;
    const starInfo = getStarNameForElement(element, role);
    const palace = getPalaceForRole(role, adjustedBranchIndex);
    const description = STAR_DESCRIPTIONS[role]?.[element] || '';

    return {
      name: starInfo.name,
      chineseName: starInfo.chineseName,
      palace,
      role,
      element,
      description,
    };
  });

  const lifeMaster = stars[0];
  const graceStar = stars[1];
  const useStar = stars[2];
  const difficultyStar = stars[3];
  const wealthStar = stars[4];
  const servantStar = stars[5];

  // --- Overall pattern ---
  const overallPattern = determineOverallPattern(
    lifeMasterElement,
    graceElement,
    difficultyElement,
  );

  // --- Suitable industries ---
  // Derive from favorable elements: grace element + use element
  const favorableElements = [...new Set([graceElement, useElement])];
  const suitableIndustries = favorableElements.flatMap(el => ELEMENT_INDUSTRIES[el] || []);

  // --- Compatible partner element ---
  const compatiblePartnerElement = COMPLEMENTARY_ELEMENT[dayMasterElement];

  return {
    stars,
    lifeMaster,
    graceStar,
    useStar,
    difficultyStar,
    wealthStar,
    servantStar,
    overallPattern,
    suitableIndustries,
    compatiblePartnerElement,
  };
}
