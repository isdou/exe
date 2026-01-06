import { TravelSpot } from './types';

/**
 * ============================================================
 * 轨迹数据库 (Temporal & Spatial Archive)
 * ============================================================
 */
export const MOCK_TRAVEL: TravelSpot[] = [

  { 
    id: '1', 
    city: '东京', 
    coordinate: '35.6895° N, 139.6917° E', 
    lat: 35.6895, lng: 139.6917,
    date: '2025.11', 
    description: '在大雨中的新宿站，寻找某种不属于这个时代的寂静。霓虹灯影在积水中破碎', 
    images: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200'] 
  },
  { 
    id: '2', 
    city: '米兰', 
    coordinate: '45.4642° N, 9.1900° E', 
    lat: 45.4642, lng: 9.1900,
    date: '2025.10', 
    description: '马尔彭萨机场是重返国内信号前的最后一道缓存', 
    images: ['https://images.unsplash.com/photo-1520440229334-962aee48ccec?q=80&w=1200'] 
  },
  { 
    id: '3', 
    city: '巴黎', 
    coordinate: '48.8566° N, 2.3522° E', 
    lat: 48.8566, lng: 2.3522,
    date: '2025.10', 
    description: '塞纳河左岸的盛宴从未结束，浪漫是唯一不需要通过逻辑校验的溢出。', 
    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200'] 
  },
  { 
    id: '4', 
    city: '柏林', 
    coordinate: '52.5200° N, 13.4050° E', 
    lat: 52.5200, lng: 13.4050,
    date: '2025.10', 
    description: '工业节拍下的电子乐，是这座城市跳动的硬件层。在米特区的涂鸦里，历史的残留信号依然在强力干扰着未来。', 
    images: ['https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=1200'] 
  },
  { 
    id: '5', 
    city: '德累斯顿', 
    coordinate: '51.0504° N, 13.7373° E', 
    lat: 51.0504, lng: 13.7373,
    date: '2025.10', 
    description: '易北河畔的巴洛克逻辑。即便被摧毁并重写过，那股属于古典时代的确定性依然在瓦砾中完成了自愈。', 
    images: ['https://images.unsplash.com/photo-1588693951525-63523533475f?q=80&w=1200'] 
  },
  { 
    id: '6', 
    city: '海德堡', 
    coordinate: '49.4122° N, 8.7040° E', 
    lat: 49.4122, lng: 8.7040,
    date: '2025.09', 
    description: '在哲学小径上进行一次彻底的内心 Debug。城堡的残垣断壁不是错误代码，而是时光留下的必要空白。', 
    images: ['https://images.unsplash.com/photo-1518175003310-82786676839a?q=80&w=1200'] 
  },
  { 
    id: '7', 
    city: '上海', 
    coordinate: '31.2304° N, 121.4737° E', 
    lat: 31.2304, lng: 121.4737,
    date: '2024.12', 
    description: '高并发、高算力的城市节点。在陆家嘴的霓虹里，所有的情感都被抽象成了资本流动的实时频率。', 
    images: ['https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=1200'] 
  },
  { 
    id: '8', 
    city: '北京', 
    coordinate: '39.9042° N, 116.4074° E', 
    lat: 39.9042, lng: 116.4074,
    date: '2024.08', 
    description: '系统的根节点。在宏大的权力中轴线上，每一个个体都像是被古老契约加密过的细微波形。', 
    images: ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200'] 
  },
  { 
    id: '9', 
    city: '青岛', 
    coordinate: '36.0667° N, 120.3833° E', 
    lat: 36.0667, lng: 120.3833,
    date: '2021.04', 
    description: '红瓦绿树间的咸腥味。浪花在礁石上破碎，像是某种永远无法完成闭环的逻辑循环。', 
    images: ['https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1200'] 
  },
  { 
    id: '10', 
    city: '大理', 
    coordinate: '25.6065° N, 100.2676° E', 
    lat: 25.6065, lng: 100.2676,
    date: '2023.08', 
    description: '逃离系统的逻辑，在这里重启大脑。苍山洱海间的理性留白，是算法世界里无法模拟的自由自由。', 
    images: ['https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1200'] 
  },
  { 
    id: '11', 
    city: '西双版纳', 
    coordinate: '22.0084° N, 100.7972° E', 
    lat: 22.0084, lng: 100.7972,
    date: '2023.02', 
    description: '热带的高温在液化一切规则。在雨林的湿度中，都市积攒的焦虑因过度受潮而无法被正常点火。', 
    images: ['https://images.unsplash.com/photo-1589133827943-264639999088?q=80&w=1200'] 
  },
  { 
    id: '12', 
    city: '乌兰察布', 
    coordinate: '41.0234° N, 113.1325° E', 
    lat: 41.0234, lng: 113.1325,
    date: '2023.07', 
    description: '降落在火星表面。火山坑边缘的寂静，是没有任何信号干扰的原生场，适合进行一次全系统的冷备份。', 
    images: ['https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1200'] 
  },
  { 
    id: '13', 
    city: '香港', 
    coordinate: '22.3193° N, 114.1694° E', 
    lat: 22.3193, lng: 114.1694,
    date: '2024.11', 
    description: '极其拥挤的存储空间。在维港的赛博光影下，所有的怀旧都像是一段经过数码修复的残缺代码。', 
    images: ['https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=1200'] 
  },
  { 
    id: '14', 
    city: '深圳', 
    coordinate: '22.5431° N, 114.0579° E', 
    lat: 22.5431, lng: 114.0579,
    date: '2025.01', 
    description: '这里的空气里都飘着硬件的味道。无数的梦境在流水线上被组装、打包、发送，效率是这里最高的图腾。', 
    images: ['https://images.unsplash.com/photo-1544026364-924ee184d081?q=80&w=1200'] 
  },
  { 
    id: '15', 
    city: '广州', 
    coordinate: '23.1291° N, 113.2644° E', 
    lat: 23.1291, lng: 113.2644,
    date: '2024.03', 
    description: '在老城区的烟火气中寻求和解。肠粉店的蒸汽是这个系统里最温顺的补丁，修补着忙碌带来的磨损。', 
    images: ['https://images.unsplash.com/photo-1518045601551-53648172109e?q=80&w=1200'] 
  },
  { 
    id: '16', 
    city: '南京', 
    coordinate: '32.0603° N, 118.7969° E', 
    lat: 32.0603, lng: 118.7969,
    date: '2022.06', 
    description: '秦淮河的波光带有一种迟缓的带宽。历史在这里反复重写，旧梦被压制在现代建筑的基石之下。', 
    images: ['https://images.unsplash.com/photo-1541604193435-22287d32c2c2?q=80&w=1200'] 
  },
  { 
    id: '17', 
    city: '济南', 
    coordinate: '36.6512° N, 117.1201° E', 
    lat: 36.6512, lng: 117.1201,
    date: '2021.05', 
    description: '泉水在地下沉默地运算。这种古老的、清澈的流动，是这座城市在喧嚣中保留的一块不被打扰的缓存。', 
    images: ['https://images.unsplash.com/photo-1598162295222-777c08271a2c?q=80&w=1200'] 
  },
  { 
    id: '18', 
    city: '昆明', 
    coordinate: '24.8801° N, 102.8329° E', 
    lat: 24.8801, lng: 102.8329,
    date: '2023.08', 
    description: '恒温的舒适圈。在这里，季节的迭代变得极度平滑，仿佛时间在这里失去了一部分颗粒感。', 
    images: ['https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1200'] 
  },
  { 
    id: '19', 
    city: '首尔', 
    coordinate: '37.5665° N, 126.9780° E', 
    lat: 37.5665, lng: 126.9780,
    date: '2024.03', 
    description: '在高密度的数字娱乐信号中穿行。汉江边的冷风尝试侵蚀碳基生物的体温，而街道上的显示屏正刷新着虚拟偶像的生存带宽。在这里，美学被精算成了一套极致的工业标准，所有的容貌都像是经过完美对齐的 UI 组件库。', 
    images: ['https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1200'] 
  }
];