/** 
55. Jump Game
Medium

You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

**/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {

  if (nums.length === 1) {
    return true;
  }

  // Go to the last index
  const endPosition = nums.length - 1;

  // Recursive solution :()
  // Time: O(n) Space: O(n)
  for (let compareIndex = endPosition - 1; compareIndex >= 0; compareIndex--) {
    const previousJump = nums[compareIndex];
    if (previousJump >= endPosition - compareIndex) {
      return canJump(nums.slice(0, compareIndex + 1));
    }
  }
  return false;
};

const test1 = [2, 3, 1, 1, 4];
const test2 = [3, 2, 1, 0, 4];
const tests = [test1, test2];
tests.forEach(test => console.log(`canJump(${test}) = ${canJump(test)}`));
