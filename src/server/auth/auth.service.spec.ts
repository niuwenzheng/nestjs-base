/*
 * @Author: nevin
 * @Date: 2022-02-17 13:57:15
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-24 23:07:46
 * @Description: 认证测试
 */
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DefAuthSecret } from './constant';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.AUTH_SECRET || DefAuthSecret,
          signOptions: { expiresIn: '8h' }, // token 过期时效
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('get new passport', () => {
    expect(service).toBeDefined();
    const { password, salt } = service.generatePassword('admin');
  });
});
