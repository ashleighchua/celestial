export interface ZodiacSignContent {
  sign: string;
  emoji: string;
  symbol: string;
  dateRange: string;
  element: string;
  modality: string;
  rulingPlanet: string;
  overview: string;
  strengths: string;
  weaknesses: string;
  career: string;
  love: string;
  asRising: string;
  asMoon: string;
  compatibility: string[];
  famousPeople: string[];
}

export const signContent: Record<string, ZodiacSignContent> = {
  Aries: {
    sign: 'Aries',
    emoji: '\u2648',
    symbol: 'The Ram',
    dateRange: 'Mar 21 - Apr 19',
    element: 'Fire',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    overview:
      'Aries is the first sign of the zodiac, and fittingly, those born under this sign are natural-born leaders. Bold, ambitious, and fiercely independent, Aries dives headfirst into even the most challenging situations. Their competitive nature and boundless energy make them unstoppable once they set their sights on a goal.\n\nRuled by Mars, the planet of action and desire, Aries possesses an innate warrior spirit. They are pioneers who blaze trails and inspire others with their courage. While their impulsiveness can sometimes lead them astray, their ability to bounce back from setbacks is truly remarkable.\n\nAt their best, Aries individuals are honest, generous, and optimistic. They have a childlike enthusiasm for life that is both infectious and endearing. They thrive when they have the freedom to chart their own course and the challenges to keep them engaged.',
    strengths: 'Courageous, determined, confident, enthusiastic, optimistic, honest, passionate',
    weaknesses: 'Impatient, moody, short-tempered, impulsive, aggressive',
    career:
      'Aries thrives in roles that demand leadership, quick thinking, and initiative. They excel as entrepreneurs, military leaders, surgeons, athletes, and emergency responders. Their competitive drive and fearlessness make them natural pioneers in any field they choose. They perform best when given autonomy and fresh challenges.',
    love:
      'In love, Aries is passionate, direct, and fiercely loyal. They love the thrill of the chase and appreciate a partner who can match their energy and independence. Aries needs excitement and spontaneity in relationships. They are generous lovers who wear their hearts on their sleeves, but they need space to maintain their individuality.',
    asRising:
      'With Aries rising, you project an aura of confidence, energy, and directness. First impressions of you are that of a bold, assertive individual who is not afraid to take charge. Your physical presence tends to be athletic and dynamic. People see you as a go-getter who leads with action rather than words.',
    asMoon:
      'With the Moon in Aries, your emotional nature is fiery, spontaneous, and independent. You process feelings quickly and prefer to act on your emotions rather than dwell on them. You need emotional freedom and can become restless when feeling constrained. Your instinctive response to any situation is to take immediate, decisive action.',
    compatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    famousPeople: ['Lady Gaga', 'Robert Downey Jr.', 'Leonardo da Vinci', 'Maya Angelou'],
  },
  Taurus: {
    sign: 'Taurus',
    emoji: '\u2649',
    symbol: 'The Bull',
    dateRange: 'Apr 20 - May 20',
    element: 'Earth',
    modality: 'Fixed',
    rulingPlanet: 'Venus',
    overview:
      'Taurus is the anchor of the zodiac, embodying stability, sensuality, and steadfast determination. Those born under this sign appreciate the finer things in life and are willing to work tirelessly to achieve the comfort and security they desire. Grounded and practical, Taurus approaches life with patience and persistence.\n\nRuled by Venus, the planet of love and beauty, Taurus has a deep appreciation for art, music, and all forms of aesthetic pleasure. They are deeply connected to the physical world and find joy in nature, good food, and tactile experiences. Their reliability makes them the friend everyone turns to in times of need.\n\nWhile sometimes perceived as stubborn, this fixed-sign tenacity is actually one of their greatest strengths. Once a Taurus commits to something, they see it through to the end. Their calm, methodical approach to life provides a stabilizing influence on those around them.',
    strengths: 'Reliable, patient, practical, devoted, responsible, stable',
    weaknesses: 'Stubborn, possessive, uncompromising, materialistic',
    career:
      'Taurus excels in careers that offer stability, tangible results, and financial rewards. They are naturally suited for banking, finance, agriculture, culinary arts, music, and real estate. Their patience and attention to detail make them excellent project managers and craftspeople. They build lasting careers through consistent effort rather than flashy shortcuts.',
    love:
      'In love, Taurus is devoted, sensual, and deeply romantic. They seek long-term partnerships built on trust, comfort, and mutual respect. A Taurus partner will shower you with affection, cook gourmet meals, and create a beautiful home. They value loyalty above all else and need a partner who is equally committed and dependable.',
    asRising:
      'With Taurus rising, you come across as calm, composed, and approachable. There is a natural warmth and sensuality in your demeanor. People perceive you as someone grounded and trustworthy. Your physical presence tends to be strong and steady, often with distinctive features like a melodious voice or a love of comfortable, well-made clothing.',
    asMoon:
      'With the Moon in Taurus, you find emotional security through stability, routine, and physical comfort. You process feelings slowly and deliberately, rarely making impulsive emotional decisions. Creature comforts are essential to your well-being. You are emotionally generous and loyal, but changes to your routine or environment can cause significant stress.',
    compatibility: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
    famousPeople: ['Adele', 'Dwayne Johnson', 'Queen Elizabeth II', 'Audrey Hepburn'],
  },
  Gemini: {
    sign: 'Gemini',
    emoji: '\u264A',
    symbol: 'The Twins',
    dateRange: 'May 21 - Jun 20',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    overview:
      'Gemini is the social butterfly of the zodiac, blessed with quick wit, insatiable curiosity, and remarkable adaptability. Represented by the Twins, those born under this sign have a multifaceted personality that allows them to navigate diverse social situations with ease. They are the communicators and connectors of the zodiac.\n\nRuled by Mercury, the planet of communication and intellect, Geminis are natural storytellers, writers, and conversationalists. Their minds move at lightning speed, constantly absorbing and processing information from the world around them. They have an almost magical ability to see multiple sides of any situation.\n\nGeminis thrive on variety and mental stimulation. Routine is their kryptonite; they need constant change and new experiences to feel alive. While this can sometimes manifest as restlessness or inconsistency, it also makes them among the most interesting and entertaining people you will ever meet.',
    strengths: 'Gentle, affectionate, curious, adaptable, ability to learn quickly, witty',
    weaknesses: 'Nervous, inconsistent, indecisive, scattered, superficial',
    career:
      'Gemini shines in careers that leverage their communication skills and intellectual versatility. They excel as journalists, writers, teachers, marketers, salespeople, and social media managers. Their adaptability makes them excellent in fast-paced environments where multitasking is required. They often have multiple career interests and may pursue portfolio careers.',
    love:
      'In love, Gemini needs intellectual stimulation above all else. They are drawn to partners who can engage them in witty banter and keep them guessing. Communication is the cornerstone of their relationships. A Gemini partner is playful, spontaneous, and endlessly entertaining, but they need space for their social life and intellectual pursuits.',
    asRising:
      'With Gemini rising, you appear youthful, curious, and highly communicative. People see you as someone who is always in motion, both physically and mentally. You make excellent first impressions through your charm and conversation skills. Your expressive face and animated gestures draw people in and make them feel comfortable.',
    asMoon:
      'With the Moon in Gemini, you process emotions through logic and communication. You need to talk about your feelings to understand them. Emotional variety and intellectual connection are vital to your well-being. You can be emotionally restless, sometimes feeling multiple things at once. Writing and conversation are therapeutic for you.',
    compatibility: ['Libra', 'Aquarius', 'Aries', 'Leo'],
    famousPeople: ['Marilyn Monroe', 'Kanye West', 'Angelina Jolie', 'John F. Kennedy'],
  },
  Cancer: {
    sign: 'Cancer',
    emoji: '\u264B',
    symbol: 'The Crab',
    dateRange: 'Jun 21 - Jul 22',
    element: 'Water',
    modality: 'Cardinal',
    rulingPlanet: 'Moon',
    overview:
      'Cancer is the nurturer of the zodiac, guided by emotion, intuition, and a profound connection to home and family. Like their symbol the Crab, those born under this sign carry their home on their back, creating emotional safety wherever they go. They are among the most loyal and protective souls in the zodiac.\n\nRuled by the Moon, Cancer\'s emotional landscape shifts and flows with lunar rhythms. They possess extraordinary empathy and can sense the feelings of others with almost psychic accuracy. This deep emotional intelligence makes them natural healers, counselors, and caregivers.\n\nBeneath their protective shell lies a rich inner world of imagination and creativity. Cancers are often drawn to the arts, cooking, and creating beautiful, comfortable spaces. While they may appear reserved to strangers, those who earn their trust discover a warm, funny, and deeply devoted companion.',
    strengths: 'Tenacious, highly imaginative, loyal, emotional, sympathetic, persuasive',
    weaknesses: 'Moody, pessimistic, suspicious, manipulative, insecure',
    career:
      'Cancer thrives in nurturing and creative professions. They excel as therapists, nurses, chefs, interior designers, social workers, and teachers. Their strong intuition also serves them well in business, particularly in roles that require reading people and situations. They often create family-like bonds in the workplace.',
    love:
      'In love, Cancer is deeply devoted, nurturing, and emotionally generous. They seek a partner who provides security and understands their emotional depth. Cancers create warm, loving homes and are often the emotional center of their families. They need a partner who appreciates their sensitivity and reciprocates their deep level of care and commitment.',
    asRising:
      'With Cancer rising, you present a warm, approachable, and nurturing exterior. People sense your emotional depth and feel safe confiding in you. Your demeanor is gentle and caring, often with a round, friendly face and expressive eyes. You may come across as shy initially, but your warmth quickly draws people into your inner circle.',
    asMoon:
      'With the Moon in Cancer, you are at home in the realm of emotions. Your feelings run deep and are strongly connected to your sense of security and family. Nostalgia and memories play a significant role in your emotional life. You need a safe, comfortable environment to thrive and may retreat into your shell when feeling overwhelmed.',
    compatibility: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    famousPeople: ['Princess Diana', 'Tom Hanks', 'Meryl Streep', 'Frida Kahlo'],
  },
  Leo: {
    sign: 'Leo',
    emoji: '\u264C',
    symbol: 'The Lion',
    dateRange: 'Jul 23 - Aug 22',
    element: 'Fire',
    modality: 'Fixed',
    rulingPlanet: 'Sun',
    overview:
      'Leo is the royalty of the zodiac, radiating warmth, confidence, and a magnetic charisma that lights up every room. Symbolized by the Lion, those born under this sign possess a natural regality and an innate desire to lead, create, and inspire. They are generous, big-hearted, and unapologetically themselves.\n\nRuled by the Sun, the center of our solar system, Leos naturally gravitate toward the center of attention. This is not merely vanity; Leos genuinely want to uplift and entertain those around them. Their creative fire burns brightly, and they have a remarkable ability to bring joy and drama to everyday life.\n\nAt their core, Leos are fiercely loyal and protective of their loved ones. They lead with their hearts and have a strong sense of honor and integrity. While they can be prideful and dramatic, their warmth and generosity more than compensate. A Leo in your life is a constant source of light and laughter.',
    strengths: 'Creative, passionate, generous, warm-hearted, cheerful, humorous',
    weaknesses: 'Arrogant, stubborn, self-centered, lazy, inflexible',
    career:
      'Leo thrives in roles where they can lead, create, and be recognized for their talents. They excel as performers, directors, executives, politicians, designers, and motivational speakers. Their charisma and confidence make them natural leaders in any field. They need careers that allow them to express their creativity and receive acknowledgment for their contributions.',
    love:
      'In love, Leo is passionate, romantic, and endlessly generous. They love grand gestures, lavish dates, and making their partner feel like the most special person in the world. Leos need admiration and appreciation in return. They are loyal and devoted partners who bring excitement, warmth, and an unwavering sense of fun to their relationships.',
    asRising:
      'With Leo rising, you command attention the moment you enter a room. Your presence is warm, confident, and often dramatic. People perceive you as someone special and are drawn to your natural charisma. You may have a distinctive mane of hair or a regal posture. Your smile is your signature, and your generosity of spirit is immediately apparent.',
    asMoon:
      'With the Moon in Leo, your emotional nature craves recognition, creativity, and love. You experience feelings with theatrical intensity and need to express them openly. Emotional validation is essential to your well-being. You are generous with your affections and loyal to those who earn your heart. Being overlooked or unappreciated is deeply painful for you.',
    compatibility: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
    famousPeople: ['Barack Obama', 'Madonna', 'Jennifer Lopez', 'Alfred Hitchcock'],
  },
  Virgo: {
    sign: 'Virgo',
    emoji: '\u264D',
    symbol: 'The Maiden',
    dateRange: 'Aug 23 - Sep 22',
    element: 'Earth',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    overview:
      'Virgo is the perfectionist and healer of the zodiac, combining analytical brilliance with a deep desire to be of service. Those born under this sign possess an extraordinary eye for detail and a methodical approach to life that others find both impressive and reassuring. They are the problem-solvers and organizers we all need.\n\nRuled by Mercury, the planet of communication and intellect, Virgos process the world through careful observation and analysis. Unlike Gemini, Mercury\'s other sign, Virgo applies this mental energy toward practical improvement and refinement. They see the potential in everything and everyone and work tirelessly to bring out the best.\n\nBeneath their sometimes reserved exterior lies a deeply caring soul. Virgos express love through acts of service, remembering the small details that matter most. While their critical nature can sometimes be perceived as harsh, it stems from a genuine desire to help. A Virgo\'s advice, though direct, is always worth heeding.',
    strengths: 'Loyal, analytical, kind, hardworking, practical, detail-oriented',
    weaknesses: 'Shyness, worry, overly critical, all work and no play',
    career:
      'Virgo excels in careers that require precision, analysis, and attention to detail. They are naturally suited for healthcare, editing, accounting, data science, research, nutrition, and quality assurance. Their service-oriented nature also draws them to teaching, nursing, and veterinary medicine. They thrive in organized environments where excellence is valued.',
    love:
      'In love, Virgo shows devotion through thoughtful acts of service and unwavering reliability. They may not be the most outwardly romantic sign, but their love runs deep and is demonstrated through consistent, practical care. Virgos need a partner who appreciates their attention to detail and understands that their desire to improve things comes from a place of love.',
    asRising:
      'With Virgo rising, you present yourself as put-together, thoughtful, and quietly competent. People see you as someone reliable and intelligent. Your appearance tends to be neat and well-groomed. You may come across as reserved or analytical upon first meeting, but your gentle kindness becomes apparent quickly. Others sense your desire to be helpful.',
    asMoon:
      'With the Moon in Virgo, you find emotional security through order, routine, and being useful. You process feelings analytically and may struggle with emotional vulnerability. Your inner critic can be harsh, but it drives you toward constant self-improvement. Health and well-being are deeply tied to your emotional state, and you need productive outlets for nervous energy.',
    compatibility: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
    famousPeople: ['Beyonce', 'Keanu Reeves', 'Mother Teresa', 'Michael Jackson'],
  },
  Libra: {
    sign: 'Libra',
    emoji: '\u264E',
    symbol: 'The Scales',
    dateRange: 'Sep 23 - Oct 22',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Venus',
    overview:
      'Libra is the diplomat and aesthete of the zodiac, forever seeking balance, harmony, and beauty in all things. Symbolized by the Scales, those born under this sign have an innate sense of justice and fairness that guides their every decision. They are the peacemakers and bridge-builders of the zodiac.\n\nRuled by Venus, the planet of love and beauty, Libras are drawn to elegance, art, and refined experiences. They have an extraordinary ability to see all sides of a situation, which makes them excellent mediators and counselors. Their charm and social grace open doors wherever they go.\n\nLibras thrive in partnerships and collaborative environments. While their desire to please everyone can sometimes lead to indecisiveness, their intentions are always rooted in creating harmony. They believe that life is best experienced when shared with others and invest deeply in their relationships.',
    strengths: 'Cooperative, diplomatic, gracious, fair-minded, social, charming',
    weaknesses: 'Indecisive, avoids confrontations, carries grudges, self-pity',
    career:
      'Libra excels in careers that involve people, aesthetics, and justice. They are natural diplomats, lawyers, designers, art curators, HR professionals, and public relations specialists. Their ability to see multiple perspectives makes them excellent negotiators and mediators. They perform best in harmonious work environments and collaborative team settings.',
    love:
      'In love, Libra is romantic, attentive, and deeply committed to partnership. They view relationships as a beautiful dance of give and take. Libras are drawn to elegance and wit in a partner and value intellectual compatibility alongside physical attraction. They go to great lengths to maintain harmony and make their partners feel cherished and valued.',
    asRising:
      'With Libra rising, you exude grace, charm, and a natural elegance that makes people feel at ease. Your appearance tends to be attractive and balanced, with a warm smile that invites connection. People perceive you as fair, sociable, and aesthetically aware. You have a diplomatic way of handling situations that makes you a natural peacemaker.',
    asMoon:
      'With the Moon in Libra, you find emotional equilibrium through relationships, beauty, and fairness. You need harmony in your environment to feel emotionally secure. Conflict and discord are deeply unsettling for you. You process feelings through dialogue and seek balanced perspectives. Aesthetic surroundings and gracious living contribute greatly to your emotional well-being.',
    compatibility: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
    famousPeople: ['John Lennon', 'Kim Kardashian', 'Oscar Wilde', 'Mahatma Gandhi'],
  },
  Scorpio: {
    sign: 'Scorpio',
    emoji: '\u264F',
    symbol: 'The Scorpion',
    dateRange: 'Oct 23 - Nov 21',
    element: 'Water',
    modality: 'Fixed',
    rulingPlanet: 'Pluto',
    overview:
      'Scorpio is the most intense and transformative sign of the zodiac. Those born under this sign possess a depth of emotion and a penetrating insight that borders on the supernatural. Like their symbol the Scorpion, they are powerful, resilient, and not to be underestimated. They are the alchemists of the zodiac, capable of turning darkness into gold.\n\nRuled by Pluto, the planet of transformation, death, and rebirth, Scorpios are drawn to life\'s deepest mysteries. They are fascinated by what lies beneath the surface, whether in psychology, spirituality, or human nature. Their intensity and focus give them an almost magnetic presence that others find both fascinating and intimidating.\n\nScorpio\'s greatest power lies in their ability to regenerate. Like the phoenix, they can rise from the ashes of their most devastating experiences stronger than before. Their loyalty is absolute, their memory is long, and their passion for life is unmatched. To be loved by a Scorpio is to be loved completely and forever.',
    strengths: 'Resourceful, brave, passionate, stubborn, a true friend, strategic',
    weaknesses: 'Distrusting, jealous, secretive, violent tendencies, manipulative',
    career:
      'Scorpio excels in careers that involve investigation, transformation, and depth. They are naturally suited for psychology, detective work, surgery, research, finance, and crisis management. Their strategic mind and resilience make them formidable in any competitive field. They thrive in roles where they can uncover hidden truths and drive meaningful change.',
    love:
      'In love, Scorpio is all or nothing. They offer a depth of passion and emotional intimacy that few other signs can match. Trust is paramount; once earned, a Scorpio\'s loyalty is unshakeable. They seek a partner who can match their emotional depth and isn\'t afraid of vulnerability. Scorpio love is transformative, challenging, and profoundly rewarding.',
    asRising:
      'With Scorpio rising, you project an aura of mystery, intensity, and quiet power. People sense that there is far more to you than meets the eye. Your gaze tends to be penetrating and magnetic, and your presence commands attention without effort. You may come across as private or enigmatic, drawing others in with your depth and emotional intelligence.',
    asMoon:
      'With the Moon in Scorpio, your emotions run extraordinarily deep. You feel everything with transformative intensity and have powerful instincts about people and situations. Trust is built slowly, but once given, it is absolute. You process emotions privately and may struggle with letting go. Emotional honesty and deep connections are essential to your well-being.',
    compatibility: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
    famousPeople: ['Leonardo DiCaprio', 'Marie Curie', 'Pablo Picasso', 'Bill Gates'],
  },
  Sagittarius: {
    sign: 'Sagittarius',
    emoji: '\u2650',
    symbol: 'The Archer',
    dateRange: 'Nov 22 - Dec 21',
    element: 'Fire',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    overview:
      'Sagittarius is the adventurer and philosopher of the zodiac, driven by an insatiable thirst for knowledge, experience, and meaning. Symbolized by the Archer with bow aimed at the stars, those born under this sign are perpetual seekers on a quest for truth and understanding. Their optimism and enthusiasm are truly infectious.\n\nRuled by Jupiter, the planet of expansion, luck, and higher learning, Sagittarians think big and dream bigger. They are natural explorers, whether traversing the globe, diving into books, or engaging in spirited philosophical debates. Their honesty is legendary, sometimes brutally so, but it comes from a genuine desire for authenticity.\n\nSagittarius brings a sense of humor and lightness to even the heaviest situations. They refuse to be weighed down by pessimism and always believe that the best is yet to come. Their freedom-loving nature and restless spirit drive them to constantly expand their horizons, making them among the most interesting and well-traveled people in the zodiac.',
    strengths: 'Generous, idealistic, great sense of humor, adventurous, philosophical',
    weaknesses: 'Promises more than can deliver, impatient, tactless, restless',
    career:
      'Sagittarius thrives in careers that offer freedom, travel, and intellectual growth. They excel as professors, travel writers, international business professionals, philosophers, motivational speakers, and outdoor guides. Their natural optimism and big-picture thinking make them inspiring leaders. They need careers that allow for exploration and continuous learning.',
    love:
      'In love, Sagittarius is adventurous, honest, and endlessly fun. They seek a partner who shares their love of exploration and intellectual curiosity. Freedom within the relationship is non-negotiable. A Sagittarius partner will plan spontaneous trips, engage you in deep philosophical conversations, and keep the spark of excitement alive. They need a relationship that feels like a grand adventure.',
    asRising:
      'With Sagittarius rising, you come across as open, optimistic, and larger than life. Your enthusiasm is palpable, and people are drawn to your jovial, adventurous spirit. You may have an athletic build and an expressive, animated face. Your approach to the world is warm and expansive, and you make others feel that anything is possible.',
    asMoon:
      'With the Moon in Sagittarius, your emotional nature is optimistic, freedom-loving, and philosophical. You process feelings through exploration and meaning-making. Emotional restriction makes you restless and unhappy. You find comfort in travel, learning, and spiritual or philosophical pursuits. Your emotional resilience is remarkable, and you bounce back from setbacks with renewed optimism.',
    compatibility: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    famousPeople: ['Taylor Swift', 'Bruce Lee', 'Walt Disney', 'Jane Austen'],
  },
  Capricorn: {
    sign: 'Capricorn',
    emoji: '\u2651',
    symbol: 'The Sea-Goat',
    dateRange: 'Dec 22 - Jan 19',
    element: 'Earth',
    modality: 'Cardinal',
    rulingPlanet: 'Saturn',
    overview:
      'Capricorn is the master builder and strategist of the zodiac, combining unwavering ambition with remarkable discipline and patience. Symbolized by the Sea-Goat, those born under this sign are determined climbers who methodically work their way to the top. They understand that lasting success is built on solid foundations.\n\nRuled by Saturn, the planet of structure, responsibility, and time, Capricorns possess a maturity and wisdom that often exceeds their years. They take their commitments seriously and hold themselves to the highest standards. While others may see obstacles, Capricorn sees stepping stones, approaching challenges with strategic precision.\n\nBeneath Capricorn\'s serious exterior lies a surprisingly dry wit and a deeply loyal heart. They may not be the most emotionally expressive sign, but their love is demonstrated through unwavering support and consistent actions. As they age, Capricorns often become more relaxed and playful, having built the security that allows them to finally enjoy life\'s pleasures.',
    strengths: 'Responsible, disciplined, self-control, good managers, ambitious',
    weaknesses: 'Know-it-all, unforgiving, condescending, pessimistic',
    career:
      'Capricorn excels in careers that reward long-term planning, discipline, and leadership. They are naturally suited for executive roles, finance, law, engineering, architecture, and government. Their strategic mind and work ethic make them invaluable in any organization. They build impressive careers through patience, persistence, and an unwavering commitment to excellence.',
    love:
      'In love, Capricorn is cautious, committed, and deeply loyal. They take relationships as seriously as their careers and seek a partner who shares their values and ambition. Capricorn love grows stronger over time, like a fine wine. They may not be the most spontaneous romantics, but they show love through stability, reliability, and building a secure future together.',
    asRising:
      'With Capricorn rising, you project an image of competence, maturity, and quiet authority. People see you as someone who has it together, even when you may not feel that way inside. Your demeanor is professional and dignified, often appearing older or more serious than your age. Over time, you tend to age gracefully, becoming more relaxed and approachable.',
    asMoon:
      'With the Moon in Capricorn, you find emotional security through achievement, structure, and responsibility. You process feelings with restraint and may struggle to express vulnerability. Emotional self-sufficiency is important to you, but this can sometimes lead to isolation. You need to feel productive and in control to be emotionally balanced. Tradition and family legacy hold deep meaning for you.',
    compatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    famousPeople: ['Martin Luther King Jr.', 'Michelle Obama', 'Muhammad Ali', 'Isaac Newton'],
  },
  Aquarius: {
    sign: 'Aquarius',
    emoji: '\u2652',
    symbol: 'The Water Bearer',
    dateRange: 'Jan 20 - Feb 18',
    element: 'Air',
    modality: 'Fixed',
    rulingPlanet: 'Uranus',
    overview:
      'Aquarius is the visionary and humanitarian of the zodiac, marching to the beat of their own drum while dreaming of a better world for all. Symbolized by the Water Bearer who pours knowledge upon humanity, those born under this sign are innovative, independent, and deeply committed to social progress.\n\nRuled by Uranus, the planet of revolution, innovation, and sudden change, Aquarians are natural-born rebels with a cause. They think outside the box as a matter of course and often see solutions that elude more conventional minds. Their intellect is sharp and their perspective is uniquely their own.\n\nDespite being an air sign associated with intellect, Aquarius cares deeply about collective well-being. They are the activists, inventors, and thought leaders who push humanity forward. While they may sometimes seem emotionally detached, their love for humanity as a whole runs deep. An Aquarius friend is one who will challenge your thinking and expand your worldview.',
    strengths: 'Progressive, original, independent, humanitarian, intellectual',
    weaknesses: 'Runs from emotional expression, temperamental, uncompromising, aloof',
    career:
      'Aquarius thrives in careers that involve innovation, technology, and social change. They excel as scientists, programmers, social activists, inventors, astrologers, and humanitarian workers. Their unconventional thinking makes them valuable in any field that values disruption and fresh perspectives. They need careers that align with their ideals and allow them intellectual freedom.',
    love:
      'In love, Aquarius values intellectual connection and mutual independence above all. They seek a partner who respects their need for space and shares their vision for the future. Aquarius love is unconventional, stimulating, and deeply honest. They are fiercely loyal friends and partners who show love through intellectual engagement, shared causes, and unwavering acceptance of who you truly are.',
    asRising:
      'With Aquarius rising, you come across as unique, intellectual, and slightly unconventional. People notice something different about you immediately, whether in your style, your ideas, or your approach to life. You project an air of friendly detachment and progressive thinking. Others see you as someone who is ahead of their time and unafraid to be different.',
    asMoon:
      'With the Moon in Aquarius, your emotional nature is independent, unconventional, and intellectually oriented. You process feelings through logic and may detach from emotions to gain perspective. Emotional freedom and individuality are essential to your well-being. You connect emotionally through shared ideals and intellectual stimulation rather than traditional expressions of sentiment.',
    compatibility: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
    famousPeople: ['Oprah Winfrey', 'Abraham Lincoln', 'Bob Marley', 'Harry Styles'],
  },
  Pisces: {
    sign: 'Pisces',
    emoji: '\u2653',
    symbol: 'The Fish',
    dateRange: 'Feb 19 - Mar 20',
    element: 'Water',
    modality: 'Mutable',
    rulingPlanet: 'Neptune',
    overview:
      'Pisces is the mystic and dreamer of the zodiac, the most intuitive, empathetic, and spiritually attuned of all the signs. Symbolized by two Fish swimming in opposite directions, those born under this sign navigate between the material world and the vast ocean of imagination and spirit. They are the poets, healers, and visionaries of the zodiac.\n\nRuled by Neptune, the planet of dreams, illusion, and transcendence, Pisces possesses an otherworldly quality that sets them apart. They absorb the emotions and energies of those around them like a sponge, which gives them extraordinary compassion but can also be overwhelming. Their creativity flows from a deep, boundless well.\n\nPisces lives at the intersection of reality and fantasy, finding magic in the mundane and beauty in the broken. Their gentleness and empathy make them natural healers and artists. While they may sometimes struggle with boundaries or escapism, their ability to love unconditionally and see the divine in everyone is truly a gift to the world.',
    strengths: 'Compassionate, artistic, intuitive, gentle, wise, musical',
    weaknesses: 'Fearful, overly trusting, sad, desire to escape reality, can be a victim',
    career:
      'Pisces excels in careers that engage their creativity, empathy, and spiritual nature. They are naturally suited for the arts, music, film, therapy, nursing, spiritual counseling, and charitable work. Their intuitive understanding of human nature makes them exceptional healers and artists. They need careers that feel meaningful and allow them to help or inspire others.',
    love:
      'In love, Pisces is deeply romantic, compassionate, and devoted. They love with their whole being and seek a soulmate-level connection. Pisces partners are empathetic, intuitive, and attuned to their loved one\'s needs, often knowing what you feel before you do. They need a partner who appreciates their sensitivity and can provide grounding stability while honoring their dreamy nature.',
    asRising:
      'With Pisces rising, you project a gentle, ethereal, and approachable aura. People sense your deep sensitivity and compassion. Your eyes tend to be particularly expressive, almost otherworldly, reflecting a rich inner life. You may come across as dreamy or artistic. Others feel comfortable sharing their deepest feelings with you, sensing your natural empathy.',
    asMoon:
      'With the Moon in Pisces, your emotional world is vast, deep, and without clear boundaries. You are extraordinarily empathetic, often absorbing the emotions of those around you. Creative and artistic expression is essential for emotional processing. You need time alone to recharge and may retreat into fantasy or spiritual practice when overwhelmed. Your compassion for all living things is profound.',
    compatibility: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
    famousPeople: ['Rihanna', 'Albert Einstein', 'Michelangelo', 'Steve Jobs'],
  },
};

