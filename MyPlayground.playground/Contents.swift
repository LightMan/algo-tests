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
        return
               """
                Value \(value)
                 / left: \(left?.debugDescription ?? "")  \ right:  \(right?.debugDescription ?? "")
               """
    }
}

func solution(arr: [Int]) -> String {
    if (arr.isEmpty || arr[0] == -1) {
        return ""
    }
    
    var nodes = arr
    let root = Node(value: nodes.removeFirst())!
    buildTree(nodesValues: &nodes, parent: root)
    debugPrint("root value \(root.value) left: \(root.left?.value ?? 0) right: \(root.right?.value ?? 0)")
    debugPrint("Tree: \(root.debugDescription)")
    return "Left"
}

func buildTree(nodesValues: inout [Int], parent: Node ) -> Node? {
    guard !nodesValues.isEmpty, let node = Node(value: nodesValues.removeFirst(), parent: parent) else {
        return nil
    }
    debugPrint("Built node value \(node.value) parent:\(parent.value) nodes left \(nodesValues)")
    
    node.left = createNodeNextValue(nodesValues: &nodesValues, parent: parent)
    node.right = createNodeNextValue(nodesValues: &nodesValues, parent: parent)
    debugPrint("Nodes at node \(node.value): \(nodesValues)")
    
    // Navigate next level
    
    return node
}

func loadLevel(nodesValues: inout [Int], root: Node) {
    var levelNodes = [root]
    repeat {
        var newNodes: [Node] = []
        levelNodes.forEach( { node in
            if let left = createNodeNextValue(nodesValues: &nodesValues, parent: node) {
                newNodes.append(left)
            }
            if let right = createNodeNextValue(nodesValues: &nodesValues, parent: node) {
                newNodes.append(right)
            }
        })
        levelNodes = newNodes
    } while(!levelNodes.isEmpty)
}

func createNodeNextValue(nodesValues: inout [Int], parent: Node ) -> Node? {
    guard !nodesValues.isEmpty else {
        return nil
    }
    return Node(value: nodesValues.removeFirst(), parent: parent)
}


