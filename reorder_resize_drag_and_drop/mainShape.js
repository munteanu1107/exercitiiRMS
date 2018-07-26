import { Shape } from "./shape.js";
import { CustomEvents } from "./custom_events.js";
import { Board } from "./board.js";

export function MainShape() {
    this.listOfShapes = [];
}

MainShape.prototype = Object.create(CustomEvents.prototype);

Object.assign(MainShape.prototype, Board.prototype, {
    constructor: MainShape,

    init: function (elements, config) {
        this.initBoard("main");

        this.mainGroup = this.createGroupNode(config.parent, {
            id: "mainGroup"
        });

        this.line = this.createLineNode("mainGroup", {
            id: "separator",
            x1: -9999,
            y1: -9999,
            x2: -9999,
            y2: -9999,
            stroke: "red"
        });

        this.createShape(elements, config)
    },

    createShape: function(elements, config) {

        for (var i = 0; i < elements; i++) {
            var shape = new Shape(config.parent, config.width, config.height, config.x, config.y, config.distance, i);

            config.y += (config.height + config.distance);
            config.width -= config.height;

            shape.render();
            shape.addListener("resized", this.resized.bind(this));
            shape.addListener("reorder", this.reorder.bind(this));
            this.listOfShapes.push(shape)
        }
    },

    reorder: function(evt) {
        var shape = evt.target.element;
        var initialShapeBBox = evt.target.elementBoundingRect;
        var currentYpos = evt.target.element.getBBox();

        this.doReorder(shape, initialShapeBBox.y, currentYpos);
    },

    doReorder: function(element, initialPosition, currentPos) {
        for(var i = 0; i < this.listOfShapes.length; i++) {
            if(this.listOfShapes[i].element.id !== element.id) {

                if(currentPos.y >= this.listOfShapes[i].element.getBBox().y && currentPos.y < this.listOfShapes[i].element.getBBox().y + 10) {

                    this.line.setAttribute("x1", 0);
                    this.line.setAttribute("x2", 9999);
                    this.line.setAttribute("y1", this.listOfShapes[i].element.getBBox().y + this.listOfShapes[i].element.getBBox().height + 10);
                    this.line.setAttribute("y2", this.listOfShapes[i].element.getBBox().y + this.listOfShapes[i].element.getBBox().height + 10);
                }
            }
        }
    },

    resized: function(evt) {
        var pointer = evt.data.data.el.id
        var resizedEl = evt.target.element;
        var resizedElBoundingBox = evt.target.element.getBBox();
        var resizedElInitHeight = evt.target.shapeBBox.height;
        var distanceToUpdate = resizedElBoundingBox.height - resizedElInitHeight;

        var resizedElInitPosY = evt.target.shapeBBox.y;
        var positionToUpdate = resizedElBoundingBox.y - resizedElInitPosY;

        if(pointer === "bottomPoint") {
            this.updateDistanceBottom(resizedEl, distanceToUpdate);
        }

        if(pointer === "topPoint") {
            this.updateDistanceTop(resizedEl, positionToUpdate, resizedElInitPosY);
            evt.target.initResize(evt.target.element)
        }
    },

    updateDistanceBottom: function(resizedEl, distance) {
        for(var i = 0; i < this.listOfShapes.length; i++) {
            if(parseInt(this.listOfShapes[i].element.id) > parseInt(resizedEl.id)) {
                var newYpos = this.listOfShapes[i].element.getBBox().y + distance;

                this.listOfShapes[i].element.setAttribute("y", newYpos)
            }
        }
    },

    updateDistanceTop: function(resizedEl, distance) {
        for(var i = 0; i < this.listOfShapes.length; i++) {
            var newYpos = this.listOfShapes[i].element.getBBox().y - distance;

            if(parseInt(this.listOfShapes[i].element.id) >= parseInt(resizedEl.id)) {
                this.listOfShapes[i].element.setAttribute("y", newYpos)
            }
        }
    }
});