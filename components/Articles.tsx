
import React from 'react';
import { Article } from '../types';

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: '重读《追忆似水年华》：时间的非线性拼图',
    excerpt: '普鲁斯特如何通过一块玛德琳蛋糕，建立起横跨半个世纪的情感联结？我们在现代数字生活的碎片中，还能找回这种绵延的感性吗？',
    content: '...',
    date: '2024-10-25',
    coverImage: 'https://picsum.photos/id/101/800/400'
  },
  {
    id: '2',
    title: '赛博朋克 2077 与城市空间心理学',
    excerpt: '夜之城的垂直性与反差，反映了我们对未来都市文明最深层的恐惧与迷恋。',
    content: '...',
    date: '2024-09-12',
    coverImage: 'https://picsum.photos/id/102/800/400'
  }
];

const Articles: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl serif-font">长篇笔录</h2>
        <p className="text-zinc-500">深入探讨与沉淀</p>
      </div>

      <div className="space-y-16">
        {MOCK_ARTICLES.map((article) => (
          <article key={article.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded-2xl mb-6 h-[400px]">
              <img 
                src={article.coverImage} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="text-xs text-zinc-500 uppercase tracking-[0.2em]">{article.date}</div>
              <h3 className="text-3xl serif-font group-hover:text-zinc-300 transition-colors">{article.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-lg font-light">
                {article.excerpt}
              </p>
              <div className="pt-2">
                <span className="text-sm border-b border-zinc-700 pb-1 group-hover:border-zinc-300 transition-colors">阅读全文</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Articles;
