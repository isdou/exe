
import React, { useState } from 'react';
import { TravelSpot } from '../types';

const VISITED_CITIES: TravelSpot[] = [
  { id: '1', city: '东京', lat: 35.6895, lng: 139.6917, coordinate: '35.68°N, 139.69°E', date: '2024.05', description: '新宿的雨，银色的梦。', images: [] },
  { id: '2', city: '雷克雅未克', lat: 64.1265, lng: -21.8271, coordinate: '64.12°N, 21.82°W', date: '2023.12', description: '在冰岛与孤独达成和解。', images: [] },
  { id: '3', city: '大理', lat: 25.6065, lng: 100.2676, coordinate: '25.60°N, 100.26°E', date: '2023.08', description: '苍山洱海间的理性留白。', images: [] },
  { id: '4', city: '伦敦', lat: 51.5072, lng: -0.1276, coordinate: '51.50°N, 0.12°W', date: '2023.04', description: '泰晤士河边的迷雾与秩序。', images: [] },
  { id: '5', city: '巴黎', lat: 48.8566, lng: 2.3522, coordinate: '48.85°N, 2.35°E', date: '2022.09', description: '塞纳河畔的非线性时光。', images: [] },
];

// 简易世界地图路径（极简版，确保美观与加载速度）
const WORLD_MAP_PATH = "M150,150 L160,155 L170,150 L180,160 ..."; // 简化示意，实际组件内使用更完整路径

const WorldMap: React.FC = () => {
  const [hoveredCity, setHoveredCity] = useState<TravelSpot | null>(null);

  // 经纬度转 SVG 坐标逻辑
  const project = (lat: number, lng: number) => {
    const x = (lng + 180) * (1000 / 360);
    const y = (90 - lat) * (500 / 180);
    return { x, y };
  };

  return (
    <div className="relative -mt-20 -mx-6 h-[calc(100vh-3.5rem)] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* 标题区域 */}
      <div className="absolute top-24 left-12 z-20 space-y-4">
        <div className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Global Trajectory</div>
        <h2 className="text-6xl font-bold serif-font text-white">世界足迹</h2>
        <p className="text-zinc-500 font-light max-w-xs">将思想投射在地球表面的物理坐标，每一个点位都是一次重塑。</p>
      </div>

      {/* 地图主体容器 */}
      <div className="relative w-full max-w-6xl aspect-[2/1] px-12 scale-110 md:scale-125 lg:scale-150 transition-transform duration-1000">
        <svg viewBox="0 0 1000 500" className="w-full h-full drop-shadow-[0_0_30px_rgba(255,0,0,0.05)]">
          {/* 世界轮廓 - 使用极简抽象风格 */}
          <path 
            d="M50,150 Q100,100 200,120 T400,150 T600,200 T900,180 T950,300 T700,450 T400,400 T100,350 Z" 
            fill="#0f0f12" 
            stroke="#1a1a1e" 
            strokeWidth="1"
          />
          
          {/* 渲染连接路径 */}
          <path 
            d="M 888 150 Q 500 200 138 64" 
            fill="none" 
            stroke="rgba(220, 38, 38, 0.1)" 
            strokeWidth="0.5" 
            strokeDasharray="4 4"
          />

          {/* 渲染城市点 */}
          {VISITED_CITIES.map((city) => {
            const { x, y } = project(city.lat, city.lng);
            return (
              <g 
                key={city.id} 
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                {/* 呼吸灯光效 */}
                <circle cx={x} cy={y} r="6" className="fill-red-600/20 animate-ping" />
                <circle cx={x} cy={y} r="3" className="fill-red-600 group-hover:fill-white transition-colors duration-300" />
                
                {/* 悬停时的垂直参考线 */}
                {hoveredCity?.id === city.id && (
                  <line x1={x} y1={y} x2={x} y2="0" stroke="rgba(220, 38, 38, 0.3)" strokeWidth="0.5" strokeDasharray="2 2" />
                )}
              </g>
            );
          })}
        </svg>

        {/* 交互弹出框 (Pop-over) */}
        {hoveredCity && (
          <div 
            className="absolute z-30 glass-panel p-6 rounded-2xl border-white/10 w-64 animate-in fade-in zoom-in duration-300 pointer-events-none"
            style={{ 
              left: `${project(hoveredCity.lat, hoveredCity.lng).x / 10}%`, 
              top: `${project(hoveredCity.lat, hoveredCity.lng).y / 5}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-mono text-red-500">{hoveredCity.coordinate}</span>
              <span className="text-[10px] text-zinc-500">{hoveredCity.date}</span>
            </div>
            <h4 className="text-xl font-bold serif-font text-white mb-2">{hoveredCity.city}</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">{hoveredCity.description}</p>
          </div>
        )}
      </div>

      {/* 底部统计 */}
      <div className="absolute bottom-12 right-12 flex gap-16">
        <div className="text-center">
          <div className="text-3xl font-bold text-white font-mono">{VISITED_CITIES.length}</div>
          <div className="text-[9px] uppercase tracking-widest text-zinc-600">Visited Cities</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white font-mono">3</div>
          <div className="text-[9px] uppercase tracking-widest text-zinc-600">Continents</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white font-mono">14k</div>
          <div className="text-[9px] uppercase tracking-widest text-zinc-600">Total KM</div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
