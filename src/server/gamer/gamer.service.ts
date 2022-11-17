/*
 * @Author: nevin
 * @Date: 2022-10-26 22:37:09
 * @LastEditTime: 2022-11-17 21:38:31
 * @LastEditors: nevin
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdService } from 'src/db-mongo/id.service';
import { Gamer, GamerDocument } from 'src/db-mongo/schema/gamer.schema';
import { NewGamer } from './class/gamer.class';

@Injectable()
export class GamerService {
  constructor(
    private readonly idService: IdService,

    @InjectModel(Gamer.name)
    private readonly gamerModel: Model<GamerDocument>,
  ) {}

  private async _generateId() {
    return await this.idService.createId(Gamer.name, 100000000, 1);
  }

  /**
   * create new gamer
   * @param mail
   * @param password
   * @returns
   */
  async createNewGamer(mail: string, password: string) {
    const newGamer = new NewGamer(
      await this._generateId(),
      mail,
      password,
      'xx',
    );

    const createGamer = new this.gamerModel(newGamer);
    return await createGamer.save();
  }
}
