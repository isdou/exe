
// 文件: isdou_exe/curationData.ts
import { MovieCuration, BookCuration } from './types';

export const MOVIES: MovieCuration[] = [
  {
    id: 'm1',
    title: '疑犯追踪',
    originalTitle: 'Person of Interest',
    director: 'Jonathan Nolan',
    year: '2011',
    region: 'USA',
    genre: '科幻 / 悬疑',
    runtime: '5 seasons',
    images: [
      'images/poi1.jpg',
      'images/poi2.jpg'
    ],
    review: '新的一年，最恨的人还是Jonathan Nolan。',
    // 新增数据
    rating: 9.5,
    status: 'done',
    tags: ['AI', 'Cyberpunk', 'Procedural']
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
    review: '还是喜欢看学院派喜剧啊，台词风趣幽默有深度，优雅温馨不低俗。',
    // 新增数据
    rating: 9.2,
    status: 'processing', // 正在看
    tags: ['Sitcom', 'Comedy', '90s']
  }
];

export const BOOKS: BookCuration[] = [
  {
    id: 'b1',
    title: '对我无害之人',
    author: '崔恩荣',
    quote: '我只是偶尔做个倾听的朋友，哪怕是给妈妈一点点陪伴...',
    summary: '她不追求跌宕起伏的剧情，而是特别擅长处理人和人之间的“情感流动”...',
    coverImage: 'images/cuienrong-01.png',
    bgColor: 'bg-[#1a2d3d]',
    // 新增数据
    rating: 8.8,
    status: 'done',
    tags: ['Korean Lit', 'Emotion', 'Short Stories']
  },
  {
    id: 'b2',
    title: '明亮的夜晚',
    author: '崔恩荣',
    quote: '如果心是一个可以从人体中取出的器官，我想把手伸进胸膛...',
    summary: '三代女性横跨百年的旅程，没有宏大的命题，只有一盏盏灯从过往递到现在。',
    coverImage: 'images/cuienrong-02.png',
    bgColor: 'bg-[#1e1e2e]',
    rating: 9.0,
    status: 'processing',
    tags: ['Korean Lit', 'Family', 'History']
  },
  {
    id: 'b3',
    title: '即使不努力',
    author: '崔恩荣',
    quote: '你是真心的，这让我很害怕。你喜欢我，看到了我身上一些美好的地方...',
    summary: '她写没有野心的人，没有高光时刻的人...',
    coverImage: 'images/cuienrong-03.png',
    bgColor: 'bg-[#1e1e2e]',
    rating: 8.5,
    status: 'wishlist',
    tags: ['Korean Lit', 'Life']
  }
];