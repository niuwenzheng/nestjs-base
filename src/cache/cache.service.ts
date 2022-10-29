/*
 * @Author: nevin
 * @Date: 2022-02-18 09:19:15
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 22:55:54
 * @Description: 缓存器
 */
import { Injectable } from '@nestjs/common';
import { InjectRedisClient } from './redis/decorators';
import * as Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(
    @InjectRedisClient('test') private client: Redis.Redis, // 启用redis // @InjectRedisClient('0') private redisClient0: Redis.Redis, // 多链接
  ) {}

  getClient(): Redis.Redis {
    return this.client;
  }

  // 多链接
  // getClient0() {
  //     return this.redisClient0;
  // }

  /**
   * 设置key-value
   * @param key
   * @param value
   * @param seconds
   * @returns
   */
  async setKey(key: string, value: any, seconds?: number): Promise<boolean> {
    value = JSON.stringify(value);
    if (!seconds) {
      return !!(await this.client.set(key, value));
    }

    return !!(await this.client.set(key, value, 'EX', seconds));
  }

  /**
   * 获取值
   * @param key
   * @returns
   */
  async get(key: string): Promise<any> {
    const data = await this.client.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  /**
   * 清除值
   * @param key
   * @returns
   */
  async del(key: string): Promise<boolean> {
    const data = await this.client.del(key);
    return !!data;
  }

  /**
   * 设置过期时间
   * @param key
   * @param times
   * @returns
   */
  async setPexire(key: string, times = 0): Promise<boolean> {
    const data = await this.client.pexpire(key, times);
    return data === 1;
  }
}
