// 42 https://leetcode.com/problems/trapping-rain-water/
/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1: Input: height = [0,1,0,2,1,0,1,3,2,1,2,1] Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

Example 2: Input: height = [4,2,0,3,2,5] Output: 9
*/

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {

  if (height.length <= 2) {
    return 0;
  }

  let totalWater = 0;
  const maxIndex = getMaxIndex(height);
  // console.log(`maxIndex ${maxIndex}`);
  // From left to maxIndex
  let index = 0;
  let lastTopHeight = 0;
  while (index < maxIndex) {
    const curHeight = height[index];
    totalWater += Math.max(lastTopHeight - curHeight, 0);
    // console.log(`Index ${index} Total water is ${totalWater}`);
    lastTopHeight = Math.max(lastTopHeight, curHeight);
    index += 1;
  }

  // From right to maxIndex
  index = height.length - 1;
  lastTopHeight = 0;
  while (index > maxIndex) {
    const curHeight = height[index];
    totalWater += Math.max(lastTopHeight - curHeight, 0);
    // console.log(`Index ${index} Total water is ${totalWater}`);
    lastTopHeight = Math.max(lastTopHeight, curHeight);
    index -= 1;
  }

  return totalWater;

  function getMaxIndex(height) {
    let max = -Infinity;
    let maxIndex = 0;
    for (let i = 0; i < height.length; i++) {
      if (height[i] > max) {
        max = height[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  }
};

const test1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
const test2 = [4, 2, 0, 3, 2, 5];

const tests = [test1, test2];
tests.forEach(test => {
  console.log(`test ${test} has ${trap(test)} water`);
});

const test3 = [];
for (let x = 100000; x > 90000; x--) {
  test3.push(x);
  test3.push(0);
}
console.log(`Starting test 3`);
console.log(`test3 has ${trap(test3)} water`);
