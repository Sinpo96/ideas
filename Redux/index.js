/*
 * @Description: In User Settings Edit
 * @Author: Sinpo
 * @Date: 2019-09-19 22:18:36
 * @LastEditTime: 2019-09-21 21:57:27
 * @LastEditors: Please set LastEditors
 */
const {
    createStore,
    combineReducers
} = require('./redux/index');
const counterReducer = require('./reducers/counterReducer');
const infoReducer = require('./reducers/infoReducer');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const exceptionMiddleware = require('./middlewares/exceptionMiddleware');
const applyMiddleware = require('./redux/applyMiddleware');

const reducer = combineReducers({
    counter: counterReducer,
    info: infoReducer
});

const store = applyMiddleware(
    loggerMiddleware,
    exceptionMiddleware
)(createStore)(reducer);

// 订阅事件
store.subscribe(() => {
    const state = store.getState();
    console.log(`${state.counter.count}`);
});

// 进行状态变更
store.dispatch({
    type: 'INCREMENT'
});