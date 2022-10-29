/*
 * @Author: nevin
 * @Date: 2022-10-29 22:19:30
 * @LastEditTime: 2022-10-29 22:54:56
 * @LastEditors: nevin
 * @Description:
 */
import { REDIS_CLIENT_PROVIDER } from '../redis.constant';

export const createClientToken = (name: string): string => {
  return `${REDIS_CLIENT_PROVIDER}_${name}`;
};
