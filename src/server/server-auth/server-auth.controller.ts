/*
 * @Author: nevin
 * @Date: 2022-10-29 23:07:26
 * @LastEditTime: 2022-10-29 23:09:08
 * @LastEditors: nevin
 * @Description:
 */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ParamsValidationPipe } from '../validation.pipe';
import { ServerTokenInfoDto } from './dto/server-auth.dto';
import { ServerAuthBack } from './interfaces/server-auth.interface';
import { ServerAuthService } from './server-auth.service';

@Controller('server-auth')
export class ServerAuthController {
  constructor(private readonly serverAuthService: ServerAuthService) {}
  /**
   * @description: 解析其他服务传递过来的token
   * @param {ServerTokenInfoDto} serverTokenInfo
   * @return {*}
   */
  @Post()
  async getUserByOtherServerToken(
    @Body(new ParamsValidationPipe()) serverTokenInfo: ServerTokenInfoDto,
  ): Promise<ServerAuthBack> {
    return await this.serverAuthService.getUserByOtherServerToken(
      serverTokenInfo,
    );
  }
}
