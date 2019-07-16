const arr = [6, 4, 1, 8, 2, 11, 23];
let max = 0,
    min = 0;
/* ------------------------------------------ */

/* 1.最原始的方式-遍历 */
// for (let i = 0; i < arr.length; i++) {
//     /* 先默认赋个值 */
//     if (i == 0) {
//         max = arr[0];
//         min = arr[0];
//     } else if (arr[i] >= max) {
//         max = arr[i];
//     } else if (arr[i] < min) {
//         min = arr[i];
//     }
// }

/* ------------------------------------------ */

/* 2.使用reduce进行处理 */
// function getMax(prev, next) {
//     console.log(`prev:${prev}与next:${next}进行比较`);
//     return prev > next ? prev : next;
// }

// function getMin(prev, next) {
//     return prev < next ? prev : next;
// }

// max = arr.reduce(getMax);
// min = arr.reduce(getMin);

/* ------------------------------------------ */

/* 3.sort进行排序 */
// 比较函数两个参数a和b，返回a - b 升序，返回b - a 降序
// max = arr.sort(function(a, b) {
//     return b - a;
// })[0];

// min = arr.sort(function(a, b) {
//     return a - b;
// })[0];

/* ------------------------------------------ */

console.log(`max: ${max} --- min: ${min}`);