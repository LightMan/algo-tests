/*

 // https://leetcode.com/problems/top-k-frequent-elements/

 Given an integer array nums and an integer k, return the k most frequent elements.You may return the answer in any order.

 Example 1: Input: nums = [1, 1, 1, 2, 2, 3], k = 2 Output: [1, 2]
 Example 2: Input: nums = [1], k = 1 Output: [1]

 Constraints:
   nums.length <= 105 >= 1
 k is in the range[1, the number of unique elements in the array].
   It is guaranteed that the answer is unique.

   Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
 */

class Solution {
  func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
    var numberOccurrences: [Int: Int] = [:]
    // O(n)
    for aNum in nums {
      numberOccurrences[aNum] = (numberOccurrences[aNum] ?? 0) + 1
    }
    var occurrencesOfNumbers: [Int: [Int]] = [:]

    numberOccurrences.forEach { number, timesRepeated in
      if var numbersArray = occurrencesOfNumbers[timesRepeated] {
        numbersArray.append(number)
        occurrencesOfNumbers[timesRepeated] = numbersArray
      } else {
        occurrencesOfNumbers[timesRepeated] = [number]
      }
    }

    var solution: [Int] = []
    var index = nums.count
    var added = 0
    while added < k, index >= 0 {
      if let numbers = occurrencesOfNumbers[index] {
        solution.append(contentsOf: numbers)
        added += numbers.count
        if added >= k {
          return Array(solution.prefix(k))
        }
      }
      index -= 1
    }
    return solution
  }
}

let sol = Solution()
let test = [1, 1, 1, 2, 2, 3]
let k = 2
print("Most \(k) repeated in \(test) are \(sol.topKFrequent(test, k))")
