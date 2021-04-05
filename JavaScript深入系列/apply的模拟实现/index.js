Function.prototype._apply = function () {
    // arguments[0] 是它的上下文
    const context = arguments[0];
    context.fn = this;
    // 收集参数
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
