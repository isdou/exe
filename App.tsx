import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavTab } from './types';

// --- 引入所有子页面组件 ---
import SystemLog from './components/Home';      // LOG -> Home.tsx
import Essays from './components/Essays';       // ESSAYS -> Essays.tsx
import Curation from './components/Curation';   // INPUTS -> Curation.tsx
import Travel from './components/Travel';       // COORDS -> Travel.tsx
import Goodies from './components/Goodies';     // ITEMS -> Goodies.tsx
import Memory from './components/Memory';
import Kernel from './components/About';        // KERNEL -> About.tsx

// --- 引入导航组件 ---
import Remote from './components/Remote';
import BezelNav from './components/BezelNav';

const App: React.FC = () => {
  // 🔥 修改点 1：默认 power 为 true (开机状态)
  const [power, setPower] = useState(true);
  
  // 🔥 修改点 2：默认 activeTab 设为 LOG 或者喜欢的任意页面
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.LOG);
  
  // 🔥 修改点 3：isBooting 默认为 false，这样就没有开机动画，直接进入系统
  // 如果你想要那种 "一进网站自动播放开机动画" 的效果，就把这里改成 true，并在 useEffect 里设置定时器
  const [isBooting, setIsBooting] = useState(false);

  // 🔥 修改点 4：新增控制遥控器显示的开关，默认为 false (不显示)
  const [showRemote, setShowRemote] = useState(false);

  // 处理电源逻辑
  const handlePowerToggle = () => {
    if (!power) {
      setPower(true);
      setIsBooting(true);
      setTimeout(() => setIsBooting(false), 1500);
    } else {
      setPower(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavTab.LOG: return <SystemLog />;
      case NavTab.ESSAYS: return <Essays />;
      case NavTab.CURATION: return <Curation />;
      case NavTab.TRAVEL: return <Travel />;
      case NavTab.GOODIES: return <Goodies />;
      case NavTab.MEMORY: return <Memory />;
      case NavTab.JOURNAL: return <Memory />;    
      case NavTab.ABOUT: return <Kernel />;
      default: return <SystemLog />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 p-2 md:p-8 flex items-center justify-center font-sans selection:bg-red-900 selection:text-white overflow-hidden relative">
      
      {/* 全局背景噪点 */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* 主容器 */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-[1600px] items-center md:items-start justify-center relative z-10">

        {/* ================= 1. 电视机主体 ================= */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-[#111] rounded-[2rem] md:rounded-[3rem] shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden border-[8px] md:border-[12px] border-[#1a1a1a] flex flex-col transition-all duration-700">
          
          <div className="flex-1 relative overflow-hidden bg-black w-full h-full">
            <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
            <div className="absolute inset-0 z-50 pointer-events-none animate-scanline bg-gradient-to-b from-transparent via-white/5 to-transparent h-32 opacity-20"></div>

            <AnimatePresence mode="wait">
              {!power ? (
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
                // 这里可以引入 Intro 组件，但如果默认不 Booting 就不会显示
                <motion.div key="intro" className="absolute inset-0 z-30 bg-black text-white flex items-center justify-center font-mono">
                   BOOTING...
                </motion.div>
              ) : (
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
            
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-40 rounded-[1.5rem] md:rounded-[2.5rem]"></div>
          </div>

          {/* 底部控制面板 */}
          <div className="h-14 md:h-20 bg-[#0c0c0c] relative shrink-0 z-50 border-t border-white/5">
             <BezelNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

        </div>

        {/* ================= 2. 遥控器 (Remote Control) ================= */}
        {/* 🔥 修改点 5：使用 AnimatePresence 来做遥控器的进出动画 */}
        <AnimatePresence>
          {showRemote && (
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              className="hidden lg:block sticky top-8 shrink-0 z-[60]"
            >
              <div className="relative">
                <Remote 
                  power={power} 
                  onPowerToggle={handlePowerToggle}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
                {/* 遥控器上的关闭按钮 */}
                <button 
                  onClick={() => setShowRemote(false)}
                  className="absolute -top-3 -right-3 w-6 h-6 bg-red-900/80 rounded-full text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                  title="Hide Remote"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ================= 3. 悬浮开关 (Toggle Remote) ================= */}
      {/* 🔥 修改点 6：无论是在移动端还是桌面端，都显示这个悬浮按钮 */}
      {/* 它的功能是：如果遥控器没显示，就显示遥控器；如果是在移动端，它也可以作为电源开关的备选入口，或者仅仅是装饰 */}
      <motion.div 
        className="fixed top-4 right-4 z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button 
          onClick={() => setShowRemote(!showRemote)}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all shadow-lg backdrop-blur-md ${
            showRemote 
              ? 'bg-red-600 border-red-500 text-white' 
              : 'bg-zinc-900/80 border-zinc-700 text-zinc-500 hover:text-white hover:border-zinc-500'
          }`}
          title={showRemote ? "Hide Remote" : "Show Remote"}
        >
          {/* 图标：一个简单的网格代表遥控器，或者开关图标 */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {showRemote ? (
               // 显示时：关闭图标
               <line x1="18" y1="6" x2="6" y2="18"></line>
            ) : (
               // 隐藏时：遥控器图标
               <>
                 <rect x="6" y="2" width="12" height="20" rx="2" ry="2" />
                 <line x1="12" y1="18" x2="12" y2="18.01" />
                 <line x1="12" y1="6" x2="12" y2="6.01" />
                 <line x1="12" y1="10" x2="12" y2="10.01" />
                 <line x1="12" y1="14" x2="12" y2="14.01" />
               </>
            )}
            {showRemote && <line x1="6" y1="6" x2="18" y2="18"></line>}
          </svg>
        </button>
      </motion.div>

    </div>
  );
};

export default App;