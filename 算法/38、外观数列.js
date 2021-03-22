/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
	if(n === 1) {
		return '1';
	}
	let str = countAndSay(n - 1);
	let i = 0, j = 0;
	let res = '';
	while(j < str.length) {
		// i负责同一字符的初始位置，j负责同一字符的终止位置
		if(str[i] !== str[j]) {
			res += `${j - i}${str[i]}`;
			i = j;
		}
		j++;
	}
	res += `${j - i}${str[i]}`;
	return res;
};

countAndSay(4)
