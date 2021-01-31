/**
 * Promise 的实现核心之处便是回调函数的处理，如何进行存储、当回调函数是Promise对象或者thenable对象时该如何处理...
 * 并不是一开始想象的递归
 */

/* --- 预定义三种 promise 状态 --- */
/**
 * 处于等待态时，promise 需满足以下条件：
 *      可以迁移至执行态或拒绝态
 */
const PENDING = 'pending';

/**
 * 处于执行态时，promise 需满足以下条件：
 *      不能迁移至其他任何状态
 *      必须拥有一个不可变的终值
 */
const FULFILLED = 'fulfilled';

/**
 * 处于拒绝态时，promise 需满足以下条件：
 *      不能迁移至其他任何状态
 *      必须拥有一个不可变的据因
 */
const REJECTED = 'rejected';

const isFunction = arg => typeof arg === 'function';

/**
 * @desc 状态便签方法
 */
const transaction = (promise, state, result) => {
    promise.result = result;
    promise.state = FULFILLED;
    setTimeout(() => {
        handlePromiseCallbacks(promise.callbacks, state, result);
    }, 0);
}

/**
 * @desc Promise状态变更的回调处理函数
 */
const handleCallback = (state, result, callback) => {
    const { onFulfilled, onRejected, resolve, reject } = callback;
    try {
        if (state === FULFILLED) {
            isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
        } else if (state === REJECTED) {
            // 如果 onReject 是 function，那么执行完的值 resolve 掉，如果不是，那么还得传递给下一个 then 进行处理
            isFunction(onRejected) ? resolve(onRejected(result)) : reject(result);
        }
    } catch (e) {
        // 执行then传递的函数时，如果有报错，直接抛出给下一个 then / catch
        reject(e);
    }
}

const handlePromiseCallbacks = (callbacks, state, result) => {
    while (callbacks.length) {
        const callback = callbacks.shift();
        handleCallback(state, result, callback);
    }
};

/**
 * @desc promise的实现源码
 * @constructor
 */
function PromiseSrc (fn) {
    // 默认为等待态
    this.state = PENDING;
    this.result = null;
    this.callbacks = [];

    const onFulfilled = value => transaction(this, FULFILLED, value);
    const onRejected = reason => transaction(this, REJECTED, reason);

    /**
     * @desc resolve, value 指任何 JavaScript 的合法值（包括 undefined , thenable 和 promise）；
     * @param value
     */
    const resolve = (value) => {
        onFulfilled(value);
    };

    /**
     * @desc reject, reason 表示一个 promise 的拒绝原因。
     * @param reason
     */
    const reject = (reason) => {
        onRejected(reason);
    };

    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

/**
 * @desc then
 * @param onFulfilled（可选）   如果 onFulfilled 不是函数，其必须被忽略；如果是函数，那么在 Promise 执行执行结束后必须被调用，第一个参数为 Promise 的终值
 * @param onRejected（可选）    如果 onRejected 不是函数，其必须被忽略；如果是函数，那么在 Promise 执行执行结束后必须被调用，第一个参数为 Promise 的拒因
 */
PromiseSrc.prototype.then = function (onFulfilled, onRejected) {
    // 两个形参，对应着 fn(resolve, reject)
    return new PromiseSrc((resolve, reject) => {
        const callback = { onFulfilled, onRejected, resolve, reject };
        if (this.state === PENDING) {
            // 等待态，回调函数放入callbacks中
            this.callbacks.push(callback);
        } else {
            // 说明状态已经变更了
            setTimeout(() => {
                handleCallback(this.state, this.result, callback);
            }, 0);
        }
    });
}

new PromiseSrc((resolve, reject) => {
    reject('test');
}).then((val) => {
    console.log(val);
    return val;
}).then((val) => {
    console.log(val)
}, (val) => {
    console.log('reject')
    console.log(val)
});

// module.exports = PromiseSrc;
