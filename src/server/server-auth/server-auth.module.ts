/*
 * @Author: nevin
 * @Date: 2022-10-29 23:07:26
 * @LastEditTime: 2022-10-29 23:23:53
 * @LastEditors: nevin
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ServerAuthService } from './server-auth.service';
import { ServerAuthController } from './server-auth.controller';
@Module({
  imports: [],
  providers: [ServerAuthService],
  controllers: [ServerAuthController],
})
export class ServerAuthModule {}
