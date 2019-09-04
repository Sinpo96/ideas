/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 08:56:26
 * @LastEditTime: 2019-09-04 00:45:05
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
//         return res;
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

/**
 * 七、继承的几种方式
 *      1.原型链继承
 *      2.借用构造函数
 *      3.原型组合式继承（原型链+借用构造函数）
 *      4.原型式继承
 *      5.寄生式继承
 *      6.寄生组合式继承
 */
// 1.原型链继承
// function first() {
//     this.a = 'a';
//     this.firstArr = [];
// }

// function second() {
//     this.secondArr = [];
// }

// second.prototype = new first(); // new的原理就是原型的链接

// const third = new second(); // 这两个new second共用了first的原型方法，只有！！！引用类型的变量才会进行共享
// third.a = 'third';
// third.firstArr.push('fromThird'); // 实际上这里最终找到了first的原型方法
// const fourth = new second();
// // fourth.a = 'fourth';
// fourth.firstArr.push('fromFourth');
// console.log(fourth);

// 2.借用构造函数
// function first(name) {
//     this.name = name;
//     this.firstArr = [];
//     this.firstArr.push(name);
// }

// function second(name) {
//     first.call(this, name);
// }

// const third = new second('fromThird');
// const fourth = new second('fromFourth');
// console.log(fourth);

// 3.原型组合式继承（原型链+借用构造函数）
// function first(name) {
//     this.name = name;
//     this.firstArr = [];
//     this.firstArr.push(name);
// }

// function second(name) {
//     first.call(this, name); // 这一步借用构造函数，将构造函数中的对象和属性变为自身所拥有，自身有的便不会去原型链上进行查找
// }

// second.prototype = new first(); // 原型连接
// second.prototype.constructor = second; // 纠正下构造函数的指向

// const third = new second('fromThird');
// third.firstArr.push('haha');
// const fourth = new second('fromFourth');
// console.log(third);

// 4.原型式继承
// 基本思想：在 object() 函数内部，先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例，从本质上讲，object() 对传入的对象执行了一次浅拷贝。
// function object(o) {
//     const F = function() {

//     };
//     F.prototype = o;
//     return new F();
// }
// console.log(object({ a: 'first' }));

// 使用Object.create也能实现这种继承
// const first = {
//     a: 'first',
//     firstArr: []
// }

// const second = Object.create(first);
// second.firstArr.push('second');
// console.log(second);

// 5.寄生式继承
// function createAnother(original) {
//     const clone = Object(original); // 通过调用函数创建一个新的对象
//     clone.sayHi = () => console.log('hi');
//     return clone;
// }

// const person = {
//     name: 'first',
//     hobbies: ['second']
// }

// const person2 = createAnother(person);
// person2.sayHi();

// 6.寄生组合式继承
// ---------------------------------没懂---------------------------------------

/**
 * 八. 防抖
 * @description  每次触发都会重置时间
 */
// function debounce(func, wait, immediate) {
//     let timeout = null;
//     let result;

//     const debounced = function() {
//         // 存一下this
//         const self = this;

//         // 如果定时器存在，那么就清除定时器
//         if (timeout) clearTimeout(timeout);

//         // 判断是否传入立即执行的参数
//         if (immediate) {
//             // 如果定时器不存在
//             if (!timeout) {
//                 // 那么说明得立即执行一次(之所以写一个result，是因为如果函数有返回值，可能会需要)
//                 result = func.apply(self, arguments);
//             }
//             // 不管定时器存不存在，都得重置定时器，好让它重新计时(这种写法属于有头无尾型的)
//             timeout = setTimeout(() => {
//                 timeout = null;
//             }, wait);
//         } else {
//             // 这里是没设置立即执行一次的情况
//             // 那么就重新设置定时器就好了
//             timeout = setTimeout(() => {
//                 func.apply(self, arguments);
//             }, wait);
//         }
//         return result;
//     }

//     // 再给这个定时方法设定一个cancel方法用于取消防抖
//     debounced.cancel = function() {
//         clearTimeout(timeout);
//         timeout = null;
//     }

//     return debounced;
// }

