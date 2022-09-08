var pacificAtlantic = function (heights) {
  const height = heights.length;
  const width = heights[0].length;
  const None = 0, Atlantic = 1, Pacific = 2, Both = 3, Unknown = 4;
  const gridInfo = {};
  const bothOceans = [];
  let ops = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      exploreIsland(y, x, heights[y][x], {});
    }
  }

  console.log(`Ops ${ops}`);
  return bothOceans;

  function exploreIsland(y, x, previousHeight, visiting) {
    ops++;
    if (y < 0 || x < 0) {
      return Pacific;
    } else if (y >= height || x >= width) {
      return Atlantic;
    }

    const key = `${y},${x}`;
    if (visiting[key]) {
      return Unknown;
    }

    const currentHeight = heights[y][x];
    if (previousHeight < currentHeight) {
      return None; // Cannot go from lower to higher, or the cell is in the tree
    }
    visiting[key] = true;

    let cellInfo = gridInfo[key];
    if (cellInfo === undefined) {
      cellInfo = { right: Unknown, down: Unknown, left: Unknown, up: Unknown };
    }

    cellInfo.right = cellInfo.right === Unknown ? exploreIsland(y, x + 1, currentHeight, visiting) : cellInfo.right;
    cellInfo.down = cellInfo.down === Unknown ? exploreIsland(y + 1, x, currentHeight, visiting) : cellInfo.down;
    cellInfo.left = cellInfo.left === Unknown ? exploreIsland(y, x - 1, currentHeight, visiting) : cellInfo.left;
    cellInfo.up = cellInfo.up === Unknown ? exploreIsland(y - 1, x, currentHeight, visiting) : cellInfo.up;
    gridInfo[key] = cellInfo;
    return checkOcean(y, x, cellInfo);
  }

  function checkOcean(y, x, cell) {
    const pacific = [cell.right, cell.down, cell.left, cell.up].indexOf(Pacific) !== -1;
    const atlantic = [cell.right, cell.down, cell.left, cell.up].indexOf(Atlantic) !== -1;
    const both = [cell.right, cell.down, cell.left, cell.up].indexOf(Both) !== -1;
    if ((pacific && atlantic) || both) {
      bothOceans.push([y, x]);
      return Both;
    }
    if (pacific) {
      return Pacific;
    } else if (atlantic) {
      return Atlantic;
    }
    return None;
  }
};


const tests = [];
tests.push({ heights: [[1, 1, 8], [1, 8, 1], [8, 1, 1]], expected: [[0, 2], [1, 1], [2, 0]] });
tests.push({ heights: [[1, 1, 1], [1, 8, 1], [1, 1, 1]], expected: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]] });
tests.push({ heights: [[2, 1], [1, 2]], expected: [[0, 0], [0, 1], [1, 0], [1, 1]] });
tests.push({ heights: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]], expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] });
tests.push({ heights: [[10, 10, 10], [10, 1, 10], [10, 10, 10]], expected: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]] });
tests.forEach((test, index) => {
  console.log(`Water results for test\n index ${index}: [${pacificAtlantic(test.heights).join('|')}] \n expected [${test.expected.join('|')}]`);
});

/*
  This one works withour memoization
var pacificAtlantic = function (heights) {
  const height = heights.length;
  const width = heights[0].length;
  const None = 0, Atlantic = 1, Pacific = 2, Both = 3, Unknown = -1;
  const gridInfo = {};
  const bothOceans = [];
  let ops = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      exploreIsland(y, x, heights[y][x], {});
    }
  }

  console.log(`Ops ${ops}`);
  return bothOceans;

  function exploreIsland(y, x, previousHeight, visiting) {
    ops++;
    if (y < 0 || x < 0) {
      return Pacific;
    } else if (y >= height || x >= width) {
      return Atlantic;
    }

    const key = `${y},${x}`;
    if (visiting[key]) {
      return Unknown;
    }

    const currentHeight = heights[y][x];
    if (previousHeight < currentHeight) {
      return None; // Cannot go from lower to higher, or the cell is in the tree
    }
    let cellInfo = gridInfo[key];
    if (cellInfo === undefined) {
      cellInfo = { right: Unknown, down: Unknown, left: Unknown, up: Unknown };
    }
    visiting[key] = true;

    cellInfo.right = exploreIsland(y, x + 1, currentHeight, visiting);
    cellInfo.down = exploreIsland(y + 1, x, currentHeight, visiting);
    cellInfo.left = exploreIsland(y, x - 1, currentHeight, visiting);
    cellInfo.up = exploreIsland(y - 1, x, currentHeight, visiting);

    // cellInfo.right = cellInfo.right === Unknown ? exploreIsland(y, x + 1, currentHeight, visiting) : cellInfo.right;
    // cellInfo.down = cellInfo.down === Unknown ? exploreIsland(y + 1, x, currentHeight, visiting) : cellInfo.down;
    // cellInfo.left = cellInfo.left === Unknown ? exploreIsland(y, x - 1, currentHeight, visiting) : cellInfo.left;
    // cellInfo.up = cellInfo.up === Unknown ? exploreIsland(y - 1, x, currentHeight, visiting) : cellInfo.up;
    gridInfo[key] = cellInfo;
    return checkOcean(y, x, cellInfo);
  }

  function checkOcean(y, x, cell) {
    const pacific = [cell.right, cell.down, cell.left, cell.up].indexOf(Pacific) !== -1;
    const atlantic = [cell.right, cell.down, cell.left, cell.up].indexOf(Atlantic) !== -1;
    const both = [cell.right, cell.down, cell.left, cell.up].indexOf(Both) !== -1;
    if ((pacific && atlantic) || both) {
      bothOceans.push([y, x]);
      return Both;
    }
    if (pacific) {
      return Pacific;
    } else if (atlantic) {
      return Atlantic;
    }
    return None;
  }
};

const tests = [];
tests.push({ heights: [[1, 1, 8], [1, 8, 1], [8, 1, 1]], expected: [[0, 2], [1, 1], [2, 0]] });
tests.push({ heights: [[1, 1, 1], [1, 8, 1], [1, 1, 1]], expected: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]] });
tests.push({ heights: [[2, 1], [1, 2]], expected: [[0, 0], [0, 1], [1, 0], [1, 1]] });
tests.push({ heights: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]], expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] });
tests.push({ heights: [[10, 10, 10], [10, 1, 10], [10, 10, 10]], expected: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]] });
tests.forEach((test, index) => {
  console.log(`Water results for test\n index ${index}: [${pacificAtlantic(test.heights).join('|')}] \n expected [${test.expected.join('|')}]`);
});

*/