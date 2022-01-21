/*
 * @Author: nevin
 * @Date: 2022-01-19 16:13:27
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 16:07:04
 * @Description: 启动文件
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createSwagger } from './_swagger';
import { Logger } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AuthExceptionFilter, HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const { PORT, ENABLE_SWAGGER } = config.get('SERVER_CONFIG');

  if (ENABLE_SWAGGER) createSwagger(app); // 文档插件

  // ------------- 全局注册拦截器 STR-------------
  app.useGlobalInterceptors(new TransformInterceptor());
  // ------------- 全局注册拦截器 END-------------

  // ------------- 全局注册错误的过滤器 STR-------------
  app.useGlobalFilters(new AuthExceptionFilter(), new HttpExceptionFilter());
  // ------------- 全局注册错误的过滤器 END-------------

  await app.listen(PORT);
  Logger.log(`服务开启-端口：${PORT}`)
}
bootstrap();
