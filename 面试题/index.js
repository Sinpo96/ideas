/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 08:56:26
 * @LastEditTime: 2019-08-10 18:42:32
 * @LastEditors: Please set LastEditors
 */
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

/**
 * 五：柯里化的实现
 */
// const curry = (fn, ...args) =>
//     args.length < fn.length ? (
//         (...arguments) => curry(fn, ...args, ...arguments)
//     ) : (
//         fn(...args)
//     );

/**
 * 六： 如何使得a == 1 && a == 2 && a == 3为true
 */
// ------ 第一种方法，使用对象的[Symbol.toPrimitive]接口和闭包，保存一个变量
// let a = {
//     [Symbol.toPrimitive]: function(hint) {
//         let i = 1;
//         return function() {
//             return i++;
//         }
//     }()
// }

// ------ 第二种方式，使用Object.defineproperty或者new Proxy()进行数据劫持
// Object.defineProperty(window, 'a', {
//     get: function() {
//         let i = 1;
//         // 之所以这里使用闭包，是因为这里的this指向了window
//         return function() {
//             return i++;
//         }
//     }()
// });
/* -------------------------------------------------------------------- */
// let a = new Proxy({}, {
//     i: 1,
//     get: function() {
//         return () => this.i++;
//     }
// });

// ------ 第三种方式，重写array的join方法，并利用隐式类型转换的方式将数组转为字符串，字符串与number比较时在进行转换
// const a = [1, 2, 3];
// a.join = a.shift;

// console.log(a == 1);
// console.log(a == 2);
// console.log(a == 3);