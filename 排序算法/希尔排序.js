/*
 * @Description: 希尔排序
 * @Author: Sinpo
 * @Date: 2019-09-08 21:03:49
 * @LastEditTime: 2019-09-10 09:06:19
 * @LastEditors: Please set LastEditors
 */
// 选择一个增量序列t1， t2，…， tk， 其中ti > tj， tk = 1；
// 按增量序列个数k， 对序列进行k 趟排序；
// 每趟排序， 根据对应的增量ti， 将待排序列分割成若干长度为m 的子序列， 分别对各子表进行直接插入排序。 仅增量因子为1 时， 整个序列作为一个表来处理， 表长度即为整个序列的长度。

const shellSort = (arr) => {
    let len = arr.length,
        temp,
        gap = 1;
    console.time('希尔排序耗时:');
    while (gap < len / 5) {
        gap = gap * 5 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (let i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    return arr;
}

var arr = [592, 401, 874, 141, 348, 72, 911, 887, 820, 283];
console.log(shellSort(arr));