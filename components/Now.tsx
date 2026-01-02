import React from 'react';
import { motion } from 'framer-motion';
import { NOW_DATA } from '../nowData';

// 子组件：进度条
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: `${progress}%` }}
      transition={{ duration: 1, ease: "circOut" }}
      className={`h-full ${progress > 80 ? 'bg-green-500' : progress > 40 ? 'bg-yellow-500' : 'bg-zinc-500'}`}
    />
  </div>
);

const Now: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      
      {/* 1. Header: 状态栏 */}
      <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 text-green-500 font-mono text-xs tracking-[0.3em] uppercase mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
            System Monitor
          </div>
          <h1 className="text-5xl md:text-7xl font-black serif text-white tracking-tighter">STATUS.</h1>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-1 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
           <div>Location: <span className="text-zinc-300">{NOW_DATA.location}</span></div>
           <div>Last Sync: <span className="text-zinc-300">{NOW_DATA.updated}</span></div>
           <div>Current Mood: <span className="text-red-500">{NOW_DATA.mood}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* 2. Active Processes (任务进度) */}
        <section className="space-y-6">
           <div className="flex items-center gap-2 border-l-4 border-red-600 pl-4">
             <h3 className="text-xl font-bold serif text-white">Processes</h3>
             <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">/ 任务队列</span>
           </div>
           
           <div className="space-y-4">
             {NOW_DATA.focus.map((item) => (
               <div key={item.id} className="bg-white/[0.03] border border-white/5 p-4 rounded-lg space-y-2 group hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-center font-mono text-xs">
                     <span className="text-zinc-300 font-bold group-hover:text-red-500 transition-colors">{item.task}</span>
                     {/* 状态标签 */}
                     <span className={`px-1.5 py-0.5 rounded text-[9px] tracking-wider ${
                       item.status === 'RUNNING' ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 
                       item.status === 'PENDING' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50' : 
                       'bg-zinc-800 text-zinc-500 border border-zinc-700'
                     }`}>{item.status}</span>
                  </div>
                  <ProgressBar progress={item.progress} />
                  <div className="text-[9px] text-zinc-600 font-mono text-right tracking-widest">
                    {item.progress}% COMPLETED
                  </div>
               </div>
             ))}
           </div>
        </section>

        {/* 3. Input Stream (输入流) */}
        <section className="space-y-6">
           <div className="flex items-center gap-2 border-l-4 border-yellow-500 pl-4">
             <h3 className="text-xl font-bold serif text-white">Input Stream</h3>
             <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">/ 精神食粮</span>
           </div>

           <div className="grid grid-cols-1 gap-3">
             {NOW_DATA.input.map((item, i) => (
               <div key={i} className="flex items-center gap-4 py-3 border-b border-dashed border-white/10 hover:bg-white/[0.02] px-2 transition-colors group">
                  <div className="w-20 text-[9px] font-mono text-zinc-500 uppercase tracking-widest shrink-0 group-hover:text-white transition-colors">
                    [{item.type}]
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-zinc-200 serif text-sm md:text-base truncate">{item.name}</div>
                    <div className="text-zinc-600 text-xs font-mono truncate">{item.author}</div>
                  </div>
                  {/* 如果是听歌，加个跳动的音律条特效 */}
                  {item.type === 'LISTENING' && (
                    <div className="flex gap-0.5 items-end h-3 shrink-0">
                      <div className="w-0.5 bg-red-500 h-full animate-[bounce_1s_infinite]"></div>
                      <div className="w-0.5 bg-red-500 h-2/3 animate-[bounce_1.2s_infinite]"></div>
                      <div className="w-0.5 bg-red-500 h-1/2 animate-[bounce_0.8s_infinite]"></div>
                    </div>
                  )}
               </div>
             ))}
           </div>

           {/* Tags */}
           <div className="pt-4">
              <div className="flex flex-wrap gap-2">
                {NOW_DATA.obsessions.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-[10px] text-zinc-400 font-mono uppercase hover:border-red-500 hover:text-white transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
           </div>
        </section>

      </div>

      {/* 4. Runtime Logs (日志) */}
      <section className="border-t border-white/10 pt-10">
         <div className="flex items-center gap-2 mb-6">
            <h3 className="text-xl font-bold serif text-white">Runtime Logs</h3>
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">// 碎片记录</span>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NOW_DATA.logs.map((log, i) => (
              <div key={i} className="relative p-6 bg-[#080808] border border-white/5 rounded-xl hover:border-white/20 transition-all group overflow-hidden">
                 {/* 巨大的背景数字装饰 */}
                 <div className="absolute -top-2 -left-2 text-6xl text-white/[0.02] font-black serif group-hover:text-red-900/10 transition-colors pointer-events-none">
                   0{i+1}
                 </div>
                 <p className="relative z-10 text-zinc-400 font-light leading-relaxed serif italic">
                   “{log}”
                 </p>
              </div>
            ))}
         </div>
      </section>

      {/* 底部装饰 */}
      <div className="flex justify-center pt-12 opacity-30">
        <div className="font-mono text-[8px] tracking-[1em] text-white">
          END OF STATUS REPORT
        </div>
      </div>
    </div>
  );
};

export default Now;