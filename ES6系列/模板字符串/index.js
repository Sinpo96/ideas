/* 标签模板 */
let x = 'Hi',
    y = 'Kevin';
var res = message `${x}, I am ${y}`;

/* literals 是模板中原来的字符串，不包含变量 */
function message(literals, value1, value2) {
    console.log(literals); // [ "", ", I am ", "" ]
    console.log(value1); // Hi
    console.log(value2); // Kevin
}