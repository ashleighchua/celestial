import { getDateParts } from '@/lib/utils';

export interface ChineseZodiacProfile {
  animal: string;
  element: string;
  yinYang: 'Yin' | 'Yang';
  year: number;
  personality: string;
  compatible: string[];
  challenging: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  elementEmoji: string;
}

const ANIMALS = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
] as const;

const ELEMENTS: Record<number, string> = {
  0: 'Metal',
  1: 'Metal',
  2: 'Water',
  3: 'Water',
  4: 'Wood',
  5: 'Wood',
  6: 'Fire',
  7: 'Fire',
  8: 'Earth',
  9: 'Earth',
};

const ELEMENT_EMOJIS: Record<string, string> = {
  Metal: '\u2699\uFE0F',
  Water: '\uD83C\uDF0A',
  Wood: '\uD83C\uDF3F',
  Fire: '\uD83D\uDD25',
  Earth: '\u26F0\uFE0F',
};

const PERSONALITY_TAGLINES: Record<string, string> = {
  Rat: 'The Resourceful Rat',
  Ox: 'The Steadfast Ox',
  Tiger: 'The Courageous Tiger',
  Rabbit: 'The Graceful Rabbit',
  Dragon: 'The Mighty Dragon',
  Snake: 'The Wise Snake',
  Horse: 'The Spirited Horse',
  Goat: 'The Gentle Goat',
  Monkey: 'The Clever Monkey',
  Rooster: 'The Elegant Rooster',
  Dog: 'The Loyal Dog',
  Pig: 'The Generous Pig',
};

const COMPATIBLE_ANIMALS: Record<string, string[]> = {
  Rat: ['Dragon', 'Monkey', 'Ox'],
  Ox: ['Snake', 'Rooster', 'Rat'],
  Tiger: ['Horse', 'Dog', 'Pig'],
  Rabbit: ['Goat', 'Pig', 'Dog'],
  Dragon: ['Rat', 'Monkey', 'Rooster'],
  Snake: ['Ox', 'Rooster', 'Monkey'],
  Horse: ['Tiger', 'Goat', 'Dog'],
  Goat: ['Rabbit', 'Horse', 'Pig'],
  Monkey: ['Rat', 'Dragon', 'Snake'],
  Rooster: ['Ox', 'Snake', 'Dragon'],
  Dog: ['Tiger', 'Rabbit', 'Horse'],
  Pig: ['Tiger', 'Rabbit', 'Goat'],
};

const CHALLENGING_ANIMALS: Record<string, string[]> = {
  Rat: ['Horse', 'Goat', 'Rabbit'],
  Ox: ['Goat', 'Horse', 'Dog'],
  Tiger: ['Monkey', 'Snake', 'Ox'],
  Rabbit: ['Rooster', 'Dragon', 'Rat'],
  Dragon: ['Dog', 'Rabbit', 'Dragon'],
  Snake: ['Pig', 'Tiger', 'Monkey'],
  Horse: ['Rat', 'Ox', 'Horse'],
  Goat: ['Ox', 'Rat', 'Dog'],
  Monkey: ['Tiger', 'Pig', 'Snake'],
  Rooster: ['Rabbit', 'Dog', 'Rooster'],
  Dog: ['Dragon', 'Ox', 'Goat'],
  Pig: ['Snake', 'Monkey', 'Pig'],
};

const LUCKY_NUMBERS: Record<string, number[]> = {
  Rat: [2, 3, 6],
  Ox: [1, 4, 9],
  Tiger: [1, 3, 7],
  Rabbit: [3, 4, 9],
  Dragon: [1, 6, 7],
  Snake: [2, 8, 9],
  Horse: [2, 3, 7],
  Goat: [3, 4, 9],
  Monkey: [1, 7, 8],
  Rooster: [5, 7, 8],
  Dog: [3, 4, 9],
  Pig: [2, 5, 8],
};

const LUCKY_COLORS: Record<string, string[]> = {
  Rat: ['Blue', 'Gold', 'Green'],
  Ox: ['White', 'Yellow', 'Green'],
  Tiger: ['Blue', 'Gray', 'Orange'],
  Rabbit: ['Red', 'Pink', 'Purple'],
  Dragon: ['Gold', 'Silver', 'Gray'],
  Snake: ['Red', 'Yellow', 'Black'],
  Horse: ['Yellow', 'Red', 'Green'],
  Goat: ['Green', 'Red', 'Purple'],
  Monkey: ['White', 'Gold', 'Blue'],
  Rooster: ['Gold', 'Brown', 'Yellow'],
  Dog: ['Green', 'Red', 'Purple'],
  Pig: ['Yellow', 'Gray', 'Brown'],
};

/**
 * Calculate Chinese Zodiac profile from a birth date string.
 *
 * Note: Chinese New Year falls in late January or early February.
 * For simplicity this calculation uses the Western calendar year.
 * Dates before approximately February 4 may technically belong to
 * the previous year's animal in the traditional Chinese calendar.
 */
export function getChineseZodiac(dateStr: string): ChineseZodiacProfile {
  const { year } = getDateParts(dateStr);

  const animalIndex = (year - 4) % 12;
  const animal = ANIMALS[animalIndex >= 0 ? animalIndex : animalIndex + 12];

  const elementKey = year % 10;
  const element = ELEMENTS[elementKey];

  const yinYang: 'Yin' | 'Yang' = year % 2 === 0 ? 'Yang' : 'Yin';

  return {
    animal,
    element,
    yinYang,
    year,
    personality: PERSONALITY_TAGLINES[animal],
    compatible: COMPATIBLE_ANIMALS[animal],
    challenging: CHALLENGING_ANIMALS[animal],
    luckyNumbers: LUCKY_NUMBERS[animal],
    luckyColors: LUCKY_COLORS[animal],
    elementEmoji: ELEMENT_EMOJIS[element],
  };
}
