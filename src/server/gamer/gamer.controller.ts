/*
 * @Author: nevin
 * @Date: 2022-10-26 22:37:19
 * @LastEditTime: 2022-10-26 23:36:42
 * @LastEditors: nevin
 * @Description:
 */
import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Gamer } from './class/gamer.class';
import { GamerService } from './gamer.service';
@ApiTags('玩家')
@Controller('gamer')
export class GamerController {
  constructor(private readonly gamerService: GamerService) {}

  @ApiOperation({ description: '创建玩家' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Post()
  createNewGamer() {
    const newGamer = new Gamer(0, '牛牛');
    return this.gamerService.createNewGamer(newGamer);
  }
}
