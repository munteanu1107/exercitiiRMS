import { CustomEvents } from "./customEvents.js";
import { Button } from "./button.js";
import { Stack } from "./stack.js";
import { LocalStorage } from "./localStorage.js";

export function PaintBoard(width, height) {
    this._width = width;
    this._height = height;
    this._undo = new Stack(30);
    this._redo = new Stack(30);
    this.localStorage = new LocalStorage();
    this.drawnElements = [];
    this.myPicture = [];


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

    createBoard: function(parentId) {
        var cols = this._width;
        var lines = this._height;
        var idGenerator = 0;
        var matrix = [];
        var xPos = 8;
        var yPos = 8;

        this.parent = document.getElementById(parentId);
        this.undoBtn = document.getElementsByClassName("undo")[0];
        this.redoBtn = document.getElementsByClassName("redo")[0];

        this.getTargetElement = this.getElementMouseDown.bind(this);
        this.stopPaintHandler = this.stopPaint.bind(this);
        this.drawHoveredElements = this.paint.bind(this);
        this.undoHandler = this.undo.bind(this);
        this.redoHandler = this.redo.bind(this);

        this.undoBtn.addEventListener("click", this.undoHandler);
        this.redoBtn.addEventListener("click", this.redoHandler);

        for (var i = 0; i < cols; i++) {
            matrix[i] = [];
            xPos = 8;

            for (var j = 0; j < lines; j++) {
                var button = new Button("", false, "pixel");
                button.createBtn(parentId);
                button.btn.id = idGenerator;
                button.btn.style.left = xPos + "px";
                button.btn.style.top = yPos + "px";
                matrix[i][j] = button.btn;

                xPos += 8;
                idGenerator++;
                this.parent.appendChild(button.btn);
            }

            yPos += 8;
        }

        this.parent.addEventListener("mousedown", this.getTargetElement, false);
        this.parent.addEventListener("mouseup", this.stopPaintHandler, false);

        this.retriveFromLocalStorage = this.localStorage.get("myPicture");
        this.drawStoredPaint(this.retriveFromLocalStorage);
    },

    getElementMouseDown: function() {
        this.parent.addEventListener("mousemove", this.drawHoveredElements, false);
    },

    paint: function(el) {
        el.target.style.backgroundColor = "blue";
        this.drawnElements.push(el.target.id);

    },

    stopPaint: function() {
        this._undo.push(this.drawnElements);
        this.myPicture.push(this.drawnElements);
        this.drawnElements = [];
        this.localStorage.set("myPicture", this.myPicture);
        this.parent.removeEventListener("mousemove", this.drawHoveredElements, false);
    },

    undo: function() {
        var undoElements = this._undo.pop();
        this._redo.push(undoElements);
        this.myPicture.pop();

        for(var i = 0; i < undoElements.length; i++) {
            var el = document.getElementById(undoElements[i]);
            el.style.backgroundColor = "red";
        }

        this.localStorage.set("myPicture", this.myPicture);
    },

    redo: function() {
        var redoElements = this._redo.pop();
        this._undo.push(redoElements);
        this.myPicture.push(redoElements);

        for(var i = 0; i < redoElements.length; i++) {
            var el = document.getElementById(redoElements[i]);
            el.style.backgroundColor = "blue";
        }
        this.localStorage.set("myPicture", this.myPicture);
    },

    drawStoredPaint: function(draw) {
        for(var i = 0; i < draw.length; i++) {
            for(var j = 0; j < draw[i].length - 1; j++) {
                document.getElementById(draw[i][j]).style.backgroundColor = "blue";
            }
        }
    },

    removePaintFromLocalStorage: function() {
        this.localStorage.remove("myPicture");
    }
});