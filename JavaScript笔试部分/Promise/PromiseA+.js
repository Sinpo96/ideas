const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const isFunction = obj => typeof obj === 'function';

/**
 * @desc 状态迁移
 * @param promise
 * @param state
 * @param result
 */
const transition = (promise, state, result) => {
    // 非pending状态的状态不可再迁移
    if (promise.state !== PENDING) return;
    promise.state = state;
    promise.result = result;
}

/**
 * @desc 回调处理
 * @param callback
 * @param state
 * @param result
 */
const handleCallback = (callback, state, result) => {
    const { onFulfilled, onRejected, resolve, rejected } = callback;
    try {
        if (state === FULFILLED) {
            isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
        } else if (state === REJECTED) {
            // TODO 这里为什么要用 resolve 处理 onRejected 的结果？？？
            isFunction(onRejected) ? resolve(onRejected(result)) : rejected(result);
        }
    } catch (e) {
        rejected(e);
    }
}

// Promise 的构造函数
function Promise () {
    this.state = PENDING;
    this.result = null;
    // 回调函数
    this.callbacks = [];
}

// then 方法必须返回 Promise 对象
Promise.prototype.then = function (onFulfilled, onRejected) {
    return new Promise((resolve, rejected) => {
        const callback = { onFulfilled, onRejected, resolve, rejected };

        if (this.state === PENDING) {
            this.callbacks.push(callback);
        } else {
            setTimeout(() => {
                handleCallback(callback, this.state, this.result);
            }, 0)
        }
    });
}

module.exports = Promise;
