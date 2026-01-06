import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_ESSAYS } from '../essaysData';

/** * ============================================================
 * 1. 战术 UI 图标 (纯内联 SVG)
 * ============================================================ */
const IconLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const IconExternal = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-1 opacity-60"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
);

/** * ============================================================
 * 2. 战术嵌入组件 (音乐播放器与链接)
 * ============================================================ */
const TacticalEmbed: React.FC<{ url: string }> = ({ url }) => (
  <div className="my-10 w-full max-w-[420px] rounded-lg overflow-hidden border border-zinc-800 bg-black/40 shadow-xl group">
    <div className="px-3 py-1.5 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/20">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
        <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.2em]">External_Signal // Audio</div>
      </div>
    </div>
    <iframe src={url} width="100%" height="86" frameBorder="no" border="0" marginWidth={0} marginHeight={0} className="opacity-90 hover:opacity-100 transition-opacity grayscale-[0.3] hover:grayscale-0"></iframe>
  </div>
);

/** * ============================================================
 * 3. 战术评论区 (基于 Giscus 实现)
 * ============================================================ */
const TacticalComments: React.FC<{ essayId: string, isDark: boolean }> = ({ essayId, isDark }) => {
  useEffect(() => {
    // 动态加载 Giscus 脚本
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute('data-repo', "isdou/exe"); // 🚀 注意：请替换为你的信息
    script.setAttribute('data-repo-id', "R_kgDOQxwDRw");
    script.setAttribute('data-category', "General");
    script.setAttribute('data-category-id', "你的分类ID");
    script.setAttribute('data-mapping', "pathname");
    script.setAttribute('data-strict', "0");
    script.setAttribute('data-reactions-enabled', "1");
    script.setAttribute('data-emit-metadata', "0");
    script.setAttribute('data-input-position', "bottom");
    script.setAttribute('data-theme', isDark ? "transparent_dark" : "light");
    script.setAttribute('data-lang', "zh-CN");
    script.crossOrigin = "anonymous";
    script.async = true;

    const commentsDiv = document.getElementById('giscus-container');
    if (commentsDiv) commentsDiv.appendChild(script);

    return () => {
      const giscusFrame = document.querySelector('iframe.giscus-frame');
      if (giscusFrame) giscusFrame.remove();
    };
  }, [essayId, isDark]);

  return (
    <div className="mt-24 pt-16 border-t border-zinc-800/50 text-left">
      <div className="flex items-center gap-3 mb-10 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
        <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse"></div>
        Incoming_Transmission // Comments_Section
      </div>
      <div id="giscus-container" className="giscus" />
    </div>
  );
};

/** * ============================================================
 * 4. 主组件 Essays
 * ============================================================ */
