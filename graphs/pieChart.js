import { DiskGraph } from "./diskGraph.js";

export function PieChart(data) {
    this.chartData = data
}

PieChart.prototype = {
    constructor: PieChart,

    createStructure: function() {
        var disk = this.createDisc(250, 200, 150, "red")
        this.svg.appendChild(disk)
    },
}

Object.assign(PieChart.prototype, DiskGraph.prototype);