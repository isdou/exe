import React from 'react';
import { NavTab } from '../types';
import { motion } from 'framer-motion';

const BezelNav: React.FC<{ activeTab: NavTab; onTabChange: (tab: NavTab) => void }> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: NavTab.LOG, label: 'LOG' }, { id: NavTab.ESSAYS, label: 'ESSAYS' },
    { id: NavTab.CURATION, label: 'INPUTS' }, { id: NavTab.TRAVEL, label: 'COORDS' },
    { id: NavTab.GOODIES, label: 'ITEMS' }, { id: NavTab.JOURNAL, label: 'CACHE' },
    { id: NavTab.ABOUT, label: 'KERNEL' }, { id: NavTab.NOW, label: 'STATUS' }
  ];

  return (
    <div className="w-full flex items-center md:justify-center gap-2 md:gap-4 px-4 overflow-x-auto no-scrollbar touch-pan-x">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => onTabChange(tab.id)} className="group relative flex flex-col items-center py-2 px-3 md:px-4 shrink-0">
          <div className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full mb-1.5 transition-all ${activeTab === tab.id ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] scale-125' : 'bg-zinc-800'}`} />
          <span className={`text-[8px] md:text-[10px] font-mono tracking-widest uppercase ${activeTab === tab.id ? 'text-white font-bold' : 'text-zinc-600'}`}>{tab.label}</span>
          {activeTab === tab.id && <motion.div layoutId="glow" className="absolute bottom-0 w-6 h-px bg-green-500/50 blur-[1px]" />}
        </button>
      ))}
    </div>
  );
};

export default BezelNav;