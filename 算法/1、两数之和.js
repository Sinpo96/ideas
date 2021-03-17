/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
	// 使用hash表作为数据存放，再查找hash表中有没有当前元素的互补值
	let hashMap = new Map();
	for (let i = 0; i < nums.length; i++) {
		if (hashMap.has(target - nums[i])) {
			return [hashMap.get(target - nums[i]), i];
		} else {
			hashMap.set(nums[i], i);
		}
	}
	return [];
};

twoSum([2, 7, 11, 15], 9)
