/*
347. Top K Frequent Elements
Medium https://leetcode.com/problems/top-k-frequent-elements/

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

Example 1: Input: nums = [1,1,1,2,2,3], k = 2 Output: [1,2]
Example 2: Input: nums = [1], k = 1 Output: [1]

Constraints:
    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    k is in the range [1, the number of unique elements in the array].
    It is guaranteed that the answer is unique.

*/


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const result = new Array(k).fill(Number.MIN_SAFE_INTEGER);
  const repetitions = {};
  let ops = 0;
  for (const num of nums) {
    ops++;
    repetitions[num] = repetitions[num] + 1 || 1;
  }
  console.log(repetitions);
  let minMaxValueIndex = 0;
  for (const [num, rep] of Object.entries(repetitions)) {
    ops++;
    // console.log(result,num,rep, minMaxValueIndex);
    if (result[minMaxValueIndex] === undefined || rep > repetitions[result[minMaxValueIndex]]) {
      result[minMaxValueIndex] = num;
      let minMaxValue = Number.MAX_SAFE_INTEGER;
      for (const [index, num] of Object.entries(result)) {
        ops++;
        if (num === undefined) {
          minMaxValueIndex = index;
          break;
        }

        // console.log(`result[${index}] = ${num}, rep ${repetitions[num]} < ${minMaxValue}`);
        if (repetitions[num] < minMaxValue) {
          minMaxValue = repetitions[num];
          minMaxValueIndex = index;
        }
      }
    }
  }
  console.log(`ops ${ops}`);
  return result;
};

const tests = [];
tests.push({ nums: [1], k: 1, exp: [1] });
tests.push({ nums: [1, 1, 1, 2, 2, 3], k: 2, exp: [1, 2] });
tests.push({ nums: [4, 1, -1, 2, -1, 2, 3], k: 2, exp: [-1, 2] });
for (const test of tests) {
  console.log(`Result of [${test.nums}] with k=${test.k}: [${topKFrequent(test.nums, test.k)}] == exp [${test.exp}]`);
}