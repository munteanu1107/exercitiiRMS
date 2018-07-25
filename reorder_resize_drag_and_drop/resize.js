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

        this.pointerMoveHandler = this.onClickPointer.bind(this);

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

        this.leftPoint.addListener("startDrag", this.resizePointStarDrag.bind(this));
        this.rightPoint.addListener("startDrag", this.resizePointStarDrag.bind(this));
        this.bottomPoint.addListener("startDrag", this.resizePointStarDrag.bind(this));
        this.topPoint.addListener("startDrag", this.resizePointStarDrag.bind(this));

        this.leftPoint.addListener("pointerMove", this.pointerMoveHandler);
        this.topPoint.addListener("pointerMove", this.pointerMoveHandler);
        this.rightPoint.addListener("pointerMove", this.pointerMoveHandler);
        this.bottomPoint.addListener("pointerMove", this.pointerMoveHandler);

        this.leftPoint.initResizePoint("horizontal");
        this.topPoint.initResizePoint("vertical");
        this.rightPoint.initResizePoint("horizontal");
        this.bottomPoint.initResizePoint("vertical");

        this.leftPoint.configResizePoint({
            id: "leftPoint",
            width: 10,
            height: 10,
            style: "cursor: e-resize"
        });

        this.topPoint.configResizePoint({
            id: "topPoint",
            width: 10,
            height: 10,
            style: "cursor: n-resize"
        });

        this.rightPoint.configResizePoint({
            id: "rightPoint",
            width: 10,
            height: 10,
            style: "cursor: e-resize"
        });

        this.bottomPoint.configResizePoint({
            id: "bottomPoint",
            width: 10,
            height: 10,
            style: "cursor: n-resize"
        });

        this.updateResisablePoints(this.resizableElement);
    },

    resizePointStarDrag: function(data) {
        this.currentPoint = data.el;
        this.currentPointBBox = data.el.getBBox();
        this.shapeBBox = this.element.getBBox();
    },

    updateResisablePoints: function(element) {
        var mainRow = element.getBBox();

        var leftXpos = mainRow.x - (this.leftPoint._dimension / 2);
        var leftYpos = mainRow.y + (mainRow.height / 2) - (this.leftPoint._dimension / 2);

        var rightXpos = mainRow.x + mainRow.width - (this.rightPoint._dimension / 2);
        var rightYpos = mainRow.y + (mainRow.height / 2) - (this.rightPoint._dimension / 2);

        var topXpos = mainRow.x + (mainRow.width / 2) - (this.topPoint._dimension / 2);
        var topYpos = mainRow.y - (this.topPoint._dimension / 2);

        var bottomXpos = mainRow.x + (mainRow.width / 2) - (this.bottomPoint._dimension / 2);
        var bottomYpos = mainRow.y + mainRow.height - (this.bottomPoint._dimension / 2);

        this.rightPoint.setResizablePosition(rightXpos, rightYpos);
        this.leftPoint.setResizablePosition(leftXpos, leftYpos);
        this.topPoint.setResizablePosition(topXpos, topYpos);
        this.bottomPoint.setResizablePosition(bottomXpos, bottomYpos);
    },

    onClickPointer: function(data) {
        switch (data.data.el.id) {
            case "rightPoint":
                this.resizeRight(data);
                break;
            case "leftPoint":
                this.resizeLeft(data);
                break;
            case "topPoint":
                this.resizeTop(data);
                break;
            case "bottomPoint":
                this.resizeBottom(data);
                break;
        }
    },

    setResizableWidth: function(val) {
        this.resizableRow.setAttribute("width", val);
    },

    setResizableHeight: function(val) {
        this.resizableRow.setAttribute("height", val);
    },

    getResizableHeight: function() {
        return parseInt(this.resizableRow.getAttribute("height"));
    },

    setResizableXpos: function(val) {
        this.resizableRow.setAttribute("x", val);
    },

    setResizableYpos: function(val) {
        this.resizableRow.setAttribute("y", val);
    },

    resizeRight: function(data) {
        var initX = this.currentPointBBox.x + (this.currentPointBBox.width / 2);
        var initWidth = this.shapeBBox.width;
        var currentX = data.data.mouseEvent.clientX;
        var deltaX = currentX - initX;
        var newWidth = initWidth + deltaX - (this.currentPointBBox.width / 2);
        var limit = this.leftPoint.element.getBBox().x + (this.currentPointBBox.width * 2)

        if(currentX > limit) {
            this.setResizableWidth(newWidth);
            this.setShapeWidth(newWidth);
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeLeft: function(data) {
        var initX = this.currentPointBBox.x + (this.currentPointBBox.width / 2);
        var initWidth = this.shapeBBox.width;
        var currentX = data.data.mouseEvent.clientX;
        var deltaX = currentX - initX;
        var newWidth = initWidth - deltaX;
        var newX = initX + deltaX;
        var limit = this.rightPoint.element.getBBox().x

        if(currentX < limit) {
            this.setResizableWidth(newWidth);
            this.setShapeWidth(newWidth);
            this.setShapeXpos(newX);
            this.setResizableXpos(newX);
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeBottom: function(data) {
        var initY = this.currentPointBBox.y + (this.currentPointBBox.width / 2);
        var initHeight = this.shapeBBox.height;
        var currentY = data.data.mouseEvent.clientY;
        var deltaY = currentY - initY;
        var newHeight = initHeight + deltaY;
        var limit = this.topPoint.element.getBBox().y + this.currentPointBBox.width;

        if(currentY > limit) {
            this.setResizableHeight(newHeight);
            this.setShapeHeight(newHeight)
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeTop: function(data) {
        var initY = this.currentPointBBox.y + (this.currentPointBBox.width / 2);
        var initHeight = this.shapeBBox.height;
        var currentY = data.data.mouseEvent.clientY;
        var deltaY = currentY - initY;
        var newHeight = initHeight - deltaY;
        var newY = initY + deltaY;
        var limit = this.bottomPoint.element.getBBox().y

        if(currentY < limit) {
            this.setResizableHeight(newHeight);
            this.setShapeHeight(newHeight);
            this.setShapeYpos(newY);
            this.setResizableYpos(newY);
            this.updateResisablePoints(this.resizableRow);
        }
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