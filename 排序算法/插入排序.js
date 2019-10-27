/*
 * @Description: 插入排序
 * @Author: Sinpo
 * @Date: 2019-09-08 21:19:56
 * @LastEditTime: 2019-10-28 00:58:48
 * @LastEditors: Sinpo
 */
// 插入排序：打牌插牌，排序完的牌应该是从小到大
const Insert = (arr) => {
    console.time('插入排序耗时：');
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j --;
        }
        arr[j + 1] = key;
    }
    return arr;
}

let arr = [1, 3, 9, 28, 11, 69, 54, 99, 31]
console.log(Insert(arr));