export interface ZodiacAnimalContent {
  animal: string;
  emoji: string;
  title: string;
  overview: string;
  strengths: string;
  weaknesses: string;
  career: string;
  wealth: string;
  love: string;
  health: string;
  famous: string[];
}

export const zodiacContent: Record<string, ZodiacAnimalContent> = {
  Rat: {
    animal: 'Rat',
    emoji: '\uD83D\uDC00',
    title: 'The Resourceful Rat',
    overview:
      'Those born in the Year of the Rat are blessed with sharp instincts and remarkable adaptability. They possess a natural charm that draws people toward them, along with an innate ability to spot opportunities where others see only obstacles. Quick-witted and perceptive, Rats are the ultimate survivors who thrive in any environment they find themselves in.\n\nBeneath their sociable exterior lies a shrewd and calculating mind that is always several steps ahead. Rats are incredibly observant, picking up on subtle cues that others miss entirely. They value security and family above all else, and will work tirelessly to build a comfortable and prosperous life for their loved ones.',
    strengths:
      'Rats are exceptionally intelligent and resourceful, able to find creative solutions to the most complex problems. Their natural curiosity drives them to constantly learn and grow, making them well-rounded individuals with diverse knowledge. They possess excellent social skills and can navigate any social situation with ease, building valuable networks that serve them throughout life.',
    weaknesses:
      'Their desire for security can sometimes manifest as excessive caution or even hoarding tendencies. Rats may struggle with letting go of grudges and can become overly critical of those who fail to meet their high standards. They can also be somewhat secretive, preferring to keep their true feelings and plans hidden from even their closest friends.',
    career:
      'Rats excel in careers that require quick thinking and strategic planning. They make outstanding entrepreneurs, financial analysts, and writers due to their sharp minds and attention to detail. Their natural people skills also make them effective politicians, publicists, and managers who can inspire teams to achieve ambitious goals.',
    wealth:
      'With their keen eye for opportunity and natural thriftiness, Rats tend to accumulate wealth steadily over time. They are excellent at spotting profitable investments and rarely make impulsive financial decisions. However, their occasional indulgence in small luxuries can add up, so maintaining a budget is essential for long-term financial health.',
    love:
      'In romance, Rats are devoted and passionate partners who crave deep emotional connections. They are naturally charming and can be quite romantic when they feel secure in a relationship. However, they need partners who can match their intellectual depth and respect their need for occasional solitude and personal space.',
    health:
      'Rats generally enjoy good health but are prone to stress-related ailments due to their tendency to overthink and worry. Regular exercise and mindfulness practices are essential for maintaining their mental well-being. They should pay particular attention to their digestive system and nervous system, both of which are sensitive areas for this sign.',
    famous: ['William Shakespeare', 'George Washington', 'Katy Perry'],
  },

  Ox: {
    animal: 'Ox',
    emoji: '\uD83D\uDC02',
    title: 'The Steadfast Ox',
    overview:
      'The Ox is the embodiment of diligence, dependability, and quiet strength. People born under this sign approach life with unwavering determination and a methodical nature that ensures they see every task through to completion. They are the bedrock upon which great achievements are built, and their patience is virtually limitless when pursuing a worthy goal.\n\nDespite their reserved exterior, Oxen possess a rich inner world and deeply held values that guide every decision they make. They are fiercely loyal to family and tradition, and their word is their bond. An Ox may not be the loudest person in the room, but their steady presence commands respect from all who know them.',
    strengths:
      'Oxen are extraordinarily reliable and hardworking, often setting the standard for perseverance in their communities. They possess a natural integrity that earns them the trust and respect of everyone around them. Their practical, grounded approach to life means they rarely make reckless decisions, and their patience allows them to outlast any competition.',
    weaknesses:
      'Their stubbornness can be legendary, making it difficult for Oxen to adapt when circumstances require a change in approach. They may become overly rigid in their thinking and resistant to new ideas or unconventional methods. Their reserved nature can sometimes be mistaken for coldness, and they may struggle to express their emotions openly.',
    career:
      'Oxen thrive in careers that reward consistency, attention to detail, and long-term commitment. They are natural fits for fields like agriculture, engineering, real estate, and banking. Their methodical nature also makes them excellent surgeons, archaeologists, and military leaders who can execute complex plans with precision.',
    wealth:
      'Financial security is deeply important to the Ox, and they build wealth through steady, disciplined saving and conservative investments. They are not drawn to get-rich-quick schemes and prefer proven, reliable methods of growing their resources. Over time, their patience and discipline often result in substantial material comfort and security.',
    love:
      'In relationships, Oxen are profoundly loyal and devoted partners who express love through acts of service and unwavering support. They seek stable, long-term partnerships built on mutual respect and shared values. While they may not be the most outwardly romantic sign, their deep commitment and reliability make them some of the most cherished partners in the zodiac.',
    health:
      'Oxen tend to have strong constitutions but can neglect their health due to their workaholic tendencies. They should be mindful of overexertion and make time for rest and relaxation. Joint health and cardiovascular fitness are areas that deserve particular attention, especially as they age and continue to push themselves physically.',
    famous: ['Barack Obama', 'Vincent van Gogh', 'Walt Disney'],
  },

  Tiger: {
    animal: 'Tiger',
    emoji: '\uD83D\uDC05',
    title: 'The Courageous Tiger',
    overview:
      'Tigers are born leaders who command attention the moment they enter a room. Brave, competitive, and fiercely independent, they approach life with a confidence and intensity that is both inspiring and slightly intimidating. They are natural risk-takers who thrive on challenge and refuse to be confined by convention or the expectations of others.\n\nBeneath their bold exterior, Tigers possess a generous heart and a strong sense of justice that compels them to stand up for the underdog. They are passionately protective of those they love and will fight tirelessly against any form of injustice. Their magnetic personality and indomitable spirit make them some of the most unforgettable people you will ever meet.',
    strengths:
      'Tigers possess extraordinary courage and are willing to take bold action when others hesitate. Their natural charisma and confidence make them compelling leaders who can rally others around a shared vision. They are also deeply compassionate, often using their strength and influence to champion the causes of those who cannot fight for themselves.',
    weaknesses:
      'Their impulsive nature can lead Tigers into hasty decisions that they later regret. They can be restless and impatient, struggling with tasks that require prolonged attention to mundane details. Their need for independence and control can sometimes create friction in both personal and professional relationships.',
    career:
      'Tigers are drawn to careers that offer excitement, autonomy, and the opportunity to make a significant impact. They excel as entrepreneurs, explorers, military officers, and political leaders. Creative fields also suit them well, as their bold vision and willingness to break new ground can produce truly revolutionary work in art, film, or design.',
    wealth:
      'Tigers tend to have a feast-or-famine relationship with money, as their willingness to take risks can lead to both spectacular gains and significant losses. They are generous spenders who enjoy sharing their wealth with friends and family. Building a financial safety net and seeking conservative counsel for investments can help balance their adventurous financial instincts.',
    love:
      'In love, Tigers are passionate and intensely romantic, bringing excitement and spontaneity to their relationships. They need partners who can match their energy and respect their fierce independence. Trust is paramount for a Tiger, and once they commit to a relationship, they are devoted and protective partners who will move mountains for their loved ones.',
    health:
      'Tigers are naturally energetic and athletic, but their tendency to push themselves to extremes can lead to burnout and injuries. They benefit from activities that channel their energy constructively, such as martial arts, hiking, or competitive sports. Managing stress through adequate rest and avoiding overcommitment is crucial for their long-term well-being.',
    famous: ['Queen Elizabeth II', 'Tom Cruise', 'Lady Gaga'],
  },

  Rabbit: {
    animal: 'Rabbit',
    emoji: '\uD83D\uDC07',
    title: 'The Graceful Rabbit',
    overview:
      'Those born in the Year of the Rabbit are among the most refined and gentle souls in the Chinese zodiac. They possess an innate elegance and a deep appreciation for beauty, harmony, and the finer things in life. Rabbits move through the world with a quiet grace that belies their sharp intelligence and keen observational skills.\n\nRabbits are natural diplomats who excel at creating peace and harmony in their surroundings. They have an almost uncanny ability to sense the emotions of others and respond with empathy and tact. While they may appear soft-spoken and reserved, they possess a quiet inner strength and determination that should never be underestimated.',
    strengths:
      'Rabbits are blessed with exceptional taste, diplomacy, and emotional intelligence. They have a natural ability to create beautiful, harmonious environments and to bring out the best in the people around them. Their keen intuition and careful attention to detail make them excellent judges of character and situation alike.',
    weaknesses:
      'Their desire to avoid conflict can sometimes lead Rabbits to be overly accommodating or indecisive. They may struggle with confrontation and have difficulty asserting their own needs when they conflict with those of others. Their sensitivity, while a gift, can also make them vulnerable to anxiety and overthinking in stressful situations.',
    career:
      'Rabbits flourish in careers that allow them to utilize their creativity, diplomacy, and attention to detail. They make outstanding designers, counselors, diplomats, and writers. Their refined sensibilities also draw them to success in fashion, interior design, and the culinary arts, where their appreciation for beauty and quality can truly shine.',
    wealth:
      'Rabbits have a conservative approach to finances that typically serves them well over the long term. They prefer stable, low-risk investments and are skilled at finding good value without overspending. Their taste for luxury can occasionally test their budget, but their natural prudence usually keeps their finances in healthy balance.',
    love:
      'Rabbits are romantic and devoted partners who create warm, nurturing relationships built on mutual respect and emotional intimacy. They thrive in stable, harmonious partnerships where they feel safe to be vulnerable. A Rabbit in love is attentive, thoughtful, and deeply committed, often going to great lengths to ensure their partner feels cherished and secure.',
    health:
      'Rabbits tend to have sensitive constitutions and are particularly affected by their emotional environment. Stress and conflict can manifest as physical symptoms, so maintaining a peaceful lifestyle is essential for their health. Gentle exercises like yoga, tai chi, or swimming, combined with a balanced diet, help keep Rabbits in optimal condition.',
    famous: ['Albert Einstein', 'Angelina Jolie', 'Lionel Messi'],
  },

  Dragon: {
    animal: 'Dragon',
    emoji: '\uD83D\uDC09',
    title: 'The Mighty Dragon',
    overview:
      'The Dragon is the most powerful and auspicious sign in the Chinese zodiac, symbolizing strength, good fortune, and imperial authority. Those born in the Year of the Dragon are blessed with extraordinary vitality, ambition, and an almost magnetic charisma that naturally draws followers and admirers. They dream big and possess the courage and talent to turn those dreams into reality.\n\nDragons carry themselves with a regal confidence that sets them apart from the crowd. They are natural innovators who refuse to accept limitations and constantly push the boundaries of what is possible. Their enthusiasm is infectious, their energy seemingly boundless, and their vision for the future is always grand and inspiring.',
    strengths:
      'Dragons possess an unmatched combination of ambition, intelligence, and charisma that makes them natural leaders and visionaries. They are fearless in the face of challenges and have an extraordinary ability to inspire and motivate others. Their creative minds and bold approach to problem-solving often lead to breakthrough innovations and remarkable achievements.',
    weaknesses:
      'Their supreme confidence can sometimes cross the line into arrogance, making Dragons appear domineering or dismissive of others\' contributions. They can be perfectionists who set impossibly high standards for themselves and everyone around them. Their fiery temper and impatience with those who cannot keep up with their pace can strain relationships.',
    career:
      'Dragons are destined for leadership roles and thrive in positions that allow them to shape the future on a grand scale. They excel as CEOs, architects, judges, and film directors. Their combination of vision and charisma also makes them exceptionally successful politicians, inventors, and tech entrepreneurs who can change industries.',
    wealth:
      'Dragons are naturally fortunate in financial matters, often attracting wealth and opportunity through their bold ventures and magnetic personality. They are generous with their resources and enjoy the status that comes with material success. However, their tendency toward grand gestures and ambitious projects means they should ensure they maintain solid financial reserves.',
    love:
      'In romance, Dragons are passionate and exciting partners who bring intensity and adventure to their relationships. They need partners who are confident and independent enough to stand as equals rather than be overshadowed. When a Dragon finds their match, the relationship becomes an epic partnership fueled by mutual admiration, ambition, and deep loyalty.',
    health:
      'Dragons generally enjoy robust health thanks to their abundant energy and positive outlook on life. However, their tendency to overwork and take on too many commitments can lead to exhaustion and stress-related conditions. Regular exercise, adequate sleep, and learning to delegate responsibilities are essential for maintaining their legendary vitality.',
    famous: ['Bruce Lee', 'John Lennon', 'Rihanna'],
  },

  Snake: {
    animal: 'Snake',
    emoji: '\uD83D\uDC0D',
    title: 'The Wise Snake',
    overview:
      'The Snake is the most enigmatic and philosophical sign of the Chinese zodiac. Those born under this sign possess a deep, intuitive wisdom that allows them to perceive truths hidden from ordinary sight. Snakes move through life with a quiet elegance and deliberate grace, carefully observing the world around them before making their move.\n\nBeneath their calm and composed exterior lies a complex mind that is constantly analyzing, strategizing, and contemplating the deeper meanings of life. Snakes are drawn to mystery, beauty, and the pursuit of knowledge. They possess a natural sophistication and allure that makes them some of the most intriguing and memorable people in any gathering.',
    strengths:
      'Snakes possess exceptional intuition and analytical abilities that allow them to navigate complex situations with remarkable ease. They are naturally wise and often serve as trusted advisors to friends and colleagues. Their determination, once focused on a goal, is absolute, and they pursue their objectives with a patient persistence that ultimately prevails.',
    weaknesses:
      'Snakes can be overly suspicious and secretive, which may create barriers in their personal relationships. Their tendency toward jealousy and possessiveness can be particularly challenging in romantic partnerships. They may also become too comfortable in their routines, resisting necessary changes and missing opportunities that require quick, decisive action.',
    career:
      'Snakes excel in careers that require deep thinking, research, and strategic planning. They are naturally suited to roles as scientists, philosophers, psychologists, and investigators. Their refined aesthetic sense also draws them to success in fashion, jewelry design, and the fine arts, where their eye for beauty and quality produces exceptional work.',
    wealth:
      'Snakes are shrewd financial managers who rarely make careless money decisions. They have an excellent instinct for investments and tend to accumulate wealth quietly and steadily over time. Their taste for luxury is balanced by their natural prudence, though they occasionally indulge in high-quality items that bring them lasting pleasure.',
    love:
      'In matters of the heart, Snakes are deeply passionate and intensely devoted partners. They seek profound emotional and intellectual connections and are not interested in superficial relationships. A Snake in love is attentive and romantic, but they require complete trust and loyalty from their partner, as betrayal is something they neither forgive nor forget.',
    health:
      'Snakes need to be particularly mindful of their tendency to internalize stress, which can lead to anxiety and digestive issues. They benefit greatly from meditation, gentle exercise, and spending time in nature. Adequate rest is essential, as Snakes can push themselves mentally to the point of exhaustion without realizing they have overextended.',
    famous: ['Mahatma Gandhi', 'Pablo Picasso', 'Taylor Swift'],
  },

  Horse: {
    animal: 'Horse',
    emoji: '\uD83D\uDC0E',
    title: 'The Spirited Horse',
    overview:
      'Those born in the Year of the Horse are among the most energetic and free-spirited individuals in the Chinese zodiac. They possess an infectious enthusiasm for life and a restless desire for adventure that keeps them constantly in motion. Horses are natural entertainers whose warmth, humor, and vivacity light up every room they enter.\n\nFreedom is the lifeblood of the Horse, and they will resist any attempt to constrain or confine them. They are fiercely independent thinkers with strong opinions and the courage to express them freely. Despite their love of independence, Horses are deeply social creatures who form strong bonds and bring tremendous energy and joy to their relationships.',
    strengths:
      'Horses are blessed with boundless energy, quick minds, and a natural charm that makes them popular wherever they go. They are adaptable and resourceful, able to think on their feet and respond effectively to rapidly changing situations. Their positive attitude and genuine enthusiasm for life inspire those around them to embrace adventure and live more fully.',
    weaknesses:
      'Their restless nature can make Horses inconsistent, as they may lose interest in projects or relationships once the initial excitement fades. They can be impulsive in their decision-making, acting on emotion rather than careful analysis. Their need for freedom and stimulation can sometimes make them unreliable, as they may struggle with routine commitments.',
    career:
      'Horses thrive in dynamic careers that offer variety, travel, and the freedom to work independently. They excel as journalists, salespeople, tour guides, and athletes. Their natural charisma and communication skills also make them outstanding performers, public speakers, and marketing professionals who can captivate any audience.',
    wealth:
      'Horses tend to earn well thanks to their energy and versatility, but their impulsive spending habits can undermine their financial security. They enjoy spending on experiences and adventures rather than accumulating material possessions. Setting up automatic savings and working with a financial advisor can help Horses build the long-term security they need.',
    love:
      'Horses are passionate and exciting romantic partners who bring adventure and spontaneity to their relationships. They fall in love quickly and intensely, bringing their full energy and enthusiasm to the partnership. However, they need partners who understand their need for independence and can provide both excitement and a stable emotional anchor.',
    health:
      'Horses are naturally athletic and energetic, but their tendency to overdo everything can lead to physical exhaustion and injuries. They need to balance their active lifestyle with adequate rest and recovery time. Outdoor activities and team sports are excellent for maintaining both their physical fitness and their social well-being.',
    famous: ['Genghis Khan', 'Rembrandt', 'Paul McCartney'],
  },

  Goat: {
    animal: 'Goat',
    emoji: '\uD83D\uDC10',
    title: 'The Gentle Goat',
    overview:
      'The Goat, also known as the Sheep or Ram, is the most artistic and gentle soul in the Chinese zodiac. Those born under this sign possess a rich inner world filled with creativity, compassion, and a deep appreciation for beauty in all its forms. Goats are natural nurturers who create warmth and harmony wherever they go.\n\nDespite their gentle demeanor, Goats possess a quiet resilience and inner strength that sustains them through life\'s challenges. They are deeply empathetic individuals who feel the joys and sorrows of others as keenly as their own. Their artistic vision and emotional depth allow them to create beauty that touches the hearts of everyone who encounters it.',
    strengths:
      'Goats possess extraordinary creativity, compassion, and emotional intelligence that make them invaluable in both personal and professional settings. They have a natural eye for beauty and design that elevates everything they touch. Their gentle, nurturing nature creates safe spaces where others feel comfortable being vulnerable and authentic.',
    weaknesses:
      'Goats can be overly dependent on the approval and support of others, which may undermine their confidence and decision-making. They have a tendency toward pessimism and worry, especially when facing uncertainty or conflict. Their sensitive nature means they can be easily hurt by criticism, which may cause them to withdraw from situations where they need to be assertive.',
    career:
      'Goats flourish in creative and nurturing professions where their artistic vision and empathy can be fully expressed. They make exceptional artists, musicians, designers, florists, and childcare workers. Their compassionate nature also draws them to careers in social work, counseling, and veterinary medicine, where they can make a meaningful difference in the lives of others.',
    wealth:
      'Goats may experience fluctuations in their financial lives, as they prioritize experiences and beauty over strict financial planning. They benefit enormously from having a trustworthy financial partner or advisor who can help them manage their resources wisely. When supported by the right structures, Goats can achieve comfortable financial security through their creative talents.',
    love:
      'In love, Goats are tender, devoted, and deeply romantic partners who thrive in nurturing, supportive relationships. They seek partners who appreciate their sensitivity and provide the emotional security they need to flourish. A Goat in a loving relationship blossoms beautifully, pouring their considerable creative energy into building a warm and harmonious home life.',
    health:
      'Goats are sensitive to their environment and can be deeply affected by stress, negative energy, and harsh conditions. They need peaceful, beautiful surroundings to maintain their emotional and physical well-being. Gentle activities like gardening, painting, or walking in nature are particularly therapeutic, along with a consistent routine that provides stability.',
    famous: ['Michelangelo', 'Mark Twain', 'Julia Roberts'],
  },

  Monkey: {
    animal: 'Monkey',
    emoji: '\uD83D\uDC12',
    title: 'The Clever Monkey',
    overview:
      'The Monkey is the most intellectually curious and inventive sign of the Chinese zodiac. Those born in the Year of the Monkey possess a brilliant, agile mind that delights in solving puzzles, learning new skills, and finding creative shortcuts that others never thought possible. They are the eternal students of life, driven by an insatiable desire to understand how everything works.\n\nMonkeys are natural entertainers whose quick wit, playful humor, and infectious energy make them the life of any gathering. They possess a remarkable ability to read people and situations, adapting their approach with chameleon-like flexibility. Beneath their playful exterior lies a strategic mind capable of extraordinary cunning and impressive feats of intelligence.',
    strengths:
      'Monkeys are gifted with exceptional intelligence, versatility, and a creative problem-solving ability that borders on genius. They learn new skills with astonishing speed and can master complex subjects that baffle others. Their natural humor and charisma make them beloved companions, while their quick thinking allows them to navigate even the trickiest situations.',
    weaknesses:
      'Their restless intellect can make Monkeys easily bored, causing them to abandon projects before completion in pursuit of the next interesting challenge. They may use their considerable charm and intelligence to manipulate situations to their advantage, which can erode trust over time. Their mischievous nature and love of pranks may sometimes go too far.',
    career:
      'Monkeys excel in careers that challenge their intellect and offer constant variety and stimulation. They are natural fits for roles in technology, science, entertainment, and finance. Their versatility and quick learning ability also make them outstanding consultants, comedians, and entrepreneurs who can pivot quickly in rapidly changing markets.',
    wealth:
      'Monkeys are clever with money and often find innovative ways to increase their income. They enjoy taking calculated financial risks and have the analytical skills to make them pay off more often than not. However, their love of novelty can lead to impulse purchases, so establishing a savings discipline early in life is important for their long-term prosperity.',
    love:
      'In romance, Monkeys are charming, playful, and intellectually stimulating partners who keep relationships fresh and exciting. They need partners who can match their wit and keep them mentally engaged over the long term. When a Monkey truly commits to a relationship, they bring creativity, humor, and a surprising depth of loyalty that makes for an endlessly entertaining partnership.',
    health:
      'Monkeys tend to have good overall health thanks to their active minds and bodies, but their nervous energy can lead to stress and insomnia. They benefit from activities that engage both mind and body, such as rock climbing, dance, or martial arts. Maintaining a regular sleep schedule and limiting stimulants are important for keeping their sharp minds in peak condition.',
    famous: ['Leonardo da Vinci', 'Charles Dickens', 'Will Smith'],
  },

  Rooster: {
    animal: 'Rooster',
    emoji: '\uD83D\uDC13',
    title: 'The Elegant Rooster',
    overview:
      'The Rooster is the most observant and meticulous sign of the Chinese zodiac, known for their sharp eye, impeccable standards, and unwavering honesty. Those born under this sign carry themselves with a proud, distinctive style that reflects their inner confidence and attention to detail. Roosters are early risers in both the literal and figurative sense, always ahead of the curve and prepared for whatever comes.\n\nBeneath their polished exterior, Roosters possess a deeply principled and hardworking nature that drives everything they do. They believe in doing things right the first time and hold themselves and others to extraordinarily high standards. Their straightforward honesty and willingness to speak truth to power make them respected, if sometimes controversial, figures in their communities.',
    strengths:
      'Roosters are exceptionally organized, honest, and detail-oriented, qualities that make them invaluable in any endeavor. They possess a natural confidence and charisma that commands attention and respect. Their strong work ethic and perfectionist standards mean that anything they produce is of the highest quality, and their courage to speak the truth earns them deep trust.',
    weaknesses:
      'Their perfectionism can make Roosters overly critical and demanding, both of themselves and of others. They may come across as blunt or tactless in their honest assessments, unintentionally hurting the feelings of more sensitive souls. Their need for attention and admiration can sometimes manifest as vanity, and they may struggle to accept criticism gracefully.',
    career:
      'Roosters thrive in careers that reward precision, dedication, and attention to detail. They excel as accountants, dentists, surgeons, military officers, and quality control managers. Their confidence and presentation skills also make them outstanding performers, newsreaders, and public relations professionals who can represent any organization with distinction.',
    wealth:
      'Roosters are careful and strategic financial managers who track every expense and plan meticulously for the future. They are among the most financially disciplined signs in the zodiac, rarely making impulsive purchases. Their attention to detail in financial matters typically results in a comfortable and secure financial position built through consistent, careful management.',
    love:
      'In love, Roosters are loyal, devoted, and protective partners who take their relationship commitments very seriously. They express love through practical actions and by striving to create a well-organized, comfortable life for their family. They need partners who appreciate their honesty and dedication, and who can gently help them relax their exacting standards from time to time.',
    health:
      'Roosters tend to maintain good health through their disciplined lifestyle and attention to diet and exercise. However, their perfectionist tendencies can create internal stress and tension that may manifest as headaches or respiratory issues. Learning to relax and accept imperfection is an important health practice for Roosters, along with activities that promote mental calm.',
    famous: ['Beyonce', 'Serena Williams', 'Matthew McConaughey'],
  },

  Dog: {
    animal: 'Dog',
    emoji: '\uD83D\uDC15',
    title: 'The Loyal Dog',
    overview:
      'The Dog is the most loyal and righteous sign of the Chinese zodiac, embodying the virtues of faithfulness, honesty, and selfless devotion. Those born in the Year of the Dog possess an unwavering moral compass and a deep commitment to justice that guides every aspect of their lives. They are the true friends and steadfast companions that everyone hopes to find but few are fortunate enough to have.\n\nDogs approach the world with a combination of warmth and watchfulness, always ready to defend their loved ones and speak up against injustice. They are unpretentious, genuine people who value substance over style and deeds over words. Their reliability and integrity make them the cornerstone of their families and communities, the ones everyone turns to in times of need.',
    strengths:
      'Dogs possess an extraordinary sense of loyalty and justice that makes them among the most trustworthy people in the zodiac. They are honest, reliable, and selfless, always willing to put the needs of others before their own. Their strong moral character and protective instincts make them natural advocates for the vulnerable and champions of fairness.',
    weaknesses:
      'Their strong sense of right and wrong can make Dogs judgmental and unforgiving when they perceive moral failings in others. They are prone to worry and anxiety, often imagining worst-case scenarios that may never materialize. Their pessimistic tendencies and difficulty trusting new people can sometimes isolate them from opportunities for growth and connection.',
    career:
      'Dogs excel in careers that allow them to serve others and uphold justice. They make outstanding lawyers, judges, police officers, social workers, and nonprofit leaders. Their loyalty and reliability also make them valued team members in any organization, and their strong ethical standards are particularly needed in roles involving public trust and accountability.',
    wealth:
      'Dogs are not particularly motivated by money and tend to prioritize meaningful work over financial gain. They are honest and responsible with their finances, neither extravagant nor stingy. While they may not accumulate great wealth, their careful stewardship and avoidance of risky ventures typically ensure a stable and secure financial life.',
    love:
      'In romance, Dogs are among the most faithful and devoted partners in the entire zodiac. They seek deep, meaningful relationships built on mutual trust and shared values. Once committed, a Dog is a steadfast and supportive partner who will stand by their loved one through any hardship, asking only for honesty and loyalty in return.',
    health:
      'Dogs are susceptible to anxiety and stress-related health issues, as their worrying nature can take a significant toll on their well-being. Regular physical activity, especially outdoor exercise with companions, is essential for both their physical and emotional health. Developing mindfulness practices and learning to manage their tendency to worry can dramatically improve their quality of life.',
    famous: ['Winston Churchill', 'Mother Teresa', 'Michael Jackson'],
  },

  Pig: {
    animal: 'Pig',
    emoji: '\uD83D\uDC16',
    title: 'The Generous Pig',
    overview:
      'The Pig, the final sign of the Chinese zodiac cycle, is a symbol of generosity, compassion, and abundance. Those born in the Year of the Pig are blessed with a big heart, a warm spirit, and an optimistic outlook that sees the best in every person and situation. They are the peacemakers and the philanthropists, driven by a genuine desire to make the world a happier, more comfortable place for everyone.\n\nPigs approach life with a refreshing sincerity and lack of pretense that is rare in the modern world. They are honest, trusting, and deeply caring, with a natural ability to make others feel welcome and valued. Their love of the good things in life, from fine food to beautiful surroundings, reflects their appreciation for the richness of human experience.',
    strengths:
      'Pigs are blessed with exceptional generosity, compassion, and a genuine warmth that makes everyone around them feel valued and comfortable. They are honest and straightforward, with a refreshing lack of pretense that builds deep trust. Their optimistic nature and big-heartedness make them natural peacemakers who can heal rifts and bring people together.',
    weaknesses:
      'Their trusting nature can make Pigs vulnerable to deception and manipulation by less scrupulous individuals. They may be overly indulgent, whether in food, spending, or accommodating others at their own expense. Their desire to avoid conflict can sometimes lead them to tolerate situations that should be confronted and addressed directly.',
    career:
      'Pigs thrive in careers that allow them to help others and express their generous, nurturing nature. They make wonderful doctors, veterinarians, teachers, hospitality professionals, and charity workers. Their appreciation for quality and comfort also draws them to success in food and beverage, interior design, and entertainment, where they create experiences that delight others.',
    wealth:
      'Pigs tend to attract good fortune financially and can earn well through their hard work and likeable nature. However, their generous spirit and love of luxury can lead to overspending if not carefully managed. Establishing clear financial boundaries and learning to say no to others\' financial requests are important skills for Pigs to develop.',
    love:
      'In love, Pigs are warm, sensual, and deeply devoted partners who pour their hearts into creating a loving, comfortable home. They are romantic idealists who believe in true love and are willing to give everything for the right partner. Their generous and forgiving nature makes them wonderful long-term companions, though they need partners who will not take advantage of their kindness.',
    health:
      'Pigs tend to enjoy life\'s pleasures enthusiastically, which can sometimes lead to overindulgence in food and drink. Maintaining an active lifestyle and a balanced diet are particularly important for this sign. Regular health check-ups and moderation in all things will help Pigs maintain their naturally robust constitution and enjoy a long, healthy life.',
    famous: ['Henry Ford', 'Ernest Hemingway', 'Arnold Schwarzenegger'],
  },
};
