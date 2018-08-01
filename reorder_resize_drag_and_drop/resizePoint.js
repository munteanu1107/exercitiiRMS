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

    initResizePoint: function() {
        this.element = this.createRectNode(this._parent, this.result);

        this.initDrag();

        this.startDrag = function(evt) {
            this.fire({type: "startDrag", el: this.element});
        };

        this.mouseMove = function(evt) {
            this.fire({type: "pointerMove", data: { el: this.element, mouseEvent: evt}});
        };

        this.stopDrag = function(evt) {
            this.fire({ type: "stopResize", data: { el: this.element, mouseEvent: evt}});
        };

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
        };
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