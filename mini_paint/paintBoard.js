import { CustomEvents } from "./customEvents.js";
import { Button } from "./button.js";
import { Stack } from "./stack.js";
import { LocalStorage } from "./localStorage.js";

export function PaintBoard(width, height, unit) {
    this._width = width;
    this._height = height;
    this._undoStack = new Stack(30);
    this._redoStack = new Stack(30);
    this.localStorage = new LocalStorage();
    this.matrix = [];
    this.elementsMatrix = [];
    this.drawnElements = [];
    this.myPicture = [];
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

    // createBoard: function(parentId) {
    //     var cols = this._width;
    //     var lines = this._height;
    //     var idGenerator = 0;
    //     var matrix = [];
    //     var xPos = this.unitMeasure;
    //     var yPos = this.unitMeasure;

    //     this.parent = document.getElementById(parentId);

    //     this.createButtons();
    //     this.disableBtns()
    //     this.getTargetElement = this.getElementMouseDown.bind(this);
    //     this.stopPaintHandler = this.stopPaint.bind(this);
    //     this.drawHoveredElements = this.paint.bind(this);
    //     this.undoHandler = this.undo.bind(this);
    //     this.redoHandler = this.redo.bind(this);
    //     this.resetHandler = this.reset.bind(this);

    //     for (var i = 0; i < cols; i++) {
    //         matrix[i] = [];
    //         xPos = this.unitMeasure;

    //         for (var j = 0; j < lines; j++) {
    //             // var button = new Button("", false, "pixel");
    //             // button.createBtn(parentId);
    //             // button.btn.id = idGenerator;
    //             // button.btn.style.left = xPos + "px";
    //             // button.btn.style.top = yPos + "px";
    //             matrix[i][j] = 0;

    //             xPos += this.unitMeasure;
    //             idGenerator++;
    //             // this.parent.appendChild(button.btn);
    //         }

    //         yPos += this.unitMeasure;
    //     }
    //     this.parent.addEventListener("mousedown", this.getTargetElement, false);
    //     this.parent.addEventListener("mouseup", this.stopPaintHandler, false);

    //     this.retriveFromLocalStorage = this.localStorage.get("myPicture");

    //     if(this.retriveFromLocalStorage.length) {
    //         this.drawStoredPaint(this.retriveFromLocalStorage);
    //     }
    // },
    display: function(parentId) {
        this.createMatrixBoard();
        // this.syncMatrixWithBtns();

        this.getTargetElement = this.getElementMouseDown.bind(this);
        this.stopPaintHandler = this.stopPaint.bind(this);
        this.drawHoveredElements = this.paint.bind(this);
        this.undoHandler = this.undo.bind(this);
        this.redoHandler = this.redo.bind(this);
        this.resetHandler = this.reset.bind(this);

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

        this.drawUnselectedBtn(element);
    },

    paint: function(el) {
        if(!this.isMouseDown) {
            return;
        }
        var element = el.target.btn.id.split("-");

        this.drawUnselectedBtn(element);
    },

    drawUnselectedBtn: function(element) {

        this.matrix[parseInt(element[0])][parseInt(element[1])] = 1;

        if(!this.elementsMatrix[parseInt(element[0])][parseInt(element[1])].getStateBtn()){
            this.elementsMatrix[parseInt(element[0])][parseInt(element[1])].changeStateBtn();
        }
    },

    stopPaint: function() {
        this.isMouseDown = !this.isMouseDown;
        this._undoStack.push(this.drawnElements);
        this.myPicture.push(this.drawnElements);
        this.drawnElements = [];
        this.localStorage.set("myPicture", this.myPicture);
    },

    undo: function() {
        var undoElements = this._undoStack.pop();
        this._redoStack.push(undoElements);
        this.myPicture.pop();

        for(var i = 0; i < undoElements.length; i++) {
            var el = document.getElementById(undoElements[i]);
            el.style.backgroundColor = "red";
        }
        this.disableBtns();
        this.localStorage.set("myPicture", this.myPicture);
    },

    redo: function() {
        var redoElements = this._redoStack.pop();
        this._undoStack.push(redoElements);
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
    },

    disableBtns: function() {
        if(this._undoStack.is_empty() && this._redoStack.is_empty()){
            this.undoBtn.desabled();
            this.redoBtn.desabled();
            this.resetBtn.desabled();
            this.undoBtn.btn.removeEventListener("click", this.undoHandler);
            this.redoBtn.btn.removeEventListener("click", this.redoHandler);
            this.resetBtn.btn.removeEventListener("click", this.resetHandler);
        }

    },

    enableBtns: function() {
        if(!this._undoStack.is_empty()){
            this.undoBtn.activateBtn();
            this.redoBtn.activateBtn();
            this.resetBtn.activateBtn();
            this.undoBtn.btn.addEventListener("click", this.undoHandler);
            this.redoBtn.btn.addEventListener("click", this.redoHandler);
            this.resetBtn.btn.addEventListener("click", this.resetHandler);
        }
    },

    reset: function() {

        this._undoStack = new Stack(30);
        this._redoStack = new Stack(30);
        this.disableBtns();

        this.localStorage.remove("myPicture");

        for(var i = 0; i < this.myPicture.length; i++) {
            for(var j = 0; j < this.myPicture[i].length; j++) {
                var el = document.getElementById(this.myPicture[i][j]);

                el.style.backgroundColor = "red";
            }
        }
    }
});