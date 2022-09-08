/*
 55. Jump Game
 Medium https://leetcode.com/problems/jump-game/

 You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
 Return true if you can reach the last index, or false otherwise.

 Example 1: Input: nums = [2,3,1,1,4] Output: true
 Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

 Example 2: Input: nums = [3,2,1,0,4] Output: false
 Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

 Constraints:
     1 <= nums.length <= 104
     0 <= nums[i] <= 105
 */

class Solution55 {
  func canJump(_ nums: [Int]) -> Bool {
    var jumps = Array(repeating: false, count: nums.count)
    jumps[0] = true
    var index = 0
    let targetIndex = nums.count - 1

    while index < targetIndex, jumps[index] == true {
      let currentJump = nums[index]
      if currentJump > 0 {
        for jump in 1 ... currentJump {
          let jumpIndex = jump + index
          if jumpIndex == targetIndex {
            return true
          }
          if jumpIndex <= targetIndex {
            jumps[jumpIndex] = true
          }
        }
      }
      index += 1
    }
    return jumps[index]
  }

  func test() {
    let sol = Solution55()
    var tests55: [Test55] = []
    tests55.append(Test55(nums: [2, 3, 1, 1, 4], exp: true))
    tests55.append(Test55(nums: [3, 2, 1, 0, 4], exp: false))
    tests55.forEach { test in
      print("Test nums \(test.nums) = \(sol.canJump(test.nums)) == \(test.exp)")
    }
  }
}

struct Test55 {
  var nums: [Int]
  var exp: Bool
}
