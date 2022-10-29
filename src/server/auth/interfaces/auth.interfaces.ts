/*
 * @Author: nevin
 * @Date: 2022-01-21 14:28:19
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 12:22:19
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
