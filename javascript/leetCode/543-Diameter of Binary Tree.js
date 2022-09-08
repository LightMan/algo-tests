/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {

  if (root == null) {
    return 0;
  }

  let maxDiameter = 0;
  calcDiameter(root);
  return maxDiameter;

  function calcDiameter(node) {
    if (node == null) {
      return -1;
    }
    const leftDiameter = calcDiameter(node.left);
    const rightDiameter = calcDiameter(node.right);

    maxDiameter = Math.max(maxDiameter, leftDiameter + rightDiameter + 2);

    return Math.max(leftDiameter, rightDiameter) + 1;
  }

};
