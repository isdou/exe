
import { GoodieItem } from './types';

/**
 * ============================================================
 * 好物清单数据库 (Goodies Database)
 * ============================================================
 */
export const MOCK_GOODIES: GoodieItem[] = [
  {
    id: 'g1',
    name: 'Single Origin Espresso',
    category: 'drink',
    description: '来自埃塞俄比亚的浅烘焙豆子，带有明亮的柑橘酸和茉莉花香。',
    reason: '早起强制唤醒大脑系统的唯一合法手段，逻辑重启的燃料。',
    image: 'https://images.unsplash.com/photo-151097252790b-af4f42df5e4a?q=80&w=800',
    price: '¥88 / 250g'
  },
  {
    id: 'g2',
    name: 'HHKB Professional Hybrid',
    category: 'buy',
    description: '静电容键盘，静谧的打字音，极简的布局。',
    reason: '码农的木刀。虽然上手有门槛，但一旦习惯，那种指尖在云端起舞的感觉是无价的。',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800',
    price: '¥2499'
  },
  {
    id: 'g3',
    name: '宇治抹茶生巧克力',
    category: 'eat',
    description: '苦涩与甜蜜的精准平衡。',
    reason: '低血糖时的血清素补充剂，冷藏后口感像丝绸一样滑过舌尖。',
    image: 'https://images.unsplash.com/photo-1549007994-cb92ca714503?q=80&w=800',
    price: '¥65'
  },
  {
    id: 'g4',
    name: 'Aesop Hwyl 香水',
    category: 'buy',
    description: '柏树、乳香、苔藓，仿佛置身于被雨水打湿的日本古老森林。',
    reason: '一种带有哲理的香味，让我在人群中保持边界感，是我无形的个人领域。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800',
    price: '¥950'
  }
];
