/*
39. Combination Sum https://leetcode.com/problems/combination-sum/
Medium

Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.
It is guaranteed that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

Example 1: Input: candidates = [2,3,6,7], target = 7 Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

Example 2: Input: candidates = [2,3,5], target = 8 Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3: Input: candidates = [2], target = 1 Output: []

Constraints:
    1 <= candidates.length <= 30
    1 <= candidates[i] <= 200
    All elements of candidates are distinct.
    1 <= target <= 500
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {

  function dfs(numbersArray, startIndex, totalSum) {

    let stop = false;
    for (let index = startIndex; index < candidates.length && !stop; index++) {
      const num = candidates[index];
      const sum = totalSum + num;
      // console.log(`array ${totalSum} [${numbersArray}]+${num} with sum ${sum} == ${target}`);
      if (sum === target) {
        const aSolution = [...numbersArray];
        aSolution.push(num);
        solutions.push(aSolution);
        // console.log(`Solution found ${aSolution}`);
        stop = true;
      } else if (sum < target) {
        numbersArray.push(num);
        dfs(numbersArray, index, sum);
        numbersArray.pop();
      } else {
        // sum > target
        // console.log(`Passed ${sum} > ${target}`);
        stop = true;
      }
    }
  }

  let solutions = [];
  candidates.sort((a, b) => a - b);
  dfs([], 0, 0);

  return solutions;
};

/* Another sol

var combinationSum = function (candidates, target) {
  const nums = candidates.sort((a, b) => a - b); // O(n*log(n))
  const solutions = [];
  nums.forEach((num, index) => dfs(index, 0, []));
  return solutions;

  function dfs(index, sum, sol) {
    if (index >= nums.length) {
      return;
    }
    const totalSum = sum + nums[index];
    if (totalSum > target) {
      return;
    }
    sol.push(nums[index]);
    if (totalSum === target) {
      solutions.push(sol);
      return;
    }
    for (let i = index; i < nums.length; i++) {
      dfs(i, totalSum, [...sol]);
    }
  }

};
*/