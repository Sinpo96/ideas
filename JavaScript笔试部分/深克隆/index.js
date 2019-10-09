// 先写一个判断类型的方法
const isType = (obj, type) => {
    if (typeof obj !== 'object') {
        return false;
    }
    let flag = false;
    const toString = Object.prototype.toString.call(obj);
    switch (type) {
        case 'Array':
            flag = toString === '[object Array]';
            break;
        case 'Date':
            flag = toString === '[object Date]';
            break;
        case 'RegExp':
            flag = toString === '[object RegExp]';
            break;
        default:
            flag = false;
            break;
    }
    return flag;
}

// 再写一个辅助提取正则属性的方法
const getRegExp = (re) => {
    let flags = '';
    // 提取全局匹配 g
    if (re.global) {
        flags += 'g';
    }
    // 提取区分大小写 i
    if (re.ignoreCase) {
        flags += 'i';
    }
    // 提取多行匹配 m
    if (re.multiline) {
        flags += 'm';
    }
    return flags;
}

const clone = (parent) => {
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];
    const _clone = (parent) => {
        // 排除null的情况
        if (typeof parent === null) {
            return null;
        }
        // 排除不是对象的情况
        if (typeof parent !== 'object') {
            return parent;
        }
        let child, proto;
        // 如果是数组
        if (isType(parent, 'Array')) {
            child = [];
        } else if (isType(parent, 'Date')) {
            // 如果是时间对象，则先获取时间戳，再将时间戳转化为时间对象
            child = new Date(parent.getTime());
        } else if (isType(parent, 'RegExp')) {
            // 如果是正则对象，分别使用source获取匹配内容，使用辅助函数获取匹配属性
            child = new RegExp(parent.source, getRegExp(parent));
            if (parent.lastIndex) {
                child.lastIndex = parent.lastIndex;
            }
        } else {
            // 如果有new的情况，则截取原型
            proto = Object.getPrototypeOf(parent);
            child = Object.create(proto);
        }

        // 是否有循环引用
        const index = parents.indexOf(parent);

        if (index != -1) {
            // 说明有循环引用
            return children[index];
        }

        parents.push(parent);
        children.push(child);

        // 开始递归
        for (const i in parent) {
            child[i] = _clone(parent[i]);
        }

        return child;
    }

    return _clone(parent);
}

// 测试一下
function person(pname) {
    this.name = pname;
}

const Messi = new person('Messi');

function say() {
    console.log('hi');
}

const oldObj = {
    a: say,
    c: new RegExp('ab+c', 'i'),
    d: Messi,
};

// oldObj.b = oldObj;


const newObj = clone(oldObj);
console.log(newObj.a, oldObj.a); // [Function: say] [Function: say]
console.log(newObj.b, oldObj.b); // { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] } { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] }
console.log(newObj.c, oldObj.c); // /ab+c/i /ab+c/i
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: person] [Function: person]