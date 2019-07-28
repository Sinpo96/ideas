function createIterator(items) {
    let i = 0;
    return {
        next: function() {
            const done = i >= items.length;
            return {
                done,
                value: items[i++]
            }
        }
    }
}

// iterator 就是一个迭代器对象
var iterator = createIterator([1, 2, 3]);

// console.log(iterator.next()); // { done: false, value: 1 }
// console.log(iterator.next()); // { done: false, value: 2 }
// console.log(iterator.next()); // { done: false, value: 3 }
// console.log(iterator.next()); // { done: true, value: undefined }

const obj = {
    value: 1,
    // [Symbol.iterator]() {
    //     return createIterator([1, 2, 3])
    // }
};

obj[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (value of obj) {
    console.log(value);
}