
import React, { useState, useEffect } from 'react';
import { NavTab } from './types';
import Log from './components/Home';
import Essays from './components/Essays';
import Curation from './components/Curation';
import Travel from './components/Travel';
import Goodies from './components/Goodies';
import Now from './components/Now';
import About from './components/About';
import Remote from './components/Remote';
import { motion, AnimatePresence } from 'framer-motion';
import Memory from './components/Journal'; // 引入新组件

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.LOG);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isRemoteVisible, setIsRemoteVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setIsRemoteVisible(true);
    }
  }, []);

  const handleChannelChange = (tab: NavTab) => {
    if (tab === activeTab) return;

    setIsSwitching(true);
    setActiveTab(tab);

    if (window.innerWidth <= 1024) {
      setTimeout(() => setIsRemoteVisible(false), 300);
    }

    setTimeout(() => {
      setIsSwitching(false);
    }, 1500);
  };

  const getChannelName = (tab: NavTab) => {
    switch (tab) {
      case NavTab.LOG: return "SIGNAL INTRODUCTION";
      case NavTab.ESSAYS: return "DEEP THINKING";
      case NavTab.CURATION: return "VISUAL ARCHIVE";
      case NavTab.TRAVEL: return "GLOBAL TRAJECTORY";
      case NavTab.GOODIES: return "GOODIES INVENTORY";
      case NavTab.NOW: return "LIVE FREQUENCY";
      case NavTab.ABOUT: return "SYSTEM INFO";
      default: return "UNKNOWN SIGNAL";
    }
  };

  const renderContent = () => {
    if (!isPowerOn) return null;
    switch (activeTab) {
      case NavTab.LOG: return <Log onNavigate={handleChannelChange} />;
      case NavTab.ESSAYS: return <Essays />;
      case NavTab.CURATION: return <Curation />;
      case NavTab.TRAVEL: return <Travel />;
      case NavTab.GOODIES: return <Goodies />;
      case NavTab.NOW: return <Now />;
      case NavTab.ABOUT: return <About />;
      default: return <Log onNavigate={handleChannelChange} />;
    }
  };
  const getChannelName = (tab: NavTab) => {
    switch (tab) {
      // ... 其他 case
      case NavTab.MEMORY: return "CHRONO LOGS"; // 新频道名称
      // ...
    }
  };
  const renderContent = () => {
    if (!isPowerOn) return null;
    switch (activeTab) {
      // ... 其他 case
      case NavTab.MEMORY: return <Memory />; // 注册组件
      // ...
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#050505] overflow-hidden text-white">

      {/* 浮动遥控器切换按钮 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsRemoteVisible(!isRemoteVisible)}
        className="fixed bottom-6 right-6 lg:top-8 lg:right-8 z-[200] w-14 h-14 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group transition-all"
      >
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className={`w-4 h-[2px] rounded-full transition-all ${isRemoteVisible ? 'bg-red-600 rotate-45 translate-y-[3px]' : 'bg-zinc-400'}`}></div>
          {!isRemoteVisible && <div className="w-4 h-[2px] bg-zinc-400 rounded-full"></div>}
          <div className={`w-4 h-[2px] rounded-full transition-all ${isRemoteVisible ? 'bg-red-600 -rotate-45 -translate-y-[3px]' : 'bg-zinc-400'}`}></div>
        </div>
      </motion.button>

      <div className="relative w-full h-full flex items-center justify-center p-0 md:p-6 lg:p-8">
        <div className="relative w-full h-full max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-0 lg:gap-8 items-center">

          {/* 电视机本体 */}
          <motion.div
            layout
            className="relative flex-1 w-full h-full bg-[#151515] p-2 md:p-4 lg:p-6 rounded-none md:rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)] border-t border-white/5 flex flex-col overflow-hidden"
          >
            <div className="relative flex-1 tv-screen bg-black rounded-none md:rounded-[2rem] shadow-inner flex flex-col overflow-hidden">

              {/* 内容区域 - 提升 z-index 确保可见 */}
              <AnimatePresence mode="wait">
                {isPowerOn && (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-[60] w-full h-full overflow-y-auto px-6 py-12 md:px-12 lg:px-16 custom-scrollbar scroll-smooth"
                  >
                    {renderContent()}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 雪花屏层 */}
              <AnimatePresence>
                {!isPowerOn && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[80] bg-black pointer-events-none"
                  >
                    <div className="static-overlay opacity-40"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* OSD 频道信息显示 */}
              <AnimatePresence>
                {isSwitching && isPowerOn && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="absolute top-8 left-8 md:top-12 md:left-12 z-[90] mono flex flex-col items-start pointer-events-none"
                  >
                    <div className="text-green-500 text-3xl md:text-5xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                      CH 0{Object.values(NavTab).indexOf(activeTab) + 1}
                    </div>
                    <div className="text-green-500/60 text-[10px] md:text-xs tracking-[0.3em] font-bold mt-1 uppercase">
                      {getChannelName(activeTab)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 电视底部边框装饰 */}
            <div className="h-10 md:h-14 flex items-center justify-between px-6 md:px-10 shrink-0">
              <div className="hidden md:flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 shadow-inner"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 shadow-inner"></div>
              </div>
              <div className="serif italic text-zinc-800 text-[10px] tracking-widest opacity-40 uppercase">DOU TRINITRON v2.5</div>
              <div className={`w-2 h-2 rounded-full shadow-[0_0_10px] transition-colors ${isPowerOn ? 'bg-red-600 shadow-red-600/50' : 'bg-zinc-900 shadow-transparent'}`}></div>
            </div>
          </motion.div>

          {/* 遥控器侧边栏 */}
          <AnimatePresence>
            {isRemoteVisible && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsRemoteVisible(false)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110] lg:hidden"
                />

                <motion.div
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 400, opacity: 0 }}
                  className="fixed lg:relative z-[120] bottom-0 left-0 right-0 lg:bottom-auto lg:left-auto lg:right-auto flex justify-center pb-10 lg:pb-0"
                  transition={{ type: "spring", damping: 30, stiffness: 200 }}
                >
                  <Remote
                    activeTab={activeTab}
                    onTabChange={handleChannelChange}
                    isPowerOn={isPowerOn}
                    onTogglePower={() => setIsPowerOn(!isPowerOn)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;
