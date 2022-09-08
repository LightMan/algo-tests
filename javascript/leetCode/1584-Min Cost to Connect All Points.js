/*
1584. Min Cost to Connect All Points
Medium  https://leetcode.com/problems/min-cost-to-connect-all-points/

You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].
The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.
Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

Example 1: Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]] Output: 20
Explanation: 
We can connect the points as shown above to get the minimum cost of 20.
Notice that there is a unique path between every pair of points.

Example 2: Input: points = [[3,12],[-2,5],[-4,1]] Output: 18
Constraints:
    1 <= points.length <= 1000
    -106 <= xi, yi <= 106
    All pairs (xi, yi) are distinct.
*/

import { MinPriorityQueue } from '@datastructures-js/priority-queue';

/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {

  const visited = [];
  let visitedCount = 0;
  return prims(0, []);

  /*
  *
   * @param: {number[]} distances: Objects sorted by descending distance (last one is the closest ) {dist: number, from: pointIndex, to: pointIndex) 
   */
  function prims(startIndex, distances) {
    let pointIndex = startIndex;
    let cost = 0;
    do {
      addDistancesFrom(pointIndex, distances);
      visited[pointIndex] = true;
      visitedCount++;
      const minEdge = getMinDistance(distances);
      if (minEdge !== null) {
        pointIndex = minEdge.to;
        cost += minEdge.dist;
        // console.log(`Visited: [${visited}]. Cost ${cost}, Index ${pointIndex}`);
        // console.log(`Closest point ${JSON.stringify(minEdge, null, ' ')}`);
      }
    } while (visitedCount < points.length - 1);
    return cost;
  }
  // 0 [[0, 0], 1 [0, 3], 2 [0, 2], 3 [0, 1]]
  function getMinDistance(distances) {
    let minDistance = Infinity;
    let minEdge = null;
    for (let i = 0; i < points.length; i++) {
      const heap = distances[i];
      if (heap === undefined) {
        continue;
      }
      let min = heap.front();
      if (!min) {
        continue;
      }
      while (min && visited[min.to] === true) {
        heap.dequeue();
        min = heap.front();
      }
      if (!min) {
        continue;
      }
      if (min.dist < minDistance) {
        minDistance = min.dist;
        minEdge = min;
      }
    }
    return minEdge;
  }


  function addDistancesFrom(pointIndex, distances) {
    const minHeap = new MinPriorityQueue({ compare: (p1, p2) => p1.dist - p2.dist });
    for (let i = 0; i < points.length; i++) {
      if (visited[i] !== true && pointIndex != i) {
        const dist = manhattanDist(points[pointIndex], points[i]);
        minHeap.enqueue({ dist: dist, from: pointIndex, to: i });
      }
    }
    distances[pointIndex] = minHeap;
  }

  function manhattanDist(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
  }
};

const tests = [];
tests.push({ points: [[0, 0]], expected: 0 });
tests.push({ points: [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]], expected: 20 });
tests.push({ points: [[3, 12], [-2, 5], [-4, 1]], expected: 18 });
tests.push({ points: [[-14, -14], [-18, 5], [18, -10], [18, 18], [10, -2]], expected: 102 });
tests.push({ points: [[0, 1], [0, 2], [0, 5], [0, 4], [0, 3]], expected: 4 });
tests.push({ points: [[0, 0], [0, 3], [0, 2], [0, 1]], expected: 3 });
tests.forEach((test, index) => {
  console.log(`Min cost of test ${index} ${minCostConnectPoints(test.points)} == ${test.expected}`);
});
