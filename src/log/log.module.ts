/*
 * @Author: nevin
 * @Date: 2022-02-23 09:21:48
 * @LastEditors: nevin
 * @LastEditTime: 2023-07-25 10:05:48
 * @Description: 日志模块
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { WinstonModule } from 'nest-winston';

import * as winston from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
import logConfig from 'config/log.config';

const LOG_CONFIG = logConfig().LOG_CONFIG;

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('winston-mongodb').MongoDB;

const format = winston.format;
const transports: any = winston.transports;

const transportsList = [
  new transports.Console({
    // console.log 方式日志
    level: 'info',
  }),
  new DailyRotateFile({
    // 文件 方式日志
    filename: `logs/warn/${LOG_CONFIG.LABEL_NAME}-%DATE%.log`,
    level: 'warn',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
  new DailyRotateFile({
    // 文件 方式日志
    filename: `logs/error/${LOG_CONFIG.LABEL_NAME}-%DATE%.log`,
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
  // 日志入库
  new transports.MongoDB({
    level: 'verbose', // 入库级别
    silent: !LOG_CONFIG.LOG_DB_OPEN, // 是否抑制输出
    db: LOG_CONFIG.LOG_DB_URL,
    collection: LOG_CONFIG.LOG_DB_COL || 'logs', // 集合名
    options: {
      useUnifiedTopology: true,
    },
    label: LOG_CONFIG.LABEL_NAME, // 项目标识
    storeHost: true, // 服务器主机名
    decolorize: true, // 忽略颜色
    metaKey: 'mate', // mateKey 设置为堆栈信息
    format: format.combine(
      format.errors({ stack: true }), // <-- use errors format
      format.timestamp(),
      format.json(),
    ),
  }),
];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [logConfig], // 加载自定义配置项
      validationSchema: Joi.object({
        // 配置文件.env校验
        LABEL_NAME: Joi.string().default('label'),
      }),
    }),
    WinstonModule.forRoot({
      // 日志模块
      levels: {
        // 调整级别 为了慢日志高于info日志
        error: 0,
        warn: 1,
        verbose: 2,
        info: 3,
      },
      silent: false, // 抑制日志（关闭）
      exitOnError: false, // 设置为false，处理到的异常不会造成 退出
      format: format.combine(
        // 格式化
        format.errors({ stack: true }), // <-- use errors format
        format.colorize({
          // 颜色设置
          colors: {
            info: 'green',
            error: 'red',
            warn: 'yellow',
          },
        }),
        format.timestamp({
          format: 'HH:mm:ss YY/MM/DD',
        }),
        format.label({
          label: LOG_CONFIG.LABEL_NAME,
        }),
        format.splat(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: [${info.label}]${
            info.message
          } ${info.stack ? '\n' + info.stack : ''}}`;
        }),
      ),
      transports: transportsList,
    }),
  ],
})
export class LogModule {}
