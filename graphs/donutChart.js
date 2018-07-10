import { DiskGraph } from "./diskGraph.js";
import { Legend } from "./legend.js";

export function DonutChart(data) {
    this.chartData = data;
}

DonutChart.prototype = {
    constructor: DonutChart,

    renderPie: function(originX, originY, radius, secondR, colors) {
        var disk;

        if(!colors) {
            colors = this.createListColor();
        }

        disk = this.createDisc(originX, originY, radius, "#e0e0e0");

        this.checkValidityOfPercentage();
        this.createSvgParent("chart",{
            width: 600,
            height: 600
        });

        this.svg.appendChild(disk);

        this.createPathDonut(disk, colors, originX, originY, radius, secondR);

        if(typeof this.renderLegend === "function") {
            this.renderLegend(colors);
        }
    },

    createPathDonut: function(appendTo, colors, originX, originY, r, secondR) {
        var model;
        var path;
        var piePath;
        var title;
        var percentages;
        var angles;
        var startAngle = 0;
        var endAngle = 0;
        var x1,x2,x3,x4,y1,y2,y3,y4 = 0;


        percentages = this.getArrayOfPercentages(this.chartData);
        angles = this.getArrayOfAngles();

        for(var i=0; i <angles.length; i++){
            startAngle = endAngle;
            endAngle = startAngle + angles[i];

            x1 = parseFloat((originX + Math.cos(startAngle - Math.PI/2) * r).toFixed(2));
            y1 = parseFloat((originY + Math.sin(startAngle - Math.PI/2) * r).toFixed(2));

            x2 = parseFloat((originX + Math.cos(endAngle - Math.PI/2) * r).toFixed(2));
            y2 = parseFloat((originY + Math.sin(endAngle - Math.PI/2) * r).toFixed(2));

            x3 = parseFloat((originX + Math.cos(endAngle - Math.PI/2) * (r - secondR)).toFixed(2));
            y3 = parseFloat((originY + Math.sin(endAngle - Math.PI/2) * (r - secondR)).toFixed(2));

            x4 = parseFloat((originX + Math.cos(startAngle - Math.PI/2) * (r - secondR)).toFixed(2));
            y4 = parseFloat((originY + Math.sin(startAngle - Math.PI/2) * (r - secondR)).toFixed(2));

            piePath =
                    " M" + originX + "," + originY +
                    " L" + x1 + "," + y1 +
                    " A" + r + "," + r + " 0, 0, 1 " + x2 + "," + y2 +
                    " L" + x3 + "," + y3 +
                    " A" + (r - secondR) + "," + (r - secondR) + " 0, 0, 0 " + x4 + "," + y4 +
                    " z";

            model = {
                fill: colors[i],
                d: piePath
            };

            path = this.createNode("path", model);
            title = this.createNode("title");

            title.innerHTML = percentages[i] + "%";
            path.appendChild(title);

            appendTo.appendChild(path);
        }
    }
}

Object.assign(DonutChart.prototype,Legend.prototype, DiskGraph.prototype);