/*
 * @Author: nevin
 * @Date: 2022-03-17 16:05:38
 * @LastEditors: nevin
 * @LastEditTime: 2022-09-15 18:32:20
 * @Description: 列表返回封装
 */
export interface CorrectResponse<T> {
  list: T[];
  page_size: number;
  page_no: number;
  total_count: number;
  total_page: number;
}
