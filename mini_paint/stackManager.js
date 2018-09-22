
export function StackManager(undoStack, redoStack) {
    this._undoStack = undoStack;
    this._redoStack = redoStack;

    Object.defineProperties(this, {
        "undoStack": {
            get: function() {
                return this._undoStack;
             },
             set: function(newStack) {
                 this._undoStack = newStack;
             }
         },
         "redoStack": {
             get: function() {
                 return this._redoStack;
             },
             set: function(newStack) {
                 return this._redoStack = newStack;
             }
         }
     });
}

StackManager.prototype = {

    constructor: StackManager,

    push: function(item) {
        if(this._undoStack) {
            this._undoStack.push(item);
        }

        return this._undoStack;
    },

    getUndoVector: function() {
        if(this._undoStack.top()) {
            this._redoStack.push(this._undoStack.top());
        }

        return this._undoStack.pop();
    },

    getRedoVector: function() {
        if(this._redoStack.top()){
            this._undoStack.push(this._redoStack.top());
        }

        return this._redoStack.pop();
    },

    set_undo: function(setter) {
        return this._undoStack = setter;
    },

    set_redo: function(setter) {
        return this._redoStack = setter;
    },

    is_undo_empty: function() {
        return this._undoStack.is_empty();
    },

    is_redo_empty: function() {
        return this._redoStack.is_empty();
    }
};