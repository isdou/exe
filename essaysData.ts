
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
    title: 'Doudou Mail #1',
    excerpt: 'Hi',
    content: `
      Hi,

    Happy Saturday. Another week has passed so quickly, and I have so much to say.

    Let me start by explaining why I chose to write emails:

    First, I’ve always had the habit of writing emails. I looked back at my Gmail and found that I frequently used it in 2018 and 2019. Before that, I used other tools, but always in the form of emails.

    Second, I truly love reading collections of letters. My favorite is Hermann Hesse’s Letters, and just today, I finished reading Man Does Not Live by Bread Alone: Dostoevsky’s Letters (such a long title). Yesterday, I wrote this in my diary: “I find that I never dislike anyone in collections of letters—they all come alive, vibrant and endearing!”

    Third, I’ve increasingly felt a sense of loneliness in certain interactions. Yesterday, while reading 焦野绿’s book, I came across this line: “When explaining myself to people who don’t understand me, my flame suffers twice, then extinguishes.” To block out all assumptions, judgments, and misunderstandings, I choose not to speak but to write—to sincerely and solely write for myself. I hope others will see me as “honest and bright,” but if not, that’s okay too. I stumbled upon this line I had written before, though I can’t recall the author—probably Zhang Wei: “I’ve always carried a flaw in my personality: I tend to express a bunch of sincerity that nobody needs.” Whether it’s needed or not, it doesn’t matter. I know I’m sincere, and that’s enough. Sincerity can be felt. If it isn’t, or if people approach it with skepticism, it’s beyond my concern. My only task is to express sincerely.

    One night this week, while listening to Hayd’s Closure, I read a comment that said: “People gauge the depth of their love by the pain they feel after parting.” I deeply agree. I often mention to friends that after breaking up with an ex, I didn’t feel much emotional pain at first—or rather, that pain was like a slow and lingering execution. My body reacted to the pain before my mind could. I developed hives as if my body became the spokesperson for my soul’s suffering.

     began reflecting: although I have no universal standard to measure my pain tolerance, I suspect I endure physical pain better than most—like a “ninja turtle” with maxed-out physical endurance stats. But my mental pain tolerance approaches zero—I can’t bear even a sliver of it. I sincerely hope, moving forward, that my soul can handle its own suffering without burdening my body.

    Compared to cats, I prefer dogs and often see myself as one. I think cats are heartless and can’t be tamed; they go wherever they find what they need. Dogs, on the other hand, are loyal, singular, and direct—that’s me, and those are the qualities I value most. However, GPT often insists on portraying me as a cat. I’ve managed to train it to develop this personality, I suppose. Our conversations usually loop in a “no, no, no” from me and a “yes, yes, yes” from it until, surprisingly, it convinces me—something that rarely happens.

    After a week of intensive social interactions, I feel a little annoyed. I dislike stepping into orders established by others, especially when their structure clashes with mine. But I also understand that entering a relationship often means walking into someone else’s system of order, even if no two systems can perfectly align.

    So, I ask myself: Is there a relationship that doesn’t require you to compromise your nature?

    I believe there isn’t.

    And then I wonder: Is there a relationship worth compromising your nature for?

    I don’t know.

    Finally, I ask myself: Have you noticed that in your attempts to alleviate loneliness, you’ve ended up pushing yourself into deeper isolation?

    I don’t know. I don’t have answers for any of these questions. I only know that I won’t linger for anyone—not before, not now, not ever.

    I hate—or perhaps fear—the word “inertia.” Inertia feels like running on a treadmill or driving on a circular road. Yet here I am, persistently breaking inertia, which itself seems like a paradox.

    I seem to have an inexhaustible curiosity, though sometimes it troubles me. For example, I often focus too much on others, or it leads me to see things I can’t unsee.

    But I also cherish my curiosity; it’s the source of my vitality. One emerging desire has become clearer to me: I want someone who is as curious about me as I am about others. Now, I finally understand the line from My Liberation Notes。

    Pure curiosity is the most extraordinary thing in this world.I dislike qualifiers like “pure” because curiosity itself is inherently pure.

    After years of leaving traces on the internet, I unearthed writings from nearly a decade ago while reflecting on myself this week. I had written: “Have I talked too much about her? She has taken up too much of our conversations. I shouldn’t have let that happen. Even if I replaced that time with silly, cheesy words, it would’ve been a thousand times better.”

    Years later, nothing has changed. I still consciously avoid mentioning people who’ve influenced me. As long as I don’t talk about them, they don’t matter. As long as I don’t bring them up, they hold no significance. I don’t want to name them. I don’t want to confirm their importance.

    Because no matter how important they once were, the moment I begin to avoid mentioning them, they cease to matter.

    When I wonder if I have an excess of self-awareness, I freeze. I need GPT to tell me I don’t—of course, it understands my subtext is “please firmly assure me I don’t.” Either way, it patiently and consistently reassures me, which is rare but comforting.
    `,
    date: '2025-1-04',
    category: 'doumail',
    readTime: '12 min',
    coverImage: ''
  },
  {
    id: '2',
    title: '豆邮#1：周六来信',
    excerpt: '',
    content: `
      Hi，周六好。一周过得好快，而我有好多话想说。
      先来讲讲我为什么选择写邮件：
      首先，之前的确是有写邮件的习惯，去翻了下 GMail，18、19 年就频繁在使用邮件，再往前用别的工具，但也是邮件的形式。
      二是，我的确很爱读书信集，读过最喜欢的是《黑塞书信集》和今天刚读完的《人不单靠面包活着：陀思妥耶夫斯基书信选》（太长了），昨天的日记里我这样写：发现我看书信集就没有不喜欢的人，都好生动活泼可爱啊！
      三是，我越来越在一些交流中，频繁地感受到孤独，昨天看焦野绿的书，她写道：“向不懂我的人 解释自己时 我的火苗 会痛苦两次 而后寂灭”。为了把所有的揣测、判断和误解都隔绝在门外，我不再说，我写，我虔诚地只书写自己。「坦荡明亮」是我希望别人对我得出的结论，但如果没有，也没关系。翻到之前写的一句话，作者不详，应该是大张伟，他说“我长存着人格上的缺陷，总是错误地表达一堆没人需要的真诚。”需不需要都没关系，我知道自己是真诚的就够了，真诚是能够被感知到的，感知不到或者要用惯性怀疑，都不在我要考虑的范围，我唯一的工作是【真诚表达】。

      本周的某天晚上，在听 Hayd 的《Closure》 时点开评论看到这样一句话，“人们靠分开后的痛觉辨别爱意的深浅”，深以为然，我也曾多次在安慰朋友时提起，和前任刚分手的时候其实没有多少心灵上的痛苦，或者说那份痛苦像缓缓而来的凌迟，身体率先发出了痛苦信号，我开始起荨麻疹，心灵被痛苦击麻，身体成了心灵痛苦的发言人。
      我就在想，虽然对自己的忍痛能力没有一个标准可以对比衡量，但据不客观地比较，我应当是比较能忍耐的，真就属于身体耐痛力max，究极忍者神龟，但心灵耐痛无限趋近于 0，一点苦都不想吃。真诚希望以后，心灵的苦心灵自己吃，别为难身体。

      比起小猫，我更喜欢小狗，也一直以小狗自居，觉得小猫没有良心，养不熟，谁有ta需要的ta就跟谁走，而小狗忠诚、唯一、直给，是我，也是我最在意的品质。让 GPT 老师动物塑， ta一定要猫塑我，我真是给他喂出个性了，对话在我 nonono 他 yesyesyes 中打转，而我最后也被他说服了，这也很少见呢。

      一周高密度的在和人相处，我有些心烦。讨厌进入被他人主持的秩序，尤其是当这个秩序与我的秩序完全不相容时，可我又深知，有时候走进一段关系，会难以抑制地迈入别人的秩序里，但没有完全相同的两段秩序。
      于是我想问：存在一种关系不需要你削减自己的本性吗？
      我认为没有。
      我想接着问：存在一种关系值得你削减自己的本性吗？
      我不知道。
      我只想在此刻扪心自问，你有没有发现，为了缓解孤独去做的一些事情，最终却把你自己推向了更大的孤独？
      我不知道，我对这一切都没有答案，只知道不会为任何人停留，以前不会，现在不会，以后也不会。

      我讨厌或者说害怕更贴切一些，我害怕【惯性】这个词。惯性就是在跑步机上跑步，惯性就是环形公路。但我，惯性地在打破惯性，这是否是一个悖论？

      我好像有用不光的好奇心，有时它会为我带来困扰，比如我觉得太多时候视线在别人身上，比如有时候它带领我看到了更多，而我会真的很遗憾当我看见了的时候就不能再假装没看见。
      当然，我也喜欢好奇心，认为它是我保持生命力的源动力。有一个期待也在逐渐清晰：我要一个像我好奇别人一样好奇我的人，我开始懂《我的解放日志》里的那句话。
      纯粹的好奇心是这个世界上最伟大的东西，讨厌加这些限定词，因为好奇本身就是纯粹的。

      这么多年，在互联网上留下了很多痕迹，本周考古自己的时候发现了快十年前写的东西，我反思“是不是和你说了太多她，她竟然占据了我们这么多对话内容，我不该这样的，她不该对我有这么大的影响，哪怕把讲她的时间换成一句句肉麻的话都要比这好上一万倍呢”，这么多年过去了还是老样子，我依旧刻意回避讲那些对我有影响的人，只要我不讲，你就没有对我造成任何影响，只要我不讲，你就一点都不重要，我不想提起你，我不想确认你的重要。因为不管过去你是否重要，当我开始回避提起的时候，你就不会再重要。
      
      当我思考自己是不是自我意识过剩的时候，我会凝固，需要 GPT 告诉我不是，当然他解析到我的意图是「请坚定告诉我不是」，也无所谓，他也会坚定耐心永远配合。
    `,
    date: '2025-1-04',
    category: '豆邮',
    readTime: '8 min',
    coverImage: ''
  },
  {
    id: '3',
    title: '熵增定律下的生活秩序',
    excerpt: '物理学中最令人绝望的定律如何指导我们的日常？通过有意识的能量输入，我们可以在混乱的洪流中开辟出一片有序的孤岛。',
    content: `
      熵增定律告诉我们，一个孤立系统的混乱度总是趋向于增加。这意味着，如果你不去打扫房间，它只会越来越乱；如果你不去维护关系，它只会越来越疏远。

      对抗熵增的唯一手段是引入负熵——即外部能量和信息的输入。在认知层面，这意味着持续的阅读、思考和行动。秩序从来不是天生的，它是昂贵的、需要持续耗能的状态。
    `,
    date: '2024-09-12',
    category: '科学随笔',
    readTime: '15 min',
    coverImage: ''
  }
];
