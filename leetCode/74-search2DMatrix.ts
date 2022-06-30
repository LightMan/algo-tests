// 74 https://leetcode.com/problems/search-a-2d-matrix/
function searchMatrix(matrix: number[][], target: number): boolean {
  const width = matrix[0].length;
  const height = matrix.length;

  // The number less than the minimum or bigger than the maximum.
  if (target < matrix[0][0] || target > matrix[height - 1][width - 1]) {
    return false;
  }

  let lastColumn: number[] = [];
  for (let row = 0; row < height - 1; row++) {
    lastColumn.push(matrix[row][width - 1]);
  }

  // let rowIndex = 0
  // for (; rowIndex < height - 1 && matrix[rowIndex][width - 1] < target; rowIndex++ );
  // the target is in the row, lets look for it in the row
  const rowIndex = columnBinarySearch(matrix, target, width, height);
  if (rowIndex === -1) {
    return false; // This should never happen
  }
  const row = matrix[rowIndex];

  // Binary search in the row
  const index = binarySearchIterative(row, target);
  // console.log(`rowIndex=${rowIndex} row=${row}, searchIndex=${index}`);
  return index !== -1;
};

function columnBinarySearch(matrix: number[][], target: number, width: number, height: number): number {
  let startRow = 0;
  let endRow = height - 1;

  while (startRow <= endRow) {
    const middleRow = Math.floor((startRow + endRow) / 2);
    const firstNumber = matrix[middleRow][0];
    const lastNumber = matrix[middleRow][width - 1];
    if (target >= firstNumber && target <= lastNumber) {
      return middleRow;
    } else if (target < firstNumber) {
      endRow = middleRow - 1;
    } else if (target > lastNumber) {
      startRow = middleRow + 1;
    }
  }

  return -1;
}

function binarySearchIterative(arr: number[], target: number): number {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const middle = Math.floor((end + start) / 2);
    if (arr[middle] === target) {
      return middle;
    } else if (arr[middle] > target) {
      // Target is smaller than the middle, look in the first half.
      end = middle - 1;
    } else {
      // Target is bigger than the middle, look in the second half.
      start = middle + 1;
    }
  }
  return -1;
}