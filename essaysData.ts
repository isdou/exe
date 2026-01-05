
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
    groupId: '2',
    lang: 'cn',
    title: '从上一秒开始',
    excerpt: '',
    content: `
      没写过年终总结，不爱写年终总结，但喜欢新年，喜欢这种可以重新开始做人的错觉，喜欢空想，在一切都没开始的时候任意规划，做一些不需要负责任的梦。
      之前翻到年初随便写的没有意见，好像也没有抱着年终总结的心态在写，更像是一种宣誓✊🏿，一种会好好记录的宣誓。

      今年 1 月 1 日的手账上写，
      物理上真正地拥有自己的空间，才能在心灵中获得平静，肉体上无处可逃，感觉很喧嚣。所以会出现这种即使什么事情都没做，但仍然觉得很累，一直休息不过来，需要在寺庙打坐，literally。但也不可能那么理想的，总能在想独处的时候就能实现，所以可能还是得学着在人群中精神出走。新年没有什么 flag，只是希望这一整年都有工作。养育别人某种程度上等同于失去自我的过程，想不出有什么必要。不自由，毋宁死，灵魂的自由也是自由。

      虽然还未看《一间自己的房间》，但感觉时空上共鸣了。

      1 月 21 日形容我妈：负能量泡泡机。12 月：暴露太多自我是会给对方攻击你的武器，也是没想到我妈攻击我的时候这么有逻辑，但还好她讲的话我已经不往心里去了。

      2 月底今年搬到了北京，开始上班。

      发现工作心态太好了，入职前三天连续加班到夜里十点半没有击倒我，入职一个月内出差两地没有击倒我，或许因为认床而夜夜失眠到凌晨两点没有击倒我，感觉应该小小崩溃的事情都被自己硬生生化解，长大一岁是有一岁的进步哈。也可能是因为喜欢。都行，什么原因都行，结果最重要。
      接下来的每个月，在勇敢切断联系，做G 老师口中的关系终结者 3000。

      4 月先是感受到「离我的灵魂太远了」的朋友，后来发现 maybe 是对方没有灵魂（好傲慢的说法但我很久都没有找到更合适的描述）；发现对方对我没有好奇心，又认为没有好奇心是没有交往的兴趣，光速逃跑了。

      5 月走出 NPD 带来的阴霾，除了头脑活泼外，心灵也重拾了活泼，但在年底才肯重新审视，然后放过自己。
      5 月在高强度见朋友和出去玩，和朋友一起吃饭喝水看日落，感受到幸福。去了天津，去了深圳，去了香港。

      6 月光速结束了和这份工的蜜月期，开始吐槽：
      1.真的好讨厌工作中任意发散的人，我当然知道设计的时候不该只关注本期需求，也知道少用过渡方案，但一定是在衡量时间和成本之后给出一个自认为最好的方案。我拉的讨论会，明确会议主题，收敛好要讨论的事项，能不能别动不动就一步到位寻找通用解法和最优解，事实上很难拥有通用解法，为什么非要给自己上难度？and 请关注一下开发排期啊！如果一步到位所有产品下岗好了，不需要迭代！虽然+1是个好人但是他的做事逻辑真的让我很难受。
      2. 反复在听昨天俩小时的会议，发现前后讨论的事情逻辑都是冲突的，然后我还要搞出方案来，搞不了一点。（但豌豆队长最后还是光速交差了）

      夏天是人生的暑假，6 月就开始好好过暑假了。

      感受到胃口越来越小，但值得庆幸的是还没有损失食欲，吃饭也依旧是能快速修复心情的简易魔法，还是认为”感觉靠吃饭就能收获开心，是一件性价比很高的事情。“

      6 月，结束学习了三年的、关于如何依赖他人的课题，学不会，交白卷，不想学了。觉得照顾人和被照顾这两件事，在我这里就是个单选题，无法被别人照顾于是先下手为强，选择了那个照顾人的角色，也是出自本心，也不是程式化去做，但也不希望别人放在心上，毕竟都是很细小的事情而已，也能根据对方状态调整照顾程度。（不过也有可能我就是有点当妈的天赋，对喜欢的人就天然的关心照顾）

      拥有爱和被爱的能力，但不想爱。但爱上了李昊，深知自己不抓住心动就会错过心动的德性，光速去看了演唱会。（果然爱意不久就消退了）

      7 月因为对太多人有好奇心而困扰，开始因为从没追求过什么而困扰，比如：
      很多东西都是成对出现因果循环的，比如从不追求什么的生活态度带出了松弛，没有非要不可的东西就不会用力，不用力就不会动作变形，不追求姿态就轻盈，表现就松弛，也就没有追求不到的痛苦和追求到了的满足，都是相对的，没有什么好坏。

      开始因为看到了太多而评论，比如：

      这个世界上有能被爱感化的，就有不能被爱感化的；有能被钱收买的，就有多少钱也收买不了的，虽然通常这些都不是二元对立的，但我想表达的是任何一段关系都没有通用解法，在关系里寻求通用模板就是做题思维，这很呆。（但现在想说这又关我什么事，要我点评了吗）

      被误读，继而让我质疑对方有没有看到真的我：
      试试让朋友用几个词来描述你自己，如果你怀疑他们的爱，这能帮你识别出爱；如果你不怀疑，这能让你判断爱的程度。（于是发现确实没有【看到我】）

      8 月开始为睡眠问题困扰，然后一直困扰到 12 月。

      8 月为不断充当各个人的情绪垃圾桶，看见好痛苦三个字开始 PTSD

      想起曾经每天都在对我单向输出痛苦的某人，搞得我后面都要躲着她。 不是没同情心，是能讲的都讲过了，再讲也是车轱辘话，而且对负能量的接收也已经突破我的阈值了。 我始终觉得大家是有选择的，你容许自己沉浸在那样的痛苦里，自己不做任何自救措施，就是不爱自己，没什么别的解释

      心烦之余开始观察发现，发现有些人允许自己一直沉浸在糟糕的情绪里，还有一些人是想哄自己开心但没有这个能力，但无论怎么样，我不愿意付出情绪劳动，或者我不太有这个劳动的能力。

      我宣布一个研究结果：有人就是故意让自己不高兴并且保持不高兴的！原因不详，但结果就是这样。

      拜托他们能不能自己不高兴自己的，别打扰别人啊 ！如果不高兴可以打包出售，感觉他们个个都得是亿万富翁。 

      今年只有一个愿望就是 那些 driven by emotion的人都统统从我生活中消失，给你真诚上贡了老天！

      所以距离产生美是绝对真理，以及倒垃圾这个事就是互相倒才有礼貌。

      8 月本来应该好好过暑假，但在持续讨厌人类，不过还好有喜人奇妙夜、喜剧之王单口季和快乐老友记的美妙周五拯救我一周又一周。

      9 月，认为互不关心的两个人没有继续保持联系，有点难过的走掉了，这次再也不是别人招招手又摇着尾巴走过去的小狗了。

      9 月又开心起来了，因为开始过秋天了，天气变冷了，人非常开心。

      去了大连，早上五点半去爬山。月底去济南再次和朋友烩面，以及和老板恋上鱼烩面。

      理解了选择沉浸痛苦并着重感受痛苦的朋友，和我曾经说的「鸡飞狗跳的环境里会有活着的实感」神奇联动了，靠痛苦来确定微弱的自我的确很痛苦，而不需要确认的我们才是真的自我啊。 

      9 月，好好喝酒、吃饭、骑车、喝小饮料，和自己玩，持续被负能量骚扰到。

      只能处理[自己][简单的]生活烦恼，两个[]缺一不可，但凡少一个关键词我都觉得复杂度倍增，累的要死。

      我是一个负载特别小的人，在工作特别痛苦的那两年，我的解决方案是使劲玩。痛苦的工作日规划行程，周五晚上就沉浸地玩，周一周二回味，周三周四期待，逃避有用的有力代表，于是真切地希望在工作中感到痛苦的人不要思索价值意义，无法停止工作就解决不了根本问题，解决不了就转移注意力，这是我目前能找到的唯一解法。 为什么又在讲这些呢，因为我真的真的真的不想再听到没有具体事件的无意义的痛苦宣泄了。

      10 月，突然和 Notion AI 玩起来了，（被 ta 夸爽了）

      得了一场重感冒，持续了三周还没好利索，没食欲也没情绪，烦得想离开北京（没错，我认为北京需要为我的生病负全责），饭量小得自己害怕，食欲比爱意走的还快（真讨厌生病啊，小病都把我折磨成这样）

      11 月初去青岛拉练，每天都像长征两万五千里。

      11 月，祈祷睡眠，每日祈祷好的睡眠。

      开始无数次思考那个哲学问题：你身处美梦，但当得知这一切都是虚假的时候，你是否愿意醒来回到现实，有点糟糕但是无比真实的现实。并把大家回答这个问题的答案作为一种逻辑正确。（my bad）

      11 月认识了新人，大言不惭的在社交平台上偷说：如果喜欢我不是像呼吸一样简单的事情那一定是对方的问题。

      遇见了能句句有回应的人，开始反思这是不是个简单需求。这是吧，不能因为别人很难做到，就反推这不是个简单需求。

      12 月，疯狂考古自己，发现真是稳定，灵魂稳定需求稳定性情稳定，十年如一日地稳定。

      稳定的不读空气：

      一个健康的成年人应该清晰地表达自己的需求，另一个人则需要尊重对方的表达。

      比如我爹，当我提出要他来看演唱会的时候，他说了不想看，所以哪怕我很想，也要尊重他的意愿，而不去揣测他是为了什么不来，也不自作主张买了票倒逼他来，不干这些自我感动的事情，哪怕他的深层需求就是想来但碍于其他原因拒绝，那也是他的选择。

      我只管理提到明面上的具体需求，剩下的都是别人的事情，想要就讲，我永远不猜。

      稳定地在早睡联盟里做盟主，甚至因为连续好几晚熬夜这种事情和罪魁祸首生大气。

      稳定地勇敢接受一切灼伤：
      之前讲我身上带着一些城市给的烙印，但逐渐发现在罪孽深重的关系里，对方也会给我留下一些烙印，无论是精神上还是身体上，比如给自己建设起来更高的心理防线，比如虽然不是不能接受外面穿了一天的衣服上床，但还是会选择回到家先洗澡换好衣服再上床，但没关系，接受一切烙印，如果真的烫到我了，那就自己慢慢疗愈。

      稳定地感受到孤独，难以相信别人的爱，但自己又是诚心在爱别人。

      稳定地爱拉远心理距离：发现拉远心理距离后，我的耐心会率先出走，以及划清楚清晰的心理边界后很难再被打破，或者自己很难再愿意打破。

      稳定地会突然看到对方的肤浅然后失去继续交往的兴趣。

      其实还有别的，但不想说了，所以就先这样吧。

    `,
    date: '2024-12-30',
    category: ' 年终总结',
    readTime: '15 min',
    coverImage: ''
  },
    {
    id: '2',
    groupId: '2',
    lang: 'en',
    title: 'Starting from the next second',
    excerpt: '',
    content: `
      I’ve never written a year-end review—I don’t even like writing them. But I love the New Year. I love the illusion that one can simply start life over. I love the daydreaming, the reckless planning before anything has actually begun, and the indulgence in dreams that require no accountability.
 
    `,
    date: '2024-12-30',
    category: ' 年终总结',
    readTime: '15 min',
    coverImage: ''
  },
];


