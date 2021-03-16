/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
	// 双指针使用前先排序
	nums1.sort((a, b) => a - b);
	nums2.sort((a, b) => a - b);
	let i = 0, j = 0;
	if (nums2.length > nums1.length) {
		// 始终保证长的在前面
		[nums1, nums2] = [nums2, nums1];
	}
	let res = [];
	while (i < nums1.length && j < nums2.length) {
		if (nums1[i] === nums2[j]) {
			// 相等则都向前走一步
			res.push(nums1[i]);
			i++;
			j++;
		} else if (nums1[i] > nums2[j]) {
			j++;
		} else {
			i++;
		}
	}
	return res;
};

intersect([4, 9, 5], [9, 4, 9, 8, 4])
