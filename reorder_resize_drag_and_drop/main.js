import { MainShape } from "./mainShape.js";

var shape = {
    width: 800,
    height: 50,
    x: 100,
    distance: 40,
    resizable: true,
    resizablePoints: ["top","bottom", "left",  "right"]
};

var shape1 = {
    width: 750,
    height: 50,
    x: 100,
    distance: 40,
    resizable: true,
    resizablePoints: ["top","bottom"]
};

var shape2 = {
    width: 700,
    height: 80,
    x: 100,
    distance: 40,
    resizable: false,
    resizablePoints: ["topLeft", "topRight", "bottomLeft", "bottomRight"]
};

var shapeManager = new MainShape();
shapeManager.init("mainSvg", 80);

shapeManager.createShape(shape);
shapeManager.createShape(shape1);
shapeManager.createShape(shape2);
