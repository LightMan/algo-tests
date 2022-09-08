/* 
663 · Walls and Gates Medium https://www.lintcode.com/problem/663/

You are given a m x n 2D grid initialized with these three possible values.
-1 - A wall or an obstacle.
0 - A gate.
INF - Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a Gate, that room should remain filled with INF

Example1 Input:
[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

Explanation the 2D grid is:
INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF

the answer is:
  3  -1   0   1
  2   2   1  -1
  1  -1   2  -1
  0  -1   3   4

Example2
Input: [[0,-1],[2147483647,2147483647]]
Output: [[0,-1],[1,2]]
*/

export class Solution {

  EMPTY = (2 ** 31) - 1;
  GATE = 0;

  /**
   * @param rooms: m x n 2D grid
   * @return: nothing
   */
  wallsAndGates(rooms) {
    if (rooms.length === 0) {
      return [];
    }

    this.gates = []; // Array of gates coordinates
    this.rooms = rooms;
    this.height = rooms.length;
    this.width = this.rooms[0].length;
    if (this.width === 0) {
      return [];
    }

    this.parseRooms();
    this.nextStepBFS(this.gates);
    return this.rooms;
  }

  nextStepBFS(startingRooms) {
    while (startingRooms.length > 0) {
      const nextStartingRooms = [];
      startingRooms.forEach(([y, x]) => {
        const previousDistance = this.rooms[y][x];
        this.checkRoom(y, x + 1, previousDistance, nextStartingRooms); // Right
        this.checkRoom(y, x - 1, previousDistance, nextStartingRooms); // Left
        this.checkRoom(y + 1, x, previousDistance, nextStartingRooms); // Down
        this.checkRoom(y - 1, x, previousDistance, nextStartingRooms); // Up
      });
      startingRooms = nextStartingRooms;
    }
  }

  checkRoom(y, x, prevDistance, nextStartingRooms) {
    if (!this.isEmpty(y, x)) {
      return;
    }
    this.rooms[y][x] = prevDistance + 1;
    nextStartingRooms.push([y, x]);
  }

  isEmpty(y, x) {
    if (!(x >= 0 && x < this.width && y >= 0 && y < this.height)) {
      return false;
    }
    return this.rooms[y][x] === this.EMPTY;
  }

  parseRooms() {
    this.rooms.forEach((row, y) => {
      row.forEach((room, x) => {
        if (room === this.GATE) {
          this.gates.push([y, x]);
        }
      });
    });
  }
}

const tests = [];
tests.push({ rooms: [[0, -1], [2147483647, 2147483647]], expected: [[0, -1], [1, 2]] });
tests.push({
  rooms: [[2147483647, -1, 0, 2147483647], [2147483647, 2147483647, 2147483647, -1], [2147483647, -1, 2147483647, -1], [0, -1, 2147483647, 2147483647]],
  expected: [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]]
});
const solution = new Solution();
tests.forEach((test, index) => {
  console.log(`Rooms ${index}\n\toutput: ${solution.wallsAndGates(test.rooms)}\n\texpect: ${test.expected}`);
});