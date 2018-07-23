import { Point } from "./resizePoint.js";
import { CustomEvents } from "./custom_events.js";

export function Resize() {};

Resize.prototype = Object.create(CustomEvents.prototype);

Object.assign(Resize.prototype, {
    constructor: Resize,

    initResize: function(element) {
        this.resizableElement = element;
        var mainRow = this.resizableElement.getBBox();

        this.removeResizableRect(element);

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

        this.pointersGroup = this.createGroupNode(this.resizableGroup.id, {
            id: "pointersGroup"
        });

        this.leftPoint = new Point(this.pointersGroup.id, mainRow.width, mainRow.height, mainRow.x, mainRow.y, 10);
        this.topPoint = new Point(this.pointersGroup.id, mainRow.width, mainRow.height, mainRow.x, mainRow.y, 10);
        this.rightPoint = new Point(this.pointersGroup.id, mainRow.width, mainRow.height, mainRow.x, mainRow.y, 10);
        this.bottomPoint = new Point(this.pointersGroup.id, mainRow.width, mainRow.height, mainRow.x, mainRow.y, 10);

        this.leftPoint.addListener("pointerClicked", this.pointerClickHandler);
        this.topPoint.addListener("pointerClicked", this.pointerClickHandler);
        this.rightPoint.addListener("pointerClicked", this.pointerClickHandler);
        this.bottomPoint.addListener("pointerClicked", this.pointerClickHandler);

        this.pointerClickHandler = this.onClickPointer.bind(this);

        this.updateResisablePoints(this.resizableElement);
    },

    updateResisablePoints: function(element) {
        var mainRow = this.element.getBBox();
        this.pointersGroup.innerHTML = "";

        this.leftPoint.setResizablePointData = function() {

            var xPosition = mainRow.x - (this._dimension / 2);
            var yPosition = mainRow.y + (mainRow.height / 2) - (this._dimension / 2);

            return {
                id: "left",
                width: this._dimension,
                height: this._dimension,
                x: xPosition,
                y: yPosition,
                fill: "black"
            };
        };

        this.topPoint.setResizablePointData = function() {
            var xPosition = mainRow.x + (mainRow.width / 2) - (this._dimension / 2);
            var yPosition = mainRow.y - (this._dimension / 2);

            return {
                id: "top",
                width: this._dimension,
                height: this._dimension,
                x: xPosition,
                y: yPosition,
                fill: "black"
            };
        };

        this.rightPoint.setResizablePointData = function() {
            var xPosition =  mainRow.x + mainRow.width - (this._dimension / 2);
            var yPosition = mainRow.y + (mainRow.height / 2) - (this._dimension / 2);

            return {
                id: "right",
                width: this._dimension,
                height: this._dimension,
                x: xPosition,
                y: yPosition,
                fill: "black"
            };
        };

        this.bottomPoint.setResizablePointData = function() {
            var xPosition = mainRow.x + (mainRow.width / 2) - (this._dimension / 2);
            var yPosition = mainRow.y + mainRow.height - (this._dimension / 2);

            return {
                id: "bottom",
                width: this._dimension,
                height: this._dimension,
                x: xPosition,
                y: yPosition,
                fill: "black"
            };
        };

        this.leftPoint.initResizePoint("horizontal");
        this.topPoint.initResizePoint("vertical");
        this.rightPoint.initResizePoint("horizontal");
        this.bottomPoint.initResizePoint("vertical");
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

        this.setResizableWidth(xPos);
        this.setShapeWidth(xPos);
        this.setWidth(xPos);
        this.updateResisablePoints(this.resizableRow)
    },

    resizeLeft: function(el) {

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