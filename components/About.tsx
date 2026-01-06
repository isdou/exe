import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- 1. 数据配置区 ---

const USER_PROFILE = {
  id: 'DOU.EXE',
  role: 'Product Manager / Observer',
  mbti: 'INTJ',
  version: 'v2.9.0', 
  status: 'OPERATIONAL',
  location: 'Earth / Asia / China',
  avatar: 'images/avatar.jpg', // 
};

const PROTOCOLS = [
  {
    icon: '⚡',
    title: 'Energy Source',
    desc: '系统依赖高浓度咖啡因与独处时间充电。社交活动会快速消耗电量，需长周期冷却。'
  },
  {
    icon: '📡',
    title: 'Communication',
    desc: '偏好异步文字通信。拒绝毫无铺垫的语音通话。收到消息未回通常是在进行后台多线程处理。'
  },
  {
    icon: '🛡️',
    title: 'Core Values',
    desc: '极度厌恶低效与逻辑断层。不仅解决问题，更迷恋于构建能够自动解决问题的系统。'
  },
  {
    icon: '🐛',
    title: 'Known Bugs',
    desc: '在感性决策模块偶尔出现卡顿。'
  }
];

const SKILLS = [
  { name: 'Product Logic', level: 95 },
  { name: 'System Design', level: 85 },
  { name: 'Data Analysis', level: 80 },
  { name: 'UI/UX Sense', level: 75 },
  { name: 'Coding (React/TS)', level: 60 },
  { name: 'Empathy Simulation', level: 40 },
];

const BUILDS = [
  {
    id: 'B01',
    name: 'DOU.EXE',
    type: 'SIDE_QUEST',
    year: '2026',
    desc: '个人精神角落的数字化身。基于 React 构建的反熵增内容管理系统。',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    link: '#'
  },
  {
    id: 'B02',
    name: 'Coffee Log',
    type: 'MOD',
    year: 'Ongoing',
    desc: '一套自研的手冲咖啡风味记录方法论。试图量化味觉这一玄学指标。',
    tech: ['Notion', 'Excel'],
    link: '#'
  }
];

// 🔥 新增：已知故障列表
const ISSUES = [
  {
    id: 'BUG-404',
    title: 'Social_Battery_Low',
    severity: 'High',
    desc: '在多人聚会场景下，电量会在 30 分钟内跌破 10%。',
    repro: '1. 邀请我参加 Party; 2. 闲聊天气。',
    status: 'WON\'T FIX',
    tag: 'Hardware'
  },
  {
    id: 'BUG-500',
    title: 'RBF_Display_Error',
    severity: 'Medium',
    desc: '待机状态下表情管理模块失效，常被误判为“生气”或“高冷”。',
    repro: '观察我发呆的时候。',
    status: 'FEATURE', // 这是特性，不是 Bug
    tag: 'UI/UX'
  },
  {
    id: 'BUG-400',
    title: 'Small_Talk_Error',
    severity: 'Low',
    desc: '无法解析“吃了吗”等低密度信息，可能导致回复延迟。',
    repro: '发送毫无信息量的寒暄。',
    status: 'BY DESIGN',
    tag: 'Kernel'
  },
  {
    id: 'BUG-418',
    title: 'Overthinking_Loop',
    severity: 'Critical',
    desc: '深夜容易陷入哲学思辨的死循环，导致睡眠进程无法启动。',
    repro: '1. 关灯; 2. 躺下; 3. 思考意义。',
    status: 'INVESTIGATING',
    tag: 'Performance'
  }
];

const CONTACTS = [
  { label: 'EMAIL', value: 'iswandou@gmail.com', link: 'mailto:iswandou@gmail.com' },
  { label: '公众号', value: '十点半同学', link: '#' },
];

// --- 2. 辅助组件 ---

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="flex items-end gap-4 border-b border-white/10 pb-2 mb-8 mt-12">
    <h3 className="text-2xl md:text-3xl font-black serif text-white">{title}</h3>
    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">// {subtitle}</span>
  </div>
);

const SkillBar: React.FC<{ name: string; level: number }> = ({ name, level }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400">
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-red-600/80"
      />
    </div>
  </div>
);

// --- 3. 主组件 ---

