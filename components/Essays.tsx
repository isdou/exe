import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_ESSAYS } from '../essaysData';

const Essays: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [currentLang, setCurrentLang] = useState<'cn' | 'en'>('cn');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. 数据驱动：根据 URL id 计算文章
  const currentEssay = useMemo(() => {
    if (!id) return null;
    return MOCK_ESSAYS.find(e => e.id === id && e.lang === currentLang);
  }, [id, currentLang]);

  // 2. 阅读进度逻辑
  useEffect(() => {
    const handleScroll = (e: any) => {
      const target = e.target;
      const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
      setScrollProgress(progress);
    };
    const container = document.getElementById('essay-view-port');
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [id]);

  const getSerifClass = () => currentLang === 'cn' ? 'font-cn-serif' : 'font-en-serif';
  const isDark = theme === 'dark';

  const handleToggleLang = (lang: 'cn' | 'en') => {
    setCurrentLang(lang);
    if (id && currentEssay) {
      const peerEssay = MOCK_ESSAYS.find(e => e.groupId === currentEssay.groupId && e.lang === lang);
      if (peerEssay) navigate(`/essays/${peerEssay.id}`);
    }
  };

  const LangSwitcher = () => (
    <div className="flex gap-4 font-mono text-[10px] tracking-widest">
      <button onClick={() => handleToggleLang('cn')} className={`transition-colors ${currentLang === 'cn' ? 'text-red-600 font-bold' : 'text-zinc-600'}`}>CN</button>
      <span className="text-zinc-800">/</span>
      <button onClick={() => handleToggleLang('en')} className={`transition-colors ${currentLang === 'en' ? 'text-red-600 font-bold' : 'text-zinc-600'}`}>EN</button>
      <span className="text-zinc-800 ml-2">|</span>
      <button 
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={`ml-2 px-2 border transition-all ${isDark ? 'border-zinc-800 text-zinc-600' : 'border-zinc-300 text-zinc-900 bg-zinc-200'}`}
      >
        {isDark ? 'MODE:DARK' : 'MODE:LIGHT'}
      </button>
    </div>
  );

  // 📍 文章详情页视图
  if (id && currentEssay) {
    return (
      <div 
        id="essay-view-port"
        className={`absolute inset-0 z-[200] overflow-y-auto custom-scrollbar transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-[#f4f2ee]'}`}
      >
        {/* 顶部进度条 */}
        <div className="fixed top-0 left-0 right-0 h-[2px] z-[210] bg-zinc-800/20">
           <div className="h-full bg-red-600 transition-all duration-75" style={{ width: `${scrollProgress}%` }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12 md:px-12 md:py-20 space-y-16 pb-24 relative">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/essays')}
              className={`flex items-center gap-2 transition-colors mono text-[10px] uppercase tracking-widest group ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              BACK TO DIRECTORY
            </button>
            <LangSwitcher />
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
              <span>{currentEssay.date}</span>
              <span className="w-1 h-1 bg-red-600 rounded-full"></span>
              <span>{currentEssay.category}</span>
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold leading-tight tracking-tighter ${isDark ? 'text-white' : 'text-zinc-900'} ${getSerifClass()}`}>
              {currentEssay.title}
            </h1>
            <div className="w-16 h-[1px] bg-red-600"></div>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            {currentEssay.content?.split('\n').map((para, i) => (
              para.trim() && (
                <p key={i} className={`text-lg leading-loose font-light mb-8 opacity-90 whitespace-pre-wrap ${isDark ? 'text-zinc-300' : 'text-zinc-700'} ${getSerifClass()}`}>
                  {para.trim()}
                </p>
              )
            ))}
          </div>

          <div className={`pt-16 border-t flex justify-between items-center text-zinc-600 mono text-[9px] uppercase tracking-widest ${isDark ? 'border-white/5' : 'border-zinc-300'}`}>
            <span>Transmission Terminated</span>
            <span>END OF BUFFER</span>
          </div>
        </div>
      </div>
    );
  }

  // 📍 文章列表页视图
  return (
    <div className={`space-y-24 transition-colors duration-500 ${!isDark ? 'bg-[#f4f2ee] -mx-12 px-12 py-12 rounded-lg' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/5 pb-16">
        <div className="space-y-4">
          <div className="text-red-600 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">Digital Chronicles / 数字编年</div>
          <h2 className={`text-5xl md:text-7xl font-black serif tracking-tighter leading-none ${!isDark ? 'text-zinc-900' : 'text-white'}`}>ESSAYS.</h2>
          <p className={`max-w-xl text-base md:text-lg font-light leading-relaxed serif italic ${!isDark ? 'text-zinc-600' : 'text-zinc-500'}`}>
            {currentLang === 'cn' 
              ? "“文字是跨越维度的锚点。在混乱的信号流中，我捕捉那些具有确定性的逻辑线条。”"
              : "“Words are anchors across dimensions. Amidst the chaos, I seek the lines of deterministic logic.”"
            }
          </p>
        </div>
        <div className="pb-2">
           <LangSwitcher />
        </div>
      </div>

      {/* 列表区域：还原分割线和标签显示 */}
      <div className={`divide-y ${isDark ? 'divide-white/5' : 'divide-zinc-200'}`}>
        {MOCK_ESSAYS.filter(e => e.lang === currentLang).map((essay) => (
          <article
            key={essay.id}
            onClick={() => navigate(`/essays/${essay.id}`)}
            className={`group py-8 cursor-pointer flex flex-col md:flex-row md:items-center gap-6 md:gap-16 -mx-6 px-6 transition-colors ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-zinc-200/50'}`}
          >
            <div className="md:w-32 shrink-0">
               <div className="text-[10px] font-mono text-zinc-600 tracking-widest mb-1">{essay.date}</div>
               {/* 还原：这里显示分类标签 */}
               <div className="text-[9px] text-red-700 font-bold tracking-widest uppercase">{essay.category}</div>
            </div>

            <div className="flex-1 space-y-2">
               <h3 className={`text-xl md:text-2xl font-bold transition-colors tracking-tight ${!isDark ? 'text-zinc-800' : 'text-zinc-200 group-hover:text-white'} ${getSerifClass()}`}>
                 {essay.title}
               </h3>
               <p className={`text-sm md:text-base font-light leading-relaxed max-w-3xl line-clamp-2 md:line-clamp-1 italic ${!isDark ? 'text-zinc-500' : 'text-zinc-500 group-hover:text-zinc-400'} ${getSerifClass()}`}>
                 {essay.excerpt}
               </p>
            </div>

            <div className="hidden lg:block">
               <div className={`w-10 h-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110 ${isDark ? 'border-white/10' : 'border-zinc-300'}`}>
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