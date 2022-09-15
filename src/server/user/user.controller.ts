/*
 * @Author: nevin
 * @Date: 2022-01-20 15:33:29
 * @LastEditors: nevin
 * @LastEditTime: 2022-09-15 18:34:20
 * @Description: 文件描述
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiBodyOptions,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { errHttpBack } from 'src/filters/http-exception.back-code';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { AuthService } from '../auth/auth.service';
import { TokenInfo } from '../auth/interfaces/auth.interfaces';
import { ParamsValidationPipe } from '../validation.pipe';
import { User } from './class/user.class';
import { CreateUsersDto, LoginUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ description: '注册用户（邮箱）' })
  @Post('/register')
  async register(
    @Body(new ParamsValidationPipe()) createUsersInfo: CreateUsersDto,
  ) {
    const { u_mail, password } = createUsersInfo;
    const user = await this.userService.getUserInfoByMail(u_mail);
    if (!!user) throw new AppHttpException(errHttpBack.err_user_had);

    const { password: hashPwd, salt } =
      this.authService.generatePassword(password); // 加密密码

    const userId = await this.userService.createUserId();

    const newUser = new User(<number>userId, u_mail, hashPwd, salt);

    return await this.userService.create(newUser);
  }

  @ApiOperation({ description: '用户登陆（邮箱）' })
  @Post('/login')
  async login(
    @Body(new ParamsValidationPipe()) loginInfo: LoginUserDto,
  ): Promise<string> {
    const { mail, password } = loginInfo;
    // 查询该用户
    const userInfo: User = await this.userService.getUserInfoByMail(mail);
    if (!userInfo) throw new AppHttpException(errHttpBack.err_user_had);

    const { salt: userSalt, password: userPassword } = userInfo;

    // 验证密码
    const validateRes: boolean = await this.authService.validatePassWord(
      userPassword,
      userSalt,
      password,
    );
    if (!validateRes) throw new AppHttpException(errHttpBack.err_user_had);

    return this.authService.generateToken(userInfo);
  }

  @ApiOperation({ description: '获取用户个人信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  async getMineInfo(@Headers() headers): Promise<User> {
    const tokenInfo: TokenInfo = await this.authService.decryptToken(
      headers.authorization,
    );

    return await this.userService.getUserInfoById(tokenInfo.user_id);
  }

  // @Delete('/:user_id')
  // async del() {
  // }

  @Put('/:user_id')
  async updata() {
    // return await this.userService.create();
  }

  @Get()
  async getUserList() {
    // return await this.userService.create({});
  }

  @Get('/:user_id')
  async getUserInfo() {
    // return await this.userService.getUserInfoById('1111');
  }
}
