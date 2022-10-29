/*
 * @Author: nevin
 * @Date: 2022-03-08 17:43:04
 * @LastEditors: nevin
 * @LastEditTime: 2022-09-23 17:33:15
 * @Description: 所有实体通用字段
 */

import { BaseEntity, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export class EntityTemp extends BaseEntity {
  @Index('idx_create_at')
  @CreateDateColumn({
    type: 'datetime',
    length: 0,
    comment: '创建时间',
    readonly: true,
  }) // 自动生成列
  create_at: string;

  @Index('idx_update_at')
  @UpdateDateColumn({ type: 'datetime', length: 0, comment: '更新时间' }) // 自动生成并自动更新列
  update_at: string;
}
