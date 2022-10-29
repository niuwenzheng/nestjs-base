/*
 * @Author: nevin
 * @Date: 2022-03-17 16:05:38
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-21 22:09:36
 * @Description: 表格状数据
 */
export interface CorrectResponse<T> {
  list: T[];
  page_size: number;
  page_no: number;
  total_count: number;
  total_page: number;
}
