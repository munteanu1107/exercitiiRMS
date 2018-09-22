export function IPieChart() {

}

IPieChart.prototype = {
    constructor: IPieChart,

    render: function() {
        throw new Error("ReferenceError: 'this.render()' is not defined" );
    },

    createPath: function() {
        throw new Error("ReferenceError: 'this.createPath()' is not defined" );
    }
}