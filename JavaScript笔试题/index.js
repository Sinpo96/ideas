/*
 * @Description: JavaScript 笔试题
 * @Author: your name
 * @Date: 2019-09-02 09:07:13
 * @LastEditTime: 2019-09-02 09:55:50
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: 防抖函数
 * @param:  head {Boolean} 刚进入是否触发一次
 * @param:  func {function} 调用的方法
 * @param:  interval {num}  间隔
 */
// 存一下this
// 如果定时器存在， 那么清除
// 判断是否传入立即执行参数
// 传入立即执行参数的情况
//      判断定时器是否为null， 如果是， 那么得立即执行一次
//      设置定时器
// 如果没设立即执行
//      设置定时器
const debounce = ({ func = null, immediate = false, interval = 1000 }) => {
    if (!func) {
        return;
    }
    let timer = null;
    return function() {
        const self = this;
        if (timer) {
            clearTimeout(timer);
        }
        if (immediate && timer === null) {
            func.apply(self, arguments);
        }
        timer = setTimeout(() => {
            func.apply(self, arguments);
            clearTimeout(timer);
            timer = null;
        }, interval);
    }
}