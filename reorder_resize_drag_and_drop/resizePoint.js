import { CustomEvents } from "./custom_events.js";
import { DragAndDrop } from "./dragAndDrop.js";

export function Point(parent, width, height, xPos, yPos, l) {
    this._parent = parent;
    this._width = width;
    this._height = height;
    this._xPos = xPos;
    this._yPos = yPos;
    this._dimension = l
}

Point.prototype = Object.create(CustomEvents.prototype);

Object.assign(Point.prototype, DragAndDrop.prototype, {
    constructor: Point,

    initResizePoint: function(dragOrientation) {
        this.element = this.createRectNode(this._parent, this.result);

        this.initDrag();

        this.startDrag = function(evt) {
            // evt.target.style.position = "absolute";
            // var elementBoundingRect = evt.target.getBBox();

            // this.shiftX = evt.clientX - elementBoundingRect.x;
            // this.shiftY = evt.clientY - elementBoundingRect.y;

            this.fire({type: "startDrag", el: this.element});

        };

        this.mouseMove = function(evt) {
            // this.yPos = evt.pageY - this.shiftY;
            // this.xPos = evt.pageX - this.shiftX;

            // switch (dragOrientation) {
            //     case "vertical":
            //         this.element.setAttribute("y", this.yPos);
            //         break;
            //     case "horizontal":
            //         this.element.setAttribute("x", this.xPos);
            //         break;
            //     default:
            //         this.element.setAttribute("y", this.yPos);
            //         this.element.setAttribute("x", this.xPos);
            //         break;
            // }

            this.fire({type: "pointerMove", data: { el: this.element, mouseEvent: evt}} );
        };

        this.stopDrag = function(evt) {};

        return this.element;
    },

    setResizablePosition: function(x, y) {
        this.element.setAttribute("x", x);
        this.element.setAttribute("y", y);
    },

    configResizePoint: function(config) {
        for (var key in config) {
            this.element.setAttributeNS(
                null,
                key.replace(/[A-Z]/g,
                    function (item) {
                        return "-" + item.toLowerCase();
                    }), config[key]
            );
        }
    },

    createRectNode: function (append, attrs) {
        append = document.getElementById(append);
        var rect = this.createNode("rect", attrs);

        return append.appendChild(rect);
    },

    createNode: function (el, attr) {
        el = document.createElementNS("http://www.w3.org/2000/svg", el);

        for (var key in attr) {
            el.setAttributeNS(
                null,
                key.replace(/[A-Z]/g,
                    function (item) {
                        return "-" + item.toLowerCase();
                    }), attr[key]
            );
        }

        return el;
    }
});