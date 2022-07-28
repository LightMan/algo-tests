//: [Previous](@previous)
import Foundation

class Solution {
    func canPartition(_ nums: [Int]) -> Bool {
        return dfs([], nums)
    }

    func dfs(_ left: [Int], _ right: [Int]) -> Bool {
        // print("Comparing \(left) with \(right)")
        if sumArray(left) == sumArray(right) {
            // print("Found with \(left) == \(right)")
            return true
        }

        if right.count == 0 {
            return false
        }

        for (index, number) in right.enumerated() {
            var rightCopy = Array(right)
            rightCopy.remove(at: index)
            if dfs(Array(left + [number]), rightCopy) {
                return true
            }
        }
        return false
    }

    func sumArray(_ arr: [Int]) -> Int {
        return arr.reduce(0) { $0 + $1 }
    }
}

let sol = Solution()
var tests: [[Int]] = []
tests.append([5, 2, 3])
// tests.append([1, 5, 11, 5])
// tests.append([8, 4, 5, 6, 1])
// tests.append([100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 99, 97])
for test in tests {
    print("Result with test is \(sol.canPartition(test))")
}
