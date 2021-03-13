Function.prototype._apply = function (context) {
    context = context || window;
    context.fn = this;
    // 因为apply的入参是一个数组，所以需要进行数组的解构
    const [args] = Array.from(arguments).slice(1);
    const res = context.fn(...args);
    delete context.fn;
    return res;
}

const obj = {
    a: 'test'
}

// 这里不能使用箭头函数，不然this直接绑定到了全局上
function a(arr) {
    console.log(this.a);
    console.log(arr);
}

a._apply(obj, ['sinpo']);
