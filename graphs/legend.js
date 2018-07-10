import { MainGraph } from "./mainGraph.js";

export function Legend() {

}

Legend.prototype = {
    constructor: Legend,

    renderLegend: function(colors) {
        this.createSvgParent("chart", {
            width: 200,
            height: 300
        });
        var rect;
        var model;
        var text;
        var xPos = 0;
        var yPos = 20;

        model = {
            width: 50,
            height: 20,
            fill: colors[i]
        }

        for(var i = 0; i < this.chartData.data.length; i++) {
            model = {
                x: xPos,
                y: yPos,
                width: 50,
                height: 20,
                fill: colors[i]
            };

            rect = this.createNode("rect", model);
            text = this.createNode("text", {
                fill: "black",
                x:60,
                y: yPos + 15
            });
            text.innerHTML = this.chartData.data[i].label;
            this.svg.appendChild(text);
            this.svg.appendChild(rect);

            yPos += 10 + model.height
        }
    }
}

Object.assign(Legend.prototype, MainGraph.prototype);
