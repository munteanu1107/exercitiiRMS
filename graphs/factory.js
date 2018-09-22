import { PieChart } from "./pieChart.js";
import { DonutChart } from "./donutChart.js";
import { BarChart } from "./barChart.js";
import { LineChart } from "./lineChart.js";


export function ChartFactory() {

}

ChartFactory.prototype = {
    constructor: ChartFactory,

    createChart: function(options) {
        switch(options.type) {
            case "pie":
                this.chartType = PieChart;
                break;

            case "donut":
                this.chartType = DonutChart;
                break;

            case "bar":
                this.chartType = BarChart;
                break;

            case "line":
                this.chartType = LineChart;
                break;
        }

        var chart = new this.chartType(options.data);

        return chart;
    }
};