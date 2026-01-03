import React from 'react';
import { NavTab } from '../types';
import { motion } from 'framer-motion';

interface RemoteProps { activeTab: NavTab; onTabChange: (tab: NavTab) => void; isPowerOn: boolean; onTogglePower: () => void; }

const Remote: React.FC<RemoteProps> = ({ activeTab, onTabChange, isPowerOn, onTogglePower }) => {
  const tabs = [
    { label: 'LOG', tab: NavTab.LOG, num: '1' }, { label: 'ESSAYS', tab: NavTab.ESSAYS, num: '2' },
    { label: 'INPUTS', tab: NavTab.CURATION, num: '3' }, { label: 'COORDS', tab: NavTab.TRAVEL, num: '4' },
    { label: 'ITEMS', tab: NavTab.GOODIES, num: '5' }, { label: 'CACHE', tab: NavTab.JOURNAL, num: '6' },
    { label: 'KERNEL', tab: NavTab.ABOUT, num: '7' }
  ];

  return (
    <div className="w-[260px] md:w-64 max-h-[80vh] bg-[#121212] rounded-[2.5rem] p-6 shadow-2xl border border-white/5 flex flex-col items-center gap-6 overflow-y-auto no-scrollbar">
      <motion.button onClick={onTogglePower} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${isPowerOn ? 'bg-zinc-800 text-red-600' : 'bg-red-700 text-white'}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/></svg>
      </motion.button>

      <div className="grid grid-cols-2 gap-3 w-full">
        {tabs.map((item) => (
          <button key={item.tab} onClick={() => onTabChange(item.tab)} className={`h-14 md:h-16 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${activeTab === item.tab ? 'bg-zinc-100 text-black' : 'bg-zinc-900 text-zinc-500'}`}>
            <span className="text-lg font-bold font-mono">{item.num}</span>
            <span className="text-[7px] uppercase font-bold tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-zinc-800 flex items-center justify-center">
          <div className="text-[8px] text-red-600 font-bold">OK</div>
        </div>
      </div>
      <div className="mt-2 serif text-lg font-black text-zinc-800 italic select-none">DOU.EXE</div>
    </div>
  );
};

export default Remote;