const Essays: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState<'cn' | 'en'>('cn');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  const isDark = theme === 'dark';
  const getSerifClass = () => currentLang === 'cn' ? 'font-cn-serif' : 'font-en-serif';

  const currentEssay = useMemo(() => MOCK_ESSAYS.find(e => e.id === id && e.lang === currentLang), [id, currentLang]);
  const filteredList = useMemo(() => MOCK_ESSAYS.filter(e => e.lang === currentLang), [currentLang]);
  const currentIndex = filteredList.findIndex(e => e.id === id);
  const prevEssay = filteredList[currentIndex - 1];
  const nextEssay = filteredList[currentIndex + 1];

  useEffect(() => {
    const container = document.getElementById('essay-view-port');
    if (container) container.scrollTop = 0;
    const handleScroll = (e: any) => {
      const target = e.target;
      setScrollProgress((target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100);
    };
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [id]);

  const LangSwitcher = () => (
    <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest">
      <button onClick={() => setCurrentLang('cn')} className={`transition-colors ${currentLang === 'cn' ? 'text-red-600 font-bold' : 'text-zinc-600'}`}>CN</button>
      <span className="text-zinc-800">/</span>
      <button onClick={() => setCurrentLang('en')} className={`transition-colors ${currentLang === 'en' ? 'text-red-600 font-bold' : 'text-zinc-600'}`}>EN</button>
      <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="ml-4 px-2 py-0.5 border border-zinc-800 text-[8px] uppercase">{isDark ? 'Dark' : 'Light'}</button>
    </div>
  );

  if (id && currentEssay) {
    return (
      <div id="essay-view-port" className={`absolute inset-0 z-[200] overflow-y-auto custom-scrollbar transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-[#f4f2ee] text-zinc-900'}`}>
        <div className="fixed top-0 left-0 right-0 h-[2px] z-[210] bg-zinc-800/20">
          <div className="h-full bg-red-600 transition-all duration-75" style={{ width: `${scrollProgress}%` }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-20 space-y-16 pb-32 relative text-left">
          <div className="flex justify-between items-center">
            <button onClick={() => navigate('/essays')} className="flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors group">
              <IconLeft /> BACK TO DIRECTORY
            </button>
            <LangSwitcher />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <span>{currentEssay.date}</span>
              <span className="w-1 h-1 bg-red-600 rounded-full"></span>
              <span>{currentEssay.category}</span>
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold leading-tight tracking-tighter ${getSerifClass()}`}>{currentEssay.title}</h1>
          </div>

          <div className="prose prose-zinc max-w-none">
            {currentEssay.content?.split('\n').map((para, i) => {
              const trimmed = para.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith('[embed:')) {
                const url = trimmed.match(/\[embed:(.*?)\]/)?.[1];
                return url ? <TacticalEmbed key={i} url={url} /> : null;
              }
              return (
                <p key={i} className={`text-lg leading-loose font-light mb-8 opacity-90 ${getSerifClass()}`}>
                  {trimmed.split(/(\[\[link:.*?\]\])/g).map((part, j) => {
                    if (part.startsWith('[[link:')) {
                      const match = part.match(/\[\[link:(.*?)\|(.*?)\]\]/);
                      if (match) {
                        const isExt = match[1].startsWith('http');
                        return (
                          <span key={j} onClick={() => isExt ? window.open(match[1]) : navigate(match[1])} className="text-red-600 border-b border-red-900/30 hover:border-red-600 cursor-pointer transition-all mx-1 font-medium italic inline-flex items-center">
                            {match[2]} {isExt && <IconExternal />}
                          </span>
                        );
                      }
                    }
                    return part;
                  })}
                </p>
              );
            })}
          </div>

          {/* 导航导航 */}
          <div className={`mt-32 pt-16 border-t flex flex-col md:flex-row gap-8 ${isDark ? 'border-white/5' : 'border-zinc-200'}`}>
            {prevEssay ? (
              <div onClick={() => navigate(`/essays/${prevEssay.id}`)} className="group flex-1 cursor-pointer">
                <div className="text-[9px] font-mono text-zinc-600 mb-2 tracking-[0.2em] uppercase">{"<< Previous_Node"}</div>
                <div className={`text-lg font-bold transition-all ${isDark ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-500 group-hover:text-black'} ${getSerifClass()}`}>{prevEssay.title}</div>
              </div>
            ) : <div className="flex-1" />}
            {nextEssay ? (
              <div onClick={() => navigate(`/essays/${nextEssay.id}`)} className="group flex-1 cursor-pointer text-right">
                <div className="text-[9px] font-mono text-zinc-600 mb-2 tracking-[0.2em] uppercase">{"Next_Node >>"}</div>
                <div className={`text-lg font-bold transition-all ${isDark ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-500 group-hover:text-black'} ${getSerifClass()}`}>{nextEssay.title}</div>
              </div>
            ) : <div className="flex-1" />}
          </div>

          {/* 📍 评论区挂载点 */}
          <TacticalComments essayId={id} isDark={isDark} />
        </div>
      </div>
    );
  }

  return (
    <div className={`p-12 transition-colors duration-500 ${!isDark ? 'bg-[#f4f2ee] min-h-screen text-zinc-900' : 'text-white'}`}>
       <div className="max-w-5xl mx-auto space-y-24">
          <div className="flex justify-between items-end border-b border-zinc-800 pb-12">
            <div className="space-y-4 text-left">
              <div className="text-red-600 font-mono text-[10px] tracking-[0.4em] uppercase">Digital Chronicles / 数字编年</div>
              <h2 className="text-6xl font-black tracking-tighter">ESSAYS.</h2>
            </div>
            <LangSwitcher />
          </div>
          <div className="divide-y divide-zinc-800/50">
            {filteredList.map(essay => (
              <article key={essay.id} onClick={() => navigate(`/essays/${essay.id}`)} className="group py-10 cursor-pointer flex gap-12 text-left hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-xl">
                <div className="w-24 shrink-0 font-mono text-zinc-600 text-[10px]">{essay.date}</div>
                <div className="flex-1 space-y-2">
                  <h3 className={`text-2xl font-bold group-hover:text-red-500 transition-colors ${getSerifClass()}`}>{essay.title}</h3>
                  <p className="text-zinc-500 italic text-sm line-clamp-1">{essay.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
       </div>
    </div>
  );
};

export default Essays;