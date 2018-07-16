import { IMainShape } from "./interfaces/i_mainShape.js";
import { MainShape } from "./mainShape.js";
import { Board } from "./board.js";
import { Resize } from "./resize.js";

export function Shape() {};

Shape.prototype = Object.create(IMainShape.prototype);

Object.assign(Shape.prototype, MainShape.prototype, Board.prototype, Resize.prototype, {
    constructor: Shape,

    render: function(config) {
        this.createStructure(1000, 1000);

        if(this.resize && typeof this.resize === "function") {
            this.createElement(config, this.resize)
        } else {
            this.createElement(config)
        }
    }
});