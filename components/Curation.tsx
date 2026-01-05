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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[500] flex items-center justify-center p-4 pointer-events-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative z-10 w-full max-w-2xl bg-[#0f0f10] border border-zinc-800 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* 左侧封面 */}
        <div className="w-full md:w-52 h-64 md:h-auto shrink-0 relative bg-zinc-900 border-r border-white/5">
          <img src={movie.images[0]} className="w-full h-full object-cover opacity-80" />
          <div className="absolute top-4 left-4"><StatusBadge status={movie.status} /></div>
        </div>

        {/* 右侧内容：去掉了黑点纹理 */}
        <div className="flex-1 p-6 md:p-8 space-y-5 bg-[#0f0f10]">
          <div className="space-y-1">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-white tracking-tight leading-tight">{movie.title}</h2>
              <RatingBadge rating={movie.rating} />
            </div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{movie.originalTitle || 'N/A'}</div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-3 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            <div><span className="block text-zinc-700 mb-1">Year</span>{movie.year || '----'}</div>
            <div><span className="block text-zinc-700 mb-1">Region</span>{movie.region || '----'}</div>
            <div><span className="block text-zinc-700 mb-1">Runtime</span>{movie.runtime || '----'}</div>
          </div>

          <div className="space-y-4">
            <div className="pl-4 border-l border-red-900/50">
               <p className="text-sm text-zinc-300 font-serif italic leading-relaxed">“{movie.review}”</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {movie.tags?.map(tag => (
                <span key={tag} className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[8px] font-mono text-zinc-500 rounded-sm">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button onClick={onClose} className="px-6 py-1.5 bg-zinc-900 hover:bg-red-900 text-zinc-500 hover:text-white transition-all text-[9px] font-mono uppercase border border-white/5 rounded">Close_Dossier</button>
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[500] flex items-center justify-center p-4 pointer-events-auto">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
        className={`relative z-10 w-full max-w-2xl ${book.bgColor || 'bg-zinc-900'} border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]`}
      >
         {/* 左侧封面：缩小尺寸 */}
         <div className="w-full md:w-56 bg-black/20 p-6 flex flex-col items-center justify-center shrink-0 border-r border-white/5 relative">
            <div className="absolute top-5 left-5"><StatusBadge status={book.status} /></div>
            <div className="w-24 md:w-28 aspect-[2/3] shadow-2xl rounded overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src={book.coverImage} className="w-full h-full object-cover" />
            </div>
            <div className="mt-6 text-center"><RatingBadge rating={book.rating} /></div>
         </div>

         {/* 右侧内容：缩小内边距和字号 */}
         <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6 text-white/90">
            <div className="space-y-1">
               <h2 className="text-xl md:text-2xl font-bold serif leading-tight">{book.title}</h2>
               <div className="text-xs text-white/60 serif italic">{book.author}</div>
               <div className="flex gap-4 py-2 border-y border-white/10 text-[9px] font-mono text-white/50 uppercase tracking-widest my-3">
                  {book.readingDate && <div className="flex flex-col gap-0.5"><span>Date</span><span className="text-white/80">{book.readingDate}</span></div>}
                  {book.isbn && <div className="flex flex-col gap-0.5"><span>ISBN</span><span className="text-white/80">{book.isbn}</span></div>}
               </div>
            </div>
            <div className="relative pl-4 border-l-2 border-white/20">
               <p className="text-sm font-medium leading-relaxed serif italic">“{book.quote}”</p>
            </div>
            <div className="space-y-1.5">
               <div className="text-[8px] text-white/40 uppercase tracking-widest font-mono">Summary</div>
               <p className="text-white/70 text-xs font-light serif leading-relaxed line-clamp-4">{book.summary}</p>
            </div>
            <div className="pt-2 flex justify-end">
               <button onClick={onClose} className="px-5 py-1.5 bg-white/10 rounded-full text-[9px] text-white font-mono hover:bg-white/20 transition-all uppercase tracking-widest">Close_Shelf</button>
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[500] flex items-center justify-center p-4 pointer-events-auto">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div className="relative z-10 w-full max-w-xl flex flex-col md:flex-row bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 bottom-0 right-[35%] w-[1px] border-l border-dashed border-zinc-800 hidden md:block z-20"></div>
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6 bg-[#0f0f10]">
           <div className="flex justify-between items-center text-[8px] font-mono text-zinc-600 uppercase tracking-widest"><span>NO. {music.id}</span><span>AUDIO_LOG</span></div>
           <div className="space-y-3">
              <div><h2 className="text-xl md:text-2xl font-black serif text-white tracking-tight leading-none mb-1">{music.title}</h2><div className="text-red-600 font-mono text-xs tracking-widest uppercase">{music.artist}</div></div>
              <p className="text-zinc-400 font-serif italic text-xs leading-relaxed">“{music.review}”</p>
           </div>
           <div className="flex gap-1.5">{music.tags?.slice(0, 2).map(tag => <span key={tag} className="px-1.5 py-0.5 border border-zinc-800 rounded text-[7px] mono text-zinc-600 uppercase tracking-widest">#{tag}</span>)}</div>
        </div>
        <div className="w-full md:w-[35%] bg-[#121212] p-6 flex flex-col items-center justify-between border-t md:border-t-0 border-dashed border-zinc-800">
           <div className="w-20 h-20 rounded-full border-2 border-[#1a1a1a] shadow-xl overflow-hidden animate-[spin_12s_linear_infinite]"><img src={music.coverImage} className="w-full h-full object-cover opacity-80" /></div>
           <div className="text-center space-y-1"><div className="text-[8px] text-zinc-600 uppercase tracking-widest font-mono">Rating</div><div className="text-2xl font-black font-mono text-white">{music.rating}</div></div>
           <button onClick={onClose} className="w-full mt-4 py-2 bg-zinc-800 hover:bg-red-900 text-zinc-400 hover:text-white transition-all text-[8px] font-mono font-bold uppercase rounded">Return</button>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById('tv-modal-root') || document.body
  );
};

// 👤 角色详情：高集成度实体工卡/证件
const CharacterFolder: React.FC<{ char: Character; onClose: () => void }> = ({ char, onClose }) => {
  // 生成固定的证件号
  const licenseNo = `ID-${char.source.substring(0, 3).toUpperCase()}-${char.id.padStart(4, '0')}`;

  return createPortal(
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center p-4 pointer-events-auto font-mono">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* 卡片主体 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: 20 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative z-10 w-full max-w-xl bg-[#c5c9d1] text-zinc-900 shadow-2xl overflow-hidden flex flex-col border-[1px] border-white/20"
        style={{
          aspectRatio: '1.58 / 1', // 模拟标准 ID 卡比例
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 80%),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")
          `,
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 100px rgba(255,255,255,0.2)'
        }}
      >
        {/* 顶部彩色装饰条 */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-zinc-800 to-red-600"></div>

        <div className="flex-1 p-4 md:p-6 flex flex-col gap-4">
          {/* 抬头区 */}
          <div className="flex justify-between items-start border-b border-zinc-400 pb-2">
            <div className="flex flex-col">
              <span className="text-[14px] font-black tracking-tighter text-zinc-800">DOU ARCHIVE PERMIT</span>
              <span className="text-[7px] text-zinc-500 uppercase">Personal Digital Identity / Terminal v6.0</span>
            </div>
            <div className="text-right">
              <span className="text-[12px] font-mono font-bold text-red-600 italic">CLASS A</span>
            </div>
          </div>

          <div className="flex gap-6 flex-1">
            {/* 左侧：照片与生物识别 */}
            <div className="w-32 md:w-40 flex flex-col gap-3 shrink-0">
              {/* 照片 */}
              <div className="aspect-[3/4] bg-white p-1 shadow-md border border-zinc-300">
                <img src={char.avatar} className="w-full h-full object-cover grayscale contrast-110" />
              </div>
              {/* 模拟指纹/芯片 */}
              <div className="flex items-center gap-2 px-2 py-1 bg-black/5 border border-zinc-300 rounded-sm">
                 <div className="w-6 h-6 opacity-40">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.96.46 5.57 1.41.24.13.33.44.19.68-.07.12-.19.18-.31.18zM4.83 8.11c-.11 0-.21-.04-.3-.11-.21-.18-.24-.49-.06-.7 1.77-2.07 4.13-3.21 6.66-3.21 2.51 0 4.88 1.14 6.64 3.21.18.21.15.52-.06.7-.21.18-.52.15-.7-.06-1.57-1.84-3.66-2.85-5.88-2.85-2.24 0-4.32 1.01-5.89 2.85-.11.14-.26.21-.41.21z"/></svg>
                 </div>
                 <span className="text-[7px] text-zinc-500 leading-none font-bold">BIO-DATA<br/>VERIFIED</span>
              </div>
            </div>

            {/* 右侧：高度密集的信息字段 */}
            <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-zinc-800">
              <div className="col-span-2 border-b border-zinc-300 pb-1 mb-1">
                <label className="text-[7px] text-zinc-500 block uppercase">Full Name</label>
                <span className="text-lg font-black tracking-tight">{char.name}</span>
              </div>
              
              <div className="border-b border-zinc-300">
                <label className="text-[7px] text-zinc-500 block uppercase">Permit No.</label>
                <span className="text-[10px] font-bold">{licenseNo}</span>
              </div>

              <div className="border-b border-zinc-300">
                <label className="text-[7px] text-zinc-500 block uppercase">Subject Origin</label>
                <span className="text-[10px] font-bold truncate block">{char.source}</span>
              </div>

              <div className="border-b border-zinc-300">
                <label className="text-[7px] text-zinc-500 block uppercase">Category / MBTI</label>
                <span className="text-[10px] font-bold text-blue-800">{char.mbti || 'UNKNOWN'}</span>
              </div>

              <div className="border-b border-zinc-300">
                <label className="text-[6px] text-zinc-500 block uppercase">Birth Year</label>
                <span className="text-[9px] font-bold">{char.birthYear || 'N/A'}</span>
              </div>

              <div className="col-span-2 pt-1">
                <label className="text-[7px] text-zinc-500 block uppercase">Remarks / Profile</label>
                <p className="text-[10px] leading-tight font-serif italic text-zinc-600 line-clamp-3">“{char.desc}”</p>
              </div>

              {/* 底部条形码和印章 */}
              <div className="col-span-2 mt-auto flex items-end justify-between">
                <div className="flex flex-col">
                   <div className="h-6 w-32 bg-[url('https://www.transparenttextures.com/patterns/barcode.png')] opacity-30 grayscale invert"></div>
                   <span className="text-[6px] text-zinc-400 mt-1">DOU_TERMINAL_SYSTEM_6.0_BETA</span>
                </div>
                <div className="w-10 h-10 border-2 border-red-600/30 rounded-full flex items-center justify-center rotate-12">
                   <span className="text-[6px] text-red-600/40 font-black text-center leading-none">ARCHIVE<br/>CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部关闭区域 */}
        <button 
          onClick={onClose}
          className="h-8 bg-zinc-800 text-zinc-400 text-[8px] tracking-[0.3em] font-bold hover:bg-red-900 hover:text-white transition-all uppercase"
        >
          - Click to Return Permit -
        </button>
      </motion.div>
    </motion.div>,
    document.getElementById('tv-modal-root') || document.body
  );
};


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

      <div className={`space-y-12 pb-32 transition-all duration-500 ${selectedMovie || selectedBook || selectedMusic || selectedChar || showTVWall ? 'blur-md pointer-events-none' : ''}`}>
        
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-red-600"></span>
            <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase">Archive / 档案馆</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black serif leading-none tracking-tighter text-white uppercase">Archives.</h2>
        </div>

        {/* 🎬 影视板块 (光盘堆叠 + CD盒) */}
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <h3 className="text-2xl font-mono font-bold text-zinc-500 tracking-tighter">/ CINEMA_DB</h3>
            <button onClick={() => setShowTVWall(true)} className="flex items-center gap-2 px-3 py-1 border border-green-900/50 rounded text-green-600 hover:bg-green-900 hover:text-white transition-all">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-mono uppercase font-bold tracking-widest">TV Wall Mode</span>
            </button>
          </div>

          <div className="space-y-10">
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
        <section className="space-y-6">
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
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-4"><h3 className="text-2xl font-mono font-bold text-zinc-500 tracking-tighter">/ AUDIO_VINYLS</h3></div>
          <div className="flex overflow-x-auto pb-12 pt-4 px-12 custom-scrollbar">
             {sortedMusic.map((mu, i) => (
               <VinylStack key={mu.id} music={mu} index={i} onClick={() => setSelectedMusic(mu)} />
             ))}
          </div>
        </section>

        {/* 👤 角色板块 */}
        <section className="space-y-6 pt-8 border-t border-white/5">
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