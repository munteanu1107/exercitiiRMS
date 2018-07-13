import { RectangleGraph } from "./rectangleGraph.js";
import { Legend } from "./legend.js";
import { IBarChart } from "./interfaces/iBarChart.js";

export function BarChart(data) {
    this.chartData = data;
}

BarChart.prototype = Object.create(IBarChart.prototype);

Object.assign(BarChart.prototype, RectangleGraph.prototype, Legend.prototype, {

    constructor: BarChart,

    render: function(parent, width, height, legend, colors) {
        var percentToLength;

        if(!colors) {
            colors = this.createListColor();
        }

        this.createSvgParent(parent, {
            width: 150,
            height: height,
            id: "barChart"
        });


        percentToLength = this.calculateLength("height", this.getArrayOfPercentages(this.chartData));

        this.createBar(percentToLength, colors, width);

        if(legend && typeof this.renderLegend === "function") {
            this.renderLegend(parent, colors);
        }

    },

    createBar: function(data, colors, width) {
        var percentages;
        var names;
        var title;
        var xPos;
        var yPos;
        var rect;
        var g;

        percentages = this.getArrayOfPercentages(this.chartData);
        names = this.getArrayOfNameItems(this.chartData);
        xPos = 0;
        yPos = 0;
        g = this.createNode("g")

        for(var i = 0; i < data.length; i++) {
            rect = this.createRectangle(xPos, yPos, width, data[i], colors[i]);

            yPos += data[i];

            g.appendChild(rect);
            title = this.createNode("title");

            title.innerHTML = names[i] + " " + percentages[i] + "%";
            rect.appendChild(title);
            this.svg.appendChild(g);
        }
    }
});

