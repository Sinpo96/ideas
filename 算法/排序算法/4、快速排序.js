/**
 * 步骤：
 * 1、找到一个基准元素，将列表分成两个子序列
 * 2、对列表进行重新排序，将比基准元素小的放在基准值前面，比基准元素大的放在基准值后面
 * 3、对两个子序列不断重复1、2的步骤
 */
/**
 * @desc 快速排序
 * @param arr
 * @return array
 */
const quickSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }
    // 找出基准元素
    const basic = arr.splice(0, 1);
    let left = [], right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < basic[0]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(basic, quickSort(right));
}


let arr = [ 5, 1, 3, 9, 28, 11, 69, 54, 99, 31 ]
console.log(quickSort(arr));
