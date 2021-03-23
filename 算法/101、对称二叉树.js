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
var isSymmetric = function(root) {
	// 深度优先遍历
	const check = (left, right) => {
		if(!left && !right) {
			return true;
		}
		if(left && right) {
			// 关键步骤：两边对称，所以left.left应该与right.right进行比较
			return left.val === right.val && check(left.left, right.right) && check(left.right, right.left);
		}
		return false;
	}

	return check(root.left, root.right);
};
