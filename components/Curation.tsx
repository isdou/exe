import React, { useState } from 'react';
import { MovieCuration, BookCuration } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MOVIES, BOOKS } from '../curationData';

// --- (保留原有的 MovieDetail 和 BookDetail 组件，无需修改，这里省略以节省篇幅) ---
// ... MovieDetail code ...
// ... BookDetail code ...

// 复用原有的 MovieDetail 和 BookDetail (请保留你原文件里的这两个组件代码)
// 如果需要，我可以把完整代码贴出来，但核心逻辑在下面：

// --- 新增：列表视图组件 (List View) ---
const ListViewItem: React.FC<{
  item: MovieCuration | BookCuration;
  type: 'MOVIE' | 'BOOK';
  onClick: () => void
}> = ({ item, type, onClick }) => {
  const isMovie = type === 'MOVIE';
  // 类型断言
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

// --- 主组件 ---
const Curation: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieCuration | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookCuration | null>(null);

  // 新增：视图模式状态
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // 默认设为 list 更符合你现在的需求

  return (
    <div className="relative min-h-full">
      {/* 详情弹窗 (保持逻辑不变) */}
      <AnimatePresence>
        {selectedMovie && <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />} // 需确保 MovieDetail 已定义
        {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />} // 需确保 BookDetail 已定义
      </AnimatePresence>

      <div className={`space-y-12 pb-32 transition-all duration-500 ${selectedMovie || selectedBook ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}>

        {/* 头部区域：增加视图切换开关 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-red-600"></span>
              <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Archive / 档案馆</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black serif leading-none tracking-tighter text-white">ARCHIVES.</h2>
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
                  <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} /> // 需确保 MovieCard 已定义
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
                  <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} /> // 需确保 BookCard 已定义
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