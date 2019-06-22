function moniNew() {
    const obj = new Object();
    const Constructor = Array.prototype.shift.apply(arguments); // 先取出构造函数，剩下的arguments其实就是入参了
    obj.__proto__ = Constructor.prototype;
    const ret = Constructor.apply(obj, arguments);
    return ret === 'object' ? ret : obj;
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

var person = moniNew(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin