/*
 * @Author: nevin
 * @Date: 2022-11-16 22:04:18
 * @LastEditTime: 2022-11-17 21:33:14
 * @LastEditors: nevin
 * @Description: 玩家
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GamerStatus } from 'src/server/gamer/enum/game.enum';

export type GamerDocument = Gamer & Document;
@Schema({ collection: 't_gamer', versionKey: false })
export class Gamer {
  @Prop({ required: true })
  gamer_id: number;

  @Prop({ required: true })
  gamer_name: string;

  @Prop()
  mail: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  status: GamerStatus;

  @Prop()
  create_time: number;

  @Prop()
  update_time: number;
}

export const GamerSchema = SchemaFactory.createForClass(Gamer);
