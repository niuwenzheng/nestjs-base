/*
 * @Author: nevin
 * @Date: 2022-10-26 22:36:53
 * @LastEditTime: 2022-11-17 21:49:31
 * @LastEditors: nevin
 * @Description:
 */
import { Module } from '@nestjs/common';
import { GamerService } from './gamer.service';
import { GamerController } from './gamer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gamer, GamerSchema } from 'src/db-mongo/schema/gamer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gamer.name, schema: GamerSchema }]),
  ],
  providers: [GamerService],
  controllers: [GamerController],
})
export class GamerModule {}
