const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]';
const isObject = obj => !!(obj && Object.prototype.toString.call(obj) === '[object Object]');
const isPromise = obj => obj instanceof PromiseSrc;
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj;

// 处理收集的回调任务
const handleCallbacks = (callbacks, state, result) => {
    while (callbacks.length) {
        handleCallback(callbacks.shift(), state, result);
    }
}

// 状态变更函数
const transaction = (promise, state, result) => {
    if (promise.state !== PENDING) return;
    promise.state = state;
    promise.result = result;
    setTimeout(() => {
        handleCallbacks(promise.callbacks, state, result);
    }, 0);
}

// 处理异步回调
const handleCallback = (callback, state, result) => {
    const { onFulfilled, onRejected, resolve, reject } = callback;
    try {
        if (state === FULFILLED) {
            // 这里的 resolve 是 then 中新声明的 PromiseSrc
            isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
        } else if (state === REJECTED) {
            isFunction(onRejected) ? resolve(onRejected(result)) : reject(result);
        }
    } catch (e) {
        reject(e);
    }
}

// 处理下 result 的可能情况
const resolvePromise = (promise, result, resolve, reject) => {
    if (promise === result) {
        // 这里之所以要return，是因为还没有真正的进入resolve，如果不return，那么then就接收不到数据
        return reject(new TypeError('can not resolve itself'));
    }
    if (isPromise(result)) {
        // 这里之所以要return，是因为还没有真正的进入resolve，如果不return，那么then就接收不到数据
        return result.then(resolve, reject);
    }
    if (isThenable(result)) {
        try {
            const then = result.then;
            if (isFunction(then)) {
                // 这里之所以要return，是因为还没有真正的进入resolve，如果不return，那么then就接收不到数据
                return new PromiseSrc(then.bind(result)).then(resolve, reject);
            }
        } catch (e) {
            // 这里之所以要return，是因为还没有真正的进入resolve，如果不return，那么then就接收不到数据
            return reject(e);
        }
    }
    // 这里无需 return，return 也没啥用
    resolve(result);
}

function PromiseSrc (fn) {
    this.state = PENDING;
    this.result = null;
    this.callbacks = [];

    const onFulfilled = value => transaction(this, FULFILLED, value);
    const onRejected = reason => transaction(this, REJECTED, reason);

    let ignore = false;
    const resolve = result => {
        if (ignore) return;
        ignore = true;
        // 这里的 result 需要额外处理下
        resolvePromise(this, result, onFulfilled, onRejected)
    }

    const reject = reason => {
        if (ignore) return;
        ignore = true;
        onRejected(reason);
    }

    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

PromiseSrc.prototype.then = function (onFulfilled, onRejected) {
    return new PromiseSrc((resolve, reject) => {
        const callback = { onFulfilled, onRejected, resolve, reject };
        if (this.state === PENDING) {
            this.callbacks.push(callback);
        } else {
            setTimeout(() => {
                handleCallback(callback, this.state, this.result);
            }, 0);
        }
    });
}

// catch 中 return 的值还是会被下一个 then 的 resolve 给捕捉到
PromiseSrc.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

// Promise的返回值也是一个Promise对象
PromiseSrc.resolve = function (val) {
    if (isPromise(val)) return val;
    return new PromiseSrc(resolve => resolve(val));
}

PromiseSrc.reject = function (reason) {
    if (isPromise(reason)) return reason;
    return new PromiseSrc((resolve, reject) => reject(reason));
}

PromiseSrc.prototype.all = function (promiseList) {
    return new PromiseSrc((resolve, reject) => {
        let result = [];
        let count = 0;
        for (const [i, p] of promiseList.entries()) {
            this.resolve(p).then((val) => {
                count++;
                result[i] = val;
                if (count === promiseList.length) {
                    // 说明已经全部结束了
                    resolve(result);
                }
            }).catch(e => {
                // 有一个被rejected时返回的MyPromise状态就变成rejected
                reject(e)
            });
        }
    });
}

PromiseSrc.prototype.race = function (promiseList) {
    return new PromiseSrc((resolve, reject) => {
        promiseList.map(promise => {
            this.resolve(promise).then(val => {
                resolve(val);
            }).catch(e => {
                // 有一个被rejected时返回的MyPromise状态就变成rejected
                reject(e);
            });
        });
    });
}

// ----------------------------------------------------------------------------------------------------------
// 实现一个promise的延迟对象 deferred
PromiseSrc.deferred = function () {
    let dfd = {}
    dfd.promise = new PromiseSrc((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = PromiseSrc
