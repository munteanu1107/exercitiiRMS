import { CustomEvents } from "./customEvents.js";

export function Stack(size) {
    this._size = size;
    this._stack = new Array(this._size);
}

Stack.prototype = Object.create(CustomEvents.prototype);

Object.assign(Stack.prototype, {
    constructor: Stack,

    push: function(item) {
        this._stack.push(item)
    },

    top: function() {
        this._stack.slice(-1);
    }
});

var x = new Stack(26);
console.log(x._stack)