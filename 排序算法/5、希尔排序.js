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
// 希尔排序就是以增量为步长的插入排序
const shellSort = (arr) => {
    let gap = arr.length;
    const len = gap;
    while (gap > 1) {
        gap = Math.floor(gap / 2);
        console.log(`步长为：${ gap }`);
        for (let i = 0; i < len; i++) {
            for (let j = i; j > 0; j -= gap) {
                if (arr[j] < arr[j - gap]) {
                    [ arr[j - gap], arr[j] ] = [ arr[j], arr[j - gap] ];
                    console.log(`当前序列为[${ arr }] \n 交换了${ arr[j] }和${ arr[j - gap] }`)//为了观察过程
                } else {
                    break;
                }
            }
        }
        console.log(arr)
    }
    return arr;
}

const arr = [ 11, 12, 123, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
shellSort(arr);
