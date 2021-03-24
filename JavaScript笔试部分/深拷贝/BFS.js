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
	// 使用map保存引用破解递归爆栈
	const map = new Map();
	let res = getEmpty(obj);
	let stack = [];
	if (res !== obj) {
		stack.push([obj, res]);
		map.set(obj, res);
	}
	while (stack.length) {
		const [node, tar] = stack.shift();
		for (let i in node) {
			if (!Object.prototype.hasOwnProperty.call(node, i)) {
				continue;
			}
			if (map.get(node[i])) {
				tar[i] = map.get(node[i]);
				continue;
			}
			tar[i] = getEmpty(node[i]);
			// 如果是引用类型就继续
			if (isObject(node[i]) || isArray(node[i])) {
				// 是对象继续遍历，不是就放入最终的对象中
				stack.push([node[i], tar[i]]);
				map.set(node[i], tar[i]);
				continue;
			}
			tar[i] = node[i];
		}
	}
	return res;
}

deepCloneBFS(obj);
