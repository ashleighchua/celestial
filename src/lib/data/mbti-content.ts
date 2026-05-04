export interface MBTITypeContent {
  type: string;
  title: string;
  emoji: string;
  motto: string;
  overview: string;
  strengths: string;
  weaknesses: string;
  career: string;
  relationships: string;
  socialStyle: string;
  famousPeople: string[];
}

export const mbtiContent: Record<string, MBTITypeContent> = {
  ISTJ: {
    type: 'ISTJ',
    title: 'The Inspector',
    emoji: '\uD83D\uDCCB',
    motto: 'Duty is the essence of character.',
    overview:
      'ISTJs are dependable, thorough, and systematic individuals who take their responsibilities very seriously. They value tradition, loyalty, and a strong sense of duty, often serving as the backbone of organizations and families alike.\n\nWith a keen eye for detail and a preference for established procedures, ISTJs excel at creating order out of chaos. They are practical thinkers who prefer facts over speculation and action over idle talk.\n\nThough they may appear reserved on the surface, ISTJs have a deep commitment to the people and institutions they care about, and they express their love through consistent, reliable action rather than grand gestures.',
    strengths:
      'ISTJs are incredibly responsible and can always be counted on to follow through. They have an excellent memory for facts and details, are highly organized, and bring stability to any environment. Their patience and perseverance mean they rarely give up on a task once they have committed to it.',
    weaknesses:
      'ISTJs can be rigid and resistant to change, sometimes insisting on doing things "the way they have always been done." They may struggle to express emotions openly and can come across as cold or judgmental. Their adherence to rules can make them inflexible when circumstances call for creative solutions.',
    career:
      'ISTJs thrive in structured environments with clear expectations. They excel as accountants, auditors, project managers, military officers, judges, financial analysts, and systems administrators. Any career that rewards precision, reliability, and thoroughness is a natural fit.',
    relationships:
      'In relationships, ISTJs are loyal, faithful, and deeply committed partners. They show love through acts of service and keeping their promises. They value stability and may need encouragement to express their emotions verbally. Once they commit, they are in it for the long haul.',
    socialStyle:
      'ISTJs prefer small, familiar social circles over large gatherings. They are respectful and polite but reserved with strangers. They value traditions and enjoy spending time with close friends and family in structured, familiar settings.',
    famousPeople: ['George Washington', 'Queen Elizabeth II', 'Warren Buffett', 'Natalie Portman', 'Denzel Washington'],
  },

  ISFJ: {
    type: 'ISFJ',
    title: 'The Protector',
    emoji: '\uD83D\uDEE1\uFE0F',
    motto: 'To serve and protect those I love is my greatest purpose.',
    overview:
      'ISFJs are warm, caring, and dedicated individuals with a strong desire to help others and maintain harmony. They are among the most altruistic personality types, often putting the needs of others before their own.\n\nWith a remarkable memory for personal details about the people they care for, ISFJs make others feel truly seen and valued. They are practical nurturers who show their love through concrete actions and thoughtful gestures.\n\nDespite their gentle nature, ISFJs possess a quiet inner strength and determination. They may avoid the spotlight, but their behind-the-scenes contributions are the glue that holds many groups and families together.',
    strengths:
      'ISFJs are exceptionally supportive, patient, and observant. They have an incredible ability to remember specific details about people and use this knowledge to care for others. They are reliable, hardworking, and bring warmth and stability to every environment they inhabit.',
    weaknesses:
      'ISFJs often neglect their own needs while caring for others, leading to burnout. They may avoid conflict to the point of allowing problems to fester. They can be overly self-sacrificing and may struggle to set healthy boundaries or accept help when they need it.',
    career:
      'ISFJs flourish in roles that allow them to help others directly. They make excellent nurses, teachers, social workers, counselors, librarians, human resources specialists, and healthcare administrators. They bring compassion and dependability to any helping profession.',
    relationships:
      'In relationships, ISFJs are devoted, attentive, and deeply invested in their partner\'s happiness. They remember anniversaries, preferences, and little details that make their partners feel loved. They seek long-term commitment and need to feel appreciated for their efforts.',
    socialStyle:
      'ISFJs are warm and approachable but prefer one-on-one or small group interactions. They are excellent listeners and make others feel comfortable. They enjoy hosting and caring for guests in familiar, cozy settings rather than attending large public events.',
    famousPeople: ['Mother Teresa', 'Beyonce', 'Kate Middleton', 'Anne Hathaway', 'Vin Diesel'],
  },

  INFJ: {
    type: 'INFJ',
    title: 'The Advocate',
    emoji: '\uD83E\uDDDE',
    motto: 'I see the world not as it is, but as it should be.',
    overview:
      'INFJs are the rarest personality type, known for their deep insight, idealism, and quiet determination. They possess an almost uncanny ability to understand human motivations and emotions, often sensing things about people that others miss entirely.\n\nDriven by a powerful inner vision of how the world could be better, INFJs are natural advocates for causes they believe in. They combine creativity with conviction, using their gifts to inspire positive change and help others reach their potential.\n\nBeneath their calm exterior lies a complex and rich inner world. INFJs often feel like they are different from those around them, and they seek deep, meaningful connections rather than superficial social interactions.',
    strengths:
      'INFJs are profoundly insightful, creative, and principled. They have a rare ability to understand complex emotional dynamics and motivate others toward growth. They are determined, passionate about their values, and capable of inspiring remarkable change through their vision and dedication.',
    weaknesses:
      'INFJs can be perfectionistic and overly idealistic, becoming disappointed when reality falls short of their vision. They may withdraw when overwhelmed and can be prone to burnout from absorbing others\' emotions. Their private nature can make them difficult to truly know.',
    career:
      'INFJs are drawn to careers that align with their values and allow them to make a meaningful difference. They excel as psychologists, counselors, writers, nonprofit directors, professors, and creative directors. They need work that feels purposeful and allows for deep, creative thinking.',
    relationships:
      'In relationships, INFJs seek deep, soulful connections. They are devoted and insightful partners who intuitively understand their loved ones\' needs. They crave emotional intimacy and authenticity, and they are willing to invest tremendous energy into nurturing meaningful bonds.',
    socialStyle:
      'INFJs are selectively social, preferring deep conversations over small talk. They can appear outgoing in familiar settings but need significant alone time to recharge. They form deep bonds with a small number of people and are fiercely loyal to their inner circle.',
    famousPeople: ['Martin Luther King Jr.', 'Nelson Mandela', 'Lady Gaga', 'Taylor Swift', 'Cate Blanchett'],
  },

  INTJ: {
    type: 'INTJ',
    title: 'The Architect',
    emoji: '\uD83C\uDFD7\uFE0F',
    motto: 'I have a plan, and the plan is always improving.',
    overview:
      'INTJs are strategic, independent thinkers who approach life with a grand vision and the determination to make it reality. They are among the most intellectually driven personality types, constantly seeking to improve systems, ideas, and themselves.\n\nWith a natural talent for seeing the big picture and identifying inefficiencies, INTJs excel at designing elegant solutions to complex problems. They trust their own judgment and are not easily swayed by popular opinion or social pressure.\n\nBehind their confident, sometimes intimidating exterior, INTJs are deeply passionate about the things that matter to them. They may have a small circle of trusted individuals, but within that circle, they are surprisingly caring and fiercely loyal.',
    strengths:
      'INTJs are brilliant strategists with exceptional analytical abilities. They are self-confident, decisive, and determined to achieve their goals. Their independent thinking allows them to see solutions others miss, and their high standards drive them to produce work of outstanding quality.',
    weaknesses:
      'INTJs can be arrogant, dismissive of others\' ideas, and overly critical. They may struggle with emotional expression and can come across as cold or insensitive. Their relentless pursuit of efficiency can make them impatient with those they perceive as less competent.',
    career:
      'INTJs thrive in roles that challenge their intellect and allow for strategic thinking. They excel as scientists, engineers, software architects, investment strategists, management consultants, and professors. They need autonomy and the freedom to implement their vision.',
    relationships:
      'In relationships, INTJs are loyal, honest, and deeply committed once they find a worthy partner. They value intellectual compatibility and need a partner who can engage in stimulating conversation. They show love through thoughtful problem-solving and long-term planning.',
    socialStyle:
      'INTJs are highly selective about their social interactions and prefer meaningful dialogue over casual chitchat. They are comfortable spending time alone and choose quality over quantity in their friendships. They respect competence and are drawn to intellectually stimulating people.',
    famousPeople: ['Elon Musk', 'Friedrich Nietzsche', 'Michelle Obama', 'Christopher Nolan', 'Jodie Foster'],
  },

  ISTP: {
    type: 'ISTP',
    title: 'The Virtuoso',
    emoji: '\uD83D\uDD27',
    motto: 'I figure things out by taking them apart.',
    overview:
      'ISTPs are hands-on problem solvers with an innate understanding of how things work. They are curious, adaptable, and remarkably skilled at working with tools, machines, and physical systems. Their approach to life is practical and grounded in the present moment.\n\nWith a quiet confidence and a knack for staying cool under pressure, ISTPs are natural troubleshooters. They prefer to observe and analyze before acting, but when they do act, their responses are precise, efficient, and effective.\n\nISTPs value their independence highly and resist being boxed in by rules or schedules. They live life on their own terms, seeking new experiences and enjoying the thrill of mastering practical skills.',
    strengths:
      'ISTPs are resourceful, adaptable, and remarkably calm in crisis situations. They have excellent mechanical and spatial reasoning, learn quickly through hands-on experience, and are masters of efficiency. Their logical thinking and practical skills make them invaluable problem solvers.',
    weaknesses:
      'ISTPs can be emotionally detached and struggle to express their feelings. They may become bored easily and abandon projects that lose their novelty. Their strong need for independence can make them seem aloof or uncommitted, and they may resist long-term planning.',
    career:
      'ISTPs excel in careers that combine technical skill with hands-on work. They make outstanding engineers, mechanics, surgeons, forensic scientists, pilots, and emergency responders. They thrive in environments where they can troubleshoot real problems with tangible results.',
    relationships:
      'In relationships, ISTPs are easygoing and adventurous partners who show love through actions rather than words. They value personal space and need a partner who respects their independence. They are loyal and supportive but may need to work on emotional communication.',
    socialStyle:
      'ISTPs are quiet and reserved in social settings, preferring to observe rather than lead conversations. They connect best through shared activities and hands-on experiences rather than emotional discussions. They are loyal friends who value authenticity and straightforwardness.',
    famousPeople: ['Bruce Lee', 'Clint Eastwood', 'Amelia Earhart', 'Michael Jordan', 'Scarlett Johansson'],
  },

  ISFP: {
    type: 'ISFP',
    title: 'The Adventurer',
    emoji: '\uD83C\uDFA8',
    motto: 'I create beauty from what I feel inside.',
    overview:
      'ISFPs are gentle, sensitive souls with a deep appreciation for beauty, nature, and authentic self-expression. They experience life through their senses and emotions, finding inspiration in the world around them and channeling it into creative expression.\n\nThough quiet and unassuming, ISFPs have a fierce inner passion and a strong set of personal values. They live in the moment, embracing life with a warmth and spontaneity that draws others to them naturally.\n\nISFPs resist being labeled or categorized and instead forge their own unique path. They express themselves most powerfully through their actions, their art, and the quiet compassion they extend to those around them.',
    strengths:
      'ISFPs are deeply empathetic, creative, and in tune with their senses. They have a natural artistic talent and a gift for living in the present moment. They are warm, caring, and fiercely loyal to their values, often standing up quietly but firmly for what they believe is right.',
    weaknesses:
      'ISFPs can be overly sensitive to criticism and may withdraw when hurt. They tend to avoid conflict and may suppress their own needs to keep the peace. Their preference for spontaneity can make long-term planning feel overwhelming, and they may struggle with structure.',
    career:
      'ISFPs thrive in careers that allow creative expression and align with their values. They excel as artists, musicians, photographers, interior designers, chefs, veterinarians, and massage therapists. They need work that engages their senses and feels personally meaningful.',
    relationships:
      'In relationships, ISFPs are warm, affectionate, and deeply devoted. They express love through thoughtful gestures, quality time, and shared experiences. They need a partner who appreciates their sensitivity and gives them space to be authentically themselves.',
    socialStyle:
      'ISFPs are quiet and gentle in social situations, preferring small intimate settings over large crowds. They are excellent listeners and make others feel accepted without judgment. They connect best through shared experiences, creative activities, and nature.',
    famousPeople: ['Bob Dylan', 'Marilyn Monroe', 'Prince', 'Lana Del Rey', 'Jimi Hendrix'],
  },

  INFP: {
    type: 'INFP',
    title: 'The Mediator',
    emoji: '\uD83E\uDD8B',
    motto: 'In a world where you can be anything, be kind.',
    overview:
      'INFPs are idealistic, empathetic dreamers with a profound inner emotional world. They are driven by a deep desire to understand themselves and the human condition, constantly seeking meaning and purpose in everything they do.\n\nWith a rich imagination and a gift for language and self-expression, INFPs are natural writers, artists, and storytellers. They see beauty and potential in everyone and everything, and they are tireless champions of individuality and authenticity.\n\nThough they may appear soft-spoken, INFPs possess a passionate inner fire. When their deeply held values are challenged, they can become surprisingly fierce advocates, standing up for what they believe with quiet but unwavering determination.',
    strengths:
      'INFPs are deeply empathetic, creative, and open-minded. They have an extraordinary ability to understand and feel others\' emotions. They are idealistic yet genuine, bringing a healing quality to their interactions. Their rich inner world fuels exceptional creativity and originality.',
    weaknesses:
      'INFPs can be overly idealistic, leading to disappointment with the imperfect real world. They may struggle with practical details and can be prone to procrastination. Their intense emotions can sometimes overwhelm them, and they may take criticism far too personally.',
    career:
      'INFPs are drawn to careers that allow them to express their creativity and make a positive impact. They excel as writers, counselors, psychologists, artists, musicians, librarians, and nonprofit workers. They need work that aligns with their personal values and allows creative freedom.',
    relationships:
      'In relationships, INFPs are romantic, devoted, and deeply caring. They seek a soulmate-level connection and invest tremendous emotional energy into their partnerships. They need a partner who understands their depth, respects their need for solitude, and shares their values.',
    socialStyle:
      'INFPs are selective and authentic in their social interactions. They dislike superficial conversation and prefer connecting on a deeper emotional or philosophical level. They may seem shy in large groups but can be wonderfully expressive and engaging with those they trust.',
    famousPeople: ['William Shakespeare', 'J.R.R. Tolkien', 'Princess Diana', 'Johnny Depp', 'Audrey Hepburn'],
  },

  INTP: {
    type: 'INTP',
    title: 'The Logician',
    emoji: '\uD83E\uDDE0',
    motto: 'The unexamined idea is not worth having.',
    overview:
      'INTPs are brilliant, unconventional thinkers who are driven by an insatiable curiosity about how the world works. They approach life as one giant puzzle to be solved, constantly analyzing, theorizing, and questioning assumptions others take for granted.\n\nWith a remarkable ability to see logical connections and identify inconsistencies, INTPs are natural philosophers, scientists, and innovators. They value intellectual honesty above almost everything else and will pursue truth wherever it leads.\n\nBeneath their analytical exterior, INTPs have a playful, even whimsical side. They delight in wordplay, thought experiments, and intellectual humor, and they come alive when exploring ideas with someone who can keep up with their rapid, abstract thinking.',
    strengths:
      'INTPs are exceptionally analytical, objective, and innovative. They have a natural ability to identify patterns and solve complex problems that stump others. They are open-minded, intellectually honest, and capable of extraordinary original thinking when given the freedom to explore.',
    weaknesses:
      'INTPs can overthink things to the point of paralysis, struggling to move from theory to action. They may be socially awkward, dismissive of emotional concerns, and prone to absent-mindedness. Their pursuit of logical perfection can make them overly critical and slow to decide.',
    career:
      'INTPs thrive in careers that challenge their intellect and allow independent thinking. They excel as researchers, software developers, mathematicians, philosophers, data scientists, and forensic analysts. They need work that stimulates their curiosity and rewards innovative thinking.',
    relationships:
      'In relationships, INTPs are loyal, honest, and surprisingly devoted once they open up. They show love through intellectual engagement and by solving problems for their partner. They need a patient partner who appreciates their quirks and gives them space to think.',
    socialStyle:
      'INTPs are introverted and selective about social interactions. They prefer deep, intellectually stimulating conversations to small talk and may seem distant until a topic interests them. They value friendships based on mutual respect and shared intellectual curiosity.',
    famousPeople: ['Albert Einstein', 'Bill Gates', 'Marie Curie', 'Tina Fey', 'Isaac Newton'],
  },

  ESTP: {
    type: 'ESTP',
    title: 'The Entrepreneur',
    emoji: '\uD83C\uDFAF',
    motto: 'Life is either a daring adventure or nothing at all.',
    overview:
      'ESTPs are bold, energetic, and action-oriented individuals who thrive on excitement and new experiences. They have an uncanny ability to read people and situations, allowing them to navigate social dynamics and seize opportunities with remarkable agility.\n\nLiving fully in the present moment, ESTPs are natural risk-takers who trust their instincts and prefer to learn by doing rather than theorizing. They bring infectious energy to everything they do and have a talent for making things happen.\n\nWith their charismatic personality and practical intelligence, ESTPs are natural leaders in high-pressure situations. They cut through complexity with common sense, think on their feet, and inspire others with their confidence and can-do attitude.',
    strengths:
      'ESTPs are bold, perceptive, and incredibly resourceful. They excel at thinking on their feet and adapting to rapidly changing situations. They are charismatic, persuasive, and have a natural ability to motivate others. Their practical intelligence allows them to find solutions others overlook.',
    weaknesses:
      'ESTPs can be impulsive, taking risks without fully considering consequences. They may grow bored with routine tasks and struggle with long-term planning. They can be insensitive to others\' feelings and may prioritize excitement over stability, leading to relationship challenges.',
    career:
      'ESTPs excel in fast-paced, high-stakes environments. They make outstanding entrepreneurs, salespeople, emergency medical technicians, detectives, stock traders, and athletes. They need careers that offer variety, action, and the freedom to take initiative.',
    relationships:
      'In relationships, ESTPs are fun, passionate, and adventurous partners. They show love through shared experiences and spontaneous gestures. They need a partner who can keep up with their active lifestyle and who does not try to restrict their need for freedom and excitement.',
    socialStyle:
      'ESTPs are natural social butterflies who thrive in lively environments. They are witty, charming, and skilled at working a room. They enjoy being at the center of the action and connect with others through humor, shared activities, and their infectious enthusiasm.',
    famousPeople: ['Ernest Hemingway', 'Madonna', 'Eddie Murphy', 'Jack Nicholson', 'Milla Jovovich'],
  },

  ESFP: {
    type: 'ESFP',
    title: 'The Entertainer',
    emoji: '\uD83C\uDFAD',
    motto: 'Every moment is a stage, and life is the performance.',
    overview:
      'ESFPs are vivacious, spontaneous, and enthusiastic individuals who bring joy and energy wherever they go. They are natural performers who love being around people and have an extraordinary ability to live fully in the present moment.\n\nWith a keen sense of aesthetics and a love of sensory experiences, ESFPs appreciate beauty in all its forms, from fashion and food to music and nature. They approach life as an adventure to be savored, not a problem to be solved.\n\nDespite their fun-loving exterior, ESFPs are genuinely caring and generous. They are often the first to notice when someone is struggling and will go out of their way to cheer them up with their warmth, humor, and infectious optimism.',
    strengths:
      'ESFPs are enthusiastic, warm, and extraordinarily observant of their surroundings. They have a natural talent for making others feel included and happy. They are adaptable, resourceful, and bring a unique ability to find joy in everyday moments. Their people skills are exceptional.',
    weaknesses:
      'ESFPs can be easily bored by routine and may struggle with long-term commitments or planning. They may avoid difficult conversations and can be overly sensitive to criticism. Their focus on immediate enjoyment can sometimes lead to neglecting future responsibilities.',
    career:
      'ESFPs thrive in careers that involve people and allow creative self-expression. They excel as event planners, performers, tour guides, flight attendants, interior decorators, and fitness instructors. They need work that is dynamic, social, and allows them to bring joy to others.',
    relationships:
      'In relationships, ESFPs are affectionate, generous, and fun-loving partners. They excel at creating memorable experiences and keeping the romance alive. They need a partner who appreciates their spontaneity and emotional expressiveness while helping them stay grounded.',
    socialStyle:
      'ESFPs are the life of the party, naturally drawing people in with their warmth and energy. They are inclusive, generous hosts and genuinely enjoy meeting new people. They thrive in vibrant social environments and have a gift for making everyone feel welcome.',
    famousPeople: ['Marilyn Monroe', 'Adele', 'Jamie Oliver', 'Will Smith', 'Miley Cyrus'],
  },

  ENFP: {
    type: 'ENFP',
    title: 'The Campaigner',
    emoji: '\uD83C\uDF1F',
    motto: 'Anything is possible if you believe hard enough.',
    overview:
      'ENFPs are enthusiastic, creative, and profoundly people-oriented individuals who see life as full of exciting possibilities. They are driven by a deep desire to understand themselves and others, and they approach the world with an infectious curiosity and warmth.\n\nWith their boundless imagination and gift for connecting seemingly unrelated ideas, ENFPs are natural innovators and visionaries. They are champions of individuality and creativity, inspiring others to embrace their authentic selves.\n\nENFPs have a rare combination of social charisma and emotional depth. They can light up a room with their energy while also being the person who asks the deep, meaningful questions that create genuine connection.',
    strengths:
      'ENFPs are imaginative, enthusiastic, and deeply empathetic. They have an extraordinary ability to inspire and motivate others. Their creativity and open-mindedness make them excellent brainstormers, and their genuine warmth creates deep, meaningful connections wherever they go.',
    weaknesses:
      'ENFPs can struggle with follow-through, starting many projects but finishing few. They may be overly people-pleasing and have difficulty saying no. Their idealism can lead to disappointment, and they may overthink their relationships and emotions to an exhausting degree.',
    career:
      'ENFPs flourish in careers that combine creativity with human connection. They excel as journalists, counselors, marketing creatives, teachers, entrepreneurs, and diplomats. They need work that offers variety, meaningful human interaction, and the freedom to innovate.',
    relationships:
      'In relationships, ENFPs are passionate, devoted, and endlessly curious about their partner. They bring excitement, depth, and warmth to their partnerships. They need a partner who can match their emotional intensity and share in their vision for a meaningful life together.',
    socialStyle:
      'ENFPs are charismatic and genuinely interested in people. They have a gift for making others feel special and understood. They enjoy large gatherings and intimate conversations equally and are known for their ability to connect with people from all walks of life.',
    famousPeople: ['Robin Williams', 'Robert Downey Jr.', 'Walt Disney', 'Ellen DeGeneres', 'Oscar Wilde'],
  },

  ENTP: {
    type: 'ENTP',
    title: 'The Debater',
    emoji: '\u2694\uFE0F',
    motto: 'There is always a better way, and I will find it.',
    overview:
      'ENTPs are quick-witted, inventive, and intellectually fearless individuals who thrive on challenging conventional thinking. They are natural devil\'s advocates who enjoy exploring ideas from every angle and are energized by intellectual sparring.\n\nWith their sharp minds and rapid-fire thinking, ENTPs are natural innovators who can see connections and possibilities that others miss entirely. They love nothing more than dismantling a flawed argument or finding an elegant solution to a problem everyone else thought was unsolvable.\n\nBeneath their provocative exterior, ENTPs are genuinely curious and open-minded. They do not argue to win but to understand, and they respect those who can challenge their thinking and hold their own in a battle of ideas.',
    strengths:
      'ENTPs are exceptionally quick thinkers, innovative, and adaptable. They have a natural gift for seeing possibilities and challenging the status quo. Their charisma and wit make them compelling communicators, and their intellectual courage drives them to explore ideas others fear to question.',
    weaknesses:
      'ENTPs can be argumentative, sometimes debating for sport rather than substance. They may struggle with follow-through and get bored once the creative challenge is over. They can be insensitive to others\' feelings and may become restless in routine environments.',
    career:
      'ENTPs thrive in careers that reward innovation and intellectual agility. They excel as entrepreneurs, lawyers, strategy consultants, product designers, venture capitalists, and creative directors. They need work that is constantly evolving and intellectually stimulating.',
    relationships:
      'In relationships, ENTPs are stimulating, playful, and intellectually engaging partners. They show love through witty banter, shared adventures, and by challenging their partner to grow. They need someone who can handle their directness and match their intellectual energy.',
    socialStyle:
      'ENTPs are socially confident and enjoy lively, fast-paced conversations. They are drawn to people who can challenge them intellectually and are not easily offended. They are often the instigators of interesting discussions and debates in social settings.',
    famousPeople: ['Thomas Edison', 'Mark Twain', 'Steve Jobs', 'Celine Dion', 'Tom Hanks'],
  },

  ESTJ: {
    type: 'ESTJ',
    title: 'The Executive',
    emoji: '\uD83D\uDC54',
    motto: 'If it needs to be done, it needs to be done right.',
    overview:
      'ESTJs are natural-born leaders who bring order, structure, and efficiency to every aspect of their lives. They are driven by a strong sense of duty and a commitment to upholding standards that benefit everyone in their community.\n\nWith their clear-headed thinking and decisive nature, ESTJs excel at organizing people and resources to achieve concrete results. They believe in hard work, tradition, and the value of doing things properly, and they lead by example.\n\nESTJs are direct communicators who value honesty and competence. They may not sugarcoat their feedback, but their intentions come from a genuine desire to help others succeed and to maintain the high standards they set for themselves.',
    strengths:
      'ESTJs are organized, dedicated, and excellent at managing people and projects. They have strong leadership skills, a clear sense of right and wrong, and the determination to see things through. They are dependable, honest, and exceptionally good at creating efficient systems.',
    weaknesses:
      'ESTJs can be stubborn, inflexible, and overly focused on rules and hierarchy. They may struggle to understand or accommodate emotions, both their own and others\'. Their directness can come across as bossy or insensitive, and they may resist unconventional approaches.',
    career:
      'ESTJs excel in leadership and management roles. They make outstanding business managers, military officers, judges, school administrators, financial officers, and operations directors. They thrive in structured environments where clear expectations and hard work are rewarded.',
    relationships:
      'In relationships, ESTJs are loyal, dependable, and committed to building a stable life together. They express love through providing for their family and creating structure and security. They need a partner who respects their work ethic and shares their commitment to shared goals.',
    socialStyle:
      'ESTJs are confident and outgoing in social settings. They enjoy organizing community events and bringing people together. They are direct in their communication and value relationships built on mutual respect, shared values, and honest interaction.',
    famousPeople: ['Sonia Sotomayor', 'Judge Judy', 'Henry Ford', 'Michelle Obama', 'Frank Sinatra'],
  },

  ESFJ: {
    type: 'ESFJ',
    title: 'The Consul',
    emoji: '\uD83E\uDD1D',
    motto: 'The greatest thing you will ever learn is to love and be loved in return.',
    overview:
      'ESFJs are warm, caring, and socially adept individuals who thrive on creating harmony and bringing people together. They are natural caretakers who pay close attention to the needs and feelings of those around them, often going above and beyond to ensure everyone feels included.\n\nWith their strong sense of duty and desire to be helpful, ESFJs are the glue that holds many families, friend groups, and organizations together. They remember birthdays, check in on friends, and organize the gatherings that create lasting memories.\n\nESFJs value tradition, community, and social connection. They find deep satisfaction in being appreciated for their contributions and are at their best when they can use their organizational skills and emotional intelligence to support the people they love.',
    strengths:
      'ESFJs are exceptionally caring, loyal, and socially skilled. They have an incredible ability to sense others\' needs and provide practical support. They are organized, responsible, and bring warmth and stability to their communities. Their generosity and attentiveness make them beloved by many.',
    weaknesses:
      'ESFJs can be overly concerned with others\' opinions and may people-please at the expense of their own needs. They may be hurt by criticism and can struggle with change that disrupts established routines. They sometimes become controlling in their desire to help others.',
    career:
      'ESFJs thrive in careers centered on helping and connecting with people. They excel as teachers, nurses, event coordinators, human resources managers, counselors, and customer service directors. They need work that allows them to make a tangible positive impact on others\' lives.',
    relationships:
      'In relationships, ESFJs are devoted, attentive, and deeply invested in their partner\'s well-being. They show love through acts of care, thoughtful gestures, and creating a warm home environment. They need a partner who expresses appreciation and reciprocates their devotion.',
    socialStyle:
      'ESFJs are naturally sociable and thrive in group settings. They are skilled at making introductions, remembering personal details, and ensuring everyone feels welcome. They enjoy hosting and are often the ones organizing social events, celebrations, and traditions.',
    famousPeople: ['Taylor Swift', 'Jennifer Garner', 'Ed Sheeran', 'Desmond Tutu', 'Sally Field'],
  },

  ENFJ: {
    type: 'ENFJ',
    title: 'The Protagonist',
    emoji: '\uD83C\uDF1E',
    motto: 'I see the light in you, even when you cannot see it yourself.',
    overview:
      'ENFJs are charismatic, empathetic leaders who are driven by a genuine desire to help others reach their full potential. They possess an extraordinary ability to inspire, motivate, and connect with people, often leaving a lasting positive impact on everyone they encounter.\n\nWith their natural understanding of human emotions and social dynamics, ENFJs are masterful communicators who can rally people around a shared vision. They lead with warmth and conviction, creating environments where others feel valued and empowered.\n\nENFJs care deeply about making the world a better place and are willing to invest tremendous energy into their relationships and causes. They often prioritize others\' growth and happiness, sometimes at the cost of their own well-being.',
    strengths:
      'ENFJs are inspiring, empathetic, and natural-born leaders. They have an exceptional ability to understand and motivate others. They are organized, articulate, and bring passion and warmth to everything they do. Their genuine care for others creates deep trust and loyalty.',
    weaknesses:
      'ENFJs can be overly self-sacrificing, neglecting their own needs to serve others. They may be too idealistic about people and become deeply hurt when others do not live up to their expectations. They can be overly sensitive to criticism and may struggle to set healthy boundaries.',
    career:
      'ENFJs excel in careers that allow them to inspire and develop others. They make outstanding teachers, life coaches, diplomats, nonprofit directors, human resources leaders, and public speakers. They need work that allows them to make a meaningful difference in people\'s lives.',
    relationships:
      'In relationships, ENFJs are passionate, devoted, and deeply attuned to their partner\'s needs. They invest wholeheartedly in their partnerships and are skilled at creating deep emotional connections. They need a partner who appreciates their intensity and reciprocates their emotional investment.',
    socialStyle:
      'ENFJs are magnetic in social settings, naturally drawing people to them with their warmth and genuine interest. They are exceptional listeners and skilled at facilitating meaningful connections between others. They thrive in social environments and are often natural community builders.',
    famousPeople: ['Barack Obama', 'Oprah Winfrey', 'Martin Luther King Jr.', 'Jennifer Lawrence', 'Ben Affleck'],
  },

  ENTJ: {
    type: 'ENTJ',
    title: 'The Commander',
    emoji: '\uD83D\uDC51',
    motto: 'I lead, therefore I am.',
    overview:
      'ENTJs are bold, ambitious, and strategic leaders who are driven to turn their vision into reality. They possess a rare combination of intellectual brilliance and the charisma to inspire others to follow them. When an ENTJ sets a goal, they will move mountains to achieve it.\n\nWith their natural talent for identifying inefficiencies and their determination to optimize everything, ENTJs are the architects of progress. They think in terms of systems, strategies, and long-term outcomes, always staying three steps ahead of the competition.\n\nBeneath their commanding presence, ENTJs care deeply about the people on their team. They push others hard because they see untapped potential, and their greatest satisfaction comes from helping others achieve things they never thought possible.',
    strengths:
      'ENTJs are decisive, strategic, and incredibly driven. They have natural leadership abilities and an exceptional talent for long-term planning. They are confident, articulate, and efficient, with an ability to inspire and organize others toward ambitious goals. Their determination is virtually unmatched.',
    weaknesses:
      'ENTJs can be domineering, impatient, and intolerant of perceived incompetence. They may struggle to handle emotions, both their own and others\', and can come across as cold or ruthless in their pursuit of efficiency. Their competitive nature can sometimes alienate those around them.',
    career:
      'ENTJs are born for leadership and excel in high-stakes environments. They make outstanding CEOs, entrepreneurs, management consultants, lawyers, military strategists, and political leaders. They need careers that offer challenge, authority, and the opportunity to build something significant.',
    relationships:
      'In relationships, ENTJs are loyal, ambitious, and deeply committed to building a successful partnership. They show love through shared goals, protection, and by pushing their partner to achieve their best. They need a partner who is strong, intellectually stimulating, and not intimidated by their intensity.',
    socialStyle:
      'ENTJs are confident and commanding in social settings. They naturally take charge of conversations and enjoy networking with driven, accomplished individuals. They are direct communicators who value efficiency and competence, and they respect those who can stand their ground.',
    famousPeople: ['Steve Jobs', 'Margaret Thatcher', 'Gordon Ramsay', 'Charlize Theron', 'Napoleon Bonaparte'],
  },
};
