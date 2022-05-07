/*
 * @Author: nevin
 * @Date: 2021-12-28 14:27:21
 * @LastEditors: nevin
 * @LastEditTime: 2021-12-28 15:44:26
 * @Description: 加密模块
 */
import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';

export class CryptoUtil {
  constructor(parameters) {}

  //支持SHA1、SHA256、SHA512、MD5等
  static hmac(
    content: crypto.BinaryLike,
    secret: crypto.BinaryLike | crypto.KeyObject,
    algorithm: string = 'sha1',
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

  static encryptByAES(data: string, key: string, iv: string) {
    key = key || 'd9d8e0f5b061d74a';
    iv = iv || '5efd3f6060e20330';

    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Latin1.parse(iv);
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  static decryptByAES(data: string, key: string, iv: string) {
    key = key || 'd9d8e0f5b061d74a';
    iv = iv || '5efd3f6060e20330';

    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Latin1.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
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
      let jObject = JSON.parse(params);
      params = jObject;
    } catch (exception) {
      // console.log(exception);
    }

    return params;
  }
}
