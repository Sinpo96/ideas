/*
 * @Description: createStore
 * @Author: Sinpo
 * @Date: 2019-09-19 22:24:49
 * @LastEditTime: 2019-09-21 21:41:06
 * @LastEditors: Please set LastEditors
 */
function createStore(reducer, initState = {}) {
    let state = initState;
    let listeners = [];
    /** 订阅 */
    function subscribe(listener) {
        listeners.push(listener);
    }

    function dispatch(action) {
        state = reducer(state, action);
        /* 改变状态时通知订阅的内容事件 */
        listeners.map((val) => {
            val();
        });
    }

    /** 获取state */
    function getState() {
        return state;
    }

    /** 注意！只修改了这里，用一个不匹配任何计划的type来获取每个reducer中的初始值 */
    dispatch({ type: Symbol() });

    /** 暴露方法 */
    return {
        subscribe,
        dispatch,
        getState,
    }
}

module.exports = createStore;