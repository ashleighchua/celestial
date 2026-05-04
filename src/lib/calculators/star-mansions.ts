export interface StarMansionProfile {
  mansionNumber: number; // 1-28
  mansionName: string;
  chineseName: string;
  constellation: string; // Which of the 4 directional groups
  direction: string; // East Azure Dragon, North Black Tortoise, West White Tiger, South Vermilion Bird
  personality: string; // short tagline
  auspicious: boolean;
}

interface MansionEntry {
  name: string;
  chineseName: string;
  constellation: string;
  direction: string;
  personality: string;
  auspicious: boolean;
}

const MANSIONS: MansionEntry[] = [
  { name: 'Horn', chineseName: 'Jiao', constellation: 'Azure Dragon', direction: 'East Azure Dragon', personality: 'The Trailblazing Pioneer', auspicious: true },
  { name: 'Neck', chineseName: 'Kang', constellation: 'Azure Dragon', direction: 'East Azure Dragon', personality: 'The Measured Strategist', auspicious: false },
  { name: 'Root', chineseName: 'Di', constellation: 'Azure Dragon', direction: 'East Azure Dragon', personality: 'The Grounded Builder', auspicious: true },
  { name: 'Room', chineseName: 'Fang', constellation: 'Azure Dragon', direction: 'East Azure Dragon', personality: 'The Luminous Guardian', auspicious: true },
  { name: 'Heart', chineseName: 'Xin', constellation: 'Azure Dragon', direction: 'East Azure Dragon', personality: 'The Emotional Helmsman', auspicious: false },
  { name: 'Tail', chineseName: 'Wei', constellation: 'Azure Dragon', direction: 'East Azure Dragon', personality: 'The Resilient Finisher', auspicious: true },
  { name: 'Winnowing Basket', chineseName: 'Ji', constellation: 'Azure Dragon', direction: 'East Azure Dragon', personality: 'The Discerning Analyst', auspicious: true },
  { name: 'Dipper', chineseName: 'Dou', constellation: 'Black Tortoise', direction: 'North Black Tortoise', personality: 'The Celestial Navigator', auspicious: true },
  { name: 'Ox', chineseName: 'Niu', constellation: 'Black Tortoise', direction: 'North Black Tortoise', personality: 'The Tireless Achiever', auspicious: false },
  { name: 'Girl', chineseName: 'Nu', constellation: 'Black Tortoise', direction: 'North Black Tortoise', personality: 'The Gentle Weaver', auspicious: false },
  { name: 'Emptiness', chineseName: 'Xu', constellation: 'Black Tortoise', direction: 'North Black Tortoise', personality: 'The Solitary Philosopher', auspicious: false },
  { name: 'Rooftop', chineseName: 'Wei', constellation: 'Black Tortoise', direction: 'North Black Tortoise', personality: 'The Ambitious Climber', auspicious: true },
  { name: 'Encampment', chineseName: 'Shi', constellation: 'Black Tortoise', direction: 'North Black Tortoise', personality: 'The Steadfast Protector', auspicious: true },
  { name: 'Wall', chineseName: 'Bi', constellation: 'Black Tortoise', direction: 'North Black Tortoise', personality: 'The Scholarly Patron', auspicious: true },
  { name: 'Legs', chineseName: 'Kui', constellation: 'White Tiger', direction: 'West White Tiger', personality: 'The Bold Adventurer', auspicious: false },
  { name: 'Bond', chineseName: 'Lou', constellation: 'White Tiger', direction: 'West White Tiger', personality: 'The Faithful Companion', auspicious: true },
  { name: 'Stomach', chineseName: 'Wei', constellation: 'White Tiger', direction: 'West White Tiger', personality: 'The Relentless Provider', auspicious: true },
  { name: 'Hairy Head', chineseName: 'Mao', constellation: 'White Tiger', direction: 'West White Tiger', personality: 'The Radiant Inspirer', auspicious: true },
  { name: 'Net', chineseName: 'Bi', constellation: 'White Tiger', direction: 'West White Tiger', personality: 'The Strategic Tactician', auspicious: false },
  { name: 'Turtle Beak', chineseName: 'Zi', constellation: 'White Tiger', direction: 'West White Tiger', personality: 'The Sharp Communicator', auspicious: false },
  { name: 'Three Stars', chineseName: 'Shen', constellation: 'White Tiger', direction: 'West White Tiger', personality: 'The Charismatic Leader', auspicious: true },
  { name: 'Well', chineseName: 'Jing', constellation: 'Vermilion Bird', direction: 'South Vermilion Bird', personality: 'The Resourceful Sage', auspicious: true },
  { name: 'Ghosts', chineseName: 'Gui', constellation: 'Vermilion Bird', direction: 'South Vermilion Bird', personality: 'The Intuitive Mystic', auspicious: false },
  { name: 'Willow', chineseName: 'Liu', constellation: 'Vermilion Bird', direction: 'South Vermilion Bird', personality: 'The Graceful Adaptor', auspicious: false },
  { name: 'Star', chineseName: 'Xing', constellation: 'Vermilion Bird', direction: 'South Vermilion Bird', personality: 'The Dazzling Performer', auspicious: true },
  { name: 'Extended Net', chineseName: 'Zhang', constellation: 'Vermilion Bird', direction: 'South Vermilion Bird', personality: 'The Expansive Visionary', auspicious: true },
  { name: 'Wings', chineseName: 'Yi', constellation: 'Vermilion Bird', direction: 'South Vermilion Bird', personality: 'The Harmonious Creator', auspicious: false },
  { name: 'Chariot', chineseName: 'Zhen', constellation: 'Vermilion Bird', direction: 'South Vermilion Bird', personality: 'The Unstoppable Force', auspicious: true },
];

/**
 * Reference new moon: January 6, 2000 (approximately)
 * Lunar synodic period: ~29.53 days
 * The 28 mansions divide the ecliptic into 28 segments.
 *
 * Simplified calculation:
 *   daysSinceReference = floor(birthDate - referenceDate) in days
 *   mansionIndex = floor((daysSinceReference % 27.3) / 27.3 * 28) % 28
 */
export function getStarMansion(dateStr: string): StarMansionProfile {
  const REFERENCE_DATE = new Date(2000, 0, 6); // January 6, 2000 (new moon)
  const SIDEREAL_MONTH = 27.3; // approximate sidereal month in days

  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const birthDate = new Date(
    parseInt(yearStr, 10),
    parseInt(monthStr, 10) - 1,
    parseInt(dayStr, 10)
  );

  const diffMs = birthDate.getTime() - REFERENCE_DATE.getTime();
  const daysSinceReference = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Normalize to positive modulus
  let mod = daysSinceReference % SIDEREAL_MONTH;
  if (mod < 0) mod += SIDEREAL_MONTH;

  const mansionIndex = Math.floor((mod / SIDEREAL_MONTH) * 28) % 28;

  const mansion = MANSIONS[mansionIndex];

  return {
    mansionNumber: mansionIndex + 1,
    mansionName: mansion.name,
    chineseName: mansion.chineseName,
    constellation: mansion.constellation,
    direction: mansion.direction,
    personality: mansion.personality,
    auspicious: mansion.auspicious,
  };
}
