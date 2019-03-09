/*
let fibonacci = {

    [Symbol.iterator]() {
        let prev = 0, cur = 1;

        return {
            next() {
                [prev, cur] = [cur, prev + cur];
                return {done : false, value : cur}
            }
        }
    }
};
*/

function* fiboGen() {
    let prev = 0, cur = 1;

    for(;;){
        [prev, cur] = [cur, prev + cur];
        yield cur;
    }
}

let fibonacci = {
    [Symbol.iterator] : fiboGen
};

for(var n of fibonacci) {
    if(n > 1000) {
        break;
    }

    console.log(n);
}


console.log('----------------');

var a = undefined;
var b = a || 1;

console.log(b);

a = 2;
b = a || 3;

console.log(b);

var c = undefined;
var d = function() {
    console.log('hi!');
};

c && d();

c = 1;
c && d();
