/*
130. Surrounded Regions
Medium https://leetcode.com/problems/surrounded-regions/

Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.
A region is captured by flipping all 'O's into 'X's in that surrounded region.

Example 1:
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
The bottom 'O' is on the border, so it is not flipped.
The other three 'O' form a surrounded region, so they are flipped.

Example 2: Input: board = [["X"]] Output: [["X"]]

Constraints:
    m == board.length
    n == board[i].length
    1 <= m, n <= 200
    board[i][j] is 'X' or 'O'.

*/


/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {

  const height = board.length;
  const width = board[0].length;
  const free = {};
  const X = 'X';
  const O = 'O';

  // First row
  let x = 0;
  let y = 0;
  for (x = 0; x < width; x++) {
    exploreCell(x, y);
  }
  // First column
  x = 0;
  for (y = 1; y < height; y++) {
    exploreCell(x, y);
  }
  // Last row
  y = height - 1;
  for (x = 1; x < width; x++) {
    exploreCell(x, y);
  }
  // Last column
  x = width - 1;
  for (y = 1; y < height - 1; y++) {
    exploreCell(x, y);
  }

  generateBoard();

  function generateBoard() {
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        // Everything is a X except the free ones
        board[y][x] = free[[x, y]] ? O : X;
      }
    }
  }

  function exploreCell(x, y) {
    if (isOutOfBounds(x, y)) {
      return;
    }

    if (board[y][x] === X) {
      return;
    }

    if (free[[x, y]]) {
      // Already visited, no need to explore
      return;
    }

    // Cell is O and inbounds and not visited, keep on exploring    
    free[[x, y]] = true; // Mark as free, we always come from an edge
    exploreCell(x + 0, y - 1); // Explore up
    exploreCell(x + 0, y + 1); // Explore down
    exploreCell(x - 1, y + 0); // Explore left
    exploreCell(x + 1, y + 0); // Explore right
  }

  function isOutOfBounds(x, y) {
    return x < 0 || x >= width || y < 0 || y >= height;
  }

};