/* 实现findIndex */
function findIndex(arr, fun, context) {
    for (let i = 0; i < arr.length; i++) {
        if (fun.call(context, arr[i])) {
            return i;
        }
    }
}

console.log(findIndex([1, 2, 3, 4], function(item) {
    if (item == 3) return true;
}));

/* 实现findLastIndex */
// function findLastIndex(arr, fun, context) {
//     for (let i = arr.length - 1; i >= 0; i--) {
//         if (fun.call(context, arr[i])) {
//             return i;
//         }
//     }
// }

// console.log(findLastIndex([1, 2, 3, 4], function(item) {
//     if (item == 3) return true;
// }));

/* 综合findIndex和findLastIndex的写法 */
// function createFindIndex(dir) {
//     return function(arr, fun, context) {
//         let i = dir == 1 ? 0 : arr.length - 1; // 如果为1，则从0开始，正序，否则倒序
//         for (; i >= 0 && i < arr.length; i += dir) { // 根据dir来确定是递增还是递减
//             if (fun.call(context, arr[i])) {
//                 return i;
//             }
//         }
//         return -1;
//     }
// }

// const findIndex = createFindIndex(1);
// const findLastIndex = createFindIndex(-1);
// console.log(findIndex([1, 2, 3, 4], function(item) {
//     if (item == 3) return true;
// }));
// console.log(findLastIndex([1, 2, 3, 4], function(item) {
//     if (item == 3) return true;
// }));