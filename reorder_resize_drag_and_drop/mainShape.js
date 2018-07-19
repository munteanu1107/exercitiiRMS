import { Shape } from "./shape.js";
import { CustomEvents } from "./custom_events.js";
import { Board } from "./board.js";

export function MainShape() {

}

MainShape.prototype = Object.create(CustomEvents.prototype);

Object.assign(MainShape.prototype, Board.prototype, {
    constructor: MainShape,

    init: function(elements, config) {
        this.list = [];

        this.initBoard("main");

        this.mainGroup = this.createGroupNode(config.parent, { id: "mainGroup" });


        this.mouseDownHandler = this.getMouseDownElement.bind(this);
        this.mousePresedHandler = this.presedElement.bind(this);

        for(var i = 0; i < elements; i++) {
            var shape = new Shape(config.parent, config.width, config.height, config.x, config.y, config.distance, i);

            config.y += (config.height + config.distance);
            config.width -= config.height;
            shape.render();
            shape.startDrag(shape.rowRect, "vertical");
            shape.addListener("mouseIsDown", this.mouseDownHandler);
            shape.addListener("mousePresed", this.mousePresedHandler);

            this.list.push(shape)
        }
    },

    getMouseDownElement: function(evt) {
        console.log(evt)
        evt.target.initResize(evt.data)
    },

    presedElement: function(evt) {
        evt.target.initResize(evt.data)
    }
});