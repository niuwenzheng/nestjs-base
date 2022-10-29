/*
 * @Author: nevin
 * @Date: 2022-01-20 11:05:02
 * @LastEditors: nevin
 * @LastEditTime: 2022-10-24 22:50:46
 * @Description: mysql数据库配置文件
 */
export default () => ({
  MYSQL_CONFIG: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number.parseInt(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USERNAME || 'user_name',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'db_name',
    synchronize: process.env.NODE_ENV === 'development', // true 会反向同步表，如加入数据库中没有的新字段
    logging: process.env.NODE_ENV !== 'production', // 生产模式关闭
  },
});
