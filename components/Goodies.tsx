import React, { useState, useMemo } from 'react';
import { MovieCuration, BookCuration, ContentStatus } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MOVIES, BOOKS } from '../curationData';

// --- 1. 辅助组件：数据仪表盘 (Dashboard) ---
const Dashboard: React.FC = () => {
  const stats = useMemo(() => {
    const totalItems = MOVIES.length + BOOKS.length;
    const movieScores = MOVIES.filter(m => m.rating).map(m => m.rating!);
    const bookScores = BOOKS.filter(b => b.rating).map(b => b.rating!);
    const allScores = [...movieScores, ...bookScores];
    const avgRating = allScores.length > 0
      ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1)
      : 'N/A';
    const activeTasks = [...MOVIES, ...BOOKS].filter(i => i.status === 'processing').length;

    const tagCounts: Record<string, number> = {};
    [...MOVIES, ...BOOKS].forEach(item => {
      item.tags?.forEach(tag => { tagCounts[tag] = (tagCounts[tag] || 0) + 1; });
    });
    const topTags = Object.entries(tagCounts).sort(([, a], [, b]) => b - a).slice(0, 3).map(([tag]) => tag);

    return { totalItems, avgRating, activeTasks, topTags };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 mb-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
      <div className="space-y-1">
        <div className="text-[10px] mono text-zinc-500 uppercase tracking-widest">Total Input</div>
        <div className="text-2xl font-bold text-white serif">{stats.totalItems} <span className="text-xs text-zinc-600 font-normal">Entries</span></div>
      </div>
      <div className="space-y-1">
        <div className="text-[10px] mono text-zinc-500 uppercase tracking-widest">Avg. Quality</div>
        <div className="text-2xl font-bold text-white serif">{stats.avgRating} <span className="text-xs text-zinc-600 font-normal">/ 10</span></div>
      </div>
      <div className="space-y-1">
        <div className="text-[10px] mono text-zinc-500 uppercase tracking-widest">Processing</div>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${stats.activeTasks > 0 ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`}></div>
           <div className="text-2xl font-bold text-white serif">{stats.activeTasks} <span className="text-xs text-zinc-600 font-normal">Active</span></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-[10px] mono text-zinc-500 uppercase tracking-widest">Top Keywords</div>
        <div className="flex flex-wrap gap-1">
          {stats.topTags.map(tag => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-black/40 text-zinc-300 rounded mono border border-white/5">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 2. 辅助组件：状态徽章 ---
const StatusBadge: React.FC<{ status?: ContentStatus }> = ({ status }) => {
  if (!status) return null;
  const config = {
    done: { color: 'bg-zinc-600', text: 'ARCHIVED', pulse: false },
    processing: { color: 'bg-green-500', text: 'PROCESSING', pulse: true },
    dropped: { color: 'bg-red-600', text: 'DROPPED', pulse: false },
    wishlist: { color: 'bg-blue-500', text: 'WISHLIST', pulse: false },
  };
  const { color, text, pulse } = config[status];
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
      <div className={`w-1.5 h-1.5 rounded-full ${color} ${pulse ? 'animate-pulse' : ''}`}></div>
      <span className="text-[10px] font-mono text-white/80 tracking-wider">{text}</span>
    </div>
  );
};

// --- 3. 辅助组件：评分显示 ---
const RatingDisplay: React.FC<{ rating?: number }> = ({ rating }) => {
  if (!rating) return null;
  return (
    <div className="font-mono text-xl font-bold text-red-500">
      {rating.toFixed(1)} <span className="text-xs text-zinc-600 font-normal">/10</span>
    </div>
  );
};

// --- 4. 详情弹窗 (✨ 修正版：左图右文，强制竖版海报) ---
const MovieDetail: React.FC<{ movie: MovieCuration; onClose: () => void }> = ({ movie, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] bg-[#0a0a0a]/95 w-full h-full overflow-y-auto px-4 py-8 md:p-12 flex items-center justify-center"
  >
    <div className="relative w-full max-w-6xl bg-[#0f0f10] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">

      {/* 关闭按钮 (绝对定位) */}
      <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-black/50 rounded-full text-white/50 hover:text-white hover:bg-red-600 transition-all">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      {/* 左侧：海报区 (强制竖版 images[1]) */}
      <div className="w-full md:w-[400px] shrink-0 bg-zinc-900 relative">
         <img src={movie.images[1]} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] to-transparent opacity-50 md:hidden"></div>
      </div>

      {/* 右侧：内容区 */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <StatusBadge status={movie.status} />
                <div className="w-px h-4 bg-white/10"></div>
                <RatingDisplay rating={movie.rating} />
             </div>
             <h1 className="text-4xl md:text-6xl font-bold serif text-white leading-tight tracking-tighter">{movie.title}</h1>
             <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-6">
                <span className="text-white">{movie.year}</span>
                <span>/</span>
                <span>{movie.director}</span>
                <span>/</span>
                <span>{movie.region}</span>
                <span>/</span>
                <span>{movie.genre}</span>
             </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
             {movie.tags?.map(tag => (
               <span key={tag} className="px-3 py-1 bg-white/5 text-[10px] mono text-zinc-400 rounded hover:text-white hover:bg-white/10 transition-colors cursor-default">#{tag}</span>
             ))}
          </div>

          {/* Review */}
          <div className="space-y-4 pt-4">
             <div className="text-[10px] text-red-600 uppercase tracking-widest font-bold flex items-center gap-2">
               <span className="w-2 h-2 bg-red-600 rounded-full"></span>
               Observer Log
             </div>
             <p className="text-xl md:text-2xl leading-relaxed serif italic font-light text-zinc-300">
               “{movie.review}”
             </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const BookDetail: React.FC<{ book: BookCuration; onClose: () => void }> = ({ book, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] bg-[#0a0a0a]/95 w-full h-full overflow-y-auto px-4 py-8 md:p-12 flex items-center justify-center"
  >
    <div className={`relative w-full max-w-6xl ${book.bgColor || 'bg-zinc-900'} border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]`}>

      {/* 关闭按钮 */}
      <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-black/20 rounded-full text-white/50 hover:text-white hover:bg-white/20 transition-all">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      {/* 左侧：封面区 */}
      <div className="w-full md:w-[400px] shrink-0 bg-black/10 flex items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
         {/* 背景大引号装饰 */}
         <span className="absolute top-0 left-4 text-[200px] serif font-black text-white/5 leading-none select-none">“</span>

         <div className="relative z-10 w-48 shadow-2xl rounded-lg overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
           <img src={book.coverImage} className="w-full h-full object-cover" />
         </div>
      </div>

      {/* 右侧：内容区 */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar relative z-10">
        <div className="space-y-8">
           <div className="space-y-2">
              <div className="flex items-center gap-4 mb-4">
                 <StatusBadge status={book.status} />
                 <RatingDisplay rating={book.rating} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold serif text-white leading-tight tracking-tighter">《{book.title}》</h1>
              <div className="text-xl text-white/60 serif italic">— {book.author}</div>
           </div>

           <div className="relative pl-6 border-l-4 border-white/20 py-2">
              <p className="text-2xl md:text-3xl font-bold text-white/90 leading-tight serif italic">
                {book.quote}
              </p>
           </div>

           <div className="space-y-2 pt-4">
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Resonance Field</div>
              <p className="text-lg text-white/80 serif font-light leading-relaxed">
                {book.summary}
              </p>
           </div>

           <div className="flex flex-wrap gap-2 pt-4">
             {book.tags?.map(tag => (
               <span key={tag} className="px-3 py-1 bg-black/20 text-[10px] mono text-white/70 rounded">#{tag}</span>
             ))}
           </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 5. 列表视图单项 ---
const ListViewItem: React.FC<{ item: MovieCuration | BookCuration; type: 'MOVIE' | 'BOOK'; onClick: () => void }> = ({ item, type, onClick }) => {
  const isMovie = type === 'MOVIE';
  const movie = item as MovieCuration;
  const book = item as BookCuration;
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onClick={onClick} className="group flex items-center gap-4 py-3 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors">
      <div className="w-16 shrink-0 font-mono text-[9px] text-zinc-600 group-hover:text-red-600 transition-colors uppercase tracking-widest">{type === 'MOVIE' ? 'MOV' : 'BOK'}_{item.id.substring(0, 3)}</div>
      <div className="w-6 h-8 shrink-0 bg-zinc-800 overflow-hidden rounded-sm hidden sm:block"><img src={isMovie ? movie.images[1] : book.coverImage} className="w-full h-full object-cover transition-all" /></div>
      <div className="w-1/3 min-w-[120px] shrink-0">
        <div className="text-sm font-bold text-zinc-300 group-hover:text-white serif truncate transition-colors">{isMovie ? `《${movie.title}》` : `《${book.title}》`}</div>
        <div className="flex items-center gap-2 mt-1"><StatusBadge status={item.status} />{item.tags?.[0] && <span className="text-[8px] mono text-zinc-600">#{item.tags[0]}</span>}</div>
      </div>
      <div className="w-12 shrink-0 text-right"><RatingDisplay rating={item.rating} /></div>
      <div className="flex-1 min-w-0 px-4"><div className="text-xs text-zinc-500 font-light serif italic truncate group-hover:text-zinc-300 transition-colors">{isMovie ? movie.review : book.quote}</div></div>
    </motion.div>
  );
};

// --- 6. Grid 视图: 影视卡片 (巨型尺寸) ---
const MovieCard: React.FC<{ movie: MovieCuration; onClick: () => void }> = ({ movie, onClick }) => (
  <motion.div
    layout
    whileHover={{ y: -10 }}
    onClick={onClick}
    className="relative bg-[#0f0f10] border border-white/5 rounded-3xl overflow-hidden cursor-pointer group hover:border-white/20 transition-all shadow-2xl p-6 md:p-8"
  >
    <div className="relative h-48 md:h-80 w-full mb-6 rounded-2xl overflow-hidden shadow-xl">
      <img src={movie.images[0]} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] via-transparent to-transparent opacity-60"></div>
      <div className="absolute top-4 left-4"><StatusBadge status={movie.status} /></div>
      <div className="absolute top-4 right-4"><div className="font-mono text-xl font-bold text-red-500 drop-shadow-md">{movie.rating?.toFixed(1)}</div></div>
    </div>
    <div className="space-y-4">
      <h4 className="text-2xl md:text-4xl font-bold serif text-white leading-none tracking-tighter">&lt;{movie.title}&gt;</h4>
      <div className="flex flex-wrap gap-2">
         {movie.tags?.slice(0, 3).map(tag => (
           <span key={tag} className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-zinc-500 mono hover:text-white transition-colors uppercase tracking-widest">#{tag}</span>
         ))}
      </div>
      <p className="text-zinc-500 text-sm md:text-base font-light serif italic line-clamp-2 leading-relaxed">{movie.review}</p>
      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
         <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">{movie.director}</div>
         <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest flex items-center gap-1 group-hover:text-white transition-colors">ACCESS DATA <span className="text-red-600">→</span></div>
      </div>
    </div>
  </motion.div>
);

// --- 7. Grid 视图: 书籍卡片 (巨型尺寸) ---
const BookCard: React.FC<{ book: BookCuration; onClick: () => void }> = ({ book, onClick }) => (
  <motion.div
    layout
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className={`${book.bgColor || 'bg-zinc-900'} min-h-[450px] md:min-h-[520px] rounded-3xl p-8 md:p-12 relative overflow-hidden cursor-pointer group shadow-2xl flex flex-col justify-between`}
  >
    <span className="absolute -top-4 -left-4 text-[120px] md:text-[200px] serif font-black text-white/5 leading-none select-none group-hover:text-white/10 transition-colors">“</span>
    <div className="absolute top-8 right-8 z-20 flex flex-col items-end gap-3">
       <div className="font-mono text-xl font-bold text-white drop-shadow-md bg-black/20 px-2 py-1 rounded">{book.rating?.toFixed(1)}</div>
       <StatusBadge status={book.status} />
    </div>
    <div className="relative z-10 space-y-8 pt-10">
      <div className="w-12 h-1 bg-white/20"></div>
      <p className="text-xl md:text-3xl font-bold leading-tight serif tracking-tight text-white/90 italic line-clamp-6">{book.quote}</p>
    </div>
    <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
      <div className="flex gap-6 items-end">
        <div className="w-20 h-28 md:w-28 md:h-40 bg-black/20 overflow-hidden shadow-2xl rounded-lg shrink-0 group-hover:rotate-3 transition-transform duration-500">
          <img src={book.coverImage} className="w-full h-full object-cover shadow-inner" />
        </div>
        <div className="space-y-2 pb-1 flex-1 min-w-0">
          <h5 className="text-xl md:text-2xl font-bold serif text-white truncate">{book.author}</h5>
          <h6 className="text-xs md:text-sm font-light text-white/60 mono italic truncate">《{book.title}》</h6>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {book.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] px-2 py-0.5 bg-black/20 text-white/70 rounded mono backdrop-blur-sm uppercase tracking-widest">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 8. 主组件 ---
const Curation: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieCuration | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookCuration | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<ContentStatus | 'all'>('all');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MOVIES.forEach(m => m.tags?.forEach(t => tags.add(t)));
    BOOKS.forEach(b => b.tags?.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filterContent = <T extends { tags?: string[], status?: ContentStatus }>(items: T[]) => {
    return items.filter(item => {
      const matchTag = activeTag ? item.tags?.includes(activeTag) : true;
      const matchStatus = activeStatus === 'all' ? true : item.status === activeStatus;
      return matchTag && matchStatus;
    });
  };

  const filteredMovies = filterContent(MOVIES);
  const filteredBooks = filterContent(BOOKS);

  return (
    <div className="relative min-h-full">
      <AnimatePresence>
        {selectedMovie && <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />}
      </AnimatePresence>

      <div className={`space-y-8 pb-32 transition-all duration-500 ${selectedMovie || selectedBook ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="space-y-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="w-8 h-px bg-red-600"></span>
                  <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Archive / 档案馆</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black serif leading-none tracking-tighter text-white">ARCHIVES.</h2>
              </div>
              <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10 self-start md:self-end">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`} title="Grid View">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`} title="List View">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                </button>
              </div>
           </div>
           <Dashboard />
           <div className="flex flex-col md:flex-row gap-4 border-y border-white/5 py-4">
              <div className="flex gap-2">
                {['all', 'processing', 'done', 'wishlist'].map(status => (
                  <button key={status} onClick={() => setActiveStatus(status as any)} className={`px-3 py-1 rounded-full text-[10px] mono uppercase tracking-wider border transition-all ${activeStatus === status ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}>{status}</button>
                ))}
              </div>
              <div className="w-px bg-white/10 hidden md:block"></div>
              <div className="flex gap-2 flex-wrap">
                 <button onClick={() => setActiveTag(null)} className={`text-[10px] mono transition-colors ${!activeTag ? 'text-red-500 underline' : 'text-zinc-500 hover:text-zinc-300'}`}>#ALL</button>
                 {allTags.map(tag => (
                   <button key={tag} onClick={() => setActiveTag(tag === activeTag ? null : tag)} className={`text-[10px] mono transition-colors ${activeTag === tag ? 'text-red-500 underline' : 'text-zinc-500 hover:text-zinc-300'}`}>#{tag}</button>
                 ))}
              </div>
           </div>
        </div>

        <section className="space-y-12">
          {filteredMovies.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-baseline gap-4 border-b border-white/5 pb-2">
                <h3 className="text-xl font-mono font-bold text-zinc-400">/ CINEMA_DB</h3>
                <span className="text-[9px] text-zinc-600 mono uppercase tracking-widest">{filteredMovies.length} ENTRIES</span>
              </div>
              {/* Cinema: LG Grid Cols 2 */}
              <motion.div layout className={viewMode === 'grid' ? "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12" : "flex flex-col border-t border-white/5"}>
                {filteredMovies.map((movie) => (
                  viewMode === 'grid'
                    ? <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
                    : <ListViewItem key={movie.id} item={movie} type="MOVIE" onClick={() => setSelectedMovie(movie)} />
                ))}
              </motion.div>
            </div>
          )}

          {filteredBooks.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-baseline gap-4 border-b border-white/5 pb-2">
                <h3 className="text-xl font-mono font-bold text-zinc-400">/ LIBRARY_DB</h3>
                <span className="text-[9px] text-zinc-600 mono uppercase tracking-widest">{filteredBooks.length} ENTRIES</span>
              </div>
              {/* Books: LG Grid Cols 3 */}
              <motion.div layout className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col border-t border-white/5"}>
                {filteredBooks.map((book) => (
                  viewMode === 'grid'
                    ? <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
                    : <ListViewItem key={book.id} item={book} type="BOOK" onClick={() => setSelectedBook(book)} />
                ))}
              </motion.div>
            </div>
          )}

          {filteredMovies.length === 0 && filteredBooks.length === 0 && (
             <div className="py-20 text-center text-zinc-600 mono text-xs">NO DATA FOUND IN THIS SECTOR.</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Curation;