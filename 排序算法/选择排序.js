/**
 * @description: 选择排序
 * 首先从未排序序列中找到最小（大）元素，存放到排序序列的起始位置
 * 然后，再从剩余未排序元素中继续寻找最小（大）元素
 * 然后放到已排序序列的末尾
 * 以此类推，直到所有元素均排序完毕
 */
const selectionSort = (arr) => {
    const len = arr.length;
    let minIndex, temp;
    console.time('选择排序耗时');
    for (let i = 0; i < len; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // 交换内容
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.timeEnd('选择排序耗时');
    return arr;
}

const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(selectionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]