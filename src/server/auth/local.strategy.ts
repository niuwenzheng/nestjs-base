/*
 * @Author: nevin
 * @Date: 2022-01-21 13:30:25
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 15:04:56
 * @Description: 本地验证，非必须
 */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(userPassword: string, userSalt: string, password: string): Promise<any> {
    const user = await this.authService.validatePassWord(userPassword, userSalt, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
