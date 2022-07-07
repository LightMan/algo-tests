/*
146. LRU Cache Medium https://leetcode.com/problems/lru-cache/

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
Implement the LRUCache class:
    LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
    int get(int key) Return the value of the key if the key exists, otherwise return -1.
    void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

Example 1:
Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output [null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4

Constraints:

    1 <= capacity <= 3000
    0 <= key <= 104
    0 <= value <= 105
    At most 2 * 105 calls will be made to get and put.
*/

class DoubleList {
  value;
  prev;
  next;

  constructor(value, next, prev) {
    this.value = value;
    this.next = next || null;
    this.prev = prev || null;
  }

}

/**
 * @param {number} capacity
 */
class LRUCache {

  capacityLeft;
  keysPointerDict;
  mostUsed;
  leastUsed;

  constructor(capacity) {
    this.capacityLeft = capacity;
    this.keysPointerDict = [];
    this.mostUsed = null;
    this.leastUsed = null;
  }

  /** 
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const node = this.keysPointerDict[key];
    if (!node) {
      // Node is not in the cache
      return -1;
    }
    this.setAsMRU(node);

    return node.value;
  }

  /** 
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    let node;
    if (this.capacityLeft > 0) {
      // Cache is not full
      node = this.createNode(key, value);
    } else {
      node = this.getFromList(key, value);
    }
    this.setAsMRU(node);
    this.updateNodeAndHash(key, value, node);
  }

  getFromList(key, value) {
    // Is the node already in the list? The key exists in the hashmap
    let currentNode = this.keysPointerDict[key];
    if (currentNode) {
      // The node is in the list, detached first
      this.detach(currentNode);
    } else {
      // The node is not in the list, reused LRU
      currentNode = this.unlinkLRU();
      delete this.keysPointerDict[currentNode.key]; // Delete evictied node from the hash    
    }
  }

  updateNodeAndHash(key, value, node) {
    // Update hashmap and node value
    this.keysPointerDict[key] = node;
    node.value = value;
  }

  setAsMRU(node) {
    // Update the MRU
    if (this.mostUsed === node) {
      return;
    }

    this.detach(node);

    // Move it to the first place
    node.prev = null;
    node.next = this.mostUsed;
    if (this.mostUsed.prev) this.mostUsed.prev = node;
    this.mostUsed = node;
  }

  detach(node) {
    const prevNode = node.prev;
    const nextNode = node.next;
    if (prevNode) prevNode.next = nextNode;
    if (nextNode) nextNode.prev = prevNode;
  }


  // Get the LRU node and return it updating the list to the next least used
  unlinkLRU() {
    const nodeLRU = this.leastUsed;
    const beforeLast = this.nodeLRU.prev;
    beforeLast.next = null;
    nodeLRU.prev = null;
    this.leastUsed = beforeLast;
    return nodeLRU;
  }

  // The size of the list is below the limit
  createNode(key, value) {
    this.capacityLeft -= 1;
    // New node next is the first in the list
    const node = new DoubleList(value);

    if (this.leastUsed === null) {
      // List is empty, first node added
      this.leastUsed = node;
    }
    return node;
  }
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const commands = ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"];
const args = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];

let cache;
for (let i = 0; i < commands.length; i++) {
  const command = commands[i];
  const arg = args[i];
  let result = null;
  switch (command) {
    case "LRUCache": cache = new LRUCache(arg[0]); break;
    case "put": cache.put(arg[0], arg[1]); break;
    case "get": result = cache.get(arg[0]); break;
  }
  console.log(`${command} ${arg} = ${result}`);
}

