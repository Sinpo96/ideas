/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
	let i = 0, j = 1;
	while (j < nums.length) {
		if (nums[i] !== 0) {
			i++;
		} else if (nums[i] === 0 && nums[j] !== 0) {
			[nums[i], nums[j]] = [nums[j], nums[i]];
			i++;
		}
		j++;
	}
	return nums;
};

moveZeroes([1, 2, 0]);
