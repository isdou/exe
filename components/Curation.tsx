import React, { useState, useMemo } from 'react';
import { MovieCuration, BookCuration, MusicCuration, ContentStatus } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MOVIES, BOOKS, MUSIC } from '../curationData';

// --- 1. 辅助组件：状态徽章 ---
const StatusBadge: React.FC<{ status?: ContentStatus }> = ({ status }) => {
  if (!status) return null;
  const config = {
    done: { color: 'bg-zinc-600', text: 'ARCHIVED' },
    processing: { color: 'bg-green-500', text: 'ON LOOP' },
    dropped: { color: 'bg-red-600', text: 'SKIPPED' },
    wishlist: { color: 'bg-blue-500', text: 'DIGGING' },
  };
  const { color, text } = config[status] || { color: 'bg-zinc-800', text: status };
  return (
    <div className={`px-2 py-0.5 ${color} text-white text-[9px] font-mono tracking-widest uppercase inline-block rounded-sm`}>
      {text}
    </div>
  );
};

// --- 2. 辅助组件：评分徽章 ---
const RatingBadge: React.FC<{ rating?: number }> = ({ rating }) => {
  if (!rating) return null;
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-bold font-mono text-red-600">{rating}</span>
      <span className="text-[10px] text-zinc-600 font-mono">/10</span>
    </div>
  );
};

// --- 3. 组件：电影详情弹窗 ---
const MovieDetail: React.FC<{ movie: MovieCuration; onClose: () => void }> = ({ movie, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
  >
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="relative z-10 w-full max-w-5xl bg-[#0f0f10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
    >
      <div className="relative w-full md:w-1/3 h-64 md:h-auto bg-zinc-900 shrink-0">
        <img src={movie.images[1] || movie.images[0]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] via-transparent to-transparent opacity-40"></div>
        <div className="absolute top-6 left-6">
           <StatusBadge status={movie.status} />
           <div className="text-white font-mono text-xs opacity-90 drop-shadow-md mt-2">{movie.id.toUpperCase()}</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10 space-y-8 bg-[#0f0f10]">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
             <h2 className="text-3xl md:text-5xl font-bold serif text-white tracking-tighter leading-none">{movie.title}</h2>
             <div className="flex gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
               <span>{movie.year}</span><span>{movie.region}</span><span>{movie.runtime}</span>
             </div>
             <div className="flex flex-wrap gap-2 mt-2">
                {movie.tags?.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 text-[9px] mono text-zinc-400 rounded">#{tag}</span>
                ))}
             </div>
          </div>
          <div className="text-right">
             <RatingBadge rating={movie.rating || 9.0} />
             <div className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">System Rating</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6">
          <div><div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Director</div><div className="text-sm text-zinc-300 serif">{movie.director}</div></div>
          <div><div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Genre</div><div className="text-sm text-zinc-300 serif">{movie.genre}</div></div>
        </div>
        <div className="space-y-4">
          <div className="text-[9px] text-red-600 uppercase tracking-widest font-bold">Observer Log</div>
          <p className="text-zinc-300 text-lg leading-relaxed serif italic font-light opacity-90">“{movie.review}”</p>
        </div>
        <div className="pt-8 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 border border-white/10 rounded-full text-[10px] text-zinc-400 hover:text-white hover:border-white/30 transition-all uppercase tracking-widest">Close Panel</button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// --- 4. 组件：书籍详情弹窗 (💎 已添加：阅读日期/ISBN/字数) ---
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
       <div className="w-full md:w-1/3 bg-black/20 p-8 flex flex-col items-center justify-center shrink-0 border-r border-white/5 relative">
          <div className="absolute top-6 left-6"><StatusBadge status={book.status} /></div>
          <div className="w-32 md:w-40 aspect-[2/3] shadow-2xl rounded overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src={book.coverImage} className="w-full h-full object-cover" />
          </div>
          <div className="mt-8 text-center space-y-2"><RatingBadge rating={book.rating || 9.5} /></div>
       </div>
       
       <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar space-y-8">
          <div className="space-y-2">
             <h2 className="text-3xl md:text-4xl font-bold serif text-white">{book.title}</h2>
             <div className="text-sm text-white/60 serif italic">{book.author}</div>
             
             {/* 🔥 书籍元数据展示区域 */}
             <div className="flex flex-wrap gap-6 py-3 border-y border-white/10 text-[10px] font-mono text-zinc-400 uppercase tracking-widest my-4">
                {book.readingDate && (
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-300">Finished On</span>
                    <span className="text-white">{book.readingDate}</span>
                  </div>
                )}
                {book.wordCount && (
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-300">Word Count</span>
                    <span className="text-white">{book.wordCount}</span>
                  </div>
                )}
                {book.isbn && (
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-300">ISBN</span>
                    <span className="text-white select-all">{book.isbn}</span>
                  </div>
                )}
             </div>

             <div className="flex flex-wrap gap-2 mt-2">
                {book.tags?.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-black/20 text-[9px] mono text-white/60 rounded">#{tag}</span>
                ))}
             </div>
          </div>
          <div className="relative pl-6 border-l-2 border-white/20"><p className="text-lg md:text-xl font-bold text-white/90 leading-relaxed serif italic">{book.quote}</p></div>
          <div className="space-y-2 pt-4"><div className="text-[9px] text-white/40 uppercase tracking-widest">Resonance</div><p className="text-white/80 text-base font-light serif leading-relaxed">{book.summary}</p></div>
          <div className="pt-4 flex justify-end"><button onClick={onClose} className="px-6 py-2 bg-white/10 rounded-full text-[10px] text-white hover:bg-white/20 transition-all uppercase tracking-widest">Close Shelf</button></div>
       </div>
    </motion.div>
  </motion.div>
);

