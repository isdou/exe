import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3-geo'; 
import { MOCK_TRAVEL } from '../travelData';

/** * 1. 战术图标组件 
 */
const IconGrid = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);
const IconGlobe = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
const IconZap = ({ className }: { className?: string }) => (
  <svg className={className} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const IconLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
);
const IconRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
);
const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
);

/**
 * 2. 核心逻辑：成就协议计算 (保证至少有一个会被激活)
 */
const getActiveProtocols = (spots: any[]) => {
  const protocols = [];
  
  // 协议 00：基础采样 (只要有数据就激活)
  if (spots.length > 0) {
    protocols.push({ id: 'P-00', name: 'INITIAL_SCAN', desc: '已完成初步地理样本采集', color: 'text-zinc-400' });
  }

  // 协议 01：欧亚链路 (跨经度判定)
  const hasEurope = spots.some(s => s.lng < 30);
  const hasAsia = spots.some(s => s.lng > 100);
  if (hasEurope && hasAsia) {
    protocols.push({ id: 'P-01', name: 'EURASIAN_LINK', desc: '已建立跨洲际地理数据同步', color: 'text-red-500' });
  }

  // 协议 03：2025年度频率
  const spots2025 = spots.filter(s => s.date && s.date.includes('2025'));
  if (spots2025.length >= 3) { // 门槛降低到 3 个
    protocols.push({ id: 'P-03', name: 'HIGH_FREQ_SAMPLING', desc: '2025 年度位移频率达标', color: 'text-blue-500' });
  }

  return protocols;
};

/**
 * 3. 子组件：解密文字效果
 */
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

/**
 * 4. 子组件：详情弹窗
 */
