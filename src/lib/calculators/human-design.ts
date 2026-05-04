/**
 * Human Design Calculator
 * Simplified calculation based on birth date and time.
 * True Human Design requires precise ephemeris data; this uses a deterministic
 * seeded algorithm to produce consistent, plausible results.
 */

export interface HumanDesignCenter {
  name: string;
  defined: boolean;
  color: string; // color when defined
}

export interface HumanDesignProfile {
  type: 'Manifestor' | 'Generator' | 'Manifesting Generator' | 'Projector' | 'Reflector';
  strategy: string;
  authority: string;
  profile: string; // e.g., "1/3", "4/6"
  profileName: string; // e.g., "Investigator/Martyr"
  definedCenters: string[];
  undefinedCenters: string[];
  centers: HumanDesignCenter[];
  designGates: number[]; // gates from design calculation (88 days before birth)
  personalityGates: number[]; // gates from birth moment
  channels: string[]; // connected channels e.g., "20-34"
  incarnationCross: string;
}

// --- Constants ---

const ALL_CENTERS = [
  'Head',
  'Ajna',
  'Throat',
  'G',
  'Heart',
  'Sacral',
  'Solar Plexus',
  'Spleen',
  'Root',
];

const CENTER_COLORS: Record<string, string> = {
  Head: '#F5C542',
  Ajna: '#F5C542',
  Throat: '#8B6914',
  G: '#F5C542',
  Heart: '#E74C3C',
  Sacral: '#E74C3C',
  'Solar Plexus': '#8B6914',
  Spleen: '#8B6914',
  Root: '#E74C3C',
};

// Channel definitions: [gateA, gateB, centerA, centerB, channelName]
const CHANNEL_DEFINITIONS: [number, number, string, string, string][] = [
  [20, 34, 'Throat', 'Sacral', 'Charisma'],
  [34, 57, 'Sacral', 'Spleen', 'Power'],
  [20, 57, 'Throat', 'Spleen', 'Penetrating Awareness'],
  [1, 8, 'G', 'Throat', 'Inspiration'],
  [13, 33, 'G', 'Throat', 'The Prodigal'],
  [7, 31, 'G', 'Throat', 'The Alpha'],
  [10, 20, 'G', 'Throat', 'Awakening'],
  [25, 51, 'G', 'Heart', 'Initiation'],
  [21, 45, 'Heart', 'Throat', 'Money Line'],
  [26, 44, 'Heart', 'Spleen', 'Surrender'],
  [50, 27, 'Spleen', 'Sacral', 'Preservation'],
  [59, 6, 'Sacral', 'Solar Plexus', 'Intimacy'],
  [42, 53, 'Sacral', 'Root', 'Maturation'],
  [3, 60, 'Sacral', 'Root', 'Mutation'],
  [9, 52, 'Sacral', 'Root', 'Concentration'],
  [54, 32, 'Root', 'Spleen', 'Transformation'],
  [19, 49, 'Root', 'Solar Plexus', 'Synthesis'],
  [39, 55, 'Root', 'Solar Plexus', 'Emoting'],
  [36, 35, 'Solar Plexus', 'Throat', 'Transitoriness'],
  [64, 47, 'Head', 'Ajna', 'Abstraction'],
  [61, 24, 'Head', 'Ajna', 'Awareness'],
  [63, 4, 'Head', 'Ajna', 'Logic'],
  [17, 62, 'Ajna', 'Throat', 'Acceptance'],
  [43, 23, 'Ajna', 'Throat', 'Structuring'],
  [11, 56, 'Ajna', 'Throat', 'Curiosity'],
  [48, 16, 'Spleen', 'Throat', 'The Wavelength'],
  [28, 38, 'Spleen', 'Root', 'Struggle'],
  [18, 58, 'Spleen', 'Root', 'Judgment'],
];

// Motor centers that can connect to Throat for Manifestor/MG determination
const MOTOR_CENTERS = ['Heart', 'Sacral', 'Solar Plexus', 'Root'];

// Valid profile combinations
const VALID_PROFILES: [number, number][] = [
  [1, 3],
  [1, 4],
  [2, 4],
  [2, 5],
  [3, 5],
  [3, 6],
  [4, 6],
  [4, 1],
  [5, 1],
  [5, 2],
  [6, 2],
  [6, 3],
];

