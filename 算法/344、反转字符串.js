/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
	const len = s.length - 1;
	for(let i = 0; i <= Math.floor(len / 2); i++) {
		[s[i], s[len - i]] = [s[len - i], s[i]];
	}
};
