/*
 * @Author: niuwenzheng
 * @Date: 2020-04-14 15:29:18
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 17:20:25
 * @Description: 参数验证管道
 */
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as _ from 'lodash';

@Injectable()
export class ParamsValidationPipe implements PipeTransform<any> {

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const errors = await validate(plainToClass(metatype, value));

    if (errors.length <= 0) return value;

    throw new BadRequestException('参数验证失败： ' + _.values(errors[0].constraints)[0]);

  }


}