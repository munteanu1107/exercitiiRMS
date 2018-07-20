import { Point } from "./connectors.js";
import { CustomEvents } from "./custom_events.js";

export function Resize() {};

Resize.prototype = Object.create(CustomEvents.prototype);

Object.assign(Resize.prototype, {
    constructor: Resize,

    initResize: function(element) {
        this.resizableElement = element;
        console.log(this.resizableElement)
        var mainRow = this.resizableElement.getBBox();

        this.removeResizableRect(this.resizableElement);

        this.resizableGroup = this.createGroupNode(this.row.id, {
            id: "resizeGroup"
        });


        this.resizableRow = this.createRectNode(this.resizableGroup.id, {
            id: "resize",
            width: mainRow.width,
            height: mainRow.height,
            x: mainRow.x,
            y: mainRow.y,
            fill: "none",
            stroke: "black"
        });

        this.pointerClickHandler = this.onClickPointer.bind(this);

        var leftPoint = new Point(this.resizableGroup.id, mainRow.width, mainRow.height, mainRow.x, mainRow.y, 10);
        var topPoint = new Point(this.resizableGroup.id, mainRow.width, mainRow.height, mainRow.x, mainRow.y, 10);
        var rightPoint = new Point(this.resizableGroup.id, mainRow.width, mainRow.height, mainRow.x, mainRow.y, 10);
        var bottomPoint = new Point(this.resizableGroup.id, mainRow.width, mainRow.height, mainRow.x, mainRow.y, 10);

        leftPoint.addListener("pointerClicked", this.pointerClickHandler);
        topPoint.addListener("pointerClicked", this.pointerClickHandler);
        rightPoint.addListener("pointerClicked", this.pointerClickHandler);
        bottomPoint.addListener("pointerClicked", this.pointerClickHandler);

        leftPoint.setResizablePointData = function() {
            var xPosition = mainRow.x - (leftPoint._dimension / 2);
            var yPosition = mainRow.y + (mainRow.height / 2) - (leftPoint._dimension / 2);

            return {
                id: "left",
                width: leftPoint._dimension,
                height: leftPoint._dimension,
                x: xPosition,
                y: yPosition,
                fill: "black"
            };
        };

        topPoint.setResizablePointData = function() {
            var xPosition = mainRow.x + (mainRow.width / 2) - (topPoint._dimension / 2);
            var yPosition = mainRow.y - (topPoint._dimension / 2);

            return {
                id: "top",
                width: topPoint._dimension,
                height: topPoint._dimension,
                x: xPosition,
                y: yPosition,
                fill: "black"
            };
        };

        rightPoint.setResizablePointData = function() {
            var xPosition =  mainRow.x + mainRow.width - (rightPoint._dimension / 2);
            var yPosition = mainRow.y + (mainRow.height / 2) - (rightPoint._dimension / 2);

            return {
                id: "right",
                width: rightPoint._dimension,
                height: rightPoint._dimension,
                x: xPosition,
                y: yPosition,
                fill: "black"
            };
        };

        bottomPoint.setResizablePointData = function() {
            var xPosition = mainRow.x + (mainRow.width / 2) - (bottomPoint._dimension / 2);
            var yPosition = mainRow.y + mainRow.height - (bottomPoint._dimension / 2);

            return {
                id: "bottom",
                width: bottomPoint._dimension,
                height: bottomPoint._dimension,
                x: xPosition,
                y: yPosition,
                fill: "black"
            };
        };

        leftPoint.initResizePoint("horizontal");
        topPoint.initResizePoint("vertical");
        rightPoint.initResizePoint("horizontal");
        bottomPoint.initResizePoint("vertical");
    },

    onClickPointer: function(evt) {
        var elementData = evt.data.getBBox();

        switch (evt.data.id) {
            case "right":
                this.resizeRight(elementData);
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

    setResizableWidth: function(val) {
        this.resizableRow.setAttribute("width", val);
    },

    getResizableWidth: function() {
        return parseInt(this.resizableRow.getAttribute("width"));
    },

    setResizableHeight: function(val) {
        this.resizableRow.setAttribute("height", val);
    },

    getResizableHeight: function() {
        return parseInt(this.resizableRow.getAttribute("height"));
    },

    resizeRight: function(elBoundingBox) {
        var xPos = this._width - (this._width - elBoundingBox.x) - (this._xPos - elBoundingBox.width / 2);
        console.log(this)
        if(xPos < elBoundingBox.width) {
            return
        }

        this.setResizableWidth(xPos);
        this.setShapeWidth(xPos);
        this.setWidth(xPos);
    },

    // resizeLeft: function(el) {
    //     var xPos = this.shape._xPos + (el.x - (this.shape._xPos - el.width / 2));
    //     var width = (this.shape._width - el.x) + (this.shape._xPos - el.width / 2)

    //     this.resizableRow.setAttribute("width", width);
    //     this.resizableRow.setAttribute("x", xPos);

    //     this.shape.rowRect.setAttribute("width", width);
    //     this.shape.rowRect.setAttribute("x", xPos);
    // },

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