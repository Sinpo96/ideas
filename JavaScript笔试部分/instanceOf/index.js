const instanceOf = (Left, Right) => {
    let L = Left.__proto__; // 取Left的隐式原型
    let R = Right.prototype; // 取Right的显式原型
    while (L) {
        if (L === R) {
            return true;
        } else {
            L = L.__proto__;
        }
    }
    return false;
}

function a () {

}

function b () {

}

const c = new a();
console.log(instanceOf(c, a)); // true
console.log(instanceOf(c, b)); // false
