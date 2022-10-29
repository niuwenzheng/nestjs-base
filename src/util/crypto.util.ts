/*
 * @Author: nevin
 * @Date: 2021-12-28 14:27:21
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 23:46:12
 * @Description: 加密模块
 */
import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
import * as fs from 'fs';
export class CryptoUtil {
  /**
   * @description: 从文件加载key
   * @param {string} file PEM文件
   * @return {string} PEM字符串
   */
  static loadKey(file: string): string {
    return fs.readFileSync(file, 'utf8'); // key实际上就是PEM编码的字符串:
  }

  //支持SHA1、SHA256、SHA512、MD5等
  static hmac(
    content: crypto.BinaryLike,
    secret: crypto.BinaryLike | crypto.KeyObject,
    algorithm = 'sha1',
  ): string {
    const crypto_hmac = crypto.createHmac(algorithm, secret);
    crypto_hmac.update(content);
    return crypto_hmac.digest('base64');
  }

  static hmacSha1(content: any, secret: any) {
    return CryptoJS.HmacSHA1(content, secret);
  }

  static md5(str: string): string {
    const crypto_md5 = crypto.createHash('md5');
    // 加入编码
    return crypto_md5.update(str, 'utf8').digest('hex');
  }

  static sha1(str: string): string {
    const crypto_sha1 = crypto.createHash('sha1');
    // 加入编码
    return crypto_sha1.update(str, 'utf8').digest('hex');
  }

  static toBase64(content: string): string {
    return Buffer.from(content).toString('base64');
  }

  static fromBase64(content: string): string {
    return Buffer.from(content, 'base64').toString();
  }

  /**
   * AES加密
   * @param data
   * @param key
   * @param iv
   * @returns
   */
  static encryptByAES(
    data: string,
    key = 'd9d8e0f5b061d74a',
    iv = '5efd3f6060e20330',
  ) {
    const keyStrArr = CryptoJS.enc.Utf8.parse(key);
    const ivStrArr = CryptoJS.enc.Latin1.parse(iv);
    const encrypted = CryptoJS.AES.encrypt(data, keyStrArr, {
      ivStrArr,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  /**
   * AES解密
   * @param data
   * @param key
   * @param iv
   * @returns
   */
  static decryptByAES(
    data: string,
    key = 'd9d8e0f5b061d74a',
    iv = '5efd3f6060e20330',
  ) {
    const keyStrArr = CryptoJS.enc.Utf8.parse(key);
    const ivStrArr = CryptoJS.enc.Latin1.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(data, keyStrArr, {
      iv: ivStrArr,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    try {
      const decryptedStr = CryptoJS.enc.Utf8.stringify(decrypted);
      if (!decryptedStr) {
        return null;
      }
      return decryptedStr.toString();
    } catch (err) {
      return null;
    }
  }

  static decryptString(data, key, iv) {
    if (data === null) return null;
    return this.decryptByAES(data, key, iv);
  }

  static encrypt(data: object, key: string, iv: string) {
    if (data === null || data === undefined) {
      return null;
    }

    return this.encryptByAES(JSON.stringify(data), key, iv);
  }

  static decrypt(data, key, iv) {
    let params = this.decryptString(data, key, iv);
    if (!params) return null;

    try {
      const jObject = JSON.parse(params);
      params = jObject;
    } catch (exception) {
      // console.log(exception);
    }

    return params;
  }

  /**
   * @description: 使用公钥加密
   * @param {string} publicKey 公钥
   * @param {string} message 加密的内容
   * @return {*}
   */
  static publicEncryptWithKey(publicKey: string, message: string): string {
    const enc_by_pub = crypto.publicEncrypt(
      publicKey,
      Buffer.from(message, 'utf8'),
    );
    return enc_by_pub.toString('hex');
  }

  /**
   * @description: 使用私钥解密
   * @param {string} prvKey
   * @param {string} message
   * @return {string}
   */
  static privateDecryptWithKey(prvKey: string, message: string): string {
    return crypto
      .privateDecrypt(prvKey, Buffer.from(message, 'hex'))
      .toString('utf8');
  }
}
