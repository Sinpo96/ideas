function _new() {
    // 第一步，声明一个空对象
    const target = {};
    // 第二步，取出构造函数
    const args = Array.from(arguments);
    const Constructor = args.shift();
    // 第三步，执行原型的链接
    target.__proto__ = Constructor.prototype;
    // 第四步，执行构造函数
    const res = Constructor.apply(target, args);
    // 如果返回值是 object 或者 function，那么返回 res
    if (res && (typeof res === 'object' || typeof res === 'function')) {
        return res;
    }
    // 否则返回第一步声明的空对象
    return target;
}

function Otaku(name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function() {
    console.log('I am ' + this.name);
}

var person = _new(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
