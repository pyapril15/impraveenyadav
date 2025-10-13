import { createClient } from 'redis';

// Redis client setup with edge function endpoint
const REDIS_HOST = 'redis-14242.crce179.ap-south-1-1.ec2.redns.redis-cloud.com';
const REDIS_PORT = 14242;

// Since this is client-side, we'll use a simple cache with localStorage fallback
class ClientCache {
  private cache = new Map<string, { data: any; expiry: number }>();
  private readonly TTL = 10 * 60 * 1000; // 10 minutes

  async get(key: string) {
    // Check memory cache first
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    // Check localStorage as fallback
    try {
      const stored = localStorage.getItem(`cache_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.expiry > Date.now()) {
          this.cache.set(key, parsed);
          return parsed.data;
        }
      }
    } catch (error) {
      console.warn('Cache localStorage error:', error);
    }

    return null;
  }

  async set(key: string, data: any, ttl?: number) {
    const expiry = Date.now() + (ttl || this.TTL);
    const cacheItem = { data, expiry };
    
    // Set in memory
    this.cache.set(key, cacheItem);
    
    // Set in localStorage
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('Cache localStorage set error:', error);
    }
  }

  async del(key: string) {
    this.cache.delete(key);
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (error) {
      console.warn('Cache localStorage delete error:', error);
    }
  }

  // Clean expired items
  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (value.expiry <= now) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = new ClientCache();

// Cleanup expired items every 10 minutes
setInterval(() => cache.cleanup(), 10 * 60 * 1000);