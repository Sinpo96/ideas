function testPromise(time) {
    return new Promise((resolve) => {
        // resolve(1);
        // return new Promise((resolve) => {
        //     resolve(2);
        // });
        if (time < 3) {
            testPromise(++time).then(() => {
                resolve(time);
            });
        } else {
            resolve('success');
        }
    });
}

const test = testPromise(1);

Promise.all([test]).then((res) => {
    console.log(res);
});