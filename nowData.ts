import { NowUpdate } from './types';

/**
 * ============================================================
 * 实时脉冲数据库 (Now/Live Frequency Database)
 * ============================================================
 * 在这里更新你最近的状态、想法或正在做的事情。
 * id: 唯一标识
 * timestamp: 时间戳（建议格式 YYYY-MM-DD HH:mm）
 * status: 状态标签（如 CODING, READING, THINKING, TRAVELING）
 * content: 具体内容
 * ============================================================
 */
export const UPDATES: NowUpdate[] = [
  {
    id: '1',
    timestamp: '2025-12-27 22:15',
    content: '背挺直一点，声音大一点。',
    status: 'THINKING'
  },
  {
    id: '2',
    timestamp: '2024-11-20 10:30',
    content: '重温《银魂》红樱篇。即便灵魂支离破碎，也要为了守护那一抹银色而战斗到底。',
    status: 'READING'
  },
  {
    id: '3',
    timestamp: '2024-11-15 01:00',
    content: '深夜的逻辑总是比白天清晰。构建系统，是整理世界唯一的手段。',
    status: 'THINKING'
  },
  {
    id: '4',
    timestamp: '2024-11-10 18:00',
    content: '开始尝试在网站中引入本地图片管理逻辑，解决 public 文件夹的路径问题。',
    status: 'SYSTEM'
  }
];