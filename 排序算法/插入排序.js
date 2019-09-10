/*
 * @Description: 插入排序
 * @Author: Sinpo
 * @Date: 2019-09-08 21:19:56
 * @LastEditTime: 2019-09-08 21:50:23
 * @LastEditors: Please set LastEditors
 */
// 插入排序：从头开始，如果前面值比当前大，那么当前值与前一个值互换，依次往前换，知道前面一个小于它
const Insert = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            let inner = i;
            let temp = arr[inner];
            while (inner > 0 && arr[inner - 1] > temp) {
                // 说明比前一个小，前面的值赋给它
                arr[inner] = arr[inner - 1];
                inner--;
            }
            arr[inner] = temp;
        }
    }
    return arr;
}
let arr = [1, 3, 9, 28, 11, 69, 54, 99, 31]
console.log(Insert(arr));