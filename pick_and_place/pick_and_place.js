window.onload = (function () {


    var cols = 5;
    var lines = cols;
    var el = 50;
    var distance = 4;
    var matrixOne = [];
    var matrixTwo = [];

    var unit = "px";


    var element;
    var clonedElement;
    var dragArray = [];
    var dragObject = {};
    var droppableBelow;
    var firstDiv;
    var secondDiv;
    var width = cols * (el + distance) + distance;
    var height = lines * (el + distance) + distance;
    var firstDivPosX;
    var firstDivPosY;
    var secondDivPosX;
    var secondDivPosY;

    firstDivPosX = 50;
    firstDivPosY = 50;
    firstDiv = document.getElementById("first-div");
    firstDiv.style.height = height + unit;
    firstDiv.style.width = width + unit;
    firstDiv.style.position = "absolute";
    firstDiv.style.left = firstDivPosX + unit;
    firstDiv.style.top = firstDivPosY + unit;
    firstDiv.style.backgroundColor = "#D4D4D4"

    secondDivPosX = 400;
    secondDivPosY = 50;
    secondDiv = document.getElementById("second-div");
    secondDiv.style.height = height + unit;
    secondDiv.style.width = width + unit;
    secondDiv.style.position = "absolute";
    secondDiv.style.left = secondDivPosX + unit;
    secondDiv.style.top = secondDivPosY + unit;

    function generateDivElement(element, color, countElements, matrix) {
        var childDiv;
        var generateId = 1;

        var xPos = 4;
        var yPos = 4;
        for (var i = 0; i < lines; i++) {
            matrix[i] = [];
            xPos = 4;

            for (var j = 0; j < cols; j++) {
                childDiv = document.createElement("div");
                // childDiv.id = generateId;
                childDiv.style.height = el + unit;
                childDiv.style.width = el + unit;
                childDiv.style.backgroundColor = color;
                childDiv.style.position = "absolute";
                childDiv.style.left = xPos + unit;
                childDiv.style.top = yPos + unit;
                childDiv.style.userSelect = "none";
                childDiv.style.willChange = "top, left"
                childDiv.style.transform = "translateZ(0)"

                if (countElements) {
                    childDiv.id = generateId
                    childDiv.innerHTML = generateId
                }

                generateId++;

                matrix[i][j] = childDiv;

                xPos += el + distance;
                element.appendChild(childDiv);
            }

            yPos += el + distance;
        }

        return matrix;
    }

    function getElement(event) {
        element = event.target;

        if (element.id !== "first-div") {
            clonedElement = element.cloneNode(true);
            clonedElement.style.backgroundColor = "#57ede0";
            clonedElement.style.opacity = ".5";

            dragObject.el = element;
            dragObject.text = element.innerHTML;
            dragObject.top = element.style.top;
            dragObject.left = element.style.left;

            clonedElement.onmousedown = function (event) {
                return event.stopPropagation()
            }

            firstDiv.appendChild(clonedElement);

            element.onmousedown = startDragg(event);
            element.ondragstart = function () {
                return false;
            };
        }
    }

    var clientX;
    var clientY;
    var shiftX;
    var shiftY;

    function startDragg(event) {
        element.style.position = 'absolute';
        document.body.appendChild(element);

        shiftX = element.offsetWidth / 2;
        shiftY = element.offsetHeight / 2;

        onMouseMove(event);
        document.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onBodyMouseUp);
    };

    function onMouseMove(event) {
        clientX = event.clientX;
        clientY = event.clientY;
        // shiftX = clientX - element.offsetWidth / 2;
        // shiftY = clientY - element.offsetHeight / 2;

        element.style.left = clientX - shiftX + unit;
        element.style.top = clientY - shiftY + unit;
    }

    function onBodyMouseUp() {

        element.hidden = true;
        var elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        element.hidden = false;

        if (!elemBelow) {
            return;
        }

        droppableBelow = elemBelow;

        checkIfMouseIn(event, secondDiv, clonedElement, element);
        document.body.removeEventListener('mouseup', onBodyMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

    generateDivElement(firstDiv, "#57ede0", true, matrixOne);
    generateDivElement(secondDiv, "#fcc86f", false, matrixTwo);

    firstDiv.addEventListener("mousedown", getElement);
    secondDiv.addEventListener("click", returnElement);

    function checkIfMouseIn(event, elChecked, clone, el) {
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        var sq2Left = elChecked.offsetLeft;
        var sq2Right = elChecked.offsetLeft + elChecked.offsetWidth;
        var sq2Top = elChecked.offsetTop;
        var sq2Bottom = elChecked.offsetTop + elChecked.offsetHeight;

        if (sq2Left > mouseX || sq2Right < mouseX || sq2Top > mouseY || sq2Bottom < mouseY) {
            el.style.left = dragObject.left;
            el.style.top = dragObject.top;
            firstDiv.appendChild(el);
            clone.remove()
        } else {
            clone.remove()
            enterDroppable(droppableBelow, el)
        }
    }

    function enterDroppable(oldEl, newEl) {
        if (oldEl.parentElement.id === "second-div" && !oldEl.id) {
            dragArray[dragArray.length] = dragObject;
            dragObject = {};

            secondDiv.appendChild(newEl)
            newEl.style.top = oldEl.style.top;
            newEl.style.left = oldEl.style.left;
        } else {
            newEl.style.left = dragObject.left;
            newEl.style.top = dragObject.top;
            firstDiv.appendChild(newEl);
        }
    }

    function returnElement(event) {
        var div = event.target;

        if(div.id !== "second-div") {
            for(var i = 0; i < dragArray.length; i++) {
                if(dragArray[i].el === div) {
                    div.style.left = dragArray[i].left;
                    div.style.top = dragArray[i].top;
                    firstDiv.appendChild(div)
                }
            }
        }
    }
}());