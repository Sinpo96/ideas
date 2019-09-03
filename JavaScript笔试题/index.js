/*
 * @Description: JavaScript 笔试题
 * @Author: your name
 * @Date: 2019-09-02 09:07:13
 * @LastEditTime: 2019-09-03 22:59:07
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
// const debounce = ({ func = null, immediate = false, interval = 1000 }) => {
//     if (!func) {
//         return;
//     }
//     let timer = null;
//     return function() {
//         const self = this;
//         if (timer) {
//             clearTimeout(timer);
//         }
//         if (immediate && timer === null) {
//             func.apply(self, arguments);
//         }
//         timer = setTimeout(() => {
//             func.apply(self, arguments);
//             clearTimeout(timer);
//             timer = null;
//         }, interval);
//     }
// }

/**
 * @description: 节流函数
 * @param: 
 */
// 存一下基础变量（ previous： 上一次的执行时间）
// 形参： options， 包含两个参数： heading（ 开始执行一次） trailing（ 结束时执行一次）
// 节流函数
// 取now
// 判断previous是否为0（ 是否第一次进入）， 判断是否设置第一次执行； 如果第一次进入且第一次不执行， 才会将previous置为now
// 计算还需等待的执行时间（ wait - (now - previous)） 是否大于wait或者小于0（ 第一次的情况）， 如果是， 那么该执行了
// 如果不是
// 是否timeout为空且设置了结束执行一次， 走进这里的情况是上次执行完但还没到下一次的执行时间， 才会进这里来判断一下（ 这里还得分两种情况， 一种是有头无尾的设置， 这里将定时器置为null， 这样执行完就不会再出发了； 另一种是有头有尾， 那么这里得重设定时器， 但是这会导致cancel方法失效， 想解决失效， 可以新加字段判断是否执行过cancel方法）
// const throttle = ({ head = false, tail = false, func = undefined, wait = 1000 }) => {
//     let previous = 0;
//     let timer;
//     return function() {
//         const self = this;
//         const now = +new Date();
//         if (previous == 0) {
//             if (head === true) {
//                 // 先执行一次
//                 func.apply(self, arguments);
//                 previous = now;
//             } else {
//                 previous = now;
//             }
//         } else {
//             const needWait = (now - previous);
//             if (needWait >= wait) {
//                 // 说明该执行了
//                 func.apply(self, arguments);
//                 previous = now;
//                 if (timer) {
//                     clearTimeout(timer);
//                     timer = null;
//                 }
//             } else if (tail === true) {
//                 timer = setTimeout(() => {
//                     func.apply(self, arguments);
//                     previous = now;
//                 }, wait);
//             }
//         }
//     }
// }