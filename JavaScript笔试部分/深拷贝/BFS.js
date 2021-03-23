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
 * @desc 广度优先遍历的深拷贝
 * @param obj
 */
const deepCloneBFS = (obj) => {
	let res = [];
	let stack = [obj];
	while (stack.length) {
		
	}
	return res;
}

deepCloneBFS(obj);
