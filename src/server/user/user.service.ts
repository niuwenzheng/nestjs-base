/*
 * @Author: nevin
 * @Date: 2022-10-19 23:01:40
 * @LastEditTime: 2022-10-29 13:10:34
 * @LastEditors: nevin
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/db-mysql/entities/session.entity';
import { User } from 'src/db-mysql/entities/user.entity';
import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { ResponseUtil } from 'src/global/class/correctResponse.class';
import { FindOperator, getManager, Like, Repository } from 'typeorm';
import { NewSession } from './class/user.class';
import { GetUserListDto } from './dto/user.dto';
import { UserStatus } from './enum/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  /**
   * 检查是否已有用户存在
   * @returns
   */
  async checkHadOneUser(): Promise<boolean> {
    const userInfo: User = await this.userRepository.findOne({ where: {} });
    return !!userInfo;
  }

  /**
   * 检查是否已有用户存在
   * @returns
   */
  async resetPassword(
    userId: string,
    password: string,
    salt: string,
  ): Promise<boolean> {
    const { affected } = await this.sessionRepository.update(
      { user_id: userId },
      { password, salt },
    );
    return affected === 1;
  }

  /**
   * 邮箱号获取用户
   * @param mail
   * @returns
   */
  async getUserInfoByMail(mail: string) {
    const userInfo: User = await this.userRepository.findOne({
      where: { mail },
    });
    return userInfo;
  }

  /**
   * ID获取用户
   * @param userId
   * @returns
   */
  async getUserInfoById(userId: string) {
    const userInfo: User = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    return userInfo;
  }

  /**
   * 创建新的用户
   * @param newUserInfo
   * @param newSession
   * @returns
   */
  async createNewUser(
    newUserInfo: User,
    newSession: {
      password: string;
      salt: string;
    },
  ) {
    try {
      return await getManager().transaction(async (manager) => {
        const userInfo = await manager.save(
          User,
          manager.create(User, newUserInfo),
        );

        const session = new NewSession(
          userInfo.user_id,
          newSession.password,
          newSession.salt,
        );
        return await manager.save(Session, manager.create(Session, session));
      });
    } catch (error) {
      throw new AppHttpException(ErrHttpBack.err_user_had);
    }
  }

  /**
   * 获取用户列表
   * @param filter
   * @returns
   */
  async getUserList(filter: GetUserListDto) {
    const { status, user_name, year, page_no, page_size } = filter;
    const where: {
      user_name?: FindOperator<string>;
      status?: UserStatus;
      year?: number;
    } = {};

    if (user_name) where.user_name = Like(`%${user_name}%`);
    if (status) where.status = status;
    if (year) where.year = year;

    const [dataList, count]: [User[], number] =
      await this.userRepository.findAndCount({
        where,
        order: {
          create_at: 'DESC',
        },
        skip: (page_no - 1) * page_size,
        take: page_size,
      });

    return ResponseUtil.GetCorrectResponse<User>(
      page_no,
      page_size,
      count,
      dataList,
    );
  }
}
