/* 原型链 */
/* https://github.com/mqyqingfeng/Blog/issues/2 */
/* __proto__ 隐式原型 */
/* prototype 显式原型 */

// 先创建一个构造函数
function Person() {

}

// 实例化一个实例对象
const person = new Person();

// 输出一下这个person的原型_proto_
// 此时输出的是Person这个构造函数的原型
// person.__proto__ = Person.prototype
console.log(person.__proto__);

// 实例对象person的__proto__的__proto__指向的是构造出Person这个构造函数的原型
// Person这个构造函数是由new Object构造出来的
// 一切构造的起源都是Object这个构造函数
// person.__proto__.__proto__ = Object.prototype
console.log(person.__proto__.__proto__);