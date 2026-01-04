import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOVIES, BOOKS, MUSIC } from '../curationData';
import { GOODIES_DATA } from '../goodiesData';

// --- 1. 特效：字符解密跳变 ---
const DecryptedText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      let iterations = 0;
      timer = setInterval(() => {
        setDisplayText(text
          .split("")
          .map((letter, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
        );
        if (iterations >= text.length) clearInterval(timer);
        iterations += 1 / 2;
      }, 30);
    }, delay);
    return () => { clearTimeout(startTimeout); clearInterval(timer); };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
};

const KERNEL_LOGS = [
  "BOOTING DOUDOU_OS V2026.1...",
  "AUTH: USER_DOUDOU_INTJ",
  "PHILOSOPHY: OPTIMISTIC_NIHILISM",
  `ARCHIVE_SYNC: ${MOVIES.length + BOOKS.length + MUSIC.length} UNITS`,
  "SYSTEM_STATUS: OPERATIONAL"
];

const Home: React.FC = () => {
  const [bootStep, setBootStep] = useState(0);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    if (bootStep < KERNEL_LOGS.length) {
      const timer = setTimeout(() => setBootStep(s => s + 1), 100);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsBooted(true), 600);
    }
  }, [bootStep]);

  return (
    <div className="relative h-full font-mono text-zinc-400 p-6 md:p-8 overflow-hidden select-none flex flex-col justify-between">
      
      {/* 噪点背景 */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUicKgH6/giphy.gif')]"></div>

      <AnimatePresence mode="wait">
        {!isBooted ? (
          <motion.div 
            key="booting"
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center gap-1"
          >
            {KERNEL_LOGS.slice(0, bootStep).map((log, i) => (
              <div key={i} className={`text-[10px] md:text-xs ${i === bootStep - 1 ? 'text-white' : 'text-zinc-700'}`}>
                <span className="opacity-20 mr-2">[{i}]</span> {log}
                {i === bootStep - 1 && <span className="inline-block w-1.5 h-3 bg-red-600 ml-1 animate-pulse"></span>}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col justify-between"
          >
            {/* 1. 头部 */}
            <header className="flex justify-between items-end border-b border-white/5 pb-4">
              <div className="space-y-1">
                <h1 className="text-xl md:text-2xl font-black text-white italic tracking-tighter">
                  <DecryptedText text="DOUDOU.OS" />
                </h1>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                   <div className="text-[8px] text-zinc-600 uppercase tracking-[0.3em]">Optimistic_Nihilism_Active</div>
                </div>
              </div>
              <div className="text-right text-[10px] font-mono leading-none">
                <div className="text-white font-bold tracking-widest">{new Date().toLocaleDateString()}</div>
                <div className="text-zinc-600 mt-1 uppercase">Cycle: {new Date().getHours()}:{new Date().getMinutes()}</div>
              </div>
            </header>

            {/* 2. AI PM、Biohacking */}
            <section className="py-4 md:py-8 flex-1 flex flex-col justify-center">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* 动态波形监控器 */}
                <div className="w-full lg:w-40 space-y-3 shrink-0">
                  <div className="text-[8px] text-zinc-700 uppercase tracking-widest">Neural_Flow</div>
                  <div className="h-20 w-full bg-black/40 border border-white/5 flex items-end gap-[1px] p-2 overflow-hidden relative">
                    {[...Array(18)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [`${20+Math.random()*80}%`, `${20+Math.random()*80}%`, `${20+Math.random()*80}%`] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                        className="flex-1 bg-zinc-800"
                      />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <span className="text-[7px] font-mono tracking-[0.5em] text-white">SCANNING</span>
                    </div>
                  </div>
                </div>

                {/* 指标网格：2x2 重点展示 */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                  {[
                    { label: 'Linguistics', value: 'Deutsch_B1', sub: 'Learning', color: 'text-yellow-700' },
                    { label: 'Philosophy', value: 'Nihilism', sub: 'Optimistic_Mode', color: 'text-zinc-100' },
                    { label: 'Architecture', value: 'AI_Product_Manager', sub: 'Core_System', color: 'text-blue-500' },
                    { label: 'Optimization', value: 'Biohacking', sub: 'Durov_Protocol', color: 'text-green-600' },
                  ].map((stat, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: 0.3 + idx*0.1 }} 
                      className="border-l border-zinc-800 pl-4 space-y-1 hover:border-white transition-colors group"
                    >
                      <div className="text-[7px] text-zinc-600 uppercase font-mono group-hover:text-zinc-400">
                        {stat.label}
                      </div>
                      <div className={`text-xl md:text-2xl font-black serif tracking-tight ${stat.color}`}>
                        <DecryptedText text={stat.value} delay={600 + idx * 150} />
                      </div>
                      <div className="text-[7px] text-zinc-800 italic">[{stat.sub}]</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. 底部：资源统计与实时日志 (全部保留) */}
            <div className="grid grid-cols-12 gap-6 border-t border-white/5 pt-6">
              {/* 资源统计统计 */}
              <div className="col-span-12 md:col-span-4 flex justify-between md:flex-col md:justify-center gap-4">
                {[
                  { val: MOVIES.length, label: 'Cinema' },
                  { val: BOOKS.length, label: 'Library' },
                  { val: GOODIES_DATA.length, label: 'Goodies' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    transition={{ delay: 1 + i*0.1 }}
                    className="flex items-center gap-4 group cursor-crosshair"
                  >
                    <div className="text-2xl font-black text-white serif group-hover:text-red-600 transition-colors">{item.val}</div>
                    <div className="text-[7px] text-zinc-600 uppercase leading-tight font-mono">{item.label}<br/>Archive</div>
                  </motion.div>
                ))}
              </div>

              {/* 日志监控窗 */}
              <div className="col-span-12 md:col-span-8 bg-black/40 border border-white/5 p-4 rounded-sm text-[7px] font-mono overflow-hidden h-24 relative">
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/80 to-transparent z-10"></div>
                <div className="space-y-1 opacity-30">
                  {KERNEL_LOGS.map((log, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-zinc-800">0x0{i+1024}</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <motion.div animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="text-zinc-500">_SYSTEM_WAITING_FOR_INPUT...</motion.div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              </div>
            </div>

            {/* 页脚：虚无主义 Slogan */}
            <motion.footer 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.3 }} 
              transition={{ delay: 2 }}
              className="pt-4 text-center hover:opacity-100 transition-opacity cursor-default"
            >
               <p className="text-[8px] font-mono italic text-zinc-700 uppercase tracking-[0.4em]">
                 "If nothing matters, everything is permissible. So I build."
               </p>
            </motion.footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;