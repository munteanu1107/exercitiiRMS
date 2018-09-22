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

        // Handlers
        this.resizePointStartDragHandler = this.resizePointStartDrag.bind(this);
        this.pointerMoveHandler = this.mouseMovePointer.bind(this);
        this.stopResizeHandler = this.stopResize.bind(this);

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
            stroke: "black",
            style: "visibility: hidden"
        });

        this.pointersGroup = this.createGroupNode(this.resizableGroup.id, {
            id: "pointersGroup"
        });

        var points = [];

        for(var i = 0; i < 8; i++) {
            var point = new Point(this.pointersGroup.id, 10);
            point.addListener("startDrag", this.resizePointStartDragHandler);
            point.addListener("pointerMove", this.pointerMoveHandler);
            point.addListener("stopResize", this.stopResizeHandler);

            points.push(point)
        }

        this.leftPoint = points[0];
        this.topPoint = points[1];
        this.rightPoint = points[2];
        this.bottomPoint = points[3];
        //
        this.topLeftPoint = points[4];
        this.topRightPoint = points[5];
        this.bottomLeftPoint = points[6];
        this.bottomRightPoint = points[7];

        this.leftPoint.initResizePoint();
        this.topPoint.initResizePoint();
        this.rightPoint.initResizePoint();
        this.bottomPoint.initResizePoint();
        //
        this.topLeftPoint.initResizePoint();
        this.topRightPoint.initResizePoint();
        this.bottomLeftPoint.initResizePoint();
        this.bottomRightPoint.initResizePoint();

        this.leftPoint.configResizePoint({
            id: "leftPoint",
            width: 10,
            height: 10,
            style: "cursor: e-resize; visibility: hidden"
        });

        this.topPoint.configResizePoint({
            id: "topPoint",
            width: 10,
            height: 10,
            style: "cursor: n-resize; visibility: hidden"
        });

        this.rightPoint.configResizePoint({
            id: "rightPoint",
            width: 10,
            height: 10,
            style: "cursor: e-resize; visibility: hidden"
        });

        this.bottomPoint.configResizePoint({
            id: "bottomPoint",
            width: 10,
            height: 10,
            style: "cursor: n-resize; visibility: hidden"
        });
        ////////////////

        this.topLeftPoint.configResizePoint({
            id: "topLeftPoint",
            width: 10,
            height: 10,
            style: "cursor: nw-resize; visibility: hidden"
        });

        this.topRightPoint.configResizePoint({
            id: "topRightPoint",
            width: 10,
            height: 10,
            style: "cursor: ne-resize; visibility: hidden"
        });

        this.bottomLeftPoint.configResizePoint({
            id: "bottomLeftPoint",
            width: 10,
            height: 10,
            style: "cursor: ne-resize; visibility: hidden"
        });

        this.bottomRightPoint.configResizePoint({
            id: "bottomRightPoint",
            width: 10,
            height: 10,
            style: "cursor: nw-resize; visibility: hidden"
        });

        this.updateResisablePoints(this.resizableElement);
    },

    resizePointStartDrag: function(data) {
        this.currentPoint = data.el;
        this.currentShape = data.element;
        this.currentPointBBox = data.el.getBBox();
        this.shapeBBox = this.element.getBBox();
    },

    updateResisablePoints: function(element) {
        var mainRow = element.getBBox();

        var leftXpos = mainRow.x - (this.leftPoint._pointerWidth / 2);
        var leftYpos = mainRow.y + (mainRow.height / 2) - (this.leftPoint._pointerWidth / 2);

        var rightXpos = mainRow.x + mainRow.width - (this.rightPoint._pointerWidth / 2);
        var rightYpos = mainRow.y + (mainRow.height / 2) - (this.rightPoint._pointerWidth / 2);

        var topXpos = mainRow.x + (mainRow.width / 2) - (this.topPoint._pointerWidth / 2);
        var topYpos = mainRow.y - (this.topPoint._pointerWidth / 2);

        var bottomXpos = mainRow.x + (mainRow.width / 2) - (this.bottomPoint._pointerWidth / 2);
        var bottomYpos = mainRow.y + mainRow.height - (this.bottomPoint._pointerWidth / 2);

        var leftTopXpos = mainRow.x - (this.rightPoint._pointerWidth / 2);
        var leftTopYpos = mainRow.y - (this.rightPoint._pointerWidth / 2);

        var rightTopXpos = mainRow.x + mainRow.width - (this.rightPoint._pointerWidth / 2);
        var rightTopYpos = mainRow.y - (this.rightPoint._pointerWidth / 2);

        var leftBottomXpos = mainRow.x - (this.rightPoint._pointerWidth / 2);
        var leftBottomYpos = mainRow.y + mainRow.height - (this.topPoint._pointerWidth / 2);

        var rightBottomXpos = mainRow.x + mainRow.width - (this.bottomPoint._pointerWidth / 2);
        var rightBottomYpos = mainRow.y + mainRow.height - (this.bottomPoint._pointerWidth / 2);

        this.bottomPoint.setResizablePosition(bottomXpos, bottomYpos);
        this.topPoint.setResizablePosition(topXpos, topYpos);
        this.leftPoint.setResizablePosition(leftXpos, leftYpos);
        this.rightPoint.setResizablePosition(rightXpos, rightYpos);
        this.topLeftPoint.setResizablePosition(leftTopXpos, leftTopYpos);
        this.topRightPoint.setResizablePosition(rightTopXpos, rightTopYpos);
        this.bottomLeftPoint.setResizablePosition(leftBottomXpos, leftBottomYpos);
        this.bottomRightPoint.setResizablePosition(rightBottomXpos, rightBottomYpos);

        var i = this._resizablePoints.length;

        if(this._resizable) {
            this.resizableRow.style.visibility = "visible";

            while(i >= 0) {
                switch(this._resizablePoints[i]) {
                    case "top":
                        this.topPoint.element.style.visibility = "visible";
                        break;
                    case "left":
                        this.leftPoint.element.style.visibility = "visible";
                        break;
                    case "right":
                        this.rightPoint.element.style.visibility = "visible";
                        break;
                    case "bottom":
                        this.bottomPoint.element.style.visibility = "visible";
                        break;
                    case "topLeft":
                        this.topLeftPoint.element.style.visibility = "visible";
                        break;
                    case "topRight":
                        this.topRightPoint.element.style.visibility = "visible";
                        break;
                    case "bottomLeft":
                        this.bottomLeftPoint.element.style.visibility = "visible";
                        break;
                    case "bottomRight":
                        this.bottomRightPoint.element.style.visibility = "visible";
                        break;
                }
                --i;
            }
        }
    },

    mouseMovePointer: function(data) {
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
            case "topLeftPoint":
                this.resizeTopLeft(data);
                break;
            case "topRightPoint":
                this.resizeTopRight(data);
                break;
            case "bottomLeftPoint":
                this.resizeBottomLeft(data);
                break;
            case "bottomRightPoint":
                this.resizeBottomRight(data);
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
        var limit = this.leftPoint.element.getBBox().x + (this.currentPointBBox.width * 2);

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
        var newWidth = initWidth - deltaX + (this.currentPointBBox.width / 2);
        var newX = initX + deltaX - (this.currentPointBBox.width / 2);
        var limit = this.rightPoint.element.getBBox().x;

        if(currentX < limit) {
            this.setResizableWidth(newWidth);
            this.setShapeWidth(newWidth);
            this.setShapeXpos(newX);
            this.setResizableXpos(newX);
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeBottom: function(data) {
        var initY = this.currentPointBBox.y;
        var initHeight = this.shapeBBox.height;
        var currentY = data.data.mouseEvent.clientY - (this.currentPointBBox.width / 2);
        var deltaY = currentY - initY;
        var newHeight = initHeight + deltaY - (this.currentPointBBox.width / 2);
        var limit = this.topPoint.element.getBBox().y + this.currentPointBBox.width;

        if(currentY > limit) {
            this.setResizableHeight(newHeight);
            this.setShapeHeight(newHeight);
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeTop: function(data) {
        var initY = this.currentPointBBox.y;
        var initHeight = this.shapeBBox.height;
        var currentY = data.data.mouseEvent.clientY - (this.currentPointBBox.width / 2);
        var deltaY = currentY - initY;
        var newHeight = initHeight - deltaY + (this.currentPointBBox.width / 2);
        var newY = initY + deltaY;
        var limit = this.bottomPoint.element.getBBox().y;

        if(currentY < limit) {
            this.setResizableHeight(newHeight);
            this.setShapeHeight(newHeight);
            this.setShapeYpos(newY);
            this.setResizableYpos(newY);
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeTopLeft: function(data) {
        this.resizeTop(data);
        this.resizeLeft(data);

        this.updateResisablePoints(this.resizableRow);
    },

    resizeTopRight: function(data) {
        this.resizeTop(data);
        this.resizeRight(data);

        this.updateResisablePoints(this.resizableRow);
    },

    resizeBottomLeft: function(data) {
        this.resizeBottom(data);
        this.resizeLeft(data);

        this.updateResisablePoints(this.resizableRow);
    },

    resizeBottomRight: function(data) {
        this.resizeBottom(data);
        this.resizeRight(data);

        this.updateResisablePoints(this.resizableRow);
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
            domEl.remove();
        }
    },

    stopResize: function(evt) {
        this.fire({type:"resized", data: evt});
    }
});