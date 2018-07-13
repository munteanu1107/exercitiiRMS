export function IBarChart() {

}

IBarChart.prototype = {
    constructor: IBarChart,

    render: function() {
        throw new Error("ReferenceError: 'this.render()' is not defined" );
    },

    createBar: function() {
        throw new Error("ReferenceError: 'this.createBar()' is not defined" );
    }
}