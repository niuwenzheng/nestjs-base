/*
 * @Author: nevin
 * @Date: 2022-01-20 15:33:08
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 17:15:57
 * @Description: 文件描述
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaName } from 'src/database/schema/user.schema';

@Module({
  imports:[
    DatabaseModule,
    MongooseModule.forFeature([{ name: UserSchemaName, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
