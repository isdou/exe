import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3-geo'; 
import { MOCK_TRAVEL } from '../travelData';

/** * ============================================================
 * 1. 战术图标 (纯内联 SVG，无任何外部引入)
 * ============================================================
 */
const IconGrid = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);
const IconGlobe = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
const IconLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
);
const IconRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
);

/** * ============================================================
 * 2. 战术地图核心 (解决重叠干扰与坐标漂移)
 * ============================================================
 */
const TacticalMap: React.FC<{ activeIndex: number; onSelect: (idx: number) => void }> = ({ activeIndex, onSelect }) => {
  const [geoData, setGeoData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // 1. 统一投影坐标系
  const projection = useMemo(() => d3.geoEquirectangular().scale(130).translate([400, 225]), []);
  const pathGenerator = useMemo(() => d3.geoPath().projection(projection), [projection]);

  useEffect(() => {
    // 💡 检查点：文件必须在 public/world.json
    fetch('/world.json')
      .then(res => {
        if (!res.ok) throw new Error("File not found");
        return res.json();
      })
      .then(data => setGeoData(data))
      .catch(err => {
        console.error("Map Load Error:", err);
        setError("MAP_DATA_MISSING: 请检查 public/world.json 是否存在");
      });
  }, []);

  const litCountries = useMemo(() => {
    if (!geoData) return new Set<string>();
    const sets = new Set<string>();
    MOCK_TRAVEL.forEach(spot => {
      const country = geoData.features.find((f: any) => d3.geoContains(f, [spot.lng, spot.lat]));
      if (country) sets.add(country.id || country.properties.name);
    });
    return sets;
  }, [geoData]);

  if (error) return <div className="text-red-600 font-mono text-[10px] p-10">{error}</div>;
  if (!geoData) return <div className="h-full flex items-center justify-center font-mono text-zinc-800 animate-pulse">INIT_TACTICAL_DATA...</div>;

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-[#050505] rounded-[3rem] overflow-hidden border border-zinc-900 shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <svg viewBox="0 0 800 450" className="w-full h-full relative z-10">
        <g className="map-sectors">
          {geoData.features.map((f: any, i: number) => {
            const isLit = litCountries.has(f.id || f.properties.name);
            return (
              <path key={i} d={pathGenerator(f) || ""} 
                className={`transition-all duration-1000 ${isLit ? "fill-red-600/20 stroke-red-500/50 stroke-[0.5] animate-pulse" : "fill-zinc-900/40 stroke-zinc-800/30 stroke-[0.2]"}`} 
              />
            );
          })}
        </g>
        {MOCK_TRAVEL.map((spot, idx) => {
          const [x, y] = projection([spot.lng, spot.lat]) || [0, 0];
          const isActive = idx === activeIndex;
          return (
            <g key={spot.id} onClick={() => onSelect(idx)} className="cursor-pointer group">
              {isActive && <circle cx={x} cy={y} r="10" className="fill-red-600/20 animate-ping" />}
              <circle cx={x} cy={y} r={isActive ? "3" : "1.5"} className={`transition-all duration-300 ${isActive ? "fill-white" : "fill-red-600 group-hover:fill-white"}`} />
              
              {/* ✅ 物理级修复：invisible 彻底解决标签重叠导致的全显 */}
              <foreignObject x={x + 10} y={y - 12} width="100" height="30" className="pointer-events-none invisible group-hover:visible transition-all duration-300">
                <div className="bg-black/95 border border-red-900/50 px-2 py-0.5 rounded-sm text-[8px] font-mono text-white whitespace-nowrap uppercase tracking-widest backdrop-blur-md">
                  {spot.city}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** * ============================================================
 * 4. 主容器 (布局适配)
 * ============================================================
 */
// ... (前面的图标、详情弹窗和 TacticalMap 组件保持不变)

const Travel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const activeSpot = MOCK_TRAVEL[activeIndex];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <div className="relative h-full w-full overflow-hidden bg-black text-white">
      {/* 背景层 */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' && (
          <motion.div key={activeSpot.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 z-0">
            <img src={activeSpot.images[0]} className="w-full h-full object-cover grayscale-[0.6] brightness-[0.2]" alt="bg" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-full z-10 flex flex-col px-6 md:px-16">
        {/* 顶部控制栏 */}
        <div className="pt-10 flex justify-end gap-3 z-50">
            <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 border font-mono text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-white text-black border-white shadow-lg' : 'text-zinc-600 border-zinc-900 hover:border-zinc-700'}`}>
              <IconGrid /> LIST ARCHIVES
            </button>
            <button onClick={() => setViewMode('map')} className={`px-4 py-1.5 border font-mono text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'map' ? 'bg-white text-black border-white shadow-lg' : 'text-zinc-600 border-zinc-900 hover:border-zinc-700'}`}>
              <IconGlobe /> TACTICAL MAP
            </button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div key="list-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center relative">
              <div className="lg:col-span-5 space-y-10 z-30">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-mono tracking-widest uppercase">Trajectory {String(activeIndex + 1).padStart(2, '0')}</span>
                    <span className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">{activeSpot.coordinate}</span>
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-7xl md:text-9xl font-black serif leading-none text-white tracking-tighter uppercase">{activeSpot.city}.</h2>
                    <div className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase pl-2 font-bold italic">IN_{activeSpot.date}</div>
                  </div>
                  <div className="max-w-md bg-black/40 backdrop-blur-md border-l-2 border-red-900/50 pl-8 py-4">
                    <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed serif italic opacity-90">“{activeSpot.description}”</p>
                  </div>
                </div>
                <button onClick={() => setShowDetails(true)} className="group relative px-12 py-4 border border-zinc-800 transition-all hover:border-white overflow-hidden text-white font-mono text-[9px] tracking-[0.4em]">
                   <span className="relative z-10 font-bold uppercase">Decode_Details</span>
                   <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              </div>

              <div ref={scrollContainerRef} className="lg:col-span-7 flex items-center overflow-x-auto pb-32 lg:pb-0 no-scrollbar w-full">
                <div className="flex gap-8 px-20 min-w-max items-center h-full">
                  {MOCK_TRAVEL.map((spot, idx) => (
                    <motion.div
                      key={spot.id} ref={el => cardRefs.current[idx] = el}
                      whileHover={{ y: -10 }} onClick={() => setActiveIndex(idx)}
                      className={`relative cursor-pointer transition-all duration-700 shrink-0 overflow-hidden rounded-[2.5rem] border-2 ${idx === activeIndex ? 'w-48 h-64 md:w-56 md:h-80 border-white shadow-2xl z-10 scale-105' : 'w-24 h-40 md:w-32 md:h-56 border-transparent opacity-30 grayscale'}`}
                    >
                      <img src={spot.images[0]} className="w-full h-full object-cover" alt={spot.city} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="map-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 py-12 pb-32 relative z-10">
               <TacticalMap activeIndex={activeIndex} onSelect={setActiveIndex} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ✅ 修正核心：底部导航条只在 viewMode === 'list' 时渲染 */}
      {viewMode === 'list' && (
        <div className="absolute bottom-12 left-12 flex items-center gap-12 z-40">
           <div className="flex gap-4">
              <button onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : MOCK_TRAVEL.length - 1)} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:border-white bg-black/50 backdrop-blur transition-all">
                <IconLeft />
              </button>
              <button onClick={() => setActiveIndex(prev => prev < MOCK_TRAVEL.length - 1 ? prev + 1 : 0)} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:border-white bg-black/50 backdrop-blur transition-all">
                <IconRight />
              </button>
           </div>
           <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-zinc-700">
             Sector_Index: <span className="text-red-600 font-bold">{activeIndex + 1}</span> / {MOCK_TRAVEL.length}
           </div>
        </div>
      )}
    </div>
  );
};

export default Travel;