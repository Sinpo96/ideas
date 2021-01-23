function SuperClass (id) {
    this.test = [ 'test' ];
    this.id = id;
}

SuperClass.prototype.say = function () {
    console.log('say');
}

function SubClass (id) {
    SuperClass.call(this, id);
}

// 进行原型的链接（这样的话，实例.__proto__.__proto__ = SuperClass.prototype）
SubClass.prototype = new SuperClass();

const instanceA = new SubClass('instanceA');

const instanceB = new SubClass('instanceB');

instanceA.test.push('_instanceA');

console.log(instanceA);

console.log(instanceB);
