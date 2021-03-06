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
 * @return {number}
 */
var maxDepth = function (root) {
	if (!root) {
		return 0;
	} else {
		// 递归获取左边子节点的最大深度
		const left = maxDepth(root.left);
		// 递归获取右边子节点的最大深度
		const right = maxDepth(root.right);
		// 取两边的最大深度（每经过一层就 +1 ，这个 1 指的就是本层）
		return Math.max(left, right) + 1;
	}
};
