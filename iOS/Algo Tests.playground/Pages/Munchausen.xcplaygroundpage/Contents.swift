//: [Previous](@previous)

import Foundation

func swiftMunchausenNumbers() {
    // 1
    var cache: [Int32] = [0]
    (1 ... 9).forEach { num in
        let powResult = pow(Double(num), Double(num))
        cache.append(Int32(powResult))
    }

    // 2
    for n in (0 ... 500000000) {
        if isMunchausenNumber(Int32(n), cache: cache) {
            print(n)
         }
     }
}

func isMunchausenNumber(_ number: Int32, cache: [Int32]) -> Bool {
    var currentNumber = number
    var sum: Int32 = 0
        
    while currentNumber > 0 {  // 3
        let digit = currentNumber % 10  // 4
        sum += cache[Int(digit)]   // 5
        if sum > number {
            return false
         }
         currentNumber /= 10  // 6
    }
        
    return number == sum
}

swiftMunchausenNumbers()
//: [Next](@next)
