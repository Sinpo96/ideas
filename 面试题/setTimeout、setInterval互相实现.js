/**
 * @description: setInterval实现setTimeout
 */
const _setTimeout = (fn, time) => {
    let timer = setInterval(() => {
        fn();
        clearTimeout(timer);
        timer = null;
    }, time);
}

/**
 * @description: setTimeout实现setInterval
 */
const _setInterval = (fn, time) => {
    const inner = (fn, time) => {
        setTimeout(() => {
            fn();
            inner(fn, time);
        }, time);
    }
    inner(fn, time);
}

// 测试setTimeout
_setTimeout(() => {
    console.log('setTimeout');
}, 1000);

// 测试setInterval
_setInterval(() => {
    console.log('setInterval');
}, 1000);