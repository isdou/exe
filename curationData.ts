import { MovieCuration, BookCuration, MusicCuration, Character } from './types';

// 🔥 修复点：新增 CHARACTERS 数据，防止 Curation 页面因找不到数据而黑屏
export const CHARACTERS: Character[] = [
  {
    id: "001",
    rank: 1,
    name: 'Chandler Bing',
    source: 'Friends',
    actor: 'Matthew Perry',
    desc: '我并不擅长提供建议。我能给你提供一个带讽刺意味的点评吗？',
    mbti: 'ENTP',
    birthYear: '1968',
    avatar: 'images/chandler.png',
    biography: `
    [系统评估报告]
    钱德勒·宾是一个将“自嘲”与“讽刺”作为核心防御机制的复杂人格。作为统计分析师，他表现出了极高的逻辑敏锐度与社交不安感。

    核心特征：
    1. 语言模块：内置高度发达的冷笑话触发器。当环境压力值升高时，系统会自动输出讽刺言论以中和尴尬。
    2. 情感回路：由于童年时期的“感恩节阴影”，系统在亲密关系初期表现出极高的排斥反应，直至与 Monica Geller 完成协议对齐。
    3. 职业路径：从枯燥的数据采集（Data Reconfiguration）转向创意驱动的广告业，体现了其人格中创造力对枯燥逻辑的最终胜利。

    [档案注记]
    他是我们所有人中，那个最努力用笑声掩盖内心孤独的人。他是 20 世纪末都市青年焦虑与温情的缩影。
    `
  },
  {
    id: 'c2',
    rank: 2,
    name: 'Patrick Jane',
    source: 'The Mentalist',
    actor: 'Simon Baker',
    desc: '最接近银时真人的一个角色',
    mbti: 'ENTP',
    birthYear: '1974',
    avatar: 'images/patrick.webp'
  }
];

/**
 * ============================================================
 * 影视档案馆 (Movies Database)
 * ============================================================
 */