const PROFILE_LINE_NAMES: Record<number, string> = {
  1: 'Investigator',
  2: 'Hermit',
  3: 'Martyr',
  4: 'Opportunist',
  5: 'Heretic',
  6: 'Role Model',
};

const INCARNATION_CROSSES = [
  'Right Angle Cross of the Sphinx',
  'Right Angle Cross of the Four Ways',
  'Left Angle Cross of Confrontation',
  'Right Angle Cross of Planning',
  'Juxtaposition Cross of Formulization',
  'Right Angle Cross of Consciousness',
  'Left Angle Cross of Education',
  'Right Angle Cross of the Vessel of Love',
  'Right Angle Cross of Eden',
  'Left Angle Cross of Revolution',
  'Right Angle Cross of Service',
  'Juxtaposition Cross of Power',
  'Right Angle Cross of Explanation',
  'Left Angle Cross of Wishes',
  'Right Angle Cross of the Sleeping Phoenix',
  'Right Angle Cross of Rulership',
];

// --- Utility Functions ---

/**
 * Simple deterministic hash from a string seed.
 * Returns a number between 0 and 1.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate a sequence of pseudo-random numbers from a seed.
 */
function seededSequence(seed: number, count: number): number[] {
  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(seededRandom(seed + i * 127));
  }
  return results;
}

/**
 * Convert a date string to a numeric seed.
 */
function dateToSeed(dateStr: string, timeStr: string): number {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  return year * 1000000 + month * 10000 + day * 100 + hours * 60 + minutes;
}

/**
 * Select unique random gates from 1-64.
 */
function selectGates(seed: number, count: number): number[] {
  const gates: Set<number> = new Set();
  let i = 0;
  while (gates.size < count) {
    const val = Math.floor(seededRandom(seed + i * 31) * 64) + 1;
    gates.add(val);
    i++;
  }
  return Array.from(gates).sort((a, b) => a - b);
}

/**
 * Determine which centers are defined based on active channels.
 */
function getDefinedCentersFromChannels(
  activeChannels: [number, number, string, string, string][]
): Set<string> {
  const defined = new Set<string>();
  for (const [, , centerA, centerB] of activeChannels) {
    defined.add(centerA);
    defined.add(centerB);
  }
  return defined;
}

/**
 * Check if any motor center has a path to the Throat center
 * through defined channels.
 */
function hasMotorToThroat(
  activeChannels: [number, number, string, string, string][],
  definedCenters: Set<string>
): boolean {
  // Build adjacency list from active channels
  const adj: Record<string, Set<string>> = {};
  for (const [, , centerA, centerB] of activeChannels) {
    if (!adj[centerA]) adj[centerA] = new Set();
    if (!adj[centerB]) adj[centerB] = new Set();
    adj[centerA].add(centerB);
    adj[centerB].add(centerA);
  }

  // BFS from each motor center to Throat
  for (const motor of MOTOR_CENTERS) {
    if (!definedCenters.has(motor)) continue;
    const visited = new Set<string>();
    const queue = [motor];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current === 'Throat') return true;
      if (visited.has(current)) continue;
      visited.add(current);
      const neighbors = adj[current];
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
  }
  return false;
}

/**
 * Determine the Human Design type based on defined centers and channel connections.
 */
function determineType(
  definedCenters: Set<string>,
  activeChannels: [number, number, string, string, string][]
): HumanDesignProfile['type'] {
  if (definedCenters.size === 0) {
    return 'Reflector';
  }

  const sacralDefined = definedCenters.has('Sacral');
  const motorToThroat = hasMotorToThroat(activeChannels, definedCenters);

  if (sacralDefined && motorToThroat) {
    return 'Manifesting Generator';
  }
  if (sacralDefined) {
    return 'Generator';
  }
  if (motorToThroat) {
    return 'Manifestor';
  }
  return 'Projector';
}

/**
 * Determine strategy based on type.
 */
function getStrategy(type: HumanDesignProfile['type']): string {
  switch (type) {
    case 'Manifestor':
      return 'To Inform';
    case 'Generator':
      return 'To Respond';
    case 'Manifesting Generator':
      return 'To Respond';
    case 'Projector':
      return 'Wait for the Invitation';
    case 'Reflector':
      return 'Wait a Lunar Cycle';
  }
}

/**
 * Determine authority based on defined centers.
 */
