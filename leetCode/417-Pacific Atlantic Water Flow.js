/*
417. Pacific Atlantic Water Flow
Medium https://leetcode.com/problems/pacific-atlantic-water-flow/

There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

Example 1:
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]] 
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Example 2: Input: heights = [[2,1],[1,2]] Output: [[0,0],[0,1],[1,0],[1,1]]


Constraints:
    m == heights.length
    n == heights[r].length
    1 <= m, n <= 200
    0 <= heights[r][c] <= 105
*/

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const height = heights.length;
  const width = heights[0].length;
  const None = 0, Atlantic = 1, Pacific = 2; Both = 3;
  const gridInfo = new Array(height).fill(new Array(width));

  dfs(0, 0);

  function dfs(y, x, visiting = {}) {
    // if (gridInfo[y][x] !== undefined) {
    //   return gridInfo[y][x];
    // }

    if (toOcean(y, x) !== None) {
      return toOcean(y, x);
    }

    const key = `${y},${x}`;
    if (visiting[key]) {
      return None;
    }

    visiting[key] = true;
    // Visit left
    let toOcean = saveOceanResult(y, x, dfs(y, x - 1, visiting));
    if (toOcean === Both) {
      return Both;
    }
  }

  function saveOceanResult(y, x, oceanResult) {
    if (toOcean !== None) {
      gridInfo[y][x] = gridInfo[y][x] !== undefined ? gridInfo[y][x] | toOcean : toOcean;
    }
    return toOcean;
  }


  function toOcean(y, x) {
    if (x >= width || y >= height) {
      return Atlantic;
    }
    if (x < 0 || y < 0) {
      return Pacific;
    }
    return None;
  }

};

const tests = [];
tests.push({
  heights: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]], expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
});

function printArray(array) {
  return array.reduce((prev, cur) => `${prev},[${cur}]`, "[ ") + " ]";
}

tests.forEach(test => {
  const sol = pacificAtlantic(test.heights);
  console.log(`Raining on ${test.heights}\n\tsol=${printArray(sol)}\n\texp=${printArray(test.expected)}`);
});