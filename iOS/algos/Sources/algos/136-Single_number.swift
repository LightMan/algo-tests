// 136 https://leetcode.com/problems/single-number/

/*
 Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
 You must implement a solution with a linear runtime complexity and use only constant extra space.
 Example 1: Input: nums = [2,2,1] Output: 1
 Example 2: Input: nums = [4,1,2,1,2] Output: 4
 Example 3: Input: nums = [1] Output: 1
 */

class Solution136 {
  func singleNumber(_ nums: [Int]) -> Int {
    var result = 0
    for num in nums {
      result ^= num
    }
    return result
  }

  func test() {
    let sol = Solution136()
    var tests: [[Int]] = []
    tests.append([2, 2, 1])
    tests.append([2, 2, 1])
    tests.append([4, 1, 2, 1, 2])
    tests.append([1])
    for test in tests {
      print("Not repeated in \(test) is \(sol.singleNumber(test))")
    }
  }
}