// ---------------------------------------------------------------------------
// Big Three combination descriptions
// ---------------------------------------------------------------------------

export interface BigThreeDescription {
  pattern: string;
  title: string;
  description: string;
}

/**
 * Generate a dynamic title, tagline, and description based on the
 * combination of Sun, Moon, and Rising signs.
 *
 * The algorithm examines element and modality concentrations to produce a
 * unique characterization of the Big Three configuration.
 */
export function getBigThreeTitle(
  sun: string,
  moon: string,
  rising: string
): { title: string; tagline: string; description: string } {
  const elements = [
    signContent[sun]?.element,
    signContent[moon]?.element,
    signContent[rising]?.element,
  ];
  const modalities = [
    signContent[sun]?.modality,
    signContent[moon]?.modality,
    signContent[rising]?.modality,
  ];

  const elementCount: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  const modalityCount: Record<string, number> = { Cardinal: 0, Fixed: 0, Mutable: 0 };

  for (const el of elements) {
    if (el) elementCount[el]++;
  }
  for (const mod of modalities) {
    if (mod) modalityCount[mod]++;
  }

  // Determine dominant element and modality
  const dominantElement = Object.entries(elementCount).sort((a, b) => b[1] - a[1])[0];
  const dominantModality = Object.entries(modalityCount).sort((a, b) => b[1] - a[1])[0];

  let title = '';
  let tagline = '';
  let description = '';

  // Triple element (all three the same)
  if (dominantElement[1] === 3) {
    switch (dominantElement[0]) {
      case 'Fire':
        title = 'Blazing Trailblazer';
        tagline = 'Pure fire. Pure power.';
        description = `With your Sun in ${sun}, Moon in ${moon}, and Rising in ${rising}, you are a triple Fire force. Your entire being radiates confidence, passion, and dynamic energy. You are driven by an internal flame that inspires everyone around you. Leadership comes naturally, and you approach life with bold enthusiasm and unwavering courage. Just remember to rest - even the brightest flames need fuel.`;
        break;
      case 'Earth':
        title = 'Unshakeable Foundation';
        tagline = 'Grounded in purpose, built to last.';
        description = `With your Sun in ${sun}, Moon in ${moon}, and Rising in ${rising}, you are a triple Earth powerhouse. Your stability, practicality, and quiet determination form an unbreakable foundation. You build things that endure - careers, relationships, legacies. The material world is your domain, and you navigate it with remarkable skill and patience.`;
        break;
      case 'Air':
        title = 'Brilliant Catalyst';
        tagline = 'Mind in motion, ideas in flight.';
        description = `With your Sun in ${sun}, Moon in ${moon}, and Rising in ${rising}, you are a triple Air intellect. Your mind is your greatest asset, constantly processing, connecting, and innovating. You live in the realm of ideas and communication, inspiring others with your vision and perspective. Social connections and intellectual exchange are the air you breathe.`;
        break;
      case 'Water':
        title = 'Deep Empath';
        tagline = 'Feeling everything, understanding all.';
        description = `With your Sun in ${sun}, Moon in ${moon}, and Rising in ${rising}, you are a triple Water soul. Your emotional depth is extraordinary, giving you an almost psychic ability to understand others. You navigate life through intuition and feeling, creating profound connections wherever you go. Your empathy is your superpower, though you must protect your sensitive spirit.`;
        break;
    }
  }
  // Two of one element + one of another
  else if (dominantElement[1] === 2) {
    const major = dominantElement[0];
    const minor = Object.entries(elementCount).find(([, count]) => count === 1)?.[0] || '';

    const combos: Record<string, { title: string; tagline: string }> = {
      'Fire+Earth': { title: 'Volcanic Achiever', tagline: 'Passion meets persistence.' },
      'Fire+Air': { title: 'Radiant Visionary', tagline: 'Sparking ideas into reality.' },
      'Fire+Water': { title: 'Steam Engine', tagline: 'Emotional intensity fuels ambition.' },
      'Earth+Fire': { title: 'Steady Flame', tagline: 'Grounded passion that endures.' },
      'Earth+Air': { title: 'Pragmatic Innovator', tagline: 'Building tomorrow, today.' },
      'Earth+Water': { title: 'Fertile Ground', tagline: 'Deep roots, abundant growth.' },
      'Air+Fire': { title: 'Spark of Genius', tagline: 'Brilliant ideas, bold execution.' },
      'Air+Earth': { title: 'Architect of Ideas', tagline: 'Designing the future with precision.' },
      'Air+Water': { title: 'Intuitive Intellectual', tagline: 'Where logic meets intuition.' },
      'Water+Fire': { title: 'Passionate Healer', tagline: 'Transforming pain into power.' },
      'Water+Earth': { title: 'Nurturing Builder', tagline: 'Creating with heart and hands.' },
      'Water+Air': { title: 'Empathic Communicator', tagline: 'Bridging hearts and minds.' },
    };

    const key = `${major}+${minor}`;
    const combo = combos[key] || { title: 'Cosmic Blend', tagline: 'A unique elemental harmony.' };
    title = combo.title;
    tagline = combo.tagline;
    description = `Your Sun in ${sun} and ${major === signContent[sun]?.element ? (major === signContent[moon]?.element ? 'Moon in ' + moon : 'Rising in ' + rising) : (major === signContent[moon]?.element ? 'Moon in ' + moon : 'Rising in ' + rising)} share the ${major} element, while your ${minor} placement in ${signContent[sun]?.element === minor ? sun : signContent[moon]?.element === minor ? moon : rising} adds a complementary dimension. The dominant ${major} energy gives you ${major === 'Fire' ? 'passion and drive' : major === 'Earth' ? 'stability and pragmatism' : major === 'Air' ? 'intellectual agility and social grace' : 'emotional depth and intuition'}, while the ${minor} influence brings ${minor === 'Fire' ? 'spark and motivation' : minor === 'Earth' ? 'grounding and practicality' : minor === 'Air' ? 'mental clarity and communication skills' : 'sensitivity and emotional intelligence'}.`;
  }
  // All different elements (one element has 0)
  else {
    // Three different elements
    const presentElements = Object.entries(elementCount)
      .filter(([, count]) => count > 0)
      .map(([el]) => el);
    const missingElement = Object.entries(elementCount)
      .find(([, count]) => count === 0)?.[0] || '';

    const triCombos: Record<string, { title: string; tagline: string }> = {
      'Fire+Earth+Air': { title: 'Dynamic Architect', tagline: 'Vision, action, and structure in one.' },
      'Fire+Earth+Water': { title: 'Alchemical Soul', tagline: 'Transforming raw materials into gold.' },
      'Fire+Air+Water': { title: 'Tempest Spirit', tagline: 'A storm of ideas, passion, and feeling.' },
      'Earth+Air+Water': { title: 'Wise Nurturer', tagline: 'Practical wisdom meets deep compassion.' },
    };

    const sortedElements = presentElements.sort();
    const triKey = sortedElements.join('+');
    const triCombo = triCombos[triKey] || { title: 'Cosmic Weaver', tagline: 'Threading multiple energies into one.' };
    title = triCombo.title;
    tagline = triCombo.tagline;
    description = `With your Sun in ${sun}, Moon in ${moon}, and Rising in ${rising}, you blend ${presentElements.join(', ')} energies into a richly textured personality. This diverse elemental mix makes you adaptable and multidimensional. You are missing ${missingElement} energy, which means you may benefit from seeking out ${missingElement === 'Fire' ? 'motivation and spontaneity' : missingElement === 'Earth' ? 'structure and routine' : missingElement === 'Air' ? 'intellectual stimulation and communication' : 'emotional connection and intuition'} in your environment and relationships.`;
  }

  // Refine with modality information
  if (dominantModality[1] === 3) {
    title += ' ' + (dominantModality[0] === 'Cardinal' ? 'Leader' : dominantModality[0] === 'Fixed' ? 'Powerhouse' : 'Shapeshifter');
    description += ` With all three placements in ${dominantModality[0]} signs, you have an intensified ${dominantModality[0] === 'Cardinal' ? 'drive to initiate and lead' : dominantModality[0] === 'Fixed' ? 'capacity for focus and determination' : 'ability to adapt and flow with change'}.`;
  } else if (dominantModality[1] === 2) {
    description += ` Your dominant ${dominantModality[0]} modality gives you ${dominantModality[0] === 'Cardinal' ? 'natural leadership abilities and the drive to start new ventures' : dominantModality[0] === 'Fixed' ? 'remarkable persistence and the power to see things through' : 'exceptional flexibility and the talent to navigate change gracefully'}.`;
  }

  return { title, tagline, description };
}
