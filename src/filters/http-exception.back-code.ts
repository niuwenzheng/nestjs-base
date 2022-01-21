/*
 * @Author: niuwenzheng
 * @Date: 2020-08-24 22:51:56
 * @LastEditors: nevin
 * @LastEditTime: 2021-05-26 18:40:06
 * @Description: http业务错误返回map
 */
export const errHttpBackMap = new Map();

// -------- 认证相关 ----------
errHttpBackMap.set('10010', 'token验证失败');
errHttpBackMap.set('10011', '错误的服务请求');
errHttpBackMap.set('10012', '邮箱验证码错误');

// -------- 服务间通讯相关 ----------
errHttpBackMap.set('40010', '您无权登录');
errHttpBackMap.set('40011', '用户已存在');

// -------- 书籍相关 ----------
errHttpBackMap.set('20010', '您无权操作该书籍');
errHttpBackMap.set('20011', '上一章还未完成');

// -------- 名片相关 ----------
errHttpBackMap.set('30010', '名片数量达到上限');

export const errHttpBack = {
  err_err_token:  '10010',
  err_no_other_server:  '10011',
  err_mail_code:  '10012',

  err_no_power_login: '40010',
  err_user_had: '40011',
  
  err_no_book_power: '20010',
  err_up_section_no_over: '20011',

  err_max_card_number: '30010',

};
