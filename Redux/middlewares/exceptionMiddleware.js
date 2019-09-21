/*
 * @Description: 异常记录中间件
 * @Author: your name
 * @Date: 2019-09-21 21:16:24
 * @LastEditTime: 2019-09-21 21:28:20
 * @LastEditors: Please set LastEditors
 */
const exceptionMiddleware = (store) => (next) => (action) => {
    try {
        next(action);
        console.log('走进来了');
    } catch (error) {
        console.error('错误报告：', error);
    }
}

module.exports = exceptionMiddleware;