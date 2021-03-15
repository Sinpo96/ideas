// 核心思想：
//
// 1. 设立双指针`i=0`和`j=1`
// 2. 如果`i==j`，相等的情况下，那么`i`不动（为了等下找到不一样的时，`i+1`然后替换），`j++`
// 3. 如果`i≠j`，不相等的情况下，那么`i+1`，然后`nums[i(注意这个i已经加过1了)]=nums[j]`，`j++`
// 4. `j`越界结束
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
	let size = nums.length;
	let i = 0, j = 1;
	while(j < size) {
		if(nums[i] !== nums[j]) {
			i++;
			nums[i] = nums[j];
		}
		j++;
	}
	return i + 1;
};

console.log(removeDuplicates([1,1,2]))
