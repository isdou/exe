
import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSection {
  id: string;
  label: string;
  title: string;
  content: string;
  meta: string;
}

const INTRO_DATA: IntroSection[] = [
  {
    id: '01',
    label: 'IDENTITY / 身份',
    title: '豆豆的灵魂频道',
    content: '一个 INTJ 的数字避难所。在这里，逻辑与通感并存，死鱼眼与热血共生。我是系统构建者，也是在废墟中寻找银色光辉的观测员。',
    meta: 'STATION MONITOR: ACTIVE'
  },
  {
    id: '02',
    label: 'PURPOSE / 宗旨',
    title: '解构、重组、共振',
    content: '本站记录我打捞起的灵感碎片、深度解构的文章以及书影音的感官档案。这不仅是个人主页，更是一场关于如何在这个荒诞世界守护尊严的实验。',
    meta: 'SIGNAL STRENGTH: 100%'
  },
  {
    id: '03',
    label: 'GUIDE / 导览',
    title: '如何操控这个世界',
    content: '通过右侧遥控器（REMOTE）进行切台：CH1 信号说明；CH2 深度思考；CH3 影像实验室；CH4 实时脉冲；CH5 系统信息。',
    meta: 'USER PROTOCOL: VERIFIED'
  }
];

interface HomeProps {
  onNavigate: (tab: NavTab) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % INTRO_DATA.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = INTRO_DATA[index];

  return (
    <div className="relative h-full w-full flex flex-col justify-center py-6 md:py-12">
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 md:space-y-12"
          >
             {/* 频道元数据 */}
             <div className="flex items-center gap-4">
               <div className="px-3 py-1 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                 CH 01
               </div>
               <div className="text-red-500 font-mono text-[10px] tracking-[0.3em] uppercase">
                 {current.label}
               </div>
             </div>

             {/* 主标题 */}
             <div className="space-y-6">
               <h1 className="text-5xl sm:text-6xl md:text-8xl font-black serif leading-[1.1] tracking-tighter text-white drop-shadow-lg">
                 {current.title}
               </h1>
               <div className="h-1 w-32 bg-red-600/80"></div>
             </div>

             {/* 核心介绍文案 */}
             <div className="max-w-2xl">
               <p className="text-xl md:text-3xl font-light text-zinc-100 leading-relaxed serif italic">
                 “{current.content}”
               </p>
             </div>

             {/* 底部系统状态 */}
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-16 border-t border-white/10 pt-10 gap-8">
               <div className="space-y-3">
                 <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                   System Broadcast
                 </div>
                 <div className="text-xs text-zinc-400 font-light max-w-sm leading-relaxed">
                   正在广播：【豆豆】的个人精神信号。建议在逻辑崩溃前保持观测。
                 </div>
               </div>

               <div className="flex flex-col items-start sm:items-end gap-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                 <div className="flex items-center gap-3">
                   <span className="text-zinc-600">STATUS:</span>
                   <span className="text-green-500 font-bold">{current.meta}</span>
                 </div>
                 <div className="text-zinc-700">COORD: 35.68N, 139.69E</div>
               </div>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 背景装饰大字 */}
      <div className="absolute top-0 right-0 text-[150px] font-black text-white/[0.02] serif pointer-events-none select-none leading-none -translate-y-1/4 translate-x-1/4">
        LOG
      </div>
    </div>
  );
};

export default Home;
