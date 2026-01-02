// 定义数据类型，防止报错
export interface NowFocus {
  id: string;
  task: string;
  progress: number; // 0 - 100
  status: 'RUNNING' | 'PENDING' | 'QUEUED' | 'DONE';
}

export interface NowInput {
  type: 'READING' | 'LISTENING' | 'PLAYING' | 'WATCHING' | 'STUDYING';
  name: string;
  author: string;
}

// 核心数据
export const NOW_DATA = {
  // 顶部状态栏
  updated: '2026.01.06',
  location: 'Beijing, CN',
  mood: 'Building / 构建中', 

  // 1. 任务进程 (Active Processes) - 展示你在做什么项目
  focus: [
    { id: '01', task: 'DOU.EXE System Refactor', progress: 75, status: 'RUNNING' },
    { id: '02', task: 'Life: Q1 OKR Planning', progress: 30, status: 'PENDING' },
    { id: '03', task: 'Reading Challenge 2026', progress: 5, status: 'QUEUED' },
  ] as NowFocus[],

  // 2. 输入流 (Input Stream) - 展示你在看什么/听什么
  input: [
    { type: 'READING', name: '鼠疫', author: '加缪' },
    { type: 'WATCHING', name: 'Arrested Development', author: 'Chapter 3' },
    { type: 'LISTENING', name: 'Cyberpunk 2077 OST', author: 'Various Artists' },
  ] as NowInput[],

  // 3. 当前痴迷 (Obsessions) - 短标签
  obsessions: [
    'Retro UI',
    'Pour-over Coffee',
    'Mechanical Keyboards',
    'Stoicism'
  ],

  // 4. 运行日志 (Runtime Logs) - 一句话状态
  logs: [
    '正在尝试将生活像代码一样进行模块化重构。',
    '最近这种天气，适合躲在屏幕后面写文档。',
    '减少社交媒体输入，增加深度阅读时间。'
  ]
};