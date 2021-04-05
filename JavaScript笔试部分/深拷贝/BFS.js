const obj = {
    a1: 1,
    a2: {
        b1: 1,
        b2: {
            c1: 1
        },
        b3: [124]
    },
};
obj.a3 = obj;

/**
 * @desc 对象判断
 * @param val
 * @returns {boolean}
 */
const isObject = val => Object.prototype.toString.call(val) === '[object Object]';

/**
 * @desc 数组判断
 * @param val
 * @returns {boolean}
 */
const isArray = val => Object.prototype.toString.call(val) === '[object Array]';

/**
 * 获取空值
 * @param val
 * @returns {{}}
 */
const getEmpty = (val) => {
    if (isObject(val)) {
        return {};
    }
    if (isArray(val)) {
        return [];
    }
    return val;
}

/**
 * @desc 广度优先遍历的深拷贝
 * @param obj
 */
const deepCloneBFS = (obj) => {
    // 使用map破解递归爆栈
    const map = new Map();
    // 队列保存待遍历的数据
    let queue = [];
    // 返回值的类型根据obj的类型来定
    let res = getEmpty(obj);
    // 如果相等，说明是同一个数据，不用遍历（例如传入1，getEmpty返回的也是1，这就不需要遍历了）
    if (res !== obj) {
        queue.push([obj, res]);
        map.set(obj, res);
    }
    while (queue.length) {
        // 取出第一个节点
        const [node, target] = queue.shift();
        for (let key in node) {
            if (!Object.prototype.hasOwnProperty.call(node, key)) {
                continue;
            }
            if (map.get(node[key])) {
                // 存在说明是循环引用了，直接返回对象就行了
                target[key] = map.get(node[key]);
                continue;
            }
            // 初始化target[key]
            target[key] = getEmpty(node[key]);
            // 引用类型
            if (isObject(node[key]) || isArray(node[key])) {
                queue.push([node[key], target[key]]);
                map.set(node[key], target[key]);
                continue;
            }
            // 走到这里的都是基础类型了，不会有引用，直接赋值
            target[key] = node[key];
        }
    }
    return res;
}

deepCloneBFS(obj);
