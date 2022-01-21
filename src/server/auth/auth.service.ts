/*
 * @Author: nevin
 * @Date: 2022-01-21 09:42:13
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 15:19:26
 * @Description: 文件描述
 */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from './util';
import { User } from '../user/class/user.class';
import { Password, TokenInfo } from './interfaces/auth.interfaces';

@Injectable()
export class AuthService {
    secretKey: string = 'niuniu';
    constructor(
        // private readonly userService: UserService, // 可用，没用到
        private readonly jwtService: JwtService
    ) { }

    /**
     * 生成密码
     * @param password 
     * @returns 
     */
    generatePassword(password: string): Password {
        return encryptPassword(password);
    }

    /**
     * 校验用户信息
     * @param userPassword 用户密码
     * @param userSalt 盐值
     * @param password 密码
     * @returns 
     */
    async validatePassWord(userPassword: string, userSalt: string, password: string): Promise<boolean> {
        // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
        const { password: hashPassword } = encryptPassword(password, userSalt);
        return userPassword === hashPassword;
    }

    /**
     * 生成Token
     * @param user 
     * @returns 
     */
    async generateToken(user: User): Promise<string> {
        const payload: TokenInfo = { mail: user.mail, user_id: user.user_id, user_name: user.user_name };
        return this.jwtService.sign(payload);
    }

    /**
     * @description: 解析token获取认证用户信息
     * @param {string} authorizationToken // ctx.header.authorization
     * @return {*}
     */
    async decryptToken(authorizationToken: string): Promise<TokenInfo> {
        authorizationToken = authorizationToken.replace('Bearer ', '');
        return this.jwtService.verify(authorizationToken);
    }
}