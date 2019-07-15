const array = [1, '1', 'a', 2, 3, '2', '2'];
/* 第一种：双重循环 */
/* const res = []; // 这是去重后塞进的数组
for (let i = 0; i < array.length; i++) {
    // 注意这里！！！！！！res的长度在这次进入循环之前必须定下来，不然就是个变量，j会一直等于res.length造成死循环
    for (let j = 0, resLen = res.length; j <= resLen; j++) {
        // 看看res里面有没有array的值
        if (res[j] === array[i]) {
            // 说明相等了，再见
            break;
        }
        if (j == resLen) {
            // 说明遍历到最后了，但还是没有被break掉，那说明就是不重复的，可以push进去
            res.push(array[i]);
        }
    }
}
console.log(res); */


/* 第二种：indexOf简化内层循环 */
/* function unique(array) {
    const res = [];
    for (let i = 0; i < array.length; i++) {
        if (res.indexOf(array[i]) === -1) {
            res.push(array[i]);
        }
    }
    return res;
}
console.log(unique(array)); */


/* 第三种：sort后对比前一个与后一个是否相等，因为去重后相关元素会排在一块 */
/* sort 默认使用的是Unicode码进行排序的 */
/* JavaScript使用的是UCS-2编码 */
// function unique(array) {
//     /* 开始排序 */
//     const arr = array.sort();
//     const res = [];
//     let pre = undefined;
//     arr.map((val, index) => {
//         if (val !== pre) {
//             pre = val;
//             res.push(val);
//         }
//     });
//     return res;
// }
// console.log(unique(array))

/* 第四种: filter */
// function unique(array) {
//     /* 普通去重 */
//     /* return array.filter((val, index, arr) => {
//         return arr.indexOf(val) === index;
//     }); */
//     /* 排序去重 */
//     return array.sort().filter((val, index, arr) => {
//         return !index || val !== arr[index - 1];
//     });
// }
// console.log(unique(array));

/* 第五种： Set */
// function unique(array) {
//     // return Array.from(new Set(array));
//     return [...new Set(array)];
// }
// console.log(unique(array));

/* 第六种： Map --- 主要是查找快速 */
function unique(array) {
    const mapCollect = new Map();
    array.filter((val) => {
        return !mapCollect.has(val) && mapCollect.set(val, 1);
    });
    return mapCollect;
}
console.log(unique(array));