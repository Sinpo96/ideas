const curry = function (fn, arr) {
    arr = arr || [];
    return function () {
        // 这一步是为了将 arguments 这个类数组对象转换成数组
        const currentArgs = [].slice.call(arguments);
        // 参数的连接
        arr = arr.concat(currentArgs);
        if (fn.length > arr.length) {
            // 说明参数还没收集全，继续收集
            return curry(fn, arr);
        } else {
            // 参数收集全了
            return fn.apply(this, arr);
        }
    }
}

const addCurry = curry(function(a, b, c) {
    return [a, b, c];
});

console.log(addCurry(1)(2)(3));
