import { UserStatus } from '../enum/user.enum';

/*
 * @Author: nevin
 * @Date: 2022-01-21 11:23:55
 * @LastEditors: nevin
 * @LastEditTime: 2022-09-15 18:24:32
 * @Description: 用户类
 */
export class User {
  user_id: number = null;

  user_name = '新用户';

  mail: string;
  password: string;
  salt: string;

  status: UserStatus = UserStatus.NORMAL; // 有默认值

  // readonly create_time: number = TimeToolsService.getTimestamp(); // 有默认值
  // update_time: number = TimeToolsService.getTimestamp(); // 有默认值
  readonly create_time: number = 0; // 有默认值
  update_time = 0; // 有默认值

  constructor(userId: number, mail: string, password: string, salt: string) {
    this.user_id = userId;
    this.mail = mail;
    this.password = password;
    this.salt = salt;
  }
}
