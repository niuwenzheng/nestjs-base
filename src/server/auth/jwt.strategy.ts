/*
 * @Author: nevin
 * @Date: 2022-01-21 09:45:49
 * @LastEditors: nevin
 * @LastEditTime: 2023-07-25 10:07:17
 * @Description: JWT 的验证策略
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { TokenInfo } from './interfaces/auth.interfaces';
import { DefAuthSecret } from './constant';
import { User } from 'src/db-mysql/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // token 需要加"Bearer "前缀
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET || DefAuthSecret,
    });
  }

  /**
   * 被守卫调用的验证方法
   * @param payload
   * @returns
   */
  async validate(payload: TokenInfo): Promise<User> {
    const { mail } = payload;
    const userInfo: User = await this.userRepository.findOne({
      where: { mail },
    });

    if (!userInfo) {
      // throw new UnauthorizedException();
      throw new AppHttpException(ErrHttpBack.err_user_had);
    }
    return userInfo;
  }
}
