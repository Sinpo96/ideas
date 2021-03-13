Function.prototype.call2 = function(context) {
    context = context || window;
    // this即为调用该call的函数
    context.fn = this;
    const args = [];
    for (let i = 0; i < arguments.length; i ++) {
        if (i > 0) {
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

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar.call2(foo, 'Sinpo', 23);
