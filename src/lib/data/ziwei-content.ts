// ===== Interfaces =====

export interface ZiWeiStarContent {
  name: string;
  chineseName: string;
  nature: string;
  element: string;
  keywords: string[];
  inLifePalace: string;
  inCareerPalace: string;
  inWealthPalace: string;
  general: string;
}

export interface ZiWeiPalaceContent {
  name: string;
  chineseName: string;
  theme: string;
  description: string;
}

export interface ZiWeiPatternContent {
  name: string;
  chineseName: string;
  description: string;
  meaning: string;
}

// ===== 14 Major Stars =====

export const starContent: Record<string, ZiWeiStarContent> = {
  'Zi Wei': {
    name: 'Zi Wei',
    chineseName: '紫微',
    nature: 'Auspicious',
    element: 'Earth',
    keywords: ['Leadership', 'Authority', 'Nobility', 'Dignity'],
    inLifePalace: 'You are born with a commanding presence and natural authority. People instinctively look to you for guidance and direction. You possess a regal quality that inspires confidence in others, and you carry yourself with quiet dignity even in difficult situations. Your sense of responsibility is profound, and you feel most fulfilled when serving a purpose greater than yourself.',
    inCareerPalace: 'You are destined for leadership roles and positions of significant responsibility. Whether in government, corporate management, or entrepreneurship, you naturally rise to the top through a combination of competence and charisma. You excel in roles that require decision-making and long-term strategic vision.',
    inWealthPalace: 'Your financial path is one of steady accumulation through legitimate and dignified means. You attract wealth through your reputation and the trust others place in you. Financial windfalls are possible through patronage or recognition from influential people.',
    general: 'The Emperor Star is the most noble of all stars in Zi Wei Dou Shu. It represents supreme authority, benevolence, and the mandate of heaven. Wherever it sits in the chart, it elevates and stabilizes that area of life.',
  },
  'Tian Ji': {
    name: 'Tian Ji',
    chineseName: '天机',
    nature: 'Auspicious',
    element: 'Wood',
    keywords: ['Intelligence', 'Strategy', 'Adaptability', 'Planning'],
    inLifePalace: 'You possess exceptional mental agility and a keen analytical mind. Your ability to read situations and adapt quickly makes you an excellent strategist. You are drawn to intellectual pursuits and enjoy solving complex problems. However, you may sometimes overthink and need to trust your instincts more.',
    inCareerPalace: 'Your career thrives in fields requiring intellect and planning: consulting, research, technology, education, or advisory roles. You excel at devising strategies and systems. You may change career paths multiple times as your restless mind seeks new challenges.',
    inWealthPalace: 'Wealth comes through your intelligence and multiple income streams. You are skilled at identifying financial opportunities before others see them. However, your tendency to overanalyze may sometimes cause you to miss the right timing for investments.',
    general: 'The Heavenly Secret Star represents wisdom, mental acuity, and the ability to discern hidden patterns. It governs intelligence, religious and spiritual inclination, and the capacity for strategic thinking. It brings adaptability but also restlessness.',
  },
  'Tai Yang': {
    name: 'Tai Yang',
    chineseName: '太阳',
    nature: 'Auspicious',
    element: 'Fire',
    keywords: ['Radiance', 'Generosity', 'Public Life', 'Father Figure'],
    inLifePalace: 'You radiate warmth and vitality like the sun itself. You are naturally generous, open-hearted, and drawn to public life. You feel compelled to give to others, sometimes to the point of self-sacrifice. Your personality lights up rooms and you attract a wide social circle effortlessly.',
    inCareerPalace: 'You excel in public-facing careers: politics, media, performing arts, public relations, or philanthropy. Your natural charisma and genuine concern for others make you an inspiring leader. Government service or public administration are also strongly favored.',
    inWealthPalace: 'You are generous with money and may find that the more you give, the more returns to you. Wealth comes through public ventures, reputation-based work, and the goodwill of others. Be mindful of being too generous or lending without clear terms.',
    general: 'The Sun Star embodies masculine, outgoing, radiant energy. It represents fame, public recognition, and the father or husband in a chart. Its strength depends on the time of birth: daytime births amplify its power, while nighttime births may reduce it.',
  },
  'Wu Qu': {
    name: 'Wu Qu',
    chineseName: '武曲',
    nature: 'Auspicious',
    element: 'Metal',
    keywords: ['Wealth', 'Determination', 'Discipline', 'Finance'],
    inLifePalace: 'You are principled, resolute, and possess a no-nonsense attitude toward life. Your character is forged like metal: strong, unyielding, and direct. You value efficiency and results over appearances. While you may seem stern, those close to you know your deep sense of loyalty and fairness.',
    inCareerPalace: 'Finance, banking, accounting, military, law enforcement, engineering, and any field requiring precision and discipline are your domain. You have a gift for turning chaos into order and generating tangible results. You may also succeed in martial arts or athletics.',
    inWealthPalace: 'This is one of the strongest wealth indicators in Zi Wei Dou Shu. Wu Qu in the Wealth Palace brings exceptional financial acumen and the ability to accumulate substantial wealth through discipline, hard work, and shrewd financial management.',
    general: 'The Wealth Warrior Star is the primary wealth star in Zi Wei Dou Shu. It represents financial capacity, determination, courage, and the martial spirit. It governs banking, precious metals, and all matters of tangible value.',
  },
  'Tian Tong': {
    name: 'Tian Tong',
    chineseName: '天同',
    nature: 'Auspicious',
    element: 'Water',
    keywords: ['Harmony', 'Comfort', 'Kindness', 'Blessings'],
    inLifePalace: 'You are blessed with a gentle, easygoing temperament that attracts goodwill from all directions. Your life tends toward comfort and you possess a natural gift for creating harmonious environments. You may appear carefree, but this belies a deep emotional intelligence.',
    inCareerPalace: 'You thrive in nurturing professions: counseling, hospitality, social work, the arts, or any field that values emotional intelligence and interpersonal harmony. You dislike high-pressure, cutthroat environments and perform best in supportive settings.',
    inWealthPalace: 'Money comes easily but may also leave easily due to your generous and comfort-loving nature. You are blessed with enough but must be mindful of overindulgence. Late-life wealth is strongly indicated, and you rarely face true financial hardship.',
    general: 'The Heavenly Unity Star is known as the Blessing Star, representing ease, comfort, and the good life. It brings a gentle, kind nature and indicates that life will generally be smooth. However, too much ease can lead to complacency if not balanced with ambition.',
  },
  'Lian Zhen': {
    name: 'Lian Zhen',
    chineseName: '廉贞',
    nature: 'Neutral',
    element: 'Fire',
    keywords: ['Complexity', 'Passion', 'Politics', 'Transformation'],
    inLifePalace: 'You are a deeply complex individual with intense emotions and a magnetic personality. You possess strong opinions and convictions, and your inner world is rich and sometimes turbulent. You are drawn to understanding the darker or hidden aspects of life and may undergo significant personal transformations.',
    inCareerPalace: 'You excel in fields requiring political acumen, complex negotiations, or transformative work: law, politics, psychology, investigative journalism, or reform-oriented roles. You thrive in environments where you can navigate complexity and drive meaningful change.',
    inWealthPalace: 'Wealth may come through complicated channels or require navigating complex situations. You may experience dramatic financial fluctuations but possess the resilience to recover. Speculative ventures carry both high risk and high reward for you.',
    general: 'The Purity and Integrity Star is one of the most complex stars in Zi Wei Dou Shu. It carries dual natures: at its best it represents righteousness and judicial authority; at its worst it can indicate legal troubles and emotional turmoil. It governs passion, politics, and transformation.',
  },
  'Tian Fu': {
    name: 'Tian Fu',
    chineseName: '天府',
    nature: 'Auspicious',
    element: 'Earth',
    keywords: ['Treasury', 'Stability', 'Conservation', 'Abundance'],
    inLifePalace: 'You embody stability, reliability, and a natural talent for managing resources. People trust you implicitly with responsibility because you radiate competence and calm. You are conservative in the best sense: preserving what is valuable while building steadily for the future.',
    inCareerPalace: 'Administration, asset management, real estate, logistics, agriculture, and any field requiring organizational talent and a steady hand are your strengths. You build institutions that endure and create systems that run smoothly for years.',
    inWealthPalace: 'The Celestial Treasury in the Wealth Palace is an excellent indicator of financial security. You are a natural saver and investor who builds wealth steadily over time. You rarely take foolish risks with money and have a talent for preserving family assets.',
    general: 'The Celestial Treasury Star is the counterpart to Zi Wei: while Zi Wei rules, Tian Fu manages and conserves. It represents the royal treasury, stability, abundance, and the capacity to store and protect resources. It is one of the most reliably positive stars.',
  },
  'Tai Yin': {
    name: 'Tai Yin',
    chineseName: '太阴',
    nature: 'Auspicious',
    element: 'Water',
    keywords: ['Intuition', 'Nurturing', 'Beauty', 'Mother Figure'],
    inLifePalace: 'You possess deep intuition, emotional sensitivity, and a refined aesthetic sense. Your inner world is rich and imaginative, and you connect with others on a profoundly empathetic level. You are drawn to beauty in all its forms and may have artistic or spiritual gifts.',
    inCareerPalace: 'Careers in the arts, design, beauty, fashion, real estate, hospitality, or any field valuing aesthetic sensitivity and emotional intelligence suit you well. You may also excel in nighttime or behind-the-scenes roles where your quiet influence is felt.',
    inWealthPalace: 'Wealth accumulates quietly and steadily, often through real estate, property, or aesthetically oriented businesses. You have excellent instincts for investments that appreciate over time. Nighttime births strengthen this stars wealth-generating power.',
    general: 'The Moon Star represents feminine, receptive, intuitive energy. It governs beauty, real estate, the mother or wife in a chart, and all things that grow quietly in the dark. Nighttime births greatly strengthen this star, while daytime births may weaken its influence.',
  },
  'Tan Lang': {
    name: 'Tan Lang',
    chineseName: '贪狼',
    nature: 'Neutral',
    element: 'Wood',
    keywords: ['Desire', 'Charisma', 'Romance', 'Versatility'],
    inLifePalace: 'You are blessed and cursed with immense desire and hunger for life experiences. You are charismatic, socially magnetic, and drawn to pleasure, romance, and adventure. Your versatility is remarkable, but you must guard against spreading yourself too thin or being led astray by temptation.',
    inCareerPalace: 'Entertainment, the arts, sales, marketing, hospitality, fashion, and any career requiring charisma and social skill are natural fits. You have a gift for knowing what people want and delivering it. The danger is pursuing too many interests without mastering any.',
    inWealthPalace: 'Money comes through social connections, entertainment, and your magnetic personality. You may experience feast-or-famine financial cycles due to your indulgent tendencies. Learning financial discipline transforms this star from a spender into a truly gifted earner.',
    general: 'The Greedy Wolf Star is the star of desire, romance, and peach blossom (romantic attraction). It brings versatility, social magnetism, and artistic talent, but also the risk of overindulgence. When properly channeled, it grants extraordinary success in entertainment and social fields.',
  },
  'Ju Men': {
    name: 'Ju Men',
    chineseName: '巨门',
    nature: 'Inauspicious',
    element: 'Water',
    keywords: ['Communication', 'Debate', 'Scrutiny', 'Hidden Depths'],
    inLifePalace: 'You possess a penetrating mind and an unrelenting drive to uncover truth. You are an excellent communicator with a talent for debate and analysis. However, you may sometimes be perceived as critical or argumentative. Your greatest strength is your refusal to accept surface appearances.',
    inCareerPalace: 'Law, journalism, research, academia, medicine, forensics, and any field requiring analytical communication and the ability to probe beneath surfaces are your domain. You are a natural debater and advocate who fights for what you believe is right.',
    inWealthPalace: 'Wealth comes through your communicative abilities and analytical skills: teaching, writing, consulting, or legal work. You may face disputes or complications around money that ultimately resolve through your persistence and sharp mind.',
    general: 'The Giant Gate Star represents the mouth: speech, debate, food, and all matters of oral communication. It often brings disputes and controversies but also the power of persuasion and the ability to uncover hidden truths. It tests through difficulty but rewards perseverance.',
  },
  'Tian Xiang': {
    name: 'Tian Xiang',
    chineseName: '天相',
    nature: 'Auspicious',
    element: 'Water',
    keywords: ['Service', 'Diplomacy', 'Assistance', 'Refinement'],
    inLifePalace: 'You are naturally diplomatic, service-oriented, and refined in manner. You possess an innate ability to mediate conflicts and bring people together. Your sense of fairness and desire to help others makes you beloved in your community. You are often the trusted advisor others turn to.',
    inCareerPalace: 'Government service, diplomacy, human resources, counseling, fashion, and advisory roles suit your talents. You excel as a second-in-command or chief-of-staff figure: the trusted advisor who makes the leader look good and keeps everything running smoothly.',
    inWealthPalace: 'Wealth comes through service and the patronage of others. You benefit from partnerships and collaborative ventures rather than solo pursuits. Your financial style is conservative and you are skilled at managing budgets and allocating resources wisely.',
    general: 'The Celestial Minister Star represents the prime minister or advisor to the emperor (Zi Wei). It governs service, clothing, appearance, and diplomatic relationships. It brings refinement, helpfulness, and the ability to smooth over difficulties through grace and tact.',
  },
  'Tian Liang': {
    name: 'Tian Liang',
    chineseName: '天梁',
    nature: 'Auspicious',
    element: 'Earth',
    keywords: ['Protection', 'Wisdom', 'Mentoring', 'Longevity'],
    inLifePalace: 'You are a natural mentor and protector, blessed with deep wisdom that often appears beyond your years. You possess an instinct for shielding others from harm and offering guidance at critical moments. You may face difficulties in your own life, but you consistently emerge stronger and wiser.',
    inCareerPalace: 'Medicine, law, social services, religious leadership, counseling, insurance, and elder care are fields where your protective and wise nature shines. You are the person who identifies risks before they manifest and guides others through crisis.',
    inWealthPalace: 'Wealth comes through wisdom-based professions and the gratitude of those you have helped. You may not accumulate great fortunes, but you rarely experience true poverty. Financial security comes through conservative management and the protection of higher forces.',
    general: 'The Heavenly Beam Star represents the shade-giving tree: it provides protection, shelter, and wise counsel. It is associated with longevity, overcoming disaster, and the ability to convert misfortune into blessing. It governs medicine, religion, and all matters of protection.',
  },
  'Qi Sha': {
    name: 'Qi Sha',
    chineseName: '七杀',
    nature: 'Inauspicious',
    element: 'Metal',
    keywords: ['Courage', 'Power', 'Ambition', 'Intensity'],
    inLifePalace: 'You are fiercely independent, intensely ambitious, and possess an indomitable will. You face life head-on with courage that borders on recklessness. Your path is rarely easy, but you are forged in fire and possess the resilience to overcome obstacles that would break others.',
    inCareerPalace: 'Military, law enforcement, surgery, competitive sports, entrepreneurship in challenging industries, and crisis management are natural fits. You thrive under pressure and in environments where boldness and decisive action determine success.',
    inWealthPalace: 'Wealth comes through bold action and willingness to take calculated risks. You may experience dramatic financial swings but have the courage to rebuild. Entrepreneurship and high-stakes ventures are your most likely path to significant wealth.',
    general: 'The Seven Killings Star is a powerful military star representing courage, authority through force, and the willingness to destroy in order to rebuild. It brings intensity, ambition, and the power to overcome great obstacles. It demands respect through strength rather than grace.',
  },
  'Po Jun': {
    name: 'Po Jun',
    chineseName: '破军',
    nature: 'Inauspicious',
    element: 'Water',
    keywords: ['Revolution', 'Destruction', 'Renewal', 'Pioneer'],
    inLifePalace: 'You are a natural revolutionary and disruptor who cannot tolerate stagnation or complacency. You possess tremendous energy for tearing down what does not work and building something better. Your life undergoes dramatic transformations, and you often reinvent yourself completely.',
    inCareerPalace: 'Innovation, technology disruption, reform leadership, demolition and construction, pioneering ventures, and any field requiring the courage to break new ground suit your nature. You are the person who launches into uncharted territory.',
    inWealthPalace: 'Your financial life is characterized by dramatic cycles of spending and earning. You are willing to invest everything in a vision and start from zero if necessary. Wealth comes through breakthrough innovations and the courage to abandon what is not working.',
    general: 'The Army Breaker Star represents destruction, revolution, and radical renewal. It is the most disruptive of the 14 major stars, bringing dramatic change wherever it appears. While challenging, it also grants the power of transformation and the courage to pioneer entirely new paths.',
  },
};

