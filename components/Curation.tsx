import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOVIES, BOOKS, MUSIC } from '../curationData';
import { CurationStatus } from '../types';

// 保持你原有的状态标签样式
const StatusBadge: React.FC<{ status?: CurationStatus }> = ({ status }) => {
  if (!status) return null;
  const colors = {
    done: 'text-zinc-500', 
    processing: 'text-red-500 animate-pulse',
    wishlist: 'text-zinc-700',
    dropped: 'text-zinc-800 line-through',
  };
  return (
    <span className={`text-[9px] font-mono uppercase tracking-widest ${colors[status]}`}>
      [{status === 'processing' ? 'ON LOOP' : status}]
    </span>
  );
};

const Curation: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | CurationStatus>('ALL');

  const filterList = (list: any[]) => {
    if (filter === 'ALL') return list;
    return list.filter(item => item.status === filter);
  };

  const filteredMovies = filterList(MOVIES);
  const filteredBooks = filterList(BOOKS);
  const filteredMusic = filterList(MUSIC);

  return (
    <div className="space-y-20 pb-24">
      
      {/* 1. Header Area - 保持原样 */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
           <span className="w-8 h-px bg-red-600"></span>
           <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Archive / 档案馆</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black serif text-white tracking-tighter">ARCHIVES.</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 border-b border-white/10 pb-4">
          {['ALL', 'processing', 'done', 'wishlist'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${
                filter === f 
                  ? 'bg-white text-black border-white font-bold' 
                  : 'bg-transparent text-zinc-600 border-zinc-900 hover:border-zinc-700 hover:text-zinc-400'
              }`}
            >
              {f}
            </button>
          ))}
          {filter !== 'ALL' && (
             <div className="ml-auto text-red-600 font-mono text-[10px] uppercase tracking-widest flex items-center">
               #{filter}
             </div>
          )}
        </div>
      </div>

      {/* 2. CINEMA_DB - 还原为你的“列表清单”布局 */}
      {filteredMovies.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end gap-4 mb-8">
             <h3 className="text-xl font-mono text-zinc-500 uppercase tracking-widest">/ CINEMA_DB</h3>
             <span className="text-[10px] font-mono text-zinc-800 mb-1">{filteredMovies.length} ENTRIES</span>
          </div>

          <div className="space-y-0">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="group flex flex-col md:flex-row items-start md:items-center py-6 border-b border-white/5 hover:bg-white/[0.02] -mx-4 px-4 transition-colors gap-6 md:gap-12">
                 
                 {/* ID & Title */}
                 <div className="flex items-center gap-6 md:w-1/3 shrink-0">
                    <div className="font-mono text-[10px] text-red-900 group-hover:text-red-600 transition-colors w-12 shrink-0">{movie.id}</div>
                    <div className="w-12 h-16 bg-zinc-900 shrink-0 border border-white/5 overflow-hidden">
                       {movie.images[0] && <img src={movie.images[0]} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all"/>}
                    </div>
                    <div>
                       <div className="text-lg font-bold serif text-zinc-300 group-hover:text-white transition-colors">{movie.title}</div>
                       <div className="text-[10px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">{movie.director}</div>
                    </div>
                 </div>

                 {/* Review */}
                 <div className="flex-1 text-sm font-serif italic text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed line-clamp-2">
                    “{movie.review}”
                 </div>

                 {/* Status (Desktop) */}
                 <div className="hidden md:block w-24 text-right">
                    <StatusBadge status={movie.status} />
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. LIBRARY_DB - 还原为列表布局 */}
      {filteredBooks.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end gap-4 mb-8">
             <h3 className="text-xl font-mono text-zinc-500 uppercase tracking-widest">/ LIBRARY_DB</h3>
             <span className="text-[10px] font-mono text-zinc-800 mb-1">{filteredBooks.length} ENTRIES</span>
          </div>

          <div className="space-y-0">
            {filteredBooks.map((book) => (
              <div key={book.id} className="group flex flex-col md:flex-row items-start md:items-center py-6 border-b border-white/5 hover:bg-white/[0.02] -mx-4 px-4 transition-colors gap-6 md:gap-12">
                 
                 <div className="flex items-center gap-6 md:w-1/3 shrink-0">
                    <div className="font-mono text-[10px] text-zinc-800 group-hover:text-zinc-600 transition-colors w-12 shrink-0">{book.id}</div>
                    <div className="w-10 h-14 bg-zinc-900 shrink-0 border border-white/5 overflow-hidden">
                       {book.coverImage && <img src={book.coverImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all"/>}
                    </div>
                    <div>
                       <div className="text-lg font-bold serif text-zinc-300 group-hover:text-white transition-colors">{book.title}</div>
                       <div className="text-[10px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">{book.author}</div>
                    </div>
                 </div>

                 <div className="flex-1 text-sm font-serif italic text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed line-clamp-2">
                    “{book.quote}”
                 </div>

                 <div className="hidden md:block w-24 text-right">
                    <StatusBadge status={book.status} />
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. AUDIO_DB - 🔥 新增：完全遵循上面的列表样式 */}
      {filteredMusic.length > 0 && (
        <section className="space-y-6 animate-in fade-in duration-700">
          <div className="flex items-end gap-4 mb-8">
             <h3 className="text-xl font-mono text-zinc-500 uppercase tracking-widest">/ AUDIO_DB</h3>
             <span className="text-[10px] font-mono text-zinc-800 mb-1">{filteredMusic.length} RECORDS</span>
          </div>

          <div className="space-y-0">
            {filteredMusic.map((music) => (
              <div key={music.id} className="group flex flex-col md:flex-row items-start md:items-center py-6 border-b border-white/5 hover:bg-white/[0.02] -mx-4 px-4 transition-colors gap-6 md:gap-12">
                 
                 {/* 左侧：ID + 封面 + 歌名 */}
                 <div className="flex items-center gap-6 md:w-1/3 shrink-0">
                    <div className="font-mono text-[10px] text-blue-900 group-hover:text-blue-500 transition-colors w-12 shrink-0">{music.id}</div>
                    <div className="w-12 h-12 bg-zinc-900 shrink-0 rounded-full border border-white/5 overflow-hidden group-hover:scale-110 transition-transform">
                       {/* 这里的图片如果是唱片，圆形的看起来更像 CD */}
                       {music.coverImage ? (
                         <img src={music.coverImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all"/>
                       ) : (
                         <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                           <div className="w-3 h-3 bg-black rounded-full"></div>
                         </div>
                       )}
                    </div>
                    <div>
                       <div className="text-lg font-bold serif text-zinc-300 group-hover:text-white transition-colors flex items-center gap-2">
                         {music.title}
                         {/* 链接图标 */}
                         {music.link && (
                           <a href={music.link} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 text-green-500 hover:text-green-400 transition-opacity" title="Play on Spotify">
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                           </a>
                         )}
                       </div>
                       <div className="text-[10px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">{music.artist} · {music.year}</div>
                    </div>
                 </div>

                 {/* 中间：乐评 */}
                 <div className="flex-1 text-sm font-serif italic text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed line-clamp-2">
                    “{music.review}”
                 </div>

                 {/* 右侧：状态 */}
                 <div className="hidden md:block w-24 text-right">
                    <StatusBadge status={music.status} />
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredMovies.length === 0 && filteredBooks.length === 0 && filteredMusic.length === 0 && (
        <div className="py-24 text-center">
           <div className="text-zinc-800 font-mono text-xs uppercase tracking-widest">No Archives Found</div>
        </div>
      )}
    </div>
  );
};

export default Curation;