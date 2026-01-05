import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MovieCuration, BookCuration, MusicCuration, CurationStatus, Character } from '../types';
import { MOVIES, BOOKS, MUSIC, CHARACTERS } from '../curationData';

// --- 1. 辅助逻辑：日期自动排序 ---
const sortByDate = <T extends { recordDate: string }>(items: T[]) => {
  return [...items].sort((a, b) => new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime());
};

// --- 2. 基础辅助组件 ---
const StatusBadge: React.FC<{ status?: CurationStatus }> = ({ status }) => {
  if (!status) return null;
  const config = {
    done: { color: 'bg-zinc-600', text: 'ARCHIVED' },
    processing: { color: 'bg-green-500', text: 'ON LOOP' },
    dropped: { color: 'bg-red-600', text: 'SKIPPED' },
    wishlist: { color: 'bg-blue-500', text: 'DIGGING' },
  };
  // @ts-ignore
  const { color, text } = config[status] || { color: 'bg-zinc-800', text: status };
  return (
    <div className={`px-2 py-0.5 ${color} text-white text-[9px] font-mono tracking-widest uppercase inline-block rounded-sm`}>
      {text}
    </div>
  );
};

const RatingBadge: React.FC<{ rating?: number }> = ({ rating }) => {
  if (!rating) return null;
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-bold font-mono text-red-600">{rating}</span>
      <span className="text-[10px] text-zinc-600 font-mono">/10</span>
    </div>
  );
};

// --- 3. 拟物化列表单项组件 ---

// 💿 电视剧：光盘堆叠 (TV Disc Stack)
const TVDisc: React.FC<{ movie: MovieCuration; index: number; onClick: () => void }> = ({ movie, index, onClick }) => (
  <motion.div
    whileHover={{ y: -30, zIndex: 50, rotate: 5 }}
    onClick={onClick}
    className="relative w-36 h-36 md:w-44 md:h-44 cursor-pointer shrink-0 transition-all"
    style={{ marginLeft: index === 0 ? 0 : -100 }}
  >
    <div 
      className="w-full h-full rounded-full border-2 border-white/10 shadow-[-10px_0_20px_rgba(0,0,0,0.5)] overflow-hidden relative group"
      style={{ background: `radial-gradient(circle, #222 15%, #111 16%, #333 20%, #111 25%, #444 30%, #111 35%)` }}
    >
      <img src={movie.images[0]} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity" alt="" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-black rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
        </div>
      </div>
    </div>
  </motion.div>
);

// 🎬 电影：标准 CD 盒
const CDCase: React.FC<{ movie: MovieCuration; onClick: () => void }> = ({ movie, onClick }) => (
  <motion.div whileHover="hover" onClick={onClick} className="relative w-40 h-40 group cursor-pointer perspective-1000">
    <motion.div variants={{ hover: { x: 40, rotate: 360 } }} className="absolute top-2 left-2 w-36 h-36 rounded-full bg-[#111] shadow-2xl border border-white/10 flex items-center justify-center">
      <div className="w-8 h-8 bg-black rounded-full border border-white/20"></div>
    </motion.div>
    <div className="absolute inset-0 z-10 bg-[#1a1a1a] rounded-sm shadow-xl overflow-hidden border border-white/10">
      <img src={movie.images[0]} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" alt="" />
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black to-transparent">
        <h4 className="text-white text-[10px] font-bold truncate">{movie.title}</h4>
      </div>
    </div>
  </motion.div>
);

// 📚 书籍：书架书脊
const BookOnShelf: React.FC<{ book: BookCuration; onClick: () => void }> = ({ book, onClick }) => (
  <motion.div 
    whileHover={{ y: -12, z: 20, rotateY: -5, transition: { type: 'spring', stiffness: 300 } }}
    onClick={onClick}
    className="relative shrink-0 w-10 h-40 md:w-14 md:h-56 cursor-pointer origin-bottom"
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className={`w-full h-full ${book.bgColor || 'bg-zinc-800'} border-l border-white/20 shadow-lg flex flex-col justify-between py-4 items-center`}>
      <div className="text-white/20 font-black text-[7px] rotate-180 [writing-mode:vertical-lr] tracking-widest uppercase truncate">{book.isbn || 'ARCHIVE'}</div>
      <h4 className="text-white font-bold text-[10px] md:text-xs [writing-mode:vertical-lr] tracking-wider whitespace-nowrap">{book.title}</h4>
      <div className="w-3 h-3 rounded-full bg-white/10 text-[7px] text-white/50 flex items-center justify-center">{book.rating?.toFixed(0)}</div>
    </div>
  </motion.div>
);