// ===== 12 Palaces =====

export const palaceContent: Record<string, ZiWeiPalaceContent> = {
  'Life Palace': {
    name: 'Life Palace',
    chineseName: '命宫',
    theme: 'Core Self and Destiny',
    description: 'The Life Palace is the most important palace in the entire Zi Wei chart. It reveals your fundamental character, innate temperament, physical appearance tendencies, and the overall trajectory of your life. The stars within this palace shape who you are at your deepest level and how you naturally respond to the world around you.',
  },
  'Siblings Palace': {
    name: 'Siblings Palace',
    chineseName: '兄弟宫',
    theme: 'Brothers, Sisters, and Close Peers',
    description: 'The Siblings Palace governs your relationships with brothers, sisters, and those who function as siblings in your life, such as close friends and business partners. It reveals the quality and number of these relationships and how they influence your journey.',
  },
  'Spouse Palace': {
    name: 'Spouse Palace',
    chineseName: '夫妻宫',
    theme: 'Marriage and Romantic Partnership',
    description: 'The Spouse Palace reveals the nature of your most significant romantic relationship. It indicates the character of your ideal partner, the dynamics of your marriage or primary partnership, timing of romantic milestones, and the overall quality of your love life.',
  },
  'Children Palace': {
    name: 'Children Palace',
    chineseName: '子女宫',
    theme: 'Offspring and Creative Expression',
    description: 'The Children Palace governs relationships with your children, your fertility, and also your creative and sexual expression. It reveals the number, character, and quality of your offspring, as well as your ability to bring new ideas and creations into the world.',
  },
  'Wealth Palace': {
    name: 'Wealth Palace',
    chineseName: '财帛宫',
    theme: 'Finances and Material Resources',
    description: 'The Wealth Palace is crucial for understanding your financial destiny. It reveals your earning capacity, spending habits, investment aptitude, and overall relationship with money. The stars here indicate whether wealth comes easily or through effort, and the best strategies for financial growth.',
  },
  'Health Palace': {
    name: 'Health Palace',
    chineseName: '疾厄宫',
    theme: 'Physical Constitution and Illness',
    description: 'The Health Palace reveals your physical constitution, health vulnerabilities, and areas requiring attention. It indicates which organs or body systems may be prone to issues and the general vitality level you were born with. Prevention and awareness are key themes of this palace.',
  },
  'Migration Palace': {
    name: 'Migration Palace',
    chineseName: '迁移宫',
    theme: 'Travel, Social Image, and External Fortune',
    description: 'The Migration Palace governs how the outside world perceives you and your fortune when away from home. It influences travel luck, social reputation, opportunities that come from external sources, and your ability to succeed in unfamiliar environments. It is directly opposite the Life Palace and reflects your public persona.',
  },
  'Friends Palace': {
    name: 'Friends Palace',
    chineseName: '交友宫',
    theme: 'Social Circle and Support Network',
    description: 'The Friends Palace reveals the quality and nature of your social circle, the kind of friends and colleagues you attract, and how well you are supported by your community. It also governs relationships with subordinates and employees.',
  },
  'Career Palace': {
    name: 'Career Palace',
    chineseName: '事业宫',
    theme: 'Profession and Life Achievement',
    description: 'The Career Palace reveals your professional destiny, ideal career path, work style, and the level of achievement you can attain. It indicates whether you are suited for employment, entrepreneurship, creative pursuits, or public service, and the specific fields where you will find the greatest success.',
  },
  'Property Palace': {
    name: 'Property Palace',
    chineseName: '田宅宫',
    theme: 'Real Estate and Living Environment',
    description: 'The Property Palace governs your relationship with real estate, your living environment, family assets, and ancestral inheritance. It indicates whether you will accumulate property, the quality of your home life, and your connection to your family of origin.',
  },
  'Fortune Palace': {
    name: 'Fortune Palace',
    chineseName: '福德宫',
    theme: 'Spiritual Wellbeing and Inner Peace',
    description: 'The Fortune Palace reveals your inner emotional and spiritual life. It governs mental health, happiness, capacity for enjoyment, spiritual inclination, and overall sense of fulfillment. A strong Fortune Palace indicates deep contentment regardless of external circumstances.',
  },
  'Parents Palace': {
    name: 'Parents Palace',
    chineseName: '父母宫',
    theme: 'Parental Influence and Heritage',
    description: 'The Parents Palace reveals the nature of your relationship with your parents, the quality of your upbringing, and the inherited gifts or challenges passed down through your family line. It also governs relationships with authority figures, teachers, and mentors.',
  },
};

