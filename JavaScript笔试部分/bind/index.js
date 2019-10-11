Function.prototype._bind = function (context) {
    const fn = this;
    // 获取除了用于绑定的上下文外的其它参数
    const args = Array.prototype.slice.call(arguments, 1);
    // 中转函数，如果直接fBound.prototype = fn.prototype,那么修改fBound的原型方法时也会改掉fn的
    const fNOP = function () {
    }
    const fBound = function () {
        // bindArgs指的是bind返回后的函数的传参
        const bindArgs = Array.prototype.slice.call(arguments);
        // 这里this instanceOf fBound中，fBound和fNOP并无区别
        // 原来fBound.prototype指向的是new fNOP生成的新bar实例对象
        // 而在将这个fBound进行new的过程中（即下面new bindFoo('18')）
        // 实例化出来的新的fBound对象的__proto__指向了作为构造函数fBound的prototype
        // 因为new的源码里有原型的链接 target.__proto__ = constru.prototype;
        // instanceof 的判断方式是 Left.__proto__ 不断循环往上找，直到找到与 Right.prototype 相等的情况，否则返回false
        // 既然他们是实例化关系，即new出来的，因此this和原来fBound符合instanceOf的判断
        // 还有一点，如果不是new出来的，这里的this应该指向全局
        return fn.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}

// --------------------------------------测试--------------------------------------

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

var bindFoo = bar._bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin