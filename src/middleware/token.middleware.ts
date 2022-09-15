/*
 * @Author: nevin
 * @Date: 2021-12-21 18:24:42
 * @LastEditors: nevin
 * @LastEditTime: 2022-03-11 17:19:13
 * @Description: 全局token中间件 request对象上挂载tokenInfo
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenRequest } from 'src/global/interface/request.interface';
import { AuthService } from 'src/server/auth/auth.service';
import { TokenInfo } from 'src/server/auth/interfaces/auth.interfaces';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: TokenRequest, resp: Response, next: () => void) {
    const token = req.headers['authorization'];
    if (!!token) {
      const tokenInfo: TokenInfo = await this.authService.decryptToken(token);
      req.tokenInfo = tokenInfo;
    }
    next();
  }
}
