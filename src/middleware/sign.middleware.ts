/*
 * @Author: nevin
 * @Date: 2021-12-21 18:24:42
 * @LastEditors: nevin
 * @LastEditTime: 2021-12-23 13:57:45
 * @Description: 全局日志中间件
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SignMiddleware implements NestMiddleware {
  use(req: Request, resp: Response, next: () => void) {
    Logger.log(`----- ${req.method}: ${req.baseUrl}`);
    // console.log(`${req.method} ${req.path}`);
    next();
  }
}