import { pieData, pieData2, pieData3, pieData4  } from "./chartData.js";
import { ChartFactory } from "./factory.js";

var colors = ["#bd6e9a", "#ebef78", "#72f2db", "#3d44b6", "#c9b088", "#248253", "#aa09d0", "#cf083e"];

var chartFactory = new ChartFactory();

var pie = chartFactory.createChart({
    type: "pie",
    data: pieData
});

var donut = chartFactory.createChart({
    type: "donut",
    data: pieData2
});

var bar = chartFactory.createChart({
    type: "bar",
    data: pieData3
});

var line = chartFactory.createChart({
    type: "line",
    data: pieData4
});

pie.render("pie", 250, 250, 200, true, colors);
donut.render("donut", 250, 250, 200, 119, true, colors);
bar.render("bar", 50, 600, true, colors);
line.render("line", 30, 600, true, colors);


pie.addCustomStyle("customPie");