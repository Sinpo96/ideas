/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
	if (strs === null || strs.length === 0) {
		return '';
	}
	let pres = strs[0];
	let i = 1;
	while (i < strs.length) {
		if (pres === '' || !pres) return '';
		if (strs[i].indexOf(pres) === -1 || strs[i].indexOf(pres) !== 0) {
			// 找不到，字符缩减一位
			i = 1;
			pres = pres.slice(0, pres.length - 1);
		} else {
			i++;
		}
	}
	return pres;
};

longestCommonPrefix(["c", "acc"])
