"use strict";

// There are three string input to the program:
// The first and second input need to be entwined to form the third input.
// The solution must return a boolean if it is possible or not
// Example:
// Input: 'algoexpert', 'your-dream-job', Need to form: 'your-algodream-expert' 
// Result: true 
// The order must be respected

// candidatesStr is an array of string
const solution = (candidatesStr, entwinedStr) => {
  const posIndexes = [];
  posIndexes.fill(0, candidatesStr.length);
  console.log(`posIndexes ${posIndexes}`);

  let candidateStr = candidatesStr[0];
  let otherStr = candidatesStr[1];
  let candidatePos = 0;
  let otherPos = 0;
  let twoSolutionsFound = false;
  let entwinedPosBack = -1, candidatePosBack = -1, otherPosBack = -1, entPosBack = -1;

  for (let entwinedPos = 0; entwinedPos < entwinedStr.length;) {
    const entwinedChar = entwinedStr.charAt(entwinedPos);
    let candidateChar = candidateStr.charAt(candidatePos);
    let otherChar = otherStr.charAt(otherPos);

    console.log(`${candidateChar} or ${otherChar} == ${entwinedChar}`);

    if (candidateChar === entwinedChar && otherChar === entwinedChar) {
      // Both candidates match the entwinedChar, so if in the future there is not a match, we need to go back
      console.log(`Both match at ${entwinedChar} 1stPos ${candidatePos} 2ndPos ${otherPos} entPos ${entwinedPos} backFirst ${twoSolutionsFound}`);
      twoSolutionsFound = true;
      entwinedPosBack = entwinedPos;
      candidatePosBack = candidatePos;
      otherPosBack = otherPos;
    }

    if (candidateChar === entwinedChar) {
      // There is a match between the first and the entwined => advance the first position
      if (candidatePos < candidateStr.length) {
        candidatePos++;
        entwinedPos++;
      }
    } else if (otherChar === entwinedChar) {
      // There is a match between the second and the entwined => advance the second position
      if (otherPos < otherStr.length) {
        otherPos++;
        entwinedPos++;
      }
    } else if (twoSolutionsFound) {
      candidatePos = otherPosBack;
      otherPos = candidatePosBack;
      const tempStr = candidateStr;
      candidateStr = otherStr;
      otherStr = tempStr;
      entwinedPos = entwinedPosBack;
      twoSolutionsFound = false;
    } else {
      return false;
    }

  }

  return true;
};

const result = solution(['1234', '2243'], '12433');
console.log(`Result: ${result}`);