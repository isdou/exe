
import React from 'react';
import { NowUpdate } from '../types';

const UPDATES: NowUpdate[] = [
  { id: '1', timestamp: '2024-11-25 22:15', content: '正在解构一套复杂的 UI 设计语言。在理性与美学的交叉点上，寻找某种不被定义的自由。', status: 'CODING' },
  { id: '2', timestamp: '2024-11-20 10:30', content: '重温《银魂》红樱篇。即便灵魂支离破碎，也要为了守护那一抹银色而战斗到底。', status: 'READING' },
  { id: '3', timestamp: '2024-11-15 01:00', content: '深夜的逻辑总是比白天清晰。构建系统，是整理世界唯一的手段。', status: 'THINKING' },
];

const Now: React.FC = () => {
  return (
    <div className="space-y-24">
      <div className="flex justify-between items-end">
        <div className="space-y-6">
          <div className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Live Frequency</div>
          <h2 className="text-8xl font-black serif-display">NOW.</h2>
        </div>
        <div className="text-right space-y-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse ml-auto"></div>
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">System Active / Pulse: Normal</div>
        </div>
      </div>

      <div className="space-y-1">
        {UPDATES.map((update) => (
          <div key={update.id} className="group relative border-t border-white/5 py-12 flex flex-col md:flex-row gap-12 hover:bg-white/[0.02] transition-colors px-8 -mx-8">
            <div className="w-48 shrink-0">
               <div className="text-xs font-mono text-zinc-600 mb-2">{update.timestamp}</div>
               <div className="text-[10px] text-red-600 tracking-widest uppercase font-bold">{update.status}</div>
            </div>
            <div className="flex-1">
               <p className="text-2xl font-light text-zinc-300 leading-relaxed max-w-4xl">
                 {update.content}
               </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 text-center">
        <button className="text-[10px] uppercase tracking-[0.4em] text-zinc-700 hover:text-white transition-colors">
          LOAD MORE FRAGMENTS
        </button>
      </div>
    </div>
  );
};

export default Now;
