import { CustomEvents } from "./custom_events.js";
import { DragAndDrop } from "./dragAndDrop.js";
import { Board } from "./board.js";
import { Resize } from "./resize.js";

export function Shape(parent, width, height, x, y, distance, index) {
    this._parent = parent;
    this._width = width;
    this._height = height;
    this._xPos = x;
    this._yPos = y;
    this._distance = distance;
    this._index = index;
};

Shape.prototype = Object.create(CustomEvents.prototype);

Object.assign(Shape.prototype, Board.prototype, DragAndDrop.prototype, Resize.prototype, {
    constructor: Shape,

    render: function() {

        this.row = this.createGroupNode("mainGroup", { id: "row" + this._index });

        this.element = this.createRectNode("row" + this._index, {
            id: this._index,
            width: this._width,
            height: this._height,
            x: this._xPos,
            y: this._yPos,
            fill: "#23abba"
        });

        // this.text = this.createNode("text", {
        //     x: this._xPos,
        //     y: this._yPos + 20,
        // });

        // this.text.innerHTML = this._index;
        // this.text.style.userSelect = "none"
        // this.row.appendChild(this.text)

        this.element.style.cursor = "all-scroll";

        this.initDrag();

        this.startDrag = function(evt) {
            this.elementBoundingRect = evt.target.getBBox();

            this.initResize(this.element)
            this.shiftX = evt.clientX - this.elementBoundingRect.x;
            this.shiftY = evt.clientY - this.elementBoundingRect.y;

            evt.target.style.position = "absolute";

            this.fire({type: "startReorder", data: evt});
        };

        this.mouseMove = function(evt) {
            var yPos = evt.pageY - this.shiftY;

            this.element.setAttribute("y", yPos);
            this.setYpos(yPos);
            this.initResize(this.element);

            this.fire({type: "checkMousePos", data: evt});
        };

        this.stopDrag = function(evt) {
            this.fire({type: "dropShape", data: evt});
        }

    },

    setWidth: function(val) {
        this._width = val;
    },

    setHeight: function(val) {
        this._height = val;
    },

    setXpos: function(val) {
        this._xPos = val;
    },

    setYpos: function(val) {
        this._yPos = val;
    },

    getWidth: function() {
        return this._width;
    },

    getHeight: function() {
        return this._height;
    },

    getXpos: function() {
        return this._xPos;
    },

    getYpos: function() {
        return this._yPos;
    },

    getDistance: function() {
        return this._distance;
    },

    setDistance: function(val) {
        this._distance = val;
    },

    setShapeXpos: function(val) {
        this.setXpos(val);

        this.element.setAttribute("x", val);
    },

    setShapeYpos: function(val) {
        this.setYpos(val);

        this.element.setAttribute("y", val);
    },

    setShapeWidth: function(val) {
        this.setWidth(val);

        this.element.setAttribute("width", val);
    },

    setShapeHeight: function(val) {
        this.setHeight(val)

        this.element.setAttribute("height", val);
    },

    updateWidthConstant: function() {
        this._constWidth = this._width;
    }
});