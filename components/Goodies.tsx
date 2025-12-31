import React, { useState } from 'react';
import { GoodieItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
// --- 引用外部数据文件 ---
import { MOCK_GOODIES } from '../goodiesData';

// --- 组件：列表视图单项 (List View Item) ---
const ListViewItem: React.FC<{ item: GoodieItem }> = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="group flex items-center gap-4 py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
  >
    {/* 1. ID 索引 */}
    <div className="w-16 shrink-0 font-mono text-[9px] text-zinc-600 group-hover:text-red-600 transition-colors uppercase tracking-widest">
      ITM_{item.id.substring(0, 3)}
    </div>

    {/* 2. 缩略图 */}
    <div className="w-8 h-8 shrink-0 bg-zinc-800 overflow-hidden rounded-sm hidden sm:block">
      <img
        src={item.image}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all"
      />
    </div>

    {/* 3. 名称与分类 */}
    <div className="w-1/4 min-w-[140px] shrink-0">
      <div className="text-sm font-bold text-zinc-300 group-hover:text-white serif truncate transition-colors">
        {item.name}
      </div>
      <div className="flex items-center gap-2">
         <span className={`w-1.5 h-1.5 rounded-full ${
            item.category === 'eat' ? 'bg-orange-500' :
            item.category === 'drink' ? 'bg-blue-500' : 'bg-zinc-500'
         }`}></span>
         <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">{item.category}</span>
      </div>
    </div>

    {/* 4. 价格 */}
    <div className="w-24 shrink-0 font-mono text-xs text-zinc-500 group-hover:text-white transition-colors text-right pr-4">
      {item.price}
    </div>

    {/* 5. 推荐理由 (核心逻辑) */}
    <div className="flex-1 min-w-0 pr-4">
       <div className="text-xs text-zinc-500 font-light serif italic truncate group-hover:text-zinc-300 transition-colors border-l border-zinc-800 pl-3">
         “{item.reason}”
       </div>
    </div>
  </motion.div>
);

// --- 组件：网格视图卡片 (Grid View Card - 瘦身版) ---
const GoodieCard: React.FC<{ item: GoodieItem }> = ({ item }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-[#0f0f10] border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-all"
  >
    {/* 图片高度压缩 */}
    <div className="h-40 overflow-hidden relative">
      <img src={item.image} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] text-white mono uppercase tracking-widest border border-white/10">
        {item.category}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] to-transparent"></div>
    </div>

    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white serif leading-tight">{item.name}</h3>
          <span className="text-[10px] text-zinc-500 mono bg-white/5 px-1.5 py-0.5 rounded">{item.price}</span>
        </div>
        <p className="text-[10px] text-zinc-500 font-light leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>

      <div className="pt-3 border-t border-white/5">
        <div className="text-[9px] text-red-800 mono font-bold tracking-widest uppercase mb-1 group-hover:text-red-600 transition-colors">Logic:</div>
        <p className="text-xs text-zinc-300 italic serif font-light line-clamp-2">
          “{item.reason}”
        </p>
      </div>
    </div>
  </motion.div>
);

// --- 主组件 ---
const Goodies: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'eat' | 'drink' | 'buy'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // 默认 List

  const filteredItems = filter === 'all' ? MOCK_GOODIES : MOCK_GOODIES.filter(i => i.category === filter);

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">

      {/* 头部区域：标题 + 筛选 + 视图切换 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-red-600"></span>
            <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Inventory / 好物清单</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black serif text-white tracking-tighter leading-none">GOODIES.</h2>
          <p className="text-zinc-500 text-lg md:text-xl font-light serif italic max-w-2xl">
            “分享那些能让我的熵值降低，或者让我的大脑回路产生正反馈的物质实体。”
          </p>
        </div>

        <div className="flex flex-col items-end gap-4">
          {/* 视图切换按钮 */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>

      {/* 过滤器 Tab */}
      <div className="flex gap-4 border-b border-white/5 pb-0 overflow-x-auto">
        {['all', 'eat', 'drink', 'buy'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-4 border-b-2 text-[10px] font-mono uppercase tracking-widest transition-all ${
              filter === f ? 'border-red-600 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 内容展示区 */}
      <div className="min-h-[400px]">
        {viewMode === 'grid' ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <GoodieCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col">
            {filteredItems.map((item) => (
              <ListViewItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Goodies;