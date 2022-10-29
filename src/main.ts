/*
 * @Author: nevin
 * @Date: 2022-09-23 14:03:39
 * @LastEditTime: 2022-10-25 22:59:14
 * @LastEditors: nevin
 * @Description: 主方法
 */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { createSwagger } from './_swagger';

async function bootstrap() {
  // 注:禁用logger会引起启动的错误不显示,只留下错误日志
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error'],
  });

  const config = app.get(ConfigService);
  const { PORT, ENABLE_SWAGGER } = config.get('SERVER_CONFIG');

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)); // 全局的logger
  app.setGlobalPrefix('api'); // 路由添加api开头

  const swApi = ENABLE_SWAGGER ? createSwagger(app) : ''; // 文档插件

  // 静态目录配置
  // app.useStaticAssets('public');
  // app.setViewEngine('ejs');

  app.useGlobalInterceptors(new TransformInterceptor()); // 全局注册拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局错误拦截器

  await app.listen(PORT);
  console.log(
    `服务运行于：http://127.0.0.1:${PORT}\n`,
    `文档地址:http://127.0.0.1:${PORT}${swApi}`,
  );
}
bootstrap();
