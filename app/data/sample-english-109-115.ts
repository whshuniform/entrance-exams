import type { QuizPaper, QuizQuestion } from '~/types/quiz'
import { englishStats109To115 } from './stats-english-109-115'

const single = (year: number, number: number, stem: string, options: string[], answer: string): QuizQuestion => ({
  id: `${year}-english-${number}`,
  number,
  type: 'single',
  stem,
  options: options.map((text, index) => ({ key: 'ABCD'[index]!, text })),
  answer,
  points: 1,
})

/** 原卷的部分、題型標題與說明 */
interface Heading {
  part: string
  group: string
  note: string
}

const paper = (year: number, heading: Heading, questions: QuizQuestion[]): QuizPaper => ({
  id: 'english',
  exam: '學測',
  subject: '英文',
  year,
  // gsat/stats/curriculum_by_year.csv：109、110 年 99課綱，111 年起 108課綱
  curriculum: year <= 110 ? '99課綱' : '108課綱',
  // 原卷卷頭「考試時間：100 分鐘」
  minutes: 100,
  fullMarks: 100,
  stats: englishStats109To115[year]!,
  parts: [{ title: heading.part, groups: [{ title: heading.group, note: heading.note, questions }] }],
})

/**
 * 109–115 學年度學測英文第一大題「詞彙題」全部題目。
 * 題目照抄各年 gsat/<年度>/英文/question.docx（＿＿＿＿ 為原卷的填空線），答案出自大考中心公布之選擇題答案。
 */
