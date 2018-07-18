import { CustomEvents } from "./custom_events.js";

export function Connector(width, height) {
    this._connectorWidth = width;
    this._connectorHeight = height;
}

Connector.prototype = Object.create(CustomEvents.prototype);

Object.assign(Connector.prototype, {
    constructor: Connector,

    leftConnector: function(parent, x, y, height) {
        var xPos = x - (this._connectorWidth / 2);
        var yPos = y + (height / 2) - (this._connectorHeight / 2);

        var result = {
            id: "left",
            width: this._connectorWidth,
            height: this._connectorHeight,
            x: xPos,
            y: yPos,
            fill: "black"
        };

        this.mouseDownHandler = this.getElementOnMouseDown.bind(this);

        this.leftConnectorEl = this.createRectNode(parent, result);
        this.leftConnectorEl.addEventListener("mousedown", this.mouseDownHandler);

        return this.leftConnectorEl;
    },

    topConnector: function (parent, x, y, width) {
        var xPos = x + (width / 2) - (this._connectorWidth / 2);
        var yPos = y - (this._connectorHeight / 2);

        var result = {
            id: "top",
            width: this._connectorWidth,
            height: this._connectorHeight,
            x: xPos,
            y: yPos,
            fill: "black"
        };

        this.mouseDownHandler = this.getElementOnMouseDown.bind(this);

        this.topConnectorEl = this.createRectNode(parent, result);
        this.topConnectorEl.addEventListener("mousedown", this.mouseDownHandler);

        return this.topConnectorEl;
    },

    rightConnector: function (parent, x, y, width, height) {
        var xPos = x + width - (this._connectorWidth / 2);
        var yPos = y + (height / 2) - (this._connectorHeight / 2);

        var result = {
            id: "right",
            width: this._connectorWidth,
            height: this._connectorHeight,
            x: xPos,
            y: yPos,
            fill: "black"
        };

        this.mouseDownHandler = this.getElementOnMouseDown.bind(this);
        this.mouseMoveHandler = this.getDataOnMouseMove.bind(this);
        this.mouseUpHandler = this.mouseUp.bind(this);

        this.rightConnectorEl = this.createRectNode(parent, result);
        this.rightConnectorEl.addEventListener("mousedown", this.mouseDownHandler);
        document.addEventListener("mouseup", this.mouseUpHandler);

        return this.rightConnectorEl;
    },

    bottomConnector: function (parent, x, y, width, height) {
        var xPos = x + (width / 2) - (this._connectorWidth / 2);
        var yPos = y + height - (this._connectorHeight / 2);

        var result = {
            id: "bottom",
            width: this._connectorWidth,
            height: this._connectorHeight,
            x: xPos,
            y: yPos,
            fill: "black"
        };

        this.mouseDownHandler = this.getElementOnMouseDown.bind(this);

        this.bottomConnectorEl = this.createRectNode(parent, result);
        this.bottomConnectorEl.addEventListener("mousedown", this.mouseDownHandler);

        return this.bottomConnectorEl;
    },

    getElementOnMouseDown: function(evt) {
        evt.preventDefault();
        this.selected = evt.target;
        this.selected.style.position = "absolute";

        document.addEventListener("mousemove", this.mouseMoveHandler);

        this.fire({type: "mousePresed", data: this.selected});
    },

    getDataOnMouseMove: function(data) {
        switch (this.selected.id) {
            case "right":
                this.resizeRight(data.clientX);
                break;
            case "left":
                this.resizeLeft(data.clientX);
                break;
            case "top":
                this.resizeTop(data.clientX);
                break;
            case "bottom":
                this.resizeBottom(data.clientX);
                break;
        }
    },

    resizeRight: function(data) {
        this.rightConnectorEl.setAttribute("x", data - this._connectorWidth);
        this.fire({type:"mouseMove", data: this.rightConnectorEl});
    },

    resizeLeft: function(data) {
        this.leftConnectorEl.setAttribute("x", (data - this._connectorWidth));
        this.fire({type:"mouseMove", data: this.leftConnectorEl});
    },

    mouseUp: function() {
        document.removeEventListener("mousemove", this.mouseMoveHandler);
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