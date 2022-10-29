/*
 * @Author: Nevin
 * @Date: 2021-10-20 09:36:28
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-19 23:14:38
 * @Description: 用户表
 */
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { EntityTemp } from '../entity.temp';

@Entity({
  name: 'tb_session',
  synchronize: false, // 自动同步
})
export class Session extends EntityTemp {
  @PrimaryColumn({
    type: 'char',
    length: 36,
    nullable: false,
    comment: '用户ID',
  })
  user_id: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '密码盐',
  })
  salt: string;
}
