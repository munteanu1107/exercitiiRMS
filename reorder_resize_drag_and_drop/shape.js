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

        var parentDetails = document.getElementById(this._parent).getBoundingClientRect();

        this.row = this.createGroupNode("mainGroup", { id: "row" + this._index });

        this.line = this.createLineNode("mainGroup", {
            x1: 0,
            y1: this._yPos,
            x2: parentDetails.width,
            y2: this._yPos,
            stroke: "red"
        });

        this.rowRect = this.createRectNode("row" + this._index, {
            id: this._index,
            width: this._width,
            height: this._height,
            x: this._xPos,
            y: this._yPos,
            fill: "#23abba"
        });

        this.clickHandler = this.onClickElement.bind(this);
        this.rowRect.addEventListener("click", this.clickHandler);

    },

    onClickElement: function (event) {
        this.fire({ type: "mousePresed", data: event.target});
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

    setDistance: function(val) {
        this._distance = val;
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
    }
});