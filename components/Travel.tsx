import React, { useState, useEffect, useMemo } from 'react';
import { TravelSpot } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TRAVEL } from '../travelData';

// --- 1. 辅助组件：解密文字特效 (保持不变) ---
const DecryptedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      
      iterations += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <h2 className={className}>{displayText}</h2>;
};

// --- 2. 辅助组件：详情弹窗 (保持不变) ---
const ExpeditionDetails: React.FC<{ spot: TravelSpot; onClose: () => void }> = ({ spot, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl p-8 md:p-20 overflow-y-auto"
  >
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="px-3 py-1 bg-red-600 inline-block text-[10px] text-white mono uppercase tracking-widest">Confirmed Location</div>
          <h1 className="text-5xl md:text-7xl font-black serif text-white tracking-tighter">{spot.city}</h1>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10">
        <img src={spot.images[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
        <div className="md:col-span-2 space-y-8">
           <h3 className="text-red-600 mono text-xs uppercase tracking-[0.5em] font-bold">Field Notes / 现场手记</h3>
           <p className="text-zinc-300 text-2xl leading-relaxed serif italic font-light">
             {spot.description} 这里的空气中弥漫着某种数字时代之前才有的质感。逻辑在这里停滞，唯有直觉在发芽。
           </p>
        </div>
        <div className="space-y-8">
           <div className="space-y-4">
             <div className="text-zinc-600 mono text-[9px] uppercase tracking-widest">Coordinates</div>
             <div className="text-white mono text-sm">{spot.coordinate}</div>
           </div>
           <div className="space-y-4">
             <div className="text-zinc-600 mono text-[9px] uppercase tracking-widest">Exploration Date</div>
             <div className="text-white mono text-sm">{spot.date}</div>
           </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 3. 新增组件：世界地图视图 ---
const WorldMapView: React.FC<{ activeIndex: number; onSelect: (idx: number) => void }> = ({ activeIndex, onSelect }) => {
  // 极简世界地图路径 (Low Poly World Map)
  const WORLD_PATH = "M765 245L763 249L758 247L758 250L750 252L747 259L754 266L750 274L741 270L736 266L728 269L725 264L716 263L714 260L708 261L708 269L713 273L707 277L709 283L705 289L696 288L693 293L689 292L686 286L686 279L678 276L677 266L666 262L658 255L664 250L663 244L669 240L674 242L683 238L680 231L673 231L668 227L656 226L654 220L645 220L641 214L635 215L633 222L623 218L616 222L612 216L604 218L599 214L594 216L591 212L585 215L580 213L575 216L570 215L566 218L564 225L570 232L572 238L564 242L560 252L564 258L559 262L559 269L554 269L551 274L545 272L538 276L535 282L529 280L523 283L518 280L515 286L509 284L507 289L502 288L495 294L493 301L485 301L480 307L474 306L470 312L463 311L458 315L452 313L446 317L440 315L435 321L429 319L426 313L420 315L416 310L411 312L409 308L402 310L399 303L391 303L389 297L380 297L375 292L367 292L363 287L357 288L354 282L348 282L345 275L336 273L334 268L326 268L323 261L314 260L311 254L303 255L300 249L293 251L290 245L282 248L279 243L273 244L271 251L263 252L260 259L254 258L251 264L245 264L241 272L235 271L232 277L226 275L222 281L215 281L213 274L208 275L202 271L194 274L190 269L184 270L180 264L173 264L169 259L160 261L156 254L147 257L142 250L135 250L131 243L123 245L118 239L110 242L108 234L101 237L99 229L92 232L88 227L81 228L78 220L70 221L66 215L60 216L56 209L49 211L45 204L38 206L36 200L29 201L25 194L19 194L16 186L10 188L7 181L1 183L1 135L7 135L10 128L19 129L22 123L30 125L32 116L40 119L44 111L51 113L56 106L64 107L66 100L75 101L79 93L87 95L90 87L99 87L101 79L110 81L113 74L121 76L125 69L133 70L137 62L145 64L148 57L157 58L160 51L168 53L171 45L180 47L183 40L193 42L196 35L205 35L208 28L217 29L220 22L229 23L234 16L242 17L244 11L253 11L257 5L265 6L267 1L671 1L673 7L680 6L683 14L691 14L694 20L703 19L706 25L716 23L719 30L727 30L731 35L740 33L744 40L752 40L756 46L764 45L768 52L777 50L779 56L787 56L790 62L799 61L802 68L811 68L815 74L822 73L826 79L835 78L837 84L845 83L850 89L857 88L862 94L868 94L873 99L881 99L885 105L892 104L896 110L904 110L909 115L917 115L922 120L929 120L934 125L941 125L946 130L954 130L959 135L967 136L971 140L978 140L982 145L990 146L993 151L1000 151L1000 181L992 184L989 179L981 180L978 174L970 176L965 170L957 172L954 165L945 167L940 162L932 163L928 158L919 159L914 153L907 155L903 148L895 150L891 143L884 145L880 138L872 140L868 135L860 135L855 129L848 131L843 125L835 126L832 120L824 122L819 116L811 116L808 111L800 112L795 106L787 107L784 102L775 102L771 97L763 98L758 92L749 93L745 87L736 88L732 82L723 83L720 77L712 78L708 72L700 73L695 67L687 68L684 62L674 62L670 57L661 57L657 52L649 53L646 47L637 47L632 42L624 43L619 37L611 38L607 32L599 33L594 27L586 28L583 22L575 22L570 17L561 17L557 11L549 12L545 7L536 7L533 2L524 2L520 7L511 7L508 12L499 12L495 17L487 17L483 23L475 22L470 28L462 28L458 33L450 33L446 38L438 38L434 43L427 43L421 47L413 47L408 53L400 52L397 57L388 57L384 62L375 62L372 67L363 67L359 73L351 72L348 77L339 77L335 83L327 82L323 87L315 88L311 92L303 92L299 97L291 97L288 103L279 102L275 108L266 107L263 113L254 112L251 118L242 117L239 123L230 123L226 127L218 127L215 133L206 132L203 138L194 137L190 142L181 142L178 148L169 148L166 153L157 153L154 158L145 158L142 163L133 163L129 168L121 168L118 173L109 173L105 178L97 178L93 183L85 183L82 188L73 189L68 194L60 193L57 199L49 198L44 204L35 204L32 209L24 209L20 214L12 214L8 219L1 219L1 289L6 289L10 295L18 294L22 301L30 300L35 306L42 305L45 310L52 309L56 315L64 314L67 320L75 320L79 324L87 323L92 329L100 329L104 334L112 334L116 339L124 338L129 344L136 343L140 348L149 348L153 353L162 353L164 358L173 358L176 362L184 362L188 367L196 366L200 372L208 371L212 377L220 376L223 381L232 380L236 385L244 385L247 390L256 390L260 395L268 394L271 399L281 398L281 394L288 393L293 397L300 395L304 389L311 390L315 385L323 385L326 381L334 380L337 375L345 375L349 370L356 369L360 365L368 365L372 360L379 359L382 354L391 354L395 350L402 349L406 344L414 345L418 339L426 339L429 335L437 335L441 330L448 330L452 324L460 325L463 320L471 319L475 315L482 315L486 310L494 309L497 304L505 305L509 300L517 299L520 294L528 295L532 290L539 289L543 284L551 285L555 279L563 279L566 273L574 274L577 268L585 268L589 263L597 263L601 258L609 258L612 253L620 252L623 247L631 248L634 242L642 243L646 238L654 237L658 232L665 233L669 228L677 227L680 222L688 223L692 218L700 217L703 212L711 213L715 208L723 207L726 202L734 202L737 197L746 198L750 192L758 192L762 187L770 187L772 182L780 182L784 176L792 177L795 171L803 171L807 166L815 167L819 161L827 162L830 156L838 156L841 151L850 151L854 146L862 146L866 141L874 142L877 136L885 136L889 131L897 131L900 126L909 126L913 121L920 121L923 116L932 115L936 110L944 111L947 105L955 106L958 100L967 100L971 94L979 96L983 89L991 89L995 85L1000 85L1000 119L995 119L990 124L983 124L979 129L971 129L967 134L958 134L953 139L946 139L941 145L933 144L929 150L920 150L917 154L909 154L905 160L898 160L894 165L886 164L882 170L874 169L870 175L862 175L859 180L851 180L847 185L839 185L835 190L827 190L824 195L815 195L812 201L804 200L800 206L792 206L789 211L781 210L777 216L770 216L766 220L758 221L754 226L746 226L743 231L735 231L731 237L723 236L719 242L712 242L708 247L700 247L696 252L689 252L685 258L677 257L673 263L665 262L662 268L654 268L651 273L643 273L639 278L631 278L628 283L620 284L616 288L609 288L604 294L597 294L593 299L585 299L581 305L573 304L570 309L562 309L558 315L550 315L546 320L539 319L535 325L527 325L523 330L516 330L511 336L504 335L500 340L493 340L488 346L481 345L477 351L469 350L465 356L458 355L454 361L446 361L442 366L435 366L431 372L423 371L419 377L411 376L408 381L400 382L397 387L389 387L385 392L377 391L373 397L366 396L362 402L354 402L351 407L343 407L339 412L331 412L327 417L319 417L316 422L308 421L305 427L297 427L293 432L285 431L281 437L274 436L270 442L262 441L258 447L251 446L247 452L240 452L235 457L228 457L224 463L216 462L212 468L205 467L200 473L193 472L189 478L182 477L178 483L170 482L167 488L158 487L154 492L147 493L144 498L135 497L131 500L893 500L890 496L882 497L878 491L870 492L867 486L859 487L855 481L847 482L843 476L836 477L832 471L824 471L820 466L813 466L809 460L801 461L797 455L790 455L786 450L778 450L775 445L767 444L763 439L755 440L752 434L743 434L740 429L732 429L728 423L721 424L716 418L709 419L705 413L698 414L694 408L686 409L682 403L675 403L671 398L663 398L659 393L652 393L647 388L640 388L636 383L629 383L625 377L617 378L614 372L606 373L602 367L595 367L591 362L583 362L579 357L572 357L568 351L560 352L556 346L549 347L545 341L538 341L534 336L526 336L522 331L514 331L511 326L503 325L500 320L492 320L488 315L480 315L477 310L469 310L465 304L458 305L454 299L446 300L443 294L435 295L431 289L423 290L419 284L412 284L408 279L401 279L397 274L389 274L385 269L377 269L374 264L366 264L362 258L355 258L351 253L344 253L340 248L332 248L328 243L321 243L317 237L309 237L305 232L298 232L294 227L287 227L283 221L275 221L272 216L264 216L260 211L253 211L249 205L241 206L237 200L230 200L226 195L219 195L215 190L207 190L203 184L196 185L192 179L184 179L181 174L173 174L169 169L162 169L158 164L151 163L146 158L139 158L135 153L128 153L124 147L116 148L113 142L105 142L101 137L94 137L90 131L83 131L79 126L71 126L67 121L60 121L56 116L48 116L44 110L37 110L33 105L26 105L22 99L14 100L10 94L3 95L3 219L8 219L12 214L20 214L24 209L32 209L35 204L44 204L49 198L57 199L60 193L68 194L73 189L82 188L85 183L93 183L97 178L105 178L109 173L118 173L121 168L129 168L133 163L142 163L145 158L154 158L157 153L166 153L169 148L178 148L181 142L190 142L194 137L203 138L206 132L215 133L218 127L226 127L230 123L239 123L242 117L251 118L254 112L263 113L266 107L275 108L279 102L288 103L291 97L299 97L303 92L311 92L315 88L323 87L327 82L335 83L339 77L348 77L351 72L359 73L363 67L372 67L375 62L384 62L388 57L397 57L400 52L408 53L413 47L421 47L427 43L434 43L438 38L446 38L450 33L458 33L462 28L470 28L475 22L483 23L487 17L495 17L499 12L508 12L511 7L520 7L524 2L533 2L536 7L545 7L549 12L557 11L561 17L570 17L575 22L583 22L586 28L594 27L599 33L607 32L611 38L619 37L624 43L632 42L637 47L646 47L649 53L657 52L661 57L670 57L674 62L684 62L687 68L695 67L700 73L708 72L712 78L720 77L723 83L732 82L736 88L745 87L749 93L758 92L763 98L771 97L775 102L784 102L787 107L795 106L800 112L808 111L811 116L819 116L824 122L832 120L835 126L843 125L848 131L855 129L860 135L868 135L872 140L880 138L884 145L891 143L895 150L903 148L907 155L914 153L919 159L928 158L932 163L940 162L945 167L954 165L957 172L965 170L970 176L978 174L981 180L989 179L992 184L1000 181L1000 216L996 216L991 221L984 220L979 225L972 225L967 230L959 230L955 235L947 235L943 239L935 239L931 244L923 244L919 249L911 248L907 253L899 253L895 258L887 258L883 263L875 262L871 267L863 267L859 272L851 271L847 277L839 276L835 281L827 281L823 286L816 285L811 291L804 290L799 295L792 295L788 300L780 299L776 304L768 304L764 309L756 308L752 313L744 313L740 318L732 317L728 322L720 322L716 327L708 326L704 332L696 331L692 336L684 336L680 341L672 340L668 345L660 345L656 350L648 349L644 354L636 354L632 359L624 358L620 363L612 363L608 368L600 367L596 373L588 372L584 377L576 377L572 382L564 381L560 387L552 386L548 391L540 391L536 396L528 395L524 400L516 400L512 405L504 404L500 409L492 409L488 414L480 413L476 418L468 418L464 423L456 422L452 428L444 427L440 432L432 432L428 437L420 436L416 441L408 441L404 446L396 445L392 450L384 450L380 455L372 454L368 459L360 459L356 464L348 463L344 468L336 468L332 473L324 472L320 477L312 477L308 482L300 481L296 486L288 486L284 491L276 490L272 495L264 495L260 500L765 245Z";

  // 坐标映射函数 (Equirectangular Projection)
  const project = (lat: number, lng: number) => {
    // 假设 SVG 宽 1000, 高 500
    // 经度 -180~180 -> 0~1000
    const x = (lng + 180) * (1000 / 360);
    // 纬度 90~-90 -> 0~500
    const y = (90 - lat) * (500 / 180);
    return { x, y };
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-black/50 rounded-3xl overflow-hidden border border-white/5">
      {/* 极简 SVG 地图 */}
      <svg viewBox="0 0 1000 500" className="w-[90%] h-[90%] opacity-80">
        {/* 世界地图轮廓 */}
        <path d={WORLD_PATH} fill="#1a1a1a" stroke="#222" strokeWidth="1" />
        
        {/* 绘制轨迹线 */}
        <path 
          d={`M ${MOCK_TRAVEL.map(t => {
            const { x, y } = project(t.lat, t.lng);
            return `${x},${y}`;
          }).join(' L ')}`} 
          fill="none" 
          stroke="rgba(220, 38, 38, 0.4)" 
          strokeWidth="1" 
          strokeDasharray="4 4"
        />

        {/* 渲染地点 */}
        {MOCK_TRAVEL.map((spot, idx) => {
          const { x, y } = project(spot.lat, spot.lng);
          const isActive = idx === activeIndex;
          return (
             <g key={spot.id} onClick={() => onSelect(idx)} className="cursor-pointer group">
               {/* 脉冲效果 */}
               <circle cx={x} cy={y} r={isActive ? "8" : "0"} className="fill-red-600/30 animate-ping origin-center" />
               <circle cx={x} cy={y} r={isActive ? "16" : "0"} className="fill-red-600/10 animate-pulse origin-center" />
               
               {/* 核心点 */}
               <circle 
                 cx={x} cy={y} 
                 r={isActive ? "3" : "2"} 
                 className={`${isActive ? 'fill-red-500' : 'fill-white/60'} transition-all duration-300 group-hover:fill-white`} 
               />
               
               {/* 悬浮/激活显示名称 */}
               {(isActive || undefined) && (
                 <text 
                   x={x} y={y - 10} 
                   textAnchor="middle" 
                   className="fill-white text-[10px] font-mono uppercase tracking-widest opacity-80"
                 >
                   {spot.city}
                 </text>
               )}
             </g>
          );
        })}
      </svg>
      
      <div className="absolute bottom-6 right-6 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
        Global Coverage: {MOCK_TRAVEL.length} Nodes Active
      </div>
    </div>
  );
};

// --- 4. 主组件 ---
const Travel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  // 🔥 新增：视图切换状态 ('list' | 'map')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  const activeSpot = MOCK_TRAVEL[activeIndex];

  return (
    <div className="relative -mt-12 -mx-6 md:-mx-16 h-[calc(100vh-6rem)] overflow-hidden">
      <AnimatePresence>
        {showDetails && <ExpeditionDetails spot={activeSpot} onClose={() => setShowDetails(false)} />}
      </AnimatePresence>

      {/* 背景图 (仅在 LIST 模式下显示) */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' && (
          <motion.div
            key={activeSpot.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img src={activeSpot.images[0]} className="w-full h-full object-cover grayscale-[0.5] brightness-[0.4]" />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 噪点纹理 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      {/* 主内容区域 */}
      <div className="relative h-full z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pb-20 md:pb-0">
        
        {/* 顶部工具栏：视图切换 */}
        <div className="absolute top-8 right-6 md:right-12 z-50 flex gap-2">
           <button 
             onClick={() => setViewMode('list')} 
             className={`px-3 py-1 rounded border text-[10px] font-mono uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}
           >
             List View
           </button>
           <button 
             onClick={() => setViewMode('map')} 
             className={`px-3 py-1 rounded border text-[10px] font-mono uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}
           >
             Global Map
           </button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            // === 列表模式 (原有布局) ===
            <motion.div 
              key="list-view"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end md:items-center h-full pb-20 md:pb-0 justify-end flex-col md:flex-row"
            >
              <div className="lg:col-span-6 space-y-6 md:space-y-10 mt-auto md:mt-0">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={`info-${activeSpot.id}`}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="px-2 md:px-3 py-1 bg-red-600 text-white text-[8px] md:text-[9px] font-mono tracking-widest uppercase">Trajectory 0{activeIndex + 1}</span>
                    <span className="text-zinc-500 font-mono text-[8px] md:text-[10px] tracking-widest uppercase truncate max-w-[150px]">{activeSpot.coordinate}</span>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <DecryptedText 
                      text={activeSpot.city + "."} 
                      className="text-5xl md:text-7xl font-black serif leading-none text-white tracking-tighter"
                    />
                    <div className="text-red-500 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase pl-1 md:pl-2">In {activeSpot.date}</div>
                  </div>
                  <p className="text-zinc-300 text-sm md:text-xl font-light leading-loose serif italic max-w-xl border-l-2 border-red-600/30 pl-4 md:pl-8 line-clamp-3 md:line-clamp-none">
                    “{activeSpot.description}”
                  </p>
                </motion.div>
                <div className="pt-4 hidden md:block">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white"
                  >
                    <span className="relative z-10 text-[10px] text-white tracking-[0.4em] uppercase font-bold">Expedition Details</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <style>{`.group:hover span { color: black; }`}</style>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-start md:justify-end items-center overflow-x-auto pb-4 custom-scrollbar lg:overflow-visible w-full">
                <div className="flex gap-4 p-2">
                  {MOCK_TRAVEL.map((spot, idx) => (
                    <motion.div
                      key={spot.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative cursor-pointer transition-all duration-700 ease-out shrink-0 overflow-hidden rounded-2xl md:rounded-3xl border-2 ${
                        idx === activeIndex
                        ? 'w-32 h-44 md:w-44 md:h-64 border-white shadow-[0_20px_50px_rgba(220,38,38,0.3)] z-20'
                        : 'w-16 h-24 md:w-24 md:h-48 border-transparent opacity-40 hover:opacity-80 scale-90 grayscale'
                      }`}
                    >
                      <img src={spot.images[0]} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                      <div className="absolute bottom-2 md:bottom-6 left-2 md:left-6 right-2 md:right-6">
                        <div className="text-[6px] md:text-[8px] text-white/60 font-mono uppercase tracking-widest mb-1">{spot.date}</div>
                        <div className="text-white font-bold text-[8px] md:text-xs truncate uppercase tracking-tighter">{spot.city}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            // === 地图模式 ===
            <motion.div 
              key="map-view"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-full pt-20 pb-20"
            >
               <WorldMapView activeIndex={activeIndex} onSelect={setActiveIndex} />
               
               {/* 地图模式下的底部信息 */}
               <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
                  <div className="inline-block bg-black/80 backdrop-blur px-6 py-2 rounded-full border border-white/10">
                     <span className="text-white font-serif italic text-lg mr-2">{activeSpot.city}</span>
                     <span className="text-zinc-500 font-mono text-xs">{activeSpot.date}</span>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部导航 (仅在 List 模式显示，或者你想在 Map 模式也显示) */}
      {viewMode === 'list' && (
        <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 flex items-center gap-8 md:gap-16 z-20">
           <div className="flex gap-2 md:gap-4">
              <button onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : MOCK_TRAVEL.length - 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={() => setActiveIndex(prev => (prev < MOCK_TRAVEL.length - 1 ? prev + 1 : 0))} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
           </div>
           <div className="font-mono text-[8px] md:text-[10px] tracking-widest uppercase text-zinc-500">
             Coord <span className="text-white">{activeIndex + 1}</span> / {MOCK_TRAVEL.length}
           </div>
        </div>
      )}
    </div>
  );
};

export default Travel;