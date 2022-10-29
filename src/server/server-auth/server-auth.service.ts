/*
 * @Author: nevin
 * @Date: 2022-10-29 23:07:26
 * @LastEditTime: 2022-10-29 23:25:18
 * @LastEditors: nevin
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { CryptoUtil } from 'src/util/crypto.util';
import { StrUtil } from 'src/util/str.util';
import { AuthService } from '../auth/auth.service';
import { ServerTokenInfoDto } from './dto/server-auth.dto';
import { ServerAuthBack } from './interfaces/server-auth.interface';

@Injectable()
export class ServerAuthService {
  constructor(private authService: AuthService) {}

  /**
   * @description:
   * @param {ServerTokenInfoDto} serverTokenInfo 其他服务传递过来的数据
   * @return {ServerAuthBack} 其他服务先用私钥解密aesKey, 用解密后的aesKey去解密得到用户信息
   */
  public async getUserByOtherServerToken(
    serverTokenInfo: ServerTokenInfoDto,
  ): Promise<ServerAuthBack> {
    const { token, server_tag } = serverTokenInfo;
    // 解token
    let tokenUserInfo = null;
    try {
      tokenUserInfo = await this.authService.decryptToken(token);
    } catch (error) {
      throw new AppHttpException(ErrHttpBack.err_err_token);
    }
    // TODO:补充用户信息
    // 获取该服务的公钥
    const publicKey = await this.getPublicKey(server_tag);
    if (!publicKey) throw new AppHttpException(ErrHttpBack.err_err_token);

    // 生成AES随机key
    let aesKey = StrUtil.getAuthCode(6);

    // 公钥加密AES的key
    aesKey = CryptoUtil.publicEncryptWithKey(publicKey, aesKey);

    // AES加密数据
    const backUserInfo = CryptoUtil.encryptByAES(JSON.stringify(tokenUserInfo));
    // 处理穿透参数（可不做或再返回去）

    const serverAuthBack: ServerAuthBack = { backUserInfo, aesKey };
    return serverAuthBack;
  }

  /**
   * 获取公钥
   * @param serverTag
   * @returns
   */
  private async getPublicKey(serverTag: string) {
    console.log('========== serverTag', serverTag);
    return '-------';
  }
}
