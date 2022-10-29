/*
 * @Author: nevin
 * @Date: 2022-10-24 22:01:03
 * @LastEditTime: 2022-10-29 13:22:59
 * @LastEditors: nevin
 * @Description: 用户
 */
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TableDto } from 'src/global/dto/table.dto';
import { HttpTags } from 'src/global/enum/all.enum';
import { UserStatus } from '../enum/user.enum';

export class InitAddUsersDto {
  // @ApiProperty()
  // @IsPhoneNumber('CN', { message: '请填写正确的中国区域手机号码' })
  // @Expose()
  // readonly phone: string;

  @ApiProperty()
  @IsEmail({ message: '请填写正确的邮箱地址' })
  @Expose()
  readonly mail: string;

  @ApiProperty()
  @IsString({ message: '初始化code必须是字符' })
  @Expose()
  init_code: string;

  @ApiProperty()
  @Expose()
  @IsString({ message: '用户名必须是字符' })
  user_name: string;

  @ApiProperty()
  @IsString({ message: '密码必须是字符' })
  @Expose()
  password: string;
}

export class ResetUserPasswordDto {
  @ApiProperty()
  @Expose()
  @IsString({ message: '用户ID字符' })
  user_id: string;

  @ApiProperty()
  @IsString({ message: '密码必须是字符' })
  @Expose()
  password: string;
}

export class LoginWithMailDto {
  @ApiProperty()
  @IsEmail({ message: '请填写正确的邮箱地址' })
  @Expose()
  readonly mail: string;

  @ApiProperty()
  @IsString({ message: '密码必须是字符' })
  @Expose()
  password: string;

  @ApiProperty()
  @IsEnum(HttpTags, { message: '请选择调试标识' })
  @IsOptional()
  @Expose()
  readonly api_tag?: HttpTags;
}

export class GetUserListDto extends TableDto {
  @ApiProperty({ required: false })
  @IsNumber({ allowNaN: false }, { message: '请填写年龄' })
  @Type(() => Number)
  @IsOptional()
  @Expose()
  readonly year?: number;

  @ApiProperty({ required: false })
  @IsEnum(UserStatus, { message: '请选择状态' })
  @Type(() => Number)
  @IsOptional()
  @Expose()
  readonly status?: UserStatus;

  @ApiProperty({ required: false })
  @IsString({ message: '请填写姓名' })
  @IsOptional()
  @Expose()
  readonly user_name: string;
}
