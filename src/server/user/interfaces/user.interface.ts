/*
 * @Author: nevin
 * @Date: 2022-01-21 11:15:41
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 11:30:00
 * @Description: 用户相关接口
 */
import { Document } from 'mongoose';
import { User } from '../class/user.class';

export interface UserModel extends User, Document { }