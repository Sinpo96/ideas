/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    // 约瑟夫环
    // hold保存了中间值(默认是第一个)
    let hold = nums[0];
    let index = 0;
    const len = nums.length;
    let visited = Array(len).fill(false);
    for(let i = 0; i < nums.length; i++) {
        // 得出当前应该被替换的位置
        index = (index + k) % len;
        if (visited[index]) {
            // index 向后一位
            index = (index + 1) % len;
            hold = nums[index];
            // 这次不算，不至于加到越界
            i--;
        } else {
            visited[index] = true;
            let temp = hold;
            hold = nums[index];
            nums[index] = temp;
        }
    }
};

rotate([-1,-100,3,99], 2)
