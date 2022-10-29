/*
 * @Author: nevin
 * @Date: 2021-12-21 18:24:42
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 21:03:03
 * @Description: 全局日志中间件
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SignMiddleware implements NestMiddleware {
  use(req: Request, resp: Response, next: () => void) {
    console.log(`----- ${req.method} -------- ${req.path}/${req.url}`);
    next();
  }
}
