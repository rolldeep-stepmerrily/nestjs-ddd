import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

import { RedisService } from './redis.service';
import { RedisRepository } from './repositories/redis.repository';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: async (configService: ConfigService) => {
        const host = configService.getOrThrow<string>('REDIS_HOST');
        const port = configService.getOrThrow<number>('REDIS_PORT');
        const password = configService.getOrThrow<string>('REDIS_PASSWORD');

        return { store: redisStore, socket: { host, port }, password, ttl: 5 * 60 * 1000 };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService, RedisRepository],
  exports: [RedisService],
})
export class RedisModule {}
