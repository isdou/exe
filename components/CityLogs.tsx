
import React from 'react';
import { Footprint } from '../types';

const MOCK_CITIES: Footprint[] = [
  { id: '1', city: '东京', description: '去歌舞伎町寻找万事屋的影子，在繁华中感受某种宏大的寂寞。', date: '2024.05', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2070&auto=format&fit=crop' },
  { id: '2', city: '大理', description: '苍山洱海间的理性留白。在这里，时间仿佛失去了刻度。', date: '2023.12', image: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=2070&auto=format&fit=crop' },
  { id: '3', city: '冰岛', description: '极地的冷冽最符合 INTJ 的审美。万物处于初创或终结的临界点。', date: '2023.08', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2059&auto=format&fit=crop' },
];

const CityLogs: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl serif-font tracking-tight">城市足迹</h2>
        <p className="text-zinc-500 font-light">物理坐标的变迁，不过是思想的投影。</p>
      </div>

      <div className="space-y-6">
        {MOCK_CITIES.map((city, index) => (
          <div key={city.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden glass-panel">
              <img src={city.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="text-red-600 font-mono text-xs">{city.date}</div>
              <h3 className="text-5xl serif-font font-bold">{city.city}</h3>
              <p className="text-zinc-400 text-lg font-light leading-relaxed">{city.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityLogs;