const ExpeditionDetails: React.FC<{ spot: any; onClose: () => void }> = ({ spot, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-3xl p-6 md:p-20 overflow-y-auto"
  >
    <div className="max-w-6xl mx-auto text-left">
      <div className="flex justify-end mb-12">
        <button onClick={onClose} className="p-4 rounded-full border border-zinc-800 text-white hover:bg-white hover:text-black transition-all">
          <IconX />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="px-3 py-1 bg-red-600 inline-block text-[9px] text-white font-mono uppercase tracking-[0.2em]">Archive_Node // {spot.id}</div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase">{spot.city}</h1>
          <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed italic border-l-2 border-red-900/50 pl-8">{spot.description}</p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
          <img src={spot.images[0]} className="w-full aspect-[4/5] object-cover" alt={spot.city} />
        </div>
      </div>
    </div>
  </motion.div>
);

/**
 * 5. 子组件：战术地图 (含成就系统)
 */
const TacticalMap: React.FC<{ activeIndex: number; onSelect: (idx: number) => void }> = ({ activeIndex, onSelect }) => {
  const [geoData, setGeoData] = useState<any>(null);
  // ✅ 核心改动：初始设为 true，确保能看到成就列表
  const [showProtocols, setShowProtocols] = useState(true);
  const activeProtocols = useMemo(() => getActiveProtocols(MOCK_TRAVEL), []);

  const projection = useMemo(() => d3.geoEquirectangular().scale(130).translate([400, 225]), []);
  const pathGenerator = useMemo(() => d3.geoPath().projection(projection), [projection]);

  useEffect(() => {
    fetch('/world.json').then(res => res.json()).then(data => setGeoData(data));
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

  if (!geoData) return <div className="h-full flex items-center justify-center font-mono text-zinc-800 animate-pulse">INITIATING_SECURE_MAP...</div>;

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
              <foreignObject x={x + 10} y={y - 12} width="100" height="30" className="pointer-events-none invisible group-hover:visible transition-opacity duration-300">
                <div className="bg-black/95 border border-red-900/50 px-2 py-0.5 rounded-sm text-[8px] font-mono text-white whitespace-nowrap uppercase tracking-widest backdrop-blur-md">{spot.city}</div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* ✅ 成就系统看板：确保 z-index 足够高 */}
      <div className="absolute bottom-10 left-12 z-[100] flex flex-col items-start gap-4">
        <AnimatePresence>
          {showProtocols && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="w-64 bg-black/90 backdrop-blur-xl border border-red-900/30 p-5 rounded-xl mb-2 shadow-2xl text-left">
              <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-3 border-b border-zinc-900 pb-2 flex justify-between">
                <span>Active_Protocols</span>
                <span className="text-red-900/50">SECURE</span>
              </div>
              <div className="space-y-4">
                {activeProtocols.map(p => (
                  <div key={p.id} className="space-y-1">
                    <div className={`text-[9px] font-mono font-bold tracking-tight ${p.color}`}>[{p.id}] {p.name}</div>
                    <div className="text-[8px] text-zinc-500 font-mono leading-tight uppercase">{p.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setShowProtocols(!showProtocols)} className="flex flex-col items-start gap-1 font-mono hover:opacity-70 group outline-none">
          <div className="text-[8px] text-zinc-700 uppercase tracking-[0.3em]">Ignition_Status</div>
          <div className="text-red-600 text-[10px] flex items-center gap-2 font-bold tracking-widest uppercase">
            <IconZap className={showProtocols ? 'animate-spin' : 'animate-bounce'} /> 
            {litCountries.size} Countries_Unlocked
          </div>
        </button>
      </div>
    </div>
  );
};

/**
 * 6. 主容器
 */
const Travel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const activeSpot = MOCK_TRAVEL[activeIndex];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (viewMode === 'list' && cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex, viewMode]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black text-white">
      <AnimatePresence>{showDetails && <ExpeditionDetails spot={activeSpot} onClose={() => setShowDetails(false)} />}</AnimatePresence>

      <AnimatePresence mode="wait">
        {viewMode === 'list' && (
          <motion.div key={activeSpot.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 z-0">
            <img src={activeSpot.images[0]} className="w-full h-full object-cover grayscale-[0.6] brightness-[0.2]" alt="bg" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-full z-10 flex flex-col px-6 md:px-16">
        <div className="pt-10 flex justify-end gap-3 z-50">
            <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 border font-mono text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-white text-black border-white' : 'text-zinc-600 border-zinc-900'}`}><IconGrid /> LIST VIEW</button>
            <button onClick={() => setViewMode('map')} className={`px-4 py-1.5 border font-mono text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'map' ? 'bg-white text-black border-white' : 'text-zinc-600 border-zinc-900'}`}><IconGlobe /> TACTICAL MAP</button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div key="list-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center relative h-full">
              <div className="lg:col-span-5 space-y-10 z-30 text-left">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-mono tracking-widest uppercase">Trajectory {String(activeIndex + 1).padStart(2, '0')}</span>
                    <span className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">{activeSpot.coordinate}</span>
                  </div>
                  <div className="space-y-1">
                    <DecryptedText text={activeSpot.city + "."} className="text-7xl md:text-9xl font-black leading-none text-white tracking-tighter uppercase" />
                    <div className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase pl-2 font-bold italic">IN_{activeSpot.date}</div>
                  </div>
                  <div className="max-w-md bg-black/40 backdrop-blur-md border-l-2 border-red-900/50 pl-8 py-4"><p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed italic opacity-90">{activeSpot.description}</p></div>
                </div>
                <button onClick={() => setShowDetails(true)} className="group relative px-12 py-4 border border-zinc-800 transition-all hover:border-white overflow-hidden text-white font-mono text-[9px] tracking-[0.4em]"><span className="relative z-10 font-bold uppercase tracking-widest">Decode_Details</span><div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div></button>
              </div>
              <div ref={scrollContainerRef} className="lg:col-span-7 flex items-center overflow-x-auto pb-32 lg:pb-0 no-scrollbar w-full">
                <div className="flex gap-8 px-20 min-w-max items-center h-full">
                  {MOCK_TRAVEL.map((spot, idx) => (
                    <motion.div key={spot.id} ref={el => cardRefs.current[idx] = el} whileHover={{ y: -10 }} onClick={() => setActiveIndex(idx)} className={`relative cursor-pointer transition-all duration-700 shrink-0 overflow-hidden rounded-[2.5rem] border-2 ${idx === activeIndex ? 'w-48 h-64 md:w-56 md:h-80 border-white shadow-2xl z-10 scale-105' : 'w-24 h-40 md:w-32 md:h-56 border-transparent opacity-30 grayscale'}`}><img src={spot.images[0]} className="w-full h-full object-cover" alt={spot.city}/></motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="map-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 py-12 pb-32 relative z-10"><TacticalMap activeIndex={activeIndex} onSelect={setActiveIndex} /></motion.div>
          )}
        </AnimatePresence>
      </div>

      {viewMode === 'list' && (
        <div className="absolute bottom-12 left-12 flex items-center gap-12 z-40">
           <div className="flex gap-4">
              <button onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : MOCK_TRAVEL.length - 1)} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:border-white bg-black/50 backdrop-blur transition-all"><IconLeft /></button>
              <button onClick={() => setActiveIndex(prev => prev < MOCK_TRAVEL.length - 1 ? prev + 1 : 0)} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:border-white bg-black/50 backdrop-blur transition-all"><IconRight /></button>
           </div>
           <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-zinc-700">Sector_Index: <span className="text-red-600 font-bold">{activeIndex + 1}</span> / {MOCK_TRAVEL.length}</div>
        </div>
      )}
    </div>
  );
};

export default Travel;