import { MainGraph } from "./mainGraph.js";
import { IDiskGraph } from "./interfaces/iDiskGraph.js";

export function DiskGraph() {

}

DiskGraph.prototype = Object.create(IDiskGraph.prototype);

Object.assign(DiskGraph.prototype, MainGraph.prototype, {

    constructor: DiskGraph,

    createDisc: function(centerX, centerY, radius, color) {
        var diskData = {
            cx: centerX,
            cy: centerY,
            r: radius,
            fill: color
        };

        var g = this.createNode("g");
        this.disk = this.createNode("circle", diskData);

        g.appendChild(this.disk);

        return g;
    },

    getArrayOfAngles: function() {
        var arrayOfPercentages = this.getArrayOfPercentages(this.chartData);
        var arrayOfAngles = [];

        for(var i = 0; i < arrayOfPercentages.length; i++) {
            arrayOfAngles.push(this.calculatePercentToAngle(arrayOfPercentages[i]));
        }

        return arrayOfAngles;
    },

    calculatePercentToAngle: function(percent) {
        return percent * this.convertDegToRad(360) / 100;
    },

    convertDegToRad: function (degrees) {
        return degrees * (Math.PI / 180);
    }
});