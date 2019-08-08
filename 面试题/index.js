/*
 * 一.New的实现原理 
 *  1.创建一个空对象，构造函数中的this指向这个空对象
 *  2.这个新对象被执行[[原型]]连接
 *  3.执行构造函数方法，属性和方法被添加到this引用的对象中
 *  4.如果构造函数中么有返回其他对象，那么返回this，即创建的这个新对象，否则，返回构造函数中返回的对象
 */
// function _new() {
//     // 创建一个空对象
//     let target = {};
//     // 取出构造函数及参数
//     let [constructor, ...args] = [...arguments];
//     // 这个新对象被执行[[原型]]连接
//     target.__proto__ = constructor.prototype;
//     // 构造函数中的this指向这个空对象
//     let res = constructor.apply(target, args);
//     // 如果构造函数中么有返回其他对象
//     if (res && (typeof res == 'object' || typeof res == 'function')) {
//         return constructor;
//     }
//     return target;
// }

/**
 * 二. 深拷贝(没懂原方法为什么要用hash)
 * 1.如果是基本数据类型， 直接返回
 * 2.如果是 RegExp 或者 Date 类型， 返回对应类型
 * 3.如果是复杂数据类型， 递归。
 * 4.考虑循环引用的问题
 */
// function deepClone(obj) {
//     /* 正则 */
//     if (obj instanceof RegExp) {
//         return new RegExp(obj);
//     }
//     /* 时间格式 */
//     if (obj instanceof Date) {
//         return new Date(obj);
//     }
//     /* null或者其他不是对象类型的基本数据类型 */
//     if (obj === null || typeof obj !== 'object') {
//         return obj;
//     }

//     /**
//      * 如果obj是数组， 那么 obj.constructor是[Function: Array]
//      * 如果obj是对象， 那么 obj.constructor是[Function: Object]
//      */
//     const t = new obj.constructor(); // new一个新的对象出来（使用原型链上的构造函数）
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             t[key] = deepClone(obj[key]);
//         }
//     }
//     return t;
// }

/**
 * 三、call的模拟实现
 */
// Function.prototype._call = function(context) {
//     const [, args] = [...arguments]; // 取出参数
//     context = context || window; // 上下文
//     context.fn = this; // 这个this指的是调用_call的函数方法
//     const res = context.fn(args);
//     delete context.fn;
//     return res;
// }

/**
 * 四、apply的模拟实现
 */
// Function.prototype._apply = function(context) {
//     const [, args] = [...arguments]; // 取出参数
//     context = context || window; // 上下文
//     context.fn = this; // 这个this指的是调用_call的函数方法
//     let res = undefined;
//     if (!args) {
//         /* 说明无入参,如果直接调用...args[0]会报错 */
//         res = context.fn();
//     } else {
//         res = context.fn(...args);
//     }
//     delete context.fn;
//     return res;
// }