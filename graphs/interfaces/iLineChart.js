export function ILineChart() {

}

ILineChart.prototype = {
    constructor: ILineChart,

    render: function() {
        throw new Error("ReferenceError: 'this.render()' is not defined" );
    },

    createLine: function() {
        throw new Error("ReferenceError: 'this.createLine()' is not defined" );
    }
}