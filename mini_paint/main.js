import { PaintBoard } from './paintBoard.js';
import { CustomButton } from "./customButton.js";
import { Stack } from "./stack.js";

var _undoStack = new Stack(30);
var _redoStack = new Stack(30);

var board = new PaintBoard(50, 50, 8);
board.display("board");
console.log(board);

var undoBtn = new CustomButton("Undo", false, "btn btn-success");
var redoBtn = new CustomButton("Redo", false, "btn btn-primary");
var resetBtn = new CustomButton("Reset", false, "btn btn-danger");

undoBtn.createBtn("buttons");
redoBtn.createBtn("buttons");
resetBtn.createBtn("buttons");

// Event Listeners

// undoBtn.btn.addEventListener("click", )


// Listeners
board.addListener("endPaint", selectedButtonsHandler);
board.addListener("undo", undoHandler);
board.addListener("redo", redoHandler);

function selectedButtonsHandler(event) {
    console.log(event.data);

    _undoStack.push(event.data);

    console.log(_undoStack)
}

function undoHandler(event) {
    console.log(event.data);
}

function redoHandler(event) {
    console.log(event.data);
}