// --- 🔥 组件：音乐详情 (演唱会门票样式 / 💎 已修复箭头) ---
const MusicDetail: React.FC<{ music: MusicCuration; onClose: () => void }> = ({ music, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
  >
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
    
    <motion.div
      layoutId={`music-ticket-${music.id}`}
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      className="relative z-10 w-full max-w-3xl flex flex-col md:flex-row bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
    >
      {/* 装饰：票根切割线 */}
      <div className="absolute top-0 bottom-0 right-[32%] w-[1px] border-l-2 border-dashed border-zinc-800 hidden md:block z-20"></div>
      <div className="absolute -top-3 right-[32%] w-6 h-6 bg-black rounded-full hidden md:block ml-[-11px] z-30"></div>
      <div className="absolute -bottom-3 right-[32%] w-6 h-6 bg-black rounded-full hidden md:block ml-[-11px] z-30"></div>

      {/* 左侧：主票面 */}
      <div className="flex-1 p-8 md:p-10 flex flex-col justify-between gap-8 bg-[#0f0f10] relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/5 pointer-events-none select-none whitespace-nowrap overflow-hidden">
            AUDIO LOG
         </div>

         <div className="flex justify-between items-center text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em] relative z-10">
            <span>NO. {music.id}</span>
            <span>DOU TERMINAL / AUDIO</span>
         </div>

         <div className="space-y-4 relative z-10">
            <div>
               <h2 className="text-3xl md:text-5xl font-black serif text-white tracking-tighter leading-none mb-2">{music.title}</h2>
               <div className="text-red-600 font-mono text-sm tracking-[0.1em] uppercase">{music.artist}</div>
            </div>
            
            <div className="pl-4 border-l-2 border-zinc-800">
               <p className="text-zinc-400 font-serif italic text-sm md:text-base leading-relaxed">
                 “{music.review}”
               </p>
            </div>
         </div>

         <div className="flex gap-2 relative z-10">
            {music.tags?.map(tag => (
              <span key={tag} className="px-2 py-1 border border-zinc-800 rounded text-[9px] mono text-zinc-500 uppercase tracking-wider">#{tag}</span>
            ))}
         </div>
      </div>

      {/* 右侧：副券 */}
      <div className="w-full md:w-[32%] bg-[#121212] p-8 flex flex-col items-center justify-between border-t md:border-t-0 border-dashed border-zinc-800 relative">
         <div className="relative group cursor-pointer">
            <div className="w-28 h-28 rounded-full border-4 border-[#1a1a1a] shadow-2xl overflow-hidden animate-[spin_12s_linear_infinite]">
              <img src={music.coverImage} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-3 h-3 bg-black rounded-full border border-zinc-700"></div>
            </div>
         </div>

         <div className="text-center space-y-2 mt-4">
            <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Sonic Rating</div>
            <div className="text-4xl font-black font-mono text-white">{music.rating}</div>
            <div className="flex justify-center mt-2">
               <StatusBadge status={music.status} />
            </div>
         </div>

         {music.link ? (
           <a 
             href={music.link} 
             target="_blank" 
             rel="noopener noreferrer"
             className="w-full mt-6 py-3 bg-white hover:bg-red-600 text-black hover:text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-center rounded-sm"
           >
             Admit One &rarr;
           </a>
         ) : (
           <div className="w-full mt-6 py-3 border border-zinc-800 text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em] text-center rounded-sm">
             No Stream
           </div>
         )}
         
         <div className="w-full h-8 mt-4 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover grayscale contrast-200"></div>
      </div>
      
      <button onClick={onClose} className="absolute top-4 right-4 md:left-4 md:right-auto text-zinc-600 hover:text-white transition-colors z-50">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

    </motion.div>
  </motion.div>
);

// --- 5. 组件：列表视图单项 ---
const ListViewItem: React.FC<{ item: MovieCuration | BookCuration | MusicCuration; type: 'MOVIE' | 'BOOK' | 'MUSIC'; onClick: () => void }> = ({ item, type, onClick }) => {
  const isMovie = type === 'MOVIE';
  const isBook = type === 'BOOK';
  const isMusic = type === 'MUSIC';
  
  const movie = item as MovieCuration;
  const book = item as BookCuration;
  const music = item as MusicCuration;

  const rating = isMovie ? movie.rating : (isBook ? book.rating : music.rating);
  const title = isMovie ? `《${movie.title}》` : (isBook ? `《${book.title}》` : music.title);
  const subtitle = isMovie ? movie.director : (isBook ? book.author : music.artist);
  const review = isMovie ? movie.review : (isBook ? book.quote : music.review);
  const image = isMovie ? movie.images[0] : (isBook ? book.coverImage : music.coverImage);
  const idPrefix = isMovie ? 'MOV' : (isBook ? 'BOK' : 'MUS');

  return (
    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onClick={onClick} className="group flex items-center gap-4 py-3 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors">
      <div className="w-16 shrink-0 font-mono text-[9px] text-zinc-600 group-hover:text-red-600 transition-colors uppercase tracking-widest">{idPrefix}_{item.id.substring(0, 3)}</div>
      <div className={`w-8 shrink-0 bg-zinc-800 overflow-hidden hidden sm:block ${isMusic ? 'h-8 rounded-full' : 'h-10 rounded-sm'}`}>
        <img src={image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all" />
      </div>
      <div className="w-1/3 min-w-[120px] shrink-0">
        <div className="text-sm md:text-base font-bold text-zinc-300 group-hover:text-white serif truncate transition-colors flex items-center gap-2">
          {title}
          {isMusic && music.link && (
            <a 
              href={music.link} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="text-green-500 hover:text-green-400 hover:scale-110 transition-all"
              title="Jump to Stream"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm-2 14.5v-5l4 2.5-4 2.5z"/></svg>
            </a>
          )}
        </div>
        <div className="text-[10px] text-zinc-600 font-mono truncate">{subtitle}</div>
      </div>
      <div className="w-16 shrink-0 text-right font-mono text-xs font-bold text-zinc-500 group-hover:text-red-500 transition-colors">{rating ? rating.toFixed(1) : '-'}</div>
      <div className="flex-1 min-w-0 px-4"><div className="text-xs md:text-sm text-zinc-500 font-light serif italic truncate group-hover:text-zinc-300 transition-colors">{review}</div></div>
    </motion.div>
  );
};

// --- 6. 组件：画廊视图卡片 (💎 已修改：卡片更紧凑) ---
const MovieCard: React.FC<{ movie: MovieCuration; onClick: () => void }> = ({ movie, onClick }) => (
  <motion.div whileHover={{ y: -5 }} onClick={onClick} className="relative bg-[#0f0f10] border border-white/5 rounded-2xl overflow-hidden cursor-pointer group hover:border-white/20 transition-all">
    {/* 🔥 高度减小 h-48 -> h-36 */}
    <div className="relative h-36 w-full overflow-hidden">
      <img src={movie.images[0]} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] to-transparent"></div>
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-red-600 font-mono text-xs font-bold border border-white/10">{movie.rating || 9.0}</div>
    </div>
    
    {/* 🔥 内边距减小 p-5 -> p-4 */}
    <div className="p-4 space-y-2">
      <div className="flex justify-between items-start">
         {/* 🔥 字号减小 text-xl -> text-lg */}
         <h4 className="text-lg font-bold serif text-white leading-tight">{movie.title}</h4>
         <span className="text-[9px] font-mono text-zinc-600 uppercase border border-zinc-800 px-1 rounded">{movie.year}</span>
      </div>
      <p className="text-zinc-500 text-xs font-light serif italic line-clamp-2 leading-relaxed">{movie.review}</p>
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
         <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">{movie.director}</div>
         <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest flex items-center gap-1 group-hover:text-white transition-colors">OPEN <span className="text-red-600">&rarr;</span></div>
      </div>
    </div>
  </motion.div>
);

// --- 7. 组件：书籍卡片 ---
const BookCard: React.FC<{ book: BookCuration; onClick: () => void }> = ({ book, onClick }) => (
  <motion.div whileHover={{ scale: 1.02 }} onClick={onClick} className={`${book.bgColor} h-[320px] rounded-2xl p-6 relative overflow-hidden cursor-pointer group shadow-lg`}>
    <div className="absolute -right-4 -bottom-4 text-[100px] serif font-black text-white/5 leading-none select-none">”</div>
    <div className="flex flex-col h-full relative z-10">
      <div className="flex justify-between items-start mb-4">
         <div className="w-12 h-16 bg-black/20 rounded shadow-md overflow-hidden"><img src={book.coverImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" /></div>
         <div className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold text-white/90">{book.rating || 9.5}</div>
      </div>
      <div className="flex-1"><p className="text-lg font-bold leading-tight serif text-white/90 line-clamp-4 italic">{book.quote}</p></div>
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
        <div><div className="text-sm font-bold serif text-white">{book.author}</div><div className="text-[10px] text-white/50 mono">《{book.title}》</div></div>
      </div>
    </div>
  </motion.div>
);

// --- 8. 组件：音乐卡片 (Grid) ---
const MusicCard: React.FC<{ music: MusicCuration; onClick: () => void }> = ({ music, onClick }) => (
  <motion.div whileHover={{ y: -5 }} onClick={onClick} className="group cursor-pointer">
    <div className="relative aspect-square w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 group-hover:border-white/20 transition-all shadow-xl group-hover:scale-105">
       <img src={music.coverImage} className="w-full h-full object-cover opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-3 h-3 bg-black rounded-full border border-white/50"></div>
       </div>
    </div>
    <div className="mt-4 text-center space-y-1">
       <div className="text-sm font-bold text-zinc-300 group-hover:text-white truncate transition-colors">{music.title}</div>
       <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{music.artist}</div>
    </div>
  </motion.div>
);

// --- 9. 主组件 ---
const Curation: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieCuration | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookCuration | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<MusicCuration | null>(null);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<ContentStatus | 'all'>('all');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MOVIES.forEach(m => m.tags?.forEach(t => tags.add(t)));
    BOOKS.forEach(b => b.tags?.forEach(t => tags.add(t)));
    MUSIC.forEach(mu => mu.tags?.forEach(t => tags.add(t)));
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
  const filteredMusic = filterContent(MUSIC);

  return (
    <div className="relative min-h-full">
      <AnimatePresence>
        {selectedMovie && <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />}
        {selectedMusic && <MusicDetail music={selectedMusic} onClose={() => setSelectedMusic(null)} />}
      </AnimatePresence>

      <div className={`space-y-12 pb-32 transition-all duration-500 ${selectedMovie || selectedBook || selectedMusic ? 'blur-sm pointer-events-none' : ''}`}>

        {/* Header */}
        <div className="space-y-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-px bg-red-600"></span>
                  <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Archive / 档案馆</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black serif leading-none tracking-tighter text-white">ARCHIVES.</h2>
              </div>

              <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10 self-start md:self-end">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                </button>
              </div>
           </div>

           {/* Filter Bar */}
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

        {/* Content */}
        <section className="space-y-12">
          
          {/* 1. AUDIO_DB */}
          {filteredMusic.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-baseline gap-4 border-b border-white/5 pb-2">
                <h3 className="text-xl font-mono font-bold text-zinc-400">/ AUDIO_DB</h3>
                <span className="text-[9px] text-zinc-600 mono uppercase tracking-widest">{filteredMusic.length} ENTRIES</span>
              </div>
              <motion.div layout className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6" : "flex flex-col border-t border-white/5"}>
                {filteredMusic.map((music) => (
                  viewMode === 'grid'
                    ? <MusicCard key={music.id} music={music} onClick={() => setSelectedMusic(music)} />
                    : <ListViewItem key={music.id} item={music} type="MUSIC" onClick={() => setSelectedMusic(music)} />
                ))}
              </motion.div>
            </div>
          )}

          {/* 2. CINEMA_DB */}
          {filteredMovies.length > 0 && (
            <div className="space-y-6">
              
              {/* 将 grid 改为横向滚动容器 */}
              <motion.div 
                layout 
                className={viewMode === 'grid' 
                  ? "flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory custom-scrollbar pr-12" // 改动：使用 flex 和 overflow-x-auto
                  : "flex flex-col border-t border-white/5"
                }
              >
                {filteredMovies.map((movie) => (
                  viewMode === 'grid'
                    ? (
                      /* 增加一个 div 包裹层，限制卡片宽度并防止被压缩 */
                      <div key={movie.id} className="min-w-[280px] w-[280px] md:min-w-[340px] md:w-[340px] shrink-0 snap-center">
                        <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
                      </div>
                    )
                    : <ListViewItem key={movie.id} item={movie} type="MOVIE" onClick={() => setSelectedMovie(movie)} />
                ))}
              </motion.div>
            </div>
          )}

          {/* 3. LIBRARY_DB */}

          {filteredBooks.length > 0 && (
            <div className="space-y-6">

              {/* 改为横向滚动容器 */}
              <motion.div 
                layout 
                className={viewMode === 'grid' 
                  ? "flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory custom-scrollbar pr-12" // 改动
                  : "flex flex-col border-t border-white/5"
                }
              >
                {filteredBooks.map((book) => (
                  viewMode === 'grid'
                    ? (
                      /* 增加 div 包裹层，书籍卡片通常比电影卡片宽一点或保持一致 */
                      <div key={book.id} className="min-w-[300px] w-[300px] md:min-w-[380px] md:w-[380px] shrink-0 snap-center">
                        <BookCard book={book} onClick={() => setSelectedBook(book)} />
                      </div>
                    )
                    : <ListViewItem key={book.id} item={book} type="BOOK" onClick={() => setSelectedBook(book)} />
                ))}
              </motion.div>
              {/* 🔥 修改点结束 */}
            </div>
          )}

          {filteredMovies.length === 0 && filteredBooks.length === 0 && filteredMusic.length === 0 && (
             <div className="py-20 text-center text-zinc-600 mono text-xs">NO DATA FOUND IN THIS SECTOR.</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Curation;