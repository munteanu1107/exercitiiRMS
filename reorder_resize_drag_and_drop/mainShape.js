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
            shape.addListener("startReorder", this.startReorder.bind(this));
            shape.addListener("checkMousePos", this.checkMousePosAndDrawLine.bind(this));
            shape.addListener("dropShape", this.dropShape.bind(this));
            this.listOfShapes.push(shape)
        }
    },

    startReorder: function() {
        this.intervals = [];
        var coords = {};

        var firstVirtualRect = {

            y1: this.listOfShapes[0].element.getBBox().y - this.listOfShapes[0].element.getBBox().height,
            y2: this.listOfShapes[0].element.getBBox().y
        }
        this.intervals.push(firstVirtualRect)
        for(var i = 0; i < this.listOfShapes.length; i++) {

            var element = this.listOfShapes[i].element;
            var interval1 = this.listOfShapes[i].element.getBBox().y + this.listOfShapes[i].element.getBBox().height;
            var interval2 = this.listOfShapes[i + 1] ? this.listOfShapes[i + 1].element.getBBox().y : this.listOfShapes[i].element.getBBox().y + (this.listOfShapes[i].element.getBBox().height * 2);


            coords.y1 = interval1;
            coords.y2 = interval2;
            this.intervals.push(coords);
            coords = {};
        }
        console.log(this.intervals)
    },

    checkMousePosAndDrawLine: function(evt) {
        var selectedElementId = parseInt(evt.target.element.id);
        this.curentMousePosition = evt.data.clientY;

        for(var i = 0; i < this.intervals.length; i++) {
            if(i !== selectedElementId && i !== (selectedElementId + 1)) {
                this.flag = this.is_inside(this.curentMousePosition, this.intervals[i].y1, this.intervals[i].y2);

                if(this.flag) {

                    this.sendDataForDrop = {
                        y1: this.intervals[i].y1,
                        y2: this.intervals[i].y2,
                        elToBeChanged: selectedElementId + 1
                    }

                    this.line.setAttribute("x1", 0);
                    this.line.setAttribute("x2", 9999);
                    this.line.setAttribute("y1", this.intervals[i].y2 - (evt.target._distance / 2));
                    this.line.setAttribute("y2", this.intervals[i].y2 - (evt.target._distance / 2));
                }
            }
        }
    },

    dropShape: function(evt) {
        this.line.setAttribute("x1", 9999);
        this.line.setAttribute("x2", 9999);
        this.line.setAttribute("y1", 9999);
        this.line.setAttribute("y2", 9999);

        var selectedElement = evt.target.element;
        var selectedElementId = parseInt(evt.target.element.id);
        this.curentMousePosition = evt.data.clientY;

        console.log(this.flag)
        if(this.flag) {
            console.log(this.sendDataForDrop)
        } else {
            selectedElement.id = selectedElement.id;
            selectedElement.setAttribute("y", evt.target.elementBoundingRect.y)
            evt.target.initResize(evt.target.element)
        }

        for(var i = 0; i < this.intervals.length; i++) {
        }
    },

    is_inside: function (mousePos, y1, y2) {
        var mouseYpos = mousePos;
        var yPos1 = y1;
        var yPos2 = y2
        // var rect2 = el2.getBoundingClientRect();

        return (
          ((yPos1 <= mouseYpos) && (mouseYpos <= yPos2))
        );

    },

    resized: function(evt) {
        var pointer = evt.data.data.el.id;
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
            evt.target.initResize(evt.target.element);
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

// collideBottom: function(el1, el2) {
    //     el1 = el1.getBBox();
    //     el2 = el2.getBBox();

    //     if (el1.y >= el2.y && el2.y >= el1.y) {
    //         this.line.setAttribute("x1", 0);
    //         this.line.setAttribute("x2", 9999);
    //         this.line.setAttribute("y1", el2.y + el2.height + 10);
    //         this.line.setAttribute("y2", el2.y + el2.height + 10);

    //         return true;
    //     } else {
    //        return false
    //     }
    // },