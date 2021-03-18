/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
	// lastIndexOf，如果第一次出现的等于最后一次出现的位置，那么就是唯一
	let hash = new Set();
	for (let i = 0; i < s.length; i++) {
		if (hash.has(s[i])) {
			continue;
		}
		if (i === s.lastIndexOf(s[i])) {
			return i;
		} else {
			hash.add(s[i]);
		}
	}
	return -1;
};

firstUniqChar('loveleetcode');
