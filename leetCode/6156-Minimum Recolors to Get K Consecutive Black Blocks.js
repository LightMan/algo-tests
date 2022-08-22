/*
6156-Minimum Recolors to Get K Consecutive Black Blocks
Easy: https://leetcode.com/contest/biweekly-contest-85/problems/minimum-recolors-to-get-k-consecutive-black-blocks/

You are given a 0-indexed string blocks of length n, where blocks[i] is either 'W' or 'B', representing the color of the ith block. The characters 'W' and 'B' denote the colors white and black, respectively.
You are also given an integer k, which is the desired number of consecutive black blocks.
In one operation, you can recolor a white block such that it becomes a black block.
Return the minimum number of operations needed such that there is at least one occurrence of k consecutive black blocks.

Example 1:
Input: blocks = "WBBWWBBWBW", k = 7
Output: 3
Explanation:
One way to achieve 7 consecutive black blocks is to recolor the 0th, 3rd, and 4th blocks
so that blocks = "BBBBBBBWBW". 
It can be shown that there is no way to achieve 7 consecutive black blocks in less than 3 operations.
Therefore, we return 3.

Example 2:
Input: blocks = "WBWBBBW", k = 2
Output: 0
Explanation:
No changes need to be made, since 2 consecutive black blocks already exist.
Therefore, we return 0.

 Constraints:
    n == blocks.length
    1 <= n <= 100
    blocks[i] is either 'W' or 'B'.
    1 <= k <= n

*/

/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {

  if (blocks.length < k) return 0;

  let countW = 0;
  let minW = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === "W") countW++;

    if (i + 1 >= k) {
      minW = Math.min(minW, countW);
      if (minW === 0) return 0;
      if (blocks[i + 1 - k] === "W") countW--;
    }
  }
  return minW;
};

const tests = [];
tests.push({ blocks: "WBB", k: 2, exp: 0 });
tests.push({ blocks: "WBW", k: 2, exp: 1 });
tests.push({ blocks: "WWW", k: 3, exp: 3 });
tests.push({ blocks: "WBBWWBBWBW", k: 7, exp: 3 });
tests.push({ blocks: "WBWBBBW", k: 2, exp: 0 });
tests.forEach(test => {
  console.log(`Result of ${test.blocks} k:${test.k} = ${minimumRecolors(test.blocks, test.k)} === ${test.exp}`);
});
