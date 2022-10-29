/*
 * @Author: nevin
 * @Date: 2021-12-21 18:24:42
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 21:02:30
 * @Description: 全局token中间件 request对象上挂载tokenInfo
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/server/auth/auth.service';
import {
  TokenInfo,
  TokenReq,
} from 'src/server/auth/interfaces/auth.interfaces';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: TokenReq, resp: Response, next: () => void) {
    const token = req.headers['authorization'];
    if (!!token) {
      const tokenInfo: TokenInfo = await this.authService.decryptToken(token);
      req.tokenInfo = tokenInfo;
    }
    next();
  }
}
