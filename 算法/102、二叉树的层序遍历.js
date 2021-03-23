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
 * @return {number[][]}
 */
var levelOrder = function (root) {
	let queue = [];
	let res = [];
	if (!root) {
		return res;
	}
	queue.push(root);
	while (queue.length !== 0) {
		const queueLen = queue.length;
		res.push([]);
		for (let i = 0; i <= queueLen - 1; i++) {
			const node = queue.shift();
			res[res.length - 1].push(node.val);
			if (node.left) {
				queue.push(node.left);
			}
			if (node.right) {
				queue.push(node.right);
			}
		}
	}
	return res;
};
