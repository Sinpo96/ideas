const curry = function(fn) {
    const args = [].slice.call(arguments, 1);
    return function() {
        const newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    }
}

function add(a, b) {
    console.log(a + b);
}

const addCurry = curry(add, 1, 2);
addCurry();