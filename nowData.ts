export interface NowFocus {
  id: string;
  task: string;
  progress: number; // 0 - 100
  status: 'RUNNING' | 'PENDING' | 'QUEUED' | 'DONE';
}

export interface NowInput {
  type: 'READING' | 'LISTENING' | 'PLAYING' | 'WATCHING' | 'STUDYING';
  name: string;
  author: string; // 作者、歌手或备注
}

export const NOW_DATA = {
  // 顶部基础信息
  updated: '2026.01.06', // 记得每次更新这个日期
  location: 'Shanghai, CN', // 你的城市
  mood: 'Building / 构建中', // 当前心情或状态关键词

  // 1. 正在进行的主任务 (Active Processes)
  focus: [
    { id: '01', task: 'Project: DOU.EXE Refactor', progress: 65, status: 'RUNNING' },
    { id: '02', task: 'Work: Q1 Roadmap Planning', progress: 30, status: 'PENDING' },
    { id: '03', task: 'Life: Workout Routine', progress: 10, status: 'QUEUED' },
  ] as NowFocus[],

  // 2. 正在输入的内容 (Input Stream)
  // 可选类型: READING, LISTENING, PLAYING, WATCHING, STUDYING
  input: [
    { type: 'READING', name: '鼠疫', author: '加缪' },
    { type: 'LISTENING', name: '在此处填入歌名', author: '歌手' },
    { type: 'WATCHING', name: '在此处填入剧名', author: 'S01E01' },
  ] as NowInput[],

  // 3. 当前痴迷/关注的事物 (Current Obsessions)
  // 简短的关键词，比如：摄影、咖啡、AI...
  obsessions: [
    'React',
    'Minimalism',
    'Sci-Fi'
  ],

  // 4. 生活日志/碎碎念 (Runtime Logs)
  // 随便写点什么，最近的想法、吐槽或感悟
  logs: [
    'System initialization complete. Ready for input.',
    '在这里记录你的第一条状态...',
    '保持好奇，保持饥饿。'
  ]
};