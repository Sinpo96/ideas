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
const isPromise = arg => arg instanceof Promise;
const isThenAble = arg => isFunction(arg) && arg.then;

/**
 * @desc 状态便签方法
 */
const transaction = (promise, state, result) => {
    promise.result = result;
    promise.state = state;
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
 * @desc PromiseA+ 规范对于输入值的处理
 */
const resolvePromise = (promise, result, resolve, reject) => {
    // x 与 promise 相等：如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    if (promise === result) {
        return reject(new TypeError('Can not fulfill promise with itself'));
    }
    // x 为 Promise
    if (isPromise(result)) {
        return result.then(resolve, reject);
    }
    // x 为 thenable对象
    if (isThenAble(result)) {
        try {
            // 把 x.then 赋值给 then
            const then = result.then();
            // 如果 then 是函数，将 x 作为函数的作用域 this 调用之
            return new PromiseSrc(then.bind(result)).then(resolve, reject);
        } catch (e) {
            // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
            return reject(e);
        }
    }

    resolve(result);
}

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

    // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
    let ignore = false;
    /**
     * @desc resolve, value 指任何 JavaScript 的合法值（包括 undefined , thenable 和 promise）；
     * @param value
     */
    const resolve = (value) => {
        if (ignore) return;
        ignore = true;
        // PromiseA+ 规范对于输入值的处理
        resolvePromise(this, value, onFulfilled, onRejected);
    };

    /**
     * @desc reject, reason 表示一个 promise 的拒绝原因。
     * @param reason
     */
    const reject = (reason) => {
        if (ignore) return;
        ignore = true;
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

/**
 * @desc catch
 */
PromiseSrc.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

PromiseSrc.resolve = function (val) {
    if (val instanceof PromiseSrc) return val;
    return new PromiseSrc(resolve => resolve(val));
}

PromiseSrc.reject = function (val) {
    if (val instanceof PromiseSrc) return val;
    return new PromiseSrc((resolve, reject) => reject(val));
}

PromiseSrc.all = function (promiseList) {
    return new PromiseSrc((resolve, reject) => {
        let result = [];
        let count = 0;
        // 遍历promise数组
        for (let [ i, p ] of promiseList.entries()) {
            this.resolve(p).then(val => {
                result[i] = val;
                count++;
                if (count === promiseList.length) {
                    // 说明已经全部结束了
                    resolve(result);
                }
            }).catch(e => {
                // 有一个被rejected时返回的MyPromise状态就变成rejected
                reject(e);
            });
        }
    });
}

PromiseSrc.race = function (promiseList) {
    return new PromiseSrc((resolve, reject) => {
        // 遍历promise数组
        promiseList.map(promise => {
            this.resolve(promise).then(val => {
                resolve(val);
            }).catch(e => {
                // 有一个被rejected时返回的MyPromise状态就变成rejected
                reject(e);
            });
        });
    })
}

const promiseA = new PromiseSrc((resolve, reject) => resolve(1));
const promiseB = new PromiseSrc((resolve, reject) => reject(2));

PromiseSrc.all([ promiseA, promiseB ]).then(val => console.log(val)).catch(reason => console.log(reason));
PromiseSrc.race([ promiseA, promiseB ]).then(val => console.log(`race: ${ val }`)).catch(reason => console.log(`race: ${ reason }`));
// module.exports = PromiseSrc;
