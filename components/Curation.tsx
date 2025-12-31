import React, { useState } from 'react';
import { MovieCuration, BookCuration } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
// --- 引用外部数据文件 ---
import { MOVIES, BOOKS } from '../curationData';

// --- 组件：电影详情弹窗 (修复定位问题) ---
const MovieDetail: React.FC<{ movie: MovieCuration; onClose: () => void }> = ({ movie, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    // 修改点：使用 fixed 定位，确保始终覆盖视口，不受滚动条影响
    className="fixed inset-0 z-[200] bg-[#0a0a0a] w-full h-full overflow-y-auto px-6 py-12 md:p-24"
  >
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 pb-24">
      <div className="lg:w-1/2 space-y-12">
        <button onClick={onClose} className="mono text-[10px] text-zinc-500 flex items-center gap-2 hover:text-white transition-colors group">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          EXIT ARCHIVE
        </button>
        <div className="space-y-6">
          <h1 className="text-5xl md:text-8xl font-bold serif text-white tracking-tighter leading-none">{movie.title}</h1>
          <div className="flex flex-wrap gap-4 items-center mono text-[10px] text-zinc-400 tracking-[0.2em] uppercase">
            <span>{movie.director}</span>
            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
            <span>{movie.year}</span>
            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
            <span>{movie.region}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-8 mono text-[10px] text-zinc-500 uppercase tracking-widest">
          <div>GENRE: {movie.genre}</div>
          <div>RUNTIME: {movie.runtime}</div>
        </div>
        <div className="space-y-6">
          <h3 className="text-red-600 mono text-xs uppercase tracking-widest font-bold">Observer Log / 观影笔记</h3>
          <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed serif italic font-light opacity-90">
            {movie.review}
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 grid grid-cols-2 gap-4 h-fit sticky top-0 md:top-24">
        <div className="col-span-2 aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={movie.images[0]} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
          <img src={movie.images[1]} className="w-full h-full object-cover grayscale" />
        </div>
        <div className="aspect-square bg-zinc-900/50 rounded-3xl flex items-center justify-center border border-white/5 p-8">
           <div className="text-center space-y-4">
              <div className="text-[10px] mono text-red-600 font-bold tracking-widest uppercase">Rating</div>
              <div className="text-4xl font-bold text-white serif tracking-tighter italic">9.2</div>
           </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 组件：书籍详情弹窗 (修复定位问题) ---
const BookDetail: React.FC<{ book: BookCuration; onClose: () => void }> = ({ book, onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    // 修改点：使用 fixed 定位
    className={`fixed inset-0 z-[200] ${book.bgColor} w-full h-full overflow-y-auto px-6 py-12 md:p-24`}
  >
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 pb-24">
      <div className="md:w-1/3 flex flex-col items-center gap-12">
        <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-4 border-white/10">
          <img src={book.coverImage} className="w-full h-full object-cover" />
        </div>
        <button onClick={onClose} className="px-12 py-4 border border-white/20 rounded-full text-white text-[10px] mono uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          CLOSE SHELF
        </button>
      </div>
      <div className="md:w-2/3 space-y-12">
        <div className="space-y-4 pt-12">
          <div className="text-white/40 mono text-[10px] tracking-widest uppercase">Literary Pulse Log</div>
          <h1 className="text-4xl md:text-7xl font-bold serif text-white tracking-tighter leading-tight">《{book.title}》</h1>
          <h2 className="text-lg md:text-2xl text-white/60 serif font-light italic">— {book.author}</h2>
        </div>

        <div className="relative p-10 bg-black/30 rounded-3xl border border-white/10 backdrop-blur-md">
           <span className="absolute top-4 left-6 text-6xl text-white/10 serif font-black select-none">“</span>
           <p className="text-xl md:text-3xl font-bold text-white leading-tight serif tracking-tight relative z-10 italic">
             {book.quote}
           </p>
        </div>

        <div className="space-y-8">
           <h3 className="text-white/40 mono text-xs uppercase tracking-widest font-bold flex items-center gap-4">
             <span className="w-8 h-px bg-white/20"></span> Resonance Field
           </h3>
           <p className="text-white/90 text-xl leading-relaxed serif font-light">
             {book.summary}
           </p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 组件：列表视图单项 (新增) ---
const ListViewItem: React.FC<{
  item: MovieCuration | BookCuration;
  type: 'MOVIE' | 'BOOK';
  onClick: () => void
}> = ({ item, type, onClick }) => {
  const isMovie = type === 'MOVIE';
  const movie = item as MovieCuration;
  const book = item as BookCuration;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group flex items-center gap-4 py-3 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors"
    >
      {/* 1. ID/Type 索引列 */}
      <div className="w-16 shrink-0 font-mono text-[9px] text-zinc-600 group-hover:text-red-600 transition-colors uppercase tracking-widest">
        {type === 'MOVIE' ? 'MOV' : 'BOK'}_{item.id.substring(0, 3)}
      </div>

      {/* 2. 封面缩略图 */}
      <div className="w-8 h-10 shrink-0 bg-zinc-800 overflow-hidden rounded-sm hidden sm:block">
        <img
          src={isMovie ? movie.images[0] : book.coverImage}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all"
        />
      </div>

      {/* 3. 标题与作者/导演 */}
      <div className="w-1/3 min-w-[120px] shrink-0">
        <div className="text-sm md:text-base font-bold text-zinc-300 group-hover:text-white serif truncate transition-colors">
          {isMovie ? `《${movie.title}》` : `《${book.title}》`}
        </div>
        <div className="text-[10px] text-zinc-600 font-mono truncate">
          {isMovie ? movie.director : book.author}
        </div>
      </div>

      {/* 4. 评分/引用 (核心内容) */}
      <div className="flex-1 min-w-0 pr-4">
         <div className="text-xs md:text-sm text-zinc-500 font-light serif italic truncate group-hover:text-zinc-300 transition-colors">
           {isMovie ? movie.review : book.quote}
         </div>
      </div>

      {/* 5. 更多箭头 */}
      <div className="w-6 shrink-0 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </motion.div>
  );
};

// --- 组件：画廊视图卡片 (复用原代码) ---
const MovieCard: React.FC<{ movie: MovieCuration; onClick: () => void }> = ({ movie, onClick }) => (
  <motion.div
    whileHover={{ y: -10 }}
    onClick={onClick}
    className="relative bg-zinc-900/20 border border-white/5 rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col gap-6 transition-all hover:bg-zinc-900/40 shadow-2xl cursor-pointer group"
  >
    <div className="relative h-48 md:h-80 w-full mb-2">
      <div className="absolute top-0 left-0 w-3/4 h-full overflow-hidden rounded-2xl shadow-xl z-10">
        <img src={movie.images[0]} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-2/3 overflow-hidden rounded-2xl shadow-2xl z-20 border-4 border-[#121212]">
        <img src={movie.images[1]} className="w-full h-full object-cover contrast-110" />
      </div>
      <div className="absolute top-4 right-4 z-30 mono text-[8px] bg-red-600 px-2 py-1 text-white uppercase tracking-widest">
        {movie.year}
      </div>
    </div>
    <div className="space-y-4">
      <h4 className="text-2xl md:text-4xl font-bold serif tracking-tighter text-white">&lt;{movie.title}&gt;</h4>
      <p className="text-zinc-500 text-sm md:text-base font-light serif italic line-clamp-2">
        {movie.review}
      </p>
      <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
         <span>Details</span>
         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  </motion.div>
);

const BookCard: React.FC<{ book: BookCuration; onClick: () => void }> = ({ book, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className={`${book.bgColor} min-h-[350px] md:min-h-[500px] flex flex-col p-8 md:p-10 rounded-3xl shadow-2xl transition-all relative overflow-hidden group cursor-pointer`}
  >
    <span className="absolute -top-4 -left-4 text-[120px] md:text-[180px] serif font-black text-white/5 leading-none select-none group-hover:text-white/10 transition-colors">“</span>
    <div className="flex-1 space-y-6 relative z-10">
      <div className="w-12 h-1 bg-white/20 mb-8"></div>
      <p className="text-xl md:text-2xl font-bold leading-tight serif tracking-tight text-white/90">
        {book.quote}
      </p>
    </div>
    <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
      <div className="flex gap-4 items-end">
        <div className="w-16 h-24 md:w-20 md:h-28 bg-black/20 overflow-hidden shadow-2xl rounded-xl shrink-0 group-hover:rotate-3 transition-transform">
          <img src={book.coverImage} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700" />
        </div>
        <div className="space-y-1 pb-1 flex-1">
          <h5 className="text-base font-bold serif text-white">{book.author}</h5>
          <h6 className="text-[10px] font-light text-white/60 mono italic truncate">《{book.title}》</h6>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 主组件 ---
const Curation: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieCuration | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookCuration | null>(null);
  // 视图模式状态：默认为 List
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <div className="relative min-h-full">
      {/* 弹窗层：使用 AnimatePresence 处理进出动画 */}
      <AnimatePresence>
        {selectedMovie && <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />}
      </AnimatePresence>

      {/* 主内容层：当弹窗打开时，内容层淡出并禁用交互 */}
      <div className={`space-y-12 pb-32 transition-all duration-500 ${selectedMovie || selectedBook ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}>

        {/* 头部区域：增加视图切换开关 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-red-600"></span>
              <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Archive / 档案馆</span>
            </div>
            {/* 调小了字体大小 */}
            <h2 className="text-5xl md:text-7xl font-black serif leading-none tracking-tighter text-white">ARCHIVES.</h2>
            <p className="text-zinc-500 text-lg md:text-xl font-light serif italic max-w-2xl">
              “在这里，我将打捞起的灵魂碎片存入磁带。有些关于光影，有些关于墨痕。”
            </p>
          </div>

          {/* 视图切换按钮组 */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Gallery View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Database View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* 内容展示区 */}
        <section className="space-y-12">

          {/* 影视部分 */}
          <div className="space-y-6">
            <div className="flex items-baseline gap-4 border-b border-white/5 pb-2">
              <h3 className="text-xl font-mono font-bold text-zinc-400">/ CINEMA_DB</h3>
              <span className="text-[9px] text-zinc-600 mono uppercase tracking-widest">{MOVIES.length} ENTRIES</span>
            </div>

            {viewMode === 'grid' ? (
              // 画廊视图 (Grid)
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {MOVIES.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
                ))}
              </div>
            ) : (
              // 列表视图 (List)
              <div className="flex flex-col border-t border-white/5">
                {MOVIES.map((movie) => (
                  <ListViewItem key={movie.id} item={movie} type="MOVIE" onClick={() => setSelectedMovie(movie)} />
                ))}
              </div>
            )}
          </div>

          {/* 书籍部分 */}
          <div className="space-y-6 pt-12">
            <div className="flex items-baseline gap-4 border-b border-white/5 pb-2">
              <h3 className="text-xl font-mono font-bold text-zinc-400">/ LIBRARY_DB</h3>
              <span className="text-[9px] text-zinc-600 mono uppercase tracking-widest">{BOOKS.length} ENTRIES</span>
            </div>

            {viewMode === 'grid' ? (
              // 画廊视图 (Grid)
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {BOOKS.map((book) => (
                  <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
                ))}
              </div>
            ) : (
              // 列表视图 (List)
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