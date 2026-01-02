import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 类型定义 ---
type ViewMode = 'grid' | 'list';

interface FragmentItem {
  id: string;
  content: string;
  date: string;
  tags: string[];
}

interface JournalItem {
  id: string;
  date: string;
  content: string;
  weather?: string;
  location?: string;
}

// --- 模拟数据 (请把你的真实数据填回这里) ---
const FRAGMENTS_DATA: FragmentItem[] = [
  { id: 'f1', content: '所有的深刻都始于对日常的背叛。', date: '2024.11.20', tags: ['哲学', '日常'] },
  { id: 'f2', content: '深夜的雨声不是噪音，而是地球正在进行的某种宏大叙事。', date: '2024.11.15', tags: ['随笔', '自然'] },
  { id: 'f3', content: 'AI 并非在替代创作，而是在拓展我们对“可能”的想象力边界。', date: '2024.11.10', tags: ['科技', '思考'] },
];

const JOURNAL_DATA: JournalItem[] = [
  { id: 'j1', date: '2024.12.31', weather: 'Cloudy', content: '今天是2024的最后一天。去吃了楼下的肉骨茶，味道好像变淡了。回顾这一年，虽然忙碌，但搭建了这个 DOU.EXE 系统，算是一个小小的成就。' },
  { id: 'j2', date: '2024.12.25', weather: 'Snow', content: '圣诞节没有出门，在家里重构代码。把 Curation 模块的样式改成了票根风格，感觉非常满意。红色的主色调在黑底上真的很耐看。' },
  { id: 'j3', date: '2024.12.20', weather: 'Clear', content: '开始尝试用 Next.js 重写部分逻辑，但是考虑到部署方便，还是决定保留 Vite + React 的纯静态方案。简单就是美。' },
];

// --- 组件入口 ---
// 接收一个 defaultView 参数，决定进来时默认看哪个
const Memory: React.FC<{ defaultView?: ViewMode }> = ({ defaultView = 'grid' }) => {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView);

  // 当外部传入的 defaultView 变化时（比如从遥控器切过来），更新内部状态
  useEffect(() => {
    setViewMode(defaultView);
  }, [defaultView]);

  return (
    <div className="space-y-8 min-h-full pb-32">
      
      {/* 头部：标题与切换开关 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h2 className="text-4xl md:text-6xl font-black serif text-white tracking-tighter">
               {viewMode === 'grid' ? 'FRAGMENTS.' : 'JOURNAL.'}
             </h2>
             <span className="px-2 py-0.5 bg-red-900/30 border border-red-900 text-red-500 text-[10px] font-mono rounded uppercase">
               {viewMode === 'grid' ? 'Sparks DB' : 'Timeline Log'}
             </span>
          </div>
          <p className="text-zinc-500 text-sm md:text-base font-serif italic">
            {viewMode === 'grid' ? '收集那些稍纵即逝的灵感火花' : '线性时间的线性记录与自我对话'}
          </p>
        </div>

        {/* 核心：切换按钮 Toggle */}
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-white/10 self-start md:self-end">
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'grid' ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <span>✨ Fragments</span>
          </button>
          <div className="w-px bg-white/5 my-1 mx-1"></div>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <span>📅 Journal</span>
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          // =================== 模式 A: Fragments (网格/卡片) ===================
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {FRAGMENTS_DATA.map((item) => (
              <div key={item.id} className="group relative bg-[#0f0f10] hover:bg-[#141414] border border-white/5 hover:border-white/20 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-600 text-4xl font-serif leading-none">”</div>
                <p className="text-lg md:text-xl leading-relaxed font-light text-zinc-300 serif italic pr-4">
                  {item.content}
                </p>
                <div className="mt-8 flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-hover:text-red-500 transition-colors">{item.date}</span>
                  <div className="flex gap-2">
                    {item.tags?.map(tag => (
                      <span key={tag} className="text-[9px] px-2 py-1 bg-black border border-zinc-800 text-zinc-500 rounded hover:text-zinc-300 transition-colors">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {/* 新增按钮占位符 */}
            <div className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-zinc-700 hover:text-zinc-400 hover:border-white/20 transition-all cursor-pointer min-h-[200px] group">
               <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">+</span>
               <span className="text-[10px] font-mono uppercase tracking-widest">New Fragment</span>
            </div>
          </motion.div>
        ) : (
          // =================== 模式 B: Journal (列表/时间轴) ===================
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative border-l border-white/10 ml-3 md:ml-6 space-y-8 md:space-y-12 py-2"
          >
            {JOURNAL_DATA.map((item) => (
              <div key={item.id} className="relative pl-8 md:pl-12 group">
                {/* 时间轴节点 */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#050505] border border-zinc-600 rounded-full group-hover:border-red-500 group-hover:bg-red-500 transition-colors"></div>
                
                <div className="flex flex-col gap-3">
                   {/* 日期头 */}
                   <div className="flex items-baseline gap-4">
                      <span className="text-xl md:text-2xl font-black font-mono text-white tracking-tight">{item.date}</span>
                      <div className="flex gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                         {item.weather && <span>{item.weather}</span>}
                         {item.location && <span>/ {item.location}</span>}
                      </div>
                   </div>
                   
                   {/* 内容体 */}
                   <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-xl group-hover:border-white/10 transition-colors">
                      <p className="text-base md:text-lg text-zinc-400 font-serif leading-loose whitespace-pre-wrap">
                        {item.content}
                      </p>
                   </div>
                </div>
              </div>
            ))}
            
            <div className="pl-8 md:pl-12 pt-4">
               <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest animate-pulse">End of Records</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Memory;