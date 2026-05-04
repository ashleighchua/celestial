import { getDateParts } from '@/lib/utils';

export interface AstrologyProfile {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  sunElement: string;
  moonElement: string;
  risingElement: string;
  sunModality: string;
  sunEmoji: string;
  moonEmoji: string;
  risingEmoji: string;
}

const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
] as const;

const SIGN_EMOJIS: Record<string, string> = {
  Aries: '\u2648',
  Taurus: '\u2649',
  Gemini: '\u264A',
  Cancer: '\u264B',
  Leo: '\u264C',
  Virgo: '\u264D',
  Libra: '\u264E',
  Scorpio: '\u264F',
  Sagittarius: '\u2650',
  Capricorn: '\u2651',
  Aquarius: '\u2652',
  Pisces: '\u2653',
};

const SIGN_ELEMENTS: Record<string, string> = {
  Aries: 'Fire',
  Taurus: 'Earth',
  Gemini: 'Air',
  Cancer: 'Water',
  Leo: 'Fire',
  Virgo: 'Earth',
  Libra: 'Air',
  Scorpio: 'Water',
  Sagittarius: 'Fire',
  Capricorn: 'Earth',
  Aquarius: 'Air',
  Pisces: 'Water',
};

const SIGN_MODALITIES: Record<string, string> = {
  Aries: 'Cardinal',
  Taurus: 'Fixed',
  Gemini: 'Mutable',
  Cancer: 'Cardinal',
  Leo: 'Fixed',
  Virgo: 'Mutable',
  Libra: 'Cardinal',
  Scorpio: 'Fixed',
  Sagittarius: 'Mutable',
  Capricorn: 'Cardinal',
  Aquarius: 'Fixed',
  Pisces: 'Mutable',
};

/**
 * Zodiac date ranges as [startMonth, startDay, endMonth, endDay].
 * Ordered to match the SIGNS array.
 */
const ZODIAC_RANGES: [number, number, number, number][] = [
  [3, 21, 4, 19],   // Aries
  [4, 20, 5, 20],   // Taurus
  [5, 21, 6, 20],   // Gemini
  [6, 21, 7, 22],   // Cancer
  [7, 23, 8, 22],   // Leo
  [8, 23, 9, 22],   // Virgo
  [9, 23, 10, 22],  // Libra
  [10, 23, 11, 21], // Scorpio
  [11, 22, 12, 21], // Sagittarius
  [12, 22, 1, 19],  // Capricorn (wraps around year)
  [1, 20, 2, 18],   // Aquarius
  [2, 19, 3, 20],   // Pisces
];

export function getSignEmoji(sign: string): string {
  return SIGN_EMOJIS[sign] || '';
}

export function getElement(sign: string): string {
  return SIGN_ELEMENTS[sign] || '';
}

export function getModality(sign: string): string {
  return SIGN_MODALITIES[sign] || '';
}

export function getSignIndex(sign: string): number {
  return SIGNS.indexOf(sign as typeof SIGNS[number]);
}

/**
 * Determine the Sun sign from month and day using standard zodiac date ranges.
 */
function getSunSign(month: number, day: number): string {
  for (let i = 0; i < ZODIAC_RANGES.length; i++) {
    const [sm, sd, em, ed] = ZODIAC_RANGES[i];
    if (sm <= em) {
      // Normal range within a single year span
      if ((month === sm && day >= sd) || (month === em && day <= ed)) {
        return SIGNS[i];
      }
      if (month > sm && month < em) {
        return SIGNS[i];
      }
    } else {
      // Wraps around the year (Capricorn: Dec 22 - Jan 19)
      if ((month === sm && day >= sd) || (month === em && day <= ed)) {
        return SIGNS[i];
      }
    }
  }
  // Fallback - should not reach here with valid input
  return 'Capricorn';
}

/**
 * Approximate the Moon sign based on days elapsed since a known New Moon.
 *
 * Reference: January 6, 2000 was a New Moon in Capricorn (index 9).
 * The Moon completes a full cycle through all 12 signs in ~29.5 days,
 * spending roughly 2.5 days in each sign.
 */
function getMoonSign(year: number, month: number, day: number): string {
  const referenceDate = new Date(2000, 0, 6); // Jan 6, 2000
  const birthDate = new Date(year, month - 1, day);
  const daysElapsed = Math.floor(
    (birthDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const referenceSignIndex = 9; // Capricorn
  const moonIndex =
    ((referenceSignIndex + Math.floor(daysElapsed / 2.5)) % 12 + 12) % 12;
  return SIGNS[moonIndex];
}

/**
 * Approximate the Rising sign based on birth time.
 *
 * At sunrise (~6:00 AM) the Rising sign equals the Sun sign.
 * Every 2 hours the Rising sign advances by one sign through the zodiac.
 * If no birth time is provided, defaults to sunrise (Rising = Sun sign).
 */
function getRisingSign(sunSign: string, birthHour: number): string {
  const sunIndex = getSignIndex(sunSign);
  const hoursFromSunrise = ((birthHour - 6) + 24) % 24;
  const offset = Math.floor(hoursFromSunrise / 2);
  const risingIndex = (sunIndex + offset) % 12;
  return SIGNS[risingIndex];
}

/**
 * Parse a time string in "HH:MM" 24-hour format and return the hour as a number.
 */
function parseHour(timeStr: string): number {
  const parts = timeStr.split(':');
  return parseInt(parts[0], 10);
}

/**
 * Calculate a complete Western Astrology profile from birth date and optional time.
 *
 * @param dateStr - Birth date in "YYYY-MM-DD" format
 * @param timeStr - Optional birth time in "HH:MM" 24-hour format (defaults to "06:00")
 */
export function getAstrologyProfile(dateStr: string, timeStr?: string): AstrologyProfile {
  const { year, month, day } = getDateParts(dateStr);
  const birthHour = timeStr ? parseHour(timeStr) : 6;

  const sunSign = getSunSign(month, day);
  const moonSign = getMoonSign(year, month, day);
  const risingSign = getRisingSign(sunSign, birthHour);

  return {
    sunSign,
    moonSign,
    risingSign,
    sunElement: getElement(sunSign),
    moonElement: getElement(moonSign),
    risingElement: getElement(risingSign),
    sunModality: getModality(sunSign),
    sunEmoji: getSignEmoji(sunSign),
    moonEmoji: getSignEmoji(moonSign),
    risingEmoji: getSignEmoji(risingSign),
  };
}
