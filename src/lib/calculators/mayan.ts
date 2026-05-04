/**
 * Mayan Dreamspell Calculator
 *
 * Correlates Gregorian dates to Dreamspell Kin numbers (1-260)
 * using the known reference point: January 1, 2000 = Kin 112.
 */

export interface MayanProfile {
  kinNumber: number; // 1-260
  sealNumber: number; // 0-19 (Solar Seal)
  toneNumber: number; // 1-13 (Galactic Tone)
  sealName: string;
  toneName: string;
  fullName: string; // e.g., "Electric Yellow Star"
  guideSeal: string;
  challengeSeal: string;
  supportSeal: string;
  pushSeal: string; // also called "Hidden Power" or "Occult"
  wavespell: string; // The seal of the wavespell this kin belongs to
  color: 'Red' | 'White' | 'Blue' | 'Yellow';
}

/** The 20 Solar Seals in order (index 0-19) */
const SOLAR_SEALS: string[] = [
  'Red Dragon',
  'White Wind',
  'Blue Night',
  'Yellow Seed',
  'Red Serpent',
  'White Worldbridger',
  'Blue Hand',
  'Yellow Star',
  'Red Moon',
  'White Dog',
  'Blue Monkey',
  'Yellow Human',
  'Red Skywalker',
  'White Wizard',
  'Blue Eagle',
  'Yellow Warrior',
  'Red Earth',
  'White Mirror',
  'Blue Storm',
  'Yellow Sun',
];

/** The 13 Galactic Tones (index 0-12, representing tones 1-13) */
const GALACTIC_TONES: string[] = [
  'Magnetic',
  'Lunar',
  'Electric',
  'Self-Existing',
  'Overtone',
  'Rhythmic',
  'Resonant',
  'Galactic',
  'Solar',
  'Planetary',
  'Spectral',
  'Crystal',
  'Cosmic',
];

/** Color mapping: sealNumber % 4 */
const SEAL_COLORS: Array<'Red' | 'White' | 'Blue' | 'Yellow'> = [
  'Red',
  'White',
  'Blue',
  'Yellow',
];

/**
 * Reference point for Dreamspell correlation:
 * January 1, 2000 = Kin 112
 */
const REFERENCE_DATE = new Date(Date.UTC(2000, 0, 1)); // Jan 1, 2000
const REFERENCE_KIN = 112;

/**
 * Calculate the number of days between two dates (ignoring time).
 */
function daysBetween(a: Date, b: Date): number {
  const msPerDay = 86400000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / msPerDay);
}

/**
 * Guide offset lookup based on tone number.
 * Tones 1,6,11 -> offset 0
 * Tones 2,7,12 -> offset 12
 * Tones 3,8,13 -> offset 4
 * Tones 4,9     -> offset 16
 * Tones 5,10    -> offset 8
 */
function getGuideOffset(toneNumber: number): number {
  const toneGroup = ((toneNumber - 1) % 5);
  const offsets = [0, 12, 4, 16, 8];
  return offsets[toneGroup];
}

/**
 * Calculate Mayan Dreamspell Kin from a date string (YYYY-MM-DD).
 */
export function calculateMayanKin(dateStr: string): MayanProfile {
  const [year, month, day] = dateStr.split('-').map(Number);
  const targetDate = new Date(Date.UTC(year, month - 1, day));

  // Calculate days elapsed from reference date
  const daysElapsed = daysBetween(REFERENCE_DATE, targetDate);

  // Kin number: (referenceKin - 1 + daysElapsed) mod 260, then +1 for 1-based
  // Use modulo that always returns positive
  let kinIndex = ((REFERENCE_KIN - 1 + daysElapsed) % 260);
  if (kinIndex < 0) kinIndex += 260;
  const kinNumber = kinIndex + 1;

  // Solar Seal (0-19) and Galactic Tone (1-13)
  const sealNumber = (kinNumber - 1) % 20;
  const toneNumber = ((kinNumber - 1) % 13) + 1;

  const sealName = SOLAR_SEALS[sealNumber];
  const toneName = GALACTIC_TONES[toneNumber - 1];
  const color = SEAL_COLORS[sealNumber % 4];

  // Full display name: "[Tone Name] [Seal Name]"
  const fullName = `${toneName} ${sealName}`;

  // Cross totems
  const guideOffset = getGuideOffset(toneNumber);
  const guideSealIndex = (sealNumber + guideOffset) % 20;
  const guideSeal = SOLAR_SEALS[guideSealIndex];

  // Support (Antipode partner at +10)
  const supportSealIndex = (sealNumber + 10) % 20;
  const supportSeal = SOLAR_SEALS[supportSealIndex];

  // Challenge (Antipode, same as support in Dreamspell cross: +10)
  const challengeSealIndex = (sealNumber + 10) % 20;
  const challengeSeal = SOLAR_SEALS[challengeSealIndex];

  // Push / Occult / Hidden Power: 19 - sealNumber
  const pushSealIndex = 19 - sealNumber;
  const pushSeal = SOLAR_SEALS[pushSealIndex];

  // Wavespell: the seal at tone 1 of the current 13-day wavespell
  // The wavespell starts at the kin where tone = 1
  const wavespellStartKin = kinNumber - (toneNumber - 1);
  let wavespellKinIndex = ((wavespellStartKin - 1) % 260);
  if (wavespellKinIndex < 0) wavespellKinIndex += 260;
  const wavespellSealIndex = wavespellKinIndex % 20;
  const wavespell = SOLAR_SEALS[wavespellSealIndex];

  return {
    kinNumber,
    sealNumber,
    toneNumber,
    sealName,
    toneName,
    fullName,
    guideSeal,
    challengeSeal,
    supportSeal,
    pushSeal,
    wavespell,
    color,
  };
}
