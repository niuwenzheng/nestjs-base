import { CorrectResponse } from '../interface/table.interface';

/*
 * @Author: nevin
 * @Date: 2022-09-14 10:19:24
 * @LastEditTime: 2022-10-21 21:44:14
 * @LastEditors: nevin
 * @Description:
 */
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
