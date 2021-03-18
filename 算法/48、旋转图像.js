/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
	// 先上下翻转，再沿对角线调换
	// 1.上下翻转
	matrix.reverse();
	// 2.对角线调换
	for (let i = 0; i < matrix.length; i++) {
		// 只遍历上半区的数据
		for (let j = i + 1; j < matrix.length; j++) {
			[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
		}
	}
	return matrix;
};

rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
