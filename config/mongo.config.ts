/*
 * @Author: nevin
 * @Date: 2022-01-20 11:05:02
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-21 15:41:38
 * @Description: mongo数据库配置文件
 */
export default () => ({
    MONGO_CONFIG: {
        uri: process.env.MONGO_URI,
    }
})