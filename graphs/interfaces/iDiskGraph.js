export function IDiskGraph() {

}

IDiskGraph.prototype = {
    constructor: IDiskGraph,

    createDisc: function() {
        throw new Error("ReferenceError: 'this.createDisc()' is not defined" );
    },

    getArrayOfAngles: function() {
        throw new Error("ReferenceError: 'this.getArrayOfAngles()' is not defined" );
    },

    calculatePercentToAngle: function() {
        throw new Error("ReferenceError: 'this.calculatePercentToAngle()' is not defined" );
    },

    convertDegToRad: function() {
        throw new Error("ReferenceError: 'this.convertDegToRad()' is not defined" );
    }
}