function getAuthority(definedCenters: Set<string>): string {
  if (definedCenters.has('Solar Plexus')) return 'Emotional Authority';
  if (definedCenters.has('Sacral')) return 'Sacral Authority';
  if (definedCenters.has('Spleen')) return 'Splenic Authority';
  if (definedCenters.has('Heart')) return 'Ego Authority';
  if (definedCenters.has('G')) return 'Self-Projected Authority';
  return 'Mental/None Authority';
}

/**
 * Calculate profile lines from birth date.
 */
function calculateProfile(dateStr: string, timeStr: string): { profile: string; profileName: string } {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours] = timeStr.split(':').map(Number);

  // Use a combination of date components to pick from valid profiles
  const seed = (year + month * 31 + day * 7 + hours) % VALID_PROFILES.length;
  const [line1, line2] = VALID_PROFILES[seed];

  const profile = `${line1}/${line2}`;
  const profileName = `${PROFILE_LINE_NAMES[line1]}/${PROFILE_LINE_NAMES[line2]}`;

  return { profile, profileName };
}

/**
 * Calculate Incarnation Cross based on personality Sun gate.
 */
function calculateIncarnationCross(personalityGates: number[]): string {
  if (personalityGates.length === 0) return INCARNATION_CROSSES[0];
  const idx = (personalityGates[0] - 1) % INCARNATION_CROSSES.length;
  return INCARNATION_CROSSES[idx];
}

// --- Main Calculation ---

export function calculateHumanDesign(dateStr: string, timeStr: string): HumanDesignProfile {
  const seed = dateToSeed(dateStr, timeStr);

  // Calculate personality gates (from birth moment) and design gates (88 days before)
  const personalityGates = selectGates(seed, 13);
  const designSeed = dateToSeed(dateStr, timeStr) - 8800; // offset for "88 days before"
  const designGates = selectGates(designSeed, 13);

  // Combine all active gates
  const allGates = new Set([...personalityGates, ...designGates]);

  // Determine which channels are activated
  const activeChannels: [number, number, string, string, string][] = [];
  for (const channel of CHANNEL_DEFINITIONS) {
    const [gateA, gateB] = channel;
    if (allGates.has(gateA) && allGates.has(gateB)) {
      activeChannels.push(channel);
    }
  }

  // Determine defined centers from channels
  let definedCenters = getDefinedCentersFromChannels(activeChannels);

  // If very few channels activated, use seed to add some defined centers
  // to ensure a meaningful chart
  if (definedCenters.size < 2 && activeChannels.length === 0) {
    const seq = seededSequence(seed, 9);
    const numDefined = Math.floor(seq[0] * 3) + 3; // 3-5 defined centers
    const shuffled = ALL_CENTERS
      .map((c, i) => ({ center: c, val: seq[i] }))
      .sort((a, b) => a.val - b.val)
      .slice(0, numDefined)
      .map((x) => x.center);

    definedCenters = new Set(shuffled);

    // Also generate some plausible channels based on defined centers
    for (const channel of CHANNEL_DEFINITIONS) {
      const [, , centerA, centerB] = channel;
      if (definedCenters.has(centerA) && definedCenters.has(centerB)) {
        const r = seededRandom(seed + channel[0] + channel[1]);
        if (r > 0.6) {
          activeChannels.push(channel);
        }
      }
    }
  }

  // Build channel strings
  const channels = activeChannels.map(
    ([gateA, gateB, , , name]) => `${gateA}-${gateB} (${name})`
  );

  // Determine type
  const type = determineType(definedCenters, activeChannels);

  // Build centers array
  const centers: HumanDesignCenter[] = ALL_CENTERS.map((name) => ({
    name,
    defined: definedCenters.has(name),
    color: CENTER_COLORS[name],
  }));

  const definedList = ALL_CENTERS.filter((c) => definedCenters.has(c));
  const undefinedList = ALL_CENTERS.filter((c) => !definedCenters.has(c));

  // Calculate remaining properties
  const strategy = getStrategy(type);
  const authority = getAuthority(definedCenters);
  const { profile, profileName } = calculateProfile(dateStr, timeStr);
  const incarnationCross = calculateIncarnationCross(personalityGates);

  return {
    type,
    strategy,
    authority,
    profile,
    profileName,
    definedCenters: definedList,
    undefinedCenters: undefinedList,
    centers,
    designGates,
    personalityGates,
    channels,
    incarnationCross,
  };
}
