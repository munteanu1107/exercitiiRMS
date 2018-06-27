import {CustomEvents} from "./customEvents.js";

export function PaintBoard(width, height) {
    this._width = width;
    this._height = height;

    Object.defineProperties(this, {
        "width": {
            get: function() {
                return this._width;
             },
             set: function(newWidth) {
                 this._width = newWidth;
             }
         },
         "height": {
             get: function() {
                 return this._height;
             },
             set: function(newHeight) {
                 return this._height = newHeight;
             }
         }
     });
}

PaintBoard.prototype = Object.create(CustomEvents.prototype);
Object.assign(PaintBoard.prototype, {
    constructor: PaintBoard,

    drawMatrix: function() {

    }
});