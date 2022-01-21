/*
 * @Author: nevin
 * @Date: 2022-01-21 09:36:34
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 16:15:18
 * @Description: jwt认证模块
 */
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { DefAuthSecret } from './constant';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Global() // 使其在其他模块可用
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.AUTH_SECRET || DefAuthSecret,
            signOptions: { expiresIn: '8h' }, // token 过期时效
        }),
        UserModule, // 引入用户模块
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy], // 添加auth服务和验证器
    exports: [AuthService],
})
export class AuthModule { }
