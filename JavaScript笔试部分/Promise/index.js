// 判断是否是方法的工具函数
const isFunction = val => typeof val === 'function';

// 定义Promise的三种状态
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise{
    constructor(handle) {
        this._status = PENDING;
        this._value = undefined;

        this._fulfilledQueues = [];
        this._rejectedQueues = [];

        try {
            handle(this._resolve.bind(this), this._rejected.bind(this));
        } catch (error) {
            this._rejected(error);
        }
    }

    _resolve(val) {
        const run = () => {
            if (this._status !== PENDING) {
                return;
            }

            const runFulfilled = (value) => {
                let cb;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value);
                }
            }

            const runRejected = (value) => {
                let cb;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value);
                }
            }

            if (val instanceof MyPromise) {
                val.then((value) => {
                    this._status = FULFILLED;
                    this._value = value;
                    runFulfilled(value);
                }, (err) => {
                    this._status = REJECTED;
                    this._value = err;
                    runRejected(err);
                });
            } else {
                this._status = FULFILLED;
                this._value = val;
                runFulfilled(val);
            }
        }
        // 之所以用setTimeout是因为Promise.then是异步执行的
        setTimeout(run, 0);
    }

    _rejected(err) {
        const run = () => {
            if (this._status !== PENDING) {
                return;
            }
            this._status = REJECTED;
            this._value = err;
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb();
            }
        }

        setTimeout(run, 0);
    }

    then(onFulfilled, onRejected) {
        const { _status, _value } = this;
        return new MyPromise((onResolveNext, onRejectedNext) => {
            let fulfilled = (val) => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onResolveNext(val);
                    } else {
                        const res = onFulfilled(val);
                        if (res instanceof MyPromise) {
                            res.then(onResolveNext, onRejectedNext);
                        } else {
                            onResolveNext(res);
                        }
                    }
                } catch (error) {
                    onRejectedNext(error);
                }
            };

            let rejected = (err) => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(err);
                    } else {
                        const res = onRejected(val);
                        if (res instanceof MyPromise) {
                            res.then(onResolveNext, onRejectedNext);
                        } else {
                            onResolveNext(res);
                        }
                    }
                } catch (error) {
                    onRejectedNext(err);
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

    // 添加静态的resolve方法
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise(resolve => resolve(value));
    }

    // 添加静态reject方法
    static reject(value) {
        return new MyPromise((resolve, reject) => reject(value))
    }

    static all(list) {
        return new MyPromise((resolve, reject) => {
            let values = [];
            let count = 0;
            for (let [i, p] of list.entries()) {
                // 调用静态的resolve方法，即使传入的不是Mypromise对象，也要通过resolve转成
                this.resolve(p).then((res) => {
                    values[i] = res;
                    count ++;
                    if (count == list.length) {
                        resolve(values);
                    }
                }, (err) => {
                    // 有一个出现，直接reject
                    reject(err);
                });
            }
        });
    }

    static race(list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                this.resolve(p).then((res) => {
                    // 只要有一个实例改变状态，MyPromise也会跟着resolve
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
            }
        });
    }

    finally(cb) {
        return this.then(
            val => MyPromise.resolve(cb()).then(() => val),
            err => MyPromise.resolve(cb()).then(() => {throw err})
        );
    }
}


// let promise1 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve()
//     }, 1000)
// })
// promise2 = promise1.then(res => {
//     // 返回一个Promise对象
//     return new MyPromise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('这里返回一个Promise')
//         }, 2000)
//     })
// })
// promise2.then(res => {
//     console.log(res) //3秒后打印出：这里返回一个Promise
// })

//  ------- 测试finally
const p = new MyPromise((resolve, reject) => {
    resolve('111');
});
p.then(val => console.log(val)).finally(() => {console.log('finally')});