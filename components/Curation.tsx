import React, { useState } from 'react';
import { MovieCuration, BookCuration } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MOVIES, BOOKS } from '../curationData';

// --- 组件：评分徽章 (Rating Badge) ---
const RatingBadge: React.FC<{ rating?: number }> = ({ rating }) => {
  if (!rating) return null;
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-lg md:text-xl font-bold font-mono text-red-600">{rating}</span>
      <span className="text-[10px] text-zinc-600 font-mono">/10</span>
    </div>
  );
};

// --- 组件：电影详情弹窗 (高密度面板版) ---
const MovieDetail: React.FC<{ movie: MovieCuration; onClose: () => void }> = ({ movie, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
  >
    {/* 背景遮罩 */}
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

    {/* 主面板 */}
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="relative z-10 w-full max-w-5xl bg-[#0f0f10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
    >
      {/* 左侧：海报区 (更窄) */}
      <div className="relative w-full md:w-1/3 h-64 md:h-auto bg-zinc-900 shrink-0">
        <img src={movie.images[1]} className="w-full h-full object-cover opacity-60 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] to-transparent"></div>

        {/* 左上角数据 */}
        <div className="absolute top-6 left-6">
           <div className="px-2 py-1 bg-red-600 text-white text-[9px] font-mono tracking-widest uppercase inline-block mb-2">
             ARCHIVED
           </div>
           <div className="text-white font-mono text-xs opacity-70">{movie.id.toUpperCase()}</div>
        </div>
      </div>

      {/* 右侧：信息区 (可滚动) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10 space-y-8 bg-[#0f0f10]">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
             <h2 className="text-3xl md:text-5xl font-bold serif text-white tracking-tighter leading-none">{movie.title}</h2>
             <div className="flex gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
               <span>{movie.year}</span>
               <span>{movie.region}</span>
               <span>{movie.runtime}</span>
             </div>
          </div>
          {/* 这里的评分 */}
          <div className="text-right">
             <RatingBadge rating={movie.rating || 9.0} />
             <div className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">System Rating</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6">
          <div>
            <div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Director</div>
            <div className="text-sm text-zinc-300 serif">{movie.director}</div>
          </div>
          <div>
            <div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Genre</div>
            <div className="text-sm text-zinc-300 serif">{movie.genre}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-[9px] text-red-600 uppercase tracking-widest font-bold">Observer Log</div>
          <p className="text-zinc-300 text-lg leading-relaxed serif italic font-light opacity-90">
            “{movie.review}”
          </p>
        </div>

        <div className="pt-8 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 border border-white/10 rounded-full text-[10px] text-zinc-400 hover:text-white hover:border-white/30 transition-all uppercase tracking-widest">
            Close Panel
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// --- 组件：书籍详情弹窗 ---
const BookDetail: React.FC<{ book: BookCuration; onClose: () => void }> = ({ book, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
  >
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className={`relative z-10 w-full max-w-4xl ${book.bgColor || 'bg-zinc-900'} border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]`}
    >
       <div className="w-full md:w-1/3 bg-black/20 p-8 flex flex-col items-center justify-center shrink-0 border-r border-white/5">
          <div className="w-32 md:w-40 aspect-[2/3] shadow-2xl rounded overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src={book.coverImage} className="w-full h-full object-cover" />
          </div>
          <div className="mt-8 text-center space-y-2">
             <RatingBadge rating={book.rating || 9.5} />
          </div>
       </div>

       <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar space-y-8">
          <div className="space-y-2">
             <h2 className="text-3xl md:text-4xl font-bold serif text-white">{book.title}</h2>
             <div className="text-sm text-white/60 serif italic">{book.author}</div>
          </div>

          <div className="relative pl-6 border-l-2 border-white/20">
             <p className="text-lg md:text-xl font-bold text-white/90 leading-relaxed serif italic">
               {book.quote}
             </p>
          </div>

          <div className="space-y-2 pt-4">
             <div className="text-[9px] text-white/40 uppercase tracking-widest">Resonance</div>
             <p className="text-white/80 text-base font-light serif leading-relaxed">
               {book.summary}
             </p>
          </div>

          <div className="pt-4 flex justify-end">
             <button onClick={onClose} className="px-6 py-2 bg-white/10 rounded-full text-[10px] text-white hover:bg-white/20 transition-all uppercase tracking-widest">
               Close Shelf
             </button>
          </div>
       </div>
    </motion.div>
  </motion.div>
);

// --- 组件：列表视图单项 (更新版，带评分) ---
const ListViewItem: React.FC<{
  item: MovieCuration | BookCuration;
  type: 'MOVIE' | 'BOOK';
  onClick: () => void
}> = ({ item, type, onClick }) => {
  const isMovie = type === 'MOVIE';
  const movie = item as MovieCuration;
  const book = item as BookCuration;
  const rating = isMovie ? movie.rating : book.rating;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group flex items-center gap-4 py-3 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors"
    >
      <div className="w-16 shrink-0 font-mono text-[9px] text-zinc-600 group-hover:text-red-600 transition-colors uppercase tracking-widest">
        {type === 'MOVIE' ? 'MOV' : 'BOK'}_{item.id.substring(0, 3)}
      </div>
      <div className="w-8 h-10 shrink-0 bg-zinc-800 overflow-hidden rounded-sm hidden sm:block">
        <img
          src={isMovie ? movie.images[1] : book.coverImage}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all"
        />
      </div>
      <div className="w-1/3 min-w-[120px] shrink-0">
        <div className="text-sm md:text-base font-bold text-zinc-300 group-hover:text-white serif truncate transition-colors">
          {isMovie ? `《${movie.title}》` : `《${book.title}》`}
        </div>
        <div className="text-[10px] text-zinc-600 font-mono truncate">
          {isMovie ? movie.director : book.author}
        </div>
      </div>
      {/* 评分栏 */}
      <div className="w-16 shrink-0 text-right font-mono text-xs font-bold text-zinc-500 group-hover:text-red-500 transition-colors">
        {rating ? rating.toFixed(1) : '-'}
      </div>
      <div className="flex-1 min-w-0 px-4">
         <div className="text-xs md:text-sm text-zinc-500 font-light serif italic truncate group-hover:text-zinc-300 transition-colors">
           {isMovie ? movie.review : book.quote}
         </div>
      </div>
    </motion.div>
  );
};

// --- 组件：画廊视图卡片 (缩小版，优化比例) ---
const MovieCard: React.FC<{ movie: MovieCuration; onClick: () => void }> = ({ movie, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="relative bg-[#0f0f10] border border-white/5 rounded-2xl overflow-hidden cursor-pointer group hover:border-white/20 transition-all"
  >
    {/* 图片区：高度减小，比例更扁 */}
    <div className="relative h-48 w-full overflow-hidden">
      <img src={movie.images[0]} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] to-transparent"></div>

      {/* 右上角评分 */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-red-600 font-mono text-xs font-bold border border-white/10">
        {movie.rating || 9.0}
      </div>
    </div>

    {/* 信息区：更紧凑 */}
    <div className="p-5 space-y-3">
      <div className="flex justify-between items-start">
         <h4 className="text-xl font-bold serif text-white leading-tight">{movie.title}</h4>
         <span className="text-[9px] font-mono text-zinc-600 uppercase border border-zinc-800 px-1 rounded">{movie.year}</span>
      </div>
      <p className="text-zinc-500 text-xs font-light serif italic line-clamp-2 leading-relaxed">
        {movie.review}
      </p>
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
         <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">{movie.director}</div>
         <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest flex items-center gap-1 group-hover:text-white transition-colors">
           OPEN <span className="text-red-600">→</span>
         </div>
      </div>
    </div>
  </motion.div>
);

// 书籍卡片也做相应缩小优化
const BookCard: React.FC<{ book: BookCuration; onClick: () => void }> = ({ book, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className={`${book.bgColor} h-[320px] rounded-2xl p-6 relative overflow-hidden cursor-pointer group shadow-lg`}
  >
    <div className="absolute -right-4 -bottom-4 text-[100px] serif font-black text-white/5 leading-none select-none">”</div>

    <div className="flex flex-col h-full relative z-10">
      <div className="flex justify-between items-start mb-4">
         <div className="w-12 h-16 bg-black/20 rounded shadow-md overflow-hidden">
            <img src={book.coverImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
         </div>
         <div className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold text-white/90">
            {book.rating || 9.5}
         </div>
      </div>

      <div className="flex-1">
        <p className="text-lg font-bold leading-tight serif text-white/90 line-clamp-4 italic">
          {book.quote}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
        <div>
           <div className="text-sm font-bold serif text-white">{book.author}</div>
           <div className="text-[10px] text-white/50 mono">《{book.title}》</div>
        </div>
      </div>
    </div>
  </motion.div>
);


// --- 主组件 ---
const Curation: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieCuration | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookCuration | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // 默认 List

  return (
    <div className="relative min-h-full">
      {/* 弹窗层 */}
      <AnimatePresence>
        {selectedMovie && <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />}
      </AnimatePresence>

      <div className={`space-y-12 pb-32 transition-all duration-500 ${selectedMovie || selectedBook ? 'blur-sm pointer-events-none' : ''}`}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-red-600"></span>
              <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Archive / 档案馆</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black serif leading-none tracking-tighter text-white">ARCHIVES.</h2>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10 self-start md:self-end">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <section className="space-y-12">
          {/* Cinema */}
          <div className="space-y-6">
            <div className="flex items-baseline gap-4 border-b border-white/5 pb-2">
              <h3 className="text-xl font-mono font-bold text-zinc-400">/ CINEMA_DB</h3>
              <span className="text-[9px] text-zinc-600 mono uppercase tracking-widest">{MOVIES.length} ENTRIES</span>
            </div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOVIES.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col border-t border-white/5">
                {MOVIES.map((movie) => (
                  <ListViewItem key={movie.id} item={movie} type="MOVIE" onClick={() => setSelectedMovie(movie)} />
                ))}
              </div>
            )}
          </div>

          {/* Library */}
          <div className="space-y-6 pt-12">
            <div className="flex items-baseline gap-4 border-b border-white/5 pb-2">
              <h3 className="text-xl font-mono font-bold text-zinc-400">/ LIBRARY_DB</h3>
              <span className="text-[9px] text-zinc-600 mono uppercase tracking-widest">{BOOKS.length} ENTRIES</span>
            </div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {BOOKS.map((book) => (
                  <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col border-t border-white/5">
                {BOOKS.map((book) => (
                  <ListViewItem key={book.id} item={book} type="BOOK" onClick={() => setSelectedBook(book)} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Curation;