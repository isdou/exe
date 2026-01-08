import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { NavTab } from './types';
import Remote from './components/Remote';
import BezelNav from './components/BezelNav';

const App: React.FC = () => {
  const [power, setPower] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [showRemote, setShowRemote] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTabFromPath = (path: string): NavTab => {
    const p = path.replace(/\/$/, ""); 
    if (p === "" || p === "/") return NavTab.LOG;
    if (p.includes("essays")) return NavTab.ESSAYS;
    if (p.includes("curation")) return NavTab.CURATION;
    if (p.includes("travel")) return NavTab.TRAVEL;
    if (p.includes("goodies")) return NavTab.GOODIES;
    if (p.includes("journal")) return NavTab.JOURNAL;
    if (p.includes("about")) return NavTab.ABOUT;
    if (p.includes("now")) return NavTab.NOW;
    return NavTab.LOG;
  };

  const activeTab = getTabFromPath(location.pathname);

  const handleTabChange = (tab: NavTab) => {
    const routes = {
      [NavTab.LOG]: '/', [NavTab.ESSAYS]: '/essays', [NavTab.CURATION]: '/curation',
      [NavTab.TRAVEL]: '/travel', [NavTab.GOODIES]: '/goodies', [NavTab.JOURNAL]: '/journal',
      [NavTab.ABOUT]: '/about', [NavTab.NOW]: '/now'
    };
    navigate(routes[tab as keyof typeof routes] || '/');
    if (isMobile) setShowRemote(false);
  };

  const handlePowerToggle = () => {
    if (!power) {
      setPower(true);
      setIsBooting(true);
      setTimeout(() => setIsBooting(false), 800);
    } else {
      setPower(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center font-sans overflow-hidden relative">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center relative z-10 w-full px-2 md:px-0">
        <div 
          className="relative mx-auto bg-[#111] rounded-[1.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden border-[4px] md:border-[12px] border-[#1a1a1a] flex flex-col transition-all duration-500"
          style={{
            width: isMobile ? '96vw' : 'min(94vw, calc(94vh * 16 / 9))',
            height: isMobile ? '94vh' : 'min(94vh, calc(94vw * 9 / 16))',
            aspectRatio: isMobile ? 'auto' : '16 / 9'
          }}
        >
          <div className="flex-1 min-h-0 relative bg-black w-full">
            <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,6px_100%]"></div>
            
            <div className="absolute inset-0">
              {!power ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-40 font-mono text-zinc-800 text-[10px] tracking-widest uppercase">System Offline</div>
              ) : isBooting ? (
                <div className="absolute inset-0 z-30 bg-black text-white flex items-center justify-center font-mono text-xs">BOOTING...</div>
              ) : (
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar px-6 pt-10 pb-2 md:px-12 md:pt-14 md:pb-16 ">
                   <Outlet /> 
                </div>
              )}
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] z-40 rounded-[1.2rem] md:rounded-[2.5rem]"></div>
          </div>

          <div className="h-12 md:h-20 bg-[#0c0c0c] shrink-0 z-50 border-t border-white/5 flex items-center">
             <BezelNav activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
        </div>

        {showRemote && (
          <div className={isMobile ? "fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6" : "hidden lg:block sticky top-8 z-[60]"}>
            <div className="relative animate-in zoom-in duration-200">
              <Remote activeTab={activeTab} onTabChange={handleTabChange} isPowerOn={power} onTogglePower={handlePowerToggle} />
              <button onClick={() => setShowRemote(false)} className="absolute -top-12 right-0 md:-top-4 md:-right-4 px-3 py-1 bg-red-900 text-white rounded-full text-[10px] font-mono uppercase tracking-tighter">Close</button>
            </div>
          </div>
        )}
      </div>

      <button onClick={() => setShowRemote(!showRemote)} className="fixed top-4 right-4 z-[90] w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-xl backdrop-blur-md">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12" y2="18.01" /><line x1="12" y1="6" x2="12" y2="6.01" /></svg>
      </button>
    </div>
  );
};

export default App;