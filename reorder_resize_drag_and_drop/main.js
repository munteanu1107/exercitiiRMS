import { Board } from "./board.js";
import { MainShape } from "./mainShape.js";


var board = new Board();
board.render("main");

var mainShape = new MainShape();
mainShape.render("mainSvg", {
    elements: 5,
    x: 100,
    y: 80,
    width: 800,
    height: 50,
    distance: 10
});

console.log(mainShape)