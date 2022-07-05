/*
Easy: https://leetcode.com/problems/maximum-depth-of-binary-tree/
Given the root of a binary tree, return its maximum depth.
A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
Example 1: Input: root = [3,9,20,null,null,15,7] Output: 3
Example 2: Input: root = [1,null,2] Output: 2

Constraints: The number of nodes in the tree is in the range [0, 104]. -100 <= Node.val <= 100

*/

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

  // return depthRecursive(root, 1);
  return depthIterative(root);

  function depthRecursive(node, depth) {
    if (node == null) {
      return depth - 1;
    }
    const maxLeft = depthRecursive(node.left, depth + 1);
    const maxRight = depthRecursive(node.right, depth + 1);

    return Math.max(maxLeft, maxRight);
  }

  function depthIterative(root) {
    if (root == null) {
      return 0;
    }

    const stack = [[root, 1]];
    let maxDepth = 0;
    while (stack.length > 0) {
      const [node, level] = stack.pop();
      // console.log(`Checking node ${node.val} at level ${level}`);
      maxDepth = Math.max(maxDepth, level);
      if (node.left != null) {
        stack.push([node.left, level + 1]);
      }
      if (node.right != null) {
        stack.push([node.right, level + 1]);
      }
    }
    return maxDepth;
  }

};
