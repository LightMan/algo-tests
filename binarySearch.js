// { Driver Code Starts
// Initial Template for javascript

'use strict';

/**
 * @param {number[]} arr
 * @param {number} n
 * @param {number} k
 * @returns {number}
*/

class Solution {

  binarysearchRecursive(arr, target, start, end) {
    if (arr.length === 0) {
      return -1;
    }

    if (start > end) {
      return -1;
    }

    let middle = Math.floor((start + end) / 2);
    // console.debug(`Chequeando ${arr} middle pos ${middle} = ${arr[middle]}`);
    if (arr[middle] === target) {
      // console.debug(`Encontrado en posición ${middle}`);
      return middle;
    } else if (target < arr[middle]) {
      // Target could be in the first half
      return this.binarysearchRecursive(arr, target, start, middle - 1);
    } else {
      // Target could be in the second half
      return this.binarysearchRecursive(arr, target, middle + 1, end);
    }
  }

  binarysearchIterative(arr, target) {
    let startIndex = 0;
    let endIndex = arr.length - 1;

    while (startIndex <= endIndex) {
      const middleIndex = Math.floor((endIndex + startIndex) / 2);
      const middleValue = arr[middleIndex];

      //  console.log(`checking mid ${middleIndex}[${arr[middleIndex]}] == ${k}`);
      if (middleValue === target) {
        return middleIndex;
      } else if (middleValue > target) {
        // k is before middleIndex, or does not exist.
        endIndex = middleIndex - 1;
      } else {
        // k is after middleIndex, or does not exist.
        startIndex = middleIndex + 1;
      }
    }

    return -1;
  }
}

const test1 = [[1, 3, 5, 7], 1];
const test2 = [[1, 2, 5, 8, 9, 10], 10];
const test3 = [[1], 1];
const tests = [test1, test2, test3];
const sol = new Solution();
tests.forEach(test => {
  console.log(`Array: [${test[0]}] target: ${test[1]} Iterative ${sol.binarysearchIterative(test[0], test[1])}`);
  console.log(`Array: [${test[0]}] target: ${test[1]} Recursive ${sol.binarysearchRecursive(test[0], test[1], 0, test[0].length - 1)}`);
});
