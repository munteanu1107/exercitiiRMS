import { chartData } from "./chartData.js";
import { PieChart } from "./pieChart.js";
import { DonutChart } from "./donutChart.js";
import { Legend } from "./legend.js";

var colors = ["#bd6e9a", "#ebef78", "#72f2db", "#3d44b6", "#c9b088", "#248253", "#aa09d0", "#cf083e"];

var pieChart = new PieChart(chartData);
pieChart.renderPie(250, 250, 200, colors);

var donutChart = new DonutChart(chartData);
donutChart.renderPie(250, 250, 200, 119 ,colors);
