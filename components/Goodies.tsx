import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOODIES_DATA } from '../goodiesData';
import { GoodieItem } from '../types';

const Goodies: React.FC = () => {
  // 🔥 修改点 1：默认显示 'dining' 或者 'all'，并把 'dining' 加入分类列表
  const [filter, setFilter] = useState<'all' | 'eat' | 'drink' | 'dining' | 'buy'>('all');

  const filteredData = filter === 'all' 
    ? GOODIES_DATA 
    : GOODIES_DATA.filter(item => item.category === filter);

  return (
    <div className="space-y-12 pb-24">
      {/* Header Area */}
      <div className="space-y-6">
         <div className="flex items-center gap-4">
           <span className="w-8 h-px bg-red-600"></span>
           <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Inventory / 好物 & 探店</span>
         </div>
         <h2 className="text-5xl md:text-7xl font-black serif leading-none tracking-tighter text-white">GOODIES.</h2>
         <p className="text-zinc-500 max-w-2xl text-lg font-light leading-relaxed serif italic">
           “分享那些能让我的熵值降低的物质实体，以及让味蕾产生正反馈的瞬间。”
         </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-8 border-b border-white/10 pb-4 overflow-x-auto">
        {['all', 'eat', 'drink', 'dining', 'buy'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-colors relative pb-2 ${
              filter === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {tab}
            {filter === tab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>
        ))}
      </div>

      {/* List Content */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
              className="group flex flex-col md:flex-row md:items-center gap-6 py-6 border-b border-white/5 hover:bg-white/[0.02] -mx-4 px-4 rounded-xl transition-colors"
            >
              {/* ID & Image */}
              <div className="flex items-center gap-6 md:w-1/4 shrink-0">
                <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest w-12 shrink-0">
                  {item.id}
                </span>
                <div className="w-16 h-16 bg-zinc-800 rounded overflow-hidden shrink-0 border border-white/5">
                  {item.image ? (
                    <img src={item.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                  )}
                </div>
                
                {/* Name & Meta Info */}
                <div className="space-y-1">
                   <h3 className="text-lg font-bold serif text-zinc-200 group-hover:text-white transition-colors">{item.name}</h3>
                   
                   {/* 🔥 修改点 2：如果是 dining，显示餐厅和菜系；否则显示分类 */}
                   {item.category === 'dining' ? (
                     <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                        <span className="text-red-500">● DINING</span>
                        <span>{item.restaurant}</span>
                        <span className="text-zinc-700">/</span>
                        <span>{item.cuisine}</span>
                     </div>
                   ) : (
                     <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                        <span className="text-amber-500">● {item.category}</span>
                     </div>
                   )}
                </div>
              </div>

              {/* Price */}
              <div className="md:w-32 font-mono text-sm text-zinc-400 group-hover:text-white transition-colors shrink-0">
                 {item.price}
              </div>

              {/* Description & Quote */}
              <div className="flex-1 min-w-0">
                 <div className="text-sm font-light serif text-zinc-500 italic leading-relaxed border-l-2 border-zinc-800 pl-4 group-hover:border-red-900 transition-colors">
                   “{item.description}”
                 </div>
                 {/* 这里的 reason 也可以显示 */}
                 {item.reason && <div className="mt-2 pl-4 text-[10px] mono text-zinc-600 uppercase tracking-widest">VERDICT: {item.reason}</div>}
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredData.length === 0 && (
          <div className="py-20 text-center text-zinc-700 font-mono text-xs uppercase tracking-widest">
            Inventory Empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default Goodies;