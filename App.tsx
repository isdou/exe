import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavTab } from './types';

// --- 引入所有子页面组件 ---
// 注意：确保目录下有这些组件文件，如果没有可以先用简单的占位符代替
import SystemLog from './components/Home'; // LOG / 首页
import Essays from './components/Essays';     // ESSAYS / 文章
import Curation from './components/Curation'; // INPUTS / 书影音档案
import Travel from './components/Travel';     // COORDS / 足迹
import Goodies from './components/Goodies';   // ITEMS / 好物 & 探店
import Goodies from './components/Journal';   // 
import Memory from './components/Memory';     // MEMORY / 日记
import Kernel from './components/Kernel';     // KERNEL / 关于

// --- 引入导航组件 ---
import Remote from './components/Remote';     // 右侧遥控器
import BezelNav from './components/BezelNav'; // 🔥 底部实体按键

const App: React.FC = () => {
  const [power, setPower] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.LOG);
  const [isBooting, setIsBooting] = useState(false);

  // 处理开机逻辑
  const handlePowerToggle = () => {
    if (!power) {
      setPower(true);
      setIsBooting(true);
      // 假装开机引导 1.5秒后进入系统
      setTimeout(() => setIsBooting(false), 1500);
    } else {
      setPower(false);
    }
  };

  // 根据当前 Tab 渲染对应组件
  const renderContent = () => {
    switch (activeTab) {
      case NavTab.LOG: return <SystemLog />;
      case NavTab.ESSAYS: return <Essays />;
      case NavTab.CURATION: return <Curation />;
      case NavTab.TRAVEL: return <Travel />;
      case NavTab.GOODIES: return <Goodies />;
      case NavTab.MEMORY: return <Memory />;
      case NavTab.JOURNAL: return <Journal />;       
      case NavTab.ABOUT: return <Kernel />;
      default: return <SystemLog />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 p-2 md:p-8 flex items-center justify-center font-sans selection:bg-red-900 selection:text-white overflow-hidden relative">
      
      {/* 全局背景噪点 */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* 主容器：电视 + 遥控器 */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-[1600px] items-center md:items-start justify-center relative z-10">

        {/* ================= 1. 电视机主体 (Monitor) ================= */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-[#111] rounded-[2rem] md:rounded-[3rem] shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden border-[8px] md:border-[12px] border-[#1a1a1a] flex flex-col transition-all duration-700">
          
          {/* 屏幕区域 (Screen) */}
          <div className="flex-1 relative overflow-hidden bg-black w-full h-full">
            
            {/* CRT 扫描线特效层 */}
            <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
            <div className="absolute inset-0 z-50 pointer-events-none animate-scanline bg-gradient-to-b from-transparent via-white/5 to-transparent h-32 opacity-20"></div>

            <AnimatePresence mode="wait">
              {!power ? (
                // 关机状态 (Off State)
                <motion.div
                  key="off"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'brightness(2)' }}
                  className="absolute inset-0 flex items-center justify-center bg-black z-40"
                >
                  <div className="flex flex-col items-center gap-4">
                     <div className="w-2 h-2 bg-red-900 rounded-full animate-pulse"></div>
                     <span className="text-zinc-800 text-[10px] font-mono tracking-[0.5em] uppercase">System Offline</span>
                  </div>
                </motion.div>
              ) : isBooting ? (
                // 开机引导状态 (Boot Sequence)
                <motion.div key="intro" className="absolute inset-0 z-30">
                  <Intro onComplete={() => setIsBooting(false)} />
                </motion.div>
              ) : (
                // 正常运行状态 (Main Content)
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(5px)' }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 overflow-y-auto custom-scrollbar p-6 md:p-12 pb-32"
                >
                   {renderContent()}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* 屏幕内边框光晕 (Vignette) */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-40 rounded-[1.5rem] md:rounded-[2.5rem]"></div>
          </div>

          {/* 👇👇👇 底部控制面板 (Bezel Area) 👇👇👇 */}
          <div className="h-14 md:h-20 bg-[#0c0c0c] relative shrink-0 z-50 border-t border-white/5">
             {/* 引入我们刚才写的 BezelNav 组件 */}
             <BezelNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

        </div>

        {/* ================= 2. 遥控器 (Remote Control) ================= */}
        {/* 在小屏幕上隐藏，只在大屏幕显示 */}
        <div className="hidden lg:block sticky top-8 shrink-0">
          <Remote 
            power={power} 
            onPowerToggle={handlePowerToggle}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

      </div>

      {/* 移动端浮动电源键 (Mobile Power Button) - 因为移动端没有遥控器 */}
      <div className="lg:hidden fixed top-4 right-4 z-[100]">
        <button 
          onClick={handlePowerToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${power ? 'bg-red-900/20 border-red-500 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-zinc-900 border-zinc-700 text-zinc-600'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
        </button>
      </div>

    </div>
  );
};

export default App;