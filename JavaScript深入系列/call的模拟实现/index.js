/* 第一版 */
// Function.prototype.call2 = function(context) {
//     context.fn = this;
//     context.fn();
//     delete context.fn;
// }

// const foo = {
//     value: 1
// }

// function bar() {
//     console.log(this.value);
// }

// bar.call2(foo);

/* 第二版 */
Function.prototype.call2 = function(context) {
    const context = context || window;
    context.fn = this;
    const arg = []; // 接受参数
    for (let i = 1; i < arguments.length; i++) {
        arg.push(arguments[i]);
    }
    context.fn(...arg);
    delete context.fn;
}

const foo = {
    value: 1
}

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar.call2(foo, 'Sinpo', 23);