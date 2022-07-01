/*
 Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
 Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 Example 1: Input: x = 123 Output: 321
 Example 2: Input: x = -123 Output: -321
 Example 3: Input: x = 120 Output: 21
 Constraints: -231 <= x <= 231 - 1
 */
import Foundation

class Solution {
  func reverse(_ x: Int) -> Int {
    let digits = numberOfDigits(x)
    // print("Nun \(x) has \(digits) digits")
    var num = Int32(x)
    var result: Int32 = 0
    var pos: Int32 = 1
    while num != 0 {
      let mod: Int32 = num % 10 // Step 1: 3 digits 123 => 123 % 10 = 3 // Step 2: 12 % 10 = 2 // Step 3: 1 % 10 = 1

      if (digits - pos - 1) > 7 {
        let val = myPow10(times: digits - pos - 1, mod)
        if val > Int32.max / 10 || val < Int32.min / 10 {
          return 0
        }
      }
      let multiplied = myPow10(times: digits - pos, mod) // Step 1: 3 * 10**( 3 - 1) = 300 // Step 2: 2 * 10**(3 - 2) = 2*10 = 20 // 1 * 10**(3-3) = 1 * 1 = 1
      if result / 10 + multiplied / 10 > Int32.max / 10 || result / 10 + multiplied / 10 < Int32.min / 10 {
        return 0
      }
      result += multiplied // Step 1: 0 + 300 = 300 // Step 2:  300+20 = 320 // Step 3: 320 + 1 = 321
      num = num / 10 // Step1: 123 => 12 // Step 2: 12 / 10 = 1 // Step 3: 1 / 10 = 0
      pos += 1 // Step 1: pos = 2 // Step 2: pos = 3 // Step 3: pos = 4
    }
    return Int(result) // result = 123
  }

  func myPow10(times: Int32, _ x: Int32) -> Int32 {
    var result: Int32 = x
    for _ in 0 ..< times {
      result *= 10
    }
    return result
  }

  func numberOfDigits(_ x: Int) -> Int32 {
    if x == 0 {
      return 0
    }
    var num = abs(x)
    var digits: Int32 = 1
    repeat {
      num = num / 10
      if num != 0 {
        digits += 1
      }
    } while num != 0
    return digits
  }
}

let sol = Solution()
let test1 = 123
let test2 = -123
let test3 = 120
let test4 = 1_534_236_469
let test5 = -1_534_236_469
let tests = [test4, test5]
for test in tests {
  print("Sol reverse es \(sol.reverse(test))")
}
