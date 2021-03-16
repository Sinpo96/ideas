/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
	for (let i = digits.length - 1; i >= 0; i--) {
		if (digits[i] != 9) {
			digits[i]++;
			return digits;
		} else {
			// 大于9说明是两位数
			digits[i] = 0;
		}
	}
	// 除非数组元素都是9，不然不会走到这里
	digits = [1, ...digits];
	return digits;
};

plusOne([9]);