/**
 * 九.节流
 * @description  规定的单位时间内只会执行一次
 * leading： false 表示禁用第一次执行
 * trailing: false 表示禁用停止触发的回调
 */
// function throttle(func, wait = 1000, options = {}) {
//     let timeout, context, args, result;
//     let previous = 0;
//     const { leading, trailing } = options;
//     const later = function() {
//         // 判断下是否需要第一次执行
//         previous = !leading ? 0 : +new Date();
//         timeout = null;
//         result = func.apply(context, args);
//     }

//     const throttled = function() {
//         const now = +new Date();
//         if (!previous && !leading) {
//             // 第一次进入且禁用第一次执行
//             previous = now;
//         }
//         // 计算一下还需要等待执行的时间
//         const remaining = wait - (now - previous);
//         context = this;
//         args = arguments;
//         if (remaining <= 0 || remaining > wait) {
//             // 说明得执行了

//             // 先清除下定时器
//             if (timeout) {
//                 clearTimeout(timeout);
//                 timeout = null;
//             }
//             previous = now;
//             result = func.apply(context, args);
//         } else if (!timeout && trailing) {
//             // 说明没有设置定时器且停止时触发一次func
//             timeout = setTimeout(later, remaining);
//         }
//         return result;
//     }

//     throttled.cancel = function() {
//         clearTimeout(timeout);
//         previous = 0;
//     }
//     return throttled;
// }

/**
 * 十：数组扁平化
 * 例：[1, [2, [3, [4]], 5]]
 */
// const toBeFlatten = [1, [2, [3, [4]], 5]];
// 1.ES6的flat方法（depth ：提取嵌套数组的结构深度，默认为1，使用Math.pow(2, 53) - 1这个js能表示的最大数就能去除所有嵌套层级）
// console.log(Array.prototype.flat.call(toBeFlatten, Math.pow(2, 53) - 1));

// 2.reduce(递归调用)
// function flatten(toBeFlatten) {
//     return toBeFlatten.reduce((acc, cur) => {
//         if (Array.isArray(cur)) {
//             return acc.concat(flatten(cur));
//         } else {
//             return acc.concat(cur);
//         }
//     }, []);
// }

// 3. 使用stach无限反嵌套多层嵌套数组
// function flatten(input) {
//     const stack = [...input];
//     const res = [];
//     while (stack.length) {
//         // 说明还没空
//         // pop取出最后一个值
//         const next = stack.pop();
//         if (Array.isArray(next)) {
//             // 如果还是数组，那就解构后再放进去
//             stack.push(...next);
//         } else {
//             res.push(next);
//         }
//     }
//     // 反转
//     return res.reverse();
// }
// console.log(flatten(toBeFlatten));

/**
 * 十一：数组去重
 */
// const toBeUniq = [1, 2, 3, 5, 3, 2];
// 1.ES6的new Set集合
// console.log(Array.from(new Set(toBeUniq)));

// 2.indexOf
// function uniq(Arr) {
//     const res = [];
//     Arr.map((val, index, arr) => {
//         if (index != arr.indexOf(val)) {
//             // 说明重复了
//         } else {
//             res.push(val);
//         }
//     });
//     return res;
// }

// 3.reduce
// function uniq(Arr) {
//     return Arr.reduce((acc, val) => {
//         if (!acc.includes(val)) {
//             return acc.concat(val);
//         } else {
//             return acc;
//         }
//     }, []);
// }

// 4.Map对象
// function uniq(Arr) {
//     const nMap = new Map();
//     Arr.map((val) => {
//         if (!nMap.has(val)) {
//             nMap.set(val, '');
//         }
//     });
//     return Array.from(nMap.keys());
// }
// console.log(uniq(toBeUniq));

/**
 * 十二：JSONP
 */
function JSONP({ url, params, callback }) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        window[callback] = function(data) {
                resolve(data);
                document.body.removeChild(script);
            }
            // 回到偶函数加在请求地址上
        params = {...params, callback };
        const arrs = [];
        for (const key in params) {
            arrs.push(`${key}=${params[key]}`);
        }
        script.src = `${url}?${arrs.join('&')}`;
        document.body.appendChild(script);
    });
}