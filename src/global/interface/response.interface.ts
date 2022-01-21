/*
 * @Author: nevin
 * @Date: 2022-01-20 16:41:36
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 16:49:33
 * @Description: 请求返回接口
 */

export interface NormalResponse {
    data: any, // 数据
    message: string, // 信息
    code: 0, // 自定义code
    url: string, // 错误的url地址
}

export interface ErrorResponse {
    data: any, // 数据
    message: string, // 信息
    code: string, // 自定义code
    url: string, // 错误的url地址
}