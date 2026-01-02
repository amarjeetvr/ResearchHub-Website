import { createClient } from 'redis';

class CacheManager {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      // Skip Redis if not available
      if (!process.env.REDIS_URL) {
        console.log('⚠️  Redis not configured, running without cache');
        return;
      }
      
      this.client = createClient({
        url: process.env.REDIS_URL,
        socket: {
          connectTimeout: 3000,
          lazyConnect: true
        }
      });

      this.client.on('error', () => {
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('✅ Redis connected');
        this.isConnected = true;
      });

      await this.client.connect();
    } catch (error) {
      this.isConnected = false;
    }
  }

  async get(key) {
    if (!this.isConnected) return null;
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return null;
    }
  }

  async set(key, data, ttl = 300) {
    if (!this.isConnected) return false;
    try {
      await this.client.setEx(key, ttl, JSON.stringify(data));
      return true;
    } catch (error) {
      return false;
    }
  }

  async del(key) {
    if (!this.isConnected) return false;
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const cache = new CacheManager();
export default cache;