/*
 * @Author: nevin
 * @Date: 2022-10-26 22:37:09
 * @LastEditTime: 2022-10-26 23:20:53
 * @LastEditors: nevin
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdService } from 'src/db-mongo/id.service';
import { GamerModel, GamerSchemaName } from 'src/db-mongo/schema/gamer.schema';
import { Gamer } from './class/gamer.class';

@Injectable()
export class GamerService {
  constructor(
    private readonly idService: IdService,

    @InjectModel(GamerSchemaName)
    private readonly gamerModel: Model<GamerModel>,
  ) {}

  private async _generateId() {
    return await this.idService.createId(GamerSchemaName, 100000000, 1);
  }

  async createNewGamer(newGamer: Gamer) {
    newGamer.gamer_id = await this._generateId();
    const createGamer = new this.gamerModel(newGamer);
    return await createGamer.save();
  }
}
