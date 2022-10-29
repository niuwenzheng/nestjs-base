/*
 * @Author: nevin
 * @Date: 2021-05-28 16:11:10
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-26 22:55:54
 * @Description: file content
 */
import { TimeUtil } from 'src/util/time.util';
import { GamerStatus } from '../enum/game.enum';
export class Gamer {
  gamer_id: number = null;
  gamer_name = '游客玩家';
  mail: string = null; // 邮箱
  password: string = null; // 密码
  salt: string = null; // 密码盐

  status: GamerStatus = GamerStatus.NORMAL; // 有默认值
  readonly create_time: number = TimeUtil.getTimestamp(); // 有默认值
  update_time: number = TimeUtil.getTimestamp(); // 有默认值

  constructor(gamerId: number, gamerName: string) {
    this.gamer_id = gamerId;
    this.gamer_name = gamerName;
  }
}
