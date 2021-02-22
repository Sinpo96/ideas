/*
 * @Description: 冒泡排序
 * @Author: Sinpo
 * @Date: 2019-09-08 20:33:37
 * @LastEditTime: 2019-10-27 22:16:55
 * @LastEditors: Sinpo
 */
const bubbleSort = (arr) => {
    const length = arr.length;
    // 至少比较两个
    for (let i = 2; i < length; i++) {
        // 每一次遍历 length - j 项
        for (let j = 0; j < length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [ arr[j + 1], arr[j] ] = [ arr[j], arr[j + 1] ];
            }
        }
    }
    return arr;
}
// 算法时间复杂度为：(length - 2) * (length) = length^2 - 2length = O(n^2)

const arr = [ 3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48 ];
console.log(bubbleSort(arr));
