class Heap {
  constructor(isMaxHeap) {
    this.heap = [];
    this.values = {};
    this.isMax = isMaxHeap;
  }

  heapCompare(val1, val2) {
    return this.isMax ? val1 > val2 : val1 < val2;
  }

  get length() {
    return this.heap.length;
  }

  parentPos(childPos) {
    return Math.floor((childPos - 1) / 2);
  }

  leftChildPos(parentPos) {
    return 2 * parentPos + 1;
  }

  rightChildPos(parentPos) {
    return 2 * parentPos + 2;
  }

  swap(pos1, pos2) {
    [this.heap[pos1], this.heap[pos2]] = [this.heap[pos2], this.heap[pos1]];
  }

  get top() {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  get topValue() {
    return values[this.top];
  }

  push(newKey, newValue) {
    // push the new key 
    this.heap.push(newKey);

    if (newValue !== undefined) {
      this.values[newKey] = newValue;
    }

    // get the current index of pushed key
    let curr = this.heap.length - 1;

    // keep comparing till root is reached or we terminate in middle
    while (curr > 0) {
      let parent = this.parentPos(curr);
      if (this.heapCompare(this.heap[curr], this.heap[parent])) {
        // quick swap
        this.swap(curr, parent);
        // update the index of newKey
        curr = parent;
      } else {
        // if no swap, break, since we heap is stable now
        break;
      }
    }
  }

  pop() {
    // swap root with last node
    const n = this.heap.length;
    this.swap(0, n - 1);

    // remove the root i.e. the last item (because of swap)
    const removedKey = this.heap.pop();

    let curr = 0;

    // keep going till atleast left child is possible for current node
    while (this.leftChildPos(curr) < this.heap.length) {
      const leftIndex = this.leftChildPos(curr);
      const rightIndex = this.rightChildPos(curr);
      const minChildIndex = (rightIndex < this.heap.length && this.heapCompare(this.heap[rightIndex], this.heap[leftIndex])) ? rightIndex : leftIndex;
      if (this.heapCompare(this.heap[minChildIndex], this.heap[curr])) {
        // quick swap, if smaller of two children is smaller than the parent (min-heap)
        this.swap(minChildIndex, curr);
        curr = minChildIndex;
      } else {
        break;
      }
    }

    const value = this.values[removedKey];
    if (value !== undefined) {
      delete this.values[removedKey];
      return [removedKey, value];
    }
    // finally return the removed key
    return removedKey;
  }

  value(key) {
    return this.values[key];
  }

  heapify() {
    const last = Math.floor(this.heap.length / 2 - 1);
    for (let i = 0; i <= last; i++) {
      percolateDown(i);
    }
    return heap;
  }

  // follows pretty much the same logic as heappush, except minor modifications
  percolateDown(index) {
    let curr = index;
    // keep going down till heap property is established
    while (2 * curr + 1 < this.heap.length) {
      const leftIndex = this.leftChildPos(curr);
      const rightIndex = this.rightChildPos(curr);
      const minChildIndex = (rightIndex < this.heap.length && this.heapCompare(this.heap[rightIndex], this.heap[leftIndex])) ? rightIndex : leftIndex;
      if (this.heapCompare(this.heap[minChildIndex], this.heap[curr])) {
        // quick swap, if smaller of two children is smaller than the parent (min-heap)
        this.swap(minChildIndex, curr);
        curr = minChildIndex;
      } else {
        break;
      }
    }
  }

  sort() {
    const array = [];
    while (this.length > 0) {
      array.push(this.pop());
    }
    return array;
  }

} module.exports = Heap;

