/*
743. Network Delay Time
Medium https://leetcode.com/problems/network-delay-time/

You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.
We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

Example 1: Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2 Output: 2
Example 2: Input: times = [[1,2,1]], n = 2, k = 1 Output: 1
Example 3: Input: times = [[1,2,1]], n = 2, k = 2 Output: -1

Constraints:
    1 <= k <= n <= 100
    1 <= times.length <= 6000
    times[i].length == 3
    1 <= ui, vi <= n
    ui != vi
    0 <= wi <= 100
    All the pairs (ui, vi) are unique. (i.e., no multiple edges.)

*/

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {

  let visited = {};
  const graph = generateGraph(times);
  const minTime = dfs(k, 0);

  return Object.keys(visited).length === n ? minTime : -1;

  // node has: {orig: number, dest: number, time: number, visitTime: number};
  // [2,1,1],[2,3,1],[3,4,1]]
  // 2->1 

  function dfs(node, time) {
    // console.log(`Visiting node ${JSON.stringify(node, null, ' ')} time ${time}`);
    if (visited[node] > 0) {
      console.log(`Visited ${node} in time ${time} stored ${visited[node]}`);
      visited[node] = Math.min(time, visited[node]);
      return visited[node];
    }
    visited[node] = time;
    if (Object.keys(visited).length === n) {
      return time;
    }

    // Get children
    let childrenTime = Number.MIN_VALUE;
    const connections = graph[node];
    if (!connections) {
      return time;
    }
    connections.forEach(connection => {
      const dfsTime = dfs(connection.dest, time + connection.time);
      console.log(`${node} -> ${connection.dest} accum ${time + connection.time} dfsTime ${dfsTime}`);
      childrenTime = Math.max(dfsTime, childrenTime);
    });
    return childrenTime;
  }

  function generateGraph(times) {
    const graph = {};
    times.forEach(time => {
      const connection = { orig: time[0], dest: time[1], time: time[2], visitTime: 0 };
      const connections = graph[time[0]] || [];
      connections.push(connection);
      graph[time[0]] = connections;
    });
    return graph;
  }
};

const tests = [];
// tests.push({ times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 });
// tests.push({ times: [[1, 2, 1]], n: 2, k: 1 });
// tests.push({ times: [[1, 2, 1], [2, 1, 3]], n: 2, k: 2 });
// tests.push({ times: [[1, 2, 1]], n: 2, k: 2 });
tests.push({ times: [[1, 2, 1], [2, 3, 2], [1, 3, 2]], n: 3, k: 1 });
tests.push({ times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 });
tests.forEach(test => {
  const time = networkDelayTime(test.times, test.n, test.k);
  console.log(`Minimum time start at ${test.k} in graph [${test.times.join('|')}] = ${time}`);
});