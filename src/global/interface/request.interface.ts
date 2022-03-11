/*
 * @Author: nevin
 * @Date: 2022-01-20 16:41:36
 * @LastEditors: nevin
 * @LastEditTime: 2022-03-11 17:14:32
 * @Description: 请求返回接口
 */

import { TokenInfo } from "src/server/auth/interfaces/auth.interfaces";
import { Request } from 'express';

export interface TokenRequest extends Request {
    tokenInfo: TokenInfo;
  }