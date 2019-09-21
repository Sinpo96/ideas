/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 23:37:54
 * @LastEditTime: 2019-09-21 19:04:52
 * @LastEditors: Please set LastEditors
 */

let initState = { count: 0 };

module.exports = function counterReducer(state = initState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }
}