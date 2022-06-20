const previousResults: number[][] = [];

function maxUncrossedLines(nums1: number[], nums2: number[]): number {
  const memoization: number[][] = [];
  return lcsRecursive(nums1, nums2, nums1.length, nums2.length, memoization);
};

function lcsRecursive(nums1: number[], nums2: number[], num1LastPos: number, num2LastPos: number, previousResults_nop: number[][]): number {

  if (num1LastPos === 0 || num2LastPos === 0) {
    return 0;
  }

  if (previousResults[num1LastPos - 1] && previousResults[num1LastPos - 1][num2LastPos - 1]) {
    return previousResults[num1LastPos - 1][num2LastPos - 1];
  }

  let result;
  if (nums1[num1LastPos - 1] === nums2[num2LastPos - 1]) {
    result = 1 + lcsRecursive(nums1, nums2, num1LastPos - 1, num2LastPos - 1, previousResults);
  } else {
    const leftResult = lcsRecursive(nums1, nums2, num1LastPos - 1, num2LastPos, previousResults);
    const rightResult = lcsRecursive(nums1, nums2, num1LastPos, num2LastPos - 1, previousResults);
    result = Math.max(leftResult, rightResult);
  }
  if (!previousResults[num1LastPos - 1]) previousResults[num1LastPos - 1] = [];
  previousResults[num1LastPos - 1][num2LastPos - 1] = result;

  return result;
}