// ===== Patterns =====

export const patternContent: Record<string, ZiWeiPatternContent> = {
  'Ke Quan Lu': {
    name: 'Ke Quan Lu',
    chineseName: '科权禄',
    description: 'The Triple Excellence pattern brings together the three transformative influences: Scholarly Fame (Ke), Authority and Power (Quan), and Prosperity (Lu). When these forces converge in a chart, they create a rare and powerful alignment.',
    meaning: 'You are blessed with the rare combination of intellectual distinction, natural authority, and material abundance. This pattern indicates that your knowledge and expertise will be recognized, giving you influence and power, which in turn attracts wealth and prosperity. Success comes through the virtuous cycle of learning, leading, and earning. Those with this pattern often become influential figures in their fields, respected both for their wisdom and their accomplishments.',
  },
  'Zi Wei Sitting Life': {
    name: 'Zi Wei Sitting Life',
    chineseName: '紫微坐命',
    description: 'The Emperor Star occupies the throne of the Life Palace, the most commanding position in the entire chart. This is the mark of a born leader.',
    meaning: 'With the Purple Star directly in your Life Palace, you carry an unmistakable aura of authority and nobility. People naturally defer to your judgment and seek your guidance. You are destined for positions of leadership and significant responsibility. Your path in life is one of steady ascension, and you attract respect and loyalty from those around you. The key to fulfilling this pattern is embracing your role as a leader while maintaining humility and genuine concern for those you lead.',
  },
  'Sun Moon Together': {
    name: 'Sun Moon Together',
    chineseName: '日月同宫',
    description: 'The Sun and Moon appear together or in direct opposition, creating a rare balance of masculine and feminine cosmic energies within the chart.',
    meaning: 'This pattern grants you extraordinary emotional depth combined with outward brilliance. You possess both the warmth and generosity of the Sun and the intuition and sensitivity of the Moon. You can be both a dynamic public figure and a deeply empathetic private person. Relationships and family life are especially important to you, and you have the ability to nurture others while still pursuing ambitious goals. This pattern often appears in the charts of people who bridge different worlds or cultures.',
  },
  'Fu Xing Gong Zhao': {
    name: 'Fu Xing Gong Zhao',
    chineseName: '福星拱照',
    description: 'Blessing Stars illuminate your chart from supporting positions, creating a canopy of good fortune that shields you from harm and attracts benefactors.',
    meaning: 'Throughout your life, you will find that help arrives just when you need it most. Benefactors, mentors, and lucky breaks appear at critical junctures, smoothing your path and opening doors that would otherwise remain closed. This pattern does not guarantee an effortless life, but it ensures that you never face your greatest challenges alone. Cultivating gratitude and paying forward the kindness you receive amplifies this patterns power enormously.',
  },
  'Wu Qu Sitting Wealth': {
    name: 'Wu Qu Sitting Wealth',
    chineseName: '武曲坐财',
    description: 'The Wealth Warrior star occupies the Wealth Palace directly, creating one of the most powerful financial configurations in Zi Wei Dou Shu.',
    meaning: 'You possess exceptional financial talent and the discipline to build substantial wealth over your lifetime. Money is not merely a means to an end for you; you understand its power and treat its management as a craft to be mastered. You are drawn to finance, investment, and the creation of tangible value. This pattern favors conservative wealth building through expertise and hard work rather than speculation. With patience and discipline, you can achieve remarkable financial security.',
  },
  'Qi Sha Facing Life': {
    name: 'Qi Sha Facing Life',
    chineseName: '七杀朝斗',
    description: 'The Seven Killings star powerfully activates either the Life Palace or the Career Palace, infusing the chart with fierce martial energy and indomitable willpower.',
    meaning: 'Your life path is one of overcoming formidable obstacles through sheer force of will and courage. You are not given an easy road, but you are given the strength to walk an extraordinarily challenging one. This pattern produces leaders in high-stakes fields: military commanders, surgical pioneers, entrepreneurs who build empires from nothing. The key is channeling your intense energy constructively and learning when strategic retreat serves you better than frontal assault.',
  },
  'Tian Fu Sitting Life': {
    name: 'Tian Fu Sitting Life',
    chineseName: '天府坐命',
    description: 'The Celestial Treasury Star occupies the Life Palace, grounding your entire destiny in stability, abundance, and the careful management of resources.',
    meaning: 'You are the person others turn to when they need someone reliable, competent, and trustworthy. Your life is characterized by steady accumulation rather than dramatic swings. You build things that last: relationships, institutions, financial portfolios, and legacies. This pattern indicates a comfortable and secure life, with the wisdom to preserve what you have while continuing to grow. You are a natural steward of resources, whether material, human, or cultural.',
  },
  'Ji Xing Jia Ge': {
    name: 'Ji Xing Jia Ge',
    chineseName: '吉星夹格',
    description: 'Auspicious stars flank key palaces on both sides, creating a protective bracket formation that amplifies good fortune and shields against misfortune.',
    meaning: 'Your chart features a powerful protective formation where beneficial stars surround your most important palaces. This creates a buffer zone of positive energy that softens difficulties and amplifies opportunities. You may not always realize how much invisible support surrounds you, but looking back on your life, you will notice a pattern of narrow escapes, timely rescues, and fortunate coincidences. This pattern works best when you maintain a positive attitude and remain open to help from unexpected sources.',
  },
  'Tan Lang Facing Peach Blossom': {
    name: 'Tan Lang Facing Peach Blossom',
    chineseName: '贪狼桃花',
    description: 'Tan Lang activates the peach blossom (romantic attraction) energy in the chart, creating powerful charisma and social magnetism that draws others irresistibly.',
    meaning: 'You possess extraordinary social magnetism and romantic appeal. People are drawn to your vitality, charm, and zest for life. This pattern brings a rich social life, numerous romantic opportunities, and natural talent in the arts, entertainment, or any field requiring personal charisma. The challenge is managing the abundance of attention and desire this pattern attracts without losing yourself in superficial pleasures. When channeled wisely, this energy fuels artistic brilliance and deeply fulfilling relationships.',
  },
  'Ming Li Shuang Shou': {
    name: 'Ming Li Shuang Shou',
    chineseName: '名利双收',
    description: 'Beneficial stars align across the Life, Career, and Wealth palaces simultaneously, creating a triple pillar of success that supports both fame and fortune.',
    meaning: 'You are positioned to achieve both recognition and material reward in your lifetime. Unlike patterns that favor one over the other, this configuration ensures that your talents are both noticed and compensated. Fame and fortune arrive together, each reinforcing the other. Your reputation attracts wealth, and your success enhances your reputation. The key to maximizing this pattern is choosing a path that genuinely aligns with your values, as authenticity is the foundation upon which lasting fame and fortune are built.',
  },
};
