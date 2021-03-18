/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
	// 不断取余，数字累加
	let res = 0;
	while (x !== 0) {
		const last = x % 10;
		res = res * 10 + last;
		x = x > 0 ? Math.floor(x / 10) : Math.ceil(x / 10);
	}
	if (res > Math.pow(2, 31) - 1 || res < -Math.pow(2, 31)) {
		return 0;
	}
	return res;
};

reverse(1563847412);
