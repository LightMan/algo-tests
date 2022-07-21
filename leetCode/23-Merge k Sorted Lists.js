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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue';

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (lists.length === 0) {
    return [];
  }

  const heaps = createHeaps(lists.length);
  const pointers =

    function createHeaps(length) {
      let heaps = [];
      for (let h = 0; h < length; h++) {
        const minHeap = new MinPriorityQueue((val) => val.value);
        // const minHeap = new MinPriorityQueue({ compare: (p1, p2) => p1.dist - p2.dist });    
        heaps[h] = minHeap;
      }
      return heaps;
    };

  // while pointer not finished

};