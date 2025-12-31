
import { MovieCuration, BookCuration } from './types';

/**
 * ============================================================
 * 影视档案馆 (Movies Database)
 * ============================================================
 */
export const MOVIES: MovieCuration[] = [
  {
    id: 'm1',
    title: '春天情书',
    originalTitle: 'Haru',
    director: 'Yoshimitsu Morita',
    year: '1996',
    region: '日本',
    genre: '剧情 / 爱情',
    runtime: '118分钟',
    images: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800'
    ],
    review: '看完好想给自己传邮件。好喜欢那个沟通不便的年代，人们怀着憧憬与期待打开笨重的灰白色台式机，珍重地回复来自这个奇妙壳子另一边的邮件。那些在 BBS 上缓慢流淌的真诚，在今天看来几乎是一种奢侈的宗教仪式。'
  },
  {
    id: 'm2',
    title: '群鸟',
    originalTitle: 'The Birds',
    director: 'Alfred Hitchcock',
    year: '1963',
    region: '美国',
    genre: '悬疑 / 惊悚 / 灾难',
    runtime: '119分钟',
    images: [
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1000',
      'https://images.unsplash.com/photo-1514467950401-4d974b70216b?q=80&w=800'
    ],
    review: '希区柯克式的恐惧不仅仅在于鸟类的攻击，更在于日常生活的逻辑突然崩塌。那些无处不在的、冰冷的注视。电影将日常的景象转化为一种极致的压抑与不安。这种没有解释的灾难，才是对人类傲慢最彻底的解构。'
  }
];

/**
 * ============================================================
 * 书籍档案馆 (Books Database)
 * ============================================================
 */
export const BOOKS: BookCuration[] = [
  {
    id: 'b1',
    title: '对我无害之人',
    author: '崔恩荣',
    quote: '我只是偶尔做个倾听的朋友，哪怕是给妈妈一点点陪伴。并不因为她是我的妈妈，而是因为她孤独了太久。',
    summary: '她特别擅长处理人与人之间的“情感流动”：模糊、复杂、未被说出却始终存在。在平凡的疼里重构自我。',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600',
    bgColor: 'bg-[#1a2d3d]'
  },
  {
    id: 'b2',
    title: '明亮的夜晚',
    author: '崔恩荣',
    quote: '如果心是一个可以从人体中取出的器官，我想把手伸进胸膛，把它取出来。我要用温水将它洗干净。',
    summary: '三代女性横跨百年的旅程，没有宏大的命题，只有一盏盏灯从过往递到现在。她们沉默、软弱、相爱、独行。',
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600',
    bgColor: 'bg-[#1e1e2e]'
  },
  {
    id: 'b3',
    title: '即使不努力',
    author: '崔恩荣',
    quote: '你是真心的，这让我很害怕。你喜欢我，看到了我身上一些美好的地方，可这只是个误会。',
    summary: '她写没有野心的人，没有高光时刻的人，没有赢但也不彻底失败的人。给每一个疲惫灵魂的温柔注脚。',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600',
    bgColor: 'bg-[#2c2c2c]'
  }
];
