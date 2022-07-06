/*
78. Subsets https://leetcode.com/problems/subsets/
Medium 
Given an integer array nums of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1: Input: nums = [1,2,3] Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2: Input: nums = [0] Output: [[],[0]]

Constraints:
    1 <= nums.length <= 10
    -10 <= nums[i] <= 10
    All the numbers of nums are unique.
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {

    let subsets = [];

    function dfs(index, subset) {
        if (index === nums.length) {
            subsets.push([...subset]);
            return;
        }
        // Add the value
        subset.push(nums[index]);
        dfs(index + 1, subset);
        subset.pop();

        // Do not add anything
        dfs(index + 1, subset);

        // If we copy the subset to add the value, takes more time
        // const copy = [...subset];
        // copy.push(nums[index]);
        // dfs(index + 1, copy);
    }

    dfs(0, []);

    return subsets;
};

const array1 = [1, 2, 3];
console.log(`Test with ${subsets(array1).join('|')}]`);