import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Article } from '../types';
import { MOCK_ESSAYS } from '../essaysData';

const Essays: React.FC = () => {
  const [selectedEssay, setSelectedEssay] = useState<Article | null>(null);
  // 📍 改动 1: 新增语言状态控制 (默认为中文)
  const [currentLang, setCurrentLang] = useState<'cn' | 'en'>('cn');
  const location = useLocation();
  // 根据当前语言返回对应的字体类名
  const getSerifClass = () => {
    return currentLang === 'cn' ? 'font-cn-serif' : 'font-en-serif';
  };


  useEffect(() => {
    setSelectedEssay(null);
  }, [location.pathname]);

  // 📍 改动 2: 语言切换逻辑
  // 当在文章详情页切换语言时，自动寻找具有相同 groupId 但语言不同的文章
  const handleToggleLang = (lang: 'cn' | 'en') => {
    setCurrentLang(lang);
    if (selectedEssay) {
      const peerEssay = MOCK_ESSAYS.find(
        e => e.groupId === selectedEssay.groupId && e.lang === lang
      );
      if (peerEssay) setSelectedEssay(peerEssay);
    }
  };

  // 📍 改动 3: 语言切换 UI 组件 (通用)
  const LangSwitcher = () => (
    <div className="flex gap-4 font-mono text-[10px] tracking-widest">
      <button 
        onClick={() => handleToggleLang('cn')}
        className={`transition-colors ${currentLang === 'cn' ? 'text-red-600 font-bold' : 'text-zinc-600 hover:text-zinc-400'}`}
      >
        CN
      </button>
      <span className="text-zinc-800">/</span>
      <button 
        onClick={() => handleToggleLang('en')}
        className={`transition-colors ${currentLang === 'en' ? 'text-red-600 font-bold' : 'text-zinc-600 hover:text-zinc-400'}`}
      >
        EN
      </button>
    </div>
  );

  if (selectedEssay) {
    return (
      <div className="absolute inset-0 bg-black z-[200] overflow-y-auto px-6 py-12 md:px-12 md:py-20 custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-16 pb-24">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSelectedEssay(null)}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mono text-[10px] uppercase tracking-widest group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              BACK TO DIRECTORY
            </button>
            
            {/* 详情页语言切换 */}
            <LangSwitcher />
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
              <span>{selectedEssay.date}</span>
              <span className="w-1 h-1 bg-red-600 rounded-full"></span>
              <span>{selectedEssay.category}</span>
            </div>
            {/* 📍 改动 C: 标题字体应用动态类名 */}
            <h1 className={`text-4xl md:text-6xl font-bold leading-tight text-white tracking-tighter ${getSerifClass()}`}>
              {selectedEssay.title}
            </h1>
            <div className="w-16 h-[1px] bg-red-600"></div>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            {selectedEssay.content?.split('\n').map((para, i) => (
              para.trim() && (
                /* 📍 改动 D: 正文字体应用动态类名 */
                <p key={i} className={`text-zinc-300 text-lg leading-loose font-light mb-8 opacity-90 whitespace-pre-wrap ${getSerifClass()}`}>
                  {para.trim()}
                </p>
              )
            ))}
          </div>

          <div className="pt-16 border-t border-white/5 flex justify-between items-center text-zinc-600 mono text-[9px] uppercase tracking-widest">
            <span>Transmission Terminated</span>
            <span>END OF BUFFER</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-24">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/5 pb-16">
        <div className="space-y-4">
          <div className="text-red-600 font-mono text-[10px] tracking-[0.4em] uppercase">Digital Chronicles / 数字编年</div>
          <h2 className="text-5xl md:text-7xl font-black serif text-white tracking-tighter leading-none">ESSAYS.</h2>
          <p className="text-zinc-500 max-w-xl text-base md:text-lg font-light leading-relaxed serif italic">
            {currentLang === 'cn' 
              ? "“文字是跨越维度的锚点。在混乱的信号流中，我捕捉那些具有确定性的逻辑线条。”"
              : "“Words are anchors across dimensions. Amidst the chaos, I seek the lines of deterministic logic.”"
            }
          </p>
        </div>
        
        {/* 列表页语言切换 */}
        <div className="pb-2">
           <LangSwitcher />
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {/* 📍 改动 4: 列表过滤逻辑 - 只显示当前语言的文章 */}
        {MOCK_ESSAYS.filter(e => e.lang === currentLang).map((essay) => (
          <article
            key={essay.id}
            onClick={() => setSelectedEssay(essay)}
            className="group py-8 cursor-pointer flex flex-col md:flex-row md:items-center gap-6 md:gap-16 hover:bg-white/[0.02] -mx-6 px-6 transition-colors"
          >
            <div className="md:w-32 shrink-0">
               <div className="text-[10px] font-mono text-zinc-600 tracking-widest mb-1">{essay.date}</div>
               <div className="text-[9px] text-red-700 font-bold tracking-widest uppercase">{essay.category}</div>
            </div>

            <div className="flex-1 space-y-2">
               <h3 className={`text-xl md:text-2xl font-bold text-zinc-200 group-hover:text-white transition-colors tracking-tight ${getSerifClass()}`}>
                 {essay.title}
               </h3>
               <p className={`text-zinc-500 text-sm md:text-base font-light leading-relaxed max-w-3xl line-clamp-2 md:line-clamp-1 italic group-hover:text-zinc-400 ${getSerifClass()}`}>
                 {essay.excerpt}
               </p>
            </div>

            <div className="hidden lg:block">
               <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
               </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pt-16 text-center">
        <div className="inline-block px-6 py-2 border border-zinc-900 rounded-full text-[9px] mono text-zinc-700 tracking-[0.5em] uppercase">
          {currentLang === 'cn' ? '目录终点' : 'End of Directory'}
        </div>
      </div>
    </div>
  );
};

export default Essays;