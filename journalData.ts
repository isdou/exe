import { JournalEntry } from './types';

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();

export const MOCK_JOURNAL: JournalEntry[] = [
  {
    id: 'j-2023',
    year: 2023,
    month: currentMonth,
    day: currentDay,
    content: '开始尝试记录生活。发现大部分时间其实都在处理琐事，只有深夜是属于自己的。',
    mood: 'Start'
  },
  {
    id: 'j-2024',
    year: 2024,
    month: currentMonth,
    day: currentDay,
    content: '又到了这一天。回看去年的记录，心态已经完全不同了。这就是所谓的螺旋上升吗？',
    mood: 'Loop'
  },
  // 你可以手动在这里添加更多“历史数据”，它们会根据日期自动显示
  {
    id: 'j-demo-1',
    year: 2022,
    month: 1,
    day: 1,
    content: '新年快乐。',
    mood: 'New'
  }
];