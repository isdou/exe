import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义统一的数据结构
interface MemoryItem {
  id: string;
  type: 'spark' | 'log'; // spark=灵感碎片(卡片展示), log=流水账(列表展示)
  content: string;
  date: string;
  tags?: string[];
  weather?: string; // 日记特有
}

const MEMORY_DATA: MemoryItem[] = [
  // --- 你的 Fragments 数据 (类型设为 spark) ---
  { id: 'f1', type: 'spark', content: '所有的深刻都始于对日常的背叛。', date: '2024.11.20', tags: ['哲学', '日常'] },
  { id: 'f2', type: 'spark', content: '深夜的雨声不是噪音，而是地球正在进行的某种宏大叙事。', date: '2024.11.15', tags: ['随笔', '自然'] },
  { id: 'f3', type: 'spark', content: 'AI 并非在替代创作，而是在拓展我们对“可能”的想象力边界。', date: '2024.11.10', tags: ['科技', '思考'] },
  
  // --- 你的 Journal 数据 (类型设为 log) ---
  { id: 'j1', type: 'log', content: '今天去吃了楼下的肉骨茶，味道变淡了，有点失望。', date: '2024.12.31', weather: 'Cloudy' },
  { id: 'j2', type: 'log', content: '重构了网站的底层架构，删除了冗余代码，感觉神清气爽。', date: '2025.01.02', weather: 'Sunny' },
];

const Memory: React.FC = () => {
  // 视图状态：'grid' (网格/碎片) | 'list' (列表/日志)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-8 min-h-full pb-20">
      
      {/* 头部：标题与切换开关 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h2 className="text-4xl md:text-6xl font-black serif text-white tracking-tighter">MEMORY.</h2>
             <span className="px-2 py-0.5 bg-red-900/30 border border-red-900 text-red-500 text-[10px] font-mono rounded">DATABASE</span>
          </div>
          <p className="text-zinc-500 text-sm md:text-base font-serif italic">
            {viewMode === 'grid' ? '收集那些稍纵即逝的火花' : '线性时间的线性记录'}
          </p>
        </div>

        {/* 视图切换器 */}
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-4 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Sparks
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          // --- 1. 网格视图 (原 Fragments) ---
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {MEMORY_DATA.filter(i => i.type === 'spark').map((item) => (
              <div key={item.id} className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 p-8 rounded-2xl transition-all duration-500">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 text-xl font-serif">”</div>
                <p className="text-lg md:text-xl leading-relaxed font-light text-zinc-200 serif italic">
                  {item.content}
                </p>
                <div className="mt-6 flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{item.date}</span>
                  <div className="flex gap-2">
                    {item.tags?.map(tag => (
                      <span key={tag} className="text-[9px] px-2 py-0.5 bg-black/40 text-zinc-400 rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {/* 新增按钮 (占位) */}
            <div className="border border-dashed border-white/10 rounded-2xl flex items-center justify-center p-8 text-zinc-700 hover:text-zinc-500 hover:border-white/20 transition-all cursor-pointer group">
               <div className="text-center">
                 <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">+</div>
                 <div className="text-[10px] font-mono uppercase tracking-widest">Capture Idea</div>
               </div>
            </div>
          </motion.div>
        ) : (
          // --- 2. 列表视图 (原 Journal) ---
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden"
          >
            {MEMORY_DATA.map((item) => (
              <div key={item.id} className="group flex flex-col md:flex-row gap-4 p-6 bg-[#0a0a0a] hover:bg-[#111] transition-colors border-b border-white/5 last:border-0">
                <div className="md:w-32 shrink-0 flex flex-row md:flex-col gap-2 md:gap-1">
                   <div className="text-sm font-mono text-red-600/80 font-bold">{item.date}</div>
                   {item.weather && <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{item.weather}</div>}
                   {item.type === 'spark' && <div className="text-[9px] font-mono text-blue-500 uppercase tracking-widest mt-1">✨ Spark</div>}
                </div>
                <div className="flex-1">
                   <p className={`text-base md:text-lg text-zinc-400 font-serif leading-relaxed ${item.type === 'spark' ? 'italic text-zinc-300' : ''}`}>
                     {item.content}
                   </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Memory;