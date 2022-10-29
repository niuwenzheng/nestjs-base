/*
 * @Author: nevin
 * @Date: 2020-12-10 12:18:09
 * @LastEditors: nevin
 * @LastEditTime: 2020-12-10 12:29:32
 * @Description: file content
 */
import { IsEmail, IsString, IsEmpty, IsNotEmpty } from 'class-validator';

export class ServerTokenInfoDto {
  @IsString({ message: '请填写服务标识' })
  @IsNotEmpty({ message: '请填写服务标识' })
  readonly server_tag: string;

  @IsString({ message: '请填写token' })
  @IsNotEmpty({ message: '请填写token' })
  readonly token: string;

  @IsString({ message: '请填写穿透参数' })
  readonly state: string;
}
