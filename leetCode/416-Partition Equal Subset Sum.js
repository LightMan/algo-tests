/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {

    if (nums.length === 0) {
        return true;
    }

    const totalSum = sumNums(nums);
    if (totalSum % 2) {
        return false;
    }

    const half = totalSum / 2;
    console.log(`looking for ${half} both sides`);

    const memoRight = {};
    const foundCombination = dfs(0, nums);

    function dfs(subTotal, numsRight) {
        if (subTotal === half) {
            console.log(`Found equal sums ${subTotal} ${numsRight}`);
            return true;
        }
        if (subTotal > half) {
            return false;
        }
        if (memoRight[subTotal] !== undefined) {
            // console.log(`reused memo subtotal=${subTotal} ${numsRight}`);
            return false;
        }

        // console.log(`ST=${subTotal} [${numsRight}]`);
        for (let i = 0; i < numsRight.length - 1; i++) {
            const newRight = [...numsRight];
            const numRight = newRight.splice(i, 1)[0];
            const found = dfs(subTotal + numRight, newRight);
            if (found) {
                return true;
            }
            memoRight[subTotal + numRight] = false;
            // console.log(`mem [${Object.keys(memoRight)}]`);
        }
        return false;
    }

    return foundCombination;

    function sumNums(numbers) {
        return numbers.reduce((prev, current) => prev + current);
    }
};

const tests = [];
tests.push({ nums: [1, 4, 8, 3], expected: true });
tests.push({ nums: [1, 5, 11, 5], expected: true });
tests.push({ nums: [1, 2, 3, 5], expected: false });
tests.push({
    nums: [4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 12, 12, 12, 12, 12, 12, 12, 12, 16, 16, 16, 16, 16, 16, 16, 16, 20, 20, 20, 20, 20, 20, 20, 20, 24, 24, 24, 24, 24, 24, 24, 24, 28, 28, 28, 28, 28, 28, 28, 28, 32, 32, 32, 32, 32, 32, 32, 32, 36, 36, 36, 36, 36, 36, 36, 36, 40, 40, 40, 40, 40, 40, 40, 40, 44, 44, 44, 44, 44, 44, 44, 44, 48, 48, 48, 48, 48, 48, 48, 48, 52, 52, 52, 52, 52, 52, 52, 52, 56, 56, 56, 56, 56, 56, 56, 56, 60, 60, 60, 60, 60, 60, 60, 60, 64, 64, 64, 64, 64, 64, 64, 64, 68, 68, 68, 68, 68, 68, 68, 68, 72, 72, 72, 72, 72, 72, 72, 72, 76, 76, 76, 76, 76, 76, 76, 76, 80, 80, 80, 80, 80, 80, 80, 80, 84, 84, 84, 84, 84, 84, 84, 84, 88, 88, 88, 88, 88, 88, 88, 88, 92, 92, 92, 92, 92, 92, 92, 92, 96, 96, 96, 96, 96, 96, 96, 96, 97, 99]
    , expected: false
});
tests.forEach(test => {
    console.log(`test with ${test.nums} sub found ${canPartition(test.nums)} == ${test.expected}`);
});
