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

        this.leftPoint.addListener("onMouseUp", this.pointerMouseUpHandler);
        this.topPoint.addListener("onMouseUp", this.pointerMouseUpHandler);
        this.rightPoint.addListener("onMouseUp", this.pointerMouseUpHandler);
        this.bottomPoint.addListener("onMouseUp", this.pointerMouseUpHandler);

        this.pointerClickHandler = this.onClickPointer.bind(this);
        this.pointerMouseUpHandler = this.onMouseUpPointer.bind(this);

        this.leftPoint.initResizePoint("horizontal");
        this.topPoint.initResizePoint("vertical");
        this.rightPoint.initResizePoint("horizontal");
        this.bottomPoint.initResizePoint("vertical");

        this.leftPoint.configResizePoint({
            id: "leftPoint",
            width: 10,
            height: 10
        })

        this.topPoint.configResizePoint({
            id: "topPoint",
            width: 10,
            height: 10
        })

        this.rightPoint.configResizePoint({
            id: "rightPoint",
            width: 10,
            height: 10
        })

        this.bottomPoint.configResizePoint({
            id: "bottomPoint",
            width: 10,
            height: 10
        })

        this.updateResisablePoints(this.resizableElement);
    },

    updateResisablePoints: function(element) {
        var mainRow = element.getBBox();

        var leftXpos = mainRow.x - (10 / 2);
        var leftYpos = mainRow.y + (mainRow.height / 2) - (10 / 2);

        var rightXpos = mainRow.x + mainRow.width - (10 / 2);
        var rightYpos = mainRow.y + (mainRow.height / 2) - (10 / 2);

        var topXpos = mainRow.x + (mainRow.width / 2) - (10 / 2);
        var topYpos = mainRow.y - (10 / 2);

        var bottomXpos = mainRow.x + (mainRow.width / 2) - (10 / 2);
        var bottomYpos = mainRow.y + mainRow.height - (10 / 2);

        this.rightPoint.setResizablePosition(rightXpos, rightYpos);
        this.leftPoint.setResizablePosition(leftXpos, leftYpos);
        this.topPoint.setResizablePosition(topXpos, topYpos);
        this.bottomPoint.setResizablePosition(bottomXpos, bottomYpos);
    },

    onClickPointer: function(evt) {
        var elementData = evt.data.getBBox();
        switch (evt.data.id) {
            case "rightPoint":
                this.resizeRight(elementData);
                break;
            case "leftPoint":
                this.resizeLeft(elementData);
                break;
            case "topPoint":
                this.resizeTop(elementData);
                break;
            case "bottomPoint":
                this.resizeBottom(elementData);
                break;
        }
    },

    onMouseUpPointer: function(evt) {
        console.log(evt.data.getBBox())
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

    setResizableXpos: function(val) {
        this.resizableRow.setAttribute("x", val);
    },

    resizeRight: function(elBoundingBox) {
        var width = this.getWidth() + (elBoundingBox.x - this.getWidth()) - (this.getXpos() - elBoundingBox.width / 2);
        var xPos = this.getXpos();

        this.setResizableWidth(width);
        this.setShapeWidth(width);
        this.setResizableXpos(xPos);
        this.setShapeXpos(xPos);
        this.updateWidthConstant(width);
        this.updateResisablePoints(this.resizableRow);
    },

    resizeLeft: function(elBoundingBox) {
        var xPos = elBoundingBox.x + (elBoundingBox.width / 2)
        var width = (this._constWidth - elBoundingBox.x + this._constXPos) - (elBoundingBox.width / 2)

        this.setResizableWidth(width);
        this.setShapeWidth(width);
        this.setShapeXpos(xPos);
        this.setResizableXpos(xPos);
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
            domEl.remove()
        }
    },
});