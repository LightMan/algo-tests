/*
994. Rotting Oranges Medium. https://leetcode.com/problems/rotting-oranges/

You are given an m x n grid where each cell can have one of three values:
    0 representing an empty cell,
    1 representing a fresh orange, or
    2 representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Example 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

Example 3:
Input: grid = [[0,2]]
Output: 0 Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
Constraints:
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 10
    grid[i][j] is 0, 1, or 2.
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const height = grid.length;
  const width = grid[0].length;
  const empty = 0, fresh = 1, rotten = 2;

  let turn = 0;
  let freshApples = 0;
  let appleWasRotten;
  let rottenApples = [];
  let newRottenApples;

  // Start turn 0, parse all the cells
  populateRottenApples();
  appleWasRotten = rottenApples.length > 0;

  if (!appleWasRotten && freshApples === 0) return 0;

  // Loop to finish or stop if no apple has been rotten
  while (appleWasRotten && freshApples > 0) {
    executeTurn();
    if (appleWasRotten) turn += 1;
  }

  return appleWasRotten ? turn : -1;

  function populateRottenApples() {
    appleWasRotten = false;
    // Read all the matrix and populate rottenApples Array
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Check the contents
        const cell = grid[y][x];

        if (cell === rotten) {
          rottenApples.push([x, y]);
        } else if (cell === fresh) {
          freshApples += 1;
        }
      }
    }
  }

  // Return if an apple was rotten
  function executeTurn() {
    newRottenApples = [];
    rottenApples.forEach(rottenApple => {
      rotApplesArround(rottenApple[0], rottenApple[1], newRottenApples);
    });
    appleWasRotten = newRottenApples.length > 0;
    rottenApples = newRottenApples;
  }

  // 
  function rotApplesArround(x, y) {
    // Up x + 0, y - 1
    checkCellAndRotItAtPos(x + 0, y - 1);
    // Down x + 0, y + 1
    checkCellAndRotItAtPos(x + 0, y + 1);
    // Left  x - 1, y + 0
    checkCellAndRotItAtPos(x - 1, y + 0);
    // Right  x + 1, y + 0
    checkCellAndRotItAtPos(x + 1, y + 0);
  }

  function checkCellAndRotItAtPos(posX, posY) {
    const cell = getCellInPos(posX, posY);
    if (cell && rotCellInPos(posX, posY, cell)) {
      addNewRottenApple(posX, posY);
    }
  }

  function addNewRottenApple(x, y) {
    freshApples -= 1;
    newRottenApples.push([x, y]);
  }

  // Is there is a fresh apple in the cell, rot it and return true, false otherwise
  function rotCellInPos(x, y, cell) {
    if (cell === fresh) {
      grid[y][x] = rotten;
      return true;
    }
    return false;
  }

  function getCellInPos(posX, posY) {
    if (isInsideTheGrid(posX, posY)) {
      return grid[posY][posX];
    }
    return false;
  }

  function isInsideTheGrid(x, y) {
    return x >= 0 && x < width && y >= 0 && y < height;
  }

};