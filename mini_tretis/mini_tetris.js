window.onload = (function(){
    var container;
    var containerDivPosX;
    var containerDivPosY;
    var matrix = [];

    var cols = 7;
    var lines = 15;
    var el = 30;
    var distance = 4;
    var width = cols * (el + distance) + distance;
    var height = lines * (el + distance) + distance;
    var unit = "px";

    containerPosX = 50;
    containerPosY = 50;
    container = document.getElementById("container");
    container.style.height = height + unit;
    container.style.width = width + unit;
    container.style.position = "absolute";
    container.style.left = containerPosX + unit;
    container.style.top = containerPosY + unit;

    function generateDivElement(element) {
        var childDiv;
        var generateId = 1;

        var xPos = 4;
        var yPos = 4;
        for (var i = 0; i < lines; i++) {
            matrix[i] = [];
            xPos = 4;
            for (var j = 0; j < cols; j++) {
                childDiv = document.createElement("div");
                childDiv.id = generateId;
                childDiv.style.height = el + unit;
                childDiv.style.width = el + unit;
                childDiv.style.position = "absolute";
                childDiv.style.left = xPos + unit;
                childDiv.style.top = yPos + unit;
                childDiv.style.userSelect = "none";
                childDiv.style.willChange = "top, left"
                childDiv.style.transform = "translateZ(0)"
                childDiv.style.backgroundColor = "red";

                generateId++;

                matrix[i][j] = childDiv;

                xPos += el + distance;
                element.appendChild(childDiv);
            }

            yPos += el + distance;
        }

        return matrix;
    }

    generateDivElement(container)

    var step = 0;
    var centerLine = Math.floor(cols / 2);
    function startTetris() {
        var array = matrix;

        if(step >= lines || array[step][centerLine].style.backgroundColor === "black") {
            step = 0;
        }
        if(step > 0) {
            array[step - 1][centerLine].style.backgroundColor = "red";
        }
        array[step][centerLine].style.backgroundColor = "black";

        step++;
    }

    var timeOut = setInterval(startTetris, 500);

    window.addEventListener("keydown", OnKeyPress, false);

    function OnKeyPress(event) {

        switch(event.code) {
            case "ArrowLeft":
                matrix[step - 1][centerLine].style.backgroundColor = "red";
                moveElementToTheLeft(matrix)
                break;
            case "ArrowRight":
                matrix[step - 1][centerLine].style.backgroundColor = "red";
                moveElementToTheRight()
                break;
            case "Space":
                pauseGame()
                break;
        }
    }

    function moveElementToTheLeft(array) {
        if(centerLine > 0) {
            centerLine--;
        }
    }

    function moveElementToTheRight() {
        if(centerLine < (cols-1)) {
            centerLine++;
        }
    }

    function nextLevel() {
    }
}());