/*
 * @Description: 插入排序
 * @Author: Sinpo
 * @Date: 2019-09-08 21:19:56
 * @LastEditTime: 2019-10-28 00:58:48
 * @LastEditors: Sinpo
 */
// 插入排序：打牌插牌，排序完的牌应该是从小到大
const Insert = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            // 只要后一位比前一位大，那么后一位一定比所有前面的数字都大
            if (arr[j] > arr[j - 1]) {
                // 如果比前一个小，往前移动
                [ arr[j - 1], arr[j] ] = [ arr[j], arr[j - 1] ]; // ES6解构赋值
            } else {
                break;
            }
        }
    }
    return arr;
}

let arr = [ 1, 3, 9, 28, 11, 69, 54, 99, 31 ]
console.log(Insert(arr));
