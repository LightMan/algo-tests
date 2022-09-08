/*
 297.Serialize and Deserialize Binary Tree Hard

 Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
 Design an algorithm to serialize and deserialize a binary tree.There is no restriction on how your serialization / deserialization algorithm should work.You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
 Clarification: The input / output format is the same as how LeetCode serializes a binary tree.You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

 */

/**
 * Definition for a binary tree node.
 **/


/**
* Definition for a binary tree node.
**/

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}


/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (root == null) {
    return "";
  }

  const queue = [root];
  let result = "";
  let countEmpty = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    if (node != null) {
      result += node.val;
      if (node.left) {
        queue.push(node.left);
      } else {
        queue.push(null);
        countEmpty += 1;
      }
      if (node.right) {
        queue.push(node.right);
      } else {
        queue.push(null);
        countEmpty += 1;
      }
      if (countEmpty < queue.length) {
        result += ";";
      } else {
        // console.log(result);
        return result;
      }
    } else {
      countEmpty -= 1;
      if (countEmpty < queue.length) {
        result += ";";
      }
    }
  }
  // console.log(result);
  return result;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (data.length == 0) {
    return null;
  }

  const nodes = data.split(';');
  const root = new TreeNode(nodes.shift());
  const queue = [];
  let isLeft = true;
  let parent = root;
  nodes.forEach(nodeStr => {
    // console.log(`Processing ${nodeStr} parent ${parent ? parent.val : -1} queue ${queue}`);
    let current = null;
    if (nodeStr.length > 0) {
      current = new TreeNode(nodeStr);
      queue.push(current);
    }
    if (isLeft) {
      parent.left = current;
    } else {
      parent.right = current;
      if (queue.length > 0) {
        parent = queue.shift();
        // console.log(`New parent is ${parent ? parent.val : -1}`);
      }
    }
    isLeft = !isLeft;
  });
  //console.log(`${root.left.val} ${root.right.val}`);

  return root;
};

// Your Codec object will be instantiated and called as such:
// var ser = Codec()
// var deser = Codec()
// deser.deserialize(ser.serialize(root))
