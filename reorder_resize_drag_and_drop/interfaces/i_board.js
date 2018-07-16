export function IBoard() {

}

IBoard.prototype = {
    constructor: IBoard,

    createNode: function() {
        throw new Error("ReferenceError: 'this.createNode()' is not defined" );
    },

    createSvgParent: function() {
        throw new Error("ReferenceError: 'this.createSvgParent()' is not defined" );
    }
};
