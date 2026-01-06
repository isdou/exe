import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3-geo'; 
import { MOCK_TRAVEL } from '../travelData';
import { LayoutGrid, Globe, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

// --- 1. 投影与路径生成器配置 ---
// 使用等距圆柱投影，将经纬度精准映射到 800x450 的 SVG 画布
const projection = d3.geoEquirectangular().scale(130).translate([400, 225]);
const pathGenerator = d3.geoPath().projection(projection);

// --- 2. 辅助组件：解密文字 ---
const DecryptedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((l, idx) => idx < i ? text[idx] : "X#$%"[Math.floor(Math.random()*4)]).join(""));
      if (i >= text.length) clearInterval(interval);
      i += 1/3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <h2 className={className}>{displayText}</h2>;
};

// --- 3. 核心组件：战术地图 (交互式名称显示) ---
const TacticalMap: React.FC<{ activeIndex: number; onSelect: (idx: number) => void }> = ({ activeIndex, onSelect }) => {
  const [geoData, setGeoData] = useState<any>(null);

  // 从 public 文件夹加载地图数据
  useEffect(() => {
    fetch('/world.json').then(res => res.json()).then(data => setGeoData(data));
  }, []);

  // 根据坐标自动计算点亮国家
  const litCountries = useMemo(() => {
    if (!geoData) return new Set<string>();
    const sets = new Set<string>();
    MOCK_TRAVEL.forEach(spot => {
      const country = geoData.features.find((f: any) => d3.geoContains(f, [spot.lng, spot.lat]));
      if (country) sets.add(country.id || country.properties.name);
    });
    return sets;
  }, [geoData]);

  if (!geoData) return <div className="h-full flex items-center justify-center font-mono text-zinc-800 animate-pulse">INITIATING_SECURE_MAP...</div>;

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-[#050505] rounded-[3rem] overflow-hidden border border-zinc-900 shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="relative w-full max-w-6xl aspect-[16/9] z-10 px-8">
        <svg viewBox="0 0 800 450" className="w-full h-full">
          {/* 国家版块点亮渲染 */}
          <g className="map-sectors">
            {geoData.features.map((f: any, i: number) => {
              const cid = f.id || f.properties.name;
              const isLit = litCountries.has(cid);
              return (
                <path key={i} d={pathGenerator(f) || ""} 
                  className={`transition-all duration-1000 ${isLit ? "fill-red-600/30 stroke-red-500 stroke-[0.8] animate-pulse" : "fill-zinc-900/40 stroke-zinc-800 stroke-[0.3]"}`} 
                />
              );
            })}
          </g>

          {/* 📍 城市交互点：真正实现“点到即显” */}
          {MOCK_TRAVEL.map((spot, idx) => {
            const [x, y] = projection([spot.lng, spot.lat]) || [0, 0];
            const isActive = idx === activeIndex;
            return (
              <g key={spot.id} onClick={() => onSelect(idx)} className="cursor-pointer group z-20">
                {isActive && <circle cx={x} cy={y} r="10" className="fill-red-600/20 animate-ping" />}
                <circle 
                  cx={x} cy={y} 
                  r={isActive ? "3.5" : "2"} 
                  className={`transition-all duration-300 ${isActive ? "fill-white" : "fill-red-600 group-hover:fill-white"}`} />
                
                {/* 🔒 修正核心：移除 isActive 的显式显示逻辑，仅限悬停触发 */}
                <foreignObject 
                  x={x + 10} 
                  y={y - 12} 
                  width="120" 
                  height="30"
                  className="pointer-events-none invisible group-hover:visible transition-all duration-300"
                >
                  <div className="bg-black/90 border border-red-900/50 px-2 py-1 rounded-sm text-[8px] font-mono text-white whitespace-nowrap uppercase tracking-widest backdrop-blur-md">
                    {spot.city}
                  </div>
                </foreignObject>
              </g>
            );
          })}
          
        </svg>
      </div>
      <div className="absolute bottom-10 left-12 flex gap-12 font-mono">
          <div className="space-y-1">
            <div className="text-[8px] text-zinc-700 uppercase tracking-[0.3em]">Ignition_Status</div>
            <div className="text-red-600 text-[10px] flex items-center gap-2 font-bold tracking-widest">
               <Zap size={10} className="animate-bounce" /> {litCountries.size} Countries_Unlocked
            </div>
          </div>
      </div>
    </div>
  );
};

