import { MainGraph } from "./mainGraph.js";
import { IRectangleGraph } from "./interfaces/iRectangleGraph.js";

export function RectangleGraph() {

}

RectangleGraph.prototype = Object.create(IRectangleGraph.prototype);

Object.assign(RectangleGraph.prototype, MainGraph.prototype, {

    constructor: RectangleGraph,

    createRectangle: function(xPos, yPos, width, height, color) {
        var rectData;

        rectData = {
            x: xPos,
            y: yPos,
            width: width,
            height: height,
            fill: color
        };

        this.rect = this.createNode("rect", rectData);

        return this.rect;
    },

    calculateLength: function(axis, percentages) {
        var parentData;
        var lengths;

        parentData = this.svg.getBoundingClientRect();
        lengths = [];

        for(var i = 0; i < percentages.length; i++) {
            lengths.push(this.calculatePercent(parentData[axis], percentages[i]));
        }

        return lengths;
    },

    calculatePercent: function(parentLength, percent) {
        return (percent * parentLength) / 100;
    }
});