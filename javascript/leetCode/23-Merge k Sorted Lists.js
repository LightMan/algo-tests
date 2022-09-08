/*
23. Merge k Sorted Lists
Hard https://leetcode.com/problems/merge-k-sorted-lists/

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

Example 1: Input: lists = [[1,4,5],[1,3,4],[2,6]] Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

Example 2: Input: lists = [] Output: []
Example 3: Input: lists = [[]] Output: []

Constraints:
    k == lists.length
    0 <= k <= 104
    0 <= lists[i].length <= 500
    -104 <= lists[i][j] <= 104
    lists[i] is sorted in ascending order.
    The sum of lists[i].length will not exceed 104.
*/


import { MinPriorityQueue } from '@datastructures-js/priority-queue';

/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (lists.length === 0 || !lists[0]) {
    return null;
  }

  const pointers = Array(lists.length).fill(0);
  const mainHeap = new MinPriorityQueue({ compare: (p1, p2) => p1.val - p2.val });
  mainHeap.dequeue();
  populateMainHeap();
  let mainList;
  let mainListLast;

  const solution = iterateAllLists();
  return solution;

  function iterateAllLists() {
    while (mainHeap.size() > 0) {
      const minOfAll = mainHeap.dequeue();
      // console.log(`Min of all list[${minOfAll.index}]=${minOfAll.val}`);
      pushToMainList(minOfAll.val);
      advancePointerPosition(minOfAll.index);
      addPointerValueToHeap(minOfAll.index);
    }
    return mainList;
  }

  function pushToMainList(value) {
    const node = new ListNode(value);
    if (mainList === undefined) {
      mainList = node;
    } else {
      mainListLast.next = node;
    }
    mainListLast = node;
  }

  function advancePointerPosition(listIndex) {
    pointers[listIndex] = pointers[listIndex].next;
  }

  function addPointerValueToHeap(listIndex) {
    const list = lists[listIndex];
    let pointer = pointers[listIndex];
    if (pointer === 0) {
      // First iteration
      pointers[listIndex] = list;
      pointer = list;
    }

    if (pointer !== null) {
      // Not after the last, within the list
      mainHeap.enqueue({ index: listIndex, val: pointer.val });
    }
  }

  function populateMainHeap() {
    // while pointer not finished
    for (let listIndex = 0; listIndex < lists.length; listIndex++) {
      addPointerValueToHeap(listIndex);
    }
  }
};

const tests = [];

function linkNodes(nodes) {
  nodes.forEach((node, index) => {
    node.next = nodes[index + 1] || null;
  });
  return nodes[0] || null;
}

// [[1, 4, 5], [1, 3, 4], [2, 6]]
const l1 = linkNodes([new ListNode(1), new ListNode(4), new ListNode(5)]);
const l2 = linkNodes([new ListNode(1), new ListNode(3), new ListNode(4)]);
const l3 = linkNodes([new ListNode(2), new ListNode(6, null)]);


tests.push({ lists: [l1, l2, l3], expected: [1, 1, 2, 3, 4, 4, 5, 6] });
tests.push({ lists: [], expected: [] });
tests.push({ lists: [null], expected: [] });

tests.forEach((test, index) => {
  const solution = mergeKLists(test.lists);
  console.log(`Test ${index} lists: [${test.lists}] = [${solution}] expected [${test.expected}]`);
});