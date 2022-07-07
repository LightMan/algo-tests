/*
79. Word Search. Medium. https://leetcode.com/problems/word-search/

Given an m x n grid of characters board and a string word, return true if word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1: Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED" Output: true
Example 2: Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE" Output: true
Example 3: Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB" Output: false

Constraints:
    m == board.length
    n = board[i].length
    1 <= m, n <= 6
    1 <= word.length <= 15
    board and word consists of only lowercase and uppercase English letters.

 Follow up: Could you use search pruning to make your solution faster with a larger board?
*/

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const height = board.length;
  const width = board[0].length;

  let lastFirstPos = { x: -1, y: 0 };
  let letterPos;
  let used = [];
  let direction = 0;
  for (let letterIndex = word.length - 1; letterIndex >= 0; letterIndex--) {
    let letterFound;
    if (letterIndex === word.length - 1) {
      // Looking for first letter
      letterPos = lookForLetterAfterPos(letterIndex, lastFirstPos);
    } else {
      let nextPos = posFromDirection(direction++, letterPos);
      if (!letterFound) {
        letterPos = movePosition(fromPos, { x: 0, y: 1 });
        letterFound = searchWord(letterIndex, letterPos);
      }
      letterFound = searchWord(letterIndex, letterPos);

    }



    if (letterPos === -1) {
      // The last letter is not in the board => word is not in the board
      return false;
    }
  }

  // Convert direction to pos
  // 0 = up, 1 = down, 2 = left, 3 = right
  function posFromDirection(direction, currentPos) {
    switch (direction) {
      case 0: return movePosition(fromPos, { x: 0, y: -1 });
      case 1: return movePosition(fromPos, { x: 0, y: +1 });
      case 2: return movePosition(fromPos, { x: -1, y: 0 });
      case 3: return movePosition(fromPos, { x: +1, y: 0 });
    }
    return undefined;
  }

  // Returns true or false if cannot continue
  function searchWord(letterIndex, position) {
    if (!isPosInBoard(position) || !isLetterInPosition(letterIndex, position || !isPositionFree(position)) {
      return false;
    }
  }

  function isLetterInPosition(letterIndex, position) {
    if (!isPosInBoard(position)) return false;
    return board[position.y][position.x] === word[letterIndex];
  }

  function isPositionFree(position) {
    if (!used[position.y]) return true;
    return used[position.y][position.x] == undefined || used[position.y][position.x] == false;
  }

  function setUsedPosition(position, value) {
    if (!used[position.y]) {
      used[position.y] = [];
    }
    used[position.y][position.x] = value;
  }

  function isPosInBoard(position) {
    return !(position.x < 0 || position.y < 0 || position.x >= width || position.y >= height);
  }

  function lookForLetterAfterPos(letterIndex, lastPos) {
    const letter = word[letterIndex];
    const fromPos = { x: lastPos.x + 1, y: lastPos.y };
    // Maybe we are out of bounds
    let x = fromPos.x;
    for (let y = fromPos.y; y < height; y++) {
      for (; x < width; x++) {
        if (board[y][x] == letter) {
          return { x, y };
        }
      }
      x = 0;
    }
    return -1;
  }

  function nextLetterPossitions(letter, fromPos) {
    // Search letter up, down, left and right
    let positions = [];
    const up = movePosition(fromPos, { x: 0, y: -1 });
    const down = movePosition(fromPos, { x: 0, y: +1 });
    const left = movePosition(fromPos, { x: -1, y: 0 });
    const right = movePosition(fromPos, { x: +1, y: 0 });
    [up, down, left, right].forEach(pos => {
      if (pos && isLetterInPosition(letter, pos) && isPositionFree(pos)) {
        positions.push(pos);
      }
    });
    return positions;
  }

  function movePosition(position, displacement) {
    if (!isPosInBoard(position)) return false;
    const newPos = { x: position.x + displacement.x, y: position.y + displacement.y };
    if (!isPosInBoard(newPos)) return false;

    return newPos;
  }

};

let used = [];
// After the first letter we can create a loop for the next letter
let letterIndex = word.length - 1;
let letterIndexPosCache = [];
let letterPos;
while (letterIndex >= 0 && letterIndex < word.length) {
  const letter = word[letterIndex];
  let found;
  // console.log(`Looking for letter ${letter} at index ${letterIndex}`);
  if (letterIndex === word.length - 1) {
    // Looking for last letter in the board
    letterPos = lookForLetterAfterPos(letter, board, lastFirstPos);
    if (letterPos === -1) {
      return false;
    }
    setUsedPosition(lastFirstPos, false);
    lastFirstPos = letterPos; // If search again is needed, we start after last letter.
    found = true;
    console.log(`Found first letter ${letter} at pos [${letterPos.x},${letterPos.y}]`);
  } else {
    // Looking for the rest of the letters
    let positions = letterIndexPosCache[letterIndex];
    if (typeof positions == typeof undefined) {
      // Look for the letters after the last one
      positions = nextLetterPossitions(letter, letterPos, board);
      letterIndexPosCache[letterIndex] = positions;
    } else {
      setUsedPosition(positions.shift(), false);
    }
    found = positions.length > 0;
    if (found) {
      // Found positions for next letter
      letterPos = positions[0];
      console.log(`Found letter ${letter} around pos [${letterPos.x},${letterPos.y}]`);
    } else {
      console.log(`Not Found letter ${letter} around pos [${letterPos.x},${letterPos.y}]`);
    }
  }
  if (found) {
    letterIndex--; // Move to previous letter
  } else {
    delete letterIndexPosCache[letterIndex];
    letterIndex++;
  }
  setUsedPosition(letterPos, found);
}
return letterIndex < 0;
}

const board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]];
const words = ["ABCCED", "SEE", "ABCB"];
const board2 = [
  ["B", "B", "C", "D"],
  ["B", "X", "X", "X"],
  ["C", "D", "E", "X"]];
const word2 = "BBB";
console.log(`Is ${word2} in board? ${exist(board2, word2)}`);

// words.forEach(word => {
//   console.log(`Is ${word} in board? ${exist(board, word)}`);
// });

