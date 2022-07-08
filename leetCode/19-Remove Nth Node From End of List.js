/*
19. Remove Nth Node From End of List. 
Medium: https://leetcode.com/problems/remove-nth-node-from-end-of-list/

Given the head of a linked list, remove the nth node from the end of the list and return its head.

Example 1: Input: head = [1,2,3,4,5], n = 2 Output: [1,2,3,5]
Example 2: Input: head = [1], n = 1 Output: []
Example 3: Input: head = [1,2], n = 1 Output: [1]
Constraints:
    The number of nodes in the list is sz.
    1 <= sz <= 30
    0 <= Node.val <= 100
    1 <= n <= sz
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {

  let seekNull = head;
  const jumps = n + 1; // Stop before the victim node
  // Set distance n + 1 from root to seekNull
  for (let i = 0; i < jumps; i++) {
    seekNull = seekNull.next;
    // console.log(`Jumping to ${seekNull.val}`);

    // If n == size of the list, the first node is removed
    if (seekNull == null && i + 1 < jumps) {
      return head.next;
    }
  }

  // Move both pointers until seekNull is null
  let prevDelete = head;
  while (seekNull != null) {
    prevDelete = prevDelete.next;
    seekNull = seekNull.next;
  }

  // prevDelete is before the victim node, remove it by assign next to victim's next
  // Cannot be the last one
  const deleteNode = prevDelete.next;
  prevDelete.next = deleteNode.next;

  return head;
};

var removeNthFromEndWithDummy = function (head, n) {

  const dummy = new ListNode(0, head);
  let seekNull = dummy;
  const jumps = n + 1; // Stop before the victim node
  // Set distance n + 1 from root to seekNull
  for (let i = 0; i < jumps; i++) {
    seekNull = seekNull.next;
  }

  // Move both pointers until seekNull is null
  let prevDelete = dummy;
  while (seekNull != null) {
    prevDelete = prevDelete.next;
    seekNull = seekNull.next;
  }

  // prevDelete is before the victim node, remove it by assign next to victim's next
  // Cannot be the last one
  const deleteNode = prevDelete.next;
  prevDelete.next = deleteNode.next;

  return dummy.next;
};