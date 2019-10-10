Function.prototype._call = function (context) {
    context = context || window; // 存在则使用这个上下文对象，不存在则指向全局
    context.fn = this; // this为调用这个_call的方法
    const args = Array.prototype.slice.call(arguments, 1);
    const res = context.fn(...args);
    delete context.fn;
    return res;
}

const obj = {
    a: 'test'
}

// 这里不能使用箭头函数，不然this直接绑定到了全局上
function a() {
    console.log(this.a);
}

a._call(obj);