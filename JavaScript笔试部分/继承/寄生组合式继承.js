// 原型式继承
function inheritObject (o) {
    function F () {
    }

    F.prototype = o;
    // 如果这边不用new，在实例的instanceof判断中就会出问题，显示Super和Sub都是instanceof的构造函数，但其实只有Sub才是构造函数，Super只是父类
    // 关于这边为什么要用new，可以参见: http://louiszhai.github.io/2015/12/15/prototypeChain/#proto-%E5%B1%9E%E6%80%A7%E6%98%AF%E6%8C%87%E5%AE%9A%E5%8E%9F%E5%9E%8B%E7%9A%84%E5%85%B3%E9%94%AE
    return new F();
}

// 寄生组合式继承
function inheritPrototype (Sub, Super) {
    const SuperPrototype = Super.prototype;
    // 此时，原型式继承的入参是父类的原型，而不是一个普通对象
    const p = inheritObject(SuperPrototype);
    // 修正 p 的构造函数的指向
    p.constructor = Sub;
    Sub.prototype = p;
}

function SuperClass (name) {
    this.test = [ 'test' ];
    this.name = name;
}

SuperClass.prototype.sup = function () {
    console.log('this is sup');
}

function SubClass (id, name) {
    SuperClass.call(this, name);
    this.id = id;
}

inheritPrototype(SubClass, SuperClass);

SubClass.prototype.sub = function () {
    console.log('sub');
}

const instanceA = new SubClass('id_A', 'instanceA');

const instanceB = new SubClass('id_B', 'instanceB');

instanceA.id = '修改instanceA的id';

console.log(instanceA, instanceB);
