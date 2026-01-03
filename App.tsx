import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { NavTab } from './types';
import Remote from './components/Remote';
import BezelNav from './components/BezelNav';

const App: React.FC = () => {
  const [power, setPower] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [showRemote, setShowRemote] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromPath = (path: string): NavTab => {
    switch (path) {
      case '/': return NavTab.LOG;
      case '/essays': return NavTab.ESSAYS;
      case '/curation': return NavTab.CURATION;
      case '/travel': return NavTab.TRAVEL;
      case '/goodies': return NavTab.GOODIES;
      case '/journal': return NavTab.JOURNAL;
      case '/about': return NavTab.ABOUT;
      case '/now': return NavTab.NOW;
      default: return NavTab.LOG;
    }
  };

  const activeTab = getTabFromPath(location.pathname);

  const handleTabChange = (tab: NavTab) => {
    switch (tab) {
      case NavTab.LOG: navigate('/'); break;
      case NavTab.ESSAYS: navigate('/essays'); break;
      case NavTab.CURATION: navigate('/curation'); break;
      case NavTab.TRAVEL: navigate('/travel'); break;
      case NavTab.GOODIES: navigate('/goodies'); break;
      case NavTab.JOURNAL: navigate('/journal'); break;
      case NavTab.ABOUT: navigate('/about'); break;
      case NavTab.NOW: navigate('/now'); break;
    }
  };

  const handlePowerToggle = () => {
    if (!power) {
      setPower(true);
      setIsBooting(true);
      setTimeout(() => setIsBooting(false), 1000); // 缩短开机感应时间
    } else {
      setPower(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center font-sans selection:bg-red-900 selection:text-white overflow-hidden relative">
      
      {/* 背景噪点 */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center relative z-10">

        {/* ================= 1. 电视机主体 ================= */}
        <div 
          className="relative mx-auto bg-[#111] rounded-[2rem] md:rounded-[3rem] shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden border-[8px] md:border-[12px] border-[#1a1a1a] flex flex-col transition-all duration-700"
          style={{
            width: 'min(96vw, calc(96vh * 16 / 9))',
            height: 'min(96vh, calc(96vw * 9 / 16))',
            aspectRatio: '16 / 9'
          }}
        >
          
          <div className="flex-1 min-h-0 relative overflow-hidden bg-black w-full">
            {/* 屏幕滤镜效果 */}
            <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
            <div id="tv-modal-root" className="absolute inset-0 z-[200] pointer-events-none"></div>

            {/* 关键修改：直接渲染内容，不再使用 AnimatePresence */}
            <div className="absolute inset-0">
              {!power ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-40">
                  <div className="flex flex-col items-center gap-4">
                     <div className="w-2 h-2 bg-red-900 rounded-full animate-pulse"></div>
                     <span className="text-zinc-800 text-[10px] font-mono tracking-[0.5em] uppercase">System Offline</span>
                  </div>
                </div>
              ) : isBooting ? (
                <div className="absolute inset-0 z-30 bg-black text-white flex items-center justify-center font-mono">
                   BOOTING...
                </div>
              ) : (
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-6 md:p-12 pb-32">
                   <Outlet /> 
                </div>
              )}
            </div>
            
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-40 rounded-[1.5rem] md:rounded-[2.5rem]"></div>
          </div>

          {/* 底部控制面板 */}
          <div className="h-14 md:h-20 bg-[#0c0c0c] relative shrink-0 z-50 border-t border-white/5 flex items-center justify-between pr-8">
             <div className="flex-1">
               <BezelNav activeTab={activeTab} onTabChange={handleTabChange} />
             </div>
          </div>

        </div>

        {/* ================= 2. 遥控器 ================= */}
        {showRemote && (
          <div className="hidden lg:block sticky top-8 shrink-0 z-[60]">
            <div className="relative">
              <Remote 
                power={power} 
                onPowerToggle={handlePowerToggle}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
              <button 
                onClick={() => setShowRemote(false)}
                className="absolute -top-3 -right-3 w-6 h-6 bg-red-900/80 rounded-full text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ================= 3. 悬浮按钮组 ================= */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-4">
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
      </div>

    </div>
  );
};

export default App;