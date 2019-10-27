/*
 * @Description: 冒泡排序
 * @Author: Sinpo
 * @Date: 2019-09-08 20:33:37
 * @LastEditTime: 2019-10-27 22:16:55
 * @LastEditors: Sinpo
 */
const bubbleSort = (arr) => {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        // 这里之所以是 -1-i
        // 是因为总计需要遍历len次
        // 但因为上次排完最后一个都是最大的
        // 所以每下一次都会省去一个末尾的值
        console.log(len - 1 - i);
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }        
    }
    return arr;
}

const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort(arr));