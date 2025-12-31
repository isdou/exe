// 文件: isdou_exe/types.ts

export enum NavTab {
  LOG = 'log',
  ESSAYS = 'essays',
  CURATION = 'curation',
  TRAVEL = 'travel',
  GOODIES = 'goodies',
  NOW = 'now',
  MEMORY = 'memory',
  ABOUT = 'about'
}

export interface GoodieItem {
  id: string;
  name: string;
  category: 'eat' | 'drink' | 'buy';
  description: string;
  image: string;
  price?: string;
  link?: string;
  reason: string;
}

// 定义内容状态类型
export type ContentStatus = 'done' | 'processing' | 'dropped' | 'wishlist';

export interface MovieCuration {
  id: string;
  title: string;
  originalTitle?: string;
  director: string;
  year: string;
  region: string;
  genre: string;
  runtime: string;
  images: string[];
  review: string;
  // 新增字段
  rating?: number;         // 评分 (1-10)
  tags?: string[];         // 标签
  status?: ContentStatus;  // 状态
}

export interface BookCuration {
  id: string;
  title: string;
  author: string;
  quote: string;
  summary: string;
  coverImage: string;
  bgColor: string;
  // 新增字段
  rating?: number;
  tags?: string[];
  status?: ContentStatus;
}

// ... (以下其他接口保持不变)
// 🔥 新增：日记条目接口
export interface JournalEntry {
  id: string;
  month: number;
  day: number;
  year: number;
  content: string;
  mood?: string; // 可选：记录当时心情
}
export interface Footprint { id: string; city: string; description: string; date: string; image: string; }
export interface CulturalLog { id: string; title: string; type: string; rating: number; comment: string; date: string; coverImage: string; }
export interface TravelSpot { id: string; city: string; coordinate: string; lat: number; lng: number; date: string; description: string; images: string[]; }
export interface NowUpdate { id: string; timestamp: string; content: string; status: string; }
export interface Fragment { id: string; content: string; date: string; tags: string[]; }
export interface Article { id: string; title: string; excerpt: string; content?: string; date: string; coverImage: string; category?: string; readTime?: string; }