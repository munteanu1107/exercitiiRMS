import { DiskGraph } from "./diskGraph.js";
import { Legend } from "./legend.js";
import { IPieChart } from "./interfaces/iPieChart.js";

export function PieChart(data) {
    this.chartData = data;
}

PieChart.prototype = Object.create(IPieChart.prototype);

Object.assign(PieChart.prototype,Legend.prototype, DiskGraph.prototype, {

    constructor: PieChart,

    render: function(parent, originX, originY, radius, legend, colors) {
        var disk;

        if(!colors) {
            colors = this.createListColor();
        }

        disk = this.createDisc(originX, originY, radius, "#e0e0e0");

        this.checkValidityOfPercentage();

        this.createSvgParent( parent, {
            width: 600,
            height: 600,
            id: "pieChart"
        });

        this.svg.appendChild(disk);

        this.createPath(disk, colors, originX, originY, radius);

        if(legend && typeof this.renderLegend === "function") {
            this.renderLegend(parent, colors);
        }
    },

    createPath: function(appendTo, colors, originX, originY, r) {
        var dpath;
        var model;
        var path;
        var title;
        var percentages;
        var angles;
        var startAngle = 0;
        var endAngle = 0;
        var x1,x2,y1,y2 = 0

        percentages = this.getArrayOfPercentages(this.chartData);
        angles = this.getArrayOfAngles();

        for(var i=0; i <angles.length; i++){
            startAngle = endAngle;
            endAngle = startAngle + angles[i];

            x1 = originX + Math.cos(startAngle - Math.PI/2) * r;
            y1 = originY + Math.sin(startAngle - Math.PI/2) * r;

            x2 = originX + Math.cos(endAngle - Math.PI/2) * r;
            y2 = originY + Math.sin(endAngle - Math.PI/2) * r;

            dpath =
                    " M" + originX + "," + originY +
                    " L" + x1 + "," + y1 +
                    " A" + r + "," + r + " 0, 0, 1 " + x2 + "," + y2 +
                    " z";

            model = {
                fill: colors ? colors[i] : "#e0e0e0",
                d: dpath
            };

            path = this.createNode("path", model);
            title = this.createNode("title");

            title.innerHTML = percentages[i] + "%";
            path.appendChild(title);

            appendTo.appendChild(path);
        }
    }
});