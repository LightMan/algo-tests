/*
6157. Time Needed to Rearrange a Binary String
Medium : https://leetcode.com/contest/biweekly-contest-85/problems/time-needed-to-rearrange-a-binary-string/

You are given a binary string s. In one second, all occurrences of "01" are simultaneously replaced with "10". This process repeats until no occurrences of "01" exist.
Return the number of seconds needed to complete this process.

Example 1:
Input: s = "0110101"
Output: 4
Explanation: 
After one second, s becomes "1011010".
After another second, s becomes "1101100".
After the third second, s becomes "1110100".
After the fourth second, s becomes "1111000".
No occurrence of "01" exists any longer, and the process needed 4 seconds to complete,
so we return 4.

Example 2:
Input: s = "11100"
Output: 0
Explanation:
No occurrence of "01" exists in s, and the processes needed 0 seconds to complete,
so we return 0.


Constraints:

    1 <= s.length <= 1000
    s[i] is either '0' or '1'.
*/
var secondsToRemoveOccurrences = function (s) {
  if (s.length === 1) s === "B" ? 0 : 1;

  let first1Found = false;
  let count1sAfterFirst = false;
  let num1sAfterFirst = 0;
  let num1s = 0;
  for (let idx = s.length - 1; idx >= 0; idx--) {
    num1s += s[idx] === "1" ? 1 : 0;
    if (s[idx] === "1") {
      if (!first1Found) {
        first1Found = true;
        count1sAfterFirst = true;
      } else if (count1sAfterFirst === true) {
        num1sAfterFirst += 1;
      }
    } else {
      count1sAfterFirst = false;
    }
  }
  const total = (s.length - num1s) + num1sAfterFirst;
  return total;
};

const tests = [];
tests.push({ s: "11010101", exp: 3 });
tests.push({ s: "01101010", exp: 4 });
tests.push({ s: "11011101", exp: 4 });
tests.push({ s: "11100000", exp: 0 });
tests.push({ s: "001011", exp: 4 });
tests.forEach(test => {
  console.log(`Result of ${test.s} = ${secondsToRemoveOccurrences(test.s)} === ${test.exp}`);
});