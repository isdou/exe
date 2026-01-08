import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RECIPES_DATA } from '../recipesData';
import { Recipe } from '../types';

/**
 * 1. 邮戳印章组件 (RecipeStamp)
 * 采用彩色缩略图，缩小比例以增强“盖章”感
 */
const RecipeStamp: React.FC<{ recipe: Recipe; onClick: () => void }> = ({ recipe, onClick }) => (
  <motion.div 
    whileHover={{ scale: 1.05, rotate: -2 }}
    className="flex flex-col items-center gap-1 cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
      <div 
        className="absolute inset-0 border-[1.5px] border-red-800/20 rotate-12 group-hover:rotate-0 transition-transform" 
        style={{ borderRadius: '48% 52% 50% 50% / 50% 48% 52% 50%' }}
      />
      <div className="absolute inset-1 border border-dashed border-red-800/10 rounded-full" />
      <div className="flex flex-col items-center justify-center z-10">
        <div className="w-5 h-5 rounded-full overflow-hidden shadow-sm border-[1px] border-red-800/10 mb-0.5 bg-white">
           <img src={recipe.image} className="w-full h-full object-cover" alt="" />
        </div>
      </div>
    </div>
    <span className="text-[7px] font-bold text-zinc-600 text-center font-serif leading-tight group-hover:text-red-900 transition-colors line-clamp-1 max-w-full px-1">
      {recipe.name}
    </span>
  </motion.div>
);

/**
 * 2. 菜品详情档案 (RecipeDossier)
 */
const RecipeDossier: React.FC<{ recipe: Recipe; onClose: () => void }> = ({ recipe, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.95 }}
    className="absolute inset-0 z-[800] flex items-center justify-center p-4"
  >
    <div className="absolute inset-0 bg-zinc-900/10 backdrop-blur-[1px]" onClick={onClose}></div>
    <div className="relative z-10 w-full max-w-[220px] bg-white shadow-2xl rounded-sm border border-zinc-200 overflow-hidden text-left">
      <div className="h-1 bg-red-800" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xs font-black serif text-zinc-900 leading-tight">{recipe.name}</h3>
          <span className="text-[8px] font-mono text-red-700 font-bold">★{recipe.rating}</span>
        </div>
        <p className="text-[9px] text-zinc-500 leading-relaxed font-serif italic border-l border-zinc-200 pl-2">
          {recipe.description}
        </p>
        <button 
          onClick={onClose} 
          className="w-full py-1 bg-zinc-900 text-white text-[7px] font-mono uppercase tracking-widest hover:bg-red-800 transition-colors"
        >
          BACK
        </button>
      </div>
    </div>
  </motion.div>
);

/**
 * 3. 拟物化菜谱护照主组件 (RecipePassport)
 */
