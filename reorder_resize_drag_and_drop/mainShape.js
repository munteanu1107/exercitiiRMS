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
        this.startPos = config.y;
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

        this.createShape(elements, config);
    },

    createShape: function(elements, config) {

        for (var i = 0; i < elements; i++) {
            var shape = new Shape(config.parent, config.width, config.height, config.x, config.y, config.distance, i);

            config.y += (config.height + config.distance);
            config.width -= config.height;

            shape.render();
            shape.addListener("resized", this.resized.bind(this));
            shape.addListener("checkMousePos", this.checkMousePosAndDrawLine.bind(this));
            shape.addListener("dropShape", this.dropShape.bind(this));
            this.listOfShapes.push(shape);
        }
    },

    positionElements: function(array, evt) {
        var distance = this.startPos;

        for(var i = 0; i < array.length; i++) {
            array[i].row.id = "row" + i;
            array[i].element.id = i;
            array[i].setShapeYpos(distance);
            distance += array[i].getHeight() + array[i].getDistance();
            this.mainGroup.appendChild(array[i].row);
        };

        this.determineVirualBands(evt);
        evt.target.initResize(evt.target.element);
    },

    determineVirualBands: function(evt) {
        this.intervals = [];
        var firstStrip;
        var strips;

        firstStrip = {
            y1: this.listOfShapes[0].element.getBBox().y - this.listOfShapes[0].element.getBBox().height,
            y2: this.listOfShapes[0].element.getBBox().y,
            index: 0
        };

        this.intervals.push(firstStrip);

        for(var i = 0; i < this.listOfShapes.length; i++) {
            var currentElement = this.listOfShapes[i].element.getBBox();

            var interval1 = currentElement.y + currentElement.height;
            var interval2 = interval1 + evt.target.getDistance();

            strips = {};
            strips.y1 = interval1;
            strips.y2 = interval2;
            strips.index = i + 1;

            this.intervals.push(strips);
        }
    },

    checkMousePosAndDrawLine: function(evt) {
        this.determineVirualBands(evt);

        var curentMousePosition = evt.data.clientY;
        var selectedElementId = parseInt(evt.target.element.id);
        var selectedIndex = -1;

        for(var i = 0; i < this.intervals.length; i++) {
            if((i-1) !== selectedElementId && i !== selectedElementId) {
                this.flag = this.is_inside(curentMousePosition, this.intervals[i].y1, this.intervals[i].y2, selectedElementId);
            }

            if (this.flag) {
                selectedIndex = i;
            }
        }

        if(selectedIndex >= 0) {
            this.reorderFlag = true;
            this.drawLine( this.intervals[selectedIndex].y1, evt);
        } else {
            this.reorderFlag = false;
            this.drawLine();
        }
    },

    dropShape: function(evt) {
        this.drawLine();

        var curentMousePosition = evt.data.clientY;
        var selectedElementId = parseInt(evt.target.element.id);
        var selectedIndex = -1;
        var indexPosInArray;

        if(this.reorderFlag) {
            for(var i = 0; i < this.intervals.length; i++) {
                if((i-1) !== selectedElementId) {
                    var isInsideBand = this.is_inside(curentMousePosition, this.intervals[i].y1, this.intervals[i].y2, selectedElementId);
                }

                if (isInsideBand) {
                    selectedIndex = i;
                }
            }

            for(var i = 0; i < this.listOfShapes.length; i++) {
                if(parseInt(this.listOfShapes[i].element.id) === this.sendDataForDrop.elToBeChanged) {
                    var splicedShape = this.listOfShapes.splice(i, 1);
                    indexPosInArray = i;
                }
            }

            if(selectedIndex > indexPosInArray) {
                this.listOfShapes.splice(selectedIndex - 1, 0, splicedShape[0]);
            } else {
                this.listOfShapes.splice(selectedIndex, 0, splicedShape[0]);
            }

            this.reorderFlag = false;
        }

        this.positionElements(this.listOfShapes, evt);
    },

    is_inside: function (mousePos, y1, y2, selectedElementId) {
        var mouseYpos = mousePos;
        var yPos1 = y1;
        var yPos2 = y2;

        if((yPos1 <= mouseYpos) && (mouseYpos <= yPos2)) {

            this.sendDataForDrop = {
                y1: yPos1,
                y2: yPos2,
                elToBeChanged: selectedElementId
            }

            return true;
        } else {
            return false
        }
    },

    drawLine: function(yPos) {
        if(yPos) {
            this.line.setAttribute("x1", 0);
            this.line.setAttribute("x2", 9999);
            this.line.setAttribute("y1", yPos);
            this.line.setAttribute("y2", yPos);
        } else {
            this.line.setAttribute("x1", 9999);
            this.line.setAttribute("x2", 9999);
            this.line.setAttribute("y1", 9999);
            this.line.setAttribute("y2", 9999);
        }
    },

    resized: function(evt) {
        this.positionElements(this.listOfShapes, evt);
    }
});