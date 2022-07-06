function heapify(heap) {
  for (let i in heap) {
    percolateDown(heap, i);
  }
  return heap;
}

// follows pretty much the same logic as heappush, except minor modifications
function percolateDown(heap, index) {
  let curr = index;
  // keep going down till heap property is established
  while (2 * curr + 1 < heap.length) {
    const leftIndex = 2 * curr + 1;
    const rightIndex = 2 * curr + 2;
    const minChildIndex = (rightIndex < heap.length && heap[rightIndex] < heap[leftIndex]) ? rightIndex : leftIndex;
    if (heap[minChildIndex] < heap[curr]) {
      // quick swap, if smaller of two children is smaller than the parent (min-heap)
      [heap[minChildIndex], heap[curr]] = [heap[curr], heap[minChildIndex]];
      curr = minChildIndex;
    } else {
      break;
    }
  }
}

function heapify2(arr, start = 0) {
  const last = Math.floor(arr.length / 2 - 1);
  for (let i = start; i <= last; i++) {
    let j = i;
    let root = start + Math.floor((j - start) / 2);
    while (root >= start && arr[root] < arr[j]) {
      [arr[root], arr[j]] = [arr[j], arr[root]];
      j = root;
      root = start + Math.floor((j - start) / 2);
    }
  }
  return arr;
}

function swap(arr, i, j) {
  const c = arr[i];
  arr[i] = arr[j];
  arr[j] = c;
}

function heapify3(arr, n, i) {
  let smallest = i; // Initialize smallest as root 
  let l = 2 * i + 1; // left = 2*i + 1 
  let r = 2 * i + 2; // right = 2*i + 2 

  // If left child is smaller than root 
  if (l < n && arr[l] < arr[smallest])
    smallest = l;

  // If right child is smaller than smallest so far 
  if (r < n && arr[r] < arr[smallest])
    smallest = r;

  // If smallest is not root 
  if (smallest != i) {
    swap(arr, i, smallest);
    // [arr[i], arr[smallest]] = [arr[smallest], arr[i]];

    // Recursively heapify the affected sub-tree 
    heapify(arr, n, smallest);
  }
  return arr;
}

const heapify4 = (arr, length, i) => {
  let largest = i;
  const left = i * 2 + 1;
  const right = left + 1;

  if (left < length && arr[left] < arr[largest]) {
    largest = left;
  }

  if (right < length && arr[right] < arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, length, largest);
  }

  return arr;
};


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const arr1 = [19, 13, 42, 33, 3, 58, 12];
const arr2 = [1, 2, 8000, 3, 4, 5, -1, 2000, 8000, -1, 2000];
const arrays = [];
for (let c = 0; c < 10; c++) {
  const array = [];
  for (let w = 0; w < 10; w++) {
    array.push(getRandomIntInclusive(-1000, 1000));
  }
  // arrays.push(array);
}

arrays.push(arr1);


arrays.forEach(test => {
  // console.log(`heapify arr ${test} = ${heapify(test)}`);
  // console.log(`heapify2 arr ${test} = ${heapify2(test)}`);
  const testCopy = [...test];
  console.log(`before heapify arr ${test}`);
  for (let i = 0; i < test.length; i++) {
    heapify2(test, test.length, i);
    test = [...testCopy];
    heapify3(test, test.length, i);
    test = [...testCopy];
    heapify4(test, test.length, i);
  }
  console.log(`after heapify3 arr ${test}`);
  console.log(`after heapify4 arr ${testCopy}`);
});
