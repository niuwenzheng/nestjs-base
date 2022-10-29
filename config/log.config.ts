/*
 * @Author: nevin
 * @Date: 2022-01-20 11:05:02
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-29 23:01:43
 * @Description: 远程日志模块配置文件
 */
export default () => ({
  LOG_CONFIG: {
    LOG_DB_OPEN: true,
    // LOG_DB_OPEN: process.env.NODE_ENV !== 'development' ? true : false,
    LABEL_NAME: 'xxxx',
    LOG_DB_URL: process.env.LOG_DB_URL || 'xxxx',
    LOG_DB_COL: process.env.LOG_DB_COL || 'logs',
  },
});
