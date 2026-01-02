export enum NavTab {
  LOG = 'log',
  ESSAYS = 'essays',
  CURATION = 'curation',
  TRAVEL = 'travel',
  GOODIES = 'goodies',
  NOW = 'now', // 
  MEMORY = 'memory',
  JOURNAL = 'journal',
  ABOUT = 'about',
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