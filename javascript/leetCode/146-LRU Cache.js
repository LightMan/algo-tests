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

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacityLeft = capacity;
  this.keysHash = new WeakMap();
  this.beforeFirst = { key: 'PREV' };
  this.afterLast = { prev: this.beforeFirst, key: 'LST' };
  this.beforeFirst.next = this.afterLast;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.keysHash[key];
  if (node === undefined) {
    return -1;
  }
  this.__dettach(node);
  this.__toFirst(node);
  return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.keysHash[key];

  if (node === undefined) {
    if (this.capacityLeft === 0) {
      // Reuse the last node
      node = this.afterLast.prev;
      delete this.keysHash[node.key]; // Delete last node from the hash
    } else {
      // There is free space in the cache
      this.capacityLeft -= 1;
      node = {};
    }
  }

  // Update or set value and key
  node.key = key;
  node.value = value;
  this.keysHash[key] = node;
  this.__dettach(node);
  this.__toFirst(node);
};

LRUCache.prototype.__dettach = function (node) {
  if (!node.prev || !node.next) return;
  // Dettach from list
  node.prev.next = node.next;
  node.next.prev = node.prev;
};

LRUCache.prototype.__toFirst = function (node) {
  // Moved or inserted in first place
  this.beforeFirst.next.prev = node;
  node.next = this.beforeFirst.next;
  node.prev = this.beforeFirst;
  this.beforeFirst.next = node;
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const commands = ["LRUCache", "get", "get", "put", "get", "put", "put", "put", "put", "get", "put"];
const args = [[1], [6], [8], [12, 1], [2], [15, 11], [5, 2], [1, 15], [4, 2], [5], [15, 15]];

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
  console.log(`${command} ${arg} = ${result} | keys ${Object.keys(cache.keysHash)}`);
}

