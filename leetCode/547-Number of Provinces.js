/*
547. Number of Provinces Medium https://leetcode.com/problems/number-of-provinces/

There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.
A province is a group of directly or indirectly connected cities and no other cities outside of the group.
You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
Return the total number of provinces.

Example 1: Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]] Output: 2
Example 2: Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]] Output: 3


Constraints:
    1 <= n <= 200
    n == isConnected.length
    n == isConnected[i].length
    isConnected[i][j] is 1 or 0.
    isConnected[i][i] == 1
    isConnected[i][j] == isConnected[j][i]


    Fail test: Should it work?

 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14
 
 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0
 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0
 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0
 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0
 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0
 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0
 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0
 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1
 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0
 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0
 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0
 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
     
*/

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {

  const numNodes = isConnected.length; // 1 <= n <= 200
  // Watch edge case with n = 1

  const ranks = Array(numNodes).fill(1);
  const parents = ranks.map((n, i) => i);
  let unions = 0;

  // Traverse the matrix
  for (let y = 0; y < numNodes - 1; y++) {
    for (let x = y + 1; x < numNodes; x++) {

      if (!isConnected[y][x]) {
        continue;
      }

      const p1 = find(x);
      const p2 = find(y);
      if (p1 == p2) {
        console.log(`Same parent ${x} is ${p1} == parent ${y} is ${p2}`);
        continue;
      }
      console.log(`parents ${parents} ranks ${ranks}`);
      union(p1, p2);
    }
  }
  return numNodes - unions;

  function find(node) {
    let next = node;
    while (next != parents[next]) {
      parents[next] = parents[parents[next]];
      next = parents[next];
    }
    return next;
  }

  function union(n1, n2) {
    unions += 1;
    const [p1, p2] = ranks[n1] > ranks[n2] ? [n1, n2] : [n2, n1];
    ranks[p1] += ranks[p2];
    parents[p2] = p1;
  }

};