// 原型式继承
function inheritObject (o) {
    function F () {
    }

    F.prototype = o;
    // 如果这边不用new，在实例的instanceof判断中就会出问题，显示Super和Sub都是instanceof的构造函数，但其实只有Sub才是构造函数，Super只是父类
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
