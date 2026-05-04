export interface MBTIQuestion {
  id: number;
  text: string;
  optionA: { text: string; dimension: string; direction: 'left' };
  optionB: { text: string; dimension: string; direction: 'right' };
}

export interface MBTIResult {
  type: string; // e.g., "ENTJ"
  letters: { dimension: string; left: string; right: string; value: number }[]; // 4 dimensions with percentage (0-100, 50=center)
  title: string; // e.g., "The Commander"
  emoji: string;
}

// Titles and emojis for all 16 types
const mbtiTitles: Record<string, { title: string; emoji: string }> = {
  ISTJ: { title: 'The Inspector', emoji: '\uD83D\uDCCB' },
  ISFJ: { title: 'The Protector', emoji: '\uD83D\uDEE1\uFE0F' },
  INFJ: { title: 'The Advocate', emoji: '\uD83E\uDDDE' },
  INTJ: { title: 'The Architect', emoji: '\uD83C\uDFD7\uFE0F' },
  ISTP: { title: 'The Virtuoso', emoji: '\uD83D\uDD27' },
  ISFP: { title: 'The Adventurer', emoji: '\uD83C\uDFA8' },
  INFP: { title: 'The Mediator', emoji: '\uD83E\uDD8B' },
  INTP: { title: 'The Logician', emoji: '\uD83E\uDDE0' },
  ESTP: { title: 'The Entrepreneur', emoji: '\uD83C\uDFAF' },
  ESFP: { title: 'The Entertainer', emoji: '\uD83C\uDFAD' },
  ENFP: { title: 'The Campaigner', emoji: '\uD83C\uDF1F' },
  ENTP: { title: 'The Debater', emoji: '\u2694\uFE0F' },
  ESTJ: { title: 'The Executive', emoji: '\uD83D\uDC54' },
  ESFJ: { title: 'The Consul', emoji: '\uD83E\uDD1D' },
  ENFJ: { title: 'The Protagonist', emoji: '\uD83C\uDF1E' },
  ENTJ: { title: 'The Commander', emoji: '\uD83D\uDC51' },
};

