
function Stack(size) {
    this._size = size;
    this._stack = [];
}

Stack.prototype = {

    constructor: Stack,

    push: function(item) {
        if(this._stack.length <= this._size) {
            this._stack.push(item);

            return this._stack;
        } else {
            return this.is_full();
        }

    },

    top: function() {
        if(this._stack.length >= 0) {
            var topEl = this._stack.slice(-1);

            return topEl[0];
        } else {
            return this.is_empty();
        }
    },

    pop: function() {
        return this._stack.pop();
    },

    is_empty: function() {
        if(!this._stack.length) {
            return true;
        } else {
            return false;
        }
    },

    is_full: function() {
        if(this._stack.length === this._size) {
            return true;
        } else {
            return false;
        }
    },

    get_size: function() {
        return this._stack.length;
    },

    clear: function() {
        return this._stack = [];
    }
};

var x = new Stack(15);
console.log(x.push("test"));
// console.log(x.top());
// console.log(x.pop())
// console.log(x.is_empty());
// console.log(x.is_full());
// console.log(x.get_size());
// console.log(x.clear());
// console.log(x)