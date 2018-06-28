import {CustomEvents} from "./customEvents.js";
import {Button} from "./button.js";

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

    drawMatrix: function(parentId) {
        var cols = 5;
        var lines = cols;
        var matrix = [];


        this.parent = document.getElementById(parentId);

            for (var i = 0; i < cols; i++) {
                matrix[i] = [];
                var button = new Button("de schimbat clasa", false, "btn btn-primary");

                if(j === cols) {
                    var br = document.createElement("br");
                    this.parent.appendChild(br);
                }

                for (var j = 0; j < lines; j++) {
                    button.createBtn(parentId);

                    matrix[i][j] = button.btn;

                    this.parent.appendChild(button.btn);
                }
            }
    }
});