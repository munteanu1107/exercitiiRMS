import { CustomEvents } from "./custom_events.js";

export function DragAndDrop() {

}

DragAndDrop.prototype = Object.create(CustomEvents.prototype);

Object.assign(DragAndDrop.prototype, {
    constructor: DragAndDrop,

    initDrag: function(elem) {
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
        document.removeEventListener("mouseup", this.onMouseUpHandler);
        document.removeEventListener("mousemove", this.mouseMoveHandler);
        this.stopDrag(e);
    },

    startDrag: function() {
        throw("this function must be overwritten");
    },

    mouseMove: function() {
        throw("this function must be overwritten");
    },

    stopDrag: function() {
        throw("this function must be overwritten");
    }
});