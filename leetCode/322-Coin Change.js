/*
322. Coin Change
Medium https://leetcode.com/problems/coin-change/

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
You may assume that you have an infinite number of each kind of coin.


Example 1: Input: coins = [1,2,5], amount = 11 Output: 3 Explanation: 11 = 5 + 5 + 1
Example 2: Input: coins = [2], amount = 3 Output: -1
Example 3: Input: coins = [1], amount = 0 Output: 0

Constraints:
    1 <= coins.length <= 12
    1 <= coins[i] <= 231 - 1
    0 <= amount <= 104
*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {

  if (amount === 0) {
    return 0;
  }

  let jumps = {};
  jumps[amount] = 0;

  let min = 0;
  while (min != Infinity) {
    let currentJumps = {};
    min = Infinity;
    for (const [jumpTotal, jumpsDone] of Object.entries(jumps)) {
      const coinSum = Number.parseInt(jumpTotal);
      const jumpSum = jumpsDone + 1;
      for (let i = 0; i < coins.length; i++) {
        const result = coinSum - coins[i];
        if (result === 0) {
          console.log(`Found with ${jumpSum}`);
          return jumpSum;
        }
        if (result < 0) {
          continue;
        }

        currentJumps[result] = Math.min(jumps[result] || Infinity, jumpSum);
        if (result < min) {
          min = result;
        }
      }
    }
    jumps = currentJumps;
  }
  return -1;
};

const tests = [];
tests.push({ coins: [1, 2, 5], amount: 11, expected: 3 });
tests.push({ coins: [2], amount: 3, expected: -1 });
tests.push({ coins: [1], amount: 0, expected: 0 });
tests.push({ coins: [186, 419, 83, 408], amount: 6249, expected: 20 });
tests.forEach(test => {
  const result = coinChange(test.coins, test.amount);
  console.log(`Coins ${test.coins} amount ${test.amount}, min ${result} == ${test.expected}`);
});
