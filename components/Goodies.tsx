import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOODIES_DATA } from '../goodiesData';
import { GoodieItem } from '../types';

// --- 1. 子组件：游戏图鉴卡片 (Game Card Style) ---
const DiningCard: React.FC<{ item: GoodieItem; onClick: () => void }> = ({ item, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
    onClick={onClick}
    className="group cursor-pointer relative bg-[#121212] border border-white/10 rounded-lg overflow-hidden flex flex-col shadow-lg hover:shadow-red-900/20 hover:border-white/30 transition-all duration-300 w-full aspect-[3/4]"
  >
    {/* 上半部分：图片 (图鉴封面) */}
    <div className="relative h-[55%] w-full bg-zinc-900 overflow-hidden border-b border-white/5">
      {item.image ? (
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-zinc-800">
           <span className="text-[9px] mono uppercase text-zinc-600">NO IMAGE</span>
        </div>
      )}
      
      {/* 评分角标 (左上) */}
      <div className="absolute top-2 left-2 flex gap-0.5 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[8px] text-yellow-500 border border-white/10 shadow-lg">
         {'★'.repeat(Math.floor(item.rating || 0))}
         <span className="text-zinc-600">{'★'.repeat(5 - Math.floor(item.rating || 0))}</span>
      </div>

      {/* 解锁时间 (右下) */}
      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-[7px] font-mono text-zinc-400 rounded border border-white/5 tracking-wider">
        {item.date || 'UNKNOWN'}
      </div>
    </div>
    
    {/* 下半部分：信息 (卡牌属性) */}
    <div className="flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
      <div className="space-y-1">
        {/* 菜系标签 */}
        <div className="flex justify-between items-center">
           <span className="text-[8px] font-mono text-red-500 uppercase tracking-widest border border-red-900/30 px-1 rounded bg-red-900/10">
             {item.cuisine || 'FOOD'}
           </span>
           {item.price && <span className="text-[8px] font-mono text-zinc-500">{item.price}</span>}
        </div>
        {/* 菜名 */}
        <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white line-clamp-1 leading-tight mt-1">
          {item.name}
        </h3>
        {/* 餐厅名 */}
        <div className="text-[9px] text-zinc-500 truncate flex items-center gap-1">
           <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
           {item.restaurant}
        </div>
      </div>

      {/* 底部评价短语 */}
      <div className="mt-2 pt-2 border-t border-white/5">
        <p className="text-[9px] text-zinc-400 italic line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          “{item.reason}”
        </p>
      </div>
    </div>

    {/* 装饰：卡牌高光 */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"></div>
  </motion.div>
);

// --- 2. 子组件：详情弹窗 (保持原样，只是数据展示微调) ---
const DiningDetail: React.FC<{ item: GoodieItem; onClose: () => void }> = ({ item, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto"
  >
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
    <motion.div
      layoutId={`dining-${item.id}`} // 配合 framer-motion 做丝滑放大
      className="relative z-10 w-full max-w-4xl bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row max-h-[90vh]"
    >
       <div className="w-full md:w-1/2 bg-zinc-900 relative shrink-0 h-64 md:h-auto group">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60 md:hidden"></div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white/80 hover:text-white hover:bg-black/80 transition-all z-20">
            ✕
          </button>
       </div>

       <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          <div className="border-b border-white/10 pb-6">
             <div className="flex items-center gap-3 mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-red-500">
                <span>ITEM #{item.id.toUpperCase()}</span>
                <span className="w-8 h-px bg-red-800"></span>
                <span>{item.date}</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black serif text-white tracking-tight leading-none mb-4">{item.name}</h2>
             <div className="flex items-center gap-2">
                <div className="flex text-yellow-500 text-lg">{'★'.repeat(Math.floor(item.rating || 0))}</div>
                <span className="text-xs font-mono text-zinc-500 self-end mb-1">/ 5.0 RATING</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div>
                 <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Location</div>
                 <div className="text-base serif text-white">{item.restaurant}</div>
             </div>
             <div>
                 <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Cuisine</div>
                 <div className="text-base font-mono text-zinc-300">{item.cuisine}</div>
             </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/5">
             <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-3">Observer's Note</div>
             <p className="text-lg font-serif italic text-zinc-200 leading-relaxed">“{item.description}”</p>
          </div>
          
          <div className="mt-auto pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
             <span>Price: {item.price}</span>
             <span>Status: COLLECTED</span>
          </div>
       </div>
    </motion.div>
  </motion.div>
);

// --- 3. 主组件 ---
const Goodies: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'eat' | 'drink' | 'dining' | 'buy'>('dining');
  const [selectedDiningItem, setSelectedDiningItem] = useState<GoodieItem | null>(null);

  const filteredData = filter === 'all' 
    ? GOODIES_DATA 
    : GOODIES_DATA.filter(item => item.category === filter);

  const isDiningView = filter === 'dining';

  return (
    <div className="relative min-h-full">
      {/* Portal 弹窗挂载 */}
      <AnimatePresence>
        {selectedDiningItem && (
          <DiningDetail item={selectedDiningItem} onClose={() => setSelectedDiningItem(null)} />
        )}
      </AnimatePresence>

      <div className={`space-y-12 pb-24 transition-all duration-500 ${selectedDiningItem ? 'blur-sm pointer-events-none' : ''}`}>
        
        {/* Header */}
        <div className="space-y-6">
           <div className="flex items-center gap-4">
             <span className="w-8 h-px bg-red-600"></span>
             <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Inventory / 物品栏</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-black serif leading-none tracking-tighter text-white">ITEMS.</h2>
           <p className="text-zinc-500 max-w-2xl text-lg font-light leading-relaxed serif italic">
             “收集实体，也收集瞬间的味觉。每一个图鉴都是一次‘已获得’。”
           </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 md:gap-8 border-b border-white/10 pb-4 overflow-x-auto scrollbar-hide">
          {['dining', 'eat', 'drink', 'buy', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-colors relative pb-2 shrink-0 ${
                filter === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {tab === 'dining' ? 'FOOD DEX' : tab}
              {filter === tab && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          <AnimatePresence mode="wait">
            {isDiningView ? (
              // 🎮 游戏图鉴模式：更密集的 Grid
              <motion.div
                key="dining-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // 🔥 关键修改：每行显示更多，卡片更小，间距更紧凑
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
              >
                {filteredData.map((item) => (
                  <DiningCard key={item.id} item={item} onClick={() => setSelectedDiningItem(item)} />
                ))}
              </motion.div>
            ) : (
              // 普通列表模式
              <motion.div key="normal-list" className="space-y-4">
                {filteredData.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group flex flex-col md:flex-row md:items-center gap-6 py-4 md:py-6 border-b border-white/5 hover:bg-white/[0.02] -mx-4 px-4 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-6 md:w-1/3 shrink-0">
                      <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest w-8 shrink-0">{item.id}</span>
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-800 rounded-lg overflow-hidden shrink-0 border border-white/5">
                        {item.image ? (
                          <img src={item.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">NA</div>
                        )}
                      </div>
                      <div className="space-y-1">
                         <h3 className="text-base md:text-lg font-bold serif text-zinc-200 group-hover:text-white transition-colors">{item.name}</h3>
                         <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                            <span className="text-amber-500">● {item.category}</span>
                            <span>{item.price}</span>
                         </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="text-sm font-light serif text-zinc-500 italic leading-relaxed md:border-l-2 border-zinc-800 md:pl-4 group-hover:border-red-900 transition-colors">“{item.description}”</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {filteredData.length === 0 && (
            <div className="py-20 text-center text-zinc-700 font-mono text-xs uppercase tracking-widest">
              No Data Collected Yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goodies;