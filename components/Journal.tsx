// 文件: isdou_exe/components/Journal.tsx (新建文件)
import React, { useState, useMemo } from 'react';
import { JournalEntry } from '../types';
import { MOCK_JOURNAL } from '../journalData';
import { motion, AnimatePresence } from 'framer-motion';

const Journal: React.FC = () => {
  // 默认选中“今天”
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  // 模拟：今年的输入内容
  const [newEntry, setNewEntry] = useState('');

  // 筛选出“选中日期”的所有历史记录 (按年份排序)
  const historyEntries = useMemo(() => {
    return MOCK_JOURNAL.filter(
      (entry) => entry.month === selectedMonth && entry.day === selectedDay
    ).sort((a, b) => a.year - b.year);
  }, [selectedMonth, selectedDay]);

  // 生成日历数据 (简单的月份天数逻辑)
  const daysInMonth = new Date(2025, selectedMonth, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="h-full flex flex-col md:flex-row gap-8 pb-24">

      {/* 左侧：时间罗盘 (日期选择器) */}
      <div className="w-full md:w-64 shrink-0 space-y-8 md:border-r border-white/5 md:pr-8">
        <div className="space-y-2">
          <div className="text-red-600 font-mono text-[10px] tracking-[0.4em] uppercase">Temporal Locator</div>
          <h2 className="text-4xl font-black serif text-white">
            {selectedMonth.toString().padStart(2, '0')} / {selectedDay.toString().padStart(2, '0')}
          </h2>
        </div>

        {/* 月份选择 */}
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`text-[10px] font-mono py-2 rounded transition-colors ${
                selectedMonth === m ? 'bg-white text-black font-bold' : 'text-zinc-600 hover:text-zinc-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* 日期选择 (滚动区域) */}
        <div className="h-32 md:h-[400px] overflow-y-auto custom-scrollbar border-t border-white/5 pt-4">
          <div className="grid grid-cols-5 md:grid-cols-4 gap-2">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`text-[10px] font-mono py-2 rounded transition-colors ${
                  selectedDay === d ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧：记忆流 (Memory Stream) */}
      <div className="flex-1 max-w-3xl overflow-y-auto custom-scrollbar pr-4">
        <div className="space-y-12">

          {/* 历史记录回顾 */}
          <AnimatePresence mode="popLayout">
            {historyEntries.length > 0 ? (
              historyEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative pl-8 border-l border-white/10 group"
                >
                  {/* 时间节点装饰 */}
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-zinc-900 border border-zinc-600 rounded-full group-hover:bg-zinc-500 transition-colors"></div>

                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-2xl font-bold serif text-zinc-500 group-hover:text-white transition-colors">{entry.year}</span>
                    <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">{entry.mood}</span>
                  </div>

                  <div className="text-lg text-zinc-400 font-light serif leading-loose group-hover:text-zinc-200 transition-colors">
                    {entry.content}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center text-zinc-700 font-mono text-xs uppercase tracking-widest">
                No archived memories found for this coordinate.
              </div>
            )}
          </AnimatePresence>

          {/* 当下写入区 (2026) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative pl-8 border-l-2 border-red-600/50"
          >
             <div className="absolute left-[-6px] top-0 w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>

             <div className="flex items-baseline gap-4 mb-4">
               <span className="text-3xl font-bold serif text-white">2026</span>
               <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest animate-pulse">RECORDING...</span>
             </div>

             <textarea
               value={newEntry}
               onChange={(e) => setNewEntry(e.target.value)}
               placeholder="Write to your future self..."
               className="w-full min-h-[200px] bg-transparent text-xl text-white serif leading-loose placeholder-zinc-700 focus:outline-none resize-none"
               autoFocus
             />

             <div className="flex justify-end pt-4">
               <button className="px-6 py-2 border border-white/10 rounded-full text-[10px] text-zinc-500 hover:text-white hover:border-white/30 transition-all uppercase tracking-widest">
                 Save Entry
               </button>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Journal;