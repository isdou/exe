import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOODIES_DATA } from '../goodiesData';
import { GoodieItem } from '../types';

// ================= 1. 子组件：好物详情弹窗 (保持全量逻辑) =================
const GoodieDetail: React.FC<{ item: GoodieItem; onClose: () => void }> = ({ item, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 pointer-events-auto"
  >
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="relative z-10 w-full max-w-4xl bg-[#0c0c0c] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row max-h-[90vh]"
    >
       <div className="w-full md:w-1/2 bg-zinc-900 relative shrink-0 h-64 md:h-auto overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60"></div>
          <button onClick={onClose} className="absolute top-6 left-6 bg-black/50 p-2 rounded-full text-white/80 hover:text-white hover:bg-black/80 transition-all z-20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
       </div>
       <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          <div className="border-b border-white/5 pb-6">
             <div className="flex items-center gap-3 mb-2 text-[10px] font-mono uppercase tracking-[0.3em] text-red-600">
                <span>INDEX #{item.id}</span>
                <span className="w-8 h-px bg-red-900/30"></span>
                <span>{item.date || 'COLLECTED'}</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black serif text-white tracking-tight leading-tight mb-4">{item.name}</h2>
             {item.rating && (
                <div className="flex items-center gap-2">
                   <div className="flex text-amber-500 text-xl">{'★'.repeat(Math.floor(item.rating))}</div>
                   <span className="text-[10px] font-mono text-zinc-500 mt-1">/ TASTE SCORE</span>
                </div>
             )}
          </div>
          <div className="grid grid-cols-2 gap-8 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
             <div><div className="mb-2 text-zinc-600">Category / 分类</div><div className="text-sm serif text-white">{item.category}</div></div>
             <div><div className="mb-2 text-zinc-600">Source / 来源</div><div className="text-sm serif text-white">{item.restaurant || 'PRIVATE COLLECTION'}</div></div>
          </div>
          <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5 relative">
             <div className="text-[9px] text-red-900 font-bold uppercase tracking-[0.2em] mb-4">Observation_Log</div>
             <p className="text-lg font-serif italic text-zinc-300 leading-relaxed">“{item.description}”</p>
          </div>
          <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest border-t border-white/5">
             <span>Estimated Value: {item.price || 'Priceless'}</span>
             <span className="text-red-900">ARCHIVE_COMPLETE</span>
          </div>
       </div>
    </motion.div>
  </motion.div>
);

// ================= 2. 子组件：缩小版的图鉴“盘子/瓶子”卡片 (与 Curation 对齐) =================
const GoodiePlate: React.FC<{ item: GoodieItem; onClick: () => void }> = ({ item, onClick }) => {
  // 定义不同类别的状态
  const isDrink = item.category === 'drink';
  const isPlate = item.category === 'eat' || item.category === 'dining';
  const isTray = item.category === 'buy';

  // 根据类别设置容器的基本样式（长宽比、圆角、旋转）
  let containerStyle = "aspect-square rounded-xl rotate-3 group-hover:rotate-0"; // 默认：托盘
  if (isDrink) {
    containerStyle = "aspect-[2/3] rounded-[1.5rem]"; // 瓶子
  } else if (isPlate) {
    containerStyle = "aspect-square rounded-full"; // 盘子
  }

  // 根据类别设置容器的背景和阴影
  const containerBgStyle = (isDrink || isPlate)
    ? 'bg-[#111] shadow-[10px_10px_30px_-10px_rgba(0,0,0,0.8),inset_-1px_-1px_8px_rgba(255,255,255,0.02)]' 
    : 'bg-[#151515]';

  // 根据类别设置内圈的样式（内缩距离、圆角）
  let innerRimStyle = "inset-[15%] rounded-lg"; // 默认：托盘内圈
  if (isDrink) {
    innerRimStyle = "inset-[10%] rounded-[1.2rem]"; // 瓶子内圈
  } else if (isPlate) {
    innerRimStyle = "inset-[15%] rounded-full"; // 盘子内圈
  }

  // 根据类别设置图片容器的样式（宽高、圆角、旋转）
  let imageContainerStyle = "w-[60%] h-[60%] rounded-md rotate-[-2deg] group-hover:rotate-0"; // 默认：托盘图片
  if (isDrink) {
    imageContainerStyle = "w-[70%] h-[80%] rounded-[1rem]"; // 瓶子图片（拉高）
  } else if (isPlate) {
    imageContainerStyle = "w-[60%] h-[60%] rounded-full"; // 盘子图片
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
      {/* 调整容器最大宽度，与 Curation 的 180px 逻辑一致 */}
      <div className={`relative w-full flex items-center justify-center max-w-[180px] ${containerStyle}`}>
        
        {/* 外部发光/阴影层 */}
        <div className={`absolute inset-0 bg-black/40 blur-lg group-hover:bg-red-900/10 transition-all duration-500 ${isDrink ? 'rounded-[1.5rem]' : (isPlate ? 'rounded-full' : 'rounded-xl')}`}></div>
        
        {/* 主体（瓶子/盘子/托盘） */}
        <div className={`absolute inset-0 border border-white/5 transition-all duration-700 ${containerBgStyle} ${containerStyle}`}></div>
        
        {/* 内凹陷层 */}
        <div className={`absolute shadow-[inset_0_3px_10px_rgba(0,0,0,0.9)] border border-white/5 bg-[#0a0a0a] ${innerRimStyle}`}></div>

        {/* 核心好物图片 */}
        <div className={`relative overflow-hidden z-10 shadow-xl transition-all duration-700 ease-out group-hover:scale-110 ${imageContainerStyle}`}>
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:rotate-3 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        {/* 评分印章 */}
        {item.rating && (
          <div className="absolute top-[8%] right-[8%] z-20 w-10 h-10 rounded-full bg-red-900 border-2 border-red-600/40 flex flex-col items-center justify-center rotate-12 group-hover:-rotate-12 transition-transform shadow-md backdrop-blur-sm">
             <div className="text-[12px] font-black font-mono text-white leading-none">{item.rating}</div>
             <div className="text-[5px] font-mono text-red-200 uppercase tracking-tighter">Score</div>
          </div>
        )}
      </div>

      {/* 文字信息 */}
      <div className="mt-4 text-center space-y-1.5 px-2 w-full">
        <h3 className="text-xs font-bold serif text-zinc-100 group-hover:text-red-500 transition-colors line-clamp-1 leading-tight">
          {item.name}
        </h3>
        <div className="flex flex-col items-center gap-0.5">
           <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest px-1.5 py-0.5 border border-zinc-900 rounded-full truncate max-w-full">
             {item.restaurant || item.category}
           </span>
           <p className="text-[9px] text-zinc-600 font-light serif italic line-clamp-1 opacity-60 group-hover:opacity-100">
             “{item.reason}”
           </p>
        </div>
      </div>
    </motion.div>
  );
};

// ================= 3. 主组件：全量 Goodies (调整后的网格密度) =================
const Goodies: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'eat' | 'drink' | 'dining' | 'buy'>('all');
  const [selectedItem, setSelectedItem] = useState<GoodieItem | null>(null);

  const filteredData = filter === 'all' 
    ? GOODIES_DATA 
    : GOODIES_DATA.filter(item => item.category === filter);

  const stats = {
    total: GOODIES_DATA.length,
    food: GOODIES_DATA.filter(i => ['eat', 'drink', 'dining'].includes(i.category)).length,
    artifact: GOODIES_DATA.filter(i => i.category === 'buy').length
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
            <h2 className="text-5xl md:text-7xl font-black serif leading-none tracking-tighter text-white uppercase">Flavor.<br/>Catalog.</h2>
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
          {[
            { id: 'all', label: 'ALL' },
            { id: 'dining', label: 'DINING' },
            { id: 'eat', label: 'SNACKS' },
            { id: 'drink', label: 'DRINKS' },
            { id: 'buy', label: 'ARTIFACTS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase transition-all ${
                filter === tab.id 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-zinc-600 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔥 关键修改：增加网格密度，适配 Curation 风格 */}
        <motion.div 
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-4 gap-y-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <GoodiePlate 
                key={item.id} 
                item={item} 
                onClick={() => setSelectedItem(item)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredData.length === 0 && (
          <div className="py-24 text-center opacity-20">
            <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest">NO SPECIMENS FOUND</div>
          </div>
        )}

        <div className="pt-16 flex flex-col items-center gap-4 opacity-20">
           <div className="w-px h-8 bg-gradient-to-b from-red-600 to-transparent"></div>
           <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-[0.6em]">End Archive</div>
        </div>
      </div>
    </div>
  );
};

export default Goodies;