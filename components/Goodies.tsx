import React, { useState } from 'react';
// 1. 修复：导入 createPortal
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GOODIES_DATA } from '../goodiesData';
import { GoodieItem } from '../types';

// ================= 1. 子组件：好物详情弹窗 (标本采样盒风格) =================
const GoodieDetail: React.FC<{ item: GoodieItem; onClose: () => void }> = ({ item, onClose }) => {
  // 2. 修复：必须包裹在 createPortal(JSX, DOM节点) 中
  return createPortal(
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center p-4 pointer-events-auto font-mono">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative z-10 w-full max-w-xl bg-[#08080a] border border-red-900/30 shadow-2xl flex flex-col overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)' }}
      >
        <div className="h-6 bg-red-900/10 flex items-center justify-between px-4 border-b border-red-900/20">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-[8px] text-red-500 tracking-[0.3em] font-bold">MATTER_SPECIMEN // {item.id}</span>
          </div>
          <span className="text-[7px] text-red-900/60 uppercase">{item.recordDate}</span>
        </div>

        <div className="p-1 flex flex-col md:flex-row gap-1">
          <div className="w-full md:w-56 h-64 md:h-80 shrink-0 relative bg-black overflow-hidden border border-red-900/10">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
            <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute left-0 right-0 h-[2px] bg-red-600/50 z-20 pointer-events-none" />
          </div>

          <div className="flex-1 p-5 space-y-4 flex flex-col justify-between overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-1">{item.name}</h2>
                <div className="text-[8px] text-zinc-600 tracking-widest">{item.cuisine || item.category} // SOURCED: {item.restaurant || 'ARCHIVE'}</div>
              </div>

              <div className="space-y-3">
                <div className="text-red-500 text-[10px] font-black uppercase italic tracking-tighter">“{item.reason}”</div>
                <div className="bg-zinc-900/40 p-3 border-l-2 border-red-900/50">
                   <p className="text-[11px] leading-relaxed text-zinc-400 font-serif italic">{item.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-zinc-800/20 border border-zinc-800/30 text-[9px]">
                <div className="p-2"><label className="text-red-900 block font-black">PRICE</label><span className="text-zinc-300">{item.price || 'N/A'}</span></div>
                <div className="p-2 border-l border-zinc-800/30"><label className="text-red-900 block font-black">RATING</label><span className="text-zinc-300">{item.rating}/10</span></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
               {item.link ? (
                 <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-500 hover:underline">SOURCE_LINK &rarr;</a>
               ) : <span className="text-[9px] text-zinc-700">LINK_UNAVAILABLE</span>}
               <button onClick={onClose} className="px-4 py-1 border border-red-900/50 text-red-500 text-[9px] font-black uppercase hover:bg-red-900 tracking-[0.2em]">Release [X]</button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById('tv-modal-root') || document.body
  );
};

// ================= 2. 子组件：好物卡片 (与 Curation 对齐) =================

const GoodiePlate: React.FC<{ item: GoodieItem; onClick: () => void }> = ({ item, onClick }) => {
  const isDrink = item.category === 'drink';
  const isPlate = item.category === 'eat' || item.category === 'dining';

  // --- 1. 杯身/盘子/托盘 的基础形状 ---
  let containerStyle = "aspect-square rounded-xl rotate-3 group-hover:rotate-0"; 
  if (isDrink) {
    // 咖啡杯：稍微宽一点，底部圆润
    containerStyle = "aspect-[1.2/1] rounded-b-[2.5rem] rounded-t-md"; 
  } else if (isPlate) {
    containerStyle = "aspect-square rounded-full"; 
  }

  // --- 2. 背景与阴影 ---
  const containerBgStyle = (isDrink || isPlate)
    ? 'bg-[#111] shadow-[10px_10px_30px_-10px_rgba(0,0,0,0.8),inset_-1px_-1px_8px_rgba(255,255,255,0.02)]' 
    : 'bg-[#151515]';

  // --- 3. 内圈（杯口/盘心） ---
  let innerRimStyle = "inset-[15%] rounded-lg";
  if (isDrink) {
    // 杯口：椭圆形视觉
    innerRimStyle = "inset-x-[15%] top-[10%] bottom-[20%] rounded-full opacity-50"; 
  } else if (isPlate) {
    innerRimStyle = "inset-[15%] rounded-full"; 
  }

  // --- 4. 图片容器（液体/食物） ---
  let imageContainerStyle = "w-[60%] h-[60%] rounded-md rotate-[-2deg] group-hover:rotate-0";
  if (isDrink) {
    // 像杯子里的咖啡液
    imageContainerStyle = "w-[65%] h-[55%] rounded-full mt-2"; 
  } else if (isPlate) {
    imageContainerStyle = "w-[60%] h-[60%] rounded-full"; 
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer relative flex flex-col items-center"
    >
      <div className={`relative w-full flex items-center justify-center max-w-[160px] ${containerStyle}`}>
        
        {/* --- 咖啡杯特有：杯柄 (Handle) --- */}
        {isDrink && (
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-10 border-[6px] border-[#1a1a1a] rounded-r-full border-l-0 z-0 group-hover:translate-x-1 transition-transform"></div>
        )}

        {/* 外部发光 */}
        <div className={`absolute inset-0 bg-black/40 blur-lg group-hover:bg-red-900/10 transition-all duration-500 ${isDrink ? 'rounded-b-[2.5rem]' : (isPlate ? 'rounded-full' : 'rounded-xl')}`}></div>
        
        {/* 主体外壳 */}
        <div className={`absolute inset-0 border border-white/5 transition-all duration-700 ${containerBgStyle} ${containerStyle} z-10`}></div>
        
        {/* 内凹陷层（杯口） */}
        <div className={`absolute shadow-[inset_0_3px_10px_rgba(0,0,0,0.9)] border border-white/5 bg-[#0a0a0a] ${innerRimStyle} z-10`}></div>

        {/* 核心好物图片 */}
        <div className={`relative overflow-hidden z-20 shadow-xl transition-all duration-700 ease-out group-hover:scale-110 ${imageContainerStyle}`}>
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:rotate-3 transition-transform duration-1000" />
          {/* 液体反光感 */}
          {isDrink && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"></div>}
        </div>

        {/* 评分印章 */}
        {item.rating && (
          <div className="absolute top-[5%] right-[5%] z-30 w-9 h-9 rounded-full bg-red-900 border-2 border-red-600/40 flex flex-col items-center justify-center rotate-12 group-hover:-rotate-12 transition-transform shadow-md backdrop-blur-sm">
             <div className="text-[11px] font-black font-mono text-white leading-none">{item.rating}</div>
             <div className="text-[4px] font-mono text-red-200 uppercase tracking-tighter">Score</div>
          </div>
        )}
      </div>

      {/* 文字信息 */}
      <div className="mt-4 text-center space-y-1.5 px-2 w-full">
        <h3 className="text-xs font-bold serif text-zinc-100 group-hover:text-red-500 transition-colors line-clamp-1 leading-tight">
          {item.name}
        </h3>
        <div className="flex flex-col items-center gap-0.5">
           <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest px-1.5 py-0.5 border border-zinc-900 rounded-full">
             {item.restaurant || item.category}
           </span>
           <p className="text-[8px] text-zinc-600 font-light serif italic line-clamp-1 opacity-60">
             “{item.reason}”
           </p>
        </div>
      </div>
    </motion.div>
  );
};

// ================= 3. 主组件：Goodies =================
const Goodies: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'eat' | 'drink' | 'dining' | 'buy'>('all');
  const [selectedItem, setSelectedItem] = useState<GoodieItem | null>(null);

  const filteredData = filter === 'all' ? GOODIES_DATA : GOODIES_DATA.filter(item => item.category === filter);

  const stats = {
    total: GOODIES_DATA.length,
    food: GOODIES_DATA.filter(i => ['eat', 'drink', 'dining'].includes(i.category)).length,
  };

  return (
    <div className="relative min-h-full">
      <AnimatePresence>
        {selectedItem && <GoodieDetail item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>

      <div className={`space-y-12 pb-32 transition-all duration-500 ${selectedItem ? 'blur-md pointer-events-none scale-95' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-red-600"></span>
              <span className="text-red-600 font-mono text-[10px] tracking-[0.5em] uppercase">Archive_Goodies / 好物归档</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black serif leading-none tracking-tighter text-white uppercase">Catalog.</h2>
          </div>
          <div className="flex gap-6 bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
             <div className="text-center px-2">
               <div className="text-xl font-black font-mono text-white">{stats.total}</div>
               <div className="text-[8px] text-zinc-600 uppercase tracking-widest">Entries</div>
             </div>
             <div className="w-px bg-white/5"></div>
             <div className="text-center px-2">
               <div className="text-xl font-black font-mono text-red-600">{stats.food}</div>
               <div className="text-[8px] text-zinc-600 uppercase tracking-widest">Gourmet</div>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-center p-1 bg-zinc-900/30 rounded-full border border-white/5 max-w-xl mx-auto">
          {['all', 'dining', 'eat', 'drink', 'buy'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-1.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase transition-all ${
                filter === tab ? 'bg-white text-black shadow-md' : 'text-zinc-600 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === 'all' ? 'ALL' : tab === 'dining' ? 'DINING' : tab === 'eat' ? 'SNACKS' : tab === 'drink' ? 'DRINKS' : 'ARTIFACTS'}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-4 gap-y-10">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <GoodiePlate key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Goodies;