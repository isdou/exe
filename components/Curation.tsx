import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOVIES, BOOKS, MUSIC } from '../curationData';
import { CurationStatus } from '../types';

// 状态标签组件
const StatusBadge: React.FC<{ status?: CurationStatus }> = ({ status }) => {
  if (!status) return null;
  const colors = {
    done: 'text-green-500 border-green-500/30 bg-green-500/10',
    processing: 'text-blue-500 border-blue-500/30 bg-blue-500/10',
    wishlist: 'text-zinc-500 border-zinc-500/30 bg-zinc-500/10',
    dropped: 'text-red-500 border-red-500/30 bg-red-500/10',
  };
  // 音乐特殊状态文案映射
  const labelMap = {
    processing: 'ON LOOP',
    done: 'ARCHIVED',
    wishlist: 'DIGGING',
    dropped: 'SKIPPED'
  };
  
  return (
    <span className={`px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded ${colors[status]}`}>
      {labelMap[status] || status}
    </span>
  );
};

// 评分组件
const RatingBadge: React.FC<{ rating?: number }> = ({ rating }) => {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1 text-[9px] font-mono text-amber-500">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <span>{rating}</span>
    </div>
  );
};

const Curation: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | CurationStatus>('ALL');

  // 简单的过滤逻辑
  const filterList = (list: any[]) => {
    if (filter === 'ALL') return list;
    return list.filter(item => item.status === filter);
  };

  const filteredMovies = filterList(MOVIES);
  const filteredBooks = filterList(BOOKS);
  const filteredMusic = filterList(MUSIC);

  return (
    <div className="space-y-24 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-red-600"></span>
            <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Archive / 档案馆</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black serif text-white tracking-tighter">ARCHIVES.</h2>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          {['ALL', 'processing', 'done', 'wishlist'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${
                filter === f 
                  ? 'bg-white text-black border-white font-bold' 
                  : 'bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-500 hover:text-zinc-400'
              }`}
            >
              {f === 'processing' ? 'Active' : f}
            </button>
          ))}
        </div>
      </div>

      {/* 1. AUDIO_DB (Music) - 把音乐放在最上面或者中间都很合适，这里放在上面作为新特性 */}
      {filteredMusic.length > 0 && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="flex items-center gap-4">
             <span className="text-zinc-700 font-mono text-xl">/</span>
             <h3 className="text-xl font-mono text-zinc-400 uppercase tracking-widest">AUDIO_DB</h3>
             <span className="text-zinc-800 text-xs font-mono">{filteredMusic.length} RECORDS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredMusic.map((music) => (
              <div key={music.id} className="group bg-[#111] border border-white/5 p-6 rounded-xl flex gap-6 hover:border-white/20 transition-colors">
                {/* 唱片封面 */}
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-zinc-900 shadow-xl relative group-hover:scale-105 transition-transform duration-500">
                   {music.coverImage ? (
                     <img src={music.coverImage} alt={music.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-zinc-700 border border-white/5">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                     </div>
                   )}
                   {/* 唱片圆心装饰 */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                      <div className="w-3 h-3 bg-black rounded-full border border-white/20"></div>
                   </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                   <div>
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <h4 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-red-500 transition-colors">{music.title}</h4>
                            <div className="text-zinc-500 text-xs font-mono uppercase tracking-wider">{music.artist} <span className="text-zinc-700">•</span> {music.year}</div>
                         </div>
                         <StatusBadge status={music.status} />
                      </div>
                      <p className="mt-4 text-sm text-zinc-400 font-serif italic leading-relaxed line-clamp-2">
                         “{music.review}”
                      </p>
                   </div>
                   
                   <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                      <RatingBadge rating={music.rating} />
                      {/* 外部链接按钮 */}
                      {music.link && (
                        <a 
                          href={music.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-green-500 hover:text-green-400 transition-colors"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          Play Stream
                        </a>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. CINEMA_DB */}
      {filteredMovies.length > 0 && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="flex items-center gap-4">
             <span className="text-zinc-700 font-mono text-xl">/</span>
             <h3 className="text-xl font-mono text-zinc-400 uppercase tracking-widest">CINEMA_DB</h3>
             <span className="text-zinc-800 text-xs font-mono">{filteredMovies.length} ENTRIES</span>
          </div>

          <div className="grid gap-1px bg-white/5 border border-white/5 rounded-lg overflow-hidden">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="group bg-[#0a0a0a] p-6 flex flex-col md:flex-row gap-8 hover:bg-[#111] transition-colors">
                 <div className="w-full md:w-32 shrink-0 space-y-2">
                    <div className="aspect-[2/3] w-24 md:w-full bg-zinc-900 relative overflow-hidden border border-white/5">
                       {movie.images[0] ? <img src={movie.images[0]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all"/> : <div className="w-full h-full bg-zinc-800"/>}
                    </div>
                    <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">{movie.id}</div>
                 </div>
                 
                 <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                       <div>
                          <h4 className="text-2xl font-bold serif text-zinc-200 group-hover:text-white">{movie.title}</h4>
                          <div className="text-zinc-500 text-xs mt-1 font-mono">{movie.director} / {movie.year}</div>
                       </div>
                       <div className="flex flex-col items-end gap-2">
                          <StatusBadge status={movie.status} />
                          <RatingBadge rating={movie.rating} />
                       </div>
                    </div>
                    <p className="text-zinc-400 font-light serif leading-relaxed max-w-2xl">
                       {movie.review}
                    </p>
                    <div className="flex gap-2">
                       {movie.tags?.map(tag => (
                          <span key={tag} className="text-[9px] text-zinc-600 border border-zinc-800 px-1 rounded hover:text-zinc-400 hover:border-zinc-600 cursor-default">#{tag}</span>
                       ))}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. LIBRARY_DB */}
      {filteredBooks.length > 0 && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="flex items-center gap-4">
             <span className="text-zinc-700 font-mono text-xl">/</span>
             <h3 className="text-xl font-mono text-zinc-400 uppercase tracking-widest">LIBRARY_DB</h3>
             <span className="text-zinc-800 text-xs font-mono">{filteredBooks.length} ENTRIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {filteredBooks.map((book) => (
               <div key={book.id} className="relative group bg-[#111] border border-white/5 p-8 rounded-lg overflow-hidden hover:border-white/20 transition-all">
                  <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full ${book.bgColor || 'bg-zinc-500'} group-hover:opacity-20 transition-opacity`}></div>
                  
                  <div className="relative z-10 space-y-6">
                     <div className="flex gap-6">
                        <div className="w-20 h-28 bg-zinc-800 shadow-lg shrink-0 border border-white/5 overflow-hidden">
                           {book.coverImage && <img src={book.coverImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"/>}
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-bold serif text-zinc-200 group-hover:text-white leading-tight">{book.title}</h4>
                           <div className="text-zinc-500 text-xs font-mono uppercase tracking-widest">{book.author}</div>
                           <div className="flex gap-2 pt-1">
                              <StatusBadge status={book.status} />
                              <RatingBadge rating={book.rating} />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4 border-t border-white/5 pt-6">
                        <p className="text-zinc-300 font-serif italic text-sm leading-relaxed opacity-80">
                           "{book.quote}"
                        </p>
                        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 group-hover:text-zinc-400 transition-colors">
                           {book.summary}
                        </p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </section>
      )}
      
      {/* Empty State */}
      {filteredMovies.length === 0 && filteredBooks.length === 0 && filteredMusic.length === 0 && (
        <div className="py-24 text-center">
           <div className="text-zinc-700 font-mono text-xs uppercase tracking-widest">Sector Empty</div>
        </div>
      )}
    </div>
  );
};

export default Curation;