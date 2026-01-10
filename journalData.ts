import { JournalEntry } from './types';

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();

export const MOCK_JOURNAL: JournalEntry[] = [

  // 你可以手动在这里添加更多“历史数据”，它们会根据日期自动显示
  {
    id: 'j-2027-01-01',
    year: 2027,
    month: 1,
    day: 1,
    content: '只是展示效果。',
    mood: 'New'
  },

  {
    id: 'j-2026-01-01',       // 唯一ID，随便写，别重复就行
    year: 2026,               // 年份
    month: 1,                // 月份
    day: 1,                  // 日期
    content: `
      Hi,2026
      年度报告相继送达的时候，我的失望也不断叠加，尤其是豆瓣，我翘首期盼了一整年的报告，最后得到这样一份敷衍的报告，还是很失望的。
      但毕竟这是豆的一年，不是瓣的一年，豆想要更细致更精细的报告还是自力更生吧。
      所以，新的一年，我决定：摒弃所有服务/APP，回归自己的网站，把所有内容都塞进自己的电子日记。到年底就有自己的专属报告了。
      怀着这样的心情，网站在今天上线了！💛
    `,// 日记内容
    mood: 'Melancholy'        // (可选) 当时的心情标签
  },
  {
    id: 'j-2026-01-02',       // 唯一ID，随便写，别重复就行
    year: 2026,               // 年份
    month: 1,                // 月份
    day: 2,                  // 日期
    content: `
      人寻找的connection其实就是一种相似吧，但“你理解我在说什么，更理解我为什么这么说”对我来说才是真正的连接。
    `,// 日记内容
    mood: 'Patient'        // (可选) 当时的心情标签
  },
    {
    id: 'j-2026-01-03',       // 唯一ID，随便写，别重复就行
    year: 2026,               // 年份
    month: 1,                // 月份
    day: 3,                  // 日期
    content: `
       睡前想要醒来卤牛肉，只开了一条窗户缝用来通风的厨房是天然的冷藏层，吃完之前都不担心会坏掉，睡醒起来又懒得做了。
    `,// 日记内容
    mood: 'Lazy'        // (可选) 当时的心情标签
  },
  {
    id: 'j-2026-01-04',       // 唯一ID，随便写，别重复就行
    year: 2026,               // 年份
    month: 1,                // 月份
    day: 4,                  // 日期
    content: `
        无望的等待是世界上最残忍的事情之一
    `,// 日记内容
    mood: 'Lazy'        // (可选) 当时的心情标签
  },
    {
    id: 'j-2026-01-05',       // 唯一ID，随便写，别重复就行
    year: 2026,               // 年份
    month: 1,                // 月份
    day: 5,                  // 日期
    content: `
        明白了为什么Line of Duty 是英国人的春晚，世界上怎么有这么有才华的编剧...
    `,// 日记内容
    mood: '小寒'        // (可选) 当时的心情标签
  },
    {
    id: 'j-2026-01-06',       
    year: 2026,               
    month: 1,                
    day: 6,                  
    content: `
        今天点了 Cotti 的咸法酪香草拿铁，半糖（竟然只有全糖和半糖的选项），没有一点香草味且非常之甜，再也不会上 Cotti 的当了。
    `,// 日记内容
    mood: '-'        // (可选) 当时的心情标签
  },
    {
    id: 'j-2026-01-07',       
    year: 2026,               
    month: 1,                
    day: 7,                  
    content: `
        你想获得谁的认同，就是在受谁的奴役。
    `,// 日记内容
    mood: '-'        // (可选) 当时的心情标签
  },
  {
    id: 'j-2026-01-08',       
    year: 2026,               
    month: 1,                
    day: 8,                  
    content: `
        没有任一种解释能下达到所有人，再简单体贴的解释都对听者有要求。
    `,// 日记内容
    mood: 'Chase'  
  },
  {
    id: 'j-2026-01-09',       
    year: 2026,               
    month: 1,                
    day: 9,                  
    content: `
         和🐰在亚运村吃了很好吃的烧麦！
    `,// 日记内容
    mood: 'friend'  
  },
  {
    id: 'j-2026-01-10',       
    year: 2026,               
    month: 1,                
    day: 10,                  
    content: `
         Vibe coding is the best
    `,// 日记内容
    mood: 'friend'  
  },
];