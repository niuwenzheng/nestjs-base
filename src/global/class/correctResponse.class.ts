/*
 * @Author: nevin
 * @Date: 2022-09-14 10:19:24
 * @LastEditTime: 2022-09-15 18:16:41
 * @LastEditors: nevin
 * @Description: 列表返回封装
 */
import { CorrectResponse } from '../interface/table.interface';

export class ResponseUtil {
  static GetCorrectResponse<T>(
    pageNo: number,
    pageSize: number,
    count: number,
    list: T[],
  ): CorrectResponse<T> {
    return {
      page_no: pageNo,
      page_size: pageSize,
      total_count: count,
      total_page: Math.ceil(count / pageSize),
      list,
    };
  }
}
