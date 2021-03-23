/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
	/**
	 * @param {integer} n Total versions
	 * @return {integer} The first bad version
	 */
	return function (n) {
		let start = 1, end = n;
		while (start < end) {
			let mid = Math.floor((end + start) / 2);
			if (isBadVersion(mid)) {
				// 说明是坏的，还得往前找
				end = mid;
			} else {
				// 是好的，往后找
				start = mid + 1;
			}
		}
		return start;
	};
};
