import { PieChart } from "./pieChart.js";
import { DonutChart } from "./donutChart.js";
import { BarChart } from "./barChart.js";
import { LineChart } from "./lineChart.js";


export function ChartFactory() {

}

ChartFactory.prototype = {
    constructor: ChartFactory,

    createChart: function(options) {
        var config = options.config;
        switch(options.type) {
            case "pie":
                this.chartType = new PieChart(options.data);
                this.chartType.render(config.parentId ,config.xPos, config.yPos, config.radius, config.legend, config.colors);
                break;

            case "donut":
                this.chartType = new DonutChart(options.data);
                this.chartType.render(config.parentId, config.xPos, config.yPos, config.radius, config.secondRadius, config.legend, config.colors);
                break;

            case "bar":
                this.chartType = new BarChart(options.data);
                this.chartType.render(config.parentId, config.width, config.height, config.legend, config.colors);
                break;

            case "line":
                this.chartType = new LineChart(options.data);
                this.chartType.render(config.parentId, config.height, config.width, config.legend, config.colors);
                break;
        }

        var chart = this.chartType;

        return chart;
    }
};