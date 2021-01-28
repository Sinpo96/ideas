const PromiseA = require('./PromiseA+');

new PromiseA((resolve, reject) => {
    resolve(1);
}).then(val => {
    console.log(`---resolve1 ${ val }`);
}, val => {
    console.log(`---reject1 ${ val }`);
    return 'test';
}).then(val => {
    console.log(`---resolve2 ${ val }`);
}, val => {
    console.log(`---reject2 ${ val }`);
});
