<!--
 * @Author: nevin
 * @Date: 2022-01-19 16:13:27
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 15:47:40
 * @Description: 描述文件
-->
# 介绍
🎖🎖🎖 基于 Nest + Ts 二次封装的【Nest-base】。对Nest.js进行了整理，风格化，二次封装，分层，动态配置，JWT，MySQL，MongoDB，参数校验，swagger文档配置，让您避免繁琐的项目基础配置，更快的上手开发
## Running the app
### 安装依赖包
```bash
$ yarn or npm i
```
### 配置`.env` 环境变量
```
NODE_ENV = development
PORT = 7000
# 邮件配置
MAIL = <你的邮箱>
MAIL_AUTH_CODE = <邮箱秘钥>
# MongoDB配置
MONGO_URI = mongodb://username:password@1.1.1.3:27017/dbname
```
### 启动命令
```bash
# development
$ npm run start
$ npm run start:dev
$ npm run start:prod
```

### Test命令
```bash
# unit tests
$ npm run test
$ npm run test:e2e
$ npm run test:cov
```


## 业务
1. 用户的注册，注销
2. 授权登陆其他服务
3. weare发布订阅服务

# 构建过程


## config
1. 根目录/config目录：统一的配置文件
```bash
# 安装配置npm包
$ yarn add @nestjs/config
$ yarn add @hapi/joi // 验证包
$ yarn add -D @types/hapi__joi 
```
2. app.module.ts 文件全局配置
```ts
imports: [
    ConfigModule.forRoot({
       envFilePath: '.env', // 配置文件路径，也可以配置为数组如['/config/.env1','.env']。
       ignoreEnvFile: false, // 取消忽略配置文件，为true则仅读取操作系统环境变量，常用于生产环境
       isGlobal: true, // 作用于全局
       load: [mongoConfig, mailConfig], // 加载自定义配置项
       // 配置文件.env校验
      validationSchema:Joi.object({
        PORT:Joi.string().default('7000'),
        ENV:Joi.string()
        .valid('development','production','test','provision')
        .default('development')
      })
    }),
    ...
],
```
1. 使用（见数据库配置）
```ts
 useFactory: (configService: ConfigService) => configService.get('MONGO_CONFIG'),
// useFactory: (configService: ConfigService) => configService.get('MONGO_CONFIG.uri'), // 内部
 ```
## Mongo数据库和mongoose配置
1. 生成database模块 
```bash
# 安装配置npm包
$ yarn add @nestjs/mongoose
$ yarn add mongoose
```

2. 配置database模块 database.module.ts
```ts
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get('MONGO'),
        }),
        MongooseModule.forFeature([ // 挂载实体
            { name: IdSchemaName, schema: IdSchema },
            { name: UserSchemaName, schema: UserSchema }
        ]),
    ],
```

3. 业务模块使用
 - user.module.ts
 ```ts
  // 引入
  imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: UserSchemaName, schema: UserSchema }]),
    ],
```
- user.service.ts
 ```ts
  // 引入
  constructor(
    @InjectModel(UserSchemaName) private readonly userModel: Model<UserDocument>,
    private readonly idService: IdService,
  ) { }

  private async createUserId() {
    return await this.idService.createId('user', 10000);
  }
```


## swagger文档构建
1. 安装包
```bash
# 安装配置npm包
$ yarn add @nestjs/swagger
$ yarn add swagger-ui-express
```
2. 生成配置文件 _swagger.ts
3. 启动文件main.ts中 使用配置文件
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const { PORT, ENABLE_SWAGGER } = config.get('SERVER_CONFIG');
  if (ENABLE_SWAGGER) createSwagger(app); // 文档插件

  await app.listen(PORT);
}
```
## 全局拦截器（封装返回的数据）
1. 声明正确返回的接口
 文件 src/global/interface/response.interface.ts
 ```ts
 export interface NormalResponse {
    data: any, // 数据
    message: string, // 信息
    code: 0, // 自定义code
    url: string, // 错误的url地址
}
 ```
2. 增加拦截器
   文件 src/interceptor/transform.interceptor.ts
3. app使用拦截器 
  ```ts
  app.useGlobalInterceptors(
    new TransformInterceptor()
  );
  ```

## 全局过滤器(拦截报错，并返回封装的返回对象[请求错误，认证错误])
1. 声明请求错误返回的接口
   文件 src/global/interface/response.interface.ts
 ```ts
export interface ErrorResponse {
    data: any, // 数据
    message: string, // 信息
    code: string, // 自定义code
    url: string, // 错误的url地址
}
 ```
2. 增加过滤器
   文件 src/filters/http-exception.filter.ts
3. app使用过滤器
  ```ts
  app.useGlobalFilters(
    new AuthExceptionFilter(),
    new HttpExceptionFilter()
  );
  ```

## 参数过滤
1. 安装包
   ```bash
   yarn add class-validator   
   yarn add class-transformer 
   ```
2. 创建业务全局管道
   - 文件 src/server/validation.pipe.ts
3. 创建验证类dto
   ```ts
  export class CreateUsersDto {
    @IsEmail()
    readonly u_mail: string;

    @IsString({ message: '验证码必须是字符' })
    readonly code: string;

    @IsString({ message: '密码必须是字符' })
    password: string;
  }
   ```
4. 参数使用管道
   ```ts
   @Post()
    async create(
        @Body(new ParamsValidationPipe()) createUsersInfo: CreateUsersDto
    ) {
        console.log('============= createUsersInfo', createUsersInfo);
        return 'ok'
    }
   ```
## 增加和配置中间件
1. middleware文件夹内配置中间件
2. app.module.ts 内的app类实现NestModule接口的configure方法
   ```ts
  export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SignMiddleware)
      .exclude(
        { path: 'api/upload-files', method: RequestMethod.POST },
        'api/test',
      ) // 多个过滤多个参数
      .forRoutes('*')

      .apply(LogMiddleware)
      // .forRoutes('users');
      .forRoutes('*');
   }
  }
   ```
## jwt 验证（未完成）
1. 安装包
   ```bash
   $ yarn add passport passport-jwt passport-local @nestjs/passport @nestjs/jwt -S
   ```
2. 生成AuthModule认证模块
   ```ts
   @Global() // 使其在其他模块可用
  @Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '8h' }, // token 过期时效
        }),
        UserModule, // 引入用户模块
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy], // 添加auth服务和验证器
    exports: [AuthService],
  })
  export class AuthModule { }
   ```
3.  ...auth/jwt.strategy.ts 文件配置和守卫的验证方法
  ```ts
  {
     constructor(
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    /**
     * 被守卫调用的验证方法
     * @param payload 
     * @returns 
     */
    async validate(payload: TokenInfo): Promise<User> {
        const { mail } = payload;
        const userInfo: User = await this.userService.getUserInfoByMail(mail);

        if (!userInfo) {
            // throw new UnauthorizedException();
            throw new AppHttpException(errHttpBack.err_user_had);
        }
        return userInfo;
    }
  }
  ```
4. auth.service.ts 几个用到的验证方法
   - 生成加密密码
   - 验证密码
   - 生成token
   - 解析token

## 🙏🙏🙏 点个Star
如果您觉得这个项目还不错, 可以在 Github 上面帮我点个star, 支持一下作者 ☜(ﾟヮﾟ☜)