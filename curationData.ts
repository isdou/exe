
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
      'images/poi1.jpg',
      'images/poi2.jpg'
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
      'images/fra1.jpg',
      'images/fra2.jpg'
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
    quote: '我只是偶尔做个倾听的朋友，哪怕是给妈妈一点点陪伴。并不因为她是我的妈妈，而是因为她孤独了太久。如今我已经知道，人的意志和努力并不与人生的幸福成正比。妈妈在我们身边感觉不到幸福，并不是对人生不负责任，也不是对自己的放任。一一个以这样的方式理解妈妈的人。',
    summary: '她不追求跌宕起伏的剧情，而是特别擅长处理人和人之间的“情感流动”：模糊、复杂、未被说出却始终存在。故事不是高潮迭起，而是情绪缓慢地发酵，像茶泡开一样。虽然不煽情，但痛感极具穿透力。',
    // 示例：使用本地封面图
    coverImage: 'images/cuienrong-01.png',
    bgColor: 'bg-[#1a2d3d]'
  },
  {
    id: 'b2',
    title: '明亮的夜晚',
    author: '崔恩荣',
    quote: '如果心是一个可以从人体中取出的器官，我想把手伸进胸膛，把它取出来。我要用温水将它洗干净，用毛巾擦干水汽，晾到阳光充足、通风良好的地方。这期间我将作为无心之人生活，直到我的心被晾干了，软软的，重新散发出好闻的香气，再把它重新装回胸膛。这样就可以重新开始了吧。',
    summary: '三代女性横跨百年的旅程，没有宏大的命题，只有一盏盏灯从过往递到现在。她们沉默、软弱、相爱、独行，却把命运活成了接力的温柔。',
    coverImage: 'images/cuienrong-02.png',
    bgColor: 'bg-[#1e1e2e]'
  },
  {
    id: 'b3',
    title: '即使不努力',
    author: '崔恩荣',
    quote: '你是真心的，这让我很害怕。你喜欢我，看到了我身上一些美好的地方，可这只是个误会，很快你会发现自己被骗了，然后你会选择离开，而我接受不了这样的结局。',
    summary: '她写没有野心的人，没有高光时刻的人，没有赢但也不彻底失败的人。我们终于在这本书里，见到“普通”的疼和“微弱”的爱也被好好写了下来。',
    coverImage: 'images/cuienrong-03.png',
    bgColor: 'bg-[#1e1e2e]'
  }
];