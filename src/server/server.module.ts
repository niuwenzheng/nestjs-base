/*
 * @Author: nevin
 * @Date: 2022-01-20 16:11:44
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 16:12:51
 * @Description: 服务模块
 */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class ServerModule {}
