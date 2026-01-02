import React from 'react';
import { NavTab } from '../types';
import { motion } from 'framer-motion';

interface BezelNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const BezelNav: React.FC<BezelNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: NavTab.LOG, label: 'LOG' },
    { id: NavTab.ESSAYS, label: 'ESSAYS' },
    { id: NavTab.CURATION, label: 'INPUTS' },
    { id: NavTab.TRAVEL, label: 'COORDS' },
    { id: NavTab.GOODIES, label: 'ITEMS' },
    { id: NavTab.JOURNAL, label: 'CACHE' },
    { id: NavTab.ABOUT, label: 'KERNEL' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center gap-2 md:gap-6 px-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="group relative flex flex-col items-center justify-center py-2 px-2 md:px-4 cursor-pointer"
        >
          {/* 指示灯状态 */}
          <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full mb-2 transition-all duration-300 ${
            activeTab === tab.id 
              ? 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] scale-125' 
              : 'bg-zinc-800 group-hover:bg-zinc-600'
          }`} />
          
          {/* 标签文本 */}
          <span className={`text-[8px] md:text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${
            activeTab === tab.id 
              ? 'text-white font-bold' 
              : 'text-zinc-600 group-hover:text-zinc-400'
          }`}>
            {tab.label}
          </span>

          {/* 激活时的底部微光 */}
          {activeTab === tab.id && (
            <motion.div
              layoutId="bezel-glow"
              className="absolute bottom-0 w-8 h-px bg-red-600/50 blur-[2px]"
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default BezelNav;