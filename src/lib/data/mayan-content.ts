/**
 * Mayan Dreamspell Content
 *
 * Authentic Dreamspell descriptions for the 20 Solar Seals
 * and 13 Galactic Tones, based on Jose Arguelles' system.
 */

export interface SealContent {
  name: string;
  color: string;
  emoji: string;
  archetype: string;
  keywords: string[];
  description: string;
  power: string;
  action: string;
  essence: string;
}

export interface ToneContent {
  number: number;
  name: string;
  keyword: string;
  description: string;
  power: string;
}

export const sealContent: Record<string, SealContent> = {
  'Red Dragon': {
    name: 'Red Dragon',
    color: 'Red',
    emoji: '\uD83D\uDC32',
    archetype: 'The Nurturer',
    keywords: ['birth', 'nurturing', 'being', 'memory'],
    description:
      'Red Dragon represents the primal force of creation and the nurturing energy that sustains all life. It carries the memory of the cosmic mother, the source from which all existence springs forth. Those born under this seal are natural caretakers who feel a deep connection to the origins of life itself.\n\nDragon energy invites you to trust in the abundance of the universe and to nurture yourself as deeply as you nurture others. There is a profound sense of being held and supported when you align with this archetype. Allow yourself to receive with the same generosity that you give.',
    power: 'Birth',
    action: 'Nurtures',
    essence: 'Being',
  },
  'White Wind': {
    name: 'White Wind',
    color: 'White',
    emoji: '\uD83C\uDF2C\uFE0F',
    archetype: 'The Communicator',
    keywords: ['spirit', 'breath', 'communication', 'presence'],
    description:
      'White Wind is the breath of Spirit moving through all things. It represents divine communication, the whisper of truth that flows through words, song, and silence alike. Those born under this seal are channels for higher messages and carry the gift of inspired expression.\n\nWind energy calls you to listen deeply to the subtle currents of Spirit and to share your truth with clarity and grace. Your words carry power and your voice can heal. When you speak from the heart, you become a vessel for the cosmic breath that connects all beings.',
    power: 'Spirit',
    action: 'Communicates',
    essence: 'Breath',
  },
  'Blue Night': {
    name: 'Blue Night',
    color: 'Blue',
    emoji: '\uD83C\uDF03',
    archetype: 'The Dreamer',
    keywords: ['dreams', 'abundance', 'intuition', 'mystery'],
    description:
      'Blue Night holds the vast mystery of the dreamtime, the infinite realm of possibility that exists within the subconscious mind. It is the keeper of abundance and the guardian of the inner world where visions are born. Those born under this seal are natural dreamers with rich inner landscapes.\n\nNight energy invites you to explore the depths of your unconscious and to trust the visions that arise in dreams and meditation. True abundance flows from within, and your capacity to envision and manifest is extraordinary. Honor the darkness as the fertile ground from which all creation emerges.',
    power: 'Abundance',
    action: 'Dreams',
    essence: 'Intuition',
  },
  'Yellow Seed': {
    name: 'Yellow Seed',
    color: 'Yellow',
    emoji: '\uD83C\uDF31',
    archetype: 'The Innocent',
    keywords: ['targeting', 'awareness', 'flowering', 'potential'],
    description:
      'Yellow Seed carries the blueprint of potential within it, the promise of what can grow when awareness is focused and intention is clear. It represents the power of conscious planting, choosing which ideas and aspirations to nurture into full expression. Those born under this seal possess great latent potential waiting to bloom.\n\nSeed energy asks you to be deliberate about where you place your attention and what you choose to cultivate. Every thought is a seed, every intention a garden. Your awareness is your greatest tool. Trust in the timing of your unfolding and know that everything you need to flourish already lives within you.',
    power: 'Flowering',
    action: 'Targets',
    essence: 'Awareness',
  },
  'Red Serpent': {
    name: 'Red Serpent',
    color: 'Red',
    emoji: '\uD83D\uDC0D',
    archetype: 'The Initiator',
    keywords: ['life force', 'survival', 'instinct', 'kundalini'],
    description:
      'Red Serpent embodies the raw life force energy that pulses through every living being. It is the kundalini power coiled at the base of the spine, the primal intelligence of the body, and the instinct for survival and transformation. Those born under this seal are deeply connected to their physical senses and carry tremendous vitality.\n\nSerpent energy calls you to honor the wisdom of your body and to trust your instincts. Your physical vessel is a sacred instrument of transformation. When you learn to channel your powerful life force consciously, you become a catalyst for profound change and healing.',
    power: 'Life Force',
    action: 'Survives',
    essence: 'Instinct',
  },
  'White Worldbridger': {
    name: 'White Worldbridger',
    color: 'White',
    emoji: '\uD83C\uDF09',
    archetype: 'The Ambassador',
    keywords: ['death', 'opportunity', 'equality', 'surrender'],
    description:
      'White Worldbridger stands at the threshold between worlds, facilitating the crossing from one state of being to another. It represents the transformative power of surrender, the release of what no longer serves, and the bridge that connects different realms of experience. Those born under this seal are natural mediators and facilitators of change.\n\nWorldbridger energy invites you to embrace endings as doorways to new beginnings. By releasing attachment and surrendering to the flow of transformation, you create space for grace to enter. You have the gift of connecting disparate worlds and bringing together what has been separated.',
    power: 'Death',
    action: 'Equalizes',
    essence: 'Opportunity',
  },
  'Blue Hand': {
    name: 'Blue Hand',
    color: 'Blue',
    emoji: '\u270B',
    archetype: 'The Healer',
    keywords: ['accomplishment', 'healing', 'knowledge', 'completion'],
    description:
      'Blue Hand represents the power of accomplishment through direct engagement with the world. It is the energy of the healer who works with their hands, the craftsperson who shapes reality through skill and dedication. Those born under this seal are natural healers and makers who find fulfillment through tangible creation.\n\nHand energy calls you to reach out and grasp the opportunities before you. Your hands carry healing energy and your touch can transform. Knowledge becomes wisdom when it is applied through action. Trust in your ability to complete what you begin and to bring healing wherever you go.',
    power: 'Accomplishment',
    action: 'Knows',
    essence: 'Healing',
  },
  'Yellow Star': {
    name: 'Yellow Star',
    color: 'Yellow',
    emoji: '\u2B50',
    archetype: 'The Artist',
    keywords: ['beauty', 'elegance', 'art', 'harmony'],
    description:
      'Yellow Star radiates the pure light of beauty and harmony, illuminating the artistry inherent in all of creation. It represents the aesthetic sensibility that recognizes and creates elegance in every form. Those born under this seal are natural artists who perceive the world through the lens of beauty and seek to bring greater harmony to everything they touch.\n\nStar energy invites you to see yourself as a work of art in progress and to express the beauty you perceive in the world around you. Your creative gifts are a form of service, and when you align with harmony, you become a beacon that inspires others to find their own inner radiance.',
    power: 'Elegance',
    action: 'Beautifies',
    essence: 'Art',
  },
  'Red Moon': {
    name: 'Red Moon',
    color: 'Red',
    emoji: '\uD83C\uDF19',
    archetype: 'The Healer',
    keywords: ['universal water', 'purification', 'flow', 'emotion'],
    description:
      'Red Moon embodies the purifying flow of universal water, the emotional currents that cleanse and renew all of life. It represents the power of surrendering to the natural flow of feelings and allowing emotions to move through you like water through a riverbed. Those born under this seal are deeply sensitive and carry the gift of emotional purification.\n\nMoon energy calls you to honor your feelings as sacred messengers and to trust the flow of your emotional life. When you stop resisting and allow your feelings to move freely, you become a clear channel for cosmic purification. Your sensitivity is your greatest strength.',
    power: 'Universal Water',
    action: 'Purifies',
    essence: 'Flow',
  },
  'White Dog': {
    name: 'White Dog',
    color: 'White',
    emoji: '\uD83D\uDC15',
    archetype: 'The Companion',
    keywords: ['heart', 'love', 'loyalty', 'devotion'],
    description:
      'White Dog carries the pure frequency of unconditional love and the loyalty of the open heart. It represents the devotion that comes from truly loving without conditions, the companionship that enriches life, and the faithfulness of spirit. Those born under this seal are deeply loyal beings whose hearts naturally radiate warmth and compassion.\n\nDog energy invites you to lead with your heart in all things and to practice unconditional love, beginning with yourself. Your capacity for devotion is a gift, and your loyalty inspires trust in others. When you love openly and without reservation, you create a field of healing that touches everyone around you.',
    power: 'Heart',
    action: 'Loves',
    essence: 'Loyalty',
  },
  'Blue Monkey': {
    name: 'Blue Monkey',
    color: 'Blue',
    emoji: '\uD83D\uDC12',
    archetype: 'The Trickster',
    keywords: ['magic', 'play', 'illusion', 'inner child'],
    description:
      'Blue Monkey embodies the magical energy of play and the sacred trickster who reveals truth through humor and illusion. It represents the inner child that sees the world with wonder and the magician who understands that reality is more fluid than it appears. Those born under this seal carry a spark of divine mischief and creative magic.\n\nMonkey energy calls you to lighten up and remember that life is a cosmic game meant to be enjoyed. Your playfulness is not frivolous but rather a direct connection to the creative source. When you approach challenges with humor and a sense of play, you unlock solutions that the serious mind cannot perceive.',
    power: 'Magic',
    action: 'Plays',
    essence: 'Illusion',
  },
  'Yellow Human': {
    name: 'Yellow Human',
    color: 'Yellow',
    emoji: '\uD83E\uDDD1',
    archetype: 'The Sage',
    keywords: ['free will', 'wisdom', 'influence', 'receptivity'],
    description:
      'Yellow Human represents the vessel of free will and the accumulated wisdom of human experience. It carries the understanding that each person is a chalice for divine wisdom and that free will is the sacred gift that allows conscious evolution. Those born under this seal are natural vessels for wisdom who influence others through the depth of their understanding.\n\nHuman energy invites you to honor your free will as a sacred responsibility and to cultivate wisdom through conscious choice. You are a vessel capable of receiving and transmitting profound truth. When you align your will with divine purpose, your influence becomes a force for collective awakening.',
    power: 'Free Will',
    action: 'Influences',
    essence: 'Wisdom',
  },
  'Red Skywalker': {
    name: 'Red Skywalker',
    color: 'Red',
    emoji: '\uD83D\uDE80',
    archetype: 'The Explorer',
    keywords: ['space', 'exploration', 'wakefulness', 'prophecy'],
    description:
      'Red Skywalker is the cosmic explorer who walks between heaven and earth, bridging the mundane and the transcendent. It represents the adventurous spirit that seeks to expand beyond all known boundaries and to bring the energy of the cosmos down to ground level. Those born under this seal are natural explorers who feel called to push beyond conventional limits.\n\nSkywalker energy calls you to expand your horizons and to explore the uncharted territories of both inner and outer space. Your restless spirit is a gift that drives evolution forward. When you dare to walk where others have not, you blaze trails that others can follow and bring heaven closer to earth.',
    power: 'Space',
    action: 'Explores',
    essence: 'Wakefulness',
  },
  'White Wizard': {
    name: 'White Wizard',
    color: 'White',
    emoji: '\uD83E\uDDD9',
    archetype: 'The Wizard',
    keywords: ['timelessness', 'receptivity', 'enchantment', 'alignment'],
    description:
      'White Wizard holds the power of timelessness and the ability to step outside ordinary reality into the realm of enchantment. It represents the alignment of heart and mind that creates true magic and the receptivity that allows one to become a channel for higher frequencies. Those born under this seal carry a natural magnetism and an otherworldly quality.\n\nWizard energy invites you to step into your power as a conscious co-creator of reality. Your greatest magic comes not from doing but from being so deeply aligned that reality bends around you. Cultivate stillness and receptivity, and you will discover that enchantment is your natural state.',
    power: 'Timelessness',
    action: 'Enchants',
    essence: 'Receptivity',
  },
  'Blue Eagle': {
    name: 'Blue Eagle',
    color: 'Blue',
    emoji: '\uD83E\uDD85',
    archetype: 'The Visionary',
    keywords: ['vision', 'mind', 'creativity', 'perspective'],
    description:
      'Blue Eagle soars above the landscape of ordinary perception, seeing the grand patterns and connections that link all things. It represents the higher mind, the visionary capacity to perceive reality from an expanded perspective, and the creative intelligence that turns vision into reality. Those born under this seal are natural visionaries with powerful creative minds.\n\nEagle energy calls you to rise above the details and see the bigger picture. Your ability to perceive patterns and possibilities is a gift that serves not only you but the collective. When you trust your vision and commit to bringing it into form, you become a powerful agent of creative transformation.',
    power: 'Vision',
    action: 'Creates',
    essence: 'Mind',
  },
  'Yellow Warrior': {
    name: 'Yellow Warrior',
    color: 'Yellow',
    emoji: '\u2694\uFE0F',
    archetype: 'The Pathfinder',
    keywords: ['intelligence', 'fearlessness', 'questioning', 'courage'],
    description:
      'Yellow Warrior embodies the courage to question everything and the intelligence to find answers that serve the highest good. It represents the spiritual warrior who faces fear with grace and the pathfinder who navigates uncharted territory through the power of inquiry. Those born under this seal are naturally courageous seekers of truth.\n\nWarrior energy invites you to face your fears with intelligence rather than force and to use the power of questioning as your greatest weapon. Your courage is not the absence of fear but the willingness to move through it. When you combine bravery with wisdom, you become an unstoppable force for truth.',
    power: 'Intelligence',
    action: 'Questions',
    essence: 'Fearlessness',
  },
  'Red Earth': {
    name: 'Red Earth',
    color: 'Red',
    emoji: '\uD83C\uDF0D',
    archetype: 'The Navigator',
    keywords: ['evolution', 'navigation', 'synchronicity', 'grounding'],
    description:
      'Red Earth represents the living intelligence of the planet and the evolutionary force that guides all life toward greater complexity and consciousness. It is the energy of synchronicity, the meaningful coincidences that reveal you are on the right path. Those born under this seal have a deep connection to the earth and a natural ability to navigate by following signs and synchronicities.\n\nEarth energy calls you to pay attention to the signs and signals that the universe is constantly sending. Your path is illuminated by synchronicity, and when you learn to read these cosmic breadcrumbs, you become a masterful navigator of life. Trust in the evolutionary intelligence that guides you.',
    power: 'Navigation',
    action: 'Evolves',
    essence: 'Synchronicity',
  },
  'White Mirror': {
    name: 'White Mirror',
    color: 'White',
    emoji: '\uD83E\uDE9E',
    archetype: 'The Yogi',
    keywords: ['endlessness', 'reflection', 'truth', 'order'],
    description:
      'White Mirror reflects the infinite nature of reality and the power of seeing truth without distortion. It represents the clarity that comes from honest self-reflection and the understanding that the outer world mirrors the inner landscape. Those born under this seal have a gift for perceiving truth and a commitment to living in alignment with reality as it is.\n\nMirror energy invites you to look at yourself and your life with unflinching honesty and to embrace what you see with compassion. The reflections you encounter in the world are teachings, showing you where you are aligned and where you need adjustment. In the hall of mirrors, truth is your compass.',
    power: 'Endlessness',
    action: 'Reflects',
    essence: 'Order',
  },
  'Blue Storm': {
    name: 'Blue Storm',
    color: 'Blue',
    emoji: '\u26C8\uFE0F',
    archetype: 'The Catalyst',
    keywords: ['self-generation', 'energy', 'transformation', 'renewal'],
    description:
      'Blue Storm carries the tremendous power of transformation and catalytic change. It is the thunderbolt that shatters stagnation and the regenerative force that follows destruction with new growth. Those born under this seal are natural catalysts whose very presence can trigger profound shifts and transformations in others and in situations.\n\nStorm energy calls you to embrace change as your natural element and to trust the transformative power that moves through you. You are a force of nature, and trying to contain your energy only creates more pressure. When you allow your catalytic nature to flow freely, you become an agent of necessary renewal.',
    power: 'Self-Generation',
    action: 'Catalyzes',
    essence: 'Energy',
  },
  'Yellow Sun': {
    name: 'Yellow Sun',
    color: 'Yellow',
    emoji: '\u2600\uFE0F',
    archetype: 'The Enlightened One',
    keywords: ['enlightenment', 'universal fire', 'ascension', 'wholeness'],
    description:
      'Yellow Sun represents the culmination of the evolutionary journey, the full flowering of consciousness into enlightenment. It carries the energy of universal fire, the light of awareness that illuminates all shadows, and the wholeness that comes from integrating all aspects of self. Those born under this seal carry a radiant quality and a deep aspiration toward spiritual completion.\n\nSun energy invites you to shine your full light without apology and to embrace the totality of who you are. Enlightenment is not about escaping the world but about illuminating it with the fullness of your presence. You are a beacon of universal fire, and your light serves the awakening of all beings.',
    power: 'Universal Fire',
    action: 'Enlightens',
    essence: 'Life',
  },
};

