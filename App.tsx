import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavTab } from './types';

// --- 组件引入 ---
import SystemLog from './components/Home';
import Essays from './components/Essays';
import Curation from './components/Curation';
import Travel from './components/Travel';
import Goodies from './components/Goodies';
import Journal from './components/Journal';
import Kernel from './components/About';
import Now from './components/Now';
// import Dreams from './components/Dreams'; // 💡 如果你创建了 Dreams.tsx，请取消这行注释
import Remote from './components/Remote';
import BezelNav from './components/BezelNav';

const App: React.FC = () => {
  const [power, setPower] = useState(true);
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.LOG);
  const [isBooting, setIsBooting] = useState(false);
  const [showRemote, setShowRemote] = useState(false);

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
      case NavTab.JOURNAL: return <Journal />;
      case NavTab.ABOUT: return <Kernel />;
      case NavTab.NOW: return <Now />;
      // case NavTab.DREAMS: return <Dreams />;
      default: return <SystemLog />;
    }
  };

  return (
    // 修改点1：移除了 p-2 md:p-8，允许电视机尽可能撑满屏幕，只由 margin 控制间隙
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center font-sans selection:bg-red-900 selection:text-white overflow-hidden relative">
      
      {/* 背景噪点 */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* 修改点2：移除了 max-w-[1600px] 和 w-full，让内容自然撑开，并确保 flex 居中 */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center relative z-10">

        {/* ================= 1. 电视机主体 ================= */}
        {/* 修改点3：移除了 Tailwind 的 aspect 和 width 类，改用 style 动态计算 */}
        <div 
          className="relative mx-auto bg-[#111] rounded-[2rem] md:rounded-[3rem] shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden border-[8px] md:border-[12px] border-[#1a1a1a] flex flex-col transition-all duration-700"
          style={{
            // 核心公式：取 "屏幕宽度的96%" 和 "屏幕高度96%对应的16:9宽度" 中的较小值
            // 这样无论屏幕是宽是窄，电视机都会尽可能大，但绝不会超出屏幕，且始终保持 16:9
            width: 'min(96vw, calc(96vh * 16 / 9))',
            height: 'min(96vh, calc(96vw * 9 / 16))',
            aspectRatio: '16 / 9'
          }}
        >
          
          {/* 这会让 Chrome 正确计算剩余高度，不再挤掉底部按钮 */}
          <div className="flex-1 min-h-0 relative overflow-hidden bg-black w-full">
            <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
            <div className="absolute inset-0 z-50 pointer-events-none animate-scanline bg-gradient-to-b from-transparent via-white/5 to-transparent h-32 opacity-20"></div>

            <div id="tv-modal-root" className="absolute inset-0 z-[200] pointer-events-none"></div>

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
          <div className="h-14 md:h-20 bg-[#0c0c0c] relative shrink-0 z-50 border-t border-white/5 flex items-center justify-between pr-8">
             <div className="flex-1">
               <BezelNav activeTab={activeTab} onTabChange={setActiveTab} />
             </div>
          </div>

        </div>

        {/* ================= 2. 遥控器 ================= */}
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
                <button 
                  onClick={() => setShowRemote(false)}
                  className="absolute -top-3 -right-3 w-6 h-6 bg-red-900/80 rounded-full text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ================= 3. 悬浮按钮组 ================= */}
      <motion.div 
        className="fixed top-4 right-4 z-[100] flex flex-col gap-4"
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
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12" y2="18.01" /><line x1="12" y1="6" x2="12" y2="6.01" /></svg>
        </button>
      </motion.div>

    </div>
  );
};

export default App;