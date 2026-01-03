import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeProps {
  onNavigate?: (tab: NavTab) => void;
}

const INTRO_DATA = [
  { id: '01', label: 'IDENTITY', title: '豆豆的精神频道', content: '一个正在重启的观察者，厌恶低密度信息的入侵，也拒绝廉价的共鸣。逻辑是我的防御塔，而文字是唯一能穿透防御的白名单。', meta: 'ACTIVE' },
  { id: '02', label: 'PROTOCOL', title: '反熵增实验室', content: '本系统致力于对抗记忆的‘挥发性’。在高噪且熵增的世界里，建立一个低熵的存储扇区。', meta: 'VERIFIED' }
];

const Home: React.FC<HomeProps> = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(prev => (prev + 1) % INTRO_DATA.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const current = INTRO_DATA[index];

  return (
    <div className="relative min-h-full flex flex-col justify-between py-2 md:py-6">
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6 md:space-y-12">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-red-600 text-white text-[8px] md:text-[10px] font-black">CH 01</span>
            <span className="text-red-500 font-mono text-[8px] md:text-[10px] tracking-widest">{current.label}</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black serif leading-[1.1] text-white tracking-tighter">{current.title}</h1>
            <div className="h-0.5 md:h-1 w-16 md:w-32 bg-red-600/80"></div>
          </div>
          <p className="text-sm md:text-lg font-light text-zinc-300 leading-relaxed italic max-w-2xl">“{current.content}”</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 md:mt-32 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <div className="text-[9px] font-mono text-zinc-500 flex items-center gap-2 tracking-widest uppercase">
            <span className="w-1 h-1 rounded-full bg-red-600 animate-pulse"></span> SYSTEM BROADCAST
          </div>
          <p className="text-[10px] text-zinc-400 font-light max-w-xs">正在广播个人精神信号。建议保持观测。</p>
        </div>
        <div className="text-[9px] font-mono text-zinc-500 flex flex-col items-start sm:items-end gap-1 tracking-widest uppercase">
          <div>STATUS: <span className="text-green-500">{current.meta}</span></div>
          <div className="text-zinc-700">COORD: 39.90N, 116.40E</div>
        </div>
      </div>
    </div>
  );
};

export default Home;