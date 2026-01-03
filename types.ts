export enum NavTab {
  LOG = 'log',
  ESSAYS = 'essays',
  CURATION = 'curation',
  TRAVEL = 'travel',
  GOODIES = 'goodies',
  NOW = 'now',
  MEMORY = 'memory',
  JOURNAL = 'journal',
  ABOUT = 'about',
  DREAMS = 'dreams'
}

export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content?: string;
  readTime?: string;   // 🔥 新增：阅读时间
  coverImage?: string; // 🔥 新增：封面图
}

export type CurationStatus = 'done' | 'processing' | 'wishlist' | 'dropped';

export interface MovieCuration {
  id: string;
  title: string;
  originalTitle: string;
  director: string;
  year: string;
  region: string;
  genre: string;
  runtime: string;
  images: string[];
  review: string;
  rating?: number;
  tags?: string[];
  status?: CurationStatus;
  // 🔥 新增字段
  cast?: string[];       // 主演
  totalDuration?: string; // 电视剧总时长 (e.g. "45min x 12eps")
  isTV?: boolean;        // 标记是否为电视剧
}

export interface BookCuration {
  id: string;
  title: string;
  author: string;
  quote: string;
  summary: string;
  coverImage: string;
  bgColor?: string;
  rating?: number;
  tags?: string[];
  status?: CurationStatus;
  readingDate?: string;
  isbn?: string;
  wordCount?: string;
}

export interface MusicCuration {
  id: string;
  title: string;
  artist: string;
  type: 'Album' | 'Single' | 'Playlist';
  year: string;
  coverImage: string;
  review: string;
  link: string;
  rating?: number;
  tags?: string[];
  status?: CurationStatus;
}

// 🔥 新增：虚拟人物榜单
export interface Character {
  id: string;
  name: string;
  source: string; // 出处 (比如《甄嬛传》)
  actor?: string; // 扮演者
  desc: string;   // 印象/评价
  avatar: string; // 头像链接
  rank: number;   // 排名
}

export interface GoodieItem {
  id: string;
  name: string;
  category: 'eat' | 'drink' | 'buy' | 'dining';
  description: string;
  image: string;
  price?: string;
  link?: string;
  reason: string;
  restaurant?: string;
  cuisine?: string;
  rating?: number;
  date?: string;
}

export interface TravelLog {
  id: string;
  city: string;
  country: string;
  coordinates: [number, number];
  date: string;
  images: string[];
  notes: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  year: number;
  month: number;
  day: number;
  content: string;
  mood: string;
}

// 兼容 Now 的接口
export interface NowUpdate {
    id: string;
    timestamp: string;
    content: string;
    status: string;
}