/*
 * @Author: nevin
 * @Date: 2021-05-28 16:11:10
 * @LastEditors: nevin
 * @LastEditTime: 2022-11-17 21:33:52
 * @Description: file content
 */
import { Gamer } from 'src/db-mongo/schema/gamer.schema';
import { TimeUtil } from 'src/util/time.util';
import { GamerStatus } from '../enum/game.enum';

export class NewGamer extends Gamer {
  gamer_name = '游客玩家';
  status: GamerStatus = GamerStatus.NORMAL; // 有默认值

  readonly create_time: number = TimeUtil.getTimestamp(); // 有默认值
  update_time: number = TimeUtil.getTimestamp(); // 有默认值

  constructor(gamerId: number, mail: string, password: string, salt: string) {
    super();
    this.gamer_id = gamerId;
    this.mail = mail;
    this.password = password;
    this.salt = salt;
  }
}
