import { Connector } from "./connectors.js";
import { CustomEvents } from "./custom_events.js";

export function Resize() {};

Resize.prototype = Object.create(CustomEvents.prototype);

Object.assign(Resize.prototype, {
    constructor: Resize,

    resize: function(evt) {
        this.shape = evt.target;
        this.createResizableRect(this.shape);
    },

    createResizableRect: function(data) {
        var mainRow = data.rowRect.getBBox();

        this.connector = new Connector(10,10);

        this.removeResizableRect(data.rowRect)

        this.resizableGroup = data.createGroupNode(data.row.id, {
            id: "resizeGroup"
        });

        this.resizableRow = data.createRectNode(this.resizableGroup.id, {
            id: "resize",
            width: mainRow.width,
            height: mainRow.height,
            x: mainRow.x,
            y: mainRow.y,
            fill: "none",
            stroke: "black"
        });

        this.getMouseDownHandler = this.getElementOnMouseDown.bind(this);
        this.mouseMoveHandler = this.mouseMove.bind(this);

        this.connector.addListener("mousePresed", this.getMouseDownHandler);
        this.connector.addListener("mouseMove", this.mouseMoveHandler);

        this.leftConnector = this.connector.leftConnector(this.resizableGroup.id, mainRow.x, mainRow.y, mainRow.height);

        this.topConnector = this.connector.topConnector(this.resizableGroup.id, mainRow.x, mainRow.y, mainRow.width);

        this.rightConnector = this.connector.rightConnector(this.resizableGroup.id, mainRow.x, mainRow.y, mainRow.width, mainRow.height);

        this.bottomConnector = this.connector.bottomConnector(this.resizableGroup.id, mainRow.x, mainRow.y, mainRow.width, mainRow.height);
    },

    getElementOnMouseDown: function(evt) {
        var element = evt.data;
    },

    mouseMove: function(evt) {
        var elementPos = evt.data.getBBox();

        switch (evt.data.id) {
            case "right":
                this.resizeRight(elementPos);
                break;
            case "left":
                this.resizeLeft(elementPos);
                break;
            case "top":
                this.resizeTop(evt);
                break;
            case "bottom":
                this.resizeBottom(evt);
                break;
        }
    },

    resizeRight: function(elBoundingBox) {
        // var xPos = elBoundingBox.x - (this.shape._xPos - elBoundingBox.width / 2);
        var xPos = this.shape._width - (this.shape._width - elBoundingBox.x) - (this.shape._xPos - elBoundingBox.width / 2);

        this.resizableRow.setAttribute("width", xPos);
        this.shape.rowRect.setAttribute("width", xPos);
    },

    resizeLeft: function(el) {
        var xPos = this.shape._xPos + (el.x - (this.shape._xPos - el.width / 2));
        var width = (this.shape._width - el.x) + (this.shape._xPos - el.width / 2)

        this.resizableRow.setAttribute("width", width);
        this.resizableRow.setAttribute("x", xPos);

        this.shape.rowRect.setAttribute("width", width);
        this.shape.rowRect.setAttribute("x", xPos);
    },

    removeResizableRect: function(el) {
        var childs = el.childNodes;
        var domEl = document.getElementById("resizeGroup");

        childs.forEach(element => {
           if (element.id === "resizeGroup") {
               element.remove();
           }
        });

        if(domEl) {
            domEl.remove()
        }
    },
});