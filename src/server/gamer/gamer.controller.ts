/*
 * @Author: nevin
 * @Date: 2022-10-26 22:37:19
 * @LastEditTime: 2022-11-17 21:39:15
 * @LastEditors: nevin
 * @Description:
 */
import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GamerService } from './gamer.service';
@ApiTags('玩家')
@Controller('gamer')
export class GamerController {
  constructor(private readonly gamerService: GamerService) {}

  @ApiOperation({ description: '创建玩家' })
  @Post()
  createNewGamer() {
    return this.gamerService.createNewGamer('111', '111');
  }
}
