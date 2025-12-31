
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
    title: 'doudou mail01',
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
    title: '后现代荒诞：为什么我们依然需要银魂',
    excerpt: '在一切宏大叙事都崩塌的时代，坂田银时那种“在泥潭里翻滚也要守护尊严”的生活方式，或许是最后的救赎。生活就是不断的失去，但你要握紧那把木刀。',
    content: `
      《银魂》的魅力在于它揭示了一个真相：英雄主义并不总是穿着红披风拯救地球。更多时候，英雄主义是即使在房租都交不起、宿醉未醒、生活一团糟的情况下，依然能够为了一个素不相识的邻居，或者一根已经坏掉的巧克力棒，去拼尽全力。

      坂田银时是一个典型的“后现代英雄”。他没有那种要改变世界的宏大志愿，他只想守住自己眼前那一亩三分地的安宁。这种“守护”往往伴随着吐槽、懒散和各种不着调的行为，但在关键时刻，那把名为“洞爷湖”的木刀却比任何真剑都要锋利。

      在消费主义盛行、意义感缺失的今天，我们都像是在废墟中寻找银色光辉的观测员。
    `,
    date: '2024-10-05',
    category: '文化解析',
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
