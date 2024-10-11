import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisRepository {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject('SERVER_URL') private readonly serverUrl: string,
  ) {}

  async set(key: string, value: any): Promise<void> {
    try {
      return await this.cacheManager.set(`${this.serverUrl}/${key}`, value);
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
  async get<T>(key: string): Promise<T | null> {
    try {
      return (await this.cacheManager.get<T>(`${this.serverUrl}/${key}`)) ?? null;
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
  async delete(key: string): Promise<void> {
    try {
      return await this.cacheManager.del(`${this.serverUrl}/${key}`);
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
