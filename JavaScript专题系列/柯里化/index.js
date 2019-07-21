/* 递归的思想！！！一层层收集参数 */

/* 第一版的柯里化函数 */
// 其实这个函数只起到了收集参数的作用
const sub_curry = function(fn) {
    const args = [].slice.call(arguments, 1); // 先取出除了方法之外的其他入参
    console.log(args);
    return function() {
        // 进入到这里时已经是下一次调用时的函数了
        // 在这里捕获入参
        const newArgs = args.concat([].slice.call(arguments)); // 这个arguments已经不包含方法了，全都只是参数了
        console.log(newArgs);
        // 这里的this与上一层中的this都是指向window，没必要用self来存储全局对象
        return fn.apply(this, newArgs);
    }
}

/**
 * @description: 来写真正的柯里化函数
 * @param {func} fn 传入的fangfa
 * @param {num} length 传入的参数长度，若不传则按方法的参数个数算
 * @return: 
 */
const curry = function(fn, length) {
    length = length || fn.length; // fun.length表示fun的参数的个数
    return function() {
        // 如果入参的个数小于函数需要的参数个数
        if (arguments.length < length) {
            const combined = [fn].concat(Array.prototype.slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
        } else {
            // 走到这里说明参数数量相等，那么可以直接执行了
            return fn.apply(this, arguments);
        }
    }
}

const addCurry = curry(function(a, b, c) {
    return [a, b, c];
});

addCurry(1)(2)(3);