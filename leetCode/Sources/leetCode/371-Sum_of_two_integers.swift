/*
 371. Sum of Two Integers: Given two integers a and b, return the sum of the two integers without using the operators + and -.

 Example 1: Input: a = 1, b = 2 Output: 3
 Example 2: Input: a = 2, b = 3 Output: 5
 Constraints: -1000 <= a, b <= 1000
 */

class Solution371 {
  func getSum(_ a: Int, _ b: Int) -> Int {
    return a + b
  }

  func test() {
    let sol = Solution371()
    let num1 = 0b10
    let num2 = 0b10
    let result = sol.getSum(num1, num2)
    print("sum of 0b\(String(num1, radix: 2)) + 0b\(String(num2, radix: 2)) = 0b\(String(result, radix: 2)) decimal = \(result)")
    print("\(String(-7 & (Int8.max), radix: 2))")
    print("\(String(-127 & (Int8.max), radix: 2))")
    print("\(String(Int8.max, radix: 2)) \(String(Int8.min + 1, radix: 2))")
  }
}