const About: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto p-4 md:p-12 space-y-12">

        {/* --- Header: ID Card --- */}
        <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-start border-b border-white/10 pb-12">
           <div className="relative group shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 grayscale group-hover:grayscale-0 transition-all duration-500 rounded border border-white/10 overflow-hidden">
                <img src={USER_PROFILE.avatar} className="w-full h-full object-cover" alt="Avatar" />
              </div>
              <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-red-600 text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-lg">
                {USER_PROFILE.status}
              </div>
           </div>

           <div className="space-y-4 flex-1">
              <div>
                <div className="text-red-600 font-mono text-[10px] tracking-[0.4em] uppercase mb-2">Kernel Panic // Info</div>
                <h1 className="text-4xl md:text-6xl font-black serif text-white leading-none tracking-tighter">
                  {USER_PROFILE.id}
                </h1>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                 <div className="flex flex-col gap-1">
                   <span className="text-zinc-700">Class</span>
                   <span className="text-zinc-300 border-l border-red-600 pl-2">{USER_PROFILE.role}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-zinc-700">Model</span>
                   <span className="text-zinc-300 border-l border-red-600 pl-2">{USER_PROFILE.mbti}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-zinc-700">Version</span>
                   <span className="text-zinc-300 border-l border-red-600 pl-2">{USER_PROFILE.version}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-zinc-700">Coordinates</span>
                   <span className="text-zinc-300 border-l border-red-600 pl-2">{USER_PROFILE.location}</span>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Section 1: README (Protocols) --- */}
        <section>
          <SectionHeader title="README.md" subtitle="User Manual" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROTOCOLS.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.05] transition-colors group"
              >
                <div className="text-2xl mb-4 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                <h4 className="text-white font-bold serif mb-2">{item.title}</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed serif italic">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Section 2: Stack & Specs --- */}
        <section>
          <SectionHeader title="SPECS" subtitle="Technical Parameters" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-6">
                <p className="text-zinc-400 text-sm leading-loose serif">
                  系统核心由高强度的逻辑框架驱动。擅长将复杂的混沌信息解构为有序的执行队列。
                  <br/><br/>
                  虽配备了“共情模拟”模块，但在高负载运算时可能会被自动挂起以节省算力。
                </p>
                <div className="p-4 bg-zinc-900 border border-white/10 font-mono text-[10px] text-zinc-500 space-y-1">
                   <div>&gt; INITIALIZING SKILL_TREE...</div>
                   <div className="text-green-500">&gt; SUCCESS. MODULES LOADED.</div>
                </div>
             </div>
             <div className="space-y-4">
               {SKILLS.map(skill => <SkillBar key={skill.name} {...skill} />)}
             </div>
          </div>
        </section>

        {/* --- Section 3: Builds (Projects) --- */}
        <section>
          <SectionHeader title="BUILDS" subtitle="Deployed Entities" />
          <div className="space-y-4">
             {BUILDS.map((project) => (
               <div key={project.id} className="group relative border-l-2 border-zinc-800 hover:border-red-600 pl-6 py-2 transition-colors">
                  <div className="flex justify-between items-baseline mb-1">
                     <h4 className="text-xl font-bold text-zinc-200 group-hover:text-white serif">{project.name}</h4>
                     <span className="text-[9px] font-mono text-zinc-600">{project.year}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                     <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider ${
                       project.type === 'MAIN_QUEST' ? 'bg-red-900/30 text-red-400' : 'bg-zinc-800 text-zinc-400'
                     }`}>
                       {project.type}
                     </span>
                  </div>
                  <p className="text-zinc-500 text-sm font-light mb-4 max-w-2xl">{project.desc}</p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[9px] font-mono text-zinc-600 border border-zinc-800 px-1 rounded hover:text-zinc-300 transition-colors">#{t}</span>
                    ))}
                  </div>

                  {project.link && (
                    <a href={project.link} className="absolute inset-0 z-10" target="_blank" rel="noopener noreferrer">
                      <span className="sr-only">View Project</span>
                    </a>
                  )}
               </div>
             ))}
          </div>
        </section>

        {/* --- 🔥 Section 4: Known Issues (New) --- */}
        <section>
          <SectionHeader title="KNOWN ISSUES" subtitle="System Diagnostics" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ISSUES.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/[0.02] border border-white/5 p-5 rounded hover:border-white/10 transition-all"
              >
                {/* 顶部标签 */}
                <div className="flex flex-wrap items-center gap-2 mb-2 text-[9px] font-mono uppercase tracking-widest">
                   <span className="text-zinc-600">#{issue.id}</span>
                   <span className={`px-1.5 py-0.5 rounded border ${
                     issue.severity === 'High' || issue.severity === 'Critical' ? 'text-red-500 border-red-900/30 bg-red-900/10' : 'text-yellow-500 border-yellow-900/30 bg-yellow-900/10'
                   }`}>
                     {issue.severity}
                   </span>
                </div>

                {/* 标题 */}
                <h4 className="text-lg font-bold serif text-zinc-200 group-hover:text-white mb-2">
                  {issue.title}
                </h4>
                
                {/* 描述 */}
                <p className="text-zinc-400 font-light leading-relaxed serif text-xs mb-3">
                  {issue.desc}
                </p>

                {/* 复现步骤 */}
                <div className="text-[9px] text-zinc-600 font-mono border-l border-zinc-800 pl-2 py-1">
                   &gt; {issue.repro}
                </div>

                {/* 状态印章 (右上角) */}
                <div className="absolute top-4 right-4 rotate-[-5deg] opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none">
                   <span className={`text-[8px] font-black border px-1.5 py-0.5 rounded uppercase tracking-widest ${
                     issue.status === 'WON\'T FIX' ? 'text-red-600 border-red-600' : 
                     issue.status === 'FEATURE' ? 'text-green-600 border-green-600' : 
                     'text-zinc-500 border-zinc-500'
                   }`}>
                     {issue.status}
                   </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Section 5: Handshake --- */}
        <section>
          <SectionHeader title="HANDSHAKE" subtitle="Establish Connection" />
          <div className="bg-[#080808] border border-white/10 p-8 text-center space-y-8 relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-zinc-500 font-mono text-xs mb-8 uppercase tracking-widest">
                 Signal ready. Scanning for incoming requests...
               </p>
               
               <div className="flex flex-wrap justify-center gap-4">
                 {CONTACTS.map(contact => (
                   <button 
                     key={contact.label}
                     onClick={() => handleCopy(contact.value)}
                     className="group relative px-6 py-3 border border-zinc-800 hover:border-white/50 transition-all bg-zinc-900/50 hover:bg-zinc-900"
                   >
                     <div className="text-[9px] text-zinc-600 group-hover:text-red-500 font-mono uppercase tracking-widest mb-1 transition-colors">
                       {contact.label}
                     </div>
                     <div className="text-sm text-zinc-300 group-hover:text-white font-bold">
                       {copied === contact.value ? 'COPIED!' : contact.value}
                     </div>
                   </button>
                 ))}
               </div>
             </div>
             
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-12 pb-8">
           <div className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.5em]">
             End of Kernel Data
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;