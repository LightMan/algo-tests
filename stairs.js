"use strict";

// There is a start with a number n of steps
// we can go upstairs by jump from one step at a time
// two steps or three steps
// but we have to finish in the last step exactly
// Find the number of combinations to go upstairs
// For example a 3 stepped stairs will have 4 combinations:
// 1st=1+1+1 2nd=2+1 3rd=1+2 4=3

const solution = (n) => {
  // Check minimum cases
  const steps = [1];

  let total = 0;
  for (let pos = 0; pos < n; pos++) {
    const branches = steps[pos];
    for (let jumpLength = 1; jumpLength < 4; jumpLength++) {
      if (pos + jumpLength < n) {
        steps[pos + jumpLength] = (steps[pos + jumpLength] || 0) + branches;
      }
      if (pos + jumpLength === n) {
        total += branches;
      }
    }
  }
  return total;
};

console.log(`3 stairs ${solution(3)}`);
console.log(`4 stairs ${solution(4)}`);
console.log(`5 stairs ${solution(5)}`);
