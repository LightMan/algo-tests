"use strict";

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
