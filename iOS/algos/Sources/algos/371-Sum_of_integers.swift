// 371 https://leetcode.com/problems/sum-of-two-integers/
/*
 Given two integers a and b, return the sum of the two integers without using the operators + and -.

 Example 1: Input: a = 1, b = 2 Output: 3
 Example 2: Input: a = 2, b = 3 Output: 5

 Constraints: -1000 <= a, b <= 1000
 */

import Foundation

typealias IntBit = Int16

enum Bit: IntBit {
  case zero = 0
  case one = 1
}

enum BitOperationError: Error {
  case InvalidPosition
}

extension IntBit {
  func bit(atPos pos: Int) throws -> Bit {
    if pos < 0 || pos > 15 {
      throw BitOperationError.InvalidPosition
    }
    let mask: IntBit = 1 << (pos + 1)
    return (self & mask) != 0 ? Bit.one : Bit.zero
  }
}

func test371() {
  let val: IntBit = 0b0100
  let pos = 1
  do {
    try print("Bit at pos \(1) of \(String(val, radix: 2)) is = \(val.bit(atPos: pos))")
  } catch {
    print("Error")
  }
}
