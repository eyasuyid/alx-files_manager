import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('connect', () => {
      console.log('Redis client connected.');
    });

    this.client.on('error', (err) => {
      console.log(`Error: ${err.message}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    return this.client.del(key);
  }
}

export default new RedisClient();
