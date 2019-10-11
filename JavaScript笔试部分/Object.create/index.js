// Object.create方法新创建一个对象，使用现有的对象来提供新对象的__proto__
function Oc(obj) {
    function f() {}
    f.prototype = obj;
    return new f();
}

// ----------------------------测试----------------------------------
const person = {
    isHuman: false,
    printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
};

const me = Oc(person);
me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten
me.printIntroduction();
console.log(me);