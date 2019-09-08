/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-30 09:25:43
 * @LastEditTime: 2019-09-05 01:51:51
 * @LastEditors: Please set LastEditors
 */
/** 注意，这里定义时不能使用箭头函数，如果使用，那么取不到调用这个bind2的方法 */
Function.prototype.bind2 = function(context) {
    /* context 此时是foo */
    const self = this;
    const args = Array.prototype.slice.call(arguments, 1);
    const middle = function() {};
    const fBound = function() {
        /** 判断一下 */
        return self.call(this instanceof self ? this : context, ...args, ...arguments);
    };
    middle.prototype = this.prototype; // 为了不影响原来的原型，做个中转
    fBound.prototype = new middle();
    return fBound;
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