const RecipePassport: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const countries = useMemo(() => {
    const list = Array.from(new Set(RECIPES_DATA.map(r => r.country)));
    return list.length > 0 ? list : ["GLOBAL"];
  }, []);

  const [activeCountry, setActiveCountry] = useState(countries[0]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = useMemo(() => 
    RECIPES_DATA.filter(r => r.country === activeCountry),
    [activeCountry]
  );

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      
      {/* 核心容器：固定高度，固定比例 */}
      <div className="relative flex items-stretch h-[320px] md:h-[350px] w-full max-w-2xl">
        
        {/* 护照本体 */}
        <motion.div 
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          className="flex-1 bg-[#f4f1ea] shadow-[0_30px_90px_rgba(0,0,0,0.5)] flex rounded-r-sm overflow-hidden border-l-[12px] border-zinc-950 relative"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        >
          {/* --- 左页：极简垂直个人页 --- */}
          <div className="w-[35%] bg-[#ede9dd] border-r border-dashed border-zinc-300 p-6 flex flex-col items-center shrink-0 relative">
            <div className="relative z-10 flex flex-col items-center w-full h-full">
              <div className="text-[8px] font-mono font-black text-zinc-400 mb-6 tracking-[0.2em] border-b border-zinc-800/10 w-full text-center pb-1">PASSPORT_INFO</div>
              
              {/* 证件照 */}
              <div className="relative mb-6">
                <div className="w-20 h-28 bg-white border border-zinc-300 p-0.5 shadow-sm">
                  <img src="images/avatar.jpg" className="w-full h-full object-cover" alt="Holder" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border border-red-800/20 rounded-full flex items-center justify-center text-[5px] font-mono text-red-800/30 rotate-12 bg-white/10 backdrop-blur-[0.5px]">
                  ARCHIVE
                </div>
              </div>

              {/* 极简姓名 */}
              <div className="w-full space-y-2 font-mono text-center">
                 <div className="border-b border-zinc-800/10 pb-1">
                    <span className="block text-[10px] font-black text-zinc-900 tracking-tighter uppercase">DOUDOU_WANDOU</span>
                 </div>
                 <span className="text-[6px] text-zinc-400 tracking-widest uppercase">Operator_01</span>
              </div>

              {/* 底部签名 */}
              <div className="mt-auto w-full pt-2">
                <div className="font-serif italic text-xs text-zinc-700/60 pl-1 tracking-tight">
                  Doudou.wandou
                </div>
                <div className="h-[1px] bg-zinc-800/10 w-full mt-0.5"></div>
              </div>
            </div>
          </div>

          {/* --- 右页：带大水印的签证页 --- */}
          <div className="flex-1 bg-[#f4f1ea] p-6 relative flex flex-col overflow-hidden">
            
            {/* 核心细节：巨大的国家缩写水印 (基于你提供的 UI 逻辑) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] md:text-[22rem] font-black text-zinc-900/[0.03] pointer-events-none select-none z-0 tracking-tighter italic">
              {activeCountry.substring(0, 2).toUpperCase()}
            </div>
            
            {/* 中间折线阴影 */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-10"></div>
            
            <div className="relative z-10 flex justify-between items-center mb-4 border-b border-zinc-200/60 pb-1">
              <span className="text-[9px] font-mono font-black text-zinc-400 tracking-[0.2em] uppercase">VISA_SECTION // {activeCountry}</span>
              <span className="text-[8px] font-mono text-zinc-300">REC: {filteredRecipes.length}</span>
            </div>

            {/* 印章网格区域 */}
            <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar grid grid-cols-4 md:grid-cols-5 gap-y-8 gap-x-2 content-start">
              <AnimatePresence mode="popLayout">
                {filteredRecipes.map(recipe => (
                  <RecipeStamp key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
                ))}
              </AnimatePresence>
              
              {/* 占位符 */}
              {[...Array(Math.max(0, 10 - filteredRecipes.length))].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1 opacity-[0.02] pointer-events-none">
                  <div className="w-10 h-10 rounded-full border border-dashed border-zinc-500 flex items-center justify-center">
                     <span className="text-[4px] font-mono text-zinc-400 rotate-45">VOID</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-2 flex justify-center border-t border-zinc-200/60 pt-1">
               <span className="text-[6px] font-mono text-zinc-300 tracking-[0.5em] uppercase">Authorized Taste Archive</span>
            </div>

            <AnimatePresence>
              {selectedRecipe && (
                <RecipeDossier recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* --- 侧边国家索引标签栏 --- */}
        <div className="w-8 shrink-0 flex flex-col gap-0.5 items-start mt-6">
           {countries.map((country) => (
             <button
              key={country}
              onClick={() => setActiveCountry(country)}
              className={`
                px-1.5 py-3 rounded-r-sm text-[7px] font-mono font-black tracking-tighter uppercase transition-all duration-300
                ${activeCountry === country 
                  ? 'bg-[#ede9dd] text-red-900 shadow-md w-full' 
                  : 'bg-zinc-800 text-zinc-600 hover:text-zinc-400 w-6 opacity-60'}
              `}
              style={{ writingMode: 'vertical-rl' }}
             >
               {country}
             </button>
           ))}
           <button 
            onClick={onClose}
            className="mt-4 w-6 h-6 flex items-center justify-center bg-red-900/30 text-white rounded-full hover:bg-red-800 transition-colors text-[10px] ml-0.5 shadow-lg"
           >
             &times;
           </button>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

export default RecipePassport;