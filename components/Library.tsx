
import React, { useState } from 'react';
import { CulturalLog } from '../types';

const MOCK_DATA: CulturalLog[] = [
  { 
    id: '1', 
    title: '银魂', 
    type: 'tv', 
    rating: 5, 
    comment: '人生导师。在垃圾堆一样的世界里闪烁着银色光辉。保持死鱼眼，但心要滚烫。', 
    date: '2024.11', 
    coverImage: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1200' 
  },
  { 
    id: '2', 
    title: '自私的基因', 
    type: 'book', 
    rating: 5, 
    comment: '彻底改变了我的世界观。利他主义背后的冷酷逻辑，每一个细胞都是计算的结果。', 
    date: '2024.10', 
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200' 
  },
  { 
    id: '3', 
    title: '星际穿越', 
    type: 'movie', 
    rating: 5, 
    comment: '唯有爱能跨越维度。诺兰式的硬核浪漫，在科学的终点，感性接管了一切。', 
    date: '2024.09', 
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200' 
  },
  { 
    id: '4', 
    title: '继承之战', 
    type: 'tv', 
    rating: 4, 
    comment: '莎士比亚式的悲剧在现代商战中的回响。权力是唯一的春药，也是最终的绞刑架。', 
    date: '2024.08', 
    coverImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1200' 
  },
];

const Library: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = MOCK_DATA[activeIndex];

  return (
    <div className="relative -mt-20 -mx-6 h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* 沉浸式背景大图层 */}
      {MOCK_DATA.map((item, idx) => (
        <div 
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={item.coverImage} 
            className="w-full h-full object-cover grayscale-[0.4]" 
            alt={item.title}
          />
          {/* 对齐足迹模块的渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* 主内容区域 */}
      <div className="relative h-full z-10 max-w-7xl mx-auto px-6 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 左侧：文字信息解构 */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-red-500 font-mono text-xs tracking-widest uppercase">
                <span className="w-8 h-px bg-red-600"></span>
                {activeItem.type} / {activeItem.date}
                <span className="flex text-red-600 ml-2">
                  {'★'.repeat(activeItem.rating)}
                </span>
              </div>
              <h2 className="text-7xl md:text-8xl font-bold serif-font text-white drop-shadow-2xl">
                {activeItem.title}
              </h2>
              <p className="text-zinc-200 text-lg font-light leading-relaxed max-w-md drop-shadow-md italic">
                “{activeItem.comment}”
              </p>
            </div>
            
            <button className="px-8 py-3 border border-white/30 backdrop-blur-md rounded-full text-white text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">
              Read Review
            </button>
          </div>

          {/* 右侧：卡片切换器 */}
          <div className="lg:col-span-7 flex justify-end">
            <div className="flex gap-4 overflow-visible px-4 py-8">
              {MOCK_DATA.map((item, idx) => (
                <div 
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative cursor-pointer transition-all duration-500 ease-out shrink-0 overflow-hidden rounded-[2rem] border-2 ${
                    idx === activeIndex 
                    ? 'w-48 h-72 border-white translate-y-[-20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
                    : 'w-32 h-56 border-transparent hover:border-white/30 opacity-50 hover:opacity-100 scale-95'
                  }`}
                >
                  <img src={item.coverImage} className="w-full h-full object-cover" alt={item.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-[9px] text-white/70 font-mono uppercase tracking-tighter">{item.type}</div>
                    <div className="text-white font-bold text-sm truncate w-24">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 底部导航箭头及分页 */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 text-white/50 z-20">
         <button 
           onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : MOCK_DATA.length - 1))}
           className="hover:text-white transition-colors p-2"
         >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
         </button>
         <div className="font-mono text-[10px] tracking-widest uppercase text-white/80">
           {String(activeIndex + 1).padStart(2, '0')} / {String(MOCK_DATA.length).padStart(2, '0')}
         </div>
         <button 
           onClick={() => setActiveIndex(prev => (prev < MOCK_DATA.length - 1 ? prev + 1 : 0))}
           className="hover:text-white transition-colors p-2"
         >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
         </button>
      </div>

      {/* 装饰性右下角图标 */}
      <div className="absolute bottom-10 right-10 z-20 text-white/30 hover:text-red-500 cursor-pointer transition-all">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"/>
        </svg>
      </div>
    </div>
  );
};

export default Library;