export const toneContent: Record<number, ToneContent> = {
  1: {
    number: 1,
    name: 'Magnetic',
    keyword: 'Unify',
    description:
      'Tone 1 is the Magnetic tone of Purpose. It represents the power of attraction and the ability to unify diverse elements around a single intention. This tone initiates new cycles and draws together the resources needed for a new beginning. It asks: What is my purpose?',
    power: 'Attract',
  },
  2: {
    number: 2,
    name: 'Lunar',
    keyword: 'Polarize',
    description:
      'Tone 2 is the Lunar tone of Challenge. It represents the dynamic tension between opposites that creates movement and growth. This tone reveals the polarity inherent in every situation and invites you to find balance between opposing forces. It asks: What is the challenge?',
    power: 'Stabilize',
  },
  3: {
    number: 3,
    name: 'Electric',
    keyword: 'Activate',
    description:
      'Tone 3 is the Electric tone of Service. It represents the bonding force that activates creativity through the integration of polarities. This tone brings energy, dynamism, and the urge to serve a greater purpose. It asks: How can I best serve?',
    power: 'Bond',
  },
  4: {
    number: 4,
    name: 'Self-Existing',
    keyword: 'Define',
    description:
      'Tone 4 is the Self-Existing tone of Form. It represents the power of definition and the establishment of clear structures. This tone brings stability, order, and the ability to give tangible form to ideas. It asks: What form will my service take?',
    power: 'Measure',
  },
  5: {
    number: 5,
    name: 'Overtone',
    keyword: 'Empower',
    description:
      'Tone 5 is the Overtone tone of Radiance. It represents the gathering of resources and the empowerment that comes from taking command of your creative energy. This tone radiates confidence and the ability to take charge. It asks: How can I best empower myself?',
    power: 'Command',
  },
  6: {
    number: 6,
    name: 'Rhythmic',
    keyword: 'Organize',
    description:
      'Tone 6 is the Rhythmic tone of Equality. It represents the organic balance and organization that creates harmony in daily life. This tone brings the ability to establish healthy rhythms and to distribute resources equitably. It asks: How can I extend my equality to others?',
    power: 'Balance',
  },
  7: {
    number: 7,
    name: 'Resonant',
    keyword: 'Channel',
    description:
      'Tone 7 is the Resonant tone of Attunement. It represents the mystical center point where inspiration flows freely and alignment with higher purpose becomes effortless. This tone brings the ability to attune to subtle frequencies and to channel divine inspiration. It asks: How can I attune my purpose to serve others?',
    power: 'Inspire',
  },
  8: {
    number: 8,
    name: 'Galactic',
    keyword: 'Harmonize',
    description:
      'Tone 8 is the Galactic tone of Integrity. It represents the integration of inner truth with outer action and the harmonization of personal purpose with galactic intention. This tone brings integrity and the courage to live in alignment with your deepest values. It asks: Do I live what I believe?',
    power: 'Model',
  },
  9: {
    number: 9,
    name: 'Solar',
    keyword: 'Pulse',
    description:
      'Tone 9 is the Solar tone of Intention. It represents the pulsing of creative energy outward into manifestation and the power of focused intention to shape reality. This tone brings the ability to mobilize energy and to realize your greater purpose. It asks: How do I attain my purpose?',
    power: 'Realize',
  },
  10: {
    number: 10,
    name: 'Planetary',
    keyword: 'Perfect',
    description:
      'Tone 10 is the Planetary tone of Manifestation. It represents the perfection of form and the materialization of intention in the physical world. This tone brings the ability to produce tangible results and to manifest your vision with precision. It asks: How do I perfect what I do?',
    power: 'Produce',
  },
  11: {
    number: 11,
    name: 'Spectral',
    keyword: 'Dissolve',
    description:
      'Tone 11 is the Spectral tone of Liberation. It represents the dissolution of structure and the release of energy for new purposes. This tone brings the power to let go, to simplify, and to liberate yourself from what no longer serves. It asks: How do I release and let go?',
    power: 'Release',
  },
  12: {
    number: 12,
    name: 'Crystal',
    keyword: 'Dedicate',
    description:
      'Tone 12 is the Crystal tone of Cooperation. It represents the coming together of individuals in shared purpose and the dedication to collective endeavor. This tone brings clarity, cooperation, and the ability to work harmoniously with others. It asks: How can I dedicate myself to all that lives?',
    power: 'Universalize',
  },
  13: {
    number: 13,
    name: 'Cosmic',
    keyword: 'Endure',
    description:
      'Tone 13 is the Cosmic tone of Presence. It represents the completion of a cycle and the transcendence that comes from fully embodying the journey. This tone brings the ability to endure, to be fully present, and to take the magic flight into the next cycle. It asks: How can I expand my joy and love?',
    power: 'Transcend',
  },
};
