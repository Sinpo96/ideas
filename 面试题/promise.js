/*
 * @Description: 手写Promise
 * @Author: Sinpo
 * @Date: 2019-08-19 08:50:22
 * @LastEditTime: 2019-08-24 15:45:44
 * @LastEditors: Please set LastEditors
 */
/** 判断是否是方法（Promise必须接受一个方法作为参数） */
const isFunction = variable => typeof variable === 'function';

/** Promise有三种状态 */
const PENDING = 'PENDING'; // pending 进行中
const FULFILLED = 'FULFILLED'; // fulfilled 已成功
const REJECTED = 'REJECTED'; // rejected 已失败

class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error('MyPromise must accept a function as a parameter');
        }
        // 添加状态
        this._status = PENDING;
        this._value = undefined;
        // 添加成功回调函数队列
        this._fulfilledQueues = [];
        // 添加失败回调函数队列
        this._rejectedQueues = [];
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this)); // handle有两个参数
        } catch (error) {
            this._reject(error);
        }
    }

    // 添加resolve时的执行函数
    _resolve(val) {
        const run = () => {
            if (this._status !== PENDING) {
                // 如果不是等待状态，那么return掉
                return;
            }
            // 依次执行成功队列中的函数，并清空队列
            const runFulfilled = (value) => {
                let cb;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value);
                }
            }

            // 依次执行失败队列中的函数，并清空队列
            const runRejected = (error) => {
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(error);
                }
            }

            /**
             * 如果resolve的参数为promise对象，则必须等待该Promise对象状态改变后
             * 当前Promise的状态才会改变，且状态取决于参数Promise对象的状态
             */
            if (val instanceof MyPromise) {
                val.then(value => {
                    this._value = value;
                    this._status = FULFILLED;
                    runFulfilled(value);
                }, err => {
                    this._value = err;
                    this._status = REJECTED;
                    runRejected(err);
                });
            } else {
                this._value = val;
                this._status = FULFILLED;
                runFulfilled(val);
            }
        }

        /* 写setTimeout的原因：
         * 如果Promise构造时传入的函数非异步函数而是同步函数， 不用setTimeout， 直接写run的话， then函数传入的回调函数会立即执行而不是到下一个事件循环才执行。 Promise.resolve(1).then(value => console.log(value); console.log(2); 会输出 1 2 用了setTimeout会输出 2 1 这样then里的回调函数才有异步效果。
         */
        setTimeout(() => run(), 0);
    }

    // 添加reject时的执行函数
    _reject(err) {
        if (this._status !== PENDING) {
            // 如果不是等待状态，那么return掉
            return;
        }
        const run = () => {
            this._status = REJECTED;
            this._value = err;
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err);
            }
        }

        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(() => run(), 0);
    }

    // 添加then方法
    then(onFulfilled, onRejected) {
        const { _value, _status } = this;
        // 返回一个新的promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            const fulfilled = value => {
                try {
                    // 如果成功回调不是函数,直接往下走下一个then
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value);
                    } else {
                        const res = onFulfilled(value);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回了MyPromise对象，那么必须等待其状态改变后再执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个回调
                            onFulfilledNext(value);
                        }
                    }
                } catch (error) {
                    onRejectedNext(error);
                }
            };
            // 封装一个失败时执行的函数
            const rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error);
                    } else {
                        const res = onRejected(error);
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(res);
                        }
                    }
                } catch (err) {
                    onRejectedNext(err);
                }
            };
            switch (_status) {
                // 当为pending状态时，将then方法回调函数放入执行队列等待执行
                case PENDING:
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case FULFILLED:
                    fulfilled(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            };
        });
    }

    // 添加catch方法  相当于调用 then 方法, 但只传入 Rejected 状态的回调函数
    catch (onRejected) {
        return this.then(undefined, onRejected);
    }

    // 添加静态resolve方法
    static resolve(value) {
        // 如果参数是MyPromise实例，直接返回这个实例
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise(resolve => resolve(value));
    }

    // 添加静态reject方法
    static reject(value) {
        return new MyPromise((resolve, reject) => reject(value));
    }

    // 添加静态的all方法
    static all(list) {
        return new MyPromise((resolve, reject) => {
            let values = [];
            let count = 0; // 计数
            for (const [i, p] of list.entries()) {
                // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res;
                    count++;
                    // 所有状态都变味fulfilled时返回的MyPrmose状态就变成了了fulfilled
                    if (count == list.length) {
                        resolve(values);
                    }
                }, err => {
                    // 如果有一个被rejected了，那么返回的MyPromise状态就变为了rejected
                    reject(err);
                });
            }
        });
    }

    // 添加静态race方法
    static race(list) {
        return new MyPromise((resolve, reject) => {
            for (const p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
            }
        });
    }

    // 不管最后状态如何，都会执行的操作
    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        );
    }
}

// const test = new MyPromise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//         console.log(2);
//         resolve('first');
//     }, 1000)
// });
// test.then(val => {
//     console.log(3);
//     return new MyPromise((resolve, reject) => {
//         console.log(4);
//         resolve('second');
//     });
// }).then(val => {
//     console.log(val);
// });
// test.then((val) => {
//     return new MyPromise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('fail');
//         }, 1000)
//     });
// }).then(val => {
//     console.log(val);
// });

const test = new MyPromise((resolve, reject) => {
    resolve(new MyPromise((resolve, reject) => {
        resolve('first');
    }));
});
test.then((val) => {
    console.log(val);
});