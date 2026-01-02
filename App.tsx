import React, { useState, useEffect, useRef } from 'react';
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
import Now from './components/Now'; // 确保已引入 Now
import Remote from './components/Remote';
import BezelNav from './components/BezelNav';

const App: React.FC = () => {
  const [power, setPower] = useState(true);
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.LOG);
  const [isBooting, setIsBooting] = useState(false);
  const [showRemote, setShowRemote] = useState(false);
  
  // 音频相关
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePowerToggle = () => {
    if (!power) {
      setPower(true);
      setIsBooting(true);
      setTimeout(() => setIsBooting(false), 1500);
      if (audioRef.current && !isMuted) audioRef.current.play().catch(() => {});
    } else {
      setPower(false);
      if (audioRef.current) audioRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted && power) audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (power && audioRef.current && !isMuted) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  }, [power]);

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
      default: return <SystemLog />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 p-2 md:p-8 flex items-center justify-center font-sans selection:bg-red-900 selection:text-white overflow-hidden relative">
      
      <audio ref={audioRef} loop preload="auto"><source src="audio/bgm.mp3" type="audio/mpeg" /></audio>
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-[1600px] items-center md:items-start justify-center relative z-10">

        {/* ================= 1. 电视机主体 ================= */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-[#111] rounded-[2rem] md:rounded-[3rem] shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden border-[8px] md:border-[12px] border-[#1a1a1a] flex flex-col transition-all duration-700">
          
          {/* 🔥 修复点：移除了 h-full 
              之前是: className="flex-1 relative overflow-hidden bg-black w-full h-full"
              现在是: className="flex-1 relative overflow-hidden bg-black w-full"
          */}
          <div className="flex-1 relative overflow-hidden bg-black w-full">
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
             
             <button 
               onClick={toggleMute}
               className="hidden md:flex flex-col items-center justify-center gap-1 group opacity-60 hover:opacity-100 transition-opacity"
               title={isMuted ? "Unmute System" : "Mute System"}
             >
               <div className={`w-1.5 h-1.5 rounded-full ${isMuted ? 'bg-zinc-800' : 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]'}`}></div>
               <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">AUDIO</span>
             </button>
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
          onClick={toggleMute}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all shadow-lg backdrop-blur-md ${
            !isMuted 
              ? 'bg-zinc-900/80 border-green-500/50 text-green-500' 
              : 'bg-zinc-900/80 border-zinc-700 text-zinc-600'
          }`}
        >
           {isMuted ? (
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
           ) : (
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
           )}
        </button>

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