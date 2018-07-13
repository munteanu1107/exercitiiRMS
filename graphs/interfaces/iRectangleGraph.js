export function IRectangleGraph() {

}

IRectangleGraph.prototype = {
    constructor: IRectangleGraph,

    createRectangle: function() {
        throw new Error("ReferenceError: 'this.createRectangle()' is not defined" );
    },

    calculateLength: function() {
        throw new Error("ReferenceError: 'this.calculateLength()' is not defined" );
    },

    calculatePercent: function() {
        throw new Error("ReferenceError: 'this.calculatePercent()' is not defined" );
    }
}