// 🎵 音乐：黑胶堆叠
const VinylStack: React.FC<{ music: MusicCuration; index: number; onClick: () => void }> = ({ music, index, onClick }) => (
  <motion.div
    whileHover={{ y: -25, zIndex: 50, rotate: -2 }}
    onClick={onClick}
    className="relative w-36 h-36 md:w-48 md:h-48 cursor-pointer shrink-0 shadow-2xl group transition-all"
    style={{ marginLeft: index === 0 ? 0 : -80 }}
  >
    <div className="w-full h-full bg-zinc-900 border border-white/10 rounded-sm overflow-hidden relative shadow-[-10px_0_20px_rgba(0,0,0,0.5)]">
      <img src={music.coverImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent"></div>
    </div>
  </motion.div>
);

// --- 4. 各种详情弹窗组件 ---

// 📺 电视墙 (TV Wall)
const TVWall: React.FC<{ shows: MovieCuration[]; onClose: () => void; onSelect: (m: MovieCuration) => void }> = ({ shows, onClose, onSelect }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[400] bg-black p-8 flex flex-col items-center justify-center overflow-hidden"
  >
    <div className="w-full max-w-6xl flex justify-between items-center mb-8 border-b border-green-900/50 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <h2 className="text-sm font-mono text-green-600 tracking-[0.3em] uppercase">Multi-Channel Monitor</h2>
      </div>
      <button onClick={onClose} className="px-4 py-1 border border-green-900 text-green-600 font-mono text-[10px] hover:bg-green-900 hover:text-white transition-all underline">CLOSE_CONNECTION [X]</button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl overflow-y-auto custom-scrollbar p-4">
      {shows.map((show) => (
        <motion.div
          key={show.id}
          whileHover={{ scale: 1.05, zIndex: 10 }}
          onClick={() => onSelect(show)}
          className="aspect-video bg-zinc-900 border border-zinc-800 rounded relative group cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 z-20 pointer-events-none opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]"></div>
          <img src={show.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 contrast-125" />
          <div className="absolute top-2 left-2 z-30 font-mono text-[8px] text-green-500 opacity-80">CH_{show.id.slice(-2)}</div>
          <div className="absolute bottom-2 right-2 z-30 font-mono text-[8px] text-green-500 opacity-80 truncate w-24 text-right">{show.title}</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// 影视详情
const MovieDetail: React.FC<{ movie: MovieCuration; onClose: () => void }> = ({ movie, onClose }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto"
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
             <div className="text-white font-mono text-[9px] opacity-60 mt-2 tracking-widest uppercase">ID: {movie.id}</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10 space-y-8 bg-[#0f0f10]">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
               <h2 className="text-3xl md:text-5xl font-bold serif text-white tracking-tighter leading-none">{movie.title}</h2>
               <div className="flex gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                 <span>{movie.year}</span><span>{movie.region}</span>
                 <span>{movie.isTV ? movie.totalDuration : movie.runtime}</span>
               </div>
               <div className="flex flex-wrap gap-2 mt-2">
                  {movie.tags?.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 text-[9px] mono text-zinc-400 rounded">#{tag}</span>
                  ))}
               </div>
            </div>
            <div className="text-right">
               <RatingBadge rating={movie.rating || 9.0} />
               <div className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Observer Rating</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6">
            <div><div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Director</div><div className="text-sm text-zinc-300 serif">{movie.director}</div></div>
            <div><div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Genre</div><div className="text-sm text-zinc-300 serif">{movie.genre}</div></div>
          </div>
          {movie.cast && (
            <div className="space-y-2">
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Starring</div>
              <div className="text-sm text-zinc-300 serif">{movie.cast.join(' / ')}</div>
            </div>
          )}
          <div className="space-y-4">
            <div className="text-[9px] text-red-600 uppercase tracking-widest font-bold">Observation Log</div>
            <p className="text-zinc-300 text-lg leading-relaxed serif italic font-light opacity-90">“{movie.review}”</p>
          </div>
          <div className="pt-8 flex justify-end">
            <button onClick={onClose} className="px-6 py-2 border border-white/10 rounded-full text-[10px] text-zinc-400 hover:text-white hover:border-white/30 transition-all uppercase tracking-widest">Close Record</button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById('tv-modal-root') || document.body
  );
};

// 书籍详情
const BookDetail: React.FC<{ book: BookCuration; onClose: () => void }> = ({ book, onClose }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto"
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
            <div className="relative pl-6 border-l-2 border-white/20">
               <p className="text-lg md:text-xl font-bold text-white/90 leading-relaxed serif italic">“{book.quote}”</p>
            </div>
            <div className="space-y-2 pt-4">
               <div className="text-[9px] text-white/40 uppercase tracking-widest">Resonance</div>
               <p className="text-white/80 text-base font-light serif leading-relaxed">{book.summary}</p>
            </div>
            <div className="pt-4 flex justify-end">
               <button onClick={onClose} className="px-6 py-2 bg-white/10 rounded-full text-[10px] text-white hover:bg-white/20 transition-all uppercase tracking-widest">Close Shelf</button>
            </div>
         </div>
      </motion.div>
    </motion.div>,
    document.getElementById('tv-modal-root') || document.body
  );
};

// 音乐详情 (票根样式)
const MusicDetail: React.FC<{ music: MusicCuration; onClose: () => void }> = ({ music, onClose }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] flex items-center justify-center p-4 pointer-events-auto"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div
        layoutId={`music-ticket-${music.id}`}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative z-10 w-full max-w-3xl flex flex-col md:flex-row bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute top-0 bottom-0 right-[32%] w-[1px] border-l-2 border-dashed border-zinc-800 hidden md:block z-20"></div>
        <div className="absolute -top-3 right-[32%] w-6 h-6 bg-black rounded-full hidden md:block ml-[-11px] z-30"></div>
        <div className="absolute -bottom-3 right-[32%] w-6 h-6 bg-black rounded-full hidden md:block ml-[-11px] z-30"></div>
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-between gap-8 bg-[#0f0f10] relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/5 pointer-events-none select-none whitespace-nowrap overflow-hidden">AUDIO LOG</div>
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
                 <p className="text-zinc-400 font-serif italic text-sm md:text-base leading-relaxed">“{music.review}”</p>
              </div>
           </div>
           <div className="flex gap-2 relative z-10">
              {music.tags?.map(tag => (
                <span key={tag} className="px-2 py-1 border border-zinc-800 rounded text-[9px] mono text-zinc-500 uppercase tracking-wider">#{tag}</span>
              ))}
           </div>
        </div>
        <div className="w-full md:w-[32%] bg-[#121212] p-8 flex flex-col items-center justify-between border-t md:border-t-0 border-dashed border-zinc-800 relative">
           <div className="relative group cursor-pointer">
              <div className="w-28 h-28 rounded-full border-4 border-[#1a1a1a] shadow-2xl overflow-hidden animate-[spin_12s_linear_infinite]">
                <img src={music.coverImage} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><div className="w-3 h-3 bg-black rounded-full border border-zinc-700"></div></div>
           </div>
           <div className="text-center space-y-2 mt-4">
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Sonic Rating</div>
              <div className="text-4xl font-black font-mono text-white">{music.rating}</div>
              <div className="flex justify-center mt-2"><StatusBadge status={music.status} /></div>
           </div>
           {music.link ? (
             <a href={music.link} target="_blank" rel="noopener noreferrer" className="w-full mt-6 py-3 bg-white hover:bg-red-600 text-black hover:text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-center rounded-sm">Admit One &rarr;</a>
           ) : (
             <div className="w-full mt-6 py-3 border border-zinc-800 text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em] text-center rounded-sm">No Stream</div>
           )}
           <div className="w-full h-8 mt-4 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover grayscale contrast-200"></div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 md:left-4 md:right-auto text-zinc-600 hover:text-white transition-colors z-50">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </motion.div>
    </motion.div>,
    document.getElementById('tv-modal-root') || document.body
  );
};

// 角色详情 (机密档案)
const CharacterFolder: React.FC<{ char: Character; onClose: () => void }> = ({ char, onClose }) => {
  const getMBTIColor = (mbti?: string) => {
    const m = mbti?.toUpperCase() || '';
    if (m.includes('NT')) return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
    if (m.includes('NF')) return 'text-green-400 bg-green-400/10 border-green-400/30';
    if (m.includes('SJ')) return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    if (m.includes('SP')) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/30';
  };

  return createPortal(
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 pointer-events-auto">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <motion.div 
        initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.9 }}
        className="relative z-10 w-full max-w-5xl bg-[#e8e2d4] text-zinc-900 shadow-2xl rounded-sm flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")` }}
      >
        <div className="w-full md:w-80 border-r border-zinc-300 p-8 flex flex-col gap-6 bg-black/5 shrink-0">
          <div className="aspect-square w-full rounded-sm border-4 border-white shadow-lg overflow-hidden grayscale contrast-125">
             <img src={char.avatar} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4">
             <div><div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Name</div><h3 className="text-2xl font-black serif">{char.name}</h3></div>
             <div><div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Origin</div><div className="text-sm font-bold serif">{char.source}</div></div>
             <div><div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Type</div><span className={`px-2 py-0.5 rounded border text-[10px] font-black font-mono inline-block mt-1 ${getMBTIColor(char.mbti)}`}>{char.mbti || 'N/A'}</span></div>
          </div>
        </div>
        <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar relative">
           <div className="absolute top-8 right-8 text-[40px] md:text-[80px] font-black text-black/[0.03] select-none font-mono tracking-tighter">CLASSIFIED</div>
           <div className="space-y-8 relative z-10">
              <div className="space-y-6">
                 <p className="text-xl md:text-2xl font-bold serif italic text-zinc-800 leading-relaxed border-l-4 border-red-600 pl-6">“{char.desc}”</p>
                 <div className="prose prose-zinc max-w-none">
                    <p className="text-zinc-700 leading-loose serif text-lg whitespace-pre-wrap">{char.biography || '档案资料整理中...'}</p>
                 </div>
              </div>
           </div>
           <button onClick={onClose} className="mt-12 px-8 py-3 bg-zinc-900 text-white text-[10px] font-mono uppercase tracking-widest hover:bg-red-700 transition-colors">Close File</button>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById('tv-modal-root') || document.body
  );
}; // <--- 关键修复：补全了这个右大括号

// --- 5. 主页面组件 ---
const Curation: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieCuration | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookCuration | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<MusicCuration | null>(null);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [showTVWall, setShowTVWall] = useState(false);

  // 排序并过滤数据 
  // 只让标记了 onWall 的电视剧进入电视墙
  // 1. 电视墙专供：只放标记了 onWall 的精选剧集
  const tvWallShows = useMemo(() => sortByDate(MOVIES.filter(m => m.isTV && m.onWall)), []);

// 2. 外部列表专供：显示所有电视剧 (isTV 为 true 的全部显示)
  const allTvShows = useMemo(() => sortByDate(MOVIES.filter(m => m.isTV)), []);

// 3. 电影专供：显示所有非电视剧内容
  const regularMovies = useMemo(() => sortByDate(MOVIES.filter(m => !m.isTV)), []);
  const sortedBooks = useMemo(() => sortByDate(BOOKS), []);
  const sortedMusic = useMemo(() => sortByDate(MUSIC), []);

  return (
    <div className="relative min-h-full">
      {/* 弹窗层 */}
      <AnimatePresence>
        {selectedMovie && <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />}
        {selectedMusic && <MusicDetail music={selectedMusic} onClose={() => setSelectedMusic(null)} />}
        {selectedChar && <CharacterFolder char={selectedChar} onClose={() => setSelectedChar(null)} />}
        {showTVWall && (
          <TVWall 
            shows={tvWallShows} // ✨ 改用精选数据源
            onClose={() => setShowTVWall(false)} 
            onSelect={(m) => { setSelectedMovie(m); setShowTVWall(false); }} 
          />
        )}
      </AnimatePresence>

      <div className={`space-y-24 pb-32 transition-all duration-500 ${selectedMovie || selectedBook || selectedMusic || selectedChar || showTVWall ? 'blur-md pointer-events-none' : ''}`}>
        
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-red-600"></span>
            <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Archive / 档案馆</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black serif leading-none tracking-tighter text-white uppercase">Archives.</h2>
        </div>

        {/* 🎬 影视板块 (光盘堆叠 + CD盒) */}
        <section className="space-y-12">
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <h3 className="text-2xl font-mono font-bold text-zinc-500 tracking-tighter">/ CINEMA_DB</h3>
            <button onClick={() => setShowTVWall(true)} className="flex items-center gap-2 px-3 py-1 border border-green-900/50 rounded text-green-600 hover:bg-green-900 hover:text-white transition-all">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-mono uppercase font-bold tracking-widest">TV Wall Mode</span>
            </button>
          </div>

          <div className="space-y-16">
            {/* 电视剧堆叠 */}
            <div className="space-y-6">
               <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Series_Stacks (DVD)</div>
               <div className="flex overflow-x-auto pb-12 pt-4 px-12 custom-scrollbar">
                  {allTvShows.map((show, i) => (
                    <TVDisc key={show.id} movie={show} index={i} onClick={() => setSelectedMovie(show)} />
                  ))}
               </div>
            </div>
            {/* 电影网格 */}
            <div className="space-y-6">
               <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Feature_Films (CD)</div>
               <div className="flex flex-wrap gap-x-16 gap-y-12 px-4 justify-center md:justify-start">
                  {regularMovies.map(movie => (
                    <CDCase key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* 📚 书架板块 */}
        <section className="space-y-10">
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <h3 className="text-2xl font-mono font-bold text-zinc-500 tracking-tighter">/ LIBRARY_SHELF</h3>
            <span className="text-[10px] font-mono text-zinc-700 uppercase">Slide to explore</span>
          </div>
          <div className="relative pt-12">
             <div className="absolute inset-x-0 bottom-4 h-4 bg-[#3d2b1f] border-t border-white/5 shadow-2xl z-0 rounded-sm"></div>
             <div className="flex gap-1 overflow-x-auto pb-8 px-10 custom-scrollbar relative z-10 scroll-smooth">
                {sortedBooks.map(book => (
                  <BookOnShelf key={book.id} book={book} onClick={() => setSelectedBook(book)} />
                ))}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="shrink-0 w-10 h-40 md:w-14 md:h-56 bg-white/[0.01] border-l border-white/[0.03]"></div>
                ))}
             </div>
          </div>
        </section>

        {/* 🎵 音乐板块 */}
        <section className="space-y-10">
          <div className="flex justify-between items-end border-b border-white/5 pb-4"><h3 className="text-2xl font-mono font-bold text-zinc-500 tracking-tighter">/ AUDIO_VINYLS</h3></div>
          <div className="flex overflow-x-auto pb-12 pt-4 px-12 custom-scrollbar">
             {sortedMusic.map((mu, i) => (
               <VinylStack key={mu.id} music={mu} index={i} onClick={() => setSelectedMusic(mu)} />
             ))}
          </div>
        </section>

        {/* 👤 角色板块 */}
        <section className="space-y-10 pt-16 border-t border-white/5">
           <div className="flex items-center gap-4"><div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div><h3 className="text-2xl font-black serif text-white tracking-tight">Character Hall of Fame</h3></div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {CHARACTERS.map(char => (
               <motion.div key={char.id} whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.05)' }} onClick={() => setSelectedChar(char)} className="flex items-center gap-5 p-5 bg-white/[0.02] border border-white/5 rounded-sm cursor-pointer transition-all group">
                 <div className="w-20 h-20 shrink-0 grayscale group-hover:grayscale-0 transition-all border border-white/10 rounded-sm overflow-hidden shadow-lg"><img src={char.avatar} className="w-full h-full object-cover" /></div>
                 <div className="space-y-1">
                    <div className="text-xl font-bold serif text-zinc-200 group-hover:text-white leading-none">{char.name}</div>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase">{char.source}</div>
                    <div className="flex gap-2 mt-2">{char.mbti && <span className={`text-[8px] font-mono px-1.5 py-0.5 border border-zinc-700 text-zinc-500 uppercase`}>{char.mbti}</span>}</div>
                 </div>
                 <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-red-600 font-mono text-xs pr-2">Dossier &rarr;</div>
               </motion.div>
             ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default Curation;