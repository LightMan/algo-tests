//: [Previous](@previous)
import Foundation

class Solution {
    var memo: [[[Int]]: Int] = [:]

    func canPartition(_ nums: [Int]) -> Bool {
        let total = sumArray(nums)
        if (total % 2 != 0) {
            return false
        }
        let mid = total / 2        
        var numsCount : [Int: Int] = [:]
        nums.forEach( { numsCount[$0] = (numsCount[$0] ?? 0) + 1})
        var subSuccess = 0
        
        var dp = Array<Int>(repeating: 0, count: numsCount.count)
        var index = 0
        for (number, repeated) in numsCount.enumerated() {
            print("Number \(number) repeated \(repeated)")
            if mid - number < 0 {
                return false
            }
            if mid == number {
                subSuccess += 1
                if subSuccess == 2 {
                    return true
                }
                dp[number] = -1                
            }

            

            index += 1
        }

        return true
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
