Function.prototype._call = function (context) {
    // context 是调用 _call 方法的上下文
    context = context || window;
    // this 就是调用 _call 的函数
    context.fn = this;
    // 获取参数
    const args = [];
    for (let i = 0; i < arguments.length; i++) {
        if (i >= 1) {
            args.push(arguments[i]);
        }
    }
    const res = context.fn(...args);
    delete context.fn;
    return res;
}

const foo = {
    value: 1
}

function bar (name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar._call(foo, 'Sinpo', 23);