// 20 questions (5 per dimension: E/I, S/N, T/F, J/P)
export const mbtiQuestions: MBTIQuestion[] = [
  // ===== E/I Dimension (questions 1-5) =====
  {
    id: 1,
    text: 'At a social gathering, you tend to:',
    optionA: { text: 'Mingle with many different people, including strangers', dimension: 'EI', direction: 'left' },
    optionB: { text: 'Have deep conversations with a few people you already know', dimension: 'EI', direction: 'right' },
  },
  {
    id: 2,
    text: 'After a long and busy week, you recharge by:',
    optionA: { text: 'Going out with friends or attending a social event', dimension: 'EI', direction: 'left' },
    optionB: { text: 'Spending quiet time alone or with one close person', dimension: 'EI', direction: 'right' },
  },
  {
    id: 3,
    text: 'When working on a project, you prefer to:',
    optionA: { text: 'Brainstorm and collaborate with a group', dimension: 'EI', direction: 'left' },
    optionB: { text: 'Think things through independently before sharing', dimension: 'EI', direction: 'right' },
  },
  {
    id: 4,
    text: 'In conversations, you usually:',
    optionA: { text: 'Think out loud and talk through your ideas', dimension: 'EI', direction: 'left' },
    optionB: { text: 'Reflect internally before speaking up', dimension: 'EI', direction: 'right' },
  },
  {
    id: 5,
    text: 'You feel most energized when:',
    optionA: { text: 'You are around other people and there is lively activity', dimension: 'EI', direction: 'left' },
    optionB: { text: 'You have peaceful solitude and time for inner reflection', dimension: 'EI', direction: 'right' },
  },

  // ===== S/N Dimension (questions 6-10) =====
  {
    id: 6,
    text: 'When learning something new, you prefer:',
    optionA: { text: 'Hands-on practice and concrete examples', dimension: 'SN', direction: 'left' },
    optionB: { text: 'Understanding the big picture and underlying theory', dimension: 'SN', direction: 'right' },
  },
  {
    id: 7,
    text: 'You tend to focus more on:',
    optionA: { text: 'What is real and actual right now', dimension: 'SN', direction: 'left' },
    optionB: { text: 'What could be possible in the future', dimension: 'SN', direction: 'right' },
  },
  {
    id: 8,
    text: 'When someone describes a situation, you pay more attention to:',
    optionA: { text: 'The specific facts and details they mention', dimension: 'SN', direction: 'left' },
    optionB: { text: 'The patterns and meaning behind what they say', dimension: 'SN', direction: 'right' },
  },
  {
    id: 9,
    text: 'You are more drawn to:',
    optionA: { text: 'Practical, tried-and-true methods', dimension: 'SN', direction: 'left' },
    optionB: { text: 'Innovative and imaginative approaches', dimension: 'SN', direction: 'right' },
  },
  {
    id: 10,
    text: 'In your daily life, you tend to be more:',
    optionA: { text: 'Observant of your surroundings and grounded in the present', dimension: 'SN', direction: 'left' },
    optionB: { text: 'Lost in thought, daydreaming, or imagining possibilities', dimension: 'SN', direction: 'right' },
  },

  // ===== T/F Dimension (questions 11-15) =====
  {
    id: 11,
    text: 'When making an important decision, you rely more on:',
    optionA: { text: 'Logical analysis and objective criteria', dimension: 'TF', direction: 'left' },
    optionB: { text: 'Personal values and how it affects people involved', dimension: 'TF', direction: 'right' },
  },
  {
    id: 12,
    text: 'When a friend comes to you with a problem, you first:',
    optionA: { text: 'Help them think through solutions objectively', dimension: 'TF', direction: 'left' },
    optionB: { text: 'Empathize with their feelings and offer emotional support', dimension: 'TF', direction: 'right' },
  },
  {
    id: 13,
    text: 'In a disagreement, you value:',
    optionA: { text: 'Being fair and truthful, even if it is uncomfortable', dimension: 'TF', direction: 'left' },
    optionB: { text: 'Maintaining harmony and being considerate of feelings', dimension: 'TF', direction: 'right' },
  },
  {
    id: 14,
    text: 'You are more likely to be described as:',
    optionA: { text: 'Rational, level-headed, and analytical', dimension: 'TF', direction: 'left' },
    optionB: { text: 'Warm, compassionate, and understanding', dimension: 'TF', direction: 'right' },
  },
  {
    id: 15,
    text: 'When evaluating a plan, you prioritize:',
    optionA: { text: 'Whether it makes sense logically and is efficient', dimension: 'TF', direction: 'left' },
    optionB: { text: 'Whether it aligns with your values and helps people', dimension: 'TF', direction: 'right' },
  },

  // ===== J/P Dimension (questions 16-20) =====
  {
    id: 16,
    text: 'When it comes to your daily schedule, you prefer:',
    optionA: { text: 'Having a clear plan and sticking to it', dimension: 'JP', direction: 'left' },
    optionB: { text: 'Keeping things flexible and going with the flow', dimension: 'JP', direction: 'right' },
  },
  {
    id: 17,
    text: 'With a deadline approaching, you tend to:',
    optionA: { text: 'Finish well ahead of time so you feel prepared', dimension: 'JP', direction: 'left' },
    optionB: { text: 'Work best under pressure closer to the deadline', dimension: 'JP', direction: 'right' },
  },
  {
    id: 18,
    text: 'Your workspace is usually:',
    optionA: { text: 'Neat, organized, and everything in its place', dimension: 'JP', direction: 'left' },
    optionB: { text: 'A bit messy, but you know where things are', dimension: 'JP', direction: 'right' },
  },
  {
    id: 19,
    text: 'When planning a vacation, you prefer to:',
    optionA: { text: 'Create a detailed itinerary with reservations booked', dimension: 'JP', direction: 'left' },
    optionB: { text: 'Leave most things open and decide spontaneously', dimension: 'JP', direction: 'right' },
  },
  {
    id: 20,
    text: 'You feel more comfortable when:',
    optionA: { text: 'Decisions are made and things are settled', dimension: 'JP', direction: 'left' },
    optionB: { text: 'Options are kept open and things can still change', dimension: 'JP', direction: 'right' },
  },
];

/**
 * Score function that takes answers and returns MBTIResult.
 * Each dimension has 5 questions. Answering 'A' pushes toward the left letter,
 * 'B' pushes toward the right letter.
 * Value is 0-100: 0 = fully left, 100 = fully right, 50 = balanced center.
 */
export function scoreMBTI(answers: Record<number, 'A' | 'B'>): MBTIResult {
  // Initialize dimension scores: count of 'B' answers per dimension
  const dimensionScores: Record<string, { bCount: number; total: number }> = {
    EI: { bCount: 0, total: 0 },
    SN: { bCount: 0, total: 0 },
    TF: { bCount: 0, total: 0 },
    JP: { bCount: 0, total: 0 },
  };

  for (const question of mbtiQuestions) {
    const answer = answers[question.id];
    if (answer) {
      const dim = question.optionA.dimension;
      dimensionScores[dim].total++;
      if (answer === 'B') {
        dimensionScores[dim].bCount++;
      }
    }
  }

  // Calculate value for each dimension (0-100, where 0=left, 100=right)
  const letters: MBTIResult['letters'] = [
    {
      dimension: 'EI',
      left: 'E',
      right: 'I',
      value: dimensionScores.EI.total > 0
        ? Math.round((dimensionScores.EI.bCount / dimensionScores.EI.total) * 100)
        : 50,
    },
    {
      dimension: 'SN',
      left: 'S',
      right: 'N',
      value: dimensionScores.SN.total > 0
        ? Math.round((dimensionScores.SN.bCount / dimensionScores.SN.total) * 100)
        : 50,
    },
    {
      dimension: 'TF',
      left: 'T',
      right: 'F',
      value: dimensionScores.TF.total > 0
        ? Math.round((dimensionScores.TF.bCount / dimensionScores.TF.total) * 100)
        : 50,
    },
    {
      dimension: 'JP',
      left: 'J',
      right: 'P',
      value: dimensionScores.JP.total > 0
        ? Math.round((dimensionScores.JP.bCount / dimensionScores.JP.total) * 100)
        : 50,
    },
  ];

  // Determine type string: value < 50 = left letter, value >= 50 = right letter
  const type = letters.map((l) => (l.value < 50 ? l.left : l.right)).join('');

  const info = mbtiTitles[type] || { title: 'Unknown Type', emoji: '\u2753' };

  return {
    type,
    letters,
    title: info.title,
    emoji: info.emoji,
  };
}

/**
 * Get result from a stored type string (e.g., "ENTJ").
 * Returns an MBTIResult with default 75/25 dimension values based on the letters.
 */
export function getMBTIFromType(type: string): MBTIResult {
  const upperType = type.toUpperCase();

  const dimensionMap: { left: string; right: string; dimension: string }[] = [
    { left: 'E', right: 'I', dimension: 'EI' },
    { left: 'S', right: 'N', dimension: 'SN' },
    { left: 'T', right: 'F', dimension: 'TF' },
    { left: 'J', right: 'P', dimension: 'JP' },
  ];

  const letters: MBTIResult['letters'] = dimensionMap.map((dim, index) => {
    const letter = upperType[index];
    // If the letter matches the right side, value leans right (75); otherwise left (25)
    const value = letter === dim.right ? 75 : 25;
    return {
      dimension: dim.dimension,
      left: dim.left,
      right: dim.right,
      value,
    };
  });

  const info = mbtiTitles[upperType] || { title: 'Unknown Type', emoji: '\u2753' };

  return {
    type: upperType,
    letters,
    title: info.title,
    emoji: info.emoji,
  };
}
