/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
	// 这题的解题思路再与把9宫格分成对应的块：行、列、盒子
	let rows = Array(board.length).fill(0).map(() => []);
	let columns = Array(board.length).fill(0).map(() => []);
	let boxs = Array(board.length).fill(0).map(() => []);
	for (let row = 0; row < board[0].length; row++) {
		for (let column = 0; column < board.length; column++) {
			// 这一步是为了计算box的位置，把整个盒子想象成9个小盒子，如果row = 6，j = 2，那么就是第二个盒子中，也就是Math.floor(6 / 3) + Math.floor(2 / 3) * 3 = 2
			const box = Math.floor(row / 3) + Math.floor(column / 3) * 3;
			const num = board[row][column];
			if (num === '.') {
				continue;
			}
			// 一次判断每个盒子中是否已有数据，如果已有，那么返回false，否则，返回true
			if (rows[row].includes(num) || columns[column].includes(num) || boxs[box].includes(num)) {
				return false;
			} else {
				rows[row].push(num);
				columns[column].push(num);
				boxs[box].push(num);
			}
		}
	}
	return true;
};

isValidSudoku([["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]]);
