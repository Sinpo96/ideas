/*
 * @Description: 冒泡排序
 * @Author: Sinpo
 * @Date: 2019-09-08 20:33:37
 * @LastEditTime: 2019-09-08 21:06:21
 * @LastEditors: Please set LastEditors
 */
// 1.比较相邻的元素。 如果第一个比第二个大， 就交换他们两个。
// 2.对每一对相邻元素作同样的工作， 从开始第一对到结尾的最后一对。 这步做完后， 最后的元素会是最大的数。
// 3.针对所有的元素重复以上的步骤， 除了最后一个。
// 4.持续每次对越来越少的元素重复上面的步骤， 直到没有任何一对数字需要比较。
const Bubble = (arr, index = undefined) => {
    if (index == 0) {
        console.timeEnd('开始');
        return arr;
    } else if (index === undefined) {
        console.time('开始');
        index = arr.length;
    }
    for (let i = 0; i < index; i++) {
        // 如果后一项比前一项大，那么就交换顺序
        if (arr[i - 1] > arr[i]) {
            let middle = arr[i];
            arr[i] = arr[i - 1];
            arr[i - 1] = middle;
        }
        if (i == index - 1) {
            // 说明循环到了最后一个
            return Bubble(arr, index - 1);
        }
    }
}
console.log(Bubble([3, 1, 2, 6, 2, 4, 3]));


function bubbleSort3(arr) {
    console.time('2.改进后冒泡排序耗时');
    var low = 0;
    var high = arr.length - 1; //设置变量的初始值
    var tmp, j;
    while (low < high) {
        for (j = low; j < high; ++j) //正向冒泡,找到最大者
            if (arr[j] > arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
            --high; //修改high值, 前移一位
        for (j = high; j > low; --j) //反向冒泡,找到最小者
            if (arr[j] < arr[j - 1]) {
                tmp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = tmp;
            }
            ++low; //修改low值,后移一位
    }
    console.timeEnd('2.改进后冒泡排序耗时');
    return arr;
}
bubbleSort3([3, 1, 2, 6, 2, 4, 3]);