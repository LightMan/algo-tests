/*
763. Partition Labels
Medium https://leetcode.com/problems/partition-labels/

You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.
Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.
Return a list of integers representing the size of these parts.

Example 1:
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.

Example 2: Input: s = "eccbbbbdec" Output: [10]

Constraints:
    1 <= s.length <= 500
    s consists of lowercase English letters.
*/

/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  let partitions = [];
  let lastIndex = -1;
  const letterPos = {};
  const posLetters = {};
  // "abacdc"
  //  a: [1] => li=0 lp['a'] = 0;
  //  b: [1,1] => li=1 lp['b'] = 1;
  //  a: [2] => li=0 lp['b'] = 1;
  s.split('').forEach(letter => {
    const curPosLetter = letterPos[letter];
    lastIndex += 1;
    partitions[lastIndex] = 1;
    letterPos[letter] = lastIndex;
    if (posLetters[lastIndex] === undefined) posLetters[lastIndex] = [];
    posLetters[lastIndex].push(letter);
    if (curPosLetter !== undefined) {
      let sum = 0;
      for (let i = curPosLetter + 1; i <= lastIndex; i++) {
        sum += partitions[i];
        posLetters[i].forEach(moveLetter => {
          if (moveLetter != letter) posLetters[curPosLetter].push(moveLetter);
          letterPos[moveLetter] = curPosLetter;
        });
        posLetters[i] = [];
      }
      partitions = partitions.slice(0, curPosLetter + 1);
      partitions[curPosLetter] += sum;
      lastIndex = curPosLetter;
      console.log(`Letter ${letter} index ${lastIndex}, partitions [${partitions}]`);
    }
  });
  return partitions;
};

var partitionLabels2 = function (s) {

  const letterMaxPos = {};
  const letters = s.split('');
  letters.forEach((letter, pos) => letterMaxPos[letter] = Math.max(letterMaxPos[letter] || -1, pos));

  const partitions = [];
  let end = 0;
  let start = 0;
  letters.forEach((letter, pos) => {
    if (letterMaxPos[letter] > end) {
      end = letterMaxPos[letter];
    }
    if (pos === end) {
      partitions.push(end + 1 - start);
      start = pos + 1;
    }
  });

  return partitions;
};
const test1 = "ababcbacadefegdehijhklij";
const test2 = "eccbbbbdec";
const test3 = "edcdaeeeaadeccb"; // Should be [14,1]
const tests = [test3];
tests.forEach(test => {
  console.log(`groups in ${test} = [${partitionLabels2(test)}]`);
});