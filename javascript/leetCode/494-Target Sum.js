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
*/

// Recursive way
/** 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  return findTargetSumWaysIterativeBest(nums, target);
  //return findTargetSumWaysIterative(nums, target);
  // return findTargetSumWaysRecursive(nums, target);
};

var findTargetSumWaysIterativeBest = function (nums, target) {
  const sum = nums.reduce((prev, cur) => prev + cur);
  const mid = (sum + target) >> 1;
  const dp = new Array(mid + 1).fill(0);
  let totalOps = 0;
  dp[0] = 1;
  nums.forEach(num => {
    for (let i = mid; i >= num; i--) {
      totalOps += 1;
      dp[i] += dp[i - num];
    }
  });
  console.log(`Total ops ${totalOps}`);
  return dp[mid];
};

var findTargetSumWaysRecursive = function (nums, target) {
  let totalOps = 0;
  const result = dfs(0, 0);
  console.log(`Total ops ${totalOps}`);
  return result;

  function dfs(total, index, memo = {}) {
    totalOps += 1;
    if (index === nums.length) {
      return total === target ? 1 : 0;
    }

    if ([index, total] in memo) {
      return memo[[index, total]];
    }
    const result = dfs(total + nums[index], index + 1, memo) + dfs(total - nums[index], index + 1, memo);
    memo[[index, total]] = result;
    return result;
  }
};


var findTargetSumWaysIterative = function (nums, target) {
  let totalOps = 0;
  let dp = { 0: 1 }; // [] is a valid result for 0
  nums.forEach((num, index) => {
    const nextIteration = {};
    for (const currentSumStr in dp) {
      const currentSum = Number.parseInt(currentSumStr);
      totalOps += 2;
      const addPrev = dp[currentSum] || 1;
      nextIteration[currentSum - num] = nextIteration[currentSum - num] + addPrev || addPrev;
      nextIteration[currentSum + num] = nextIteration[currentSum + num] + addPrev || addPrev;
    }
    dp = nextIteration;
  });

  console.log(`Total ops ${totalOps}`);
  return dp[target] || 0;
};

const tests = [];
tests.push({ nums: [1, 1, 1, 1, 1], target: 3, expected: 5 });
tests.push({ nums: [1, 2, 1], target: 4, expected: 1 });
tests.push({ nums: [1, 0], target: 1, expected: 2 });
tests.push({ nums: [1], target: 1, expected: 1 });
tests.push({ nums: [1, 2], target: 3, expected: 1 });
tests.push({ nums: [1, 2, 3, 4], target: 0, expected: 2 });
tests.push({ nums: [8, 48, 11, 47, 26, 12, 16, 39, 38, 50, 21, 12, 34, 1, 28, 1, 3, 9, 17, 50], target: 3, expected: 6317 });
tests.forEach(test => {
  console.log(`Sum ways with [${test.nums}] target ${test.target} == ${findTargetSumWays(test.nums, test.target)} == ${test.expected}?`);
});
