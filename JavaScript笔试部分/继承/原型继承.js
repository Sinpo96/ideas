function inheritObject (o) {
    //声明一个过渡对象
    function F () {
    }

    //过渡对象的原型继承父对象
    F.prototype = o;

    //返回过渡对象的实例，该对象的原型继承了父对象
    return new F();
}

var book = {
    name: 'js book',
    likeBook: [ 'css Book', 'html book' ]
}
var newBook = inheritObject(book);
newBook.name = 'ajax book';
newBook.likeBook.push('react book');
var otherBook = inheritObject(book);
otherBook.name = 'canvas book';
otherBook.likeBook.push('node book');
console.log(newBook, otherBook);
