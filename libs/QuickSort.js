function quickSort(nums, left = 0, right = nums.length - 1) {

  if (nums <= 1 || left >= right) return nums; // Left must be before right

  const pivot = partition(nums, left, right);
  quickSort(nums, left, pivot - 1); // Sort elements at the left of the pivot, if any.
  quickSort(nums, pivot, right); // Sort elements at the right of the pivot, if any.

  return nums;
}

function partition(nums, left, right) {
  const pivotValue = nums[(left + right) >> 1];

  while (left <= right) {

    while (nums[left] < pivotValue) left++;
    while (nums[right] > pivotValue) right--;

    if (left <= right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }
  return left;
}

const tests = [];
tests.push({ array: [] });
tests.push({ array: [2] });
tests.push({ array: [6, 4, 8, 1, 8] });
tests.push({ array: [2, 6, 5, 0, 8, 7, 1, 3] });
tests.push({ array: [0, -1, 8, 9, 0, 8, 7, 1, 3] });

tests.forEach((test, index) => {
  console.log(`Test ${index} with [${test.array}] sorted = [${quickSort(test.array)}]`);
});
