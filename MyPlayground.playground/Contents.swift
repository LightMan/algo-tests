import UIKit

let arrayOfNodes = [3, 6, 2, 9, 12, 10, 20]
solution(arr: arrayOfNodes)

class Node: CustomDebugStringConvertible {
    let parent: Node?
    var left: Node?
    var right: Node?
    var value: Int
    
    init?(value: Int, parent: Node? = nil) {
        if (value == -1) {
            return nil
        }
        self.value = value
        self.parent = parent
    }
    var debugDescription: String {
        return "V \(value) L\(left?.value ?? -1) R\(right?.value ?? -1)"
    }
}

func solution(arr: [Int]) -> String {
    if (arr.isEmpty || arr[0] == -1) {
        return ""
    }
    
    guard let root = buildTree(nodesValues: arr) else {
        return ""
    }
    debugPrint("Tree root: \(root.debugDescription)")
    let left = sumTree(from: root.left)
    let right = sumTree(from: root.right)
    debugPrint("Left is \(left) right is \(right)")
    if left > right {
        return "Left"
    } else if right > left {
        return "Right"
    } else {
        return ""
    }
}

func buildTree(nodesValues: [Int]) -> Node? {
    var nodesCreated: [Node] = []
    guard let nodeValue = nodesValues.first, let root = Node(value: nodeValue) else {
        return nil
    }
    
    nodesCreated.append(root)
    var valuesIndex = 1
    while (!nodesCreated.isEmpty) {
        let parent = nodesCreated.removeFirst()
        if (valuesIndex < nodesValues.count) {
            let valueLeft = nodesValues[valuesIndex]
            valuesIndex += 1 // Next pos
            parent.left = Node(value: valueLeft, parent: parent)
            if let left = parent.left {
                nodesCreated.append(left)
            }
        }
        if (valuesIndex < nodesValues.count) {
            let valueRight = nodesValues[valuesIndex]
            valuesIndex += 1 // Next pos
            parent.right = Node(value: valueRight, parent: parent)
            if let right = parent.right {
                nodesCreated.append(right)
            }
        }

        debugPrint("Built parent node value \(parent.value) left:\(parent.left?.value ?? -1) right \(parent.right?.value ?? -1) nodesCreated \(nodesCreated)")
    }
        
    // Navigate next level
    return root
}

func printTree(from: Node?) {
    guard let from = from else {
        return
    }
    var nodesToPrint: [Node] = Array([from])
    while (!nodesToPrint.isEmpty) {
        let node = nodesToPrint.removeFirst()
        debugPrint(node.debugDescription)
        if let left = node.left {
            nodesToPrint.append(left)
        }
        if let right = node.right {
            nodesToPrint.append(right)
        }
    }
}

func sumTree(from: Node?) -> Int {
    guard let from = from else {
        return 0
    }
    var leftTotal = 0
    if let left = from.left {
        leftTotal = sumTree(from: left)
    }
    var rightTotal = 0
    if let right = from.right {
        rightTotal = sumTree(from: right)
    }
    return from.value + leftTotal + rightTotal
}
