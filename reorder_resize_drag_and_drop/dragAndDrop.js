import { CustomEvents } from "./custom_events.js";

export function DragAndDrop() {

}

DragAndDrop.prototype = Object.create(CustomEvents.prototype);

Object.assign(DragAndDrop.prototype, {
    constructor: DragAndDrop,

    initDrag: function(elem) {
        //this.element = elem;
        this.mouseDownHandler = this.mouseDown.bind(this);
        this.mouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);

        this.element.addEventListener("mousedown", this.mouseDownHandler);
    },

    mouseDown: function(e) {
        this.startDrag(e);

        document.addEventListener("mousemove", this.mouseMoveHandler);
        document.addEventListener("mouseup", this.onMouseUpHandler);
    },

    onMouseMove: function(e) {
        this.mouseMove(e);
    },

    onMouseUp: function(e) {
        this.mouseUp(e)
    },

    startDrag: function() {
        throw("this function must be overwritten");
    },


    mouseMove: function() {
        throw("this function must be overwritten");
    },

    mouseUp: function() {
        document.removeEventListener("mousemove", this.mouseMoveHandler)
    },

    // startDrag: function() {
    //     this.mouseDownHandler = this.getElementOnMouseDown.bind(this);
    //     this.mouseMoveHandler = this.onMouseMove.bind(this);
    //     this.mouseUpHandler = this.onMouseUp.bind(this);

    //     this.dragableElement.addEventListener("mousedown", this.mouseDownHandler);
    //     document.addEventListener("mouseup", this.mouseUpHandler);
    // },

    // getElementOnMouseDown: function(evt) {
    //     evt.preventDefault();

    //     var elementBoundingRect = this.dragableElement.getBBox();

    //     this.shiftX = evt.clientX - elementBoundingRect.x;
    //     this.shiftY = evt.clientY - elementBoundingRect.y;

    //     evt.target.style.position = "absolute";

    //     this.moveAt(evt.pageX, evt.pageY, this.dragableElement);

    //     document.addEventListener("mousemove", this.mouseMoveHandler);
    // },

    // moveAt: function(x, y, el) {
    //     var xPos = x - this.shiftX;
    //     var yPos = y - this.shiftY;
    //     var elementPos = this.dragableElement.getBBox();

    //     switch (this.direction) {
    //         case "vertical":
    //             el.setAttribute("y", yPos);
    //             // this.setYpos(yPos);
    //             this.fire({type: "verticalPos", data: elementPos});
    //             break;
    //         case "horizontal":
    //             el.setAttribute("x", xPos);
    //             // this.setXpos(xPos)
    //             this.fire({type: "horizontalPos", data: elementPos});
    //             break;
    //         default:
    //             // this.setXpos(xPos);
    //             // this.setYpos(yPos)
    //             el.setAttribute("x", xPos);
    //             el.setAttribute("y", yPos);
    //             this.fire({type: "bothPos", data: elementPos});
    //             break;
    //     }
    // },

    // onMouseMove: function(evt) {
    //     this.moveAt(evt.pageX, evt.pageY, this.dragableElement);
    //     this.fire({ type: "mouseIsDown", data: this.dragableElement});
    // },

    // onMouseUp: function() {
    //     document.removeEventListener("mousemove", this.mouseMoveHandler);
    // }
});