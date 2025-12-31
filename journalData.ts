import { JournalEntry } from './types';

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();

export const MOCK_JOURNAL: JournalEntry[] = [

  // 你可以手动在这里添加更多“历史数据”，它们会根据日期自动显示
  {
    id: 'j-2025-01-01',
    year: 2025,
    month: 1,
    day: 1,
    content: '新年快乐。',
    mood: 'New'
  },
   {
    id: 'j-2025-07-30',
    year: 2025,
    month: 7,
    day: 30,
    content: '29 岁生日快乐。',
    mood: 'Birthday'
  },
  {
    id: 'j-2026-01-01',       // 唯一ID，随便写，别重复就行
    year: 2022,               // 年份
    month: 1,                // 月份
    day: 1,                  // 日期
    content: 'Hi,2026。', // 日记内容
    mood: 'Melancholy'        // (可选) 当时的心情标签
  },
];