import { MovieCuration, BookCuration, MusicCuration, Character } from './types';
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
    // 🔥 新增字段
    isTV: true,
    totalDuration: '5 Episodes',
    cast: ['Jim Caviezel', 'Michael Emerson', 'Amy Acker', 'Sarah Shahi'],
    images: [
      'images/poi1.jpg',
      'images/poi2.jpg'
    ],
    review: '新的一年，最恨的人还是Jonathan Nolan',
    rating: 9.5,
    tags: ['Sci-Fi', 'AI', 'Crime','Action'],
    status: 'done'
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
    status: 'processing'
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
    status: 'processing'
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
    status: 'processing'
  },
{
    id: 'm5',
    title: 'Arrested Development',
    originalTitle: 'Arrested Development',
    director: 'Steven Wishnoff',
    year: '2004-11-07',
    region: 'USA',
    genre: '剧情 / 喜剧',
    runtime: ' 5 Seasons',
    images: [
      'images/ArrestedDevelopment1.png',
      'images/ArrestedDevelopment2.png'
    ],
    review: '很久没看这种全员神经病的喜剧了',
    rating: 9,
    tags: ['Comedy', 'Family'],
    status: 'processing'
  },
];

/**
 * ============================================================
 * 书籍档案馆 (Books Database)
 * ============================================================
 */
export const BOOKS: BookCuration[] = [
    {
    id: 'b1',
    title: 'L’Étranger',
    author: 'Albert Camus',
    quote: '我们很少信任比我们好的人，这可太真实了。我们宁肯避免与他们往来。相反，最为经常的是我们对和我们相似，和我们有着共同弱点的人吐露心迹。因此，我们并不希望改掉我们的弱点，也不希望变得更好，我们大概首先应该被判犯了错误。我们只是希望在我们的道路上受到怜悯和鼓励。一句话，我们希望不再有罪，同时对自己的纯洁不作努力。不要够多的无耻，也不要够多的道德。我们既无力作恶亦无力为善。',
    summary: '',
    coverImage: 'images/camus1.jpg',
    bgColor: 'bg-[#B2AFA8]',
    // 🔥 新增字段
    rating: 8,
    tags: ['小说', '荒诞'],
    status: 'processing',
    readingDate: '2026-01-01',
    isbn: '9787532761760',
    wordCount: '650k',
  }, 
  {
    id: 'b2',
    title: 'Lisica',
    author: 'Dubravka Ugrešić',
    quote: '对家的渴望是强大的，它拥有原始本能的力量；短期的心态经过时间的滋养，固化为一种执拗的道德原则，它比我想象的更危险。如果我不给它点吃的，缓解一下它的饥饿，或者换句话说，如果我不给它安个家——如果我愿意，我还可以从这个家里再次弹射出去——它就会与我为敌。',
    summary: '赛亚·伯林认为，思想家可以分为两种类型：一种是兴趣广泛的狐狸,一种是专注于一个大问题的刺猬），再看到那些刺猬和狐狸的典型代表，感觉就是Ni 和Ne的区别，比如提到陀翁就是典型的刺猬',
    coverImage: 'images/Dub-Lisica.jpg',
    bgColor: 'bg-[#793B2C]',
    // 🔥 新增字段
    rating: 9,
    tags: ['流亡', '女性叙事'],
    status: 'done',
    readingDate: '2024-12-29',
    isbn: '9787547745809',
    wordCount: '131k',
  }, 
  {
    id: 'b3',
    title: '내게 무해한 사람',
    author: '崔恩荣',
    quote: '我只是偶尔做个倾听的朋友，哪怕是给妈妈一点点陪伴。并不因为她是我的妈妈，而是因为她孤独了太久。如今我已经知道，人的意志和努力并不与人生的幸福成正比。妈妈在我们身边感觉不到幸福，并不是对人生不负责任，也不是对自己的放任。一一个以这样的方式理解妈妈的人。',
    summary: '她不追求跌宕起伏的剧情，而是特别擅长处理人和人之间的“情感流动”：模糊、复杂、未被说出却始终存在。故事不是高潮迭起，而是情绪缓慢地发酵，像茶泡开一样。虽然不煽情，但痛感极具穿透力。',
    coverImage: 'images/cuienrong-01.png',
    bgColor: 'bg-[#1a2d3d]',
    // 🔥 新增字段
    rating: 8.8,
    tags: ['韩国文学', '女性叙事'],
    status: 'done',
    readingDate: '2025-03-25',
    isbn: '9787505756854',
    wordCount: '160k',
  },
  {
    id: 'b4',
    title: '明亮的夜晚',
    author: '崔恩荣',
    quote: '如果心是一个可以从人体中取出的器官，我想把手伸进胸膛，把它取出来。我要用温水将它洗干净，用毛巾擦干水汽，晾到阳光充足、通风良好的地方。这期间我将作为无心之人生活，直到我的心被晾干了，软软的，重新散发出好闻的香气，再把它重新装回胸膛。这样就可以重新开始了吧。',
    summary: '三代女性横跨百年的旅程，没有宏大的命题，只有一盏盏灯从过往递到现在。她们沉默、软弱、相爱、独行，却把命运活成了接力的温柔。',
    coverImage: 'images/cuienrong-02.png',
    bgColor: 'bg-[#1e1e2e]',
    // 🔥 新增字段
    rating: 9.0,
    tags: ['韩国文学', '女性叙事'],
    status: 'done',
    readingDate: '2025-03-04',
    isbn: '9787516835265',
    wordCount: '134k',
  },
  {
    id: 'b5',
    title: '即使不努力',
    author: '崔恩荣',
    quote: '你是真心的，这让我很害怕。你喜欢我，看到了我身上一些美好的地方，可这只是个误会，很快你会发现自己被骗了，然后你会选择离开，而我接受不了这样的结局。',
    summary: '她写没有野心的人，没有高光时刻的人，没有赢但也不彻底失败的人。我们终于在这本书里，见到“普通”的疼和“微弱”的爱也被好好写了下来。',
    coverImage: 'images/cuienrong-03.png',
    bgColor: 'bg-[#363A39]',
    // 🔥 新增字段
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
    review: '202 5 单曲循环第一名',
    link: 'https://open.spotify.com/track/5Cb7Jq85mWeYrmMGtmez2h?si=12abf7bc238c48fa', // 换成真实的链接
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
    coverImage: 'images/gudushishengmingdeliwu.jpeg',
    review: '🤔',
    link: 'https://open.spotify.com/album/4ivCItVB0FKCtmIkVbEg04?si=4-1WXBBbQ_KEBN5BMUxQBw',
    rating: 10,
    tags: ['sad', 'Classic'],
    status: 'processing' // On Loop
  }
];

// 🔥 新增：人物榜单数据
export const CHARACTERS: Character[] = [
  {
    id: 'c1',
    rank: 1,
    name: '王阳',
    source: '漫长的季节',
    actor: '刘奕铁',
    desc: '那种充满生命力的、纯粹的、带有悲剧色彩的理想主义。',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' // 暂时用占位图
  },
  {
    id: 'c2',
    rank: 2,
    name: 'Rust Cohle',
    source: 'True Detective S1',
    actor: 'Matthew McConaughey',
    desc: '清醒的悲观主义者，在此岸审视虚无。',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  }
];