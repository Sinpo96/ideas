// 父类
function SuperClass () {
    this.test = [ 'test' ];
    this.superClass = true;
}

SuperClass.prototype.say = function () {
    console.log('我是SuperClass');
}

// 子类
function SubClass () {
    this.subClass = true;
}

SubClass.prototype = new SuperClass();

const instance = new SubClass();

console.log(instance instanceof SuperClass); // true

console.log(instance instanceof SubClass); // true

console.log(SubClass instanceof SuperClass); // false

// 这一步之所以为true是因为 SubClass.prototype.__proto__ = SuperClass.prototype
console.log(SubClass.prototype instanceof SuperClass); // true

console.log(SubClass.prototype.__proto__ === SuperClass.prototype); // true

// 虽然实现起来清晰简洁，但是这种继承方式有两个缺点：

// 由于子类通过其原型prototype对父类实例化，继承了父类，所以说父类中如果共有属性是引用类型，就会在子类中被所有的实例所共享，因此一个子类的实例更改子类原型从父类构造函数中继承的共有属性就会直接影响到其他的子类
// ↓↓↓↓
console.log(instance.test); // [ 'test' ]

instance.test.push('aaaaa');

const SupInstance = new SubClass();
console.log(SupInstance.test); // [ 'test', 'aaaaa' ]

// 由于子类实现的继承是靠其原型prototype对父类进行实例化实现的，因此在创建父类的时候，是无法向父类传递参数的。因而在实例化父类的时候也无法对父类构造函数内的属性进行初始化
// 这个可以参见构造函数的继承，就可以知道这个缺点了
