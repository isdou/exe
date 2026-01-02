import React from 'react';
import { motion } from 'framer-motion';

// --- 配置你的当前状态 (在这里随时更新) ---
const NOW_DATA = {
  lastUpdated: '2026.01.05',
  location: 'Shanghai, CN',
  mood: 'Focusing / 专注',
  
  // 1. 正在进行的主任务
  focus: [
    { id: '01', task: 'Building DOU.EXE v3.0', progress: 85, status: 'RUNNING' },
    { id: '02', task: 'Learning Next.js 14', progress: 40, status: 'PENDING' },
    { id: '03', task: 'Quarterly Review', progress: 10, status: 'QUEUED' },
  ],

  // 2. 当前的输入 (书/影/音/游)
  input: [
    { type: 'READING', name: '《埃隆·马斯克传》', author: 'Walter Isaacson' },
    { type: 'PLAYING', name: 'Black Myth: Wukong', author: 'Chapter 3' },
    { type: 'LISTENING', name: 'Endless Summer Vacation', author: 'Miley Cyrus' },
  ],

  // 3. 痴迷/关注 (Obsessions)
  obsessions: [
    'Retro UI Design',
    'Pour-over Coffee',
    'Mechanical Keyboards'
  ],

  // 4. 生活碎碎念 (Logs)
  logs: [
    '最近在尝试早起（6:30 AM），试图抢在世界醒来之前获得两小时的宁静。',
    '重新迷上了胶片摄影，买了卷柯达 Gold 200，期待冲洗结果。',
    '觉得现在的互联网太吵了，正在主动减少社交媒体的摄入量。'
  ]
};

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: `${progress}%` }}
      transition={{ duration: 1 }}
      className={`h-full ${progress > 80 ? 'bg-green-500' : progress > 40 ? 'bg-yellow-500' : 'bg-zinc-500'}`}
    />
  </div>
);

const Now: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 text-green-500 font-mono text-xs tracking-[0.3em] uppercase mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            System Status Monitor
          </div>
          <h1 className="text-5xl md:text-7xl font-black serif text-white tracking-tighter">NOW.</h1>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-1 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
           <div>Location: <span className="text-zinc-300">{NOW_DATA.location}</span></div>
           <div>Last Sync: <span className="text-zinc-300">{NOW_DATA.lastUpdated}</span></div>
           <div>Current Mood: <span className="text-red-500">{NOW_DATA.mood}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* 1. Active Processes (任务进度) */}
        <section className="space-y-6">
           <h3 className="text-xl font-bold serif text-white border-l-4 border-red-600 pl-4">Active Processes</h3>
           <div className="space-y-4">
             {NOW_DATA.focus.map((item) => (
               <div key={item.id} className="bg-white/[0.03] border border-white/5 p-4 rounded-lg space-y-2 group hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-center font-mono text-xs">
                     <span className="text-zinc-300 font-bold group-hover:text-red-500 transition-colors">{item.task}</span>
                     <span className={`px-1.5 py-0.5 rounded text-[9px] tracking-wider ${
                       item.status === 'RUNNING' ? 'bg-green-900/30 text-green-400' : 
                       item.status === 'PENDING' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-zinc-800 text-zinc-500'
                     }`}>{item.status}</span>
                  </div>
                  <ProgressBar progress={item.progress} />
                  <div className="text-[9px] text-zinc-600 font-mono text-right">{item.progress}% COMPLETED</div>
               </div>
             ))}
           </div>
        </section>

        {/* 2. Input Stream (正在看/听) */}
        <section className="space-y-6">
           <h3 className="text-xl font-bold serif text-white border-l-4 border-yellow-500 pl-4">Input Stream</h3>
           <div className="grid grid-cols-1 gap-3">
             {NOW_DATA.input.map((item, i) => (
               <div key={i} className="flex items-center gap-4 py-3 border-b border-dashed border-white/10 hover:bg-white/[0.02] px-2 transition-colors">
                  <div className="w-16 text-[9px] font-mono text-zinc-500 uppercase tracking-widest shrink-0">{item.type}</div>
                  <div className="flex-1 truncate">
                    <div className="text-zinc-200 serif text-sm md:text-base">{item.name}</div>
                    <div className="text-zinc-600 text-xs font-mono">{item.author}</div>
                  </div>
                  {item.type === 'LISTENING' && (
                    <div className="flex gap-0.5 items-end h-3">
                      <div className="w-0.5 bg-red-500 h-full animate-[bounce_1s_infinite]"></div>
                      <div className="w-0.5 bg-red-500 h-2/3 animate-[bounce_1.2s_infinite]"></div>
                      <div className="w-0.5 bg-red-500 h-1/2 animate-[bounce_0.8s_infinite]"></div>
                    </div>
                  )}
               </div>
             ))}
           </div>

           {/* Current Obsessions */}
           <div className="pt-6">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Current Obsessions</div>
              <div className="flex flex-wrap gap-2">
                {NOW_DATA.obsessions.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-xs text-zinc-400 font-serif italic hover:border-red-500 hover:text-white transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
           </div>
        </section>

      </div>

      {/* 3. System Logs (碎碎念) */}
      <section className="border-t border-white/10 pt-10">
         <h3 className="text-xl font-bold serif text-white mb-6">Runtime Logs</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NOW_DATA.logs.map((log, i) => (
              <div key={i} className="relative p-6 bg-[#080808] border border-white/5 rounded-xl hover:border-white/20 transition-all group">
                 <div className="absolute top-4 left-4 text-4xl text-white/5 font-black serif group-hover:text-red-900/20 transition-colors">0{i+1}</div>
                 <p className="relative z-10 text-zinc-400 font-light leading-relaxed serif">“{log}”</p>
              </div>
            ))}
         </div>
      </section>

      {/* Footer Decoration */}
      <div className="flex justify-center pt-12 opacity-50">
         <div className="flex gap-1">
           {[...Array(5)].map((_, i) => (
             <div key={i} className={`w-2 h-2 rounded-full ${i===0 ? 'bg-green-500' : 'bg-zinc-800'}`}></div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default Now;