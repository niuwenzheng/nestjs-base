/*
 * @Author: nevin
 * @Date: 2022-02-18 09:37:13
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 22:55:11
 * @Description: 文件描述
 */
export interface RedisClientOptions {
  port: number; // 端口
  host: string; // 地址
  password: string; // 密码
  family?: number;
  db?: number;
}

export interface RedisModuleOptions extends RedisClientOptions {
  name?: string; // 连接名称 默认 default
}

export interface RedisModuleAsyncOption {
  imports?: any;
  useValue?: RedisModuleOptions[];
  useFactory?: (...args: any[]) => RedisModuleOptions[]; // 生成options的构造函数
  inject?: any[]; // 注入
}
