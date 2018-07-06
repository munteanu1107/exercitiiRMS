import { chartData } from "./chartData.js";
import { MainGraph } from "./mainGraph.js";
import { DiskGraph } from "./diskGraph.js";
import { PieChart } from "./pieChart.js";

var mainGraph = new MainGraph();
var diskGraph = new DiskGraph();
var pieChart = new PieChart(chartData);
pieChart.createSvgParent("chart");
// diskGraph.calculate()
pieChart.createStructure();
