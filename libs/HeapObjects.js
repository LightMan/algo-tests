class Heap {

  constructor(compareNodesFund) {
    // takes two arguments, parent and child
    // returns true if parent is correctly positioned regarding its child, false otherwise
    this.validChildFunc = compareNodesFund;
    this.arr = [];
  }

  top() {
    return this.arr[0];
  }

  pop() {
    if (this.arr.length === 0) return undefined;

    this._swapValues(0, this.arr.length - 1);
    const root = this.arr.pop();
    this._checkIntegrityDownFrom(0);
    return root;
  }

  add(value) {
    this.arr.push(value);
    this._checkIntegrityUpFrom(this.arr.length - 1);
  }

  _indexOfParentBetween(index1, index2) {
    if (index1 === undefined && index2 === undefined) return undefined;
    if (index2 === undefined) return index1;

    return this.validChildFunc(this.arr[index1], this.arr[index2]) ? index1 : index2;
  }

  _checkIntegrityUpFrom(index) {
    if (index === 0) return;

    // Parents should be higher (maxHeap) or lower (minHeap) than children
    const parentIndex = this._parentIndexOf(index);
    const beforeIndex = this._indexOfParentBetween(parentIndex, index);
    if (beforeIndex === parentIndex) {
      return;  // No need to swap
    }
    this._swapValues(parentIndex, index);
    this._checkIntegrityUpFrom(parentIndex);
  }

  _checkIntegrityDownFrom(index) {
    // Parents should be higher (maxHeap) or lower (minHeap) than children
    const leftIndex = this._leftChildIndexOf(index);
    const rightIndex = this._rightChildIndexOf(index);
    const childBeforeIndex = this._indexOfParentBetween(leftIndex, rightIndex);
    if (childBeforeIndex === undefined) {
      return;  // No children
    }

    if (!this.validChildFunc(this.arr[index], this.arr[childBeforeIndex])) {
      this._swapValues(index, childBeforeIndex);
      this._checkIntegrityDownFrom(childBeforeIndex);
    }
  }

  _swapValues(index1, index2) {
    [this.arr[index2], this.arr[index1]] = [this.arr[index1], this.arr[index2]];
  }

  _parentIndexOf(index) {
    if (index <= 0 || this.arr.length === 0) return undefined;

    const parentIndex = Math.floor((index - 1) / 2);
    return parentIndex < this.arr.length ? parentIndex : undefined;
  }

  _leftChildIndexOf(index) {
    // 0 1 2 3 4 5  0 parent of 1,2, 1 parent 4,5 left(0)=1 left(1)=3 left(2)=5
    const childIndex = index * 2 + 1;
    return childIndex < this.arr.length ? childIndex : undefined;
  }

  _rightChildIndexOf(index) {
    // 0 1 2 3 4 5  0 parent of 1,2, 1 parent 4,5 right(0)=2 right(1)=4 right(2)=und
    const childIndex = index * 2 + 2;
    return childIndex < this.arr.length ? childIndex : undefined;
  }
} export default Heap;

/* test
const validChildFunc = (value1, value2) => {
  if (value2 === undefined) return true;
  return value1.left >= value2.left;
};
const nextXHeap = new Heap(validChildFunc);


let buildings = [[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]];
buildings.forEach(([left, right, height]) => {
  nextXHeap.add({ left, right, height });
});

*/