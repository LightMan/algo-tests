// 2.1 Remove Dups: Write code to remove duplicates from an unsorted linked list. FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed ? Hints : #9, #40;
class Node {
  let data: Int
  var next: Node

  init(data: Int) {
    this.data = data
  }

  static func printList(root: Node) {
    
  }
}

func createLinkedList() -> Node {
  let root = Node(1)
  let n2 = Node(2)
  let n3 = Node(3)  
  root.next = n2
  n2.next = n3
  return root
}


