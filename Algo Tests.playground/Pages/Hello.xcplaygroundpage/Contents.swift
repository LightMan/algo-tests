//: [Previous](@previous)

import Foundation

class Solution {
  func canPartition(_ nums: [Int]) -> Bool {
      return dfs([], nums)
  }

  func dfs(_ arr1: [Int], _ arr2: [Int]) -> Bool {
    return true
  }
  
  func sumArray(_ arr: [Int]) -> Int {
    return arr.reduce(0, { prev, curr in prev + curr })
}

let sol = Solution();
let result = sol.canPartition([1,5,11,5])
sol.sumArray([1,2,3])
print("Result is \(result)")

