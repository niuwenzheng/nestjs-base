/*
 * @Author: Nevin
 * @Date: 2021-10-21 09:39:50
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 12:50:08
 * @Description: 用户表
 */
import { UserStatus } from 'src/server/user/enum/user.enum';
import { Entity, PrimaryColumn, Column, Index } from 'typeorm';
import { EntityTemp } from '../entity.temp';

@Entity({
  name: 'tb_user',
  synchronize: false,
})
export class User extends EntityTemp {
  @PrimaryColumn({
    type: 'char',
    length: 16,
    comment: '用户ID',
  })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '用户名',
  })
  user_name: string;

  @Index('idx_mail', { unique: true })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '邮箱号',
    nullable: true,
  })
  mail: string;

  @Index('status_idx')
  @Column({
    type: 'tinyint',
    nullable: false,
    comment: '状态 1 正常 2 停用',
    default: UserStatus.DEF,
  })
  status: UserStatus;

  @Column({
    type: 'int',
    comment: '年龄',
    nullable: true,
  })
  year: number;
}
