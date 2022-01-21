/*
 * @Author: nevin
 * @Date: 2021-04-21 18:21:11
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 14:42:13
 * @Description: 用户接口类型
 */
import { IsString, IsInt, IsEmail, IsEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

export class CreateUsersDto {

  @ApiProperty() // 文档标识
  @IsEmail()
  readonly u_mail: string;

  @ApiProperty()
  @IsString({ message: '验证码必须是字符' })
  readonly code: string;

  @ApiProperty()
  @IsString({ message: '密码必须是字符' })
  password: string;

}

export class LoginUserDto {

  @ApiProperty() // 文档标识
  @IsEmail()
  readonly mail: string;

  @ApiProperty()
  @IsString({ message: '密码必须是字符' })
  password: string;

}


export class UpdateUsersDto {

  @Type(() => Number)
  @IsInt({ message: '年龄必须是数值' })
  @IsOptional()
  readonly age?: number;

  @IsString({ message: '昵称必须是字符' })
  @IsOptional()
  readonly user_name?: string;
}
