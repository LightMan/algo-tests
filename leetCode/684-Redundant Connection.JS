/*
684. Redundant Connection
Medium https://leetcode.com/problems/redundant-connection/

In this problem, a tree is an undirected graph that is connected and has no cycles.
You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.
Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

Example 1: Input: edges = [[1,2],[1,3],[2,3]] Output: [2,3]
Example 2: Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]] Output: [1,4]

Constraints:
    n == edges.length
    3 <= n <= 1000
    edges[i].length == 2
    1 <= ai < bi <= edges.length
    ai != bi
    There are no repeated edges.
    The given graph is connected.
*/

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {

  const parent = {};
  const rank = {};

  for (const [n1, n2] of edges) {
    const p1 = findParent(n1, parent[n1]);
    const p2 = findParent(n2, parent[n2]);
    if (p1 === p2) {
      return [n1, n2];
    } else {
      union(p1, p2);
    }
  }

  function findParent(n, parentN) {
    if (parentN === undefined) {
      return n;
    }
    return parent[n] = findParent(parentN, parent[parentN]); // Path compression
  }

  function union(n1, n2) {
    const rankN1 = rank[n1] || 1;
    const rankN2 = rank[n2] || 2;
    if (rankN1 >= rankN2) {
      parent[n2] = n1;
      if (rankN1 == rankN2) {
        rank[n1] = rankN1 + 1;
      }
    } else {
      parent[n1] = n2;
    }
  }
};