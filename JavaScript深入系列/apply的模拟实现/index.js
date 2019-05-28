Function.prototype.apply2 = function(context) {
    var context = context || window;
    context.fn = this; // 先取出方法，接下来取参数
    var args = Array.prototype.slice.call(arguments, 1);
    let res = undefined;
    if (args.length == 0) {
        // 这是没有传参的情况
        res = context.fn();
    } else {
        res = context.fn(...args[0]);
    }
    delete context.fn;
    return res;
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.apply2(null);

console.log(bar.apply2(obj, ['kevin', 18]));