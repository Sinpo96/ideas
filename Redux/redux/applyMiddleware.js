/*
 * @Description: 聚合中间件
 * @Author: your name
 * @Date: 2019-09-21 21:41:32
 * @LastEditTime: 2019-09-21 21:53:17
 * @LastEditors: Please set LastEditors
 */
const applyMiddleware = (...middlewares) => {
    /** 返回一个重写createStore的方法 */
    return function rewriteCreateStoreFunc(oldCreateStore) {
        /** 返回重写后新的createstore */
        return function newCreateStore(reducer, initState) {
            /** 1.生成store */
            const store = oldCreateStore(reducer, initState);
            /** 2.给每个middleware传一下store， 相当于const logger = loggerMiddleware(store) */
            const chain = middlewares.map(middleware => middleware(store));
            let dispatch = store.dispatch;
            /** 实现exception(time(logger(dispatch))) */
            chain.reverse().map((middleware) => {
                dispatch = middleware(dispatch);
            });
            /** 2.重写dispatch */
            store.dispatch = dispatch;
            return store;
        }
    }
}

module.exports = applyMiddleware;