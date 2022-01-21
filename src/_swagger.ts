/*
 * @Author: nevin
 * @Date: 2021-12-21 18:05:12
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 11:22:55
 * @Description: 文档插件
 */
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function createSwagger(app: INestApplication) {
    app.enableCors(); // 处理跨域

    // const version = require('../package.json').version || ''; // 获取同项目一致版本号
    const version = '1.0.0' || ''; // 获取同项目一致版本号
    
    const options = new DocumentBuilder()
        .setTitle('Nestjs 接口文档')
        .setVersion(version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
}
