/*
 * @Author: nevin
 * @Date: 2022-10-19 23:06:52
 * @LastEditTime: 2022-10-25 09:13:45
 * @LastEditors: nevin
 * @Description:
 */
import { Session } from 'src/db-mysql/entities/session.entity';
import { User } from 'src/db-mysql/entities/user.entity';

export class NewUser extends User {
  constructor(userId: string, mail: string, userName: string) {
    super();
    this.user_id = userId;
    this.mail = mail;
    this.user_name = userName;
  }
}

export class NewSession extends Session {
  constructor(userId: string, password: string, salt: string) {
    super();
    this.user_id = userId;
    this.password = password;
    this.salt = salt;
  }
}
