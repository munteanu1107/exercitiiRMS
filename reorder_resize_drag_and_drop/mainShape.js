import { Board } from "./board.js"
import { IMainShape } from "./interfaces/i_mainShape.js"

export function MainShape() {

}

MainShape.prototype = Object.create(IMainShape.prototype);

Object.assign(MainShape.prototype, Board.prototype, {
    constructor: MainShape,

    createElement: function(config, callback) {
        var g;
        var text;
        var rect;
        var line;

        line = this.createNode("line", {
            x1: 0,
            y1: config.y,
            x2: this.svg.clientWidth,
            y2: config.y,
            stroke: "red"
        });

        this.group.appendChild(line);
``
        for(var i = 0; i < config.els; i++) {

            line = this.createNode("line", {
                x1: 0,
                y1: config.y + config.height,
                x2: this.svg.clientWidth,
                y2: config.y + config.height,
                stroke: "red"
            })

            g = this.createNode("g", {
                id: i + 1,
                width: config.width,
                height: config.height,
                x: config.x,
                y: config.y,
                fill: "#23abba"
            });

            text = this.createNode("text", {
                x: config.x + config.height,
                y: config.y + (config.height / 2),
                fill: "black"
            });

            rect = this.createNode("rect", {
                id: i,
                width: config.width,
                height: config.height,
                x: config.x,
                y: config.y,
                rx: config.borderRadius,
                ry: config.borderRadius,
                fill: "#23abba"
            });

            text.innerHTML = "Shape " + (i +1);
            config.y += (config.height + config.distance);
            config.width -= config.height;

            g.appendChild(rect);
            g.appendChild(text);

            if(callback) {
                this.clickHandler = callback.bind(this);
                g.addEventListener("click", this.clickHandler);
            }

            this.group.appendChild(line);
            this.group.appendChild(g);
            this.elements.push(rect);
        }
    }
});