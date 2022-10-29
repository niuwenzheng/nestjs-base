/*
 * @Author: nevin
 * @Date: 2022-10-19 23:01:53
 * @LastEditTime: 2022-10-29 21:06:46
 * @LastEditors: nevin
 * @Description:
 */
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as moment from 'moment';
import * as md5 from 'md5';

import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { ResOrgData } from 'src/interceptor/transform.interceptor';
import { AuthService } from '../auth/auth.service';
import { ParamsValidationPipe } from '../validation.pipe';
import { NewUser } from './class/user.class';
import {
  GetUserListDto,
  InitAddUsersDto,
  LoginWithMailDto,
  ResetUserPasswordDto,
} from './dto/user.dto';
import { UserService } from './user.service';
import { User } from 'src/db-mysql/entities/user.entity';
import { Session } from 'src/db-mysql/entities/session.entity';
import { UserSessionService } from './userSession.service';
import { TokenReq } from '../auth/interfaces/auth.interfaces';
import { AuthGuard } from '@nestjs/passport';
import { HttpTags } from 'src/global/enum/all.enum';

const INIT_CODE = '_init';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userSessionService: UserSessionService,
  ) {}

  @ApiOperation({ description: '初始化项目:创建超级管理员用户' })
  @Post('_int')
  // @ResOrgData()
  async createSuperUser(
    @Body(new ParamsValidationPipe()) addUserInfo: InitAddUsersDto,
  ) {
    const { init_code, user_name, mail, password } = addUserInfo;
    if (init_code !== INIT_CODE) return new AppHttpException(ErrHttpBack.fail); // 验证初始码密码

    // 库里已有超级管理员数据驳回
    const hasOneUser = await this.userService.checkHadOneUser();
    if (hasOneUser) return new AppHttpException(ErrHttpBack.fail);

    const userId = `US${moment().valueOf()}`;
    const newUser = new NewUser(userId, mail, user_name || '超级管理员');
    const { password: hashPwd, salt } = this.authService.generatePassword(
      md5(password),
    ); // 加密密码

    const userInfo = await this.userService.createNewUser(newUser, {
      password: hashPwd,
      salt,
    });
    return userInfo;
  }

  @ApiOperation({ description: '重置密码' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('password/reset')
  async resetUserPassword(
    @Body(new ParamsValidationPipe()) body: ResetUserPasswordDto,
  ) {
    const { user_id, password } = body;
    const userInfo = this.userService.getUserInfoById(user_id);
    if (!userInfo) return new AppHttpException(ErrHttpBack.fail); // 验证初始码密码

    const { password: hashPwd, salt } = this.authService.generatePassword(
      md5(password),
    );

    return this.userService.resetPassword(user_id, hashPwd, salt);
  }

  @ApiOperation({ description: '登录' })
  @Post('login/mail')
  async loginByMail(
    @Body(new ParamsValidationPipe()) loginInfo: LoginWithMailDto,
  ): Promise<{ token: string }> {
    const { mail } = loginInfo;
    const password =
      loginInfo.api_tag === HttpTags.DOC
        ? md5(loginInfo.password)
        : loginInfo.password;

    const userInfo: User = await this.userService.getUserInfoByMail(mail);
    if (!userInfo) throw new AppHttpException(ErrHttpBack.err_user_no_had);

    const userSessionInfo: Session =
      await this.userSessionService.getUserSessionInfoByUserId(
        userInfo.user_id,
      );

    // 验证密码
    const validateRes: boolean = await this.authService.validatePassWord(
      userSessionInfo.password,
      userSessionInfo.salt,
      password,
    );

    if (!validateRes)
      throw new AppHttpException(ErrHttpBack.err_no_power_login);

    const token = await this.authService.generateToken(userInfo);

    return { token };
  }

  @ApiOperation({ description: '获取用户列表' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserList(
    @Req() tokenReq: TokenReq,
    @Query(new ParamsValidationPipe()) getUserListDto: GetUserListDto,
  ) {
    console.log('========= tokenReq.tokenInfo', tokenReq.tokenInfo.user_id);
    return this.userService.getUserList(getUserListDto);
  }
}
