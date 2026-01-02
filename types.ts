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
  NOW = 'now',
}

export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content?: string;
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
  // 🔥 新增以下三个字段：
  readingDate?: string; // 阅读日期
  isbn?: string;        // ISBN 编号
  wordCount?: string;   // 总字数
}

// 🔥 新增：音乐数据结构
export interface MusicCuration {
  id: string;
  title: string;    // 歌曲名或专辑名
  artist: string;   // 艺术家
  type: 'Album' | 'Single' | 'Playlist'; // 类型
  year: string;
  coverImage: string;
  review: string;   // 听后感或推荐理由
  link: string;     // Spotify/Apple Music 链接
  rating?: number;
  tags?: string[];
  status?: CurationStatus; // processing 可以理解为 "On Loop" (循环中)
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
  rating?: number; // 1-5 星
  date?: string;   // 解锁时间 (YYYY.MM.DD)
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
  date: string; // YYYY-MM-DD
  year: number;
  month: number;
  day: number;
  content: string;
  mood: string;
}