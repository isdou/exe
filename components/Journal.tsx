import React, { useState, useMemo } from 'react';
import { MOCK_JOURNAL } from '../journalData';
import { motion, AnimatePresence } from 'framer-motion';

const Journal: React.FC = () => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const historyEntries = useMemo(() => {
    return MOCK_JOURNAL.filter(
      (entry) => entry.month === selectedMonth && entry.day === selectedDay
    ).sort((a, b) => a.year - b.year);
  }, [selectedMonth, selectedDay]);

  const daysInMonth = new Date(2025, selectedMonth, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="h-full flex flex-col md:flex-row gap-8 pb-24">

      {/* 左侧：日历导航 */}
      <div className="w-full md:w-64 shrink-0 space-y-8 md:border-r border-white/5 md:pr-8">
        <div className="space-y-2">
          <div className="text-red-600 font-mono text-[10px] tracking-[0.4em] uppercase">Temporal Locator</div>
          <h2 className="text-4xl font-black serif text-white">
            {selectedMonth.toString().padStart(2, '0')} / {selectedDay.toString().padStart(2, '0')}
          </h2>
        </div>

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

      {/* 右侧：记忆流 */}
      <div className="flex-1 max-w-3xl overflow-y-auto custom-scrollbar pr-4">
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {historyEntries.length > 0 ? (
              historyEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative pl-8 border-l border-white/10 group"
                >
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-zinc-900 border border-zinc-600 rounded-full group-hover:bg-zinc-500 transition-colors"></div>

                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-3xl font-bold serif text-zinc-500 group-hover:text-white transition-colors">{entry.year}</span>
                    <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">{entry.mood}</span>
                  </div>

                  <div className="text-lg text-zinc-300 font-light serif leading-loose whitespace-pre-wrap">
                    {entry.content}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-24 text-center">
                <div className="text-zinc-700 font-mono text-xs uppercase tracking-widest mb-2">No data retrieved</div>
                <div className="text-zinc-800 serif italic">这一天的记忆尚未归档。</div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Journal;