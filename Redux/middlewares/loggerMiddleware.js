/*
 * @Description: 日志中间件
 * @Author: Sinpo
 * @Date: 2019-09-21 21:13:34
 * @LastEditTime: 2019-09-21 21:22:22
 * @LastEditors: Please set LastEditors
 */
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('this state', store.getState());
    console.log('action', action);
    next(action);
    console.log('next state', store.getState());
}

module.exports = loggerMiddleware;