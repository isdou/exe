
/**
 * ============================================================
 * 影视档案馆 (Movies Database)
 * ============================================================
 *
 * 路径请写成： './images/文件名.jpg'
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
    // 示例：这里使用了你本地 images 文件夹里的图片
    images: [
      './images/poi1.jpg',
      './images/poi2.jpg'
    ],
    review: '新的一年，最恨的人还是Jonathan Nolan'
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
      './images/fra1.jpg',
      './images/fra2.jpg'
    ],
    review: '希区柯克式的恐惧不仅仅在于鸟类的攻击，更在于日常生活的逻辑突然崩塌。那些无处不在的、冰冷的注视。'
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
    // 示例：使用本地封面图
    coverImage: './images/book-cover-01.jpg',
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
  }
];