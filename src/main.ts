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
import { TransformInterceptor } from './interceptor/transform.interceptor';
import {
  AuthExceptionFilter,
  HttpExceptionFilter,
} from './filters/http-exception.filter';
import { getIpAddress } from './util';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService);
  const { PORT, ENABLE_SWAGGER } = config.get('SERVER_CONFIG');

  if (ENABLE_SWAGGER) createSwagger(app); // 文档插件

  // ------------- 全局注册拦截器 STR-------------
  app.useGlobalInterceptors(new TransformInterceptor());
  // ------------- 全局注册拦截器 END-------------

  // ------------- 全局注册错误的过滤器 STR-------------
  app.useGlobalFilters(new AuthExceptionFilter(), new HttpExceptionFilter());
  // ------------- 全局注册错误的过滤器 END-------------

  app.useStaticAssets('public');
  app.setBaseViewsDir('views');
  app.setViewEngine('hbs');

  await app.listen(PORT);
  console.log(
    '\x1B[36m%s\x1B[0m',
    `App runing Localhost at：http://localhost:${PORT}`,
  );
  console.log(
    '\x1B[36m%s\x1B[0m',
    `App runing Network at：http://${getIpAddress()}:${PORT}`,
  );
}

bootstrap();
