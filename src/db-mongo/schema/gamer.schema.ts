/*
 * @Author: nevin
 * @Date: 2021-12-24 14:32:46
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-26 22:55:23
 * @Description: 玩家 Gamer gamer
 */
import * as mongoose from 'mongoose';
import { Gamer } from 'src/server/gamer/class/gamer.class';
export interface GamerModel extends Gamer, Document {}
export const GamerSchemaName = 'Gamer';
export const GamerSchema = new mongoose.Schema(
  {
    gamer_id: Number,
    gamer_name: String,

    mail: String,
    password: String,
    salt: String, // 密码盐

    status: Number,

    create_time: Number,
    update_time: Number,
  },
  { collection: 't_gamer', versionKey: false },
);
