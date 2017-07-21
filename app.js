// Partial Right
function partialRight(func) {
    var args = [].slice.call(arguments, 1).reverse();
     return function() {
        var args2 = [].slice.call(arguments, 0).concat(args);
        func.apply(null, args2);
    } 
}

var xyCoords = function(x, y) {
    console.log('coordinates = ', x, ',', y);
}
var xCoords = partialRight(xyCoords, 10); // y = 10
xCoords(1);
xCoords(2);
xCoords(3);

// Currying Functions
function userInfo(name) {
    name = name ? 'User name is ' + name + '.' : 'User\'s name is missing.';
    return function(age) {
        age = age ? 'User age is ' + age + '.' : 'User\'s age is missing.';
        return function(email) {
            email = email ? 'User email is ' + email + '.' : 'User\'s email is missing.';
            return name + age + email
        }
    }
}

console.log(userInfo('Abhishek')(25)('abpa@saxobank.com'));
console.log(userInfo('Foo')()('foo@saxobank.com'));
console.log(userInfo('Bar')(24)());

