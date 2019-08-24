/*
 * @Description: 对照步骤写Promise
 * @Author:Sinpo
 * @Date: 2019-08-22 23:55:35
 * @LastEditTime: 2019-08-24 15:55:28
 * @LastEditors: Please set LastEditors
 */
/* 定义一个判断是否是function的检测方法 */
const isFunc = func => typeof func == 'function';

/* 定义Promise的三种状态 */
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    constructor(handle) {
        // 先判断下handle是不是func
        if (!isFunc(handle)) {
            throw new Error('handle is not a function');
        }
        this._value = undefined;
        this._status = PENDING;
        this._fulfilledQueues = []; // 成功队列
        this._rejectedQueues = []; // 失败队列
        try {
            handle(this._reslove.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }

    _reslove(val) {
        const run = () => {
            if (this._status != PENDING) {
                return;
            }
            const fulfilled = (val) => {
                let cb = undefined;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(val);
                }
            };
            const rejected = (val) => {
                let cb = undefined;
                while (cb = this._rejectedQueues.shift()) {
                    cb(val);
                }
            };
            if (val instanceof MyPromise) {
                val.then((value) => {
                    this._value = value;
                    this._status = FULFILLED;
                    fulfilled(value);
                }, (err) => {
                    this._value = err;
                    this._status = REJECTED;
                    rejected(err);
                });
            } else {
                this._status = FULFILLED;
                this._value = val;
                fulfilled(val);
            }
        }
        setTimeout(() => run(), 0);
    }

    _reject(val) {
        const run = () => {
            if (this._status != PENDING) {
                return;
            }
            const fulfilled = (val) => {
                let cb = undefined;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(val);
                }
            };
            const rejected = (val) => {
                let cb = undefined;
                while (cb = this._rejectedQueues.shift()) {
                    cb(val);
                }
            };
            if (this._status == FULFILLED) {
                this._value = fulfilled(val);
            } else {
                this._value = rejected(val);
            }
        }
        setTimeout(() => run(), 0);
    }

    then(onFulfilled, onRejected) {
        const { _status, _value } = this;
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            const fulfilled = (_value) => {
                try {
                    if (!isFunc(onFulfilled)) {
                        onFulfilledNext(_value);
                    } else {
                        const res = onFulfilled(_value);
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(res);
                        }
                    }
                } catch (error) {
                    onRejectedNext(error);
                }
            };
            const rejected = (_value) => {
                try {
                    if (!isFunc(onRejected)) {
                        onRejectedNext(_value);
                    } else {
                        const res = onRejected(_value);
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onRejectedNext(res);
                        }
                    }
                } catch (error) {
                    onRejectedNext(error);
                }
            }
            switch (_status) {
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
            }
        });
    }
}
const test = new MyPromise((resolve, reject) => {
    resolve(new MyPromise((resolve, reject) => {
        resolve('first');
    }));
});
test.then((val) => {
    console.log(val);
});