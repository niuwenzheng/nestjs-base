/*
 * @Author: nevin
 * @Date: 2022-02-18 09:18:59
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 22:55:40
 * @Description: 文件描述
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisConfig from 'config/redis.config';
import { CacheService } from './cache.service';
import { RedisModule } from './redis/redis.module';

const REDIS_CONFIG = redisConfig().REDIS_CONFIG;
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfig], // 加载自定义配置项
    }),
    // RedisModule.forRoot([
    //   {
    //     name: 'test',
    //     host: '127.0.0.1',
    //     port: 6379,
    //     password: '',
    //   }
    // ]),
    RedisModule.forRoot(REDIS_CONFIG),
  ],
  providers: [CacheService],
})
export class CacheModule {}