export const MOVIES: MovieCuration[] = [
  {
    id: 'm1',
    title: '疑犯追踪',
    originalTitle: 'Person of Interest',
    director: 'Chris Fisher/Jonathan Nolan',
    year: '2011',
    region: 'USA',
    genre: '科幻 / 悬疑',
    runtime: '3d 3h 28m',
    images: [
      'images/poi1.jpg',
      'images/poi2.jpg'
    ],
    review: '新的一年，最恨的人还是Jonathan Nolan',
    rating: 9.5,
    tags: ['Sci-Fi', 'AI', 'Crime','Action'],
    status: 'done',
    // 补全字段防止报错
    isTV: true,
    onWall: true, 
    totalDuration: '5 Seasons',
    cast: ['Jim Caviezel', 'Michael Emerson']
  },
  {
    id: 'm2',
    title: '神探阿蒙',
    originalTitle: 'Frasier',
    director: 'David Angell',
    year: '1993',
    region: 'USA',
    genre: '情景喜剧',
    runtime: '4d 8h 19m ',
    images: [
      'images/fra1.jpg',
      'images/fra2.jpg'
    ],
    review: '还是喜欢看学院派喜剧啊，台词风趣幽默有深度，优雅温馨不低俗，太好了，想以现在的年龄回到九十年代。',
    rating: 9.2,
    tags: ['Sitcom', 'Classic', 'Comedy'],
    status: 'processing',
    isTV: true,
    onWall: true, 
    totalDuration: '11 Seasons',
    cast: ['Kelsey Grammer', 'David Hyde Pierce']
  },
  {
    id: 'm3',
    title: 'Monk',
    originalTitle: 'Monk',
    director: 'Randy Zisk',
    year: '2002',
    region: 'USA',
    genre: '犯罪 / 悬疑',
    runtime: '3d 18h 9m',
    images: [
      'images/monk1.jpg',
      'images/monk2.jpg'
    ],
    review: '完全怀疑这就是Sheldon的参考人物',
    rating: 8.7,
    tags: ['Crime', 'Mystery', 'Comedy'],
    status: 'done',
    isTV: true,
    totalDuration: '8 Seasons',
    cast: ['Tony Shalhoub']
  },
  {
    id: 'm4',
    title: '中国奇谭 2',
    originalTitle: 'Yao-Chinese Folktales 2',
    director: '陈廖宇/张俊杰',
    year: '2026',
    region: 'CHINA',
    genre: '动画 / 奇幻',
    runtime: ' 3h 9m ',
    images: [
      'images/zgqt1.jpg',
      'images/zgqt2.jpg'
    ],
    review: '我还是喜欢看国产爱死机',
    rating: 9,
    tags: ['Donghua', 'Fantasy', 'Science Fiction'],
    status: 'processing',
    isTV: true,
    totalDuration: '2 Seasons',
    cast: []
  },
    {
    id: 'm5',
    title: 'Will & Grace',
    originalTitle: 'Will & Grace',
    director: 'James Burrows',
    year: '1998',
    region: 'USA',
    genre: '喜剧 / 友情',
    runtime: ' 2d 23h 8m',
    images: [
      'images/willgrace1.jpg',
      'images/willgrace2.jpg'
    ],
    review: 'gay-straight friendship,Where there’s a Will there‘s a Grace.',
    rating: 9,
    tags: ['Comedy', 'friendship', 'Sitcom'],
    status: 'processing',
    isTV: true,
    totalDuration: '11 Seasons',
    cast: []
  },
    {
    id: 'm6',
    title: '是，大臣',
    originalTitle: 'Yes Minister',
    director: 'Peter Whitmore',
    year: '1980',
    region: 'UK',
    genre: '喜剧 / 政治',
    runtime: ' 10h 30m',
    images: [
      'images/YesMinister1.webp',
      'images/YesMinister2.jpg'
    ],
    review: '什么是经典',
    rating: 9,
    tags: ['Comedy', 'Satirical', 'Sitcom'],
    status: 'processing',
    isTV: true,
    totalDuration: '3 Seasons',
    cast: ['Paul Eddington','Nigel Hawthorne','Derek Fowlds']
  },
    {
    id: 'm7',
    title: ' 重任在肩',
    originalTitle: 'Line of Duty',
    director: 'David Caffrey / Douglas Mackinnon',
    year: '2012',
    region: 'UK',
    genre: '悬疑 / 犯罪',
    runtime: '1d 12h 14m',
    images: [
      'images/LineofDuty2.jpg',
      'images/LineofDuty2.jpg'
    ],
    review: '心情是资质平平的编剧看了之后会自杀吗',
    rating: 10,
    tags: ['Comedy', 'Satirical', 'Sitcom'],
    status: 'done',
    isTV: true,
    totalDuration: '6 Seasons',
    cast: ['Martin Compston','Vicky McClure','Adrian Dunbar']
  },
    {
    id: 'm8',
    title: ' 毒舌家庭',
    originalTitle: 'Sarcastic Family',
    director: '束焕 / 王晋',
    year: '2025',
    region: 'China',
    genre: '喜剧 / 科幻',
    runtime: ' 16h ',
    images: [
      'images/dsjt2.webp',
      'images/dsjt2.webp'
    ],
    review: '等了很久的第二季黏人俱乐部始终没有来，这部当姐妹篇来看',
    rating: 8,
    tags: ['Comedy', 'Drama', 'Sitcom'],
    status: 'done',
    isTV: true,
    totalDuration: '1 Seasons',
    cast: ['蔡明','杨皓宇','孟鹤堂','李雪琴']
  },
    {
    id: 'm9',
    title: '不过是上班',
    originalTitle: 'Just A Job',
    director: '王梓骏',
    year: '2026',
    region: 'China',
    genre: '喜剧 / 科幻',
    runtime: ' 101 min ',
    images: [
      'images/bgssb2.jpg',
      'images/bgssb2.jpg'
    ],
    review: '看了点映，天宇的演技在里面有点突出',
    rating: 8,
    tags: ['Comedy', 'Drama'],
    status: 'done',
    isTV: false,
    totalDuration: '1 Seasons',
    cast: ['吴俊霆','李孝谦','孙天宇','合文俊','李逗逗']
  }
];

/**
 * ============================================================
 * 书籍档案馆 (Books Database)
 * ============================================================
 */
