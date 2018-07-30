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

    reorder: function(array, evt) {
        this.mainGroup.innerHTML = "";
        this.line = this.createLineNode("mainGroup", {
            id: "separator",
            x1: -9999,
            y1: -9999,
            x2: -9999,
            y2: -9999,
            stroke: "red"
        });

        for(var i = 0; i < array.length; i++) {
            array[i].row.id = i
            array[i].element.id = i
            array[i].setShapeYpos(this.intervals[i].y2)
            this.mainGroup.appendChild(array[i].row)
        };

        evt.target.initResize(evt.target.element)
    },

    startReorder: function() {
        this.intervals = [];
        var coords;

        var firstVirtualRect = {
            y1: this.listOfShapes[0].element.getBBox().y - this.listOfShapes[0].element.getBBox().height,
            y2: this.listOfShapes[0].element.getBBox().y,
            index: 0
        }

        this.intervals.push(firstVirtualRect);

        for(var i = 0; i < this.listOfShapes.length; i++) {
            var interval1 = this.listOfShapes[i].element.getBBox().y + this.listOfShapes[i].element.getBBox().height;
            var interval2 = this.listOfShapes[i + 1] ? this.listOfShapes[i + 1].element.getBBox().y : this.listOfShapes[i].element.getBBox().y + (this.listOfShapes[i].element.getBBox().height * 2);

            coords = {};
            coords.y1 = interval1;
            coords.y2 = interval2;
            coords.index = i + 1;

            this.intervals.push(coords);
        }
    },

    checkMousePosAndDrawLine: function(evt) {
        var selectedElementId = parseInt(evt.target.element.id);
        this.curentMousePosition = evt.data.clientY;
        var selectedElementId = parseInt(evt.target.element.id);
        var selectedI = -1;

        for(var i = 0; i < this.intervals.length; i++) {
            if(i !== selectedElementId && i !== (selectedElementId + 1)) {
                this.flag = this.is_inside(this.curentMousePosition, this.intervals[i].y1, this.intervals[i].y2, selectedElementId);
            }

            if (this.flag) {
                selectedI = i;
            }
        }

        if(selectedI >= 0) {
            this.reorderFlag = true;
            this.drawLine( this.intervals[selectedI].y2, evt)
        } else {
            this.reorderFlag = false;
            this.drawLine()
        }
    },

    dropShape: function(evt) {
        this.drawLine()

        var selectedElement = evt.target.element;
        this.curentMousePosition = evt.data.clientY;

        if(this.reorderFlag) {
            for(var i = 0; i < this.listOfShapes.length; i++) {
                if(parseInt(this.listOfShapes[i].element.id) === this.sendDataForDrop.elToBeChanged) {
                    var splicedShape = this.listOfShapes.splice(parseInt(this.listOfShapes[i].element.id), 1);
                }
            }

            for(var j = 0; j < this.intervals.length; j++) {
                if(this.sendDataForDrop.y2 === this.intervals[j].y2) {
                    this.listOfShapes.splice(this.intervals[j].index - 1, 0, splicedShape[0]);
                    this.reorder(this.listOfShapes, evt);
                }
            }

            this.reorderFlag = false

        } else {
            selectedElement.id = selectedElement.id;
            evt.target.setShapeYpos(evt.target.elementBoundingRect.y)
            evt.target.initResize(evt.target.element)
        }
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

    drawLine: function(yPos, evt) {
        if(yPos) {
            this.line.setAttribute("x1", 0);
            this.line.setAttribute("x2", 9999);
            this.line.setAttribute("y1", yPos - (evt.target._distance / 2));
            this.line.setAttribute("y2", yPos - (evt.target._distance / 2));
        } else {
            this.line.setAttribute("x1", 9999);
            this.line.setAttribute("x2", 9999);
            this.line.setAttribute("y1", 9999);
            this.line.setAttribute("y2", 9999);
        }
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