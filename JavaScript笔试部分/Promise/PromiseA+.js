const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const isObject = obj => !!(obj && typeof obj === 'object');
const isFunction = obj => typeof obj === 'function';
/**
 *  thenable 对象 -> {
 *       then: (resolve, reject) => {
 *           xxx
 *       }
 *  }
 *  本质上，new Promise(fn) 中的 fn 和 then 的入参 function 是同一类，都是  (resolve, reject) => {xxx}
 *  只不过 fn 写的是预定义好的 resolve 和 reject，而 then 的第一个入参是自定义的 resolve
 */
const isThenaable = obj => (isObject(obj) || isFunction(obj)) && isFunction(obj.then);
const isPromise = promise => promise instanceof PromiseA;

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
    setTimeout(() => {
        handleCallbacks(promise.callbacks, state, result);
    }, 0);
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
            // 这里为什么要用 resolve 处理 onRejected 的结果？？？
            // 因为当 then 中的 onRejected 处理完之后，传给下一个 then 时就不再是 reject 而是 resolve 状态了
            // 如果这边的 then 中不传递 reject 处理方法，那么直接传递给下一层处理
            isFunction(onRejected) ? resolve(onRejected(result)) : rejected(result);
        }
    } catch (e) {
        rejected(e);
    }
}

const handleCallbacks = (callbacks, state, result) => {
    while (callbacks.length) {
        handleCallback(callbacks.shift(), state, result);
    }
}

const resolvePromise = (promise, result, resolve, reject) => {
    if (result === promise) {
        return reject(new TypeError('Can not fulfill promise with itself'));
    }

    if (isPromise(result)) {
        // 返回值依然是 promise 对象
        return result.then(resolve, reject);
    }

    if (isThenaable(result)) {
        // thenable 对象
        try {
            const then = result.then;
            if (isFunction(then)) {
                return new PromiseA(then.bind(result)).then(resolve, reject);
            }
        } catch (e) {
            return reject(e);
        }
    }

    resolve(result);
}

// PromiseA 的构造函数
function PromiseA (f) {
    this.state = PENDING;
    this.result = null;
    // 回调函数集合
    this.callbacks = [];

    const onFulfilled = value => transition(this, FULFILLED, value);
    const onRejected = reason => transition(this, REJECTED, reason);

    let ignore = false;
    const resolve = value => {
        if (ignore) return;
        ignore = true;
        resolvePromise(this, value, onFulfilled, onRejected);
    }

    const reject = reason => {
        if (ignore) return;
        ignore = true;
        onRejected(reason);
    }

    try {
        f(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

// then 方法必须返回 PromiseA 对象
PromiseA.prototype.then = function (onFulfilled, onRejected) {
    return new PromiseA((resolve, rejected) => {
        const callback = { onFulfilled, onRejected, resolve, rejected };

        if (this.state === PENDING) {
            this.callbacks.push(callback);
        } else {
            // 用 setTimeout 0 将回调放入第二阶段的宏任务中来模拟第一阶段的微任务then（都是在队尾执行）
            setTimeout(() => {
                handleCallback(callback, this.state, this.result);
            }, 0)
        }
    });
}

module.exports = PromiseA;
