/*
494. Target Sum
Medium https://leetcode.com/problems/target-sum/

You are given an integer array nums and an integer target.
You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.
    For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

Example 1: Input: nums = [1,1,1,1,1], target = 3 Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

Example 2: Input: nums = [1], target = 1 Output: 1

Constraints:
    1 <= nums.length <= 20
    0 <= nums[i] <= 1000
    0 <= sum(nums[i]) <= 1000
    -1000 <= target <= 1000

*//**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {

  let memo = {};
  let totalOps = 0;
  const result = dfs(0, 0);
  console.log(`Total ops ${totalOps}`);
  console.log(memo);
  return result;

  function dfs(total, index) {
    totalOps += 1;
    if (index === nums.length) {
      return total === target ? 1 : 0;
    }

    if (memo[[-total, index]] !== undefined) {
      console.log(`Memo[${total},${index}]=${memo[[-total, index]]} num[${index}]=${nums[index]} total=${total}`);
      return memo[[-total, index]];
    }

    const result = dfs(total + nums[index], index + 1) + dfs(total - nums[index], index + 1);
    memo[[total, index]] = result;
    console.log(`Adding Memo[${total},${index}]=${memo[[total, index]]} num[${index}]=${nums[index]} total=${total}`);
    return result;
  }

};

const tests = [];
// tests.push({ nums: [1, 0], target: 1, expected: 2 });
tests.push({ nums: [1, 1, 1, 1, 1], target: 3, expected: 5 });
tests.push({ nums: [1, 2, 3, 4], target: 0, expected: 2 });
tests.push({ nums: [1], target: 1, expected: 1 });
// tests.push({ nums: [8, 48, 11, 47, 26, 12, 16, 39, 38, 50, 21, 12, 34, 1, 28, 1, 3, 9, 17, 50], target: 3, expected: 6317 });
tests.forEach(test => {
  console.log(`Sums to ${test.target} with ${test.nums} is ${findTargetSumWays(test.nums, test.target)} == ${test.expected}`);
});