const promisePublic = (val) => () => {
    return new Promise((resolve, reject) => {
        resolve(val);
    });
}

/**
 * @desc 1、使用 普通循环 来实现
 * @type {Promise<void>}
 */
let promise = Promise.resolve();

function serialPromise (tasks) {
    tasks.forEach(task => {
        promise = promise.then(task);
    })
    return promise;
}

// serialPromise([promisePublic(1), promisePublic(2)]).then(val => console.log(val));

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * @desc 2、使用 Reduce 实现
 * @param tasks
 * @returns {*}
 */
function serialPromiseReduce (tasks) {
    return tasks.reduce((acc, cur) => {
        return acc.then(cur);
    }, promise);
}

// serialPromiseReduce([promisePublic(1), promisePublic(2)]).then(val => console.log(val));

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * @desc 3、使用 async 实现
 * @param tasks
 * @returns {Promise<null>}
 */
async function serialPromiseAsync (tasks) {
    let res = null;
    for (let task of tasks) {
        res = await task();
    }
    return res;
}

// serialPromiseAsync([promisePublic(1), promisePublic(2)]).then(val => console.log(val));

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * @desc 4、使用 递归 实现
 * @param tasks
 * @returns {Promise<unknown>|Promise<void>}
 */
function serialPromiseRecursion (tasks) {
    const currentTask = tasks.shift();
    if (tasks.length === 0) {
        return promise.then(currentTask);
    }
    return promise.then(currentTask).then(() => serialPromiseRecursion(tasks));
}

// serialPromiseRecursion([promisePublic(1), promisePublic(2)]).then(val => console.log(val));
