
import { TravelSpot } from './types';

/**
 * ============================================================
 * 旅行轨迹数据库 (Travel Database)
 * ============================================================
 */
export const MOCK_TRAVEL: TravelSpot[] = [
  { 
    id: '1', 
    city: '东京', 
    coordinate: '35.6895° N, 139.6917° E', 
    lat: 35.6895,
    lng: 139.6917,
    date: '2025.11', 
    description: '在大雨中的新宿站，寻找某种不属于这个时代的寂静。霓虹灯影在积水中破碎，逻辑在这一刻变得潮湿。去歌舞伎町寻找万事屋的影子。', 
    images: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200'] 
  },
  { 
    id: '2', 
    city: '青岛', 
    coordinate: '36.04° N, 120.23° W', 
    lat: 36.0667,
    lng: 120.3833,
    date: '2021.4', 
    description: '浪花在礁石上破碎，时光在这一刻变得潮湿', 
    images: ['https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1200'] 
  },
  { 
    id: '3', 
    city: '大理', 
    coordinate: '25.6065° N, 100.2676° E', 
    lat: 25.6065,
    lng: 100.2676,
    date: '2023.08', 
    description: '逃离系统的逻辑，在这里重启大脑。洱海的水平线是唯一的规则，云层的变幻是未被编码的自由。苍山洱海间的理性留白。', 
    images: ['https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1200'] 
  },
  {
  id: '4',
  city: '柏林',
  coordinate: '52.5200° N, 13.4050° E',
  lat: 52.5200,
  lng: 13.4050,
  date: '2025.10',
  description: '历史的涂鸦在雨中晕染，意义在这一刻变得潮湿。去米特区寻找画廊与旧工厂的影子，电子乐的节拍里震颤着工业的骨架。',
  images: ['https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=1200']
  },
  {
    id: '5',
    city: '巴黎',
    coordinate: '48.8566° N, 2.3522° E',
    lat: 48.8566,
    lng: 2.3522,
    date: '2024.05',
    description: '去左岸的咖啡馆寻找流动的盛宴与未完成的诗稿，空气里混合着拿铁的香气与旧书的尘埃。',
    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200']
  },
];
