/* 第一版eq函数---这里只进行简单的类型相比较，复杂的对象用deepEq函数来比较 */
function eq(a, b) {
    /*先鉴别+0，-0  
        表现1
        console.log(+0 === -0); // true
        表现2
        (-0).toString() // '0'
        (+0).toString() // '0'
        1 / +0 // Infinity
        1 / -0 // -Infinity
        1 / +0 === 1 / -0 // false */
    if (a === b) {
        return a !== 0 || 1 / a === 1 / b;
    }
    /* typeof null属于object，提前退出函数 */
    if (a == null || b == null) {
        return false;
    }
    /* NaN不等于自身---这里规定NAN=NAN */
    if (a !== a) {
        return b !== b;
    }
    const type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b !== 'object') {
        return false;
    }

    return deepEq(a, b);
}

/* 开始深度判断 */
const toString = Object.prototype.toString;

function deepEq(a, b) {
    const className = toString.call(a);
    if (className !== Object.prototype.toString(b)) {
        // 说明数据类型就不同，return掉吧
        return false;
    }

    switch (className) {
        //正则
        case '[object RegExp]':
            // 字符串
        case '[object String]':
            // 利用强制类型转换的方式去判断
            return '' + a === '' + b;
        case '[]':
        default:
            break;
    }
}