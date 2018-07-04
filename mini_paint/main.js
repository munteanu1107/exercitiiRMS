import { PaintBoard } from './paintBoard.js';
import { CustomButton } from "./customButton.js";
import { Stack } from "./stack.js";
import { StackManager } from "./stackManager.js";

var _undoStack = new Stack(30);
var _redoStack = new Stack(30);

var board = new PaintBoard(50, 50, 8);
board.display("board");

var stackManager = new StackManager(_undoStack, _redoStack);

var undoBtn = new CustomButton("Undo", false, "btn btn-success");
var redoBtn = new CustomButton("Redo", false, "btn btn-primary");
var resetBtn = new CustomButton("Reset", false, "btn btn-danger");

undoBtn.createBtn("buttons");
redoBtn.createBtn("buttons");
resetBtn.createBtn("buttons");

console.log(undoBtn)
//Mouse Event Listeners
undoBtn.btn.addEventListener("click", undoHandler);
redoBtn.btn.addEventListener("click", redoHandler);
resetBtn.btn.addEventListener("click", resetHandler);


//Custom Listeners
board.addListener("endPaint", selectedButtonsHandler);
board.addListener("undo", undoHandler);
board.addListener("redo", redoHandler);
board.addListener("localStorage", verifyLocalStorageHandler);

undoBtn.disabled();
redoBtn.disabled();

function selectedButtonsHandler(event) {
    stackManager.push(event.data);
    stackManager.set_redo(new Stack(30));
    checkStacks(true);
}

function undoHandler() {
    board.undoRedo(stackManager.getUndoVector());

    checkStacks();
}

function redoHandler() {
    board.undoRedo(stackManager.getRedoVector());

    checkStacks();
}

function resetHandler() {
    stackManager.set_redo(new Stack(30));
    stackManager.set_undo(new Stack(30));

    board.reset();
    undoBtn.disabled();
    redoBtn.disabled();
    resetBtn.disabled();
}

function verifyLocalStorageHandler(event) {
    if(!event.data.is_empty()) {
        stackManager.is_undo_empty() && stackManager.is_redo_empty() ? resetBtn.disabled() : resetBtn.activateBtn();
    }
}

function checkStacks(mixed) {
    if(mixed) {
        stackManager.is_redo_empty() ? redoBtn.disabled() : redoBtn.activateBtn();
        stackManager.is_undo_empty() ? undoBtn.disabled() : undoBtn.activateBtn();
        stackManager.is_undo_empty() && stackManager.is_redo_empty() ? resetBtn.disabled() : resetBtn.activateBtn();
    } else {
        stackManager.is_redo_empty() ? redoBtn.disabled() : redoBtn.activateBtn();
        stackManager.is_undo_empty() ? undoBtn.disabled() : undoBtn.activateBtn();
    }
}