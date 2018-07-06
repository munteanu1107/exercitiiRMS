import { MainGraph } from "./mainGraph.js";

export function DiskGraph() {

}

DiskGraph.prototype = {
    constructor: DiskGraph,

    createDisc: function(centerX, centerY, radius, color) {
        var diskData = {
            cx: centerX,
            cy: centerY,
            r: radius,
            fill: color
        }

        var disk = this.createNode("circle", diskData);

        return disk;
    },

    calculateSliceAngle: function() {
        this.svgDetails = this.svg.getBoundingClientRect();
        this.radius = this.svgDetails.width / 2;
        this.radAngles = this.getArrayOfAngles();
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
};
Object.assign(DiskGraph.prototype, MainGraph.prototype);