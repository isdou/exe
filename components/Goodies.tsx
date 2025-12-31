
import React, { useState } from 'react';
import { GoodieItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
// --- 引用外部数据文件 ---
import { MOCK_GOODIES } from '../goodiesData';

const Goodies: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'eat' | 'drink' | 'buy'>('all');

  const filteredItems = filter === 'all' ? MOCK_GOODIES : MOCK_GOODIES.filter(i => i.category === filter);

  return (
    <div className="space-y-16 pb-24 animate-in fade-in duration-700">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="w-8 h-px bg-red-600"></span>
          <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Inventory / 好物清单</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black serif text-white tracking-tighter">GOODIES.</h2>
        <p className="text-zinc-500 text-lg font-light serif italic max-w-2xl">
          “分享那些能让我的熵值降低，或者让我的大脑回路产生正反馈的物质实体。”
        </p>
      </div>

      <div className="flex gap-4 border-b border-white/5 pb-8 overflow-x-auto">
        {['all', 'eat', 'drink', 'buy'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-2 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-all ${
              filter === f ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-500 hover:border-white/40'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden flex flex-col group hover:bg-zinc-900/50 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] text-white mono uppercase tracking-widest">
                  {item.category}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold text-white serif">{item.name}</h3>
                    <span className="text-[10px] text-zinc-500 mono">{item.price}</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="text-[10px] text-red-600 mono font-bold tracking-widest uppercase mb-2">Why I love it:</div>
                  <p className="text-sm text-zinc-200 italic serif font-light">“{item.reason}”</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Goodies;
