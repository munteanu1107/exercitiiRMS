import { RectangleGraph } from "./rectangleGraph.js";
import { Legend } from "./legend.js";
import { ILineChart } from "./interfaces/iLineChart.js"

export function LineChart(data) {
    this.chartData = data;
}

LineChart.prototype = Object.create(ILineChart.prototype);

Object.assign(LineChart.prototype, RectangleGraph.prototype, Legend.prototype, {

    constructor: LineChart,

    render: function(parent, width, height, legend, colors) {
        var percentToLength;

        if(!colors) {
            colors = this.createListColor();
        }

        this.createSvgParent(parent, {
            width: height,
            height: width,
            id: "lineChart"
        });


        percentToLength = this.calculateLength("width", this.getArrayOfPercentages(this.chartData));

        this.createLine(percentToLength, colors, width);

        if(legend && typeof this.renderLegend === "function") {
            this.renderLegend(parent, colors);
        }

    },

    createLine: function(data, colors, width) {
        var percentages;
        var title;
        var xPos;
        var yPos;
        var rect;
        var g;

        percentages = this.getArrayOfPercentages(this.chartData);
        xPos = 0;
        yPos = 0;
        g = this.createNode("g")

        for(var i = 0; i < data.length; i++) {
            rect = this.createRectangle(xPos, yPos, data[i], width, colors[i]);

            xPos += data[i];

            g.appendChild(rect);
            title = this.createNode("title");

            title.innerHTML = percentages[i] + "%";
            rect.appendChild(title);
            this.svg.appendChild(g)
        }
    }
});

