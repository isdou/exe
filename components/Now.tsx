import React from 'react';
import { NowUpdate } from '../types';
// --- 引用外部数据文件 ---
import { UPDATES } from '../nowData';

const Now: React.FC = () => {
  return (
    <div className="space-y-24">
      <div className="flex justify-between items-end">
        <div className="space-y-6">
          <div className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Live Frequency</div>
          <h2 className="text-8xl font-black serif">NOW.</h2>
        </div>
        <div className="text-right space-y-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse ml-auto shadow-[0_0_10px_#22c55e]"></div>
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
               <p className="text-2xl font-light text-zinc-300 leading-relaxed max-w-4xl serif italic">
                 {update.content}
               </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 text-center">
        <button className="text-[10px] uppercase tracking-[0.4em] text-zinc-700 hover:text-white transition-colors">
          END OF BUFFER
        </button>
      </div>
    </div>
  );
};

export default Now;