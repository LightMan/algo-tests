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

  binarysearchRecursive(arr, n, k) {
    if (arr.length === 1) {
      console.debug(`length 1 = [${arr}] == k ?`);
      return arr[0] === k ? 0 : -1;
    }

    let middle = Math.floor((arr.length) / 2);
    console.debug(`Chequeando ${arr} middle pos ${middle} = ${arr[middle]}`);
    let posFound = -1;
    if (arr[middle] === k) {
      console.debug(`Encontrado en posición ${middle}`);
      posFound = middle;
    } else if (arr[middle] > k) {
      posFound = this.binarysearch(arr.slice(0, middle), n, k);
    } else {
      const found = this.binarysearch(arr.slice(middle), n, k);
      if (found !== -1) {
        posFound = found + middle;
      }
    }
    if (posFound === -1) {
      return -1;
    }
    console.log(`pos found ${posFound} middle ${middle}`);
    return posFound;
  }

  binarysearchIterative(arr, n, k) {
    let startIndex = 0;
    let endIndex = n - 1;
    let foundIndex = -1;

    while (foundIndex === -1 && startIndex < endIndex) {
      const middleIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
      const middleValue = arr[middleIndex];

      //  console.log(`checking mid ${middleIndex}[${arr[middleIndex]}] == ${k}`);
      if (middleValue === k) {
        foundIndex = middleIndex;
      } else if (middleValue > k) {
        // k is before middleIndex, or does not exist.
        endIndex = middleIndex;
      } else {
        // k is after middleIndex, or does not exist.
        startIndex = middleIndex;
        if (startIndex + 1 === endIndex) {
          foundIndex = arr[endIndex] === k ? endIndex : -1;
          startIndex = endIndex;
        }
      }
      // console.log(`Moved to start ${startIndex}[${arr[startIndex]}] mid ${middleIndex}[${arr[middleIndex]}] end ${endIndex}[${arr[endIndex]}], arr is ${arr}`);
    }

    return foundIndex;
  }
}

const array1 = [1, 2, 5, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 22, 23, 24, 26, 28, 31, 33, 34, 36, 37, 38, 39, 40, 42, 43, 44, 46, 47, 48, 49, 50, 54, 55, 59, 60, 62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73, 75, 77, 79, 80, 82, 86, 87, 88, 92, 93, 94, 96, 97, 98, 99, 100];
const array2 = [1, 2, 5, 8, 9, 10];
const array3 = [0, 1];
const array = array1;
const numberToFind = 42;
const sol = new Solution();
console.log(`Result ${sol.binarysearchIterative(array, array.length, numberToFind)}`);
