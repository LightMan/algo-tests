function maxUncrossedLines(a, b) {
  // set dp
  const dp = new Array(a.length + 1).fill(0);

  // fill dp for j
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(b.length + 1).fill(0);
  }

  // up nums
  for (let i = 0; i < a.length; i++) {
    // down nums
    for (let j = 0; j < b.length; j++) {
      // x, y, z as next index
      let x = dp[i][j] + +(a[i] === b[j]), y = dp[i][j + 1], z = dp[i + 1][j];

      // set max as next
      dp[i + 1][j + 1] = Math.max(x, y, z);
    }
  }

  // result
  return dp[a.length][b.length];
};