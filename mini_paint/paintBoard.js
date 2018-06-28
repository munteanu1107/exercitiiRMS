import { CustomEvents } from "./customEvents.js";
import { Button } from "./button.js";
import { Stack } from "./stack.js";

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

    drawBoard: function(parentId) {
        var cols = this._width;
        var lines = this._height;
        var matrix = [];
        var xPos = 4;
        var yPos = 4;


        this.parent = document.getElementById(parentId);

        for (var i = 0; i < cols; i++) {
            matrix[i] = [];
            xPos = 4;
            var button = new Button("", false, "pixel");

            for (var j = 0; j < lines; j++) {
                button.createBtn(parentId);
                button.btn.style.left = xPos + "px";
                button.btn.style.top = yPos + "px";

                matrix[i][j] = button.btn;

                xPos += 4;

                this.parent.appendChild(button.btn);
            }

            yPos += 4;
        }
    }
});