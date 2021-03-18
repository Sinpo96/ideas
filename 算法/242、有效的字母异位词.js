/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
	if(s.length !== t.length) {
		return false;
	}
	// 使用array存储unicode字符的数据
	const hash = Array(26).fill(0);
	for(let i = 0; i < s.length; i++) {
		// 在26的字母的对应位置上++
		hash[s.codePointAt(i) - 'a'.codePointAt(0)]++;
	}
	for(let i = 0; i < t.length; i++) {
		// 因为可能有多个重复字符，所以这里每出现一次减一次
		hash[t.codePointAt(i) - 'a'.codePointAt(0)]--;
		if(hash[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
			// 说明出现了未知字符了
			return false;
		}
	}
	return true;
};

isAnagram("anagram", "nagaram");
