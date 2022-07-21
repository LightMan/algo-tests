/*
846. Hand of Straights
Medium https://leetcode.com/problems/hand-of-straights/

Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.
Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.

Example 1:
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]

Example 2:
Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.

Constraints:
    1 <= hand.length <= 104
    0 <= hand[i] <= 109
    1 <= groupSize <= hand.length

 Note: This question is the same as 1296: https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/


*/

/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function (hand, groupSize) {
  // Edge cases
  if (hand.length % groupSize > 0) {
    return false;
  }

  if (groupSize === 0) {
    return false;
  }

  if (groupSize === 1) {
    return true;
  }

  // Count repetition
  let cardsCount = {};
  hand.forEach(card => {
    cardsCount[card] = cardsCount[card] + 1 || 1;
  });

  let str = '';
  Object.keys(cardsCount).forEach(card => {
    str += `[${card}]=${cardsCount[card]}`;
  });
  console.log(str);

  while (Object.keys(cardsCount).length > 0) {
    let minimumGroup;
    const firstCard = Number.parseInt(Object.keys(cardsCount)[0]);
    console.log(`Checking one group ${Object.keys(cardsCount)} ${Object.values(cardsCount)}`);
    for (let i = 0; i < groupSize; i++) {
      if (i === 0) {
        minimumGroup = cardsCount[firstCard];
      } else {
        if (cardsCount[firstCard + i] === undefined || cardsCount[firstCard + i] < minimumGroup) {
          return false;
        }
      }

      cardsCount[firstCard + i] -= minimumGroup;
      // console.log(`Card ${firstCard + i} now is ${cardsCount[firstCard + i]}`);
      if (cardsCount[firstCard + i] === 0) {
        delete cardsCount[firstCard + i];
      }
    }
  }

  return true;
};

const cards1 = [1, 2, 3, 6, 2, 3, 4, 7, 8];
const groupSize1 = 3;
const tests = [[cards1, groupSize1]];
tests.forEach(([cards, groupSize]) => {
  console.log(`hand of straights ? ${isNStraightHand(cards, groupSize)}`);
});