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
        console.log(this._width)
        this.result = this.setResizablePointData();

        this.element = this.createRectNode(this._parent, this.result);

        this.initDrag();

        this.startDrag = function(evt) {
            evt.preventDefault();
            var elementBoundingRect = evt.target.getBBox();

            this.shiftX = evt.clientX - elementBoundingRect.x;
            this.shiftY = evt.clientY - elementBoundingRect.y;

            evt.target.style.position = "absolute";
        };

        this.mouseMove = function(evt) {

            var yPos = evt.pageY - this.shiftY;
            var xPos = evt.pageX - this.shiftX;

            switch (dragOrientation) {
                case "vertical":
                    this.element.setAttribute("y", yPos);
                    break;
                case "horizontal":
                    this.element.setAttribute("x", xPos);
                    break;
                default:
                    this.element.setAttribute("y", yPos);
                    this.element.setAttribute("x", xPos);
                    break;
            }

            this.fire({type: "pointerClicked", data: this.element})
        };

        return this.element;
    },

    setResizablePointData: function() {
        throw new Error("This function must be overwritten");
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