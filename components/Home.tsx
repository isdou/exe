
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
    label: 'IDENTITY / 身份验证',
    title: '豆豆的精神频道',
    content: '一个正在重启的观察者，厌恶低密度信息的入侵，也拒绝廉价的共鸣。在这里，逻辑是我的防御塔，而文字是唯一能穿透防御的白名单。',
    meta: 'STATION MONITOR: ACTIVE'
  },
  {
    id: '02',
    label: 'PROTOCOL / 运行协议',
    title: '反熵增实验室',
    content: '本系统致力于对抗记忆的‘挥发性’。在高噪且熵增的世界里，建立一个低熵的存储扇区，对个人精神数据进行实时固化与‘热备份’。',
    meta: 'SIGNAL STRENGTH: 100%'
  },
  {
    id: '03',
    label: 'GUIDE / 系统导航',
    title: '控制台指令集',
    content: '通过右侧终端访问子系统：[2]ESSAYS加载深度思考模块;[3]INPUTS读取书影音数据;[4]COORDS追踪物理移动轨迹;[5]ITEMS调取生存装备库;[6]CACHE访问瞬时思维碎片;按[7]KERNEL查看系统底层架构',
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
    }, 4000);
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
               <h1 className="text-4xl sm:text-5xl md:text-7xl font-black serif leading-[1.1] tracking-tighter text-white drop-shadow-lg">
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