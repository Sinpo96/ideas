/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
	if(needle === '') {
		return 0;
	}
	if (needle.length > haystack.length) {
		return -1;
	}
	let i = 0, j = 0;
	let index = 0, currentLen = 0;
	while(i < haystack.length && j < needle.length) {
		if (haystack[i] === needle[j]) {
			// 进入比较模式
			if (currentLen === 0) {
				index = i;
			}
			currentLen++;
			i++;
			j++;
		} else {
			if (currentLen > 0) {
				// 字符不相等，重置数据
				i = i - currentLen;
				currentLen = 0;
				j = 0;
			}
			i++;
		}
	}
	return currentLen > 0 && needle.length === currentLen ? index : -1;
};

strStr("mississippi", "issipi");
