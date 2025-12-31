
import React, { useState } from 'react';
import { TravelSpot } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
// --- 引用外部数据文件 ---
import { MOCK_TRAVEL } from '../travelData';

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
           <p className="text-zinc-500 text-lg leading-relaxed serif font-light">
             在这个特定的地理坐标上，时间似乎呈现出一种非线性的堆叠。我看到了三十年前的幻影与未来的预兆在这里交汇。
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
           <div className="space-y-4">
             <div className="text-zinc-600 mono text-[9px] uppercase tracking-widest">Signal Status</div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
               <span className="text-white mono text-sm uppercase">Secure</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Travel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const activeSpot = MOCK_TRAVEL[activeIndex];

  return (
    <div className="relative -mt-12 -mx-6 md:-mx-16 h-[calc(100vh-6rem)] overflow-hidden">
      <AnimatePresence>
        {showDetails && <ExpeditionDetails spot={activeSpot} onClose={() => setShowDetails(false)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
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
      </AnimatePresence>

      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      <div className="relative h-full z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end md:justify-center pb-32 md:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end md:items-center">
          <div className="lg:col-span-6 space-y-6 md:space-y-10">
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
                <h2 className="text-5xl md:text-7xl font-black serif leading-none text-white tracking-tighter">
                  {activeSpot.city}.
                </h2>
                <div className="text-red-500 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase pl-1 md:pl-2">In {activeSpot.date}</div>
              </div>
              <p className="text-zinc-300 text-sm md:text-xl font-light leading-loose serif italic max-w-xl border-l-2 border-red-600/30 pl-4 md:pl-8">
                “{activeSpot.description}”
              </p>
            </motion.div>
            <div className="pt-4">
              <button
                onClick={() => setShowDetails(true)}
                className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white"
              >
                <span className="relative z-10 text-[10px] text-white tracking-[0.4em] uppercase font-bold">Expedition Details</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <style>{`.group:hover span { color: black; }`}</style>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-start md:justify-end items-center overflow-x-auto pb-4 custom-scrollbar lg:overflow-visible">
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
        </div>
      </div>

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
    </div>
  );
};

export default Travel;
