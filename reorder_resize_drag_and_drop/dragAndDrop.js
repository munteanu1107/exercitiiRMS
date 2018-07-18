import { CustomEvents } from "./custom_events.js";

export function DragAndDrop(element) {
    this._element = element
}

DragAndDrop.prototype = Object.create(CustomEvents.prototype);

Object.assign(DragAndDrop.prototype, {
    constructor: DragAndDrop,

    startDrag: function() {
        this.mouseDownHandler = this.getElementOnMouseDown.bind(this);

        this._element.addEventListener("mousedown", this.mouseDownHandler);
    },

    getElementOnMouseDown: function() {

    }
});