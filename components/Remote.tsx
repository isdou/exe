import React from 'react';
import { NavTab } from '../types';
import { motion } from 'framer-motion';

interface RemoteProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isPowerOn: boolean;
  onTogglePower: () => void;
}

const Remote: React.FC<RemoteProps> = ({ activeTab, onTabChange, isPowerOn, onTogglePower }) => {
  const tabs = [
    { label: 'LOG', tab: NavTab.LOG, num: '1' },
    { label: 'ESSAYS', tab: NavTab.ESSAYS, num: '2' },
    { label: 'INPUTS', tab: NavTab.CURATION, num: '3' },
    { label: 'COORDS', tab: NavTab.TRAVEL, num: '4' },
    { label: 'ITEMS', tab: NavTab.GOODIES, num: '5' },
    { label: 'CACHE', tab: NavTab.JOURNAL, num: '6' },
  //  { label: 'MEMORY', tab: NavTab.MEMORY, num: '7' }, // 🔥 新按钮
    { label: 'KERNEL', tab: NavTab.ABOUT, num: '7' },
  ];

  return (
    <div className="flex w-full max-w-[280px] lg:w-64 h-auto lg:h-[700px] bg-[#121212] rounded-[2rem] lg:rounded-[3rem] p-4 lg:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/5 flex-col items-center gap-6 lg:gap-8 overflow-y-auto">

      {/* 电源按钮 */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onTogglePower}
        className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full shrink-0 flex items-center justify-center transition-all ${
          isPowerOn ? 'bg-zinc-800 text-red-600' : 'bg-red-700 text-white'
        } shadow-lg relative overflow-hidden`}
      >
        <svg width="20" height="20" className="lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/></svg>
        {isPowerOn && <span className="absolute inset-0 bg-red-600/10 animate-pulse"></span>}
      </motion.button>

      {/* 数字键盘区 */}
      <div className="grid grid-cols-2 gap-3 lg:gap-4 w-full">
        {tabs.map((item) => (
          <motion.button
            key={item.tab}
            whileTap={{ y: 2 }}
            onClick={() => onTabChange(item.tab)}
            className={`w-full h-16 lg:h-16 rounded-xl lg:rounded-2xl flex flex-col items-center justify-center gap-1 transition-all remote-btn ${
              activeTab === item.tab
              ? 'bg-zinc-100 text-black shadow-none ring-2 ring-red-600/20'
              : 'bg-zinc-900 text-zinc-500 hover:text-zinc-200'
            }`}
          >
            <span className="text-lg lg:text-xl font-bold mono">{item.num}</span>
            <span className="text-[7px] lg:text-[8px] tracking-tighter uppercase font-bold">{item.label}</span>
          </motion.button>
        ))}
      </div>

      {/* 摇杆/控制环 */}
      <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-zinc-900 shadow-inner flex items-center justify-center shrink-0">
        <div className="absolute top-1 lg:top-2 text-[6px] lg:text-[8px] font-bold text-zinc-700">VOL</div>
        <div className="absolute bottom-1 lg:bottom-2 text-[6px] lg:text-[8px] font-bold text-zinc-700">CH</div>
        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-zinc-800 border border-white/5 shadow-xl flex items-center justify-center group overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center cursor-pointer"
          >
            <span className="text-[8px] lg:text-[9px] text-red-600 font-bold">OK</span>
          </motion.div>
        </div>
      </div>

      {/* 底部 Logo */}
      <div className="mt-auto lg:pb-4 py-2 shrink-0">
        <div className="serif text-lg lg:text-xl font-black text-zinc-800 tracking-tighter italic select-none">DOU.EXE</div>
      </div>
    </div>
  );
};

export default Remote;