// --- 4. 主组件 (整合布局与滚动追踪) ---
const Travel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const activeSpot = MOCK_TRAVEL[activeIndex];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 滚动同步：确保当前选择的照片始终处于视野中心
  useEffect(() => {
    if (viewMode === 'list' && cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeIndex, viewMode]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* 背景动态氛围层 */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' && (
          <motion.div key={activeSpot.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0 z-0">
            <img src={activeSpot.images[0]} className="w-full h-full object-cover grayscale-[0.6] brightness-[0.25]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-full z-10 flex flex-col px-6 md:px-16">
        {/* 顶部控制栏 */}
        <div className="pt-10 flex justify-end gap-3 z-50">
            <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 border font-mono text-[9px] uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white text-black border-white shadow-lg' : 'text-zinc-600 border-zinc-900 hover:border-zinc-700'}`}>List_Archives</button>
            <button onClick={() => setViewMode('map')} className={`px-4 py-1.5 border font-mono text-[9px] uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-white text-black border-white shadow-lg' : 'text-zinc-600 border-zinc-900 hover:border-zinc-700'}`}>Tactical_Map</button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div key="list-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
              
              {/* 文字描述区：固定 5 列，增加层级保护 */}
              <div className="lg:col-span-5 space-y-10 relative z-30">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-mono tracking-widest uppercase">Trajectory 0{activeIndex + 1}</span>
                    <span className="text-zinc-600 font-mono text-[9px] tracking-widest uppercase">{activeSpot.coordinate}</span>
                  </div>
                  <div className="space-y-1">
                    <DecryptedText text={activeSpot.city + "."} className="text-6xl md:text-9xl font-black serif leading-none text-white tracking-tighter uppercase" />
                    <div className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase pl-2 font-bold italic">IN_{activeSpot.date}</div>
                  </div>
                  <div className="max-w-md bg-black/40 backdrop-blur-md border-l-2 border-red-900/50 pl-8 py-4">
                    <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed serif italic opacity-90">“{activeSpot.description}”</p>
                  </div>
                </div>
                <button className="group relative px-12 py-4 border border-zinc-800 transition-all hover:border-white overflow-hidden text-white font-mono text-[9px] tracking-[0.4em]">
                   <span className="relative z-10 font-bold uppercase">Decode_Details</span>
                   <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              </div>

              {/* 卡片滚动区：固定 7 列，解决底部导航遮挡 */}
              <div ref={scrollContainerRef} className="lg:col-span-7 flex items-center overflow-x-auto pb-32 lg:pb-0 no-scrollbar w-full">
                <div className="flex gap-8 px-10 min-w-max items-center h-full">
                  {MOCK_TRAVEL.map((spot, idx) => (
                    <motion.div
                      key={spot.id}
                      ref={el => cardRefs.current[idx] = el}
                      whileHover={{ y: -10 }} 
                      onClick={() => setActiveIndex(idx)}
                      className={`relative cursor-pointer transition-all duration-700 shrink-0 overflow-hidden rounded-3xl border-2 ${idx === activeIndex ? 'w-48 h-64 md:w-56 md:h-80 border-white shadow-2xl z-10 scale-105' : 'w-24 h-40 md:w-32 md:h-56 border-transparent opacity-30 grayscale'}`}
                    >
                      <img src={spot.images[0]} className="w-full h-full object-cover" alt={spot.city} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="map-view" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="flex-1 py-12 pb-32 relative z-10">
               <TacticalMap activeIndex={activeIndex} onSelect={setActiveIndex} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部交互面板 */}
      {viewMode === 'list' && (
        <div className="absolute bottom-12 left-12 flex items-center gap-12 z-40">
           <div className="flex gap-4">
              <button onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : MOCK_TRAVEL.length - 1)} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:border-white bg-black/50 backdrop-blur transition-all"><ChevronLeft size={20} /></button>
              <button onClick={() => setActiveIndex(prev => prev < MOCK_TRAVEL.length - 1 ? prev + 1 : 0)} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:border-white bg-black/50 backdrop-blur transition-all"><ChevronRight size={20} /></button>
           </div>
           <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-zinc-700">COORD_INDEX: <span className="text-red-600 font-bold">{activeIndex + 1}</span> / {MOCK_TRAVEL.length}</div>
        </div>
      )}
    </div>
  );
};

export default Travel;