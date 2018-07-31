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
            // shape.addListener("startReorder", this.startReorder.bind(this));
            shape.addListener("checkMousePos", this.checkMousePosAndDrawLine.bind(this));
            shape.addListener("dropShape", this.dropShape.bind(this));
            this.listOfShapes.push(shape)
        }
    },

    positionElements: function(array, evt) {
        var nY = 80;

        for(var i = 0; i < array.length; i++) {
            array[i].setShapeYpos(nY);
            nY += array[i].getHeight() + array[i].getDistance();
            this.mainGroup.appendChild(array[i].row);
        };

        this.determineVirualBands(evt);
        evt.target.initResize(evt.target.element);
    },

    determineVirualBands: function(evt) {
        this.intervals = [];
        var coords;

        var firstVirtualRect = {
            y1: this.listOfShapes[0].element.getBBox().y - this.listOfShapes[0].element.getBBox().height,
            y2: this.listOfShapes[0].element.getBBox().y,
            index: 0
        };

        this.intervals.push(firstVirtualRect);

        for(var i = 0; i < this.listOfShapes.length; i++) {
            var currentEl = this.listOfShapes[i].element.getBBox();

            var interval1 = currentEl.y + currentEl.height;
            var interval2 = interval1 + evt.target.getDistance();

            coords = {};
            coords.y1 = interval1;
            coords.y2 = interval2;
            coords.index = i;

            this.intervals.push(coords);
        }
    },

    checkMousePosAndDrawLine: function(evt) {
        this.determineVirualBands(evt);

        var curentMousePosition = evt.data.clientY;
        var selectedElementId = parseInt(evt.target.element.id);
        var selectedI = -1;

        for(var i = 0; i < this.intervals.length; i++) {

            this.flag = this.is_inside(curentMousePosition, this.intervals[i].y1, this.intervals[i].y2, selectedElementId);

            if (this.flag) {
                selectedI = i;
            }
        }

        if(selectedI >= 0) {
            this.reorderFlag = true;
            this.drawLine( this.intervals[selectedI].y2, evt);
        } else {
            this.reorderFlag = false;
            this.drawLine();
        }
    },

    dropShape: function(evt) {
        this.drawLine();

        if(this.reorderFlag) {
            for(var i = 0; i < this.listOfShapes.length; i++) {
                if(parseInt(this.listOfShapes[i].element.id) === this.sendDataForDrop.elToBeChanged) {
                    var splicedShape = this.listOfShapes.splice(i, 1);
                }
            }

            for(var j = 0; j < this.intervals.length; j++) {
                if(this.sendDataForDrop.y2 === this.intervals[j].y2) {
                    this.listOfShapes.splice(this.intervals[j].index, 0, splicedShape[0]);
                }
            }

            this.positionElements(this.listOfShapes, evt);
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
        this.positionElements(this.listOfShapes, evt);
    }
});

// function reorder(el, pos) {
//     var arr = [1,2,3,6,4,8,9,7,5,0];
//     var keepEl;

//     if(arr.indexOf(el) !== 0) {
//         var index = arr.indexOf(el);
//         keepEl = arr.splice(index,1);
//         console.log(arr.indexOf(el))
//     }

//     arr.splice(pos, 0, keepEl[0]);
//     console.log(arr)
// }

// reorder(3,9)