/*
 * @Author: nevin
 * @Date: 2022-01-20 11:05:02
 * @LastEditors: nevin
 * @LastEditTime: 2022-09-23 16:17:38
 * @Description: redis缓存配置文件
 */
export default () => ({
  REDIS_CONFIG: [
    {
      name: 'test',
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || '',
      db: Number.parseInt(process.env.REDIS_DB) || 0,
    },
  ],
});
