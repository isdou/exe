// 文件: isdou_exe/journalData.ts (新建文件)
import { JournalEntry } from './types';

// 获取当前日期，确保演示时一定有数据显示
const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();

export const MOCK_JOURNAL: JournalEntry[] = [
  // 模拟：2023年的今天
  {
    id: 'j-2023',
    year: 2023,
    month: currentMonth,
    day: currentDay,
    content: '刚开始学习 React，觉得组件化思维很有意思。像是在搭积木，但积木的逻辑需要自己写。今天吃了很好吃的咖喱。',
    mood: 'Curious'
  },
  // 模拟：2024年的今天
  {
    id: 'j-2024',
    year: 2024,
    month: currentMonth,
    day: currentDay,
    content: '重构了去年的代码，简直是一坨... 现在的我看去年的我，果然是成长的证明。今天还是吃了咖喱，但我学会了加黑巧克力增稠。',
    mood: 'Reflective'
  },
  // 模拟：另一天的历史数据（用于测试切换日期）
  {
    id: 'j-old-1',
    year: 2024,
    month: 1,
    day: 1,
    content: '新年快乐。今年的目标是系统化我的生活。',
    mood: 'Determined'
  }
];