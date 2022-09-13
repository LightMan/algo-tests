//  Definition for singly-linked list.
public class ListNode {
  public var val: Int
  public var next: ListNode?
  public init() { val = 0; next = nil }
  public init(_ val: Int) { self.val = val; next = nil }
  public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next }
}

class Solution143 {
  enum Turn {
    case normal
    case reversed
  }

  func printList(_ head: ListNode?) {
    var node = head
    while node != nil {
      if let val = node?.val {
        print("\(val)\(node?.next != nil ? " -> " : "")", terminator: "")
      }
      node = node?.next
    }
    print("")
  }

  func reorderList(_ head: ListNode?) {
    guard let head = head else {
      return
    }
    var node = head
    var reversed = ListNode(head.val)
    var nodesCount = 0
    while let nodeNext = node.next {
      reversed = ListNode(nodeNext.val, reversed)
      node = nodeNext
      nodesCount += 1
    }

    // Watch out to finish correctly
    // Normal: 1 -> 2 -> 3 -> 4 -> 5      Reversed: 5 -> 4 -> 3 -> 2 -> 1
    // Sol: 1 -> 5 -> 2 -> 4 -> 3
    // Iterate First Normal Then reversed and so on until next node val == last val
    var normal = head
    var current = normal
    var turn = Turn.normal
    // 1 -> 5 -> 2 -> 4 -> 3
    printList(head)
    printList(reversed)
    while nodesCount > 0 {
      switch turn {
      case .normal:
        let normalNext = normal.next
        current.next = reversed
        current = reversed // C5; C4
        if let normalNext = normalNext {
          normal = normalNext // N = 2; N = 3
        }
        turn = .reversed
      case .reversed:
        let reversedNext = reversed.next
        current.next = normal // 5 -> 2 ; 4 -> 3
        current = normal // C2 // C3
        if let reversedNext = reversedNext {
          reversed = reversedNext // R4 // R3
        }
        turn = .normal
      }
      nodesCount -= 1
    }
    current.next = nil
  }
}
