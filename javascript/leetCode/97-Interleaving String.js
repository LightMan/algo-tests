/*
97. Interleaving String
Medium https://leetcode.com/problems/interleaving-string/

Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where s and t are divided into n and m non-empty substrings respectively, such that:
    s = s1 + s2 + ... + sn
    t = t1 + t2 + ... + tm
    |n - m| <= 1
    The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

Example 1: Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac" Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.

Example 2: Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc" Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.

Example 3: Input: s1 = "", s2 = "", s3 = "" Output: true

Constraints:
    0 <= s1.length, s2.length <= 100
    0 <= s3.length <= 200
    s1, s2, and s3 consist of lowercase English letters.

 Follow up: Could you solve it using only O(s2.length) additional memory space?

*/

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {

  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  let totalOps = 0;
  const sol = dfs(s1.length - 1, s2.length - 1, s3.length - 1);
  console.log(`Total ops ${totalOps}`);
  return sol;

  function dfs(id1, id2, id3) {
    totalOps += 1;
    if (id1 === -1 && id2 === -1 && id3 === -1) {
      return true;
    }

    if (id1 >= 0 && s1[id1] === s3[id3]) {
      const result = dfs(id1 - 1, id2, id3 - 1);
      if (result) {
        return true;
      }
    }
    if (id2 >= 0 && s2[id2] === s3[id3]) {
      const result = dfs(id1, id2 - 1, id3 - 1);
      if (result) {
        return true;
      }
    }

    return false;
  }
};

const tests = [];
tests.push({ s1: "a", s2: "b", s3: "a", expected: false });
tests.push({ s1: "aabcc", s2: "dbbca", s3: "aadbbcbcac", expected: true });
tests.push({
  s1: "bbbbbabbbbabaababaaaabbababbaaabbabbaaabaaaaababbbababbbbbabbbbababbabaabababbbaabababababbbaaababaa",
  s2: "babaaaabbababbbabbbbaabaabbaabbbbaabaaabaababaaaabaaabbaaabaaaabaabaabbbbbbbbbbbabaaabbababbabbabaab",
  s3: "babbbabbbaaabbababbbbababaabbabaabaaabbbbabbbaaabbbaaaaabbbbaabbaaabababbaaaaaabababbababaababbababbbababbbbaaaabaabbabbaaaaabbabbaaaabbbaabaaabaababaababbaaabbbbbabbbbaabbabaabbbbabaaabbababbabbabbab",
  expected: false
});
tests.push({
  s1: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  s2: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  s3: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  expected: false
});

tests.forEach(test => {
  console.log(`Interleaved "${test.s1}" with "${test.s2}" = "${test.s3}" ? ${isInterleave(test.s1, test.s2, test.s3)}. Expected ${test.expected}`);
});