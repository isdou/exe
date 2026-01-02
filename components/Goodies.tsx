import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOODIES_DATA } from '../goodiesData';
import { GoodieItem } from '../types';

// --- 1. 子组件：探店图鉴卡片 (Grid View) ---
const DiningCard: React.FC<{ item: GoodieItem; onClick: () => void }> = ({ item, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.3)' }}
    onClick={onClick}
    className="group cursor-pointer bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all"
  >
    {/* 图片区域 */}
    <div className="relative aspect-square w-full bg-zinc-900 overflow-hidden">
      {item.image ? (
        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 gap-2">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
           <span className="text-[9px] mono uppercase tracking-widest">No Visual</span>
        </div>
      )}
      {/* 餐厅标签 */}
      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded-md text-[9px] font-mono text-white/90 border border-white/10">
        {item.restaurant}
      </div>
    </div>
    
    {/* 信息区域 */}
    <div className="p-4 flex-1 flex flex-col justify-between gap-3">
      <div>
        <h3 className="text-lg font-bold serif text-zinc-200 group-hover:text-white truncate">{item.name}</h3>
        <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">
          <span className="text-red-500">{item.cuisine}</span>
          <span>·</span>
          <span>{item.price}</span>
        </div>
      </div>
      {item.reason && (
        <div className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-1.5 rounded self-start uppercase tracking-wider">
          Verdict: {item.reason}
        </div>
      )}
    </div>
  </motion.div>
);

// --- 2. 子组件：探店详情弹窗 (Modal View) ---
const DiningDetail: React.FC<{ item: GoodieItem; onClose: () => void }> = ({ item, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
  >
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
    <motion.div
      layoutId={`dining-${item.id}`}
      className="relative z-10 w-full max-w-4xl bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] flex flex-col md:flex-row max-h-[90vh]"
    >
       {/* 左侧大图 */}
       <div className="w-full md:w-1/2 bg-zinc-900 relative shrink-0 h-64 md:h-auto">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-800">
               <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60 md:hidden"></div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white/80 hover:text-white hover:bg-black/80 transition-all md:hidden">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
       </div>

       {/* 右侧信息 */}
       <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col gap-8">
          <div>
             <div className="flex items-center gap-3 mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-red-500">
                <span>DINING LOG</span>
                <span className="w-8 h-px bg-red-800"></span>
                <span>{item.id}</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black serif text-white tracking-tight">{item.name}</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/5">
             <div>
                 <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Restaurant</div>
                 <div className="text-base serif text-zinc-200">{item.restaurant}</div>
             </div>
             <div>
                 <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Cuisine & Price</div>
                 <div className="text-base font-mono text-zinc-200">{item.cuisine} · {item.price}</div>
             </div>
          </div>

          <div className="space-y-4">
             <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Tasting Notes</div>
             <p className="text-xl font-serif italic text-zinc-300 leading-relaxed">“{item.description}”</p>
          </div>

          {item.reason && (
            <div className="mt-auto pt-6">
              <div className="inline-block bg-white/10 border border-white/10 rounded-lg px-4 py-3">
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Final Verdict</div>
                <div className="font-mono text-sm text-red-400 font-bold uppercase tracking-wider">{item.reason}</div>
              </div>
            </div>
          )}
       </div>
    </motion.div>
  </motion.div>
);

// --- 3. 主组件 ---
const Goodies: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'eat' | 'drink' | 'dining' | 'buy'>('dining');
  // 🔥 修正点：去掉了变量名里的空格，这次肯定能跑通了
  const [selectedDiningItem, setSelectedDiningItem] = useState<GoodieItem | null>(null);

  const filteredData = filter === 'all' 
    ? GOODIES_DATA 
    : GOODIES_DATA.filter(item => item.category === filter);

  const isDiningView = filter === 'dining';

  return (
    <div className="relative min-h-full">
      {/* 弹窗容器 */}
      <AnimatePresence>
        {selectedDiningItem && (
          <DiningDetail item={selectedDiningItem} onClose={() => setSelectedDiningItem(null)} />
        )}
      </AnimatePresence>

      <div className={`space-y-12 pb-24 transition-all duration-500 ${selectedDiningItem ? 'blur-sm pointer-events-none' : ''}`}>
        {/* Header Area */}
        <div className="space-y-6">
           <div className="flex items-center gap-4">
             <span className="w-8 h-px bg-red-600"></span>
             <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Inventory / 好物 & 图鉴</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-black serif leading-none tracking-tighter text-white">GOODIES.</h2>
           <p className="text-zinc-500 max-w-2xl text-lg font-light leading-relaxed serif italic">
             “收集实体，也收集体验。这里是我的物质世界与味蕾记忆的档案馆。”
           </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-8 border-b border-white/10 pb-4 overflow-x-auto">
          {['dining', 'eat', 'drink', 'buy', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-colors relative pb-2 ${
                filter === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {tab === 'dining' ? 'DINING LOG' : tab}
              {filter === tab && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div>
          <AnimatePresence mode="wait">
            {/* 模式一：探店图鉴 (Grid View) */}
            {isDiningView ? (
              <motion.div
                key="dining-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {filteredData.map((item) => (
                  <DiningCard key={item.id} item={item} onClick={() => setSelectedDiningItem(item)} />
                ))}
              </motion.div>
            ) : (
              // 模式二：普通物品列表 (List View)
              <motion.div key="normal-list" className="space-y-4">
                {filteredData.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group flex flex-col md:flex-row md:items-center gap-6 py-6 border-b border-white/5 hover:bg-white/[0.02] -mx-4 px-4 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-6 md:w-1/4 shrink-0">
                      <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest w-12 shrink-0">{item.id}</span>
                      <div className="w-16 h-16 bg-zinc-800 rounded overflow-hidden shrink-0 border border-white/5">
                        {item.image ? (
                          <img src={item.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                         <h3 className="text-lg font-bold serif text-zinc-200 group-hover:text-white transition-colors">{item.name}</h3>
                         <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                            <span className="text-amber-500">● {item.category}</span>
                         </div>
                      </div>
                    </div>
                    <div className="md:w-32 font-mono text-sm text-zinc-400 group-hover:text-white transition-colors shrink-0">{item.price}</div>
                    <div className="flex-1 min-w-0">
                       <div className="text-sm font-light serif text-zinc-500 italic leading-relaxed border-l-2 border-zinc-800 pl-4 group-hover:border-red-900 transition-colors">“{item.description}”</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {filteredData.length === 0 && (
            <div className="py-20 text-center text-zinc-700 font-mono text-xs uppercase tracking-widest">
              Inventory Sector Empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goodies;