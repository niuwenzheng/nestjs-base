/*
 * @Author: nevin
 * @Date: 2022-01-21 09:50:47
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 15:16:55
 * @Description: 文件描述
 */
import * as crypto from 'crypto';
import { Password } from './interfaces/auth.interfaces';

/**
 * 生成随机盐
 */
export function makeSalt(): string {
    return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt?: string): Password {
    if (!password) return null;
    salt = salt || makeSalt();

    // 10000 代表迭代次数 16代表长度
    password = crypto.pbkdf2Sync(password, Buffer.from(salt, 'base64'), 10000, 16, 'sha1').toString('base64')
    return {
        password,
        salt
    }

}