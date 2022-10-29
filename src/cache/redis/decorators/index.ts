/*
 * @Author: nevin
 * @Date: 2022-10-29 22:19:30
 * @LastEditTime: 2022-10-29 22:54:50
 * @LastEditors: nevin
 * @Description:
 */
import { Inject } from '@nestjs/common';
import { createClientToken } from '../utils/create.token';
import { REDIS_CLIENT_DEFAULT_KEY } from '../redis.constant';

/**
 * 注入redis的客户端
 * @param name
 * @constructor
 */
export const InjectRedisClient = (name: string = REDIS_CLIENT_DEFAULT_KEY) => {
  return Inject(createClientToken(name));
};
