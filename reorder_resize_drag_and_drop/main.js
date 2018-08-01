import { MainShape } from "./mainShape.js";

var data = {
    parent: "mainSvg",
    width: 800,
    height: 50,
    x: 100,
    y: 80,
    distance: 40
};

var shapeManager = new MainShape();
shapeManager.init(6, data);