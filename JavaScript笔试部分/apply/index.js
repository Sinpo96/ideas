Function.prototype._apply = function (context) {
    context = context || window; // 存在则使用这个上下文对象，不存在则指向全局
    context.fn = this; // this为调用这个_call的方法
    const [args] = Array.prototype.slice.call(arguments, 1); // 因为slice返回的也是个数组，所以先解构一下
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