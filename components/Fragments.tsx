
import React from 'react';
import { Fragment } from '../types';

const MOCK_FRAGMENTS: Fragment[] = [
  { id: '1', content: '所有的深刻都始于对日常的背叛。', date: '2024.11.20', tags: ['哲学', '日常'] },
  { id: '2', content: '深夜的雨声不是噪音，而是地球正在进行的某种宏大叙事。', date: '2024.11.15', tags: ['随笔', '自然'] },
  { id: '3', content: 'AI 并非在替代创作，而是在拓展我们对“可能”的想象力边界。', date: '2024.11.10', tags: ['科技', '思考'] },
  { id: '4', content: '在废弃的地铁站里，我看到了一束光在灰尘中跳舞。', date: '2024.11.02', tags: ['观察'] },
];

const Fragments: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl serif-font">灵感碎片</h2>
        <p className="text-zinc-500">收集那些稍纵即逝的火花</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_FRAGMENTS.map((fragment) => (
          <div key={fragment.id} className="glass-panel p-8 rounded-2xl border-l-4 border-zinc-500">
            <p className="text-lg leading-relaxed mb-6 font-light">“{fragment.content}”</p>
            <div className="flex justify-between items-center text-xs text-zinc-500 uppercase tracking-widest">
              <span>{fragment.date}</span>
              <div className="flex gap-2">
                {fragment.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-zinc-800 rounded">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center pt-8">
        <button className="px-6 py-2 border border-zinc-700 rounded-full text-zinc-400 hover:text-white hover:border-zinc-500 transition-all">
          记载新灵感
        </button>
      </div>
    </div>
  );
};

export default Fragments;
