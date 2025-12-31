
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
    date: '2024.05', 
    description: '在大雨中的新宿站，寻找某种不属于这个时代的寂静。霓虹灯影在积水中破碎，逻辑在这一刻变得潮湿。去歌舞伎町寻找万事屋的影子。', 
    images: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200'] 
  },
  { 
    id: '2', 
    city: '冰岛', 
    coordinate: '64.9631° N, 19.0208° W', 
    lat: 64.9631,
    lng: -19.0208,
    date: '2023.12', 
    description: '在世界尽头，与荒芜达成和解。冰川的裂缝是地球的指纹，寒冷让思考变得清澈见底。极地的冷冽最符合 INTJ 的审美。', 
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
    city: '伦敦', 
    coordinate: '51.5072° N, 0.1276° W', 
    lat: 51.5072,
    lng: -0.1276,
    date: '2023.04', 
    description: '泰晤士河边的迷雾笼罩着维多利亚时代的余晖。在古老与现代的缝隙中，捕捉时间的非线性流逝。秩序与混沌的交响。', 
    images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200'] 
  },
];
