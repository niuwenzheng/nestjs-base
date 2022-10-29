/*
 * @Author: niuwenzheng
 * @Date: 2020-08-24 22:51:56
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-24 21:32:11
 * @Description: http业务错误返回map
 */
export interface ErrorHttpBack {
  errCode: string;
  message: string;
}

export enum ErrHttpBack {
  fail = 'fail',
  err_err_token = 'err_err_token',
  err_no_other_server = 'err_no_other_server',
  // ======== 权限相关 ========
  err_no_permission = 'err_no_permission',
  err_group = 'err_group',
  err_no_assigne_menber = 'err_no_assigne_menber',
  err_group_hasd = 'err_group_hasd',

  // ======= 用户相关 ========
  err_user_had = 'err_user_had',
  err_user_no_had = 'err_user_no_had',

  err_mail_code = 'err_mail_code',
  err_no_power_login = 'err_no_power_login',

  err_user_phone_repetition = 'err_user_phone_repetition',
  err_user_bpm_repetition = 'err_user_bpm_repetition',
  err_user_crm_repetition = 'err_user_crm_repetition',

  // ======= 值班相关 ========
  err_new_working = 'err_new_working',
  err_end_need_big_than_start = 'err_end_need_big_than_start',
  err_start_need_than_now = 'err_start_need_than_now',
  err_working_in_same_time = 'err_working_in_same_time',

  err_del_working_time = 'err_del_working_time',
  err_up_end_need_big_than_now = 'err_up_end_need_big_than_now',
  err_working_no_has = 'err_working_no_has',

  // ======== 团队相关 ========
  err_team_err_parent_team = 'err_team_err_parent_team',
  err_team_del_type = 'err_team_del_type',
  err_team_del_has_child = 'err_team_del_has_child',
  err_add_same_team = 'err_add_same_team',

  // ======== 站点相关 ========
  err_store_no_had = 'err_store_no_had',

  // ======== 门店相关 ========
  err_shop_is_had = 'err_shop_is_had',
  err_shop_no_had = 'err_shop_no_had',

  err_duplication = 'err_duplication',
}

export const ErrHttpBackMap: Map<string, ErrorHttpBack> = new Map([
  [ErrHttpBack.fail, { errCode: '1', message: '请求失败' }],
  // -------- 认证相关 ----------
  [
    ErrHttpBack.err_err_token,
    {
      errCode: '10010',
      message: 'token验证失败',
    },
  ],
  [
    ErrHttpBack.err_no_other_server,
    {
      errCode: '10011',
      message: '错误的服务请求',
    },
  ],
  // -------- 权限相关 ----------
  [
    ErrHttpBack.err_no_permission,
    {
      errCode: '20010',
      message: '无操作权限',
    },
  ],
  [
    ErrHttpBack.err_group,
    {
      errCode: '20011',
      message: '权限组有误',
    },
  ],
  [
    ErrHttpBack.err_no_assigne_menber,
    {
      errCode: '20012',
      message: '不能没有指定人',
    },
  ],
  [
    ErrHttpBack.err_group_hasd,
    {
      errCode: '20013',
      message: '该权限组已存在',
    },
  ],
  [
    ErrHttpBack.err_no_power_login,
    {
      errCode: '40010',
      message: '您无权登录',
    },
  ],
  [
    ErrHttpBack.err_user_had,
    {
      errCode: '40011',
      message: '用户已存在',
    },
  ],
  [
    ErrHttpBack.err_user_no_had,
    {
      errCode: '40012',
      message: '用户不存在',
    },
  ],

  [
    ErrHttpBack.err_user_phone_repetition,
    {
      errCode: '40013',
      message: '用户手机号重复',
    },
  ],
  [
    ErrHttpBack.err_user_bpm_repetition,
    {
      errCode: '40014',
      message: '用户bpm账号重复',
    },
  ],
  [
    ErrHttpBack.err_user_crm_repetition,
    {
      errCode: '40015',
      message: '用户crm账号重复',
    },
  ],
  // ======== 值班相关 ========
  [
    ErrHttpBack.err_new_working,
    {
      errCode: '50010',
      message: '新的值班信息错误',
    },
  ],
  [
    ErrHttpBack.err_end_need_big_than_start,
    {
      errCode: '50011',
      message: '值班的开始时间必须小于结束时间',
    },
  ],
  [
    ErrHttpBack.err_start_need_than_now,
    {
      errCode: '50012',
      message: '值班的开始时间必须大于当前时间',
    },
  ],
  [
    ErrHttpBack.err_working_in_same_time,
    {
      errCode: '50013',
      message: '同一人不能存在同一时间的值班',
    },
  ],
  [
    ErrHttpBack.err_del_working_time,
    {
      errCode: '50014',
      message: '不能刪除已开始的值班',
    },
  ],
  [
    ErrHttpBack.err_up_end_need_big_than_now,
    {
      errCode: '50015',
      message: '修改值班结束时间必须大于当前时间',
    },
  ],
  [
    ErrHttpBack.err_working_no_has,
    {
      errCode: '50016',
      message: '值班不存在',
    },
  ],
  // ======== 团队相关 ========
  [
    ErrHttpBack.err_team_err_parent_team,
    {
      errCode: '70010',
      message: '错误的上级部门',
    },
  ],
  [
    ErrHttpBack.err_team_del_type,
    {
      errCode: '70011',
      message: '不能删除该类型的团队',
    },
  ],
  [
    ErrHttpBack.err_team_del_has_child,
    {
      errCode: '70012',
      message: '不能含有下级团队的部门',
    },
  ],
  [
    ErrHttpBack.err_add_same_team,
    {
      errCode: '70013',
      message: '同一上级团队下不能有同名团队',
    },
  ],
  // ======== 站点相关 ========
  [
    ErrHttpBack.err_store_no_had,
    {
      errCode: '80001',
      message: '站点不存在',
    },
  ],
  // ======== 门店相关 ========
  [
    ErrHttpBack.err_shop_is_had,
    {
      errCode: '90001',
      message: '门店已存在',
    },
  ],
  [
    ErrHttpBack.err_shop_no_had,
    {
      errCode: '90002',
      message: '门店不存在',
    },
  ],
  [
    ErrHttpBack.err_duplication,
    {
      errCode: '90003',
      message: '底部链接数据重复',
    },
  ],
]);
