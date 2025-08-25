import { type VideoData } from "@shared/schema";

export interface IStorage {
  cacheVideoData(url: string, data: VideoData): Promise<void>;
  getCachedVideoData(url: string): Promise<VideoData | undefined>;
}

export class MemStorage implements IStorage {
  private cache: Map<string, { data: VideoData; timestamp: number }>;
  private readonly CACHE_TTL = 3600000; // 1 hour

  constructor() {
    this.cache = new Map();
  }

  async cacheVideoData(url: string, data: VideoData): Promise<void> {
    this.cache.set(url, {
      data,
      timestamp: Date.now(),
    });
  }

  async getCachedVideoData(url: string): Promise<VideoData | undefined> {
    const cached = this.cache.get(url);
    if (!cached) return undefined;

    // Check if cache is expired
    if (Date.now() - cached.timestamp > this.CACHE_TTL) {
      this.cache.delete(url);
      return undefined;
    }

    return cached.data;
  }
}

export const storage = new MemStorage();
