/*
6158-Shifting Letters II
Medium https://leetcode.com/contest/biweekly-contest-85/problems/shifting-letters-ii/
  
You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, or shift the characters backward if directioni = 0.
Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').
Return the final string after all such shifts to s are applied.

Example 1:
Input: s = "abc", shifts = [[0,1,0],[1,2,1],[0,2,1]]
Output: "ace"
Explanation: Firstly, shift the characters from index 0 to index 1 backward. Now s = "zac".
Secondly, shift the characters from index 1 to index 2 forward. Now s = "zbd".
Finally, shift the characters from index 0 to index 2 forward. Now s = "ace".

Example 2:

Input: s = "dztz", shifts = [[0,0,0],[1,1,1]]
Output: "catz"
Explanation: Firstly, shift the characters from index 0 to index 0 backward. Now s = "cztz".
Finally, shift the characters from index 1 to index 1 forward. Now s = "catz".

Constraints:
  1 <= s.length, shifts.length <= 5 * 104
  shifts[i].length == 3
  0 <= starti <= endi < s.length
  0 <= directioni <= 1
  s consists of lowercase English letters.
*/

/**
 * @param {string} s
 * @param {number[][]} shifts
 * @return {string}
 */
var shiftingLetters = function (s, shifts) {
  const total = new Array(s.length).fill(0);

  for (const [start, end, dir] of shifts) {
    for (let i = start; i <= end; i++) {
      total[i] += dir === 1 ? 1 : -1;
    }
  }

  const abc = "abcdefghijklmnopqrstuvwxyz".split('');
  const pos = {};
  abc.forEach((letter, index) => pos[letter] = index);
  const charsIdx = s.split('').map(letter => pos[letter]);
  console.log("catz".split('').map(letter => pos[letter]));
  console.log("dztz".split('').map(letter => pos[letter]));
  console.log(s.split('').map(letter => pos[letter]));

  for (let i = 0; i < charsIdx.length; i++) {
    let newPos = (charsIdx[i] + total[i]) % abc.length;
    if (newPos < 0) newPos += abc.length;
    charsIdx[i] = newPos;
  }
  return charsIdx.map(idx => abc[idx]).join('');
};

const tests = [];
tests.push({ s: "abc", shifts: [[0, 1, 0], [1, 2, 1], [0, 2, 1]], exp: "ace" });
tests.push({ s: "dztz", shifts: [[0, 0, 0], [1, 1, 1]], exp: "catz" });
tests.forEach(test => {
  console.log(`Result of ${test.s} k:[${test.shifts}] = ${shiftingLetters(test.s, test.shifts)} === ${test.exp}`);
});
