import { CustomEvents } from "./custom_events.js";

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

Object.assign(Shape.prototype, {
    constructor: Shape,

    render: function() {
        var parentDetails = document.getElementById(this._parent).getBoundingClientRect();

        this.mainGroup = this.createGroupNode(this._parent, { id: "mainGroup" });

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

        this.text = this.createTextNode("row" + this._index, {
            x: this._xPos + this._height,
            y: this._yPos + (this._height / 2),
            fill: "black"
        });

        this.text.innerHTML = "Shape " + (this._index + 1);

        this.clickHandler = this.onClickElement.bind(this);
        this.rowRect.addEventListener("click", this.clickHandler);

    },

    onClickElement: function () {
        this.fire({ type: "clicked" });
    },

    createGroupNode: function(append, attrs) {
        append = document.getElementById(append);
        var mainGroup = this.createNode("g", attrs);

        return append.appendChild(mainGroup);
    },

    createTextNode: function(append, attrs) {
        append = document.getElementById(append);
        var textNode = this.createNode("text", attrs);

        return append.appendChild(textNode);
    },

    createRectNode: function(append, attrs) {
        append = document.getElementById(append);
        var rect = this.createNode("rect", attrs);

        return append.appendChild(rect);
    },

    createLineNode: function(append, attrs) {
        append = document.getElementById(append);
        var line = this.createNode("line", attrs);

        return append.appendChild(line);
    },

    createNode: function(el, attr) {
        el = document.createElementNS("http://www.w3.org/2000/svg", el);

        for (var key in attr) {
            el.setAttributeNS(
                null,
                key.replace(/[A-Z]/g,
                function(item) {
                    return "-" + item.toLowerCase();
                }), attr[key]
            );
        }

        return el;
    }
});