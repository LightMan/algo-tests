/*
102. Binary Tree Level Order Traversal
Medium https://leetcode.com/problems/binary-tree-level-order-traversal/

Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Example 1: Input: root = [3,9,20,null,null,15,7] Output: [[3],[9,20],[15,7]]
Example 2: Input: root = [1] Output: [[1]]
Example 3: Input: root = [] Output: []

Constraints:
    The number of nodes in the tree is in the range [0, 2000].
    -1000 <= Node.val <= 1000
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
 * @return {number[][]}
 */
var levelOrder = function (root) {

  if (root === null) {
    return [];
  }

  const queue = [root];
  const trasversed = processQueue(queue);
  return trasversed;

  function processQueue(queue) {
    const trasversed = [];
    let level = [];
    let nextQueue = [];
    while (queue.length > 0) {    // L1: Q [9,20]  l[] Nq[] T[ [3] ]
      const node = queue.shift();   // L2: Q[] L[] NQ[] T[ [3], [9, 20], [15,7]]
      // Add children to queue
      level.push(node.val);
      if (node.left !== null) {
        nextQueue.push(node.left);
      }
      if (node.right !== null) {
        nextQueue.push(node.right);
      }

      if (queue.length === 0) {
        // Jump to next level
        queue = nextQueue;
        trasversed.push(level); // Add level to solution
        level = []; // Init data
        nextQueue = [];
      }
    }
    return trasversed;
  }

};