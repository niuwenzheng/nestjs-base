/*
 * @Author: nevin
 * @Date: 2022-06-19 22:32:32
 * @LastEditTime: 2022-06-19 22:45:06
 * @LastEditors: nevin
 * @Description:
 */
import { Logger } from '@nestjs/common';
import { ErrorTypes } from './log.enum';

export class LogUtil {
  /**
   * 错误日志
   * @param url
   * @param stack
   * @param message
   */
  static logError = (url: string, stack: string, message: string) => {
    Logger.error({
      url,
      level: ErrorTypes.ERROR,
      message: message || url,
      mate: stack,
      stack: stack,
    });
  };

  /**
   * 警告日志
   * @param message
   * @param url
   */
  static logWarn = (message: string, url?: string) => {
    Logger.error({
      url: url || message,
      level: ErrorTypes.WARN,
      message: message,
      mate: '',
      stack: '',
    });
  };
}
