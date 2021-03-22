/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
	// 中序遍历的意义是，每次都找出最大的数，如果能顺利进行下去，那么就是二叉查找树
	let stack = [];
	let pre = -Infinity;
	while(stack.length || root) {
		while(root) {
			stack.push(root);
			// 依次向左遍历每个小二叉树
			root = root.left;
		}
		console.log('stack为');
		console.log(stack);
		// 拿出最左边一个开始比较
		root = stack.pop();
		console.log('root为');
		console.log(root);
		if(root.val <= pre) {
			return false;
		}
		// 继承这个数值
		pre = root.val;
		console.log('pre为');
		console.log(pre);
		// 右节点一定比左节点大（当然前提是存在，不存在则继续从stack中取数据遍历）
		root = root.right;
		console.log('--------------------------');
	}
	return true;
};

/**
 * 日志：
 *  stack为
	[ [4,2,6,1,3,5,7], [2,1,3], [1] ]
	root为
	[1]
	pre为
	1
	--------------------------
	stack为
	[ [4,2,6,1,3,5,7], [2,1,3] ]
	root为
	[2,1,3]
	pre为
	2
	--------------------------
	stack为
	[ [4,2,6,1,3,5,7], [3] ]
	root为
	[3]
	pre为
	3
	--------------------------
	stack为
	[ [4,2,6,1,3,5,7] ]
	root为
	[4,2,6,1,3,5,7]
	pre为
	4
	--------------------------
	stack为
	[ [6,5,7], [5] ]
	root为
	[5]
	pre为
	5
	--------------------------
	stack为
	[ [6,5,7] ]
	root为
	[6,5,7]
	pre为
	6
	--------------------------
	stack为
	[ [7] ]
	root为
	[7]
	pre为
	7
	--------------------------
 */
