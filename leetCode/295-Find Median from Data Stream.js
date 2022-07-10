/*

295. Find Median from Data Stream
Hard https://leetcode.com/problems/find-median-from-data-stream/

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.
    For example, for arr = [2,3,4], the median is 3.
    For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.

Implement the MedianFinder class:
    MedianFinder() initializes the MedianFinder object.
    void addNum(int num) adds the integer num from the data stream to the data structure.
    double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted. 

Example 1: Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0

Constraints:
    -105 <= num <= 105
    There will be at least one element in the data structure before calling findMedian.
    At most 5 * 104 calls will be made to addNum and findMedian.

Follow up:
    If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
    If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
*/


// Add 9. Min = 9 Max  Mediana: 9
// Add 8. Min = 4 Max 8 
// Add 10 . Min = 4 Max 8

class Heap {
  constructor(isMaxHeap) {
    this.heap = [];
    this.isMax = isMaxHeap;
  }

  get length() {
    return this.heap.length;
  }

  parentPos(childPos) {
    if (childPos === 0) return -1;
    return Math.floor((childPos - 1) / 2);
  }

  leftChildPos(parentPos) {
    const leftPos = 2 * parentPos + 1;
    return leftPos < this.heap.length ? leftPos : undefined;
  }

  rightChildPos(parentPos) {
    const rightPos = 2 * parentPos + 2;
    return rightPos < this.heap.length ? rightPos : undefined;
  }

  swap(pos1, pos2) {
    [this.heap[pos1], this.heap[pos2]] = [this.heap[pos2], this.heap[pos1]];
  }

  get top() {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  push(val) {
    // console.log(`Before push ${val} in [${this.heap}]`);
    this.heap.push(val);
    let childPos = this.heap.length - 1;
    let parentPos = this.parentPos(childPos);
    let needSwap = true;
    while (parentPos >= 0 && needSwap) {
      const parentVal = this.heap[parentPos];
      const childVal = this.heap[childPos];
      needSwap = this.isMax ? childVal > parentVal : childVal < parentVal;
      if (needSwap) {
        this.swap(childPos, parentPos);
        childPos = parentPos;
        parentPos = this.parentPos(childPos);
      }
    }
    // console.log(`After push ${val} in [${this.heap}]`);
  }

  pop() {
    // console.log(`Before pop in [${this.heap}]`);

    // swap last and top
    [this.heap[0], this.heap[this.length - 1]] = [this.heap[this.length - 1], this.heap[0]];
    const top = this.heap.pop();

    if (this.heap.length === 0) {
      // console.log(`After pop=${top} in [${this.heap}]`);
      return top;
    }

    let parentPos = 0;
    let swap = true;
    while (swap && this.leftChildPos(parentPos)) {
      const val = this.heap[parentPos];
      const leftPos = this.leftChildPos(parentPos);
      const rightPos = this.rightChildPos(parentPos);
      let childPos;
      if (this.isMax) {
        childPos = rightPos != undefined && this.heap[leftPos] > this.heap[rightPos] ? leftPos : rightPos;
        swap = val < this.heap[childPos];
      } else {
        childPos = rightPos != undefined && this.heap[leftPos] < this.heap[rightPos] ? leftPos : rightPos;
        swap = val > this.heap[childPos];
      }
      if (swap) {
        [this.heap[parentPos], this.heap[childPos]] = [this.heap[parentPos], this.heap[childPos]];
        parentPos = childPos;
      }
    }
    // console.log(`After pop = ${top} in [${this.heap}]`);
    return top;
  }
}

class MedianFinder {

  constructor() {
    this.minHeap = new Heap(false);
    this.maxHeap = new Heap(true);
  }

  addNum(num) {
    const heapToAdd = this.maxHeap.length <= this.minHeap.length ? this.maxHeap : this.minHeap;
    heapToAdd.push(num);
    // console.log(`min=[${this.minHeap.heap}] max=[${this.maxHeap.heap}]`);
    if (this.maxHeap.top > this.minHeap.top) {
      const max = this.maxHeap.pop();
      // console.log(`pass node to min heap`);
      this.minHeap.push(max);
      // console.log(`min=[${this.minHeap.heap}] max=[${this.maxHeap.heap}]`);
    }
    if (Math.abs(this.maxHeap.length - this.minHeap.length) > 1) {
      // Rebalance
      const [toPush, toPop] = this.maxHeap.length < this.minHeap.length ? [this.maxHeap, this.minHeap] : [this.minHeap, this.maxHeap];
      // console.log(`rebalance pop from ${toPop} push in ${toPush}`);
      toPush.push(toPop.pop());
    }
  }

  findMedian() {
    if (this.maxHeap.length === 0) {
      return 0;
    }
    // console.log(`max=[${this.maxHeap.heap}], min=[${this.minHeap.heap}]`);
    if (this.minHeap.length == this.maxHeap.length) {
      return (this.minHeap.top + this.maxHeap.top) / 2;
    } else {
      return this.minHeap.length > this.maxHeap.length ? this.minHeap.top : this.maxHeap.top;
    }
  }
}

// const ops = ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"];
// const argsOps = [[], [1], [2], [], [3], []];
// const ops = ["MedianFinder", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian"];
// const argsOps = [[], [-1], [], [-2], [], [-3], [], [-4], [], [-5], []];

const ops = ["MedianFinder", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian"];
const argsOps = [[], [1], [], [2], [], [3], [], [4], [], [5], [], [6], [], [7], [], [8], [], [9], [], [10], []];
// [null,null,-1.00000,null,-1.50000,null,-2.00000,null,-2.50000,null,-3.00000]

let medianFinder;
const results = ops.map((op, index) => {
  let result = null;
  const args = argsOps[index];
  switch (op) {
    case "MedianFinder": medianFinder = new MedianFinder(); break;
    case "addNum": medianFinder.addNum(args[0]); break;
    case "findMedian": result = medianFinder.findMedian(); break;
  }
  if (result)
    console.log(`${op} with ${args[0]} = ${result}`);
  return result;
});

console.log(`Ops results [${results}]`);

