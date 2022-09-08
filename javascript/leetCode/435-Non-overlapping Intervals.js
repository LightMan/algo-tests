/*
435. Non-overlapping Intervals
Medium https://leetcode.com/problems/non-overlapping-intervals/

Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Example 1: Input: intervals = [[1,2],[2,3],[3,4],[1,3]] Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

Example 2: Input: intervals = [[1,2],[1,2],[1,2]] Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.

Example 3: Input: intervals = [[1,2],[2,3]] Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.

Constraints:
    1 <= intervals.length <= 105
    intervals[i].length == 2
    -5 * 104 <= starti < endi <= 5 * 104
*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  const Start = 0, End = 1;
  // Sort by starting point
  intervals.sort((a, b) => a[Start] - b[Start]);

  let minRemovals = 0;
  let prevEnd = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    if (interval[Start] < prevEnd) {
      minRemovals++;
      prevEnd = Math.min(interval[End], prevEnd);
    } else {
      prevEnd = Math.max(interval[End], prevEnd);
    }
  };
  return minRemovals;
};

const tests = [];
tests.push({ intervals: [[1, 2], [2, 3], [3, 4], [1, 3]], expected: 1 });
tests.push({ intervals: [[1, 100], [11, 22], [1, 11], [2, 12]], expected: 2 });
tests.push({ intervals: [[1, 2], [1, 2], [1, 2]], expected: 2 });
tests.push({ intervals: [[1, 2], [1, 3], [1, 4]], expected: 2 });
tests.push({ intervals: [[1, 2], [2, 3]], expected: 0 });
for (const test of tests) {
  const sol = eraseOverlapIntervals([...test.intervals]);
  console.log(`Intervals: [${test.intervals.join('|')}] min=${sol} ${sol === test.expected ? '✅ ' : "❌  " + test.expected}`);
};