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
var networkDelayTime = function (times, n, k) {
  const visited = new Set();
  const minTimes = initMinTimes(n, k);
  const graph = generateGraph(times);

  const maxTime = dijkstra(k, graph);
  return visited.size < n ? -1 : maxTime;

  function dijkstra(start, graph) {
    let closestNode = findClosestNode(minTimes, visited);
    let maxTime = -Infinity;
    while (closestNode !== undefined) {
      // console.log(`Min times ${JSON.stringify(minTimes, null, ' ')} visited=[${Object.keys(visited)}]`);
      checkNeighboursFromNode(graph[closestNode], minTimes, minTimes[closestNode]);
      visited.add(closestNode);
      closestNode = findClosestNode(minTimes, visited);
      maxTime = Math.max(minTimes[closestNode] || -Infinity, maxTime);
    }

    return maxTime;
  }

  function findClosestNode(minTimes, visited) {
    let minTime = Infinity;
    let minNode;
    for (const [nodeId, time] of Object.entries(minTimes)) {
      if (!visited.has(nodeId) && time < minTime) {
        // console.log(`min ${minTime < time} node ${nodeId} visited ${visited[nodeId] !== undefined}`);
        minTime = time;
        minNode = nodeId;
      }
    }
    return minNode;
  }

  function checkNeighboursFromNode(connections, minTimes, currentTime) {
    if (connections === undefined) {
      return currentTime; // Node has no connections (A leaf or final node)
    }
    let minTime = Infinity;
    connections.forEach(connection => {
      // console.log(`eval from ${connection.node1} to node ${connection.node2} saved ${minTimes[connection.node2]} acum time ${currentTime + connection.time}`);      
      if (visited.has(connection.node2)) {
        return; // Check next connection
      }
      const timeToNode = connection.time + currentTime;
      if (timeToNode < minTimes[connection.node2]) {
        minTimes[connection.node2] = timeToNode;
      }
      // minTimes[connection.node2] = Math.min(minTimes[connection.node2] || Number.MAX_SAFE_INTEGER, currentTime + connection.time);
    });
  }

  function generateGraph(times) {
    const graph = {};
    times.forEach(time => {
      const connections = graph[time[0]] || [];
      connections.push({ node1: time[0], node2: time[1], time: time[2] });
      graph[time[0]] = connections;
    });
    return graph;
  }

  function initMinTimes(numNodes, startingNode) {
    const minTimes = {};
    for (let n = 1; n <= numNodes; n++) {
      minTimes[n] = Infinity;
    }
    minTimes[startingNode] = 0;
    return minTimes;
  }
};

const tests = [];
tests.push({ times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 });
tests.push({ times: [[1, 2, 1]], n: 2, k: 1 });
tests.push({ times: [[1, 2, 1], [2, 1, 3]], n: 2, k: 2 });
tests.push({ times: [[1, 2, 1]], n: 2, k: 2 });
tests.push({ times: [[1, 2, 1], [2, 3, 2], [1, 3, 2]], n: 3, k: 1 });
tests.push({ times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 });
tests.forEach(test => {
  const time = networkDelayTime(test.times, test.n, test.k);
  console.log(`Minimum time start at ${test.k} in graph [${test.times.join('|')}] = ${time}`);
});