export const BOOKS: BookCuration[] = [
    {
    id: '1',
    title: 'Zabranjeno čitanje',
    author: 'Dubravka Ugrešić',
    quote: ' 废墟是他们的记号，废墟是他们的标志，废墟是他们的签名，废墟纪念着、代表着、隐喻着他们的文化——废墟，是他们为文学奋斗的真正的结果。',
    summary: '好喜欢这本啊，比《疼痛部》要喜欢得多。// 看完这本书我知道为什么会有打低分了，她太犀利尖锐直言不讳了，她的攻击性太强以致于有人会有被冒犯的感觉吧，这样强烈风格的作家喜欢的会很喜欢，不喜欢的很不喜欢，刚巧我就爱得要死。',
    coverImage: 'images/Dub-Lisica1.jpg',
    bgColor: 'bg-[#BDA946]',
    rating: 10,
    tags: ['流亡', '女性叙事'],
    status: 'done',
    readingDate: '2025-03-03',
    isbn: '9787222220737',
    wordCount: '38k',
  },
    {
    id: '2',
    title: 'Muzej bezuvjetne predaje',
    author: 'Dubravka Ugrešić',
    quote: ' 记忆这东西，现在看来，不仅是捉摸不透。它还有自己的秘道，遵循一种只有它自己才知道的对称法则。',
    summary: '',
    coverImage: 'images/Dub-Lisica2.jpg',
    bgColor: 'bg-[#8AC9B4]',
    rating: 10,
    tags: ['流亡', '女性叙事'],
    status: 'done',
    readingDate: '2025-03-04',
    isbn: '9787222224926',
    wordCount: '38k',
  },
    {
    id: '3',
    title: 'Ministarstvo boli',
    author: 'Dubravka Ugrešić',
    quote: ' 不久前还无比重要的东西——他们的信仰，他们的国籍——一下子变得一文不值。取而代之的是生存。但只要生存有了保障，抵达了安全的海岸，他们舒口气，掐自己一下，确认自己还活着，就又挂出了国旗，摆出了圣像和国徽，点上了蜡烛。',
    summary: '',
    coverImage: 'images/Dub-Lisica3.jpg',
    bgColor: 'bg-[#18B5E2]',
    rating: 10,
    tags: ['流亡', '女性叙事'],
    status: 'done',
    readingDate: '2025-03-02',
    isbn: '9787547744482',
    wordCount: '38k',
  },
    {
    id: '4',
    title: 'Baba Jaga je snijela jaje',
    author: 'Dubravka Ugrešić',
    quote: ' 全世界的芭芭雅嘎，联合起来！',
    summary: '',
    coverImage: 'images/Dub-Lisica4.jpg',
    bgColor: 'bg-[#C6ABCC]',
    rating: 10,
    tags: ['流亡', '女性叙事'],
    status: 'done',
    readingDate: '2025-03-06',
    isbn: '9787222228450',
    wordCount: '38k',
  }, 
    {
    id: 'b289',
    title: 'Lacrimi și Sfinți',
    author: 'E. M. Cioran',
    quote: ' 我既没有愁苦到足以成为诗人，又没有冷漠到像个哲学家。但我清醒到足以成为一个废人。',
    summary: ' ',
    coverImage: 'images/Cioran4.jpg',
    bgColor: 'bg-[#B50611]',
    rating: 9,
    tags: ['虚无主义', '哲学'],
    status: 'processing',
    readingDate: '2026-01-06',
    isbn: '9787100104234',
    wordCount: '38k',
  },
    {
    id: 'b290',
    title: '供词与放逐',
    author: 'E. M. Cioran',
    quote: '安慰人得顺从对方痛苦的走向，而且要顺从到连受苦之人都觉得无法继续痛苦的程度。',
    summary: ' 秉持虚无主义观念的人几乎没有自杀的可能。',
    coverImage: 'images/Cioran2.jpg',
    bgColor: 'bg-[#822F20]',
    rating: 10,
    tags: ['虚无主义', '哲学'],
    status: 'done',
    readingDate: '2025-12-16',
    isbn: '9787559859594',
    wordCount: '38k',
  },
    {
    id: 'b291',
    title: 'Sur les cimes du désespoir',
    author: 'E. M. Cioran',
    quote: '灵魂的每一种状态都会选取自己的外部形式，或者根据灵魂的本质对它加以改造。',
    summary: '',
    coverImage: 'images/Cioran3.jpg',
    bgColor: 'bg-[#1A4594]',
    rating: 9,
    tags: ['虚无主义', '哲学'],
    status: 'done',
    readingDate: '2025-12-22',
    isbn: '9787559660503',
    wordCount: '66k',
  },

    {
    id: 'b292',
    title: 'Syllogismes de l’amertume',
    author: 'E. M. Cioran',
    quote: '人怎么会成为哲学家呢？怎么有脸面抨击时间、美、上帝和其余一切？头脑膨胀，恬不知耻地雀跃。形而上学，诗——一只虱子的放肆……',
    summary: '',
    coverImage: 'images/Cioran1.jpg',
    bgColor: 'bg-[#DDB196]',
    rating: 7,
    tags: ['虚无主义', '哲学'],
    status: 'done',
    readingDate: '2025-12-11',
    isbn: '9787559859600',
    wordCount: '32k',
  },

    {
    id: 'b293',
    title: 'La Mort heureuse',
    author: 'Albert Camus',
    quote: '',
    summary: '',
    coverImage: 'images/camus3.jpg',
    bgColor: 'bg-[#C19ADD]',
    rating: 8,
    tags: ['小说', '荒诞'],
    status: 'processing',
    readingDate: '2026-01-04',
    isbn: '9787532761760',
    wordCount: '65k',
  },  
    {
    id: 'b294',
    title: 'La Peste',
    author: 'Albert Camus',
    quote: '',
    summary: '',
    coverImage: 'images/camus2.jpg',
    bgColor: 'bg-[#22971C]',
    rating: 8,
    tags: ['小说', '荒诞'],
    status: 'processing',
    readingDate: '2026-01-04',
    isbn: '9787533977481',
    wordCount: '161k',
  },  
    {
    id: 'b295',
    title: 'L’Étranger',
    author: 'Albert Camus',
    quote: '我们很少信任比我们好的人，这可太真实了。我们宁肯避免与他们往来。相反，最为经常的是我们对和我们相似，和我们有着共同弱点的人吐露心迹。',
    summary: '',
    coverImage: 'images/camus1.jpg',
    bgColor: 'bg-[#FE563D]',
    rating: 8,
    tags: ['小说', '荒诞'],
    status: 'processing',
    readingDate: '2026-01-01',
    isbn: '9787532761760',
    wordCount: '65k',
  }, 
  {
    id: 'b296',
    title: 'Lisica',
    author: 'Dubravka Ugrešić',
    quote: '对家的渴望是强大的，它拥有原始本能的力量；短期的心态经过时间的滋养，固化为一种执拗的道德原则，它比我想象的更危险。',
    summary: '赛亚·伯林认为，思想家可以分为两种类型：一种是兴趣广泛的狐狸,一种是专注于一个大问题的刺猬）。',
    coverImage: 'images/Dub-Lisica.jpg',
    bgColor: 'bg-[#793B2C]',
    rating: 9,
    tags: ['流亡', '女性叙事'],
    status: 'done',
    readingDate: '2024-12-29',
    isbn: '9787547745809',
    wordCount: '131k',
  }, 
  {
    id: 'b297',
    title: '내게 무해한 사람',
    author: '崔恩荣',
    quote: '我只是偶尔做个倾听的朋友，哪怕是给妈妈一点点陪伴。并不因为她是我的妈妈，而是因为她孤独了太久。',
    summary: '她不追求跌宕起伏的剧情，而是特别擅长处理人和人之间的“情感流动”：模糊、复杂、未被说出却始终存在。',
    coverImage: 'images/cuienrong-01.png',
    bgColor: 'bg-[#1a2d3d]',
    rating: 8.8,
    tags: ['韩国文学', '女性叙事'],
    status: 'done',
    readingDate: '2025-03-25',
    isbn: '9787505756854',
    wordCount: '160k',
  },
  {
    id: 'b298',
    title: '明亮的夜晚',
    author: '崔恩荣',
    quote: '如果心是一个可以从人体中取出的器官，我想把手伸进胸膛，把它取出来。我要用温水将它洗干净，用毛巾擦干水汽，晾到阳光充足、通风良好的地方。',
    summary: '三代女性横跨百年的旅程，没有宏大的命题，只有一盏盏灯从过往递到现在。',
    coverImage: 'images/cuienrong-02.png',
    bgColor: 'bg-[#1e1e2e]',
    rating: 9.0,
    tags: ['韩国文学', '女性叙事'],
    status: 'done',
    readingDate: '2025-03-04',
    isbn: '9787516835265',
    wordCount: '134k',
  },
  {
    id: 'b299',
    title: '即使不努力',
    author: '崔恩荣',
    quote: '你是真心的，这让我很害怕。你喜欢我，看到了我身上一些美好的地方，可这只是个误会，很快你会发现自己被骗了，然后你会选择离开，而我接受不了这样的结局。',
    summary: '她写没有野心的人，没有高光时刻的人，没有赢但也不彻底失败的人。',
    coverImage: 'images/cuienrong-03.png',
    bgColor: 'bg-[#363A39]',
    rating: 7.0,
    tags: ['短篇小说', '生活'],
    status: 'done',
    readingDate: '2025-03-25',
    isbn: '9787559669254',
    wordCount: '56k',
  }
];

/**
 * ============================================================
 * 音乐档案馆 (Audio Database)
 * ============================================================
 */
export const MUSIC: MusicCuration[] = [
  {
    id: 'mu1',
    title: 'Miss Her',
    artist: 'Maximillian,Nicklas Sahl',
    type: 'Album',
    year: '2023',
    coverImage: 'images/missher.jpeg', 
    review: '2025 单曲循环第一名',
    link: 'https://open.spotify.com/track/5Cb7Jq85mWeYrmMGtmez2h?si=12abf7bc238c48fa', 
    rating: 9.8,
    tags: ['Love'],
    status: 'done'
  },
  {
    id: 'mu2',
    title: '孤独是生命的礼物',
    artist: '什么都浪漫',
    type: 'Album',
    year: '2021',
    coverImage: 'images/smdlm1.jpeg',
    review: '🤔',
    link: 'https://open.spotify.com/album/4ivCItVB0FKCtmIkVbEg04?si=4-1WXBBbQ_KEBN5BMUxQBw',
    rating: 10,
    tags: ['sad', 'Classic'],
    status: 'processing'
  }
];