export const sampleEnglish109To115: QuizPaper[] = [
  paper(109, {
    part: '第壹部分：單選題（占72分）',
    group: '一、詞彙題（占15分）',
    note: '說明︰第1題至第15題，每題有4個選項，其中只有一個是正確或最適當的選項，請畫記在答案卡之「選擇題答案區」。各題答對者，得1分；答錯、未作答或畫記多於一個選項者，該題以零分計算。',
  }, [
    single(109, 1, 'After hours of discussion, our class finally reached the ＿＿＿＿ that we would go to Hualien for our graduation trip.', [
      'balance',
      'conclusion',
      'definition',
      'harmony',
    ], 'B'),
    single(109, 2, 'Jane ＿＿＿＿ her teacher by passing the exam with a nearly perfect score; she almost failed the course last semester.', [
      'bored',
      'amazed',
      'charmed',
      'informed',
    ], 'B'),
    single(109, 3, 'The vacuum cleaner is not working. Let’s send it back to the ＿＿＿＿ to have it inspected and repaired.', [
      'lecturer',
      'publisher',
      'researcher',
      'manufacturer',
    ], 'D'),
    single(109, 4, 'Due to the global financial crisis, the country’s exports ＿＿＿＿ by 40 percent last month, the largest drop since 2000.', [
      'flattered',
      'transformed',
      'relieved',
      'decreased',
    ], 'D'),
    single(109, 5, 'The potato chips have been left uncovered on the table for such a long time that they no longer taste fresh and ＿＿＿＿.', [
      'solid',
      'crispy',
      'original',
      'smooth',
    ], 'B'),
    single(109, 6, 'The townspeople built a ＿＿＿＿ in memory of the brave teacher who sacrificed her life to save her students from a burning bus.', [
      'monument',
      'refugee',
      'souvenir',
      'firecracker',
    ], 'A'),
    single(109, 7, 'The students in Professor Smith’s classical Chinese class are required to ＿＿＿＿ poems by famous Chinese poets.', [
      'construct',
      'expose',
      'recite',
      'install',
    ], 'C'),
    single(109, 8, 'Although Mr. Tang claims that the house belongs to him, he has not offered any proof of ＿＿＿＿.', [
      'convention',
      'relationship',
      'insurance',
      'ownership',
    ], 'D'),
    single(109, 9, 'Ancient Athens, famous for its early development of the democratic system, is often said to be the ＿＿＿＿ of democracy.', [
      'mission',
      'target',
      'cradle',
      'milestone',
    ], 'C'),
    single(109, 10, 'The candy can no longer be sold because it was found to contain artificial ingredients far beyond the ＿＿＿＿ level.', [
      'abundant',
      'immense',
      'permissible',
      'descriptive',
    ], 'C'),
    single(109, 11, 'Jack’s excellent performance in last week’s game has ＿＿＿＿ all the doubts about his ability to play on our school basketball team.', [
      'erased',
      'canceled',
      'overlooked',
      'replaced',
    ], 'A'),
    single(109, 12, 'It is bullying to ＿＿＿＿ a foreign speaker’s accent. No one deserves to be laughed at for their pronunciation.', [
      'mock',
      'sneak',
      'prompt',
      'glare',
    ], 'A'),
    single(109, 13, 'Mary lost ten kilograms in three months, so her ＿＿＿＿ skin-tight jeans are now hanging off her hips.', [
      'barely',
      'evenly',
      'currently',
      'formerly',
    ], 'D'),
    single(109, 14, 'The police officer showed us pictures of drunk driving accidents to highlight the importance of staying ＿＿＿＿ on the road.', [
      'sober',
      'majestic',
      'vigorous',
      'noticeable',
    ], 'A'),
    single(109, 15, 'The claim that eating chocolate can prevent heart disease is ＿＿＿＿ because there is not enough scientific evidence to support it.', [
      'creative',
      'disputable',
      'circular',
      'magnificent',
    ], 'B'),
  ]),
  paper(110, {
    part: '第壹部分：單選題（占72分）',
    group: '一、詞彙題（占15分）',
    note: '說明︰第1題至第15題，每題有4個選項，其中只有一個是正確或最適當的選項，請劃記在答案卡之「選擇題答案區」。各題答對者，得1分；答錯、未作答或劃記多於一個選項者，該題以零分計算。',
  }, [
    single(110, 1, 'Tom is really a naughty boy. He likes to ＿＿＿＿ and play jokes on his younger sister when their parents are not around.', [
      'alert',
      'spare',
      'tease',
      'oppose',
    ], 'C'),
    single(110, 2, 'Elderly shoppers in this store are advised to take the elevator rather than the ＿＿＿＿, which may move too fast for them to keep their balance.', [
      'airway',
      'operator',
      'escalator',
      'instrument',
    ], 'C'),
    single(110, 3, 'Upon hearing its master’s call, the dog wagged its tail, and followed her out of the room ＿＿＿＿.', [
      'obediently',
      'apparently',
      'logically',
      'thoroughly',
    ], 'A'),
    single(110, 4, 'Since many of our house plants are from humid jungle environments, they need ＿＿＿＿ air to keep them green and healthy.', [
      'moist',
      'stale',
      'crisp',
      'fertile',
    ], 'A'),
    single(110, 5, 'The skydiver managed to land safely after jumping out of the aircraft, even though her ＿＿＿＿ failed to open in midair.', [
      'glimpse',
      'latitude',
      'segment',
      'parachute',
    ], 'D'),
    single(110, 6, 'The invention of the steam engine, which was used to power heavy machines, brought about a ＿＿＿＿ change in society.', [
      'persuasive',
      'harmonious',
      'conventional',
      'revolutionary',
    ], 'D'),
    single(110, 7, 'To encourage classroom ＿＿＿＿, the teacher divided the class into groups and asked them to solve a problem together with their partners.', [
      'operation',
      'interaction',
      'adjustment',
      'explanation',
    ], 'B'),
    single(110, 8, 'Lisa ＿＿＿＿ onto the ground and injured her ankle while she was playing basketball yesterday.', [
      'buried',
      'punched',
      'scattered',
      'tumbled',
    ], 'D'),
    single(110, 9, 'Hundreds of residents received free testing ＿＿＿＿ from the city government to find out if their water contained any harmful chemicals.', [
      'kits',
      'trials',
      'zones',
      'proofs',
    ], 'A'),
    single(110, 10, 'The 2011 Nobel Peace Prize was awarded ＿＿＿＿ to three women for the efforts they made in fighting for women’s rights.', [
      'actively',
      'earnestly',
      'jointly',
      'naturally',
    ], 'C'),
    single(110, 11, 'The company is ＿＿＿＿ and making great profits under the wise leadership of the chief executive officer.', [
      'applauding',
      'flourishing',
      'circulating',
      'exceeding',
    ], 'B'),
    single(110, 12, 'It is absolutely ＿＿＿＿ to waste your money on an expensive car when you cannot even get a driver’s license.', [
      'absurd',
      'cautious',
      'vigorous',
      'obstinate',
    ], 'A'),
    single(110, 13, 'The problem of illegal drug use is very complex and cannot be traced to merely one ＿＿＿＿ reason.', [
      'singular',
      'countable',
      'favorable',
      'defensive',
    ], 'A'),
    single(110, 14, 'The non-profit organization has ＿＿＿＿ $1 million over five years to finance the construction of the medical center.', [
      'equipped',
      'resolved',
      'committed',
      'associated',
    ], 'C'),
    single(110, 15, 'One week after the typhoon, some bridges were finally opened and bus service ＿＿＿＿ in the country’s most severely damaged areas.', [
      'departed',
      'resumed',
      'transported',
      'corresponded',
    ], 'B'),
  ]),
  paper(111, {
    part: '第壹部分、選擇題（占62分）',
    group: '一、詞彙題（占10分）',
    note: '說明︰第1題至第10題，每題1分。',
  }, [
    single(111, 1, 'When Jeffery doesn’t feel like cooking, he often orders pizza online and has it ＿＿＿＿ to his house.', [
      'advanced',
      'delivered',
      'offered',
      'stretched',
    ], 'B'),
    single(111, 2, 'Jane is the best ＿＿＿＿ I have ever had. I cannot imagine running my office without her help.', [
      'assistant',
      'influence',
      'contribution',
      'politician',
    ], 'A'),
    single(111, 3, 'The temple celebrated Mazu Festival by hosting ten days of lion dances, Taiwanese operas, and traditional hand ＿＿＿＿ shows.', [
      'chat',
      'quiz',
      'puppet',
      'variety',
    ], 'C'),
    single(111, 4, 'The new vaccine was banned by the Food and Drug Administration due to its ＿＿＿＿ fatal side effects.', [
      'potentially',
      'delicately',
      'ambiguously',
      'optionally',
    ], 'A'),
    single(111, 5, '＿＿＿＿ the photos with dates and keywords help you sort them easily in your file.', [
      'Tagging',
      'Flocking',
      'Rolling',
      'Snapping',
    ], 'A'),
    single(111, 6, 'An ＿＿＿＿ person is usually pleasant and easy to get along with, but don’t expect that he or she will always say “yes” to everything.', [
      'enormous',
      'intimate',
      'agreeable',
      'ultimate',
    ], 'C'),
    single(111, 7, 'Hidden deep in a small alley among various tiny shops, the entrance of the Michelin star restaurant is barely ＿＿＿＿ to passersby.', [
      'identical',
      'visible',
      'available',
      'remarkable',
    ], 'B'),
    single(111, 8, 'The original budget for my round-island trip was NT$5,000, but the ＿＿＿＿ cost is likely to be 50 percent higher.', [
      'moderate',
      'absolute',
      'promising',
      'eventual',
    ], 'D'),
    single(111, 9, 'After watching a TV program on natural history, Adam decided to go on a ＿＿＿＿ for dinosaur fossils in South Dakota.', [
      'trial',
      'route',
      'strike',
      'quest',
    ], 'D'),
    single(111, 10, 'With pink cherry blossoms blooming everywhere, the valley ＿＿＿＿ like a young bride under the bright spring sunshine.', [
      'bounces',
      'blushes',
      'polishes',
      'transfers',
    ], 'B'),
  ]),
  paper(112, {
    part: '第壹部分、選擇題（占62分）',
    group: '一、詞彙題（占10分）',
    note: '說明︰第1題至第10題為單選題，每題1分。',
  }, [
    single(112, 1, 'The bus driver often complains about chewing gum found under passenger seats because it is ＿＿＿＿ and very hard to remove.', [
      'sticky',
      'greasy',
      'clumsy',
      'mighty',
    ], 'A'),
    single(112, 2, 'Jesse is a talented model. He can easily adopt an elegant ＿＿＿＿ for a camera shoot.', [
      'clap',
      'toss',
      'pose',
      'snap',
    ], 'C'),
    single(112, 3, 'In order to draw her family tree, Mary tried to trace her ＿＿＿＿ back to their arrival in North America.', [
      'siblings',
      'commuters',
      'ancestors',
      'instructors',
    ], 'C'),
    single(112, 4, 'Upon the super typhoon warning, Nancy rushed to the supermarket—only to find the shelves almost ＿＿＿＿ and the stock nearly gone.', [
      'blank',
      'bare',
      'hollow',
      'queer',
    ], 'B'),
    single(112, 5, 'Even though Jack said “Sorry!” to me in person, I did not feel any ＿＿＿＿ in his apology.', [
      'liability',
      'generosity',
      'integrity',
      'sincerity',
    ], 'D'),
    single(112, 6, 'My grandfather has astonishing powers of ＿＿＿＿. He can still vividly describe his first day at school as a child.', [
      'resolve',
      'fraction',
      'privilege',
      'recall',
    ], 'D'),
    single(112, 7, 'Recent research has found lots of evidence to ＿＿＿＿ the drug company’s claims about its “miracle” tablets for curing cancer.', [
      'provoke',
      'counter',
      'expose',
      'convert',
    ], 'B'),
    single(112, 8, 'Corrupt officials and misguided policies have ＿＿＿＿ the country’s economy and burdened its people with enormous foreign debts.', [
      'crippled',
      'accelerated',
      'rendered',
      'ventured',
    ], 'A'),
    single(112, 9, 'As a record number of fans showed up for the baseball final, the highways around the stadium were ＿＿＿＿ with traffic all day.', [
      'choked',
      'disturbed',
      'enclosed',
      'injected',
    ], 'A'),
    single(112, 10, 'Studies show that the ＿＿＿＿ unbiased media are in fact often deeply influenced by political ideology.', [
      'undoubtedly',
      'roughly',
      'understandably',
      'supposedly',
    ], 'D'),
  ]),
  paper(113, {
    part: '第壹部分、選擇題（占62分）',
    group: '一、詞彙題（占10分）',
    note: '說明︰第1題至第10題為單選題，每題1分。',
  }, [
    single(113, 1, 'People who desire a ＿＿＿＿ figure should exercise regularly and maintain healthy eating habits.', [
      'spicy',
      'slender',
      'slight',
      'slippery',
    ], 'B'),
    single(113, 2, 'Watching the sun ＿＿＿＿ from a sea of clouds is a must-do activity for all visitors to Ali Mountain.', [
      'emerging',
      'flashing',
      'rushing',
      'floating',
    ], 'A'),
    single(113, 3, 'Do you know what time the next bus is ＿＿＿＿? I’ve been waiting here for more than 30 minutes.', [
      'apt',
      'due',
      'bound',
      'docked',
    ], 'B'),
    single(113, 4, 'The roasting heat and high ＿＿＿＿ made me feel hot and sticky, no matter what I did to cool off.', [
      'density',
      'humidity',
      'circulation',
      'atmosphere',
    ], 'B'),
    single(113, 5, 'Artwork created by truly great artists such as Picasso and Monet will no doubt ＿＿＿＿ the test of time.', [
      'stay',
      'take',
      'serve',
      'stand',
    ], 'D'),
    single(113, 6, 'In some countries, military service is ＿＿＿＿ for men only; women do not have to serve in the military.', [
      'forceful',
      'realistic',
      'compulsory',
      'distinctive',
    ], 'C'),
    single(113, 7, 'The team complained that its leader always took the ＿＿＿＿ for all the hard work done by the team members.', [
      'advantage',
      'revenge',
      'remedy',
      'credit',
    ], 'D'),
    single(113, 8, 'Located at the center of the city, the business hotel ＿＿＿＿ not only good service but also convenient public transport.', [
      'proposes',
      'contains',
      'promises',
      'confirms',
    ], 'C'),
    single(113, 9, 'As blood supplies have fallen to a critically low level, many hospitals are making an ＿＿＿＿ for the public to donate blood.', [
      'appeal',
      'approach',
      'operation',
      'observation',
    ], 'A'),
    single(113, 10, 'David felt disappointed when he found out that he could not choose his study partners, but would be ＿＿＿＿ placed in a study group.', [
      'eligibly',
      'randomly',
      'apparently',
      'consequently',
    ], 'B'),
  ]),
  paper(114, {
    part: '第壹部分、選擇題（占62分）',
    group: '一、詞彙題（占10分）',
    note: '說明︰第1題至第10題為單選題，每題1分。',
  }, [
    single(114, 1, 'If you put a ＿＿＿＿ under a leaking faucet, you will be surprised at the amount of water collected in 24 hours.', [
      'border',
      'timer',
      'container',
      'marker',
    ], 'C'),
    single(114, 2, 'The local farmers’ market is popular as it offers a variety of fresh seasonal ＿＿＿＿ to people in the community.', [
      'produce',
      'fashion',
      'brand',
      'trend',
    ], 'A'),
    single(114, 3, 'As the years have passed by, many of my childhood memories are already ＿＿＿＿; I can no longer recall clearly what happened back then.', [
      'blurring',
      'trimming',
      'draining',
      'glaring',
    ], 'A'),
    single(114, 4, 'Racist remarks are by nature ＿＿＿＿ and hurtful, and should be avoided on all occasions.', [
      'excessive',
      'furious',
      'offensive',
      'stubborn',
    ], 'C'),
    single(114, 5, 'Not satisfied with the first ＿＿＿＿ of her essay, Mary revised it several times before turning it in to the teacher.', [
      'text',
      'brush',
      'draft',
      'plot',
    ], 'C'),
    single(114, 6, 'Left ＿＿＿＿ for years, the deserted house was filled with a thick coating of dust and a smell of old damp wood.', [
      'casual',
      'fragile',
      'remote',
      'vacant',
    ], 'D'),
    single(114, 7, 'The high school student showed ＿＿＿＿ courage when she helped the old man escape from the fire.', [
      'gigantic',
      'exclusive',
      'multiple',
      'enormous',
    ], 'D'),
    single(114, 8, 'Publicly financed projects are often ＿＿＿＿ or delayed during tough economic times due to a lack of resources.', [
      'halted',
      'hatched',
      'possessed',
      'reinforced',
    ], 'A'),
    single(114, 9, 'Despite his busy schedule, the President ＿＿＿＿ the school’s graduation ceremony with his presence and a heartwarming speech.', [
      'praised',
      'graced',
      'addressed',
      'credited',
    ], 'B'),
    single(114, 10, 'The manager of the company was sued for ＿＿＿＿ abusing his colleagues, calling them “hopeless losers.”', [
      'verbally',
      'dominantly',
      'legitimately',
      'relevantly',
    ], 'A'),
  ]),
  paper(115, {
    part: '第壹部分、選擇題（占62分）',
    group: '一、詞彙題（占10分）',
    note: '說明︰第1題至第10題為單選題，每題1分。',
  }, [
    single(115, 1, 'The mayor has such a ＿＿＿＿ schedule that it takes weeks to arrange an interview with her.', [
      'hasty',
      'tight',
      'diligent',
      'routine',
    ], 'B'),
    single(115, 2, 'Jane started as an ＿＿＿＿ art designer, but now she has a professional studio of her own.', [
      'official',
      'instant',
      'amateur',
      'elementary',
    ], 'C'),
    single(115, 3, 'The teaching ＿＿＿＿ at the famous high school soon attracted more than a dozen well-qualified applicants.', [
      'career',
      'vacancy',
      'expectation',
      'inspiration',
    ], 'B'),
    single(115, 4, 'Designed by a young engineer, the new product has created far more profit than ＿＿＿＿ expected.', [
      'initially',
      'genuinely',
      'alternatively',
      'fundamentally',
    ], 'A'),
    single(115, 5, 'It has been confirmed that a balanced ＿＿＿＿ of fruit and vegetables is a key element to good health.', [
      'dimension',
      'integration',
      'provision',
      'consumption',
    ], 'D'),
    single(115, 6, 'As a shy boy afraid of making public appearances, Timmy ＿＿＿＿ the thought of speaking before large audiences.', [
      'dreads',
      'stresses',
      'wanders',
      'escapes',
    ], 'A'),
    single(115, 7, 'To the newly-crowned winner of the piano competition, music is his life’s ＿＿＿＿, which he has devoted himself to whole-heartedly.', [
      'resource',
      'impact',
      'passion',
      'emphasis',
    ], 'C'),
    single(115, 8, 'The drunk driver who shouted at passers-by and ＿＿＿＿ them with glass bottles was quickly arrested by the police.', [
      'shattered',
      'assaulted',
      'overturned',
      'condemned',
    ], 'B'),
    single(115, 9, 'There were so many people at the bus station that I had to ＿＿＿＿ my way through the crowd to board the bus in time.', [
      'crash',
      'tumble',
      'elbow',
      'struggle',
    ], 'C'),
    single(115, 10, 'Deadly shootings on US campuses have raised ＿＿＿＿ concerns about how to prevent such tragic incidents from happening again.', [
      'swift',
      'brutal',
      'harsh',
      'grave',
    ], 'D'),
  ]),
]
