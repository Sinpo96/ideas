/** 浅拷贝 */
/** concat、slice、JSON.stringify(JSON.parse())等函数都是浅拷贝 */

function shallowCopy(obj) {
    if (typeof obj !== 'object') {
        return;
    }
    const newObj = obj instanceof Array ? [] : {};
    // 遍历
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            newObj[i] = obj[i];
        }
    }
    return newObj;
}

/** 深拷贝---遍历 */
function deepCopy(obj) {
    if (typeof obj !== 'object') {
        return;
    }
    const newObj = obj instanceof Array ? [] : {};
    // 遍历
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            // 主要区别就在这一步，如果是对象，那么继续递归
            newObj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
        }
    }
    return newObj;
}