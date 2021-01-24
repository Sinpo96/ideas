function InheritObject (o) {
    //声明一个过渡对象
    function F () {
    }

    //过渡对象的原型继承父对象
    F.prototype = o;

    //返回过渡对象的实例，该对象的原型继承了父对象
    return new F();
}

function CreateBook (obj) {
    // 通过原型的方式创建新对象
    const o = InheritObject(obj);
    // 拓展新对象
    o.getName = function (name) {
        console.log(name)
    };
    // 返回拓展后的新对象
    return o;
}

const book = {
    name: 'js book',
    likeBook: [ 'html book', 'css book' ]
}

const instance = CreateBook(book);

console.log(instance);
