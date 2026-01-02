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
    id: 'j-2026-01-04',
    year: 2026,
    month: 1,
    day: 4,
    content: `
      
    `,
    mood: 'DouMail'
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
      所以，新的一年，我决定：
      摒弃所有服务/APP，回归自己的网站，把所有内容都塞进自己的电子日记。
      到年底就有自己的专属报告了。
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
];