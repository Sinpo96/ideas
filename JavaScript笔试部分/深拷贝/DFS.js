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
 * @desc 深度度优先遍历的深拷贝
 * @param obj
 */
const deepCloneDFS = (obj) => {
    const map = new Map();
    let queue = [];
    let res = getEmpty(obj);

    if (res !== obj) {
        // 不等于说明obj是引用类型，需要遍历
        queue.push([obj, res]);
        map.set(obj, res);
    }

    while (queue.length) {
        // 取出第一个节点
        const [node, target] = queue.shift();
        const temporaryQueue = [];
        for (let key in node) {
            if (!Object.prototype.hasOwnProperty.call(node, key)) continue;
            // 破解循环引用
            if (map.get(node[key])) {
                target[key] = map.get(node[key]);
                continue;
            }
            target[key] = getEmpty(node[key]);
            // 如果是引用类型
            if (isArray(node[key]) || isObject(node[key])) {
                // 与广度优先遍历的区别就是这一行----------------------------------------------------
                // 广度是每一层遍历完再去遍历下一层；深度是只要这层有，就一直遍历
                temporaryQueue.push([node[key], target[key]]);
                map.set(node[key], target[key]);
                continue;
            }
            // 走到这里都是基础类型了，直接赋值吧
            target[key] = node[key];
        }
        // 使用临时队列按顺序储存此次的待遍历数据，形成  先序优先遍历：根->左->由
        queue = [...temporaryQueue, ...queue];
    }

    return res;
}

deepCloneDFS(obj);
