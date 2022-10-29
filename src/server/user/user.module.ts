/*
 * @Author: nevin
 * @Date: 2022-10-19 23:01:00
 * @LastEditTime: 2022-10-26 23:35:16
 * @LastEditors: nevin
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db-mysql/entities/user.entity';
import { Session } from 'src/db-mysql/entities/session.entity';
import { AuthModule } from '../auth/auth.module';
import { UserSessionService } from './userSession.service';

@Global()
@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Session])],
  providers: [UserService, UserSessionService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
