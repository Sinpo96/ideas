/*
 * @Description: combineReducers
 * @Author: Sinpo
 * @Date: 2019-09-19 23:40:10
 * @LastEditTime: 2019-09-21 19:19:46
 * @LastEditors: Please set LastEditors
 */
function combineReducers(reducers) {
    // 取key
    const reducerKeys = Object.keys(reducers);
    // 返回合并后的新的reducer函数
    return function combination(state = {}, action) {
        // 生成新的state
        const nextState = {};
        // 遍历执行所有的reducers，整合成一个新的state
        reducerKeys.map((val) => {
            const reducer = reducers[val];
            // 之前的key的state
            const previousStateForKey = state[val];
            // 执行分reducer，获取新的state
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[val] = nextStateForKey;
        });
        return nextState;
    }
}

module.exports = combineReducers;