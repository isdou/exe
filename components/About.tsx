
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="relative -mt-20 -mx-6 min-h-[calc(100vh-3.5rem)] flex items-center overflow-hidden">
      {/* 背景层 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#050505]/95 z-10"></div>
        {/* --- 配置区域：关于页面背景图 --- */}
        <img
          src="https://images.unsplash.com/photo-1514467950401-4d974b70216b?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover grayscale opacity-20"
          alt="About Background"
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-24">
        {/* 左侧大字 */}
        <div className="lg:col-span-5 space-y-8 md:space-y-12">
          <div className="space-y-6">
            <div className="text-red-600 font-mono text-[10px] md:text-xs tracking-widest uppercase">SYSTEM RECONSTRUCTION</div>
            {/* --- 配置区域：名字与标签 --- */}
            <h2 className="text-6xl md:text-8xl font-bold serif text-white">豆豆</h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {['PRODUCT MANAGER', 'INTJ', 'MINIMALIST', 'ORDER-SENSITIVE'].map(tag => (
                <span key={tag} className="px-3 md:px-5 py-1.5 md:py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[8px] md:text-[10px] uppercase tracking-widest text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* --- 配置区域：简介文案 --- */}
          <div className="space-y-6 text-zinc-400 font-light text-base md:text-lg leading-loose">
            <p className="text-xl md:text-2xl text-white serif italic border-l-2 border-red-600 pl-4 md:pl-6">“我们活在世上，不过是在一堆乱码中寻找属于自己的那行逻辑。”</p>
            <p>
              擅长认赔出场，精通极简主义。相信记忆是不可靠的，所以正在用文字进行‘热备份’。人生信条：遇到困难先睡大觉。
            </p>
          </div>
        </div>

        {/* 右侧详情 */}
        <div className="lg:col-span-7 space-y-12 md:space-y-16 lg:pl-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-zinc-900 pt-8 md:pt-12">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-widest text-zinc-500">Contact / Logic Line</h4>
              {/* --- 配置区域：联系方式 --- */}
              <ul className="space-y-4 font-mono text-[12px] md:text-sm">
                <li><a href="#" className="flex items-center gap-3 hover:text-red-500 transition-colors"><span className="w-2 h-2 bg-zinc-800 rounded-full"></span> 公众号: 十点半同学</a></li>
                <li><a href="#" className="flex items-center gap-3 hover:text-red-500 transition-colors"><span className="w-2 h-2 bg-zinc-800 rounded-full"></span> Email: iswandou@gmail.com</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-widest text-zinc-500">Current Frequency</h4>
              {/* --- 配置区域：当前状态 --- */}
              <div className="p-5 md:p-6 bg-zinc-900/50 rounded-2xl md:rounded-3xl border border-zinc-800 flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                <div className="text-[12px] md:text-sm font-light">Building a decentralized memory system.</div>
              </div>
            </div>
          </div>

          <button className="w-full md:w-auto px-12 md:px-16 py-4 md:py-5 bg-white text-black rounded-full text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold hover:bg-red-600 hover:text-white transition-all duration-700 shadow-xl">
            给我写信💌
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;