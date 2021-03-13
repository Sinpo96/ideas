/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-30 09:25:43
 * @LastEditTime: 2019-09-05 01:51:51
 * @LastEditors: Please set LastEditors
 */
/** 注意，这里定义时不能使用箭头函数，如果使用，那么取不到调用这个bind2的方法 */
Function.prototype.bind2 = function(context) {
    const fn = this;
    // 取出参数
    const args = Array.from(arguments).slice(1);
    const bound = function () {
        // 如果是实例，那么就是new出来的，此时原本的bind的对象失效
        return fn.call(this instanceof bound ? this : context, ...args, ...arguments);
    }
    bound.prototype = Object.create(fn.prototype);
    return bound;
}

var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind2(foo, 'daisy');

var obj = new bindFoo('18');

console.log(obj.habit);
console.log(obj.friend);
