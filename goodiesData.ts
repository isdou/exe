
import { GoodieItem } from './types';

export const GOODIES_DATA: GoodieItem[] = [
  // 
  {
    id: 'eat_01',
    name: '宇治抹茶生巧克力',
    category: 'eat',
    description: '孤单时刻的血清素补充剂，冷藏后口感像丝绸一样滑过舌尖。',
    image: 'images/matcha-choco.jpg',
    price: '¥65',
    reason: 'Mood Booster',
    recordDate: '2025-03-25'
  },
  {
    id: 'drink_01',
    name: 'Blue Bottle Coffee Beans',
    category: 'drink',
    description: 'Bella Donovan Blend. 即使是速溶时代，也要保留磨豆子时的那两分钟仪式感。',
    image: 'images/coffee.webp',
    price: '¥128',
    reason: 'Daily Ritual',
    recordDate: '2025-03-26'
  },
  {
    id: 'buy_01',
    name: 'HHKB Professional Hybrid',
    category: 'buy',
    description: '静电容键盘的手感是会上瘾的。它不是工具，是手指的延伸。',
    image: 'images/keyboard.png',
    price: '¥2300',
    reason: 'Productivity',
    recordDate: '2025-03-27'
  }
];
