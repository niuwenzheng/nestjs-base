/*
 * @Author: nevin
 * @Date: 2022-01-21 14:28:19
 * @LastEditors: nevin
 * @LastEditTime: 2023-07-25 10:07:08
 * @Description: 认证相关接口
 */
import { Request } from 'express';

export interface Password {
  password: string; // 密码
  salt: string; // 盐
}

export interface TokenInfo {
  readonly mail: string;
  readonly user_id: string;
  readonly user_name: string;
}

export interface TokenReq extends Request {
  tokenInfo: TokenInfo;
}
