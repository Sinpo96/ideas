// 这里不能使用箭头函数，不然取不到arguments
function _new() {
    let target = {};
    // 获取构造函数及参数
    const constru = Array.prototype.shift.call(arguments); // 取出构造函数
    // 执行原型的连接
    target.__proto__ = constru.prototype;
    const res = constru.apply(target, arguments);
    if (!res || typeof res !== 'object' || typeof res !== 'function') {
        return target;
    }
    return res;
}

const a = (name) => {
    console.log('a');
    console.log(name);
}

const b = _new(a, 'sinpo');