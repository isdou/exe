
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
    reason: 'Mood Booster'
  },
  {
    id: 'drink_01',
    name: 'Blue Bottle Coffee Beans',
    category: 'drink',
    description: 'Bella Donovan Blend. 即使是速溶时代，也要保留磨豆子时的那两分钟仪式感。',
    image: 'images/coffee-beans.jpg',
    price: '¥128',
    reason: 'Daily Ritual'
  },
  {
    id: 'buy_01',
    name: 'HHKB Professional Hybrid',
    category: 'buy',
    description: '静电容键盘的手感是会上瘾的。它不是工具，是手指的延伸。',
    image: 'images/keyboard.jpg',
    price: '¥2300',
    reason: 'Productivity'
  },

  // 👇 2026-01-02 新增：DINING 模块的数据
  {
    id: 'd01',
    name: '肉骨茶',
    category: 'dining', // 👈 标记为探店
    restaurant: '马来西亚餐厅', // 👈 餐厅名
    cuisine: '马来西亚',     // 👈 菜系
    price: '¥78',
    description: '店里的招牌肉骨茶',
    reason: '不是很喜欢，主要是不太适应汤的味道',
    image: 'images/rougucha.jpg', // 
  }, // 
  {
    id: 'd02',
    name: '小炒黄牛肉',
    category: 'dining',
    restaurant: '赣江里',
    cuisine: '江西菜',
    price: '¥88',
    description: '第一次发现里面有橘子皮',
    reason: '太下饭了',
    image: 'images/xiaochaohuangniurou.jpg',
  }
];
