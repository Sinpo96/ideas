/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 23:38:33
 * @LastEditTime: 2019-09-21 19:05:49
 * @LastEditors: Please set LastEditors
 */

let initState = {
    name: '',
    description: '',
};

module.exports = function InfoReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.description
            }
        default:
            return state;
    }
}