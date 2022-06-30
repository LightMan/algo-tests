// 191 https://leetcode.com/problems/number-of-1-bits/
// Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).
// Input: n = 00000000000000000000000000001011 Output: 3

class Solution {
    func hammingWeight(_ n: Int) -> Int {
        var number = n
        var numOnes = 0
        while (number > 0) {
            numOnes += number & 1
            number = number >> 1
        }
        return numOnes        
    }
} 

let sol = Solution()
let num = 0b0110
print("Number of ones in \(String(num, radix: 2)) \(sol.hammingWeight(num))")