
import { Article } from './types';

/**
 * ============================================================
 * 文章数据库 (Essays Database)
 * ============================================================
 * 在这里添加你的新文章。
 * title: 标题
 * excerpt: 列表页显示的简短摘要
 * content: 文章正文，支持换行（详情页显示）
 * date: 发布日期
 * category: 分类标签
 * readTime: 预计阅读时间
 * ============================================================
 */
export const MOCK_ESSAYS: Article[] = [
  
  {
    id: '1',
    groupId: '1',
    lang: 'cn',
    title: '豆邮W1： 大声讲讲',
    excerpt: '',
    content: `
      所谓的结绳记事，其实是在给自己的理想生活描边，买下DJ Osmo Action 5 Pro 我这样对自己说。
      文字和影像是不同的，我总习惯用文字捕捉一切，再用文字抚平那些褶皱，文字是使我理智的手术刀。
      而影像更多时候则充当我眼睛的延时器，有效延时个几分钟，过期后就丢在相册里，不会整理也不会回顾。
      但文字是如此不可靠的，叠加上记忆的美化和损坏，感受逐渐变得没有根基，情绪则随着时间的拉长慢慢失去索引。
      我早就想要用影像来钉住感受了，新年和新设备则是最好的契机。

      最近总是在中午十二点或是午夜十二点醒来，失眠彻底摧毁了我的作息。我也逐渐发现三十岁的身体比二十岁敏感很多，再也不是一天能睡十几小时也不知失眠为何物的年轻人了。
      更不耐糖、更加乳糖不耐受、非自愿熬夜的身体反馈也来得越来越快，我在想要更好运用自己身体的同时不得不承认，随着年纪的增长，这件事变得愈发困难。
      但往好处看，更即时更明显的反馈也让我更加关注身体反应，从这种程度上来说，好像初步实现了和身体对话。（没有办法，Se 劣势的人学习这些就像幼儿园小孩）

      大家总说想要被真正的看见，想要获得人与人的连接，重新思考这件事，人们寻找的connection大多数时候是一种相似吧，尽管理论上也存在差异共振，同样的底色但不同的应对方式，诸如此类。
      底层共享一副画面，但却是两块不同的拼图，理论上是这样，实际则可遇不可求，因为光是遇到一个理解你在说什么&为什么这么说就已经花光了 99.99% 的运气了，想要达到理论上的差异共振，
      可能需要一点命运的怜悯吧。

      依旧无法理解在对话中只讲自己的人类，在别人心灵的后花园横冲直撞闲庭信步且无意赏花，起初我总疑惑这样的人类如何在日渐社达的环境中好好生存的，后来想这种表现本就是标准社达。
      因为不在乎所以才闲庭信步，因为不在乎所以随时从对话中走开，只听自己想听的话，用流行词汇讲这或许就是“主体性很强”的人类吧，真是令人生厌。
      Anyway

      已经越来越像一个大人了，符合自己年纪的大人，越发想要安稳栖息的大人，很少再左右脑互搏了，除了完全是在用入世的态度做出世的事情，其他时候已经不再有什么孩子气息了。
      但我很喜欢这种状态，至少目前是。
      心灵的平静是能企及的最幸福状态。

      在我提到对年度报告们感到失望的时候，想要自己做年度报告的想法逐渐成型，而当我把网站构建好的时候，我想我不再需要年底时才出现的那一张张报告。
      我会在这里如实记录所思所想所读所听去了哪吃了什么今天心情如何人生 bug 修复进度...填充内容的每一天都是在构建我的人生档案。
      
      So

      欢迎阅读我的电子日记。

      新年快乐，周六快乐。

    `,
    date: '2026-1-03',
    category: '豆邮',
    readTime: '11 min',
    coverImage: ''
  },
    {
    id: '1',
    groupId: '1',
    lang: 'en',
    title: 'DouMail W1: Speak Up Loudly',
    excerpt: '',
    content: `
      People say “knotting cords to keep records” is a primitive way to remember, but I told myself it’s actually about outlining an ideal life as I bought the DJI Osmo Action 5 Pro.

      Text and imagery are fundamentally different. I’ve always been accustomed to capturing everything with words, using them to smooth out the creases of life. For me, text is the scalpel of reason. Imagery, on the other hand, often serves merely as a delay timer for my eyes—it effectively pauses a moment for a few minutes, but once it expires, it gets dumped into an album, never to be organized or revisited.

      But text is so unreliable. Layered with the embellishments and damages of memory, feelings gradually lose their foundation, and emotions slowly lose their index as time stretches on. I have long wanted to use imagery to “pin down” these sensations. The New Year, along with this new device, seemed like the perfect catalyst.

      Recently, I’ve been waking up consistently at either 12:00 PM or 12:00 AM; insomnia has thoroughly destroyed my schedule. I’m also gradually realizing that a body in its thirties is far more sensitive than in its twenties. I am no longer that young person who could sleep for ten hours straight and knew nothing of sleeplessness.

      Intolerance to sugar, lactose, and involuntary late nights—the feedback from my body comes faster and faster. While I want to manage my body better, I have to admit that as I age, this task becomes increasingly difficult. But on the bright side, this immediate and obvious feedback forces me to pay attention to my physical reactions. To some extent, it feels like I’ve finally achieved a preliminary dialogue with my body. (There’s no helping it; for someone with inferior Se*, learning this is like being a kindergartner again.)

      Everyone talks about wanting to be truly “seen,” to find a connection between people. Re-thinking this, I believe the connection people seek is mostly a form of similarity. Although theoretically, “resonance in difference” exists—same underlying color but different coping mechanisms, and so on—it’s rare.

      Underneath, we might share the same picture, but we are different puzzle pieces. Theoretically possible, but in reality, something to be met by chance, not sought. Just encountering someone who understands what you are saying and why you are saying it already uses up 99.99% of one’s luck. To achieve that theoretical resonance in difference probably requires a little mercy from fate.

      I still cannot comprehend humans who only talk about themselves in conversation, barging into the back gardens of others’ minds, strolling idly without any intention of admiring the flowers. At first, I wondered how such people survive well in an increasingly Social Darwinist environment. Later, I realized this behavior is standard Social Darwinism. Because they don’t care, they can stroll idly; because they don’t care, they can walk away from the conversation at any time, hearing only what they want to hear. In trendy terms, perhaps these are people with “strong subjectivity” (or “main character energy”), but they are truly tiresome.

      Anyway.

      I’m becoming more and more like an adult—an adult befitting my age, an adult who increasingly desires a stable perch. My left and right brains rarely fight anymore. Except for when I am “using a worldly attitude to do otherworldly things,”** there is very little childishness left in me. But I like this state, at least for now. Peace of mind is the happiest state attainable.

      As I mentioned my disappointment with various “Annual Reports,” the idea of creating my own began to take shape. And now that I’ve built this website, I think I no longer need those reports that only show up at the end of the year.

      I will record here faithfully: what I think, what I read, what I hear, where I go, what I eat, how I feel today, the progress of fixing life’s bugs... Every day that I fill with content is a day spent constructing the archive of my life.

      So,

      Welcome to my electronic diary.

      Happy New Year, and Happy Saturday.

    `,
    date: '2026-1-03',
    category: '豆邮',
    readTime: '11 min',
    coverImage: ''
  },
  {
    id: '2',
    title: '熵增定律下的生活秩序',
    excerpt: '物理学中最令人绝望的定律如何指导我们的日常？通过有意识的能量输入，我们可以在混乱的洪流中开辟出一片有序的孤岛。',
    content: `
      熵增定律告诉我们，一个孤立系统的混乱度总是趋向于增加。这意味着，如果你不去打扫房间，它只会越来越乱；如果你不去维护关系，它只会越来越疏远。

      对抗熵增的唯一手段是引入负熵——即外部能量和信息的输入。在认知层面，这意味着持续的阅读、思考和行动。秩序从来不是天生的，它是昂贵的、需要持续耗能的状态。
    `,
    date: '2024-09-12',
    category: '胡说八道',
    readTime: ' 2 min',
    coverImage: ''
  }
];
