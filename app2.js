// Reduce Function
Array.prototype.cReduce = function (callback) {
    var index, accumulator, currVal;
    var arrLen = this.length;
    if (arguments.length === 2) {
        index = 0;
        accumulator = arguments[1];
    } else {
        index = 1;
        accumulator = this[0];
    }
    for (var i = index; i < arrLen; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
}

var arr = ['1', 2, 3, 4]
var reducedVal = arr.cReduce(function (a, c) {
    return a + c;
}, null);
console.log(reducedVal);

// Reducer like function
function setState(state, key, value) {
    var keys = key.split('/');
    var newState = _copyObj(state);
    var pointer = newState;    
    keys.cReduce(function(accumulator, currVal, index, arr) {
        if (accumulator.hasOwnProperty(currVal)) {
            if (typeof accumulator[currVal] === 'object') {
                pointer[currVal] = (index === arr.length - 1) ? value : _copyObj(accumulator[currVal]);
            } else {
                pointer[currVal] = {};
            }
        } else {
            pointer[currVal] = (index === arr.length - 1) ? value : {};
        }
        pointer = pointer[currVal];
        return pointer;
    }, newState);
    return newState;    
}

function _copyObj(obj) {
    var newObj = {};
    for (var key in obj) {
        newObj[key] = obj[key];
    }
    return newObj;
}

var state = {};
state1 = setState(state, 'a/b/c', 5)
state2 = setState(state1, 'a/b/d', 6)
console.log(state1);
console.log(state2);