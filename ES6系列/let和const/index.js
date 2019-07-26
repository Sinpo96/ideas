/* 循环中的块级作用域 */
const funcs = [];
// for (var i = 0; i < 3; i++) {
//     funcs[i] = function() {
//         console.log(i);
//     }
// }
// funcs[0]();

/* 解决方案如下: */
for (var i = 0; i < 3; i++) {
    funcs[i] = function(i) {
        return function() {
            console.log(i);
        }
    }(i);
}
funcs[0]();