import React, { useState, useEffect } from 'react';
import { TravelSpot } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TRAVEL } from '../travelData';

// --- 1. 辅助组件：解密文字特效 ---
const DecryptedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      
      iterations += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <h2 className={className}>{displayText}</h2>;
};

// --- 2. 辅助组件：详情弹窗 ---
const ExpeditionDetails: React.FC<{ spot: TravelSpot; onClose: () => void }> = ({ spot, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl p-8 md:p-20 overflow-y-auto"
  >
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="px-3 py-1 bg-red-600 inline-block text-[10px] text-white mono uppercase tracking-widest">Confirmed Location</div>
          <h1 className="text-5xl md:text-7xl font-black serif text-white tracking-tighter">{spot.city}</h1>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10">
        <img src={spot.images[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
        <div className="md:col-span-2 space-y-8">
           <h3 className="text-red-600 mono text-xs uppercase tracking-[0.5em] font-bold">Field Notes / 现场手记</h3>
           <p className="text-zinc-300 text-2xl leading-relaxed serif italic font-light">
             {spot.description} 这里的空气中弥漫着某种数字时代之前才有的质感。逻辑在这里停滞，唯有直觉在发芽。
           </p>
        </div>
        <div className="space-y-8">
           <div className="space-y-4">
             <div className="text-zinc-600 mono text-[9px] uppercase tracking-widest">Coordinates</div>
             <div className="text-white mono text-sm">{spot.coordinate}</div>
           </div>
           <div className="space-y-4">
             <div className="text-zinc-600 mono text-[9px] uppercase tracking-widest">Exploration Date</div>
             <div className="text-white mono text-sm">{spot.date}</div>
           </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 3. 新增组件：2D 战术地图视图 ---
const TacticalMap: React.FC<{ activeIndex: number; onSelect: (idx: number) => void }> = ({ activeIndex, onSelect }) => {
  // 坐标映射逻辑 (Equirectangular Projection)
  // X: (lng + 180) / 360 * 100%
  // Y: (90 - lat) / 180 * 100%
  const getPos = (lat: number, lng: number) => ({
    x: (lng + 180) * (100 / 360),
    y: (90 - lat) * (100 / 180)
  });

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-[#080808] rounded-3xl overflow-hidden border border-white/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
      
      {/* 装饰：网格线背景 */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* 地图容器 (保持 2:1 比例) */}
      <div className="relative w-full max-w-5xl aspect-[2/1] z-10 select-none">
        
        {/* A. 底图：使用 Wikimedia 的标准空白地图，加 CSS 滤镜让它变黑/变酷 */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
          className="absolute inset-0 w-full h-full object-fill opacity-20 pointer-events-none"
          style={{ filter: 'invert(1) contrast(0.8)' }} // 反色处理，变成黑色底图
          alt="World Map"
        />

        {/* B. SVG 连线层 (位于底图之上，点之下) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
           <defs>
             <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="rgba(220, 38, 38, 0)" />
               <stop offset="50%" stopColor="rgba(220, 38, 38, 0.6)" />
               <stop offset="100%" stopColor="rgba(220, 38, 38, 0)" />
             </linearGradient>
           </defs>
           <path 
             d={`M ${MOCK_TRAVEL.map(t => {
               const pos = getPos(t.lat, t.lng);
               return `${pos.x}% ${pos.y}%`;
             }).join(' L ')}`}
             fill="none"
             stroke="url(#lineGradient)"
             strokeWidth="1.5"
             strokeDasharray="4 4"
             className="opacity-60"
           />
        </svg>

        {/* C. 坐标点层 */}
        {MOCK_TRAVEL.map((spot, idx) => {
          const pos = getPos(spot.lat, spot.lng);
          const isActive = idx === activeIndex;

          return (
            <div
              key={spot.id}
              onClick={() => onSelect(idx)}
              className="absolute group cursor-pointer"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {/* 1. 脉冲波 (仅激活时显示) */}
              {isActive && (
                <>
                  <div className="absolute -inset-4 rounded-full bg-red-600/20 animate-ping"></div>
                  <div className="absolute -inset-8 rounded-full border border-red-600/30 animate-[spin_4s_linear_infinite]"></div>
                </>
              )}

              {/* 2. 核心点 */}
              <div className={`relative w-2 h-2 md:w-3 md:h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black transition-all duration-300 ${isActive ? 'bg-red-600 scale-125 shadow-[0_0_10px_#dc2626]' : 'bg-zinc-600 group-hover:bg-white'}`}></div>

              {/* 3. 悬浮/激活信息标签 */}
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                 <div className="h-px w-4 bg-white/20 mr-2"></div>
                 <div className="bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded whitespace-nowrap">
                    <div className="text-[10px] font-bold text-white uppercase tracking-wider">{spot.city}</div>
                    <div className="text-[8px] font-mono text-zinc-500">{spot.date}</div>
                 </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* 底部数据装饰 */}
      <div className="absolute bottom-6 left-6 md:left-12 flex gap-8">
         <div>
            <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest mb-1">Grid Status</div>
            <div className="text-green-500 font-mono text-xs animate-pulse">ONLINE</div>
         </div>
         <div>
            <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest mb-1">Nodes</div>
            <div className="text-white font-mono text-xs">{MOCK_TRAVEL.length} DETECTED</div>
         </div>
      </div>
    </div>
  );
};

// --- 4. 主组件 ---
const Travel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list'); // 默认列表模式
  
  const activeSpot = MOCK_TRAVEL[activeIndex];

  return (
    <div className="relative -mt-12 -mx-6 md:-mx-16 h-[calc(100vh-6rem)] overflow-hidden">
      <AnimatePresence>
        {showDetails && <ExpeditionDetails spot={activeSpot} onClose={() => setShowDetails(false)} />}
      </AnimatePresence>

      {/* 只有在 List 模式下显示大背景图 */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' && (
          <motion.div
            key={activeSpot.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img src={activeSpot.images[0]} className="w-full h-full object-cover grayscale-[0.5] brightness-[0.4]" />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 噪点纹理 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      {/* 主内容区域 */}
      <div className="relative h-full z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pb-20 md:pb-0">
        
        {/* 顶部工具栏：视图切换按钮 */}
        <div className="absolute top-8 right-6 md:right-12 z-50 flex gap-2">
           <button 
             onClick={() => setViewMode('list')} 
             className={`px-3 py-1 rounded border text-[10px] font-mono uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}
           >
             List View
           </button>
           <button 
             onClick={() => setViewMode('map')} 
             className={`px-3 py-1 rounded border text-[10px] font-mono uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}
           >
             Global Map
           </button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            // === 模式 A：列表视图 (原版) ===
            <motion.div 
              key="list-view"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end md:items-center h-full pb-20 md:pb-0 justify-end flex-col md:flex-row"
            >
              <div className="lg:col-span-6 space-y-6 md:space-y-10 mt-auto md:mt-0">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={`info-${activeSpot.id}`}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="px-2 md:px-3 py-1 bg-red-600 text-white text-[8px] md:text-[9px] font-mono tracking-widest uppercase">Trajectory 0{activeIndex + 1}</span>
                    <span className="text-zinc-500 font-mono text-[8px] md:text-[10px] tracking-widest uppercase truncate max-w-[150px]">{activeSpot.coordinate}</span>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <DecryptedText 
                      text={activeSpot.city + "."} 
                      className="text-5xl md:text-7xl font-black serif leading-none text-white tracking-tighter"
                    />
                    <div className="text-red-500 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase pl-1 md:pl-2">In {activeSpot.date}</div>
                  </div>
                  <p className="text-zinc-300 text-sm md:text-xl font-light leading-loose serif italic max-w-xl border-l-2 border-red-600/30 pl-4 md:pl-8 line-clamp-3 md:line-clamp-none">
                    “{activeSpot.description}”
                  </p>
                </motion.div>
                <div className="pt-4 hidden md:block">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white"
                  >
                    <span className="relative z-10 text-[10px] text-white tracking-[0.4em] uppercase font-bold">Expedition Details</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-start md:justify-end items-center overflow-x-auto pb-4 custom-scrollbar lg:overflow-visible w-full">
                <div className="flex gap-4 p-2">
                  {MOCK_TRAVEL.map((spot, idx) => (
                    <motion.div
                      key={spot.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative cursor-pointer transition-all duration-700 ease-out shrink-0 overflow-hidden rounded-2xl md:rounded-3xl border-2 ${
                        idx === activeIndex
                        ? 'w-32 h-44 md:w-44 md:h-64 border-white shadow-[0_20px_50px_rgba(220,38,38,0.3)] z-20'
                        : 'w-16 h-24 md:w-24 md:h-48 border-transparent opacity-40 hover:opacity-80 scale-90 grayscale'
                      }`}
                    >
                      <img src={spot.images[0]} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                      <div className="absolute bottom-2 md:bottom-6 left-2 md:left-6 right-2 md:right-6">
                        <div className="text-[6px] md:text-[8px] text-white/60 font-mono uppercase tracking-widest mb-1">{spot.date}</div>
                        <div className="text-white font-bold text-[8px] md:text-xs truncate uppercase tracking-tighter">{spot.city}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            // === 模式 B：2D 地图视图 ===
            <motion.div 
              key="map-view"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-full pt-20 pb-20 md:pb-12"
            >
               <TacticalMap activeIndex={activeIndex} onSelect={setActiveIndex} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部导航 (仅 List 模式显示，避免遮挡地图) */}
      {viewMode === 'list' && (
        <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 flex items-center gap-8 md:gap-16 z-20">
           <div className="flex gap-2 md:gap-4">
              <button onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : MOCK_TRAVEL.length - 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={() => setActiveIndex(prev => (prev < MOCK_TRAVEL.length - 1 ? prev + 1 : 0))} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
           </div>
           <div className="font-mono text-[8px] md:text-[10px] tracking-widest uppercase text-zinc-500">
             Coord <span className="text-white">{activeIndex + 1}</span> / {MOCK_TRAVEL.length}
           </div>
        </div>
      )}
    </div>
  );
};

export default Travel;