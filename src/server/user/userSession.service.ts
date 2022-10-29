/*
 * @Author: nevin
 * @Date: 2022-01-20 15:33:18
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-26 22:08:12
 * @Description: 用户session
 */
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Session } from 'src/db-mysql/entities/session.entity';

@Injectable()
export class UserSessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionEntityRepository: Repository<Session>,
  ) {}

  async getUserSessionInfoByUserId(userId: string): Promise<Session> {
    const userInfo: Session = await this.sessionEntityRepository.findOne({
      user_id: userId,
    });
    return userInfo;
  }
}
