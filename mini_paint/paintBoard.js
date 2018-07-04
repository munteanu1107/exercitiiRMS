import { CustomEvents } from "./customEvents.js";
import { Button } from "./button.js";
import { LocalStorage } from "./localStorage.js";

export function PaintBoard(width, height, unit) {
    this._width = width;
    this._height = height;
    this.localStorage = new LocalStorage();
    this.matrix = [];
    this.elementsMatrix = [];
    this.drawnElements = [];
    this.unitMeasure = unit;
    this.isMouseDown = false;


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

    display: function(parentId) {
        this.retriveFromLocalStorage = this.localStorage.get("myPicture");

        if(!this.retriveFromLocalStorage) {
            this.createMatrixBoard();
        } else {
            this.matrix = this.retriveFromLocalStorage;
            this.fire({type:"localStorage", data: this.retriveFromLocalStorage})
        }

        this.getTargetElement = this.getElementMouseDown.bind(this);
        this.stopPaintHandler = this.stopPaint.bind(this);
        this.drawHoveredElements = this.paint.bind(this);

        var xPos = this.unitMeasure;
        var yPos = this.unitMeasure;

        this.parent = document.getElementById(parentId);

        for(var i = 0; i < this.matrix.length; i++) {
            xPos = this.unitMeasure;
            this.elementsMatrix[i] = [];
            for(var j = 0; j < this.matrix[i].length; j++) {
                this.elementsMatrix[i][j] = new Button("", false, "pixel");

                var button = this.elementsMatrix[i][j]
                button.createBtn("board");
                button.btn.id = i + "-" + j
                button.btn.style.left = xPos + "px";
                button.btn.style.top = yPos + "px";
                button.addListener("onMouseEnter", this.drawHoveredElements);
                xPos += this.unitMeasure;
            }

            yPos += this.unitMeasure;
        }
        this.parent.addEventListener("mousedown", this.getTargetElement, false);
        this.parent.addEventListener("mouseup", this.stopPaintHandler, false);

        if (this.retriveFromLocalStorage) {
            this.drawStoredPaint(this.retriveFromLocalStorage);
        }
    },

    createMatrixBoard: function() {
        var cols = this._width;
        var lines = this._height;

        for(var i = 0; i < cols; i++) {
            this.matrix[i] = [];

            for (var j = 0; j < lines; j++) {
                this.matrix[i][j] = 0;
            }
        }

    },

    getElementMouseDown: function(el) {
        this.isMouseDown = !this.isMouseDown;

        var element = el.target.id.split("-");

        this.drawSelectedButton(element);
    },

    paint: function(el) {
        if(!this.isMouseDown) {
            return;
        }

        var element = el.target.btn.id.split("-");

        this.drawSelectedButton(element);
    },

    drawSelectedButton: function(element) {
        this.matrix[parseInt(element[0])][parseInt(element[1])] = 1;

        if(!this.elementsMatrix[parseInt(element[0])][parseInt(element[1])].getStateBtn()){
            this.elementsMatrix[parseInt(element[0])][parseInt(element[1])].changeStateBtn();
            this.matrix[parseInt(element[0])][parseInt(element[1])] = 1;
        }
        this.drawnElements.push(element)
    },

    stopPaint: function() {
        this.fire({type: "endPaint", data: this.drawnElements});
        this.localStorage.set("myPicture", this.matrix);
        this.drawnElements = [];

        this.isMouseDown = !this.isMouseDown;
    },

    undoRedo: function(undoElements) {
        // var undoElements = _undoStack.pop();

        for(var i = 0; i < undoElements.length; i++) {
            this.elementsMatrix[parseInt(undoElements[i][0])][parseInt(undoElements[i][1])].changeStateBtn();
            this.matrix[parseInt(undoElements[i][0])][parseInt(undoElements[i][1])] = 0;
        }
        this.localStorage.set("myPicture", this.matrix);
    },

    drawStoredPaint: function(draw) {
        for(var i = 0; i < draw.length; i++) {
            for(var j = 0; j < draw[i].length - 1; j++) {
                if (draw[i][j] === 1) {
                    this.elementsMatrix[i][j].changeStateBtn();
                }
            }
        }
    },

    reset: function() {
        for(var i = 0; i < this.matrix.length; i++) {
            for(var j = 0; j < this.matrix[i].length; j++) {
                this.matrix[i][j] = 0;

                if (this.elementsMatrix[i][j].getStateBtn()) {
                    this.elementsMatrix[i][j].changeStateBtn();
                }
            }
        }
        this.localStorage.remove("myPicture");
    }
});