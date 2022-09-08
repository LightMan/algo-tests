/* 
621. Task Scheduler 
Medium https://leetcode.com/problems/task-scheduler/

Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.
However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.
Return the least number of units of times that the CPU will take to finish all the given tasks.

Example 1:
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.

Example 2:
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: On this case any permutation of size 6 would work since n = 0.
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
And so on.

Example 3:
Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation: 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A

Constraints:
    1 <= task.length <= 104
    tasks[i] is upper-case English letter.
    The integer n is in the range [0, 100].

*/

import Heap from '../HeapObjects.js';
//const Heap = require('../HeapObjects.js');

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */

var leastIntervalMath = function (tasks, wait) {
  // Math solution

  // Get the max repeated count, and how many times is repeated 
  // ["A","A","A","B","B","B"] Max repeated is 2 and is repated for A and B = 2

  const tasksDict = {}; // Space O(n)
  let highest = 0;
  let highestRepeatedTasks = [];
  // O(n) iteration
  tasks.forEach(task => {
    tasksDict[task] = tasksDict[task] + 1 || 1;
    if (highest < tasksDict[task]) {
      highestRepeatedTasks = [task];
      highest = tasksDict[task];
    } else if (highest === tasksDict[task]) {
      highestRepeatedTasks.push(task);
    }
  });
  const highestRepeated = highestRepeatedTasks.length;
  const output = highest * (1 + wait) - wait + highestRepeated - 1;
  return Math.max(tasks.length, output);
};

var leastIntervalHeap = function (tasks, wait) {

  {
    // letters are the keys
    if (wait === 0) {
      return tasks.length;
    }

    // First count the tasks: if tasksDict['A'] = 3 => there are three As
    const tasksDict = {}; // Space O(n)
    // O(n) iteration
    tasks.forEach(task => {
      if (tasksDict[task] === undefined) {
        tasksDict[task] = { key: task, stepIn: 1, count: 0 };
      }
      tasksDict[task].count += 1;
    });

    const tasksHeap = createHeap();
    populateHeap(tasksHeap, tasksDict);

    let step = 1;
    let nextTask = tasksHeap.top();
    let tasksQueue = [];
    let outputStr = [];
    while (tasksQueue.length > 0 || nextTask !== undefined) {

      //console.log(`step: ${step} next task ${JSON.stringify(nextTask, null, ' ')}  queue ${JSON.stringify(tasksQueue, null, ' ')}`);

      if (nextTask && nextTask.stepIn <= step) {
        tasksHeap.pop();
        outputStr.push(nextTask.key);
        if (nextTask.count > 1) {
          // Not finished, is added to the waiting queue
          nextTask.count -= 1;
          nextTask.stepIn = step + wait + 1;
          tasksQueue.push(nextTask);
        }
      } else {
        outputStr.push('Idle');
      }
      console.log(`output [${outputStr}]`);
      step += 1;
      while (tasksQueue[0] && tasksQueue[0].stepIn === step) {
        tasksHeap.add(tasksQueue.shift());
      }
      nextTask = tasksHeap.top();
    }

    return step - 1;
  }

  function createHeap() {
    return new Heap((task1, task2) => {
      return task1.count >= task2.count;
    });
  }

  function populateHeap(tasksHeap, tasksDict) {
    for (const key in tasksDict) {
      tasksHeap.add(tasksDict[key]);
    }
  }

};

const tasks = ["A", "A", "A", "B", "B", "C"];
const waitTime = 2;
console.log(`Time minimum ${leastIntervalHeap(tasks, waitTime)}`);
console.log(`Time minimum ${leastIntervalMath(tasks, waitTime)}`);
