import { chartData } from "./chartData.js";
import { ChartFactory } from "./factory.js";

var colors = ["#bd6e9a", "#ebef78", "#72f2db", "#3d44b6", "#c9b088", "#248253", "#aa09d0", "#cf083e"];

var chartFactory = new ChartFactory();

var pie = chartFactory.createChart({
    type: "pie",
    data: chartData,
    config: {
        parentId: "pie",
        xPos: 250,
        yPos: 250,
        radius: 200,
        legend: true,
        colors: colors
    }
});

var donut = chartFactory.createChart({
    type: "donut",
    data: chartData,
    config: {
        parentId: "donut",
        xPos: 250,
        yPos: 250,
        radius: 200,
        secondRadius:119,
        legend: true,
        colors: colors
    }
});

var bar = chartFactory.createChart({
    type: "bar",
    data: chartData,
    config: {
        parentId: "bar",
        width: 50,
        height: 600,
        legend: true,
        colors: colors
    }
});

var line = chartFactory.createChart({
    type: "line",
    data: chartData,
    config: {
        parentId: "line",
        height: 30,
        width: 600,
        legend: true,
        colors: colors
    }
});

pie.addCustomStyle("customPie");
donut.addCustomStyle("customPie");