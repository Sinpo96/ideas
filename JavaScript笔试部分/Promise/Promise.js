const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]';
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
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
        return reject(new TypeError('can not resolve itself'));
    }
    if (isPromise(result)) {
        return result.then(resolve, reject);
    }
    if (isThenable(result)) {
        try {
            const then = result.then;
            if (isFunction(then)) {
                return new PromiseSrc(then.bind(result)).then(resolve, reject);
            }
        } catch (e) {
            return reject(e);
        }
    }

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

// ----------------------------------------------------------------------------------------------------------
// 实现一个promise的延迟对象 deferred
PromiseSrc.deferred = function() {
    let dfd = {}
    dfd.promise = new PromiseSrc((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = PromiseSrc
