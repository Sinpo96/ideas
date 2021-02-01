const obj = {
    a1: 1,
    a2: {
        b1: 1,
        b2: {
            c1: 1
        }
    },
};
obj.a3 = obj;

/**
 * @desc 查找是否已经存在相同的数据了
 */
function find (uniqueList, data) {
    for (let index = 0; index < uniqueList.length; index++) {
        if (uniqueList[index].source === data) {
            return uniqueList[index];
        }
    }
    return null;
}

// 破解递归爆栈（使用栈循环的方式 --- 将对象想象成一棵二叉树，进行广度优先遍历）
function clone (obj) {
    // 保存引用数据的数组，用于查找引用并将引用赋值给对应的key
    const uniqueList = [];

    // 深拷贝的结果
    let root = {};

    // 数据栈
    let loopList = [
        {
            parent: root,
            key: undefined,
            data: obj
        }
    ];

    while (loopList.length) {
        const loopData = loopList.pop();
        const { parent, key, data } = loopData;

        let res = parent;
        if (typeof key !== 'undefined') {
            // 将此次遍历的 key 对应的 value 置空初始化
            parent[key] = {};
            res = parent[key];
        }

        /* --- 查找是否有相同的数据 --- */
        const uniqueData = find(uniqueList, data);
        if (uniqueData) {
            parent[key] = uniqueData.target;
            continue;
        }

        /* --- 走到这里说明没有匹配的，push进去 --- */
        uniqueList.push({
            source: data,
            // 这里的 res 是 parent[key]，使用 res 是因为 res 预先判断了 key 的 undefined 的情况
            target: res
        });

        for (const objKey in data) {
            if (Object.prototype.hasOwnProperty.call(data, objKey)) {
                const tempData = data[objKey];
                if (typeof tempData === 'object') {
                    // 还得循环，进栈一位
                    loopList.push({
                        parent: res,
                        key: objKey,
                        data: tempData
                    });
                } else {
                    res[objKey] = tempData;
                }
            }
        }
    }

    return root;
}

const res = clone(obj);
console.log(res);
console.log(res === res.a3);
