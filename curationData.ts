import { MovieCuration, BookCuration, MusicCuration, Character } from './types';

// 🔥 修复点：新增 CHARACTERS 数据，防止 Curation 页面因找不到数据而黑屏
export const CHARACTERS: Character[] = [
  {
    id: 'c1',
    rank: 1,
    name: 'Chandler Bing',
    source: 'Friends',
    actor: 'Matthew Perry',
    biography: '人物小传要好好写吧', // ✨ 新增：人物小传（长文）
    mbti: 'ENTP',    // ✨ 新增：MBTI 属性
    desc: 'The deadpan snarker.',
    avatar: 'images/chandler.png'
  },
  {
    id: 'c2',
    rank: 2,
    name: 'Patrick Jane',
    source: 'The Mentalist',
    actor: 'Simon Baker',
    biography: '很不巧又是一个ENTP',// ✨ 新增：人物小传（长文）
    mbti: 'ENTP',    // ✨ 新增：MBTI 属性
    desc: '最接近银时真人的一个角色',
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
    runtime: '5 seasons',
    images: [
      'images/poi1.jpg',
      'images/poi2.jpg'
    ],
    review: '新的一年，最恨的人还是Jonathan Nolan',
    rating: 9.8,
    tags: ['Sci-Fi', 'AI', 'Crime','Action'],
    status: 'done',
    recordDate:'2018-01-01', // ✨ 新增：用于自动排序 (YYYY-MM-DD)
    // 补全字段防止报错
    isTV: true,
    totalDuration: '5 Seasons',
    cast: ['Jim Caviezel', 'Michael Emerson'],
    onWall:true,// ✨ 新增：标记是否上榜电视墙
  },
  {
    id: 'm2',
    title: 'Frasier',
    originalTitle: 'Frasier',
    director: 'David Angell',
    year: '1993',
    region: 'USA',
    genre: '情景喜剧',
    runtime: '11 Seasons',
    images: [
      'images/fra1.jpg',
      'images/fra2.jpg'
    ],
    review: '还是喜欢看学院派喜剧啊，台词风趣幽默有深度，优雅温馨不低俗，太好了，想以现在的年龄回到九十年代。',
    rating: 9.2,
    tags: ['Sitcom', 'Classic', 'Comedy'],
    status: 'processing',
    recordDate:'2025-11-01',
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
    runtime: '8 Seasons',
    images: [
      'images/monk1.jpg',
      'images/monk2.jpg'
    ],
    review: '完全怀疑这就是Sheldon的参考人物',
    rating: 8.7,
    tags: ['Crime', 'Mystery', 'Comedy'],
    status: 'done',
    recordDate:'2025-12-01',
    isTV: true,
    onWall: false,
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
    runtime: ' 2 Seasons',
    images: [
      'images/zgqt1.jpg',
      'images/zgqt2.jpg'
    ],
    review: '我还是喜欢看国产爱死机',
    rating: 9,
    tags: ['Donghua', 'Fantasy', 'Science Fiction'],
    status: 'processing',
    recordDate:'2026-01-01',
    isTV: true,
    onWall: false,
    totalDuration: '2 Seasons',
    cast: []
  },
    {
    id: 'm5',
    title: 'Will & Grace',
    originalTitle: 'Will & Grace',
    director: 'James Burrows',
    year: '2026',
    region: 'USA',
    genre: '喜剧 / 友情',
    runtime: ' 2d 23h 8m',
    images: [
      'images/willgrace1.jpg',
      'images/willgrace2.jpg'
    ],
    review: 'gay-straight friendship',
    rating: 9,
    tags: ['Comedy', 'friendship', 'Sitcom'],
    status: 'processing',
    recordDate:'2026-01-04',
    isTV: true,
    onWall: false,
    totalDuration: '11 Seasons',
    cast: []
  },
];

/**
 * ============================================================
 * 书籍档案馆 (Books Database)
 * ============================================================
 */
export const BOOKS: BookCuration[] = [
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
    recordDate:'2026-01-04',
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
    recordDate:'2026-01-04',
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
    recordDate:'2026-01-01',
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
    recordDate:'2024-12-29',
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
    recordDate:'2025-03-25',
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
    recordDate:'2025-03-04',
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
    recordDate:'2025-03-25',
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
    recordDate:'2024-12-29',
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
    recordDate:'2022-12-29',
    link: 'https://open.spotify.com/album/4ivCItVB0FKCtmIkVbEg04?si=4-1WXBBbQ_KEBN5BMUxQBw',
    rating: 10,
    tags: ['sad', 'Classic'],
    status: 'processing'
  }
];