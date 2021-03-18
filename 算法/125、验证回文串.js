/**
 * @desc 验证字符是否是数字或小写字母
 * @param str
 * @returns {boolean}
 */
const isAlphabet = (str) => {
	const unicode = str.codePointAt(0);
	// 英文字母和数字皆可
	return (unicode >= 97 && unicode <= 122) || (unicode >= 48 && unicode <= 57);
}

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
	s = s.toLocaleLowerCase();
	let i = 0, j = s.length - 1;
	while (i < j) {
		if (s[i] === ' ' || !isAlphabet(s[i])) {
			i++;
		} else if (s[j] === ' ' || !isAlphabet(s[j])) {
			j--;
		} else if (isAlphabet(s[i]) && isAlphabet(s[j])) {
			// 都是英文字母，可以比较
			if (s[i] === s[j]) {
				i++;
				j--;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	return true;
};

isPalindrome("A man, a plan, a canal: Panama");
