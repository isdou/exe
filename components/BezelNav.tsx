import React from 'react';
import { NavTab } from '../types';

interface BezelNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const BezelNav: React.FC<BezelNavProps> = ({ activeTab, onTabChange }) => {
  // 映射 Tab 到显示的标签名 (对应遥控器上的文字)
  const navItems = [
    { id: NavTab.LOG, label: 'LOG' },
    { id: NavTab.ESSAYS, label: 'ESSAYS' },
    { id: NavTab.CURATION, label: 'INPUTS' },
    { id: NavTab.TRAVEL, label: 'COORDS' },
    { id: NavTab.GOODIES, label: 'ITEMS' },
    { id: NavTab.MEMORY, label: 'CACHE' },
    { id: NavTab.MEMORY, label: 'MEMORY' },
    { id: NavTab.ABOUT, label: 'KERNEL' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-between px-4 md:px-8 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      
      {/* 装饰：左侧的指示灯 */}
      <div className="hidden md:flex items-center gap-2 mr-4">
         <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse shadow-[0_0_5px_rgba(220,38,38,0.8)]"></div>
         <span className="text-[8px] font-mono text-zinc-700 tracking-widest select-none">POWER</span>
      </div>

      {/* 中间：导航按钮组 */}
      <div className="flex-1 flex items-center justify-center gap-1 md:gap-4 overflow-x-auto no-scrollbar mask-image-linear-to-r">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                group relative px-2 md:px-3 py-2 flex flex-col items-center justify-center transition-all duration-300
                ${isActive ? 'text-red-500' : 'text-zinc-600 hover:text-zinc-300'}
              `}
            >
              {/* 按钮文字 */}
              <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-widest uppercase z-10">
                {item.label}
              </span>
              
              {/* 激活时的底部光条 (类似显示器按键灯) */}
              {isActive && (
                <div className="absolute bottom-0 w-3 h-0.5 bg-red-600 shadow-[0_-2px_8px_rgba(220,38,38,0.6)] rounded-full"></div>
              )}
              
              {/* Hover 时的微弱背景 */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded transition-opacity"></div>
            </button>
          );
        })}
      </div>

      {/* 装饰：右侧的型号标识 (保留一点原来的味道) */}
      <div className="hidden md:block ml-4 text-[8px] font-mono text-zinc-800 tracking-[0.2em] select-none">
        TRINITRON V6.0
      </div>
    </div>
  );
};

export